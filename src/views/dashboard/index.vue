<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted } from 'vue'

let myChart = ref(null)

onMounted(() => {
  myChart.value = echarts.init(document.getElementById('zoom'))

  // 指定图表配置项和数据
  const option = {
    title: {
      text: '系统折线图'
    },
    tooltip: {
      trigger: 'item',
      show: true,
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['新增注册', '付费用户', '活跃用户', '订单数', '当日总收入']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [
          '2023-07-03',
          '2023-07-04',
          '2023-07-05',
          '2023-07-06',
          '2023-07-07',
          '2023-07-08',
          '2023-07-09'
        ]
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '新增注册',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        label: {
          show: true,
          position: 'top'
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '付费用户',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        label: {
          show: true,
          position: 'top'
        },
        emphasis: {
          focus: 'series'
        },
        data: [320, 282, 291, 334, 390, 430, 410]
      },
      {
        name: '活跃用户',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        label: {
          show: true,
          position: 'top'
        },
        emphasis: {
          focus: 'series'
        },
        data: [250, 332, 301, 254, 290, 430, 510]
      },
      {
        name: '订单数',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        label: {
          show: true,
          position: 'top'
        },
        emphasis: {
          focus: 'series'
        },
        data: [420, 432, 401, 434, 490, 430, 420]
      },
      {
        name: '当日总收入',
        type: 'line',
        stack: 'Total',
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.value.setOption(option)
})
onUnmounted(() => {
  myChart.value.dispose()
})
</script>

<template>
  <div class="">
    <el-card class="dashboard-card">
      <div id="zoom"></div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.dashboard-card {
  #zoom {
    min-height: 300px;
  }
}
</style>
