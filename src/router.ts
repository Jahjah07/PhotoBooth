import { createRouter, createWebHistory } from 'vue-router'
import HeroPage from './pages/HeroPage.vue'
import PhotoBoothPage from './pages/PhotoBoothPage.vue'
import PhotoSelectionPage from './pages/PhotoSelectionPage.vue'
import FrameSelectionPage from './pages/FrameSelectionPage.vue'
import AboutPage from './pages/AboutPage.vue'
import PrivacyPage from './pages/PrivacyPage.vue'
import PreviewPage from './pages/PreviewPage.vue'
import ContactPage from './pages/ContactPage.vue'
import DonationPage from './pages/DonationPage.vue'

const routes = [
  { path: '/', component: HeroPage },
  { path: '/photobooth', component: PhotoBoothPage },
  { path: '/frameSelection', component: FrameSelectionPage },
  { path: '/photoboothSelection', component: PhotoSelectionPage },
  { path: '/preview', component: PreviewPage },
  { path: '/about', component: AboutPage },
  { path: '/contact', component: ContactPage },
  { path: '/privacy', component: PrivacyPage },
  { path: '/coffee', component: DonationPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 