<template>
  <div class="color-picker-tab">
    <!-- Fake color wheel -->
    <div class="color-wheel">
      <input
        class="color-input"
        id="frameColor"
        type="color"
        :value="frameColor"
        @input="onWheelColorChange"
      />
    </div>

    <!-- Preset colors -->
    <div
      v-for="(color, index) in colors"
      :key="index"
      class="color-circle"
      :style="{ backgroundColor: color }"
      @click="selectColor(color)"
      :class="{ selected: selectedColor === color }"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import colors from "../../config/colors.js";

const props = defineProps({
  frameColor: {
    type: String,
    required: true
  }
});

const emit = defineEmits(["update:frameColor"]);
const selectedColor = ref(props.frameColor);

function selectColor(color) {
  selectedColor.value = color;
  emit("update:frameColor", color);
}

function onWheelColorChange(event) {
  const color = event.target.value;
  selectedColor.value = color; // <-- highlight the wheel
  emit("update:frameColor", color);
}
</script>

<style scoped>
.color-picker-tab {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(36px, 1fr));
  gap: 1rem;
  justify-items: center;
}

/* Fake color wheel container */
.color-wheel {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: conic-gradient(
    red,
    yellow,
    lime,
    cyan,
    blue,
    magenta,
    red
  ); /* rainbow gradient wheel */
  position: relative;
  overflow: hidden;
}

/* Transparent real input on top */
.color-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0; /* invisible but clickable */
  cursor: pointer;
}

.color-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
}

.color-circle.selected {
  border: 2px solid black;
}
</style>
