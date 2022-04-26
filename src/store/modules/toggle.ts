import { defineStore } from 'pinia'

interface ToggleState {
  isCollapse: boolean
}

export const useToggleStore = defineStore({
  id: 'toggle-side',
  state: (): ToggleState => ({
    isCollapse: false
  }),
  getters: {
    getIsCollapse (): boolean {
      return this.isCollapse
    }
  },
  actions: {
    setCollapse (flag: boolean) {
      this.isCollapse = flag
    }
  }
})
