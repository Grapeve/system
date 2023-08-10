<script setup>
import { onMounted, ref } from 'vue'
import * as PIXI from 'pixi.js'
import { OutlineFilter } from 'pixi-filters'

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
  const texture = PIXI.Texture.from('./src/assets/textures/mujian.png')
  const sprite = new PIXI.Sprite(texture)
  sprite.position.set(app.screen.width / 2, app.screen.height / 2)
  sprite.anchor.set(0.5, 0.5)
  app.stage.addChild(sprite)

  const blueFilter = new PIXI.BlurFilter()
  blueFilter.blur = 5
  sprite.filters = [blueFilter]

  sprite.eventMode = 'dynamic'
  sprite.on('pointerenter', () => {
    console.log('pointerenter')
    blueFilter.blur = 1
    const outlineFilter = new OutlineFilter(5, 'white')
    sprite.filters.push(outlineFilter)
  })
  sprite.on('pointerout', () => {
    console.log('pointerout')
    blueFilter.blur = 5
    sprite.filters = [blueFilter]
  })
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
