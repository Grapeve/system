<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import { useAppStore } from '@/stores/app.js'
const appStore = useAppStore()
</script>

<template>
  <div class="app-wrapper" :class="[appStore.sidebarOpened ? 'openSidebar' : 'hideSidebar']">
    <!-- 左侧 menu -->
    <Sidebar
      id="guide-sidebar"
      class="sidebar-container sidebar-width"
      style="background-color: #304156"
    />
    <div class="main-container main-margin-left">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <Navbar />
      </div>
      <!-- 内容区 -->
      <AppMain />
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/mixin.less';
@import '@/styles/variables.less';
.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - @sideBarWidth);
}

.hideSidebar .fixed-header {
  width: calc(100% - @hideSideBarWidth);
}
</style>
