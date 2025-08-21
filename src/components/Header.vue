<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <router-link to="/" class="logo-link">
          <span class="logo-text">JU</span>
        </router-link>
      </div>
      
      <nav class="navigation">
        <router-link to="/" class="nav-link" @click="Clear">Home</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/privacy" class="nav-link">Privacy Policy</router-link>
        <router-link to="/contact" class="nav-link">Contact</router-link>
        <router-link to="/coffee" class="nav-link">Buy Me Coffee</router-link>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useFrameStore } from "../stores/frameStore";

export default defineComponent({
  name: 'Header',
  setup() {
    const frameStore = useFrameStore();

    function Clear() {
      frameStore.clearStickers();
    }

    return {
      Clear
    };
  }
});
</script>

<style scoped>
@font-face {
  font-family: 'Cinzel';
  src: url('/fonts/Cinzel-Regular.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

.header {
  background: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  flex-shrink: 0;
}

.logo-link {
  text-decoration: none;
  color: #000;
  font-weight: bold;
  font-size: 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.logo-text {
  font-weight: 700;
  color: #000;
}

.navigation {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #000;
  font-weight: 400;
  font-size: 1rem;
  font-family: 'Cinzel', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: opacity 0.2s ease;
}

.nav-link:hover {
  opacity: 0.7;
}

.nav-link.router-link-active {
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-container {
    padding: 1rem;
  }
  
  .navigation {
    gap: 1.5rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .navigation {
    gap: 1rem;
  }
  
  .nav-link {
    font-size: 0.8rem;
  }
}
</style>
