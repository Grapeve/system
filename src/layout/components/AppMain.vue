<template>
  <div class="app-main">
    <RouterView />
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="less" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>