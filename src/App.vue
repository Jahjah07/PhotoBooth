<script setup lang="ts">
import Header from './components/Header.vue'
// App.vue is now just a router container
</script>

<template>
  <Header />
  <router-view />
</template>

<style>
/* Global styles to ensure full screen coverage */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

#app {
  width: 100%;
  min-height: 100vh;
}
</style>
