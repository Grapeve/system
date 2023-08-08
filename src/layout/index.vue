<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import TagsView from '@/components/Tagsview/index.vue'
import { useAppStore } from '@/stores/app.js'
const appStore = useAppStore()
</script>

<template>
  <div class="app-wrapper" :class="[appStore.sidebarOpened ? 'openSidebar' : 'hideSidebar']">
    <!-- 左侧 menu：background-color: #304156 -->
    <Sidebar
      id="guide-sidebar"
      class="sidebar-container sidebar-width"
      style="background-color: #ffffff"
    />
    <div class="main-container main-margin-left">
      <div class="fixed-header-cover">
        <!-- 顶部的 navbar -->
        <div class="fixed-header">
          <Navbar />
          <!-- tags -->
          <TagsView />
        </div>
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
.sidebar-container {
  background-color: #0f172a !important;
}
.fixed-header-cover {
  position: fixed;
  top: 0px;
  z-index: 8;
  width: 100%;
  height: 100px;
  background-color: #fff;
}
.fixed-header {
  position: fixed;
  top: 15px;
  right: 22px;
  z-index: 9;
  width: calc(100% - @sideBarWidth - 44px);
  transition: width @sideBarDuration ease-in-out;
}

.hideSidebar .fixed-header {
  width: calc(100% - @hideSideBarWidth - 44px);
}
</style>
