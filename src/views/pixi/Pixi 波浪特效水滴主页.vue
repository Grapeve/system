<script setup>
import { onMounted, ref } from 'vue'
import * as PIXI from 'pixi.js'
import { ShockwaveFilter } from 'pixi-filters'

const pixiRef = ref()

// 创建应用
const app = new PIXI.Application({
  width: window.innerWidth * 0.669,
  height: window.innerHeight * 0.8,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
  antialias: true
})

const initRender = async () => {
  const carContainer = new PIXI.Container()

  // 背景
  const carTexture = PIXI.Texture.from('/textures/car.jpg')
  const carSprite = new PIXI.Sprite(carTexture)
  carSprite.width = app.screen.width
  carSprite.height = app.screen.height
  carContainer.addChild(carSprite)

  // 文字
  const carText = new PIXI.Text('Hello PixiJS', {
    fontFamily: 'Arial',
    fontSize: 30 + app.screen.width * 0.1,
    fill: 0xffffff,
    align: 'center',
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 2,
    dropShadowDistance: 2
  })
  carText.position.set(app.screen.width / 2, app.screen.height / 2)
  carText.anchor.set(0.5, 0.5)
  carContainer.addChild(carText)

  // 置换滤镜
  const displacementSprite = PIXI.Sprite.from('/textures/displacement.jpg')
  displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
  displacementSprite.scale.set(0.5)
  carContainer.addChild(displacementSprite)
  const displacementFilter = new PIXI.DisplacementFilter(displacementSprite)
  carContainer.filters = [displacementFilter]

  // 震波滤镜
  const shockwaveFilter = new ShockwaveFilter(
    [app.screen.width / 2, app.screen.height / 2],
    {
      radius: 480,
      wavelength: 80,
      amplitude: 10,
      brightness: 1
    },
    0
  )
  carContainer.filters.push(shockwaveFilter)

  app.stage.addChild(carContainer)
  app.ticker.add(() => {
    displacementSprite.x += 1
    displacementSprite.y += 1
    createWave(shockwaveFilter, 1)
  })

  app.view.addEventListener('click', (e) => {
    shockwaveFilter.center = [e.clientX - 230, e.clientY / 2]
    shockwaveFilter.time = 0
  })
}

const createWave = (waveFilter, resetTime) => {
  waveFilter.time += 0.01 // 时间推进, 波浪扩散
  if (waveFilter.time > resetTime) {
    waveFilter.time = 0
    waveFilter.center = [Math.random() * app.screen.width, Math.random() * app.screen.height]
  }
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
        >波浪特效</el-button
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
