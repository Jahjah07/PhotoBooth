<template>
  <div class="stickers-tab">
    <div class="stickers-list">
      <div v-for="sticker in stickers" :key="sticker.id" class="sticker" @click="frameStore.addSticker(sticker)">
        <img :src="sticker.src" :alt="sticker.name" class="sticker-img"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import stickers from "../../config/stickers.js";
import { useFrameStore } from "../../stores/frameStore";

const frameStore = useFrameStore();
</script>

<style scoped>
.stickers-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.sticker {
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: border 0.2s ease-in-out;
}

.sticker:hover {
  border: 2px solid #000;
}

.sticker-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
