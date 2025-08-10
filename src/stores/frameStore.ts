// stores/frameStore.ts
import { defineStore } from "pinia";

export const useFrameStore = defineStore("frame", {
  state: () => ({
    frames: [] as Array<{ name: string; layout: string; photos?: number; [key: string]: any }>,
    selectedFrame: null as { name: string; layout: string; photos?: number; [key: string]: any } | null,
    totalPhotos: 0,

    // ✅ Stores captured photos from the PhotoBooth
    takenPhotos: [] as string[],

    // ✅ Stores photos the user picked for the final frame
    selectedPhotos: [] as string[]
  }),

  actions: {
    async loadFrames() {
      try {
        const res = await fetch("/frames/template-frames.json");
        const data = await res.json();
        this.frames = data;

        // Auto-select first frame if none selected
        if (!this.selectedFrame && this.frames.length > 0) {
          this.selectFrame(this.frames[0]);
        }
      } catch (err) {
        console.error("Failed to load frames:", err);
      }
    },

    selectFrame(frame: { name: string; layout: string; photos?: number; [key: string]: any }) {
      this.selectedFrame = frame;
      this.totalPhotos = this.calculateTotalPhotos(frame);
    },

    calculateTotalPhotos(frame: { layout: string; photos?: number; [key: string]: any }) {
      // If JSON already defines photos, use that
      if (frame.photos) {
        return frame.photos + (frame.extraCaptures ? Number(frame.extraCaptures) : 0);
      }

      // Otherwise calculate from layout "3x2"
      const [cols, rows] = frame.layout.toLowerCase().split("x").map(Number);

      if (isNaN(cols) || isNaN(rows)) {
        console.warn(`Invalid layout format: ${frame.layout}`);
        return 0;
      }

      let total = cols * rows;

      if (frame.extraCaptures) {
        total += Number(frame.extraCaptures);
      }

      return total;
    },

    // --- PHOTO CAPTURE METHODS ---
    setTakenPhotos(photos: string[]) {
      this.takenPhotos = photos;
    },

    addTakenPhoto(photo: string) {
      this.takenPhotos.push(photo);
    },

    clearTakenPhotos() {
      this.takenPhotos = [];
    },

    // --- PHOTO SELECTION METHODS ---
    setSelectedPhotos(photos: string[]) {
      this.selectedPhotos = photos;
    },

    clearSelectedPhotos() {
      this.selectedPhotos = [];
    }
  }
});
