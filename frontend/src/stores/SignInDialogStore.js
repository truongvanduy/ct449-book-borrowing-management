import { defineStore } from 'pinia'

export const useSignInDialogStore = defineStore('signInDialogStore', {
  data() {
    return {
      isOpen: false
    }
  },
  actions: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    }
  }
})
