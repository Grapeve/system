<script setup>
import { onMounted } from 'vue'
import * as PIXI from 'pixi.js'

// 创建应用
const app = new PIXI.Application({
  width: window.innerWidth * 5,
  height: window.innerHeight * 0.5,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
  antialias: true
})

const texture = PIXI.Texture.from('/src/assets/textures/mujian.png')
const sprite = new PIXI.Sprite(texture)
sprite.position.set(200, 200)
sprite.scale.set(0.5, 0.5)

app.stage.addChild(sprite)
// ticker 实现动画
app.ticker.add((delta) => {
  sprite.rotation += 0.01 * delta
})

// 为精灵添加交互事件
sprite.eventMode = 'dynamic'
sprite.on('click', () => {
  console.log('click')
})

sprite.on('pointerenter', () => {
  console.log('pointerenter')
})

onMounted(() => {
  // 将应用画布添加到DOM中
  const pixiElement = document.getElementById('pixi')
  pixiElement.appendChild(app.view)
})
</script>

<template>
  <div class="">
    <el-card class="pixi-card" id="pixi">
      <el-button type="primary">占位</el-button>
    </el-card>
  </div>
</template>

<style lang="less">
.pixi-card {
  padding: 0 !important;
  opacity: 1;
}
</style>
