<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <router-link to="/" class="logo-link">
          <span class="logo-text">JU</span>
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <nav class="navigation">
        <router-link to="/" class="nav-link" @click="Clear">Home</router-link>
        <router-link to="/about" class="nav-link" @click="Clear">About</router-link>
        <router-link to="/privacy" class="nav-link" @click="Clear">Privacy Policy</router-link>
        <router-link to="/contact" class="nav-link" @click="Clear">Contact</router-link>
        <router-link to="/coffee" class="nav-link" @click="Clear">Buy Me Coffee</router-link>
      </nav>

      <!-- Mobile Menu Icon -->
      <img 
        src="/icons/menu.png" 
        alt="Menu" 
        class="menu-icon" 
        @click="toggleMobileMenu"
      />
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="mobile-menu">
      <router-link to="/" class="nav-link" @click="handleMobileClick">Home</router-link>
      <router-link to="/about" class="nav-link" @click="handleMobileClick">About</router-link>
      <router-link to="/privacy" class="nav-link" @click="handleMobileClick">Privacy Policy</router-link>
      <router-link to="/contact" class="nav-link" @click="handleMobileClick">Contact</router-link>
      <router-link to="/coffee" class="nav-link" @click="handleMobileClick">Buy Me Coffee</router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useFrameStore } from "../stores/frameStore";

export default defineComponent({
  name: 'Header',
  setup() {
    const frameStore = useFrameStore();
    const mobileMenuOpen = ref(false);

    function Clear() {
      frameStore.clearStickers();
    }

    function toggleMobileMenu() {
      mobileMenuOpen.value = !mobileMenuOpen.value;
    }

    function handleMobileClick() {
      Clear();
      mobileMenuOpen.value = false; // close menu on click
    }

    return {
      Clear,
      mobileMenuOpen,
      toggleMobileMenu,
      handleMobileClick
    };
  }
});
</script>

<style scoped>
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

/* Mobile Menu Icon */
.menu-icon {
  display: none;
  width: 28px;
  height: 28px;
  cursor: pointer;
}

/* Mobile Menu */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  gap: 1rem;
  z-index: 999;
}

/* Responsive Design */
@media (max-width: 768px) {
  .navigation {
    display: none; /* hide desktop nav */
  }
  .menu-icon {
    display: block; /* show menu icon */
  }
}
</style>
