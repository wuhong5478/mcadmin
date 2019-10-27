<template>
  <div>
    <el-row :gutter="20" style="height: 200px">
      <el-col :span="6">
        <div class="titleMin">本月任务数量</div>
        <div class="numberMid">
          <b class="font36">{{ monCount }}</b>次
        </div>
        <div class="descMin">上月任务数量 {{ preMonCount }}</div>
      </el-col>
      <el-col :span="6">
        <div class="titleMin">本月巡检单位数</div>
        <div class="numberMid">
          <b class="font36">{{ checkTotal }}</b>个
        </div>
        <div class="descMin" style="padding-top: 0; height:75px" id="chartCheck"></div>
      </el-col>
      <el-col :span="6">
        <div class="titleMin">上报隐患数量</div>
        <div class="numberMid">
          <b class="font36">{{ generalDanger+seriousDanger }}</b>次
        </div>
        <div class="descMin">
          <el-col :span="12">一般隐患 {{ generalDanger }}</el-col>
          <el-col :span="12">重大隐患 {{ seriousDanger }}</el-col>
        </div>
      </el-col>
      <el-col :span="6" style="height: 185px; background-color: #ffffff">
        <div>
          <div class="titleMin">完成率</div>
          <el-col :span="10">
            <div class="numberMid">
              <b class="font36">{{ percentage }}%</b>
            </div>
          </el-col>
          <el-col :span="14">
            <div style="padding-left: 40px">
              <el-progress
                type="circle"
                :percentage="percentage"
                :show-text="false"
                :width="90"
                :stroke-width="12"
                color="#00FF00"
              ></el-progress>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div style="height: 330px">
        <el-col :span="14">
          <div class="titleMin">
            <b class="font14">任务数量统计</b>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="titleMin"></div>
        </el-col>
        <el-col :span="3">
          <div class="titleMin">
            <b class="font14">人员数量排名</b>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="titleMin">
            <span @click="getWeek" :class="spanWeek">本周</span>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="titleMin">
            <span @click="getMonth" :class="spanMon">本月</span>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="titleMin">
            <span @click="getYear" :class="spanYear">全年</span>
          </div>
        </el-col>
        <hr class="hr-100width" />
        <el-col :span="15">
          <!--          <div class="titleMin">隐患总数 <b class="font14">{{ totalCount }}</b></div>-->
          <div id="chartTaskNum" class="chartMax" style="height: 275px"></div>
        </el-col>
        <el-col :span="1">
          <div class="titleMin"></div>
        </el-col>
        <el-col :span="3">
          <div class="titleMin">姓名</div>
        </el-col>
        <el-col :span="3">
          <div class="titleMin">任务数量</div>
        </el-col>
        <el-col :span="2">
          <div class="titleMin">完成率</div>
        </el-col>
        <el-col :span="9" style="height: 220px; overflow-y:auto;background-color: #ffffff">
          <div
            v-for="(item,index) in totalCountData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <el-row style="height: 30px">
              <el-col :span="4" style="padding-left: 20px">{{ index + 1 }}</el-col>
              <el-col :span="10">{{ item.姓名 }}</el-col>
              <el-col :span="6">{{ item.任务数量 }}</el-col>
              <el-col :span="4">
                <b style="color: #40E0D0">{{ item.完成率 }}</b>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </div>
    </el-row>
    <el-row :gutter="20" style="height: 320px; padding-top: 20px">
      <el-col :span="12">
        <div class="titleMin">
          <b class="font14">解决隐患数量</b>
        </div>
        <hr class="hr-100width" />
        <div id="chartDealNum" class="chartMax"></div>
      </el-col>
      <el-col :span="12">
        <div class="titleMin">
          <b class="font14">完成趋势</b>
        </div>
        <hr class="hr-100width" />
        <div id="chartDone" class="chartMax"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      optionCheck: {
        tooltip: {
          trigger: 'axis',
          position: function(pt) {
            return [pt[0], '10%']
          }
        },
        title: {
          left: 'center',
          text: ''
        },
        grid: {
          x: 0,
          x2: 40,
          y: 40,
          height: 40
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          show: false
        },
        yAxis: {
          type: 'value',
          show: false,
          boundaryGap: [0, '100%']
        },
        series: [
          {
            name: '',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: '#DC143C'
            },
            areaStyle: {
              color: '#DC143C'
            },
            data: []
          }
        ]
      },
      optionTaskNum: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          x: 40,
          x2: 20,
          y: 30,
          height: 180
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
                color: '#00CED1'
              }
            }
          }
        ]
      },
      optionDealNum: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          x: 40,
          x2: 20,
          y: 30,
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
      optionDone: {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [],
          show: true,
          top: 10,
          left: 20,
          icon: 'rect'
        },
        grid: {
          x: 60,
          x2: 20,
          y: 40,
          height: 150
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
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
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value}%'
          },
          type: 'value'
        },
        series: [
          {
            name: '',
            symbol: 'none',
            color: '#1E90FF',
            type: 'line',
            stack: '',
            data: [],
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
          },
          {
            name: '',
            symbol: 'none',
            color: '#00CED1',
            type: 'line',
            stack: '',
            data: [],
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
      monCount: 0,
      preMonCount: 0,
      reportXData: [],
      reportYData: [],
      checkTotal: 0,
      generalDanger: 0,
      seriousDanger: 0,
      percentage: 0,
      totalCount: 0,
      totalCountData: {},
      spanWeek: 'span',
      spanMon: 'spanPre',
      spanYear: 'spanPre'
    }
  },
  created() {
    this.getInitData()
  },
  methods: {
    getCookie(name) {
      var strcookie = document.cookie //获取cookie字符串
      var arrcookie = strcookie.split('; ') //分割
      //遍历匹配
      for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split('=')
        if (arr[0] === name) {
          return arr[1]
        }
      }
      return ''
    },

    dateFilterYYYYMM(value) {
      return moment(value).format('YYYY-MM')
    },

    getInitData() {
      let deptId = this.getCookie('dept_id')
      let month = this.dateFilterYYYYMM(new Date())

      // 本月巡检完成率
      this.instance
        .get('/deviceRountingAnalysis/deviceReportCompletionRate', {
          params: {
            deptId: deptId
          }
        })
        .then(res => {
          this.percentage = res.data.data.完成率

          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })

      // 本月巡检任务数量
      this.instance
        .get('/deviceRountingAnalysis/deviceRountingMissionThisMonth', {
          params: {
            deptId: deptId
          }
        })
        .then(res => {
          this.monCount = res.data.data.本月任务数量
          this.preMonCount = res.data.data.上月任务数量
          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })

      // 本月巡检对象数量
      this.instance
        .get('/deviceRountingAnalysis/deviceRountingQuantity', {
          params: {
            deptId: deptId
          }
        })
        .then(res => {
          this.checkTotal = res.data.data
          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })

      // 人工上报隐患（按隐患等级统计）
      // 本月巡检任务数量
      this.instance
        .get('/analysis/getAnalyByRgLevel', {
          params: {
            archid: '',
            areaid: '',
            deptid: deptId,
            endmonth: '', //yyyy-MM
            month: month //yyyy-MM
          }
        })
        .then(res => {
          this.generalDanger = res.data.data[0].count
          this.seriousDanger = res.data.data[1].count

          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })

      // 每月任务统计
      this.instance
        .get('/deviceRountingAnalysis/deviceYearTaskSum', {
          params: {
            deptId: deptId,
            year: new Date().getFullYear()
          }
        })
        .then(res => {
          this.optionTaskNum.xAxis.data = res.data.data.month
          this.optionTaskNum.series[0].data = res.data.data.data

          this.$chart.myChart('chartTaskNum', this.optionTaskNum)
          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })

      // 本周人员排行
      this.getWeek()

      // 解决隐患数量（按月统计）
      this.instance
        .get('/analysis/getAnalySolveWarnCountByMonth', {
          params: {
            archid: '',
            areaid: '',
            deptid: deptId
          }
        })
        .then(res => {
          this.optionDealNum.xAxis.data = res.data.data.category
          this.optionDealNum.series[0].data = res.data.data.data

          this.$chart.myChart('chartDealNum', this.optionDealNum)
          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })

      // 近半年完成率/及时率/下月趋势
      this.instance
        .get('/deviceRountingAnalysis/nearlyHalfaYear', {
          params: {
            deptId: deptId
          }
        })
        .then(res => {
          // alert(res.data.data.timely_rate.name)
          this.optionDone.xAxis.data = res.data.data.months
          this.optionDone.series[0].data = res.data.data.completion_rate.data
          this.optionDone.series[0].name = res.data.data.completion_rate.name
          this.optionDone.series[1].data = res.data.data.timely_rate.data
          this.optionDone.series[1].name = res.data.data.timely_rate.name

          this.optionDone.legend.data.push(res.data.data.completion_rate.name)
          this.optionDone.legend.data.push(res.data.data.timely_rate.name)

          let forecast = new Date().getMonth() + 2 + '月'
          let coordTop
          coordTop = Math.max.apply(null, res.data.data.completion_rate.data)
          let coord = []
          coord.push({ coord: [forecast, 0] })
          coord.push({ coord: [forecast, coordTop] })
          this.optionDone.series[0].markLine.data[0] = coord

          let coordTop1
          coordTop1 = Math.max.apply(null, res.data.data.timely_rate.data)
          let coord1 = []
          coord1.push({ coord: [forecast, 0] })
          coord1.push({ coord: [forecast, coordTop1] })

          this.optionDone.series[1].markLine.data[0] = coord1

          this.$chart.myChart('chartDone', this.optionDone)
          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })
    },

    //本周人员排行
    async getWeek() {
      this.spanWeek = 'span'
      this.spanMon = 'spanPre'
      this.spanYear = 'spanPre'
      this.instance
        .get('/deviceRountingAnalysis/personnelWeek', {
          params: {}
        })
        .then(res => {
          this.totalCountData = res.data.data
          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })
    },

    // 本月人员排行
    async getMonth() {
      this.spanWeek = 'spanPre'
      this.spanMon = 'span'
      this.spanYear = 'spanPre'
      this.instance
        .get('/deviceRountingAnalysis/personnelMonth', {
          params: {}
        })
        .then(res => {
          this.totalCountData = res.data.data
          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })
    },

    // 全年人员排行
    async getYear() {
      this.spanWeek = 'spanPre'
      this.spanMon = 'spanPre'
      this.spanYear = 'span'
      this.instance
        .get('/deviceRountingAnalysis/personnelYear', {
          params: {}
        })
        .then(res => {
          this.totalCountData = res.data.data
          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.titleMin {
  padding-top: 20px;
  padding-left: 20px;
  height: 35px;
  font-size: 14px;
  color: #b5b5b5;
  background-color: #fff;
}
.numberMid {
  padding-bottom: 10px;
  padding-left: 20px;
  height: 45px;
  font-size: 14px;
  color: #b5b5b5;
  background-color: #fff;
}
.descMin {
  padding-top: 40px;
  padding-left: 15px;
  height: 35px;
  font-size: 14px;
  color: #999999;
  background-color: #fff;
}
.chartMax {
  padding-top: 0;
  height: 220px;
  background-color: #fff;
  text-align: center;
}
.chartMid {
  height: 200px;
  padding-top: 0;
  background-color: #ffffff;
}
.chartMin {
  height: 118px;
  padding-top: 0;
  background-color: #ffffff;
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
.font24 {
  font-size: 24px;
  color: black;
}
.font36 {
  font-size: 36px;
  color: black;
}
.spanPre {
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  line-height: 24px;
}
.span {
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  line-height: 24px;
  color: #40e0d0;
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