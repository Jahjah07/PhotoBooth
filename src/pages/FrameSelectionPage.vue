<template>
  <div class="frame-selection">
    <h1>Select Your Frame</h1>
    <div class="frames-grid">
      <div
        v-for="(frame, index) in store.frames"
        :key="index"
        class="frame-card"
        @click="selectFrame(frame)"
      >
        <img :src="frame.url" :alt="frame.name" class="frame-image" />
        <p>{{ frame.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFrameStore } from '../stores/frameStore'

const router = useRouter()
const store = useFrameStore()

onMounted(() => {
  store.loadFrames()
})

function selectFrame(frame) {
  store.selectFrame(frame)
  router.push('/photobooth') // Go directly to photobooth
}
</script>

<style scoped>
.frame-selection {
  text-align: center;
}

.frames-grid {
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  padding: 1rem;
  margin-top: 4rem;
}

.frame-card {
  width: 30%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
  padding: 0.5rem;
}

.frame-card:hover {
  transform: scale(1.05);
}

.frame-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  max-height: 250px; /* This limits tall frames */
}

p {
  margin-top: 0.5rem;
  font-weight: 500;
}
</style>
