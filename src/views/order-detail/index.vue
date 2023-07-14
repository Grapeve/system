<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const { id } = route.params
</script>

<template>
  <div class="">订单id：{{ id }}</div>
</template>

<style lang="less" scoped></style>
