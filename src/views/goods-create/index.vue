<template>
  <div class="">商品添加</div>
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
        v-model="form.goodsIntro"
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
    <el-form-item label="商品标签" prop="tag">
      <el-input
        style="width: 300px"
        v-model="state.goodForm.tag"
        placeholder="请输入商品小标签"
      ></el-input>
    </el-form-item>

    <el-form-item label="上架状态" prop="goodsSellStatus">
      <el-radio-group v-model="state.goodForm.goodsSellStatus">
        <el-radio label="0">上架</el-radio>
        <el-radio label="1">下架</el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- <el-form-item label="修改时间">
      <el-col :span="11">
        <el-date-picker
          v-model="form.date1"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
      </el-col>
    </el-form-item> -->
    <el-form-item required label="商品主图" prop="goodsCoverImg">
      <el-upload
        class="avatar-uploader"
        :action="state.uploadImgServer"
        accept="jpg,jpeg,png"
        :headers="{
          token: state.token
        }"
        :show-file-list="false"
        :before-upload="handleBeforeUpload"
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
</template>

<script setup>
import { reactive } from 'vue'
import axios from '@/utils/axios'
import { useRoute, useRouter } from 'vue-router'
import { uploadImgServer, localGet } from '@/utils'
const router = useRouter() // 声明路由实例
const route = useRoute() // 获取路由参数
const { id } = route.query
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
    goodsCoverImg: '',
    tag: ''
  },
  rules: {
    goodsName: [{ required: 'true', message: '请填写商品名称', trigger: ['change'] }],
    originalPrice: [{ required: 'true', message: '请填写商品价格', trigger: ['change'] }],
    sellingPrice: [{ required: 'true', message: '请填写商品售价', trigger: ['change'] }],
    stockNum: [{ required: 'true', message: '请填写商品库存', trigger: ['change'] }]
  },
  categoryId: '',
  category: {
    lazy: true,
    lazyLoad(node, resolve) {
      const { level = 0, value } = node
      axios
        .get('/categories', {
          params: {
            pageNumber: 1,
            pageSize: 1000,
            categoryLevel: level + 1,
            parentId: value || 0
          }
        })
        .then((res) => {
          const list = res.list
          const nodes = list.map((item) => ({
            value: item.categoryId,
            label: item.categoryName,
            leaf: level > 1
          }))
          resolve(nodes)
        })
    }
  }
})

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

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
  font-size: 30px;
}
.avatar-uploader-icon {
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid #e9e9e9;
  padding: 32px 17px;
}
</style>
