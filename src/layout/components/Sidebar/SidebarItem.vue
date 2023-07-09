<script setup>
import { defineProps } from 'vue'
import SidebarItem from './SidebarItem.vue'
import MenuItem from './MenuItem.vue'
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <!-- 支持渲染多级 menu 菜单 -->
  <el-sub-menu v-if="route.children.length > 0" style="margin-left: -5px" :index="route.path">
    <template #title>
      <MenuItem :title="route.meta.title" :icon="route.meta.icon"></MenuItem>
    </template>
    <!-- * 循环渲染 -->
    <SidebarItem v-for="item in route.children" :key="item.path" :route="item"></SidebarItem>
  </el-sub-menu>
  <!-- 渲染 item 项 -->
  <el-menu-item v-else :index="route.path" style="margin-left: -5px">
    <MenuItem :title="route.meta.title" :icon="route.meta.icon"></MenuItem>
  </el-menu-item>
</template>

<style lang="less" scoped></style>
