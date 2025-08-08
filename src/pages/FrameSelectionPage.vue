<template>
  <div class="frame-selection-layout">
    <div v-if="showFrameSelect" class="frame-select-modal">
      <div class="frame-select-content">
        <h2>Select a Frame</h2>
        <div class="frame-thumbnails">
          <div v-for="frame in frameTemplates" :key="frame.url" class="frame-thumb" @click="chooseFrame(frame)">
            <img :src="frame.url" :alt="frame.name" />
            <div class="frame-name">{{ frame.name }}</div>
            <div class="frame-layout">{{ frame.layout }}</div>
          </div>
        </div>
      </div>
    </div>
    <template v-else>
      <div class="gallery-side">
        <h2>Gallery</h2>
        <div class="gallery">
          <img v-for="(photo, idx) in gallery" :key="idx" :src="photo" class="gallery-photo" @click="selectPhoto(photo)" :class="{ used: frameSlots.includes(photo) }" />
        </div>
      </div>
      <div class="frame-side">
        <h2>Frame: {{ selectedFrame }}</h2>
        <div class="frame-preview" :class="selectedFrame">
          <div v-for="(slot, idx) in slotCount" :key="idx" class="frame-slot">
            <img v-if="frameSlots[idx]" :src="frameSlots[idx]" class="slot-photo" />
            <div v-else class="slot-placeholder">Slot {{ idx + 1 }}</div>
          </div>
        </div>
        <button v-if="frameSlots.every(Boolean)" @click="generateComposite">Generate & Save Composite</button>
        <div v-if="compositeUrl" class="composite-preview">
          <h3>Composite Image</h3>
          <img :src="compositeUrl" class="composite-img" />
          <a :href="compositeUrl" download="photobooth-composite.png"><button>Download</button></a>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGalleryStore } from '../stores/useGalleryStore'

const { gallery } = useGalleryStore()
const selectedFrame = ref<'1x3' | '2x3' | null>(null)
const selectedFrameUrl = ref<string | null>(null)
const slotCount = ref(0)
const frameSlots = ref<string[]>([])
const compositeUrl = ref<string | null>(null)
const showFrameSelect = ref(true)
const localFrames = ref<{ layout: string, url: string, name: string }[]>([])
const templateFrames = ref<{ layout: string, url: string, name: string }[]>([])
const router = useRouter()

onMounted(async () => {
  if (!gallery.value.length) {
    router.push('/')
    return
  }
  try {
    const res = await fetch('/frames/frames.json')
    localFrames.value = await res.json()
    const res2 = await fetch('/frames/template-frames.json')
    templateFrames.value = await res2.json()
  } catch (e) {
    localFrames.value = []
    templateFrames.value = []
  }
})

function chooseFrame(frame: { layout: string, url: string, name: string }) {
  selectedFrame.value = frame.layout as '1x3' | '2x3'
  selectedFrameUrl.value = frame.url
  slotCount.value = frame.layout === '1x3' ? 3 : 6
  frameSlots.value = Array(slotCount.value).fill('')
  compositeUrl.value = null
  showFrameSelect.value = false
}

function selectPhoto(photo: string) {
  const idx = frameSlots.value.findIndex(slot => !slot)
  if (idx !== -1 && !frameSlots.value.includes(photo)) {
    frameSlots.value[idx] = photo
  }
}

function generateComposite() {
  const width = selectedFrame.value === '1x3' ? 1200 : 800
  const height = selectedFrame.value === '1x3' ? 400 : 800
  const cols = selectedFrame.value === '1x3' ? 3 : 3
  const rows = selectedFrame.value === '1x3' ? 1 : 2
  const slotW = width / cols
  const slotH = height / rows
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, width, height)
  let loaded = 0
  for (let i = 0; i < frameSlots.value.length; i++) {
    const img = new window.Image()
    img.src = frameSlots.value[i]
    img.onload = () => {
      const col = i % cols
      const row = Math.floor(i / cols)
      ctx.drawImage(img, col * slotW, row * slotH, slotW, slotH)
      loaded++
      if (loaded === frameSlots.value.length) {
        // Draw the selected frame overlay
        if (selectedFrameUrl.value) {
          const frameImg = new window.Image()
          frameImg.src = selectedFrameUrl.value
          frameImg.onload = () => {
            ctx.drawImage(frameImg, 0, 0, width, height)
            compositeUrl.value = canvas.toDataURL('image/png')
          }
        } else {
          compositeUrl.value = canvas.toDataURL('image/png')
        }
      }
    }
  }
}

const frameTemplates = computed(() => templateFrames.value)
const frameThumbnails = computed(() => localFrames.value)
</script>

<style scoped>
.frame-selection-layout {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-top: 2rem;
  align-items: flex-start;
}
.gallery-side {
  flex: 1;
}
.frame-side {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 1rem 0;
}
.gallery-photo {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border: 2px solid #42b883;
  border-radius: 4px;
  cursor: pointer;
  opacity: 1;
  transition: box-shadow 0.2s, opacity 0.2s;
}
.gallery-photo.used {
  opacity: 0.4;
  pointer-events: none;
}
.frame-select-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.frame-select-content {
  background: #fff;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.frame-thumbnails {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
}
.frame-thumb {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 0.5rem;
  transition: border 0.2s;
  background: #f8f8f8;
}
.frame-thumb:hover {
  border: 2px solid #42b883;
}
.frame-thumb img {
  width: 160px;
  height: 120px;
  object-fit: contain;
  border-radius: 6px;
  background: #3c3c3c;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.frame-name {
  margin-top: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
}
.frame-layout {
  font-size: 0.9rem;
  color: #888;
}
.frame-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 1rem 0;
}
.frame-preview.\31 x3 {
  flex-direction: row;
}
.frame-preview.\32 x3 {
  flex-direction: row;
  flex-wrap: wrap;
  width: 270px;
}
.frame-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border: 2px dashed #aaa;
  border-radius: 4px;
  background: #f8f8f8;
  position: relative;
}
.slot-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}
.slot-placeholder {
  color: #aaa;
  font-size: 0.9rem;
}
.composite-preview {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.composite-img {
  max-width: 400px;
  border: 2px solid #42b883;
  border-radius: 8px;
  margin-bottom: 1rem;
}
</style> 