<script setup>
import { onMounted, ref } from 'vue'
import * as PIXI from 'pixi.js'
import {} from 'pixi-filters'

const pixiRef = ref()

// 创建应用
const app = new PIXI.Application({
  width: window.innerWidth * 0.669,
  height: window.innerHeight * 0.56,
  backgroundColor: 0xffffff,
  resolution: window.devicePixelRatio || 1,
  antialias: true
})

const initRender = async () => {
  const gameContainer = new PIXI.Container()

  const characterBaseTexture = PIXI.BaseTexture.from('/textures/human.png')
  // 人物向右、下、左、上移动
  const characterMoveRightTextures = []
  const characterMoveDownTextures = []
  const characterMoveLeftTextures = []
  const characterMoveUpTextures = []
  for (let i = 1; i < 10; i++) {
    characterMoveRightTextures.push(
      new PIXI.Texture(
        characterBaseTexture,
        new PIXI.Rectangle(16 + 64 * (i - 1), 11 * 64 + 16 - 3, 32, 52)
      )
    )
    characterMoveDownTextures.push(
      new PIXI.Texture(
        characterBaseTexture,
        new PIXI.Rectangle(16 + 64 * (i - 1), 10 * 64 + 16 - 3, 32, 52)
      )
    )
    characterMoveLeftTextures.push(
      new PIXI.Texture(
        characterBaseTexture,
        new PIXI.Rectangle(16 + 64 * (i - 1), 9 * 64 + 16 - 3, 32, 52)
      )
    )
    characterMoveUpTextures.push(
      new PIXI.Texture(
        characterBaseTexture,
        new PIXI.Rectangle(16 + 64 * (i - 1), 8 * 64 + 16 - 3, 32, 52)
      )
    )
  }
  const characterMoveRightSprite = new PIXI.AnimatedSprite(characterMoveRightTextures)
  const characterMoveDownSprite = new PIXI.AnimatedSprite(characterMoveDownTextures)
  const characterMoveLeftSprite = new PIXI.AnimatedSprite(characterMoveLeftTextures)
  const characterMoveUpSprite = new PIXI.AnimatedSprite(characterMoveUpTextures)

  gameContainer.addChild(
    characterMoveRightSprite,
    characterMoveDownSprite,
    characterMoveLeftSprite,
    characterMoveUpSprite
  )
  characterMoveRightSprite.animationSpeed = 0.1
  characterMoveDownSprite.animationSpeed = 0.1
  characterMoveLeftSprite.animationSpeed = 0.1
  characterMoveUpSprite.animationSpeed = 0.1
  characterMoveRightSprite.play()
  characterMoveDownSprite.play()
  characterMoveLeftSprite.play()
  characterMoveUpSprite.play()
  characterMoveRightSprite.visible = true
  characterMoveDownSprite.visible = false
  characterMoveLeftSprite.visible = false
  characterMoveUpSprite.visible = false

  app.stage.addChild(gameContainer)

  window.addEventListener('keydown', (Event) => {
    if (Event.code == 'ArrowRight') {
      characterMoveRight()
    } else if (Event.code == 'ArrowDown') {
      characterMoveDown()
    } else if (Event.code == 'ArrowLeft') {
      characterMoveLeft()
    } else if (Event.code == 'ArrowUp') {
      characterMoveUp()
    }
  })

  const characterMoveRight = (speed) => {
    characterMoveRightSprite.visible = true
    characterMoveDownSprite.visible = false
    characterMoveLeftSprite.visible = false
    characterMoveUpSprite.visible = false
    characterMoveRightSprite.y = characterMoveDownSprite.y // 向右移动, right.y = down.y or up.y
    characterMoveRightSprite.x += speed || 3.5 // right.x += n
    characterMoveLeftSprite.x = characterMoveRightSprite.x // left.x = right.x
  }

  const characterMoveDown = () => {
    characterMoveRightSprite.visible = false
    characterMoveDownSprite.visible = true
    characterMoveLeftSprite.visible = false
    characterMoveUpSprite.visible = false
    characterMoveDownSprite.x = characterMoveRightSprite.x
    characterMoveDownSprite.y += 3.5
    characterMoveUpSprite.y = characterMoveDownSprite.y
  }

  const characterMoveLeft = () => {
    characterMoveRightSprite.visible = false
    characterMoveDownSprite.visible = false
    characterMoveLeftSprite.visible = true
    characterMoveUpSprite.visible = false
    characterMoveLeftSprite.y = characterMoveUpSprite.y
    characterMoveLeftSprite.x -= 3.5
    characterMoveRightSprite.x = characterMoveLeftSprite.x
  }

  const characterMoveUp = () => {
    characterMoveRightSprite.visible = false
    characterMoveDownSprite.visible = false
    characterMoveLeftSprite.visible = false
    characterMoveUpSprite.visible = true
    characterMoveUpSprite.x = characterMoveLeftSprite.x
    characterMoveUpSprite.y -= 3.5
    characterMoveDownSprite.y = characterMoveUpSprite.y
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
      <el-button
        type="primary"
        @click="console.log(pixiRef.offsetWidth, pixiRef.offsetHeight, gameScore)"
        >打卡屋</el-button
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
