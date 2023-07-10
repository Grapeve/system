<template>
  <el-icon v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></el-icon>
  <div v-else>
    <SvgIcon :icon="icon" className="custom-icon" color="#fff"></SvgIcon>
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

<style lang="less" scoped>
.custom-icon {
  font-size: 20px;
}
</style>
