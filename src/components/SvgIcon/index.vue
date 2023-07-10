<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  // icon图标
  icon: {
    type: String,
    required: true,
    default: 'burst'
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#333'
  }
})
/**
 * 内部图标
 */
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<template>
  <svg class="svg-icon" :class="className" aria-hidden="true">
    <use :href="iconName" :fill="color"></use>
  </svg>
</template>

<style scoped lang="less">
.svg-icon {
  width: 1.3em;
  height: 1.3em;
  vertical-align: -0.36em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
