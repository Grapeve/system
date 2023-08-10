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

PIXI.Assets.addBundle('sceneOne', {
  jian: './src/assets/textures/jian.png',
  man: './src/assets/textures/man.png',
  mujian: './src/assets/textures/mujian.png'
})

const initRender = async () => {
  const container = new PIXI.Container()

  const sceneOneTextures = await PIXI.Assets.loadBundle('sceneOne', (process) => {
    console.log('Loading: ', process) // 方便设置进度条
  })

  const sprite = new PIXI.Sprite(sceneOneTextures.jian)
  container.addChild(sprite)

  const manSprite = new PIXI.Sprite(sceneOneTextures.man)
  manSprite.scale.set(0.1, 0.1)
  manSprite.position.set(200, 100)
  container.addChild(manSprite)

  app.stage.addChild(container)
}

onMounted(() => {
  // 将应用画布添加到DOM中
  const pixiElement = document.getElementById('pixi')
  pixiElement.appendChild(app.view)
  initRender()
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
