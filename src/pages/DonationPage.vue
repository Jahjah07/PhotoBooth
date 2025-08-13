<template>
    <section class="donations-page">
      <div class="container">
        <h1 class="title">Support PhotoBooth</h1>
        <p class="intro">
          PhotoBooth is free for everyone thanks to supporters like you! Your donation helps us keep improving the app, adding fun new features, and maintaining reliable service.
        </p>
  
        <div class="donation-options">
          <button class="donate-btn">$5 — Buy me a coffee ☕</button>
          <button class="donate-btn">$20 — Unlock a new sticker pack 🎉</button>
          <button class="donate-btn">$50 — Sponsor a new feature 💡</button>
          <div class="custom-donation">
            <label for="customAmount">Or enter a custom amount</label>
            <input id="customAmount" type="number" min="1" placeholder="$10" />
            <button class="donate-btn">Donate</button>
          </div>
        </div>
  
        <h2>How Your Donation Helps</h2>
        <ul class="donation-uses">
          <li>🖥️ Hosting and bandwidth to keep PhotoBooth running smoothly</li>
          <li>🎨 Designing new frames, stickers, and overlays</li>
          <li>⚙️ Continuous development and feature improvements</li>
        </ul>
  
        <p class="thank-you">
          Thank you so much for your support! Every donation, big or small, means the world to us.
        </p>
      </div>
    </section>
  </template>
  
  <style scoped>
.donations-page {
  height: 100vh;
  overflow-y: auto;
  padding: 2rem 1rem;
}

.container {
  max-width: 700px;
  width: 100%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 1rem 2rem;
  margin: 0 auto;
  margin-top: 4rem;
}

.title {
  font-family: 'Poppins', sans-serif; /* Example: a modern, clean font */
  font-weight: 700;
  font-size: 2.5rem;
  color: #222;
  text-align: center;
  margin-bottom: 1.5rem;
}

.intro {
  font-family: 'Open Sans', sans-serif; /* A readable, friendly body font */
  font-weight: 400;
  font-size: 1.15rem;
  line-height: 1.7;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
}

  </style>
  