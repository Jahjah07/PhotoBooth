<template>
    <div class="color-picker-tab">
      <input
        class="color-circle"
        id="frameColor"
        type="color"
        :value="frameColor"
        @input="$emit('update:frameColor', $event.target.value)"
      />
  
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
  </script>
  
  <style scoped>
  .color-picker-tab {
    display: flex;
    flex-direction: row;
  }
  .color-circle {
    margin-right: 1rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid transparent;
  }
  .color-circle.selected {
    border: 2px solid black;
  }
  input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 50%;
}
  </style>
  