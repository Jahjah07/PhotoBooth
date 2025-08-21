<template>
  <div class="privacy-page">
    <div class="privacy-container">
      <h1 class="privacy-title">Privacy Policy</h1>
      <h2 class="title">Your Privacy Comes First</h2>
      <p class="privacy-text">
        Don’t worry—this Photobooth App doesn’t collect, store, or share your photos or personal data. Everything happens right on your device, so your images stay private.
      </p>
      <p class="privacy-text">
        The app only asks for camera access when you want to take a photo. After that, your pictures stay with you—no uploads, no tracking, no hidden storage.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Privacy Policy page
</script>

<style scoped>
.privacy-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.title{
  margin-bottom: 10px;
}
.privacy-container {
  max-width: 600px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 3rem 2rem;
  text-align: center;
}

.privacy-title {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #222;
}

.privacy-text {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .privacy-container {
    padding: 2.5rem 1.5rem;
  }
  .privacy-title {
    font-size: 1.8rem;
  }
  .privacy-subtitle {
    font-size: 1.3rem;
  }
  .privacy-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .privacy-container {
    padding: 2rem 1rem;
    border-radius: 12px;
  }
  .privacy-title {
    font-size: 1.6rem;
  }
  .privacy-subtitle {
    font-size: 1.2rem;
  }
  .privacy-text {
    font-size: 0.95rem;
  }
}
</style>
