<template>
  <div class="about-page">
    <div class="about-container">
      <h1 class="about-title">About PhotoBooth</h1>
      <p class="about-description">
        Our online photobooth is a customizable, browser-based tool you can use anytime, anywhere. Users can take instant photobooth-style photos, apply frames in over 100 colors, add digital stickers, and download high-resolution photo strips directly from any device. No installation or account required. Designed for performance, simplicity, and creative flexibility, it’s an all-in-one tool for creating shareable photo experiences online.
      </p>

      <h2 class="faq-title">FAQ</h2>
      <div class="faq-list">
        <div class="faq-item">
          <h3 class="faq-question">How do I use this site?</h3>
          <ol class="faq-answer-list">
            <li>Choose your preferred photo layout.</li>
            <li>Allow camera permissions.</li>
            <li>Pose for each photo—there’s a 3-second countdown for each shot.</li>
            <li>Click "Done" if you’re happy with the photos, or select "Retake" to capture them again.</li>
            <li>Once finalized, customize your photo strip by adjusting the border color (including custom colors), adding stickers, changing the logo language, or overlaying the date.</li>
            <li>Click "Download" to save your digital copy!</li>
          </ol>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">Can I use this on mobile?</h3>
          <p class="faq-answer">Yes! The app is now fully optimized for mobile devices and works in both portrait and landscape mode.</p>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">Can I customize the photobooth strip?</h3>
          <p class="faq-answer">Absolutely! We’ve listened to your requests, and now you can personalize your photo strip with custom border colors, sticker overlays, date overlays, and even change the logo.</p>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">Can I choose my preferred layout?</h3>
          <p class="faq-answer">Yes! You can select from three different layouts: 2, 3, or 4-photo strips to match your style.</p>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">Why is the screen black even after allowing camera access?</h3>
          <p class="faq-answer">Your camera permissions might be blocked. Go to: Settings → Privacy & Security → Camera<br>Turn on: "Let apps access your camera" and "Let desktop apps access your camera".</p>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">Why does my camera feed start black?</h3>
          <p class="faq-answer">That’s intentional! The app waits until you accept camera permissions before displaying the video feed.</p>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">Do you store my photos or data?</h3>
          <p class="faq-answer">Nope! Your photos stay on your device and never get uploaded or stored anywhere. Everything happens locally in your browser, so you have full control over your images.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No logic needed for this static page
</script>

<style scoped>
.about-page {
  height: 100vh;
  overflow-y: auto;
  padding: 2rem 1rem;
}

.about-container {
  max-width: 700px;
  width: 100%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 1rem 2rem;
  margin: 0 auto;
  margin-top: 4rem;
}


.about-title {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #222;
  text-align: center;
}

.about-description {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 2.5rem;
  line-height: 1.7;
  text-align: center;
}

.faq-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #222;
  text-align: center;
}

.faq-list {
  text-align: left;
}

.faq-item {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.faq-question {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
  color: #2c3e50;
}

.faq-answer {
  color: #444;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

.faq-answer-list {
  color: #444;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  padding-left: 1.5rem;
  list-style: decimal;
}

@media (max-width: 768px) {
  .about-container {
    padding: 5rem 0.5rem 2rem 0.5rem;
  }

  .about-title {
    font-size: 1.5rem;
  }

  .faq-title {
    font-size: 1.1rem;
  }
}
</style>
