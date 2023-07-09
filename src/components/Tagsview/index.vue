<script setup>
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app.js'
const appStore = useAppStore()
const route = useRoute()

/**
 * 是否被选中
 */
const isActive = (tag) => {
  return tag.path === route.path
}

/**
 * 关闭 tag 的点击事件
 */
const onCloseClick = (index) => {
  appStore.removeTagsViewList(index)
}
</script>

<template>
  <div class="tags-view-container">
    <router-link
      v-for="(tag, index) in appStore.tagsViewList"
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      :key="tag.fullPath"
      :to="{ path: tag.fullPath }"
      :style="{
        backgroundColor: isActive(tag) ? '#304156' : '',
        borderColor: isActive(tag) ? '#304156' : ''
      }"
    >
      {{ tag.title }}
      <el-icon
        v-show="!isActive(tag)"
        :size="15"
        class="el-icon-close"
        @click.prevent.stop="onCloseClick(index)"
        ><CircleClose
      /></el-icon>
    </router-link>
  </div>
</template>

<style lang="less" scoped>
.tags-view-container {
  display: flex;
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: flex;
    place-items: center;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮
    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: 2px;
      margin-top: 0;
      margin-left: 4px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
