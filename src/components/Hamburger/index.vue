<script setup>
import { useAppStore } from '@/stores/app.js'
const appStore = useAppStore()

const toggleClick = () => {
  appStore.triggerSidebarOpened()
}
</script>

<template>
  <div class="hamburger-container" @click="toggleClick">
    <el-icon :size="20" v-if="appStore.sidebarOpened"><Fold /></el-icon>
    <el-icon :size="20" v-else><Expand /></el-icon>
  </div>
</template>

<style lang="less" scoped>
.hamburger-container {
  display: flex;
  place-items: center;
  padding: 0 16px;
}
</style>
