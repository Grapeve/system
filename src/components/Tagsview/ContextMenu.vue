<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app.js'
const appStore = useAppStore()

const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})

const router = useRouter()
const onRefreshClick = () => {
  router.go(0)
}
const onCloseRightClick = () => {
  appStore.removeTagsView({
    type: 'right',
    index: props.index
  })
  router.push(appStore.tagsViewList[props.index].fullPath)
}
const onCloseOtherClick = () => {
  appStore.removeTagsView({
    type: 'other',
    index: props.index
  })
  router.push(appStore.tagsViewList[0].fullPath)
}
</script>

<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">刷新</li>
    <li @click="onCloseRightClick">关闭右侧</li>
    <li @click="onCloseOtherClick">关闭其他</li>
  </ul>
</template>

<style lang="less">
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
