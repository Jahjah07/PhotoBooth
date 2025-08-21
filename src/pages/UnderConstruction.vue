<template>
    <div class="under-construction">
      <h1>🚧 This Page is Under Construction 🚧</h1>
      <p>We’re working hard to bring you something amazing. Please check back later!</p>
      <router-link to="/" class="back-link">← Go Back Home</router-link>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'UnderConstruction',
  });
  </script>
  
  <style scoped>
  .under-construction {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
    text-align: center;
    padding: 2rem;
    color: #333;
  }
  
  .under-construction h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .under-construction p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  .back-link {
    text-decoration: none;
    color: #007BFF;
    font-weight: 500;
    transition: opacity 0.2s ease;
  }
  
  .back-link:hover {
    opacity: 0.7;
  }
  </style>
  