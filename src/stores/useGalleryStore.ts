import { ref } from 'vue'

const gallery = ref<string[]>([])

export function useGalleryStore() {
  return { gallery }
} 