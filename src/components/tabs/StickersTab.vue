<template>
    <div class="stickers-tab">
      <!-- Example: simple stickers -->
      <div class="stickers-list">
        <span
          v-for="sticker in stickers"
          :key="sticker"
          class="sticker"
          @click="$emit('select-sticker', sticker)"
        >
          {{ sticker }}
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  const stickers = ['⭐', '❤️', '🎉', '🌸']
  </script>
  
  <style scoped>
  .stickers-list {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  .sticker {
    font-size: 1.5rem;
    cursor: pointer;
  }
  </style>
  