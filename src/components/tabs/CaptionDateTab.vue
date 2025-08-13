<template>
    <div class="caption-date-tab">
      <div class="form-group inline">
        <label>Caption</label>
        <input
          type="text"
          :value="caption"
          @input="$emit('update:caption', $event.target.value)"
        />
        <input
          type="color"
          :value="captionFontColor"
          @input="$emit('update:captionFontColor', $event.target.value)"
        />
      </div>
  
  
      <div class="form-group inline">
        <label>Caption Font Family</label>
        <select
          :value="captionFontFamily"
          @change="$emit('update:captionFontFamily', $event.target.value)"
        >
          <option>Arial</option>
          <option>Times New Roman</option>
          <option>Courier New</option>
          <option>Verdana</option>
        </select>
      </div>
  
  
      <div class="form-group inline">
        <label>
          <input
            type="checkbox"
            :checked="showDate"
            @change="$emit('update:showDate', $event.target.checked)"
          />
          Show Date
        </label>
        <label>
          <input
            type="checkbox"
            :checked="showTime"
            @change="$emit('update:showTime', $event.target.checked)"
          />
          Show Time
        </label>
        <input
          type="color"
          :value="dateTimeFontColor"
          @input="$emit('update:dateTimeFontColor', $event.target.value)"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    caption: String,
    captionFontColor: String,
    captionFontFamily: String,
    captionLanguage: String,
    showDate: Boolean,
    showTime: Boolean,
    dateTimeFontColor: String
  });
  </script>
  
  <style scoped>
  .caption-date-tab {
    background: #ffffff;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    max-width: 350px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    font-family: 'Segoe UI', sans-serif;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .form-group.inline {
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }
  
  label {
    font-weight: 600;
    font-size: 14px;
    color: #333;
  }
  
  input[type="text"],
  select {
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    transition: border 0.2s ease;
  }
  
  input[type="text"]:focus,
  select:focus {
    border-color: #4f46e5;
  }
  
  input[type="color"] {
    border: none;
    background: none;
    width: 40px;
    height: 32px;
    padding: 0;
    cursor: pointer;
  }
  
  input[type="checkbox"] {
    margin-right: 6px;
  }
  </style>
  