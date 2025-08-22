<template>
  <div class="photobooth">
    <h1 class="title">{{ title }}</h1>
    <div class="video-container">
      <video ref="videoRef" autoplay playsinline width="500" height="400" :class="{ hidden: loading }" />
      <div v-if="showFlash" class="flash-overlay"></div>
    </div>
    <canvas ref="canvasRef" width="400" height="300" style="display:none;" />
    <div v-if="loading" class="loading">Loading camera...</div>
    <div v-else-if="!isTakingSequence && !showGallery" class="camera-select">
          <label for="camera">Select Camera:</label>
          <select id="camera" v-model="selectedDeviceId" @change="startCamera">
            <option v-for="device in videoDevices" :key="device.deviceId" :value="device.deviceId">
              {{ device.label || 'Camera ' + device.deviceId }}
            </option>
          </select>
        </div>
    <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
    <div v-else-if="loading" class="loading"></div>
    <div v-else>
      <div v-if="!isTakingSequence && !showGallery">
        <div class="timer-select">
          <label for="timer">Timer: </label>
          <select id="timer" v-model.number="timerDuration">
            <option :value="1">1 seconds</option>
            <option :value="3">3 seconds</option>
            <option :value="5">5 seconds</option>
            <option :value="7">7 seconds</option>
          </select>

          <button @click="takePhotoSequence">Take Photos</button>
          <div v-if="captureError" class="error">{{ captureError }}</div>
          <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
        </div>
      </div>
      <div v-if="isTakingSequence">
        <div class="countdown">
          <h2>Photo {{ currentPhotoIdx + 1 }} of {{ maxPhotos }}</h2>
          <div class="timer">{{ countdown }}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useGalleryStore } from '../stores/useGalleryStore'
import { useFrameStore } from '../stores/frameStore'

const videoRef = ref<HTMLVideoElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const videoDevices = ref<MediaDeviceInfo[]>([])
const selectedDeviceId = ref<string | null>(null)

const stream = ref<MediaStream | null>(null)
const loading = ref(true)
const errorMsg = ref('')
const captureError = ref('')

const timerDuration = ref(3)
const title = ref('Photobooth JU')

const { gallery } = useGalleryStore()
const frameStore = useFrameStore()

const totalPhotos = computed(() => {
  if (!frameStore.selectedTemplate) return 0
  return frameStore.selectedTemplate?.photos || 0
})
const extraShots = 2
const maxPhotos = computed(() => totalPhotos.value + extraShots)

const showGallery = ref(false)
const isTakingSequence = ref(false)
const currentPhotoIdx = ref(0)
const countdown = ref(4)
let timerId: number | null = null
const showFlash = ref(false)

const router = useRouter()

// Fetch all video input devices and set default selected device
async function getVideoDevices() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    videoDevices.value = devices.filter(device => device.kind === 'videoinput')
    if (videoDevices.value.length > 0 && !selectedDeviceId.value) {
      selectedDeviceId.value = videoDevices.value[0].deviceId
    }
  } catch (err) {
    console.error('Error enumerating devices:', err)
  }
}

// Start camera stream based on selectedDeviceId
async function startCamera() {
  loading.value = true
  errorMsg.value = ''

  // Stop previous stream if exists
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
    stream.value = null
  }

  try {
    if (!selectedDeviceId.value) {
      stream.value = await navigator.mediaDevices.getUserMedia({ video: true })
    } else {
      stream.value = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: selectedDeviceId.value } },
      })
    }

    if (videoRef.value && stream.value) {
      // Remove existing srcObject before setting a new one to help avoid interruptions
      videoRef.value.srcObject = null
      await new Promise((resolve, reject) => {
        videoRef.value!.onloadedmetadata = () => resolve(true)
        videoRef.value!.onplay = () => resolve(true)
        videoRef.value!.onerror = (e) => reject(e)
        videoRef.value!.srcObject = stream.value
      })

      await videoRef.value.play()
      loading.value = false
    } else {
      errorMsg.value = 'Video element or stream not available.'
      loading.value = false
    }
  } catch (err: any) {
    errorMsg.value = 'Could not access the camera. ' + (err?.message || '')
    loading.value = false
  }
}

onMounted(async () => {
  await getVideoDevices()
  await startCamera()
})

onBeforeUnmount(() => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
  }
  if (timerId) clearTimeout(timerId)
})

// Watch selected device changes and restart camera
watch(selectedDeviceId, async (newId, oldId) => {
  if (newId !== oldId) {
    await startCamera()
  }
})

function runCountdownAndCapture() {
  if (currentPhotoIdx.value >= maxPhotos.value) {
    isTakingSequence.value = false
    showGallery.value = true
    title.value = 'Photobooth JU' // Reset title after photo sequence
    goToFrameDesign()
    return
  }
  countdown.value = timerDuration.value
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

function takePhotoSequence() {
  title.value = 'Smile :)'
  gallery.value = []
  isTakingSequence.value = true
  currentPhotoIdx.value = 0
  countdown.value = timerDuration.value
  nextTick().then(() => {
    runCountdownAndCapture()
  })
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

function goToFrameDesign() {
  frameStore.setTakenPhotos(gallery.value)
  router.push('/photoboothSelection')
}
</script>


<style scoped>
.photobooth {
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: normal;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  padding: 0 1rem; /* Horizontal padding for small screens */
}

.countdown h2 {
  font-size: 2rem;
  text-align: center;
  margin: 0.5rem 0;
}

.timer {
  font-size: 3rem;
  color: #42b883;
  margin-top: 1rem;
  font-weight: bold;
  text-align: center;
}

.title {
  margin-bottom: 1rem;
  font-size: 2rem;
  text-align: center;
}

.video-container {
  position: relative;
  width: 100%;
  max-width: 640px;
}

video {
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: block;
}

canvas {
  width: 100% !important;
  height: auto !important;
  border-radius: 10px;
}

.flash-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  opacity: 0.8;
  pointer-events: none;
  border-radius: 10px;
  z-index: 2;
  animation: flash 0.12s linear;
}

@keyframes flash {
  from { opacity: 0.8; }
  to { opacity: 0; }
}

.timer-select,
.camera-select {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.timer-select label,
.camera-select label {
  font-weight: 600;
}

select {
  padding: 0.3rem 0.6rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  min-width: 120px;
}

button {
  font-family: 'Quicksand', sans-serif;
  font-size: 1rem;
  color: #fff;
  margin-right: 0.5rem;
  padding: 0.5rem 1.5rem;
  background: #42b883;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background: #aaa;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #368f6e;
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
  justify-content: center;
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

/* Responsive Media Queries */
@media (max-width: 768px) {
  .countdown h2 {
    font-size: 1.5rem;
  }
  .timer {
    font-size: 2.5rem;
  }
  .title {
    font-size: 1.8rem;
  }
  .video-container {
    max-width: 90%;
  }
  button {
    padding: 0.4rem 1rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .countdown h2 {
    font-size: 1.2rem;
  }
  .timer {
    font-size: 2rem;
  }
  .title {
    font-size: 1.5rem;
  }
  .video-container {
    width: 100%; /* take full width of screen */
    max-width: 100%; /* override desktop max-width */
  }
  video {
    width: 100%; /* stretch video */
    height: auto; /* keep aspect ratio */
  }
  .timer-select,
  .camera-select {
    flex-direction: column;
    gap: 0.5rem;
  }
  button, select {
    width: 100%;
  }
  .gallery-photo {
    width: 60px;
    height: 45px;
  }
}
</style> 