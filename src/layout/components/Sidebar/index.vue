<script setup>
import SidebarMenu from './SidebarMenu.vue'
import { useAppStore } from '@/stores/app.js'
const appStore = useAppStore()
</script>

<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        :size="44"
        shape="square"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      />
      <h1 class="logo-title" v-if="appStore.sidebarOpened">后台管理系统</h1>
    </div>
    <el-scrollbar>
      <SidebarMenu></SidebarMenu>
    </el-scrollbar>
  </div>
</template>

<style lang="less" scoped>
.logo-container {
  height: 44px;
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
