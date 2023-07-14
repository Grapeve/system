import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGoodsStore = defineStore('goods', () => {
  const goodsList = ref([])
  function addGoods(goods) {
    const id = goodsList.value.length + 1
    goods['id'] = id
    goodsList.value.push(goods)
  }

  return { goodsList, addGoods }
})
