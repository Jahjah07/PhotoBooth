import { createRouter, createWebHistory } from 'vue-router'
import HeroPage from './pages/HeroPage.vue'
import PhotoBoothPage from './pages/PhotoBoothPage.vue'
import PhotoSelectionPage from './pages/PhotoSelectionPage.vue'
import FrameSelectionPage from './pages/FrameSelectionPage.vue'
import AboutPage from './pages/AboutPage.vue'
import PrivacyPage from './pages/PrivacyPage.vue'

const routes = [
  { path: '/', component: HeroPage },
  { path: '/photobooth', component: PhotoBoothPage },
  { path: '/frameSelection', component: FrameSelectionPage },
  { path: '/photoboothSelection', component: PhotoSelectionPage },
  { path: '/about', component: AboutPage },
  { path: '/privacy', component: PrivacyPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 