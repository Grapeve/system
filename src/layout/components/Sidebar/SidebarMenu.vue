<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'
import { useAppStore } from '@/stores/app.js'
const appStore = useAppStore()

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
console.log(routes.value)
</script>

<template>
  <!-- 一级 menu 菜单 #304156 #bfcbd9 -->
  <el-menu
    :collapse="!appStore.sidebarOpened"
    default-active="2"
    :unique-opened="false"
    background-color="#0f172a"
    text-color="#ffffff"
    active-text-color="#000000"
    router
    class="el-menu-custom"
  >
    <SidebarItem v-for="item in routes" :key="item.path" :route="item"></SidebarItem>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-custom {
  :deep(.is-active) {
    background-color: #ddd6fe;
    font-weight: 600;
  }
  :deep(.el-menu-item) {
    height: 40px;
    // width: 200px;
    // border-radius: 0.5rem;
  }
  :deep(.el-sub-menu__title) {
    height: 45px;
  }
  :deep(.el-menu--inline) {
    // padding-left: 15px;
  }
}
</style>
