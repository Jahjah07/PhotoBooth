<script setup>
import { computed, watch } from "vue";
import { useFrameStore } from "../stores/frameStore";

const frameStore = useFrameStore();

const props = defineProps({
  selectedPhotos: Array,
  frameColor: String,
  caption: String,
  captionFontColor: String,
  captionFontFamily: String,
  showDate: Boolean,
  showTime: Boolean,
  dateTimeFontColor: String,
  formattedDate: String,
  formattedTime: String,
});

// Watch for caption changes: if there's text → clear theme
watch(
  () => props.caption,
  (newVal) => {
    if (newVal && newVal.trim() !== "" && frameStore.selectedDesign) {
      frameStore.clearDesign();
    }
  }
);

// Watch for frame color changes: if set and theme exists → clear theme
watch(
  () => props.frameColor,
  (newVal) => {
    if (newVal && frameStore.selectedDesign) {
      frameStore.clearDesign();
    }
  }
);

const selectedDesign = computed(() => frameStore.selectedDesign);

const gridSize = computed(() => {
  const layout =
    frameStore.selectedTemplate?.layout ||
    frameStore.selectedTemplate?.type ||
    selectedDesign.value?.type ||
    "1x1";
  return layout.toLowerCase().split("x").map(Number);
});

const colsCount = computed(() => gridSize.value[0]);
const rowsCount = computed(() => gridSize.value[1]);

const frameStyle = computed(() => {
  // Ensure same height for 1x3 and 2x3
  let height = "auto";
  if (rowsCount.value === 3) {
    height = "380px"; // fixed height for tall frames
  }

  return {
    position: "relative",
    padding: "10px",
    border: selectedDesign.value ? "none" : `4px solid ${props.frameColor}`,
    background: selectedDesign.value ? "transparent" : props.frameColor,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    height, // apply calculated height
  };
});

const photoGridStyle = computed(() => ({
  display: "grid",
  gridTemplateColumns: `repeat(${colsCount.value}, 90px)`,
  gridTemplateRows: `repeat(${rowsCount.value}, 90px)`,
  gap: "15px",
  justifyContent: "center",
  zIndex: 1,
  position: "relative",
}));
</script>

<template>
  <div class="frame-preview" :style="frameStyle">
    <!-- Theme background -->
    <div class="frame-bg" v-if="selectedDesign">
      <img
        :src="selectedDesign.frames?.[0] || selectedDesign.url"
        alt="Frame"
      />
    </div>

    <!-- Photo Grid -->
    <div class="photo-grid" :style="photoGridStyle">
      <div v-for="(photo, idx) in selectedPhotos" :key="idx" class="photo-slot">
        <img :src="photo" alt="Selected photo" />
      </div>
    </div>

    <!-- Show caption only if no theme -->
    <div
      v-if="!selectedDesign && caption"
      class="frame-caption"
      :style="{ color: captionFontColor, fontFamily: captionFontFamily }"
    >
      {{ caption }}
    </div>

    <!-- Show date/time only if no theme -->
    <div
      v-if="!selectedDesign && (showDate || showTime)"
      class="frame-datetime"
      :style="{ color: dateTimeFontColor }"
    >
      <span v-if="showDate">{{ formattedDate }}</span>
      <span v-if="showDate && showTime"> | </span>
      <span v-if="showTime">{{ formattedTime }}</span>
    </div>
  </div>
</template>

<style scoped>
.frame-preview {
  max-height: 390px;
}

.frame-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.frame-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 6px;
  background: #f0f0f0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.photo-slot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.frame-caption {
  margin-top: 12px;
  font-size: 1rem;
  font-weight: bold;
  z-index: 1;
  position: relative;
}

.frame-datetime {
  margin-top: 6px;
  font-size: 0.5rem;
  font-weight: 500;
  border-radius: 4px;
  display: inline-block;
  z-index: 1;
  position: relative;
}
</style>
