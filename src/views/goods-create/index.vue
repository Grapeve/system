<!-- eslint-disable no-undef -->
<script setup>
import { reactive, ref, onMounted } from 'vue'
// import axios from '@/utils/axios'
import { useRoute, useRouter } from 'vue-router'
import { uploadImgServer, localGet } from '@/utils'
import { useGoodsStore } from '@/stores/goods.js'
import { useAppStore } from '@/stores/app.js'
const goodsStore = useGoodsStore()
const appStore = useAppStore()
const router = useRouter()
const route = useRoute() // 获取路由参数
const { id } = route.params

const state = reactive({
  uploadImgServer,
  token: localGet('token') || '',
  id: id,
  defaultCate: '',
  goodForm: {
    goodsName: '',
    goodsIntro: '',
    originalPrice: '',
    sellingPrice: '',
    stockNum: '',
    goodsSellStatus: '0',
    goodsCoverImg: 'http://backend-api-02.newbee.ltd/upload/20230714_14173647.jpg',
    goodsStockStatus: '0'
  },
  rules: {
    goodsName: [{ required: 'true', message: '请填写商品名称', trigger: ['blur'] }],
    originalPrice: [{ required: 'true', message: '请填写商品价格', trigger: ['blur'] }],
    sellingPrice: [{ required: 'true', message: '请填写商品售价', trigger: ['blur'] }],
    stockNum: [{ required: 'true', message: '请填写商品库存', trigger: ['blur'] }]
  }
})

const handleUrlSuccess = (val) => {
  state.goodForm.goodsCoverImg = val.data || ''
}
const goodRef = ref(null)
const submitAdd = () => {
  goodRef.value.validate(async (valid) => {
    if (valid) {
      if (!state.id) {
        state.goodForm.goodsSellStatus = Number(state.goodForm.goodsSellStatus)
        state.goodForm.goodsStockStatus = Number(state.goodForm.goodsStockStatus)
        goodsStore.addGoods(state.goodForm)
        ElMessage({
          message: `${state.goodForm.goodsName}商品添加成功`,
          type: 'success'
        })
        // 清空表单中的数据
        setTimeout(() => {
          state.goodForm = {
            goodsName: '',
            goodsIntro: '',
            originalPrice: '',
            sellingPrice: '',
            stockNum: '',
            goodsSellStatus: '0',
            goodsCoverImg: 'http://backend-api-02.newbee.ltd/upload/20230714_14173647.jpg',
            goodsStockStatus: '0'
          }
        })
      } else {
        state.goodForm.goodsSellStatus = Number(state.goodForm.goodsSellStatus)
        state.goodForm.goodsStockStatus = Number(state.goodForm.goodsStockStatus)
        const goodsIndex = goodsStore.goodsList.findIndex((goods) => {
          return goods.id == state.id
        })
        goodsStore.goodsList[goodsIndex] = state.goodForm
        ElMessage({
          message: `${state.goodForm.goodsName}商品修改信息成功`,
          type: 'success'
        })
      }
      const currentPath = route.path
      const tagsIndex = appStore.tagsViewList.findIndex((r) => {
        return r.fullPath == currentPath
      })
      appStore.removeTagsViewList(tagsIndex)
      router.push('/goods/goodsList')
    }
  })
}

onMounted(() => {
  if (state.id) {
    state.goodForm = goodsStore.goodsList[Number(state.id) - 1]
    state.goodForm.goodsSellStatus = String(state.goodForm.goodsSellStatus)
    state.goodForm.goodsStockStatus = String(state.goodForm.goodsStockStatus)
  }
})
</script>

<template>
  <el-card class="goodsCrate-card">
    <el-form
      :model="state.goodForm"
      :rules="state.rules"
      ref="goodRef"
      label-width="100px"
      class="add-container"
    >
      <el-form-item label="商品名称" prop="goodsName">
        <el-input
          style="width: 300px"
          v-model="state.goodForm.goodsName"
          placeholder="请输入商品名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品简介" prop="goodsIntro">
        <el-input
          style="width: 300px"
          type="textarea"
          v-model="state.goodForm.goodsIntro"
          placeholder="请输入商品简介(100字)"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="originalPrice">
        <el-input
          type="number"
          min="0"
          style="width: 300px"
          v-model="state.goodForm.originalPrice"
          placeholder="请输入商品价格"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品售卖价" prop="sellingPrice">
        <el-input
          type="number"
          min="0"
          style="width: 300px"
          v-model="state.goodForm.sellingPrice"
          placeholder="请输入商品售价"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品库存" prop="stockNum">
        <el-input
          type="number"
          min="0"
          style="width: 300px"
          v-model="state.goodForm.stockNum"
          placeholder="请输入商品库存"
        ></el-input>
      </el-form-item>
      <el-form-item label="上架状态" prop="goodsSellStatus">
        <el-radio-group v-model="state.goodForm.goodsSellStatus">
          <el-radio label="0">上架</el-radio>
          <el-radio label="1">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="库存状态" prop="goodsStockStatus">
        <el-radio-group v-model="state.goodForm.goodsStockStatus">
          <el-radio label="0"> 充足 </el-radio>
          <el-radio label="1"> 补货 </el-radio>
          <el-radio label="2"> 不足 </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item required label="商品主图" prop="goodsCoverImg">
        <el-upload
          class="avatar-uploader"
          :action="state.uploadImgServer"
          accept="jpg,jpeg,png"
          :headers="{
            token: state.token
          }"
          :show-file-list="false"
          :on-success="handleUrlSuccess"
        >
          <img
            style="width: 100px; height: 100px; border: 1px solid #e9e9e9"
            v-if="state.goodForm.goodsCoverImg"
            :src="state.goodForm.goodsCoverImg"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitAdd()">{{
          state.id ? '立即修改' : '立即创建'
        }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="less" scoped>
.add {
  display: flex;
}
.add-container {
  flex: 1;
  height: 100%;
  margin-top: 1rem;
}
.avatar-uploader {
  width: 100px;
  height: 100px;
  color: #ddd;
  display: flex;
  justify-content: center;
  border: 1px solid #e9e9e9;
}
.avatar-uploader-icon {
  display: flex;
  place-content: center;
  width: 100%;
  height: 100%;
}
</style>
