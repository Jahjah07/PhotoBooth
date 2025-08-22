<template>
  <div class="preview-page">
    <h2 class="title mobile-hidden">Customize Your Frame</h2>

    <div class="content-wrapper">
      <FramePreview
        :frame="frame"
        :selected-photos="selectedPhotos"
        :frame-color="frameColor"
        :caption="caption"
        :caption-font-color="captionFontColor"
        :caption-font-family="captionFontFamily"
        :show-date="showDate"
        :show-time="showTime"
        :date-time-font-color="dateTimeFontColor"
        :formatted-date="formattedDate"
        :formatted-time="formattedTime"
      />

      <DesignPanel
        v-model:caption="caption"
        v-model:captionFontColor="captionFontColor"
        v-model:captionFontFamily="captionFontFamily"
        v-model:captionLanguage="captionLanguage"
        v-model:showDate="showDate"
        v-model:showTime="showTime"
        v-model:dateTimeFontColor="dateTimeFontColor"
        v-model:frameColor="frameColor"
        v-model:activeTab="activeTab"
      />
    </div>

    <div class="actions">
      <button @click="goBack" class="custom-btn change-btn">Change Photos</button>
      <button @click="downloadFrameImage" class="custom-btn download-btn">Download Image</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
// import html2canvas from "html2canvas";
import { useFrameStore } from "../stores/frameStore";

import FramePreview from "../components/FramePreview.vue";
import DesignPanel from "../components/DesignPanel.vue";

const router = useRouter();
const frameStore = useFrameStore();

const frame = computed(() => frameStore.selectedFrame || { name: "", layout: "1x3" });
const selectedPhotos = computed(() => frameStore.selectedPhotos || []);

const activeTab = ref("color");
const frameColor = ref("#4cafef");
const caption = ref("");
const captionLanguage = ref("en");
const captionFontColor = ref("#333333");
const captionFontFamily = ref("Segoe UI, Tahoma, Geneva, Verdana, sans-serif");
const showDate = ref(false);
const showTime = ref(false);
const dateTimeFontColor = ref("#666666");

const now = new Date();
const formattedDate = computed(() =>
  now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
);
const formattedTime = computed(() =>
  now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
);

function goBack() {
  router.back();
}

async function downloadFrameImage() {
  const frameElement = document.querySelector(".frame-preview");
  if (!frameElement) return;

  // Get frame dimensions
  const rect = frameElement.getBoundingClientRect();
  const width = Math.floor(rect.width);
  const height = Math.floor(rect.height);

  // Create a high-resolution canvas
  const canvas = document.createElement("canvas");
  canvas.width = width * 2;
  canvas.height = height * 2;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 1️⃣ Draw theme or fallback background color
  const themeImg = frameElement.querySelector(".frame-bg img");
  if (themeImg && themeImg.complete) {
    ctx.drawImage(
      themeImg,
      0,
      0,
      themeImg.naturalWidth,
      themeImg.naturalHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );
  } else {
    const frameColor = frameElement.style.backgroundColor || "#4cafef";
    ctx.fillStyle = frameColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // 2️⃣ Draw photos (cropped like object-fit: cover)
  const photoSlots = frameElement.querySelectorAll(".photo-slot img");
  const slotRects = frameElement.querySelectorAll(".photo-slot");
  photoSlots.forEach((img, i) => {
  const slot = slotRects[i];
  if (!slot) return;

  const slotRect = slot.getBoundingClientRect();
  const imgRect = img.getBoundingClientRect();

  const slotX = slotRect.left - frameElement.getBoundingClientRect().left;
  const slotY = slotRect.top - frameElement.getBoundingClientRect().top;
  const slotW = slotRect.width;
  const slotH = slotRect.height;

  const imgEl = img;
  const imgRatio = imgEl.naturalWidth / imgEl.naturalHeight;
  const slotRatio = slotW / slotH;

  let sx = 0, sy = 0, sWidth = imgEl.naturalWidth, sHeight = imgEl.naturalHeight;

  if (imgRatio > slotRatio) {
    sWidth = imgEl.naturalHeight * slotRatio;
    sx = (imgEl.naturalWidth - sWidth) / 2;
  } else {
    sHeight = imgEl.naturalWidth / slotRatio;
    sy = (imgEl.naturalHeight - sHeight) / 2;
  }

  ctx.drawImage(
    imgEl,
    sx,
    sy,
    sWidth,
    sHeight,
    slotX * 2,
    slotY * 2,
    slotW * 2,
    slotH * 2
  );
});


  // 3️⃣ Draw caption
  const captionEl = frameElement.querySelector(".frame-caption");
  if (captionEl) {
    const style = getComputedStyle(captionEl);
    ctx.fillStyle = style.color;
    ctx.font = `${parseFloat(style.fontSize) * 2}px ${style.fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const x = width;
    const y = captionEl.offsetTop * 2;
    ctx.fillText(captionEl.textContent, x, y, width * 0.9);
  }

  // 4️⃣ Draw date/time
  const dtEl = frameElement.querySelector(".frame-datetime");
  if (dtEl) {
    const style = getComputedStyle(dtEl);
    ctx.fillStyle = style.color;
    ctx.font = `${parseFloat(style.fontSize) * 2}px ${style.fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const x = width;
    const y = dtEl.offsetTop * 2;
    ctx.fillText(dtEl.textContent, x, y, width * 0.9);
  }

  // 5️⃣ Draw stickers
  const stickers = frameElement.querySelectorAll(".stickers-layer img");
  stickers.forEach(sticker => {
    const rect = sticker.getBoundingClientRect();
    const parentRect = frameElement.getBoundingClientRect();
    const x = (rect.left - parentRect.left) * 2;
    const y = (rect.top - parentRect.top) * 2;
    const w = rect.width * 2;
    const h = rect.height * 2;
    if (sticker.complete) ctx.drawImage(sticker, x, y, w, h);
  });

  // Export the canvas
  const link = document.createElement("a");
  link.download = "photobooth-frame.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

</script>

<style scoped src="../assets/css/preview-page.css"></style>
