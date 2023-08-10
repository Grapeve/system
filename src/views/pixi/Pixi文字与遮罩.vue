<script setup>
import { onMounted, ref } from 'vue'
import * as PIXI from 'pixi.js'

const pixiRef = ref()

// 创建应用
const app = new PIXI.Application({
  width: window.innerWidth * 0.669,
  height: window.innerHeight * 0.5,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
  antialias: true
})

const initRender = async () => {
  const text = new PIXI.Text('Hello world', {
    fontFamily: 'Arial',
    fontSize: 48,
    fill: 0xff1010,
    align: 'center'
  })
  text.x = app.screen.width / 2
  text.y = app.screen.height / 2
  text.anchor.set(0.5, 0.5)

  const bunny = PIXI.Sprite.from('./src/assets/textures/bg.png')
  bunny.width = pixiRef.value.offsetWidth
  bunny.height = pixiRef.value.offsetHeight
  bunny.mask = text
  app.stage.addChild(bunny)
}

onMounted(() => {
  // 将应用画布添加到DOM中
  const pixiElement = document.getElementById('pixi')
  pixiElement.appendChild(app.view)
  initRender()
})
</script>

<template>
  <div ref="pixiRef">
    <el-card class="pixi-card" id="pixi">
      <el-button type="primary" @click="console.log(pixiRef.offsetWidth, pixiRef.offsetHeight)"
        >查看宽高</el-button
      >
    </el-card>
  </div>
</template>

<style lang="less">
.pixi-card {
  padding: 0 !important;
  opacity: 1;
}
</style>
