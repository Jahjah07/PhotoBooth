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
  text-align: center;
}

.frame-selection {
  margin-top: 6rem;
  text-align: center;
  padding: 0 1rem;
}

.frames-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  justify-items: center;
  margin-top: 4rem;
}

.frame-card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
  background: #fff;
  padding: 0.5rem;
}

.frame-card:hover {
  transform: scale(1.05);
}

.frame-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  max-height: 350px;
}

p {
  margin-top: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
}

/* Tablet */
@media (max-width: 1024px) {
  h1 {
    padding: 18rem 1rem 2rem;
    font-size: 2rem;
  }
  .frame-image {
    max-height: 300px;
  }
  p {
    font-size: 0.95rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  h1 {
    padding: 18rem 1rem 2rem;
    font-size: 1.8rem;
  }
  .frames-grid {
    gap: 0.8rem;
  }
  .frame-card {
    padding: 0.3rem;
  }
  .frame-image {
    max-height: 250px;
  }
  p {
    font-size: 0.9rem;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  h1 {
    margin-top: 6rem;
    font-size: 1.5rem;
  }
  .frame-image {
    max-height: 200px;
  }
  p {
    font-size: 0.85rem;
  }
}
</style>
