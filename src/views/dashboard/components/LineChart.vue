<template>
  <div
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
const colorList = ['#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ nameList, dataList } = {}) {
      this.chart.setOption({
        backgroundColor: '',
        legend: {
          icon: 'rect',
          bottom: '0%',
          right: '50%',
          itemGap: 20,
          itemWidth: 14, // 设置图例项宽度为 20px
          itemHeight: 4, // 设置图例项高度为 10px
          itemStyle: {
            color: '#3E97FF',
            borderRadius: 10 // 设置圆角半径为10px
          },
          textStyle: {
            color: '#A1A5B7'
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#fff',
          textStyle: {
            color: '#A1A5B7'
          },
          padding: [10, 10],
          extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
        },
        grid: {
          top: '10%'
        },
        xAxis: [
          {
            data: nameList,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#A1A5B7'
              },
              // 默认x轴字体大小
              fontSize: 12,
              // margin:文字到x轴的距离
              margin: 15
            },
            axisPointer: {
              label: {
                // padding: [11, 5, 7],
                padding: [0, 0, 10, 0],
                margin: 15,
                // 移入时的字体大小
                fontSize: 12,
                backgroundColor: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#fff' // 0% 处的颜色
                    },
                    {
                      offset: 0.86,
                      color: '#fff' // 0% 处的颜色
                    },
                    {
                      offset: 0.86,
                      color: '#33c0cd' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#33c0cd' // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            },
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#DCE2E8'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#A1A5B7'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            },
            splitArea: {
              show: false
            }
          }

        ],
        series: [
          {
            name: '访问量',
            type: 'line',
            data: dataList,
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: {
              width: 2,
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: '#5db3e9'
                },
                {
                  offset: 1,
                  color: '#5db3e9'
                }
              ])
            },
            itemStyle: {
              normal: {
                color: colorList[0],
                borderColor: colorList[0]
              }
            },
            areaStyle: {
              normal: {
                // 自定义颜色，渐变色填充折线图区域
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1, // 变化度
                  // 渐变色
                  [
                    {
                      offset: 0,
                      color: '#5c9fe5a1'
                    },
                    {
                      offset: 1,
                      color: '#fff'
                    }
                  ]
                )
              }
            }
          }
        ]
      })
    }
  }
}
</script>
