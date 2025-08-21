// stores/frameStore.ts
import { defineStore } from 'pinia'

export const useFrameStore = defineStore('frame', {
  state: () => ({
    templates: [] as any[],         // from template-frames.json
    designs: [] as any[],           // from frames.json
    selectedTemplate: null as any | null,
    selectedDesign: null as any | null,
    totalPhotos: 0,
    takenPhotos: [] as string[],
    selectedPhotos: [] as string[],
    selectedStickers: [] as any[],
  }),

  actions: {
    /** Load template layouts (user chooses first) */
    async loadTemplates() {
      try {
        const res = await fetch('/frames/template-frames.json')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        this.templates = await res.json()
        console.log('Templates loaded:', this.templates)

        if (!this.selectedTemplate && this.templates.length > 0) {
          this.selectTemplate(this.templates[0])
        }
      } catch (err) {
        console.error('Failed to load templates:', err)
      }
    },

    /** Load frame designs (matching assets for each template) */
    async loadDesigns() {
      try {
        const res = await fetch('/frames/frames.json')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        this.designs = await res.json()
        console.log('Designs loaded:', this.designs)
      } catch (err) {
        console.error('Failed to load designs:', err)
      }
    },

    addSticker(sticker: any) {
      this.selectedStickers.push({
        ...sticker,
        x: 100, // default position
        y: 100,
        w: 100,  // default width
        h: 100,  // default height
        id: Date.now(), // unique id
      });
    },
  
    removeSticker(stickerId: number) {
      this.selectedStickers = this.selectedStickers.filter(s => s.id !== stickerId)
    },
  
    clearStickers() {
      this.selectedStickers = []
    },

    /** Select a template (layout) */
    selectTemplate(template: any) {
      this.selectedTemplate = template
      this.totalPhotos = this.calculateTotalPhotos(template)
      this.selectedDesign = null // reset design when layout changes
    },

    /** Select a frame design (updates preview image) */
    selectDesign(design: any) {
      this.selectedDesign = design
      if (this.selectedTemplate) {
        // For FramePreview.vue to show it
        this.selectedTemplate.image =
          design.frames?.[0] ?? design.url ?? null
      }
    },

    /** Calculate how many photos needed for a layout */
    calculateTotalPhotos(frame: any) {
      if (!frame) return 0

      if (frame.photos) {
        return frame.photos + (frame.extraCaptures ? Number(frame.extraCaptures) : 0)
      }

      const layoutStr = (frame.layout || frame.type || '').toLowerCase();
      const [cols, rows] = layoutStr.split('x').map((n: string) => parseInt(n, 10));
      if (isNaN(cols) || isNaN(rows)) return 0;

      let total = cols * rows;
      if (frame.extraCaptures) total += Number(frame.extraCaptures);
      return total
    },

    // Photo capture helpers
    setTakenPhotos(photos: string[]) {
      this.takenPhotos = photos
    },
    addTakenPhoto(photo: string) {
      this.takenPhotos.push(photo)
    },
    clearTakenPhotos() {
      this.takenPhotos = []
    },

    // Selected photos helpers
    setSelectedPhotos(photos: string[]) {
      this.selectedPhotos = photos
    },
    clearSelectedPhotos() {
      this.selectedPhotos = []
    },
    clearDesign() {
      this.selectedDesign = null
    },
  },

  getters: {
    /** Filter designs to match current template layout */
    matchingDesigns(state) {
      const layout = state.selectedTemplate?.layout?.toLowerCase()
        || state.selectedTemplate?.type?.toLowerCase()
      if (!layout) return []
    
      const group = state.designs.find(d =>
        d.type?.toLowerCase() === layout ||
        d.layout?.toLowerCase() === layout
      )
      
      if (!group) return []
    
      return group.frames.map((path: string) => ({
        name: `${group.type} - ${path.split('/').pop()}`,
        type: group.type,
        photos: group.photos,
        url: path
      }))
    }
    
  }
})
