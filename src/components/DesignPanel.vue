<script setup>
import { ref } from 'vue';
import CaptionDateTab from './tabs/CaptionDateTab.vue';
import ColorPickerTab from './tabs/ColorPickerTab.vue';
import StickersTab from './tabs/StickersTab.vue';
import ThemeTab from './tabs/ThemeTab.vue';
import { useFrameStore } from '../stores/frameStore';

const props = defineProps({
  activeTab: String,
  frameColor: String,
  caption: String,
  captionFontColor: String,
  captionFontFamily: String,
  captionLanguage: String,
  showDate: Boolean,
  showTime: Boolean,
  dateTimeFontColor: String,
});
const frameStore = useFrameStore()
const emit = defineEmits([
  'update:activeTab',
  'update:frameColor',
  'update:caption',
  'update:captionFontColor',
  'update:captionFontFamily',
  'update:captionLanguage',
  'update:showDate',
  'update:showTime',
  'update:dateTimeFontColor',
]);

function onCaptionUpdate(val) {
  emit('update:caption', val);
}
function onCaptionFontColorUpdate(val) {
  emit('update:captionFontColor', val);
}
function onCaptionFontFamilyUpdate(val) {
  emit('update:captionFontFamily', val);
}
function onCaptionLanguageUpdate(val) {
  emit('update:captionLanguage', val);
}
function onShowDateUpdate(val) {
  emit('update:showDate', val);
}
function onShowTimeUpdate(val) {
  emit('update:showTime', val);
}
function onDateTimeFontColorUpdate(val) {
  emit('update:dateTimeFontColor', val);
}
function onFrameColorUpdate(val) {
  emit('update:frameColor', val);
}
function onActiveTabUpdate(val) {
  emit('update:activeTab', val);
}

function onStickerSelect(sticker) {
  frameStore.addSticker(sticker)
}

function onThemeSelect(framePath) {
  // Update the selected frame in store
  frameStore.selectedFrame = {
    ...frameStore.selectedFrame,
    image: framePath
  }
  // Optionally switch to caption tab automatically
  emit('update:activeTab', 'caption')
}
</script>

<template>
  <div class="design-panel">
    <!-- Tabs -->
    <div class="tabs">
      <div
        class="tab"
        :class="{ active: activeTab === 'color' }"
        @click="onActiveTabUpdate('color')"
      >Frame Color</div>
      <div
        class="tab"
        :class="{ active: activeTab === 'sticker' }"
        @click="onActiveTabUpdate('sticker')"
      >Stickers</div>
      <div
        class="tab"
        :class="{ active: activeTab === 'theme' }"
        @click="onActiveTabUpdate('theme')"
      >Theme</div>
      <div
        class="tab"
        :class="{ active: activeTab === 'caption' }"
        @click="onActiveTabUpdate('caption')"
      >Caption</div>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <div v-if="activeTab === 'color'">
        <ColorPickerTab
          :frameColor="frameColor"
          @update:frameColor="onFrameColorUpdate"
        />
      </div>

      <div v-else-if="activeTab === 'sticker'">
        <StickersTab @select-sticker="onStickerSelect" />
      </div>

      <div v-else-if="activeTab === 'theme'">
        <ThemeTab @select-theme="onThemeSelect" />
      </div>

      <div v-else-if="activeTab === 'caption'">
        <CaptionDateTab
          :caption="caption"
          @update:caption="onCaptionUpdate"
          :captionFontColor="captionFontColor"
          @update:captionFontColor="onCaptionFontColorUpdate"
          :captionFontFamily="captionFontFamily"
          @update:captionFontFamily="onCaptionFontFamilyUpdate"
          :captionLanguage="captionLanguage"
          @update:captionLanguage="onCaptionLanguageUpdate"
          :showDate="showDate"
          @update:showDate="onShowDateUpdate"
          :showTime="showTime"
          @update:showTime="onShowTimeUpdate"
          :dateTimeFontColor="dateTimeFontColor"
          @update:dateTimeFontColor="onDateTimeFontColorUpdate"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'Quicksand';
  src: url('/fonts/Quicksand-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.design-panel {
  padding: 16px;
  width: 900px;
  font-family: 'Apricot', sans-serif;
}

.tabs {
  display: flex;
  margin-bottom: 16px;
  font-family: 'Quicksand', sans-serif;
}

.tab {
  padding: 8px;
  margin-right: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 0.2s, color 0.2s;
}

.tab:hover {
  background: #ddd;
}

.tab.active {
  border-bottom: 2px solid #000;
  color: rgb(0, 0, 0);
}

.tab-content {
  margin-top: 16px;
  font-size: 14px;
}

@media (max-width: 1024px) {
  .design-panel {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .tabs {
    flex-wrap: wrap;
  }
  .tab {
    margin-bottom: 8px;
    flex: 1 1 45%;
  }
}
</style>
