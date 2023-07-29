<!-- eslint-disable no-undef -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import goodsInfo from '@/json/goods.json'
import { useGoodsStore } from '@/stores/goods.js'
const goodsStore = useGoodsStore()

const state = ref({
  // 商品列表
  allGoods: [],
  // 商品总数
  totalGoodsNum: computed(() => {
    return state.value.allGoods.length
  }),
  // 每页展示商品数量
  pageSize: 5,
  // 当前页
  currentPage: 1
})

// 切换页数
const changePage = (val) => {
  state.value.currentPage = val
}

// 修改商品信息
const handleEdit = (id) => {
  console.log(id)
}

// 修改上下架状态
const handleSellStatus = (id, status) => {
  const goodsIndex = goodsStore.goodsList.findIndex((goods) => {
    return goods.id == id
  })
  goodsStore.goodsList[goodsIndex].goodsSellStatus = status
  ElMessage({
    message: '修改状态成功',
    type: 'success'
  })
}

// 获取商品列表
const getGoodsList = () => {
  // 模拟获取商品数据
  goodsStore.goodsList = goodsInfo.data
  state.value.allGoods = goodsStore.goodsList
}

onMounted(() => {
  getGoodsList()
})
</script>
<template>
  <el-card class="goodsList-card">
    <template #header>
      <div class="header">
        <router-link to="/goods/create">
          <el-button type="primary">添加商品</el-button>
        </router-link>
      </div>
    </template>
    <el-table
      :data="state.allGoods.slice((state.currentPage - 1) * 5, (state.currentPage - 1) * 5 + 5)"
      style="width: 100%"
    >
      <el-table-column prop="id" label="商品编号" width="80"> </el-table-column>
      <el-table-column prop="goodsName" label="商品名" width="80"> </el-table-column>
      <el-table-column prop="goodsIntro" label="商品简介" width="240"></el-table-column>
      <el-table-column label="商品图片" width="150px">
        <template #default="scope">
          <img
            style="width: 100px; height: 100px"
            :key="scope.row.goodsId"
            :src="scope.row.goodsCoverImg"
            alt="商品主图"
          />
        </template>
      </el-table-column>
      <el-table-column prop="stockNum" label="商品库存"></el-table-column>
      <el-table-column prop="goodsStockStatus" label="库存状态">
        <template #default="scope">
          <span v-if="scope.row.goodsStockStatus === 0" style="color: green; font-weight: 800"
            >充足</span
          >
          <span
            v-else-if="scope.row.goodsStockStatus === 1"
            style="color: #f1c232; font-weight: 800"
            >补货中</span
          >
          <span v-else style="color: red; font-weight: 800">不足</span>
        </template>
      </el-table-column>
      <el-table-column prop="sellingPrice" label="商品售价"> </el-table-column>
      <el-table-column prop="goodsSellStatus" label="上架状态">
        <template #default="scope">
          <span v-if="scope.row.goodsSellStatus === 0" style="color: green">销售中</span>
          <span v-else style="color: red">已下架</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160px">
        <template #default="scope">
          <el-button type="primary" style="cursor: pointer" @click="handleEdit(scope.row.id)">
            <router-link :to="{ name: 'goodsModify', params: { id: `${scope.row.id}` } }"
              >修改</router-link
            >
          </el-button>
          <el-button
            v-if="scope.row.goodsSellStatus === 0"
            type="warning"
            style="cursor: pointer"
            @click="handleSellStatus(scope.row.id, 1)"
          >
            下架
          </el-button>
          <el-button
            v-else
            style="cursor: pointer"
            type="primary"
            @click="handleSellStatus(scope.row.id, 0)"
          >
            上架
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-position">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :total="state.totalGoodsNum"
        :page-size="state.pageSize"
        :current-page="state.currentPage"
        @current-change="changePage"
      />
    </div>
  </el-card>
</template>

<style lang="less" scoped>
.goodsList-card {
  min-height: 450px;
  position: relative;
}
.pagination-position {
  margin-top: 10px;
  position: relative;
}
</style>
