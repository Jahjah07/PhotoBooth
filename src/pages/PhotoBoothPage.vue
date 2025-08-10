<template>
  <div class="photobooth">
    <h1>Photobooth JU</h1>
    <div class="video-container">
      <video ref="videoRef" autoplay playsinline width="400" height="300" :class="{ hidden: loading }" />
      <div v-if="showFlash" class="flash-overlay"></div>
    </div>
    <canvas ref="canvasRef" width="400" height="300" style="display:none;" />
    <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
    <div v-else-if="loading" class="loading">Loading camera...</div>
    <div v-else>
      <div v-if="!isTakingSequence && !showGallery">
        <button @click="takePhotoSequence">Take Photos</button>
        <div v-if="captureError" class="error">{{ captureError }}</div>
      </div>
      <div v-if="isTakingSequence">
        <div class="countdown">
          <h2>Photo {{ currentPhotoIdx + 1 }} of {{ maxPhotos }}</h2>
          <div class="timer">{{ countdown }}</div>
        </div>
      </div>
      <div v-if="showGallery">
        <h2>Gallery ({{ gallery.length }}/{{ maxPhotos }})</h2>
        <div class="gallery">
          <img v-for="(photo, idx) in gallery" :key="idx" :src="photo" class="gallery-photo" @click="openPreview(photo)" />
        </div>
        <button @click="retakeAllPhotos">Retake All Photos</button>
        <button @click="goToFrameDesign">Next: Select Frame</button>
      </div>
      <div v-if="previewPhoto" class="modal-overlay" @click.self="closePreview">
        <div class="modal-content">
          <img :src="previewPhoto" class="modal-photo" />
          <button class="close-btn" @click="closePreview">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGalleryStore } from '../stores/useGalleryStore'
import { useFrameStore } from '../stores/frameStore' // ✅ import frame store

const videoRef = ref<HTMLVideoElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const stream = ref<MediaStream | null>(null)
const loading = ref(true)
const errorMsg = ref('')
const captureError = ref('')

const { gallery } = useGalleryStore()
const frameStore = useFrameStore() // ✅ get frame store
const photos = frameStore.takenPhotos;

// ✅ Dynamic maxPhotos based on selected frame
const totalPhotos = computed(() => {
  if (!frameStore.selectedFrame) return 0
  return frameStore.selectedFrame?.photos || 0;
})
const extraShots = 2;
const maxPhotos = computed(() => totalPhotos.value + extraShots);

const showGallery = ref(false)
const isTakingSequence = ref(false)
const currentPhotoIdx = ref(0)
const countdown = ref(4)
let timerId: number | null = null
const showFlash = ref(false)
const previewPhoto = ref<string | null>(null)

const router = useRouter()

onMounted(async () => {
  loading.value = true
  errorMsg.value = ''
  let timeoutId: number | undefined
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ video: true })
    await nextTick()
    if (videoRef.value && stream.value) {
      videoRef.value.srcObject = stream.value
      videoRef.value.onloadedmetadata = () => {
        loading.value = false
        videoRef.value?.play()
        if (timeoutId) clearTimeout(timeoutId)
      }
      timeoutId = window.setTimeout(() => {
        if (loading.value) {
          errorMsg.value = 'Camera stream did not load in time. Please refresh or try a different browser.'
          loading.value = false
        }
      }, 5000)
    } else {
      errorMsg.value = 'Video element or stream not available.'
      loading.value = false
    }
  } catch (err: any) {
    errorMsg.value = 'Could not access the camera. ' + (err?.message || '')
    loading.value = false
  }
})

onBeforeUnmount(() => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
  }
  if (timerId) clearTimeout(timerId)
})

function takePhotoSequence() {
  gallery.value = []
  isTakingSequence.value = true
  currentPhotoIdx.value = 0
  countdown.value = 4
  nextTick().then(() => {
    runCountdownAndCapture()
  })
}

function runCountdownAndCapture() {
  if (currentPhotoIdx.value >= maxPhotos.value) {
    isTakingSequence.value = false
    showGallery.value = true
    return
  }
  countdown.value = 1
  timerId = window.setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timerId!)
      timerId = null
      capturePhotoWithFlash()
      currentPhotoIdx.value++
      setTimeout(runCountdownAndCapture, 500)
    }
  }, 1000)
}

function capturePhotoWithFlash() {
  showFlash.value = true
  setTimeout(() => {
    capturePhoto()
    showFlash.value = false
  }, 120)
}

function capturePhoto() {
  captureError.value = ''
  if (!videoRef.value || !canvasRef.value) {
    captureError.value = 'Video or canvas element not available.'
    return
  }
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) {
    captureError.value = 'Could not get canvas context.'
    return
  }
  const width = videoRef.value.videoWidth || 400
  const height = videoRef.value.videoHeight || 300
  canvasRef.value.width = width
  canvasRef.value.height = height
  if (width === 0 || height === 0) {
    captureError.value = 'Video not ready. Please try again.'
    return
  }
  ctx.drawImage(videoRef.value, 0, 0, width, height)
  gallery.value.push(canvasRef.value.toDataURL('image/png'))
}

function retakeAllPhotos() {
  gallery.value = []
  showGallery.value = false
  isTakingSequence.value = false
  currentPhotoIdx.value = 0
  countdown.value = 4
}

function openPreview(photo: string) {
  previewPhoto.value = photo
}

function closePreview() {
  previewPhoto.value = null
}

function goToFrameDesign() {
  frameStore.setTakenPhotos(gallery.value);
  router.push('/photoboothSelection');
}
</script>


<style scoped>
.photobooth {
  font-family: 'Chewy', cursive;
  font-size: 1rem;
  font-weight: normal;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
}
.video-container {
  position: relative;
  width: 400px;
  height: 300px;
}
video {
  border: 2px solid #42b883;
  border-radius: 8px;
  background: #000;
  width: 400px;
  height: 300px;
}
.flash-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  height: 300px;
  background: white;
  opacity: 0.8;
  pointer-events: none;
  border-radius: 8px;
  z-index: 2;
  animation: flash 0.12s linear;
}
@keyframes flash {
  from { opacity: 0.8; }
  to { opacity: 0; }
}
button {
  font-family: 'Quicksand', sans-serif;
  font-size: 1rem;
  color: #222;
  margin-top: 1rem;
  margin-right: 0.5rem;
  padding: 0.5rem 1.5rem;
  font-size: 1.2rem;
  background: #42b883;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background: #aaa;
  cursor: not-allowed;
}
button:hover:enabled {
  background: #368f6e;
}
.loading {
  margin: 2rem;
  font-size: 1.2rem;
  color: #888;
}
.error {
  margin: 2rem;
  color: #d32f2f;
  font-weight: bold;
  font-size: 1.2rem;
}
.hidden {
  display: none;
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
  transition: box-shadow 0.2s;
}
.gallery-photo:hover {
  box-shadow: 0 0 0 3px #42b88355;
}
.countdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}
.timer {
  font-size: 3rem;
  color: #42b883;
  margin-top: 1rem;
  font-weight: bold;
}
.modal-overlay {
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
.modal-content {
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.modal-photo {
  max-width: 80vw;
  max-height: 70vh;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 0 0 4px #42b88333;
}
.close-btn {
  background: #d32f2f;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin-top: 0.5rem;
}
.close-btn:hover {
  background: #a31515;
}
</style> 