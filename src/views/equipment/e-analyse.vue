<template>
  <div>
    <el-row :gutter="20" style="height: 245px">
      <el-col :span="6">
        <div class="titleDiv" style="height: 25px">设备类型</div>
        <div class="numberDiv" style="height: 45px">
          <b class="font36">{{ devTypeNum }}</b>种
        </div>
        <div id="chartEquipment" class="chartMin"></div>
        <div class="descDiv">
          <hr class="hr-90width" />最多设备
          <b class="font14">{{ maxDevTypeName }}</b>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="titleDiv" style="height: 25px">故障总数</div>
        <div class="numberDiv" style="height: 45px">
          <b class="font36">{{ bad }}</b>个
        </div>
        <div id="chartFault" class="chartMin"></div>
        <div class="descDiv">
          <hr class="hr-90width" />最多故障
          <b class="font14">{{ maxBadDevTypeName }}</b>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="titleDiv">设备完好率</div>
        <div class="numberDiv">
          <b class="font36">{{ perfectPre }}</b>%
        </div>
        <div class="chartMin">
          <el-progress
            :percentage="perfectPre"
            color="#32CD32"
            :show-text="false"
            style="padding-top: 20%;width: 90%"
          ></el-progress>
        </div>
        <div class="descDiv">
          <hr class="hr-90width" />
        </div>
        <!--        <div class="descDiv"><hr class="hr-90width">最高完好率 <b class="font14">计算机</b></div>-->
      </el-col>
      <el-col :span="6" style="padding-right: 0">
        <div class="titleDiv">设备在线率</div>
        <div class="numberDiv">
          <b class="font36">{{ normalPer }}</b>%
        </div>
        <div class="chartMin">
          <el-progress
            :percentage="normalPer"
            color="#00BFFF"
            :show-text="false"
            style="padding-top: 20%;width: 90%"
          ></el-progress>
        </div>
        <div class="descDiv">
          <hr class="hr-90width" />最高在线
          <b class="font14">{{maxOnline}}</b>
        </div>
      </el-col>
    </el-row>
    <el-row style="height: 500px;">
      <div>
        <div class="titleDiv">
          <b class="font14">设备型号</b>
        </div>
        <hr class="hr-100width" />
        <div class="titleDiv">
          设备总数
          <b class="font14">{{ total }}</b>
        </div>
        <div id="chartModel" class="chartMax"></div>
        <hr class="hr-100width" />
        <div class="titleDiv">
          <b class="font14">设备类型名称</b>
        </div>
        <div style="overflow-y: auto;height: 140px;background-color: #fff;">
          <div
            v-for="(item,index)  in deviceCategoryDTOList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <el-col :span="6" style="padding: 5px;font-size: 14px;">
              <el-col :span="3" style="padding-left: 10px;color: #40E0D0;">{{index + 1}}</el-col>
              <el-col :span="17">{{item.productName}}</el-col>
              <el-col :span="4">{{item.total}}</el-col>
            </el-col>
          </div>
        </div>
      </div>
    </el-row>
    <el-row :gutter="20" style="height: 245px;padding-top: 20px">
      <el-col :span="8">
        <div class="titleDiv">
          <b class="font14">厂家统计</b>
        </div>
        <div id="chartFactory" class="chartMid"></div>
      </el-col>
      <el-col :span="8">
        <div class="titleDiv">
          <b class="font14">设备健康分析</b>
        </div>
        <div id="chartHealthy" class="chartMid"></div>
      </el-col>
      <el-col :span="8" style="padding-right: 0">
        <div class="titleDiv">
          <b class="font14">设备状态统计</b>
        </div>
        <div id="chartState" class="chartMid">
          <div style="padding-left: 20px;height: 100px">
            <el-col :span="8" style="padding-left: 20px">
              <el-progress type="circle" :percentage="onlineDev" :width="90"></el-progress>
            </el-col>
            <el-col :span="8" style="padding-left: 12px">
              <el-progress type="circle" :percentage="offlineDev" :width="90"></el-progress>
            </el-col>
            <el-col :span="8" style="padding-left: 0">
              <el-progress type="circle" :percentage="inactiveDev" :width="90"></el-progress>
            </el-col>
          </div>
          <div style="font-size: 12px;padding-top: 20px;height: 30px">
            <el-col :span="8" style="padding-left: 30px">在线设备</el-col>
            <el-col :span="8" style="padding-left: 30px">离线设备</el-col>
            <el-col :span="8" style="padding-left: 30px">未激活设备</el-col>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="padding: 40px 0 20px 0;">
      <div>
        <div class="titleDiv">
          <b class="font14">设备完好趋势</b>
        </div>
        <hr class="hr-100width" />
        <div id="chartAvailability" class="chartMax"></div>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      normal: 0,
      total: 0,
      maxDevTypeName: 0,
      bad: 0,
      badPer: 0,
      devTypeNum: 0,
      normalPer: 0,
      maxBadDevTypeName: 0,
      devStatusList: {},
      deviceCategoryDTOList: {},
      devTypeList: {},
      onlineDev: 0,
      offlineDev: 0,
      inactiveDev: 0,
      maxOnline: 0,
      maxOnlineRate: 0,
      perfectPre: 0,
      optionEquipment: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          x: 0,
          x2: 10,
          y: 30,
          height: 60
        },
        xAxis: {
          type: 'category',
          data: [],
          show: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            data: [],
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#1E90FF'
              }
            }
          }
        ]
      },

      optionFault: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          x: 0,
          x2: 10,
          y: 30,
          height: 60
        },
        xAxis: {
          type: 'category',
          data: [],
          show: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            data: [],
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#4169E1'
              }
            }
          }
        ]
      },
      optionModel: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          x: 50,
          x2: 20,
          y: 10,
          y2: 10,
          height: 160
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#DCDCDC'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#000000'
            }
          }
        },
        yAxis: {
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#DCDCDC'
            },
            show: true
          },
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'bar',
            barWidth: '30%',
            itemStyle: {
              normal: {
                color: '#1E90FF'
              }
            }
          }
        ]
      },
      optionFactory: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          y2: 10,
          data: [],
          icon: 'circle',
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          itemGap: 5 // 设置间距
        },
        series: [
          {
            name: '厂家名称',
            type: 'pie',
            radius: ['50%', '100%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 0, name: '', itemStyle: { color: '#00BFFF' } },
              { value: 0, name: '', itemStyle: { color: '#00FA9A' } },
              { value: 0, name: '', itemStyle: { color: '#BA55D3' } },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' },
              { value: 0, name: '' }
            ]
          }
        ]
      },
      optionHealthy: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          y2: 10,
          data: [],
          icon: 'circle',
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          itemGap: 5 // 设置间距
        },
        series: [
          {
            name: '健康分析',
            type: 'pie',
            radius: ['50%', '80%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 0, name: '', itemStyle: { color: '#00BFFF' } },
              { value: 0, name: '', itemStyle: { color: '#00FA9A' } },
              { value: 0, name: '', itemStyle: { color: '#BA55D3' } }
            ]
          }
        ]
      },
      optionAvailability: {
        grid: {
          x: 60,
          x2: 20,
          y: 10,
          y2: 10,
          height: 160
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#DCDCDC'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#000000'
            }
          }
        },
        yAxis: {
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#DCDCDC'
            },
            show: true
          },
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line',
            itemStyle: {
              normal: {
                color: '#1E90FF'
              }
            },
            markLine: {
              symbol: 'none',
              silent: true,
              data: [[{ coord: ['', 0] }, { coord: ['', 0] }]],
              label: {
                normal: {
                  formatter: '预测趋势'
                }
              },
              lineStyle: {
                show: true,
                color: '#808C94',
                type: 'dashed'
              }
            }
          }
        ]
      },
      keywords: ''
    }
  },
  created() {
    this.getInitData()
  },
  methods: {
    getInitData() {
      // 设备总览信息
      this.instance
        .get('/device/category/list', {
          params: {
            keywords: this.keywords
          }
        })
        .then(res => {
          this.normal = res.data.data.normal
          this.total = res.data.data.total
          this.maxDevTypeName = res.data.data.maxDevTypeName
          this.bad = res.data.data.bad
          this.badPer = res.data.data.badPer.toString().replace(/%/g, '')
          this.devTypeNum = res.data.data.devTypeNum
          this.normalPer = res.data.data.normalPer.toString().replace(/%/g, '')
          this.maxBadDevTypeName = res.data.data.maxBadDevTypeName
          this.deviceCategoryDTOList = res.data.data.deviceCategoryDTOList
          this.devTypeList = res.data.data.devTypeList

          res.data.data.devStatusList.forEach(item => {
            if (item.TYPE_NAME === '离线') {
              this.offlineDev = item.percentag
            } else if (item.TYPE_NAME === '在线') {
              this.onlineDev = item.percentag
            } else {
              this.inactiveDev = item.percentag
            }
          })

          res.data.data.devTypeList.forEach(item => {
            this.optionEquipment.xAxis.data.push(item.categoryName)
            this.optionEquipment.series[0].data.push(item.count)

            this.optionFault.xAxis.data.push(item.categoryName)
            this.optionFault.series[0].data.push(item.badcount)
          })

          res.data.data.deviceCategoryDTOList.forEach((item, index) => {
            this.optionModel.xAxis.data.push(index + 1)
            this.optionModel.series[0].data.push(item.total)
          })

          this.$chart.myChart('chartFault', this.optionFault)
          this.$chart.myChart('chartEquipment', this.optionEquipment)
          this.$chart.myChart('chartModel', this.optionModel)

          // let months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })

      // 设备总览信息
      this.instance
        .get('/device/category/maxOnlineRate', {
          params: {
            keywords: this.keywords
          }
        })
        .then(res => {
          this.maxOnline = res.data.productName
          this.maxOnlineRate = res.data.per.toString().replace(/%/g, '')

          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })

      // 厂家统计
      this.instance
        .get('/device/findSupplier', {
          params: {}
        })
        .then(res => {
          res.data.forEach((item, index) => {
            this.optionFactory.legend.data.push(item.name)
            this.optionFactory.series[0].data[index].name = item.name
            this.optionFactory.series[0].data[index].value = item.total
          })

          this.$chart.myChart('chartFactory', this.optionFactory)
          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })

      // 设备健康
      this.instance
        .get('/deviceHealthStatistics', {
          params: {}
        })
        .then(res => {
          let perfect = res.data[0].per.toString().replace(/%/g, '')
          this.perfectPre = Number(perfect).toFixed(2) //设备完好率
          this.optionHealthy.legend.data = ['健康', '不健康']
          this.optionHealthy.series[0].data[0].name = '健康'
          this.optionHealthy.series[0].data[0].value = res.data[0].healthy
          this.optionHealthy.series[0].data[1].name = '不健康'
          this.optionHealthy.series[0].data[1].name = res.data[0].unhealthy
          this.$chart.myChart('chartHealthy', this.optionHealthy)
          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })

      // 每月设备健康趋势
      this.instance
        .get('/deviceHealthStatistics/year', {
          params: {}
        })
        .then(res => {
          this.optionAvailability.xAxis.data = res.data.data.category
          this.optionAvailability.series[0].data = res.data.data.data

          let forecast = new Date().getMonth() + 2 + '月'
          let coordTop
          // let data = res.data.data.timely_rate.data.concat(res.data.data.completion_rate.data);
          coordTop = Math.max.apply(null, res.data.data.data)
          let coord = []
          coord.push({ coord: [forecast, 0] })
          coord.push({ coord: [forecast, coordTop] })
          this.optionAvailability.series[0].markLine.data[0] = coord
          this.$chart.myChart('chartAvailability', this.optionAvailability)
          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.bg-purple {
  background-color: #fff;
  text-align: center;
  height: 245px;
}
.titleDiv {
  padding-top: 10px;
  padding-left: 15px;
  height: 35px;
  font-size: 14px;
  color: #b5b5b5;
  background-color: #fff;
}
.numberDiv {
  padding-top: 0;
  padding-left: 15px;
  height: 35px;
  font-size: 14px;
  color: #b5b5b5;
  background-color: #fff;
}
.chartMin {
  padding-top: 0;
  padding-left: 15px;
  height: 100px;
  background-color: #fff;
  text-align: center;
}
.chartMid {
  padding-top: 0;
  padding-bottom: 20px;
  /*padding-left: 15px;*/
  height: 180px;
  background-color: #fff;
  text-align: center;
}
.chartMax {
  padding-top: 0;
  height: 220px;
  background-color: #fff;
  text-align: center;
}
.descDiv {
  padding-top: 0;
  padding-left: 15px;
  height: 45px;
  font-size: 14px;
  color: #999999;
  background-color: #fff;
}
.hr-90width {
  background-color: #f5f5f5;
  margin-top: 0;
  width: 90%;
  height: 1px;
  border: none;
}
.hr-100width {
  background-color: #f5f5f5;
  margin: 0;
  width: 100%;
  height: 1px;
  border: none;
}
.font14 {
  font-size: 14px;
  color: black;
}
.font36 {
  font-size: 36px;
  color: black;
}
.el-main {
  display: flex;
  flex-wrap: wrap;
  margin-top: -30px;
  // justify-content: space-between;
  .echarts-rom {
    background: #fff;
    padding: 20px;
    display: flex;
    margin-bottom: 20px;
    text-align: center;
    position: relative;
    // margin-left: 10px;
    .title {
      position: absolute;
    }

    .wave-rom {
      // width: 400px;
      height: 300px;
      position: relative;

      .wave-container {
        position: absolute;
        width: 200px;
        height: 200px;
        padding: 5px;
        border: 5px solid #6e8aca;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        overflow: hidden;
      }

      .wave {
        position: relative;
        width: 200px;
        height: 200px;
        background-color: #6e8aca;
        border-radius: 50%;
        text-align: center;

        .text {
          position: absolute;
          top: 30%;
          z-index: 9999 !important;
          width: 100%;
          color: #38a7e2;
          font-size: 20px;
          font-weight: 700;
          // margin-block-start: 0em;
          // margin-block-end: 0em;
          // position: absolute;
          // top: 50%;
          // left: 50%;
        }
      }

      @keyframes rotate {
        50% {
          transform: translate(-50%, -73%) rotate(180deg);
        }

        100% {
          transform: translate(-50%, -70%) rotate(360deg);
        }
      }
    }
  }
}
</style>
