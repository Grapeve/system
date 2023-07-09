import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const sidebarOpened = ref(true)
  function triggerSidebarOpened() {
    sidebarOpened.value = !sidebarOpened.value
  }
  return { sidebarOpened, triggerSidebarOpened }
})
