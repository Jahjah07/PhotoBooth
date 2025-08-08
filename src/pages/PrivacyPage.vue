<template>
  <div class="privacy-page">
    <div class="privacy-container">
      <h1 class="privacy-title">Privacy Policy</h1>
      <p class="privacy-text">
        Your privacy matters! This Photobooth App does not collect, store, or share any of your data or photos. Everything happens locally on your device—your images never leave your browser.
      </p>
      <p class="privacy-text">
        The app only accesses your camera with your permission, and once you take your photos, they stay with you. No uploads, no tracking, no hidden storage.
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
</style>
