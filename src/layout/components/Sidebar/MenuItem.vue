<template>
  <el-icon v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></el-icon>
  <div v-else>
    <el-icon :size="20">
      <Loading />
    </el-icon>
  </div>

  <span>{{ title }}</span>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<style lang="less" scoped></style>
