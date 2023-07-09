<script setup>
import { ref } from 'vue'
import screenfull from 'screenfull'

// 是否全屏
const isFullscreen = ref(false)
// 监听变化
const onToggle = () => {
  isFullscreen.value = !isFullscreen.value
  screenfull.toggle()
}
</script>

<template>
  <div @click="onToggle" class="fullscreen">
    <el-icon v-if="!isFullscreen" :size="30"><FullScreen /></el-icon>
    <el-icon v-else :size="30"><Loading /></el-icon>
  </div>
</template>

<style lang="less" scoped>
.fullscreen {
  height: 50px;
  display: flex;
  place-items: center;
  .el-icon {
    cursor: pointer;
  }
}
</style>
