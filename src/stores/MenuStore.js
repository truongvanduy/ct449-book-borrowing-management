import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menuStore', {
  state: () => ({
    isOpened: false,
    isExpanded: true
  }),
  actions: {
    toggleMenu() {
      this.isOpened = !this.isOpened
    },
    toggleExpanded() {
      this.isExpanded = !this.isExpanded
    }
  }
})
