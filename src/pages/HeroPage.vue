<template>
  <div class="hero-page">
    <img src="/images/Photobooth-design.png" class="sticker sticker-top-left" alt="Sticker" />
    <img src="/images/Photobooth-design.png" class="sticker sticker-bottom-left" alt="Sticker" />
    <img src="/images/Photobooth-design.png" class="sticker sticker-top-right" alt="Sticker" />
    <img src="/images/Photobooth-design.png" class="sticker sticker-bottom-right" alt="Sticker" />
    
    <div class="hero-content">
      <div class="hero-stack">
        <h1 class="hero-title">Photobooth</h1>
        <div class="divider-line"></div>
        <span class="hero-subtitle">Capture Moments That Matter</span>
      </div>
    </div>
    
    <div class="cta-section">
      <button class="cta-button" @click="FrameSelection">
        Start →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function FrameSelection() {
  router.push('/frameSelection')
}
</script>

<style scoped>
.hero-page {
  height: 100vh;
  width: 100vw;
  background: #fafafa;
  background-image: url('/images/Photobooth-background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  margin: 0;
  position: relative;
  overflow: hidden;
}

.sticker {
  position: absolute;
  width: 350px;
  height: auto;
  z-index: 1;
  pointer-events: none;
  user-select: none;
}

.sticker-top-left {
  top: 150px;
  left: 0;
  margin: 2rem;
}
.sticker-bottom-left {
  bottom: 0;
  left: -100px;
  margin: 2rem;
}
.sticker-top-right {
  top: 150px;
  right: -150px;
  margin: 2rem;
}
.sticker-bottom-right {
  bottom: 0;
  right: -200px;
  margin: 2rem;
}

.hero-content {
  text-align: center;
  width: 100%;
  max-width: 1200px;
  z-index: 2;
}

.hero-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-title {
  font-family: 'Chewy', cursive;
  font-size: 4rem;
  font-weight: normal;
  color: #000;
  margin: 0;
  line-height: 1;
}

.divider-line {
  width: 320px;
  height: 2px;
  background: #000;
  margin: 0.5rem 0;
}

.hero-subtitle {
  font-family: 'Quicksand', sans-serif;
  font-size: 1rem;
  color: #222;
  font-weight: 500;
  margin: 0;
  line-height: 1.1;
}

.cta-section {
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 2;
}

.cta-button {
  background: none;
  border: none;
  color: #000;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: opacity 0.2s ease;
}

.cta-button:hover {
  opacity: 0.7;
}

/* Tablet */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 3rem;
  }
  .divider-line {
    width: 200px;
  }
  .sticker {
    width: 200px;
  }
  .cta-button {
    font-size: 1.1rem;
    padding: 0.5rem 0.8rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.2rem;
  }
  .divider-line {
    width: 60px;
    margin: 0.3rem 0;
  }
  .hero-subtitle {
    font-size: 0.9rem;
    padding: 0 1rem;
  }
  .cta-section {
    bottom: 2rem;
  }
  .sticker {
    width: 60px;
    margin: 0.5rem;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }
  .hero-subtitle {
    font-size: 0.8rem;
  }
  .cta-button {
    font-size: 1rem;
    padding: 0.4rem 0.6rem;
  }
  .sticker {
    display: none; /* hide stickers on very small screens for clarity */
  }
}
</style>
