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

// 创建矩形
const rectangle = new PIXI.Graphics()
rectangle.lineStyle(1, 0xff0000, 1)
rectangle.beginFill(0x66ccff)
rectangle.drawRect(0, 0, 64, 64)
rectangle.endFill()

rectangle.scale.set(2, 2)
rectangle.position.set(100, 100)
rectangle.rotation = 0.5
rectangle.pivot.set(32, 32) // 描点

// 将矩形添加到舞台
app.stage.addChild(rectangle)

const addCircle = () => {
  const circle = new PIXI.Graphics()
  circle.beginFill(0x66ccff, 0.9)
  circle.drawCircle(200, 200, 32)
  circle.endFill()
  app.stage.addChild(circle)
}

const addRoundedRectangle = () => {
  const roundedrectangle = new PIXI.Graphics()
  roundedrectangle.beginFill(0x66ccff, 0.9)
  roundedrectangle.drawRoundedRect(250, 200, 128, 32, 5)
  roundedrectangle.endFill()
  app.stage.addChild(roundedrectangle)
}

onMounted(() => {
  // 将应用画布添加到DOM中
  const pixiElement = document.getElementById('pixi')
  pixiElement.appendChild(app.view)
})
</script>

<template>
  <div class="">
    <el-card class="pixi-card" id="pixi">
      <el-button type="primary" @click="addCircle">添加一个圆形</el-button>
      <el-button type="primary" @click="addRoundedRectangle">添加一个圆角矩形</el-button>
    </el-card>
  </div>
</template>

<style lang="less">
.pixi-card {
  padding: 0 !important;
  opacity: 1;
}
</style>
