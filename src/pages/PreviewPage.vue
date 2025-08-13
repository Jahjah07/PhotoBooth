<template>
  <div class="preview-page">
    <h2 class="title">Customize Your Frame</h2>
    <p>Frame: {{ frame.name }}</p>

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
      <button @click="goBack">Change Photos</button>
      <button @click="downloadFrameImage">Download Image</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import html2canvas from "html2canvas";
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

function downloadFrameImage() {
  const frameElement = document.querySelector(".frame-preview");
  if (!frameElement) return;

  html2canvas(frameElement).then((canvas) => {
    const link = document.createElement("a");
    link.download = "photobooth-frame.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}
</script>

<style scoped src="../assets/css/preview-page.css"></style>
