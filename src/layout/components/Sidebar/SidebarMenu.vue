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
  <!-- 一级 menu 菜单 -->
  <el-menu
    :collapse="!appStore.sidebarOpened"
    default-active="2"
    :unique-opened="true"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#ffffff"
    router
  >
    <SidebarItem v-for="item in routes" :key="item.path" :route="item"></SidebarItem>
  </el-menu>
</template>

<style lang="less" scoped></style>
