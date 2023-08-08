import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore(
  'app',
  () => {
    const sidebarOpened = ref(true)
    const tagsViewList = ref([])

    function triggerSidebarOpened() {
      sidebarOpened.value = !sidebarOpened.value
    }
    function addTagsViewList(tag) {
      const isFind = tagsViewList.value.find((item) => {
        return item.path === tag.path
      })
      if (!isFind) {
        tagsViewList.value.push(tag)
        console.log(tagsViewList.value)
      }
    }
    function removeTagsViewList(tagIndex) {
      tagsViewList.value.splice(tagIndex, 1)
    }
    const removeTagsView = (payload) => {
      if (payload.type === 'right') {
        tagsViewList.value.splice(payload.index + 1, tagsViewList.value.length - payload.index + 1)
      } else if (payload.type === 'other') {
        tagsViewList.value.splice(payload.index + 1, tagsViewList.value.length - payload.index + 1)
        tagsViewList.value.splice(0, payload.index)
      }
    }

    return {
      sidebarOpened,
      tagsViewList,
      triggerSidebarOpened,
      addTagsViewList,
      removeTagsViewList,
      removeTagsView
    }
  },
  {
    persist: true
  }
)
