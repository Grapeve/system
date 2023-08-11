<script setup>
import { onMounted, ref } from 'vue'
import * as PIXI from 'pixi.js'
import {} from 'pixi-filters'

const pixiRef = ref()
const isGameing = ref(false)
const gameScore = ref(0)
const isGameOver = ref(false)

// 创建应用
const app = new PIXI.Application({
  width: window.innerWidth * 0.669,
  height: window.innerHeight * 0.55,
  backgroundColor: 0xffffff,
  resolution: window.devicePixelRatio || 1,
  antialias: true
})

const initRender = async () => {
  const gameContainer = new PIXI.Container()

  // 添加恐龙游戏的精灵纹理
  const baseTexture = PIXI.BaseTexture.from('/textures/game.png')

  // 恐龙精灵
  const dinosaurTexture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(73, 0, 88, 100))
  const dinosaurSprite = new PIXI.Sprite(dinosaurTexture)
  gameContainer.addChild(dinosaurSprite)
  dinosaurSprite.visible = false

  // 恐龙跑步动画
  const runTextures = []
  for (let i = 0; i < 2; i++) {
    runTextures.push(
      new PIXI.Texture(baseTexture, new PIXI.Rectangle(1680 + (2 + i) * 88, 0, 82, 100))
    )
  }
  const runAnimation = new PIXI.AnimatedSprite(runTextures)
  runAnimation.animationSpeed = 0.1
  runAnimation.play()
  gameContainer.addChild(runAnimation)
  runAnimation.visible = false

  // 恐龙跳跃精灵
  const dinosaurJumpTexture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(1680, 0, 82, 100))
  const dinosaurJumpSprite = new PIXI.Sprite(dinosaurJumpTexture)
  dinosaurJumpSprite.visible = false
  dinosaurJumpSprite.position.set(60, app.screen.height - 50 - 100 + 20)
  gameContainer.addChild(dinosaurJumpSprite)

  // 地面
  const groundTexture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(50, 100, 2300, 30))
  const groundSprinte = new PIXI.TilingSprite(groundTexture)
  groundSprinte.width = app.screen.width
  groundSprinte.height = 30
  groundSprinte.position.set(0, app.screen.height - 50)
  gameContainer.addChild(groundSprinte)

  // 仙人掌精灵
  const cactusTexture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(515, 0, 30, 60))
  const cactusSprite = new PIXI.Sprite(cactusTexture)
  cactusSprite.x = app.screen.width / 2
  cactusSprite.y = app.screen.height - 97
  gameContainer.addChild(cactusSprite)

  // 创建文字
  const startText = new PIXI.Text('开始游戏', {
    fontFamily: 'Arial',
    fontSize: 36,
    fill: 0x333333,
    align: 'center'
  })
  startText.position.set(app.screen.width / 2, app.screen.height / 4)
  startText.anchor.set(0.5, 0.5)
  gameContainer.addChild(startText)
  startText.eventMode = 'dynamic'
  startText.on('click', () => {
    palyGame()
  })

  app.stage.addChild(gameContainer)

  const palyGame = () => {
    isGameing.value = true
    console.log('palyGame')
    startText.visible = false
    // 显示恐龙跑步动画
    runAnimation.visible = true
    runAnimation.position.set(60, app.screen.height - 50 - 100 + 20)
  }

  const gameOver = () => {
    console.log('游戏结束')
    isGameing.value = false
    isGameOver.value = true
  }

  // 参数
  // 初始跳跃速度
  let jumpVelocity = ref(20)
  // 初始化重力
  let gravity = ref(1)
  // 游戏循环
  app.ticker.add(() => {
    if (isGameOver.value) return
    if (isGameing.value) {
      // 恐龙跑步, 其实恐龙是不移动的
      // runAnimation.x += 0.5
      // 地面移动
      groundSprinte.tilePosition.x -= 5
      // 仙人掌移动
      cactusSprite.x -= 5.5
      if (cactusSprite.x < -30) {
        const cactusSpriteX = Math.random() * app.screen.width
        cactusSprite.x =
          cactusSpriteX > app.screen.width / 2 ? cactusSpriteX : app.screen.width / 2 + 150
        gameScore.value++
      }
    }
    // 恐龙跳跃
    if (dinosaurJumpSprite.visible && isGameing.value) {
      jumpVelocity.value -= gravity.value
      dinosaurJumpSprite.y -= jumpVelocity.value
      if (dinosaurJumpSprite.y > app.screen.height - 50 - 100 + 20) {
        dinosaurJumpSprite.y = app.screen.height - 50 - 100 + 20
        jumpVelocity.value = 20
        dinosaurJumpSprite.visible = false
        runAnimation.visible = true
      }
    }
    // 检测碰撞
    if (
      dinosaurJumpSprite.y + 50 > cactusSprite.y + 5 &&
      dinosaurJumpSprite.x + 60 > cactusSprite.x &&
      dinosaurJumpSprite.x - 30 < cactusSprite.x &&
      isGameing.value
    ) {
      console.log('发生了碰撞')
      gameOver()

      // 显示游戏结束得分文字
      const overText = new PIXI.Text(`游戏结束, 游戏得分: ${gameScore.value} \n 重新开始新游戏`, {
        fontFamily: 'Arial',
        fontSize: 36,
        fill: 0x000000,
        align: 'center'
      })
      overText.position.set(app.screen.width / 2, 50)
      overText.anchor.set(0.5, 0.5)
      gameContainer.addChild(overText)

      overText.eventMode = 'dynamic'
      overText.on('click', () => {
        location.reload()
      })
    }
  })

  window.addEventListener('keydown', (Event) => {
    if (Event.code == 'Space' && isGameing.value) {
      console.log('恐龙跳跃')
      runAnimation.visible = false
      dinosaurJumpSprite.visible = true
      jumpVelocity.value = 20
    }
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
      <el-button
        type="primary"
        @click="console.log(pixiRef.offsetWidth, pixiRef.offsetHeight, gameScore)"
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
