<template>
  <div class="frame-selection">
    <h1>Select Your Frame</h1>
    <div class="frames-grid">
      <div
        v-for="(templates, index) in store.templates"
        :key="index"
        class="frame-card"
        @click="selectTemplate(templates)"
      >
        <img :src="templates.url" :alt="templates.name" class="frame-image" />
        <p>{{ templates.name }}</p>
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
  store.loadTemplates()
})

function selectTemplate(templates) {
  store.selectTemplate(templates)
  router.push('/photobooth') // Go directly to photobooth
}
</script>

<style scoped>
h1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  color: #222;
  margin-bottom: 1.5rem;
}

.frame-selection {
  margin-top: 6rem;
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
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
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
  max-height: 450px;
}

p {
  margin-top: 0.5rem;
  font-weight: 500;
}
</style>
