<template>
  <div class="theme-tab">
    <div class="themes">
      <img
        v-for="design in frameStore.matchingDesigns"
        :key="design.url"
        :src="design.url"
        :alt="design.name"
        class="frame-thumb"
        @click="selectTheme(design)"
      >
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFrameStore } from '../../stores/frameStore'

const frameStore = useFrameStore()

onMounted(() => {
  frameStore.loadDesigns()   // loads frames.json designs
  console.log("matchingDesigns:", frameStore.matchingDesigns);
})

function selectTheme(design) {
  frameStore.selectDesign(design)
}
</script>

<style scoped>
.themes {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.frame-thumb {
  width: 150px;
  height: auto;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.frame-thumb:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0,0,0,0.25);
}
</style>
