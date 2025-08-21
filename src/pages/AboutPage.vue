<template>
  <div class="about-page">
    <div class="about-container">
      <h1 class="about-title">About PhotoBooth</h1>
      <p class="about-description">
        Our online photobooth is a fun, customizable tool you can use right in your browser—anytime, anywhere. No installation or account is needed.

        Take instant photobooth-style photos, add frames in over 100 colors, decorate with digital stickers, and download high-resolution photo strips straight to your device. Everything is designed to be fast, simple, and flexible, giving you an easy way to create and share your photos.
        </p>

      <h2 class="faq-title">FAQ</h2>
      <div class="faq-list">
        <div class="faq-item">
          <h3 class="faq-question">How do I use this site?</h3>
          <ol class="faq-answer-list">
            <li>Choose your preferred photo layout.</li>
            <li>Allow camera permissions.</li>
            <li>Pose for each photo—you can adjust the countdown to your liking.</li>
            <li>Select the photo you want to put on the photo strip. </li>
            <li>Once done, customize your photo strip by adjusting the border color (including custom colors), adding stickers, adding captions, date and time, or even choosing the theme. </li>
            <li>Click "Download" to save your photo!</li>
          </ol>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">Can I use this on mobile?</h3>
          <p class="faq-answer">Yes! The app is now fully optimized for mobile devices and works in both portrait and landscape mode.</p>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">Can I customize the photobooth strip?</h3>
          <p class="faq-answer">Absolutely! You can personalize your photo strips with custom border colors, add fun stickers, include the date, and even swap out the caption—everything to make your photos truly your own.
          </p>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">Can I choose my preferred layout?</h3>
          <p class="faq-answer">Yes! You can pick from different layouts to arrange your photos just the way you like, making each strip unique and personalized.
          </p>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">Why is the screen black even after allowing camera access?</h3>
          <p class="faq-answer">Your camera permissions might be blocked. Go to: Settings → Privacy & Security → Camera<br>Turn on: "Let apps access your camera" and "Let desktop apps access your camera".</p>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">Do you store my photos or data?</h3>
          <p class="faq-answer">Nope! Your photos stay on your device and are never uploaded or stored anywhere. Everything happens right in your browser, so you’re always in control of your images.
          </p>
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
