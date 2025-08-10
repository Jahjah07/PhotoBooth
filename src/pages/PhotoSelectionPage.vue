<template>
  <div class="photo-selection">
    <h2>Select Photos for Your Frame</h2>
    <p class="frame-info">Frame layout: {{ frame.layout }}</p>
    <p class="frame-info">You need {{ frame.photos }} photo(s).</p>

    <div class="photos-grid">
      <div
        v-for="(photo, index) in photosTaken"
        :key="index"
        class="photo-item"
        :class="{ selected: selectedPhotos.includes(photo) }"
        @click="togglePhoto(photo)"
      >
        <img :src="photo" alt="Taken photo" class="photo-preview" />
      </div>
    </div>

    <button
      class="preview-btn"
      :disabled="selectedPhotos.length !== frame.photos"
      @click="goToPreview"
    >
      Continue to Preview
    </button>
  </div>
</template>

<script>
import { useFrameStore } from "../stores/frameStore";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const photoStore = useFrameStore();
    const router = useRouter();

    const photosTaken = computed(() => photoStore.takenPhotos);
    const frame = computed(() => photoStore.selectedFrame);

    const selectedPhotos = ref([]);

    function togglePhoto(photo) {
      const index = selectedPhotos.value.indexOf(photo);
      if (index === -1) {
        // Not selected yet, check if limit reached
        if (selectedPhotos.value.length < frame.value.photos) {
          selectedPhotos.value.push(photo);
        }
      } else {
        // Deselect photo
        selectedPhotos.value.splice(index, 1);
      }
    }

    function goToPreview() {
      photoStore.setSelectedPhotos(selectedPhotos.value);
      router.push("/preview"); // Adjust route if needed
    }

    return {
      photosTaken,
      frame,
      selectedPhotos,
      togglePhoto,
      goToPreview,
    };
  },
};
</script>

<style scoped>
.photo-selection {
  max-width: 700px;
  margin-top: 6rem;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  text-align: center;
}

.frame-info {
  color: #555;
  font-size: 14px;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin: 20px 0;
}

.photo-item {
  background: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border: 3px solid transparent;
  transition: border-color 0.3s ease;
}

.photo-item.selected {
  border-color: #4cafef;
}

.photo-preview {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 5px;
}

.preview-btn {
  background: #4cafef;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.preview-btn:disabled {
  background: #aaa;
  cursor: not-allowed;
}

.preview-btn:hover:not(:disabled) {
  background: #3a9cdb;
}
</style>
