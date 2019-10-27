<template>
  <div>
    <el-row :gutter="20" style="height: 200px">
      <el-col :span="6">
        <div class="titleMin">园区得分</div>
        <div class="numberMid">
          <b class="font36">{{ parkGrade }}</b>分
        </div>
        <div class="descMin">上月园区得分 {{ preParkGrade }}</div>
      </el-col>
      <el-col :span="6">
        <div class="titleMin">隐患数量</div>
        <div class="numberMid">
          <b class="font36">{{ dangerCount }}</b>个
        </div>
        <div class="descMin" style="padding-top: 0; height:75px" id="chartTaskNum"></div>
      </el-col>
      <el-col :span="6">
        <div class="titleMin">火警数量</div>
        <div class="numberMid">
          <b class="font36">{{ fireCount}}</b>次
        </div>
        <div class="descMin" style="padding-top: 0; height:75px" id="chartFire"></div>
      </el-col>
      <el-col :span="6" style="height: 185px; background-color: #ffffff">
        <div>
          <div class="titleMin">设备完好率</div>
          <el-col :span="10">
            <div class="numberMid" style="padding-left: 0">
              <b class="font36">{{ wellPercent }}</b>%
            </div>
          </el-col>
          <el-col :span="14">
            <div style="padding-left: 30px">
              <el-progress
                type="circle"
                :percentage="wellPercent"
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
      <div style>
        <el-col :span="15">
          <div style="height: 420px">
            <div class="titleMin">
              <b class="font14">小镇建筑消防安全指数</b>
            </div>
            <hr class="hr-100width" />
            <div id="charParkGrade" class="chartMax"></div>
            <hr class="hr-100width" />
            <div style="padding-top: 20px; overflow-y: auto;height: 125px;background-color: #fff;">
              <div
                v-for="(item,index)  in buildScoreList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <el-col :span="8" style="padding: 5px;font-size: 14px;">
                  <el-col :span="4" style="padding-left: 10px;color: #38a7e2;">{{index + 1}}</el-col>
                  <el-col :span="15">{{item.typeName}}</el-col>
                  <el-col :span="5" style="color: #40E0D0;">{{item.score}}</el-col>
                </el-col>
              </div>
            </div>
          </div>
          <div style="height: 285px;padding-top: 20px">
            <div class="titleMin">
              <b class="font14">火警数量波动</b>
            </div>
            <hr class="hr-100width" />
            <div id="chartFireWave" class="chartMax"></div>
          </div>
        </el-col>
        <el-col :span="9" style="padding-left: 20px;padding-right: 0;">
          <div style="height: 350px;background-color: #ffffff;">
            <el-col :span="15">
              <div class="titleMin">
                <b class="font14">任务提醒</b>
              </div>
            </el-col>
            <el-col :span="9">
              <div class="titleMin">
                <span @click="allPromotion()" :class="allHandle">
                  <u>一键促办</u>
                </span>
              </div>
            </el-col>
            <hr class="hr-100width" />

            <div style="overflow-y: auto;height: 300px;">
              <div
                v-for="(item) in promotionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <el-row style="padding-top: 5px">
                  <el-col :span="19">
                    <el-row class="col-left-min">{{ item.eventName }}</el-row>
                    <el-row :span="16" class="col-left-min">{{ item.dateTime | dateFilter}}</el-row>
                  </el-col>
                  <el-col :span="5">
                    <div class="col-right-min">{{ item.name }}</div>
                    <span @click="promotion(item)" :class="oneHandle">
                      <u>{{ item.dealStatus }}</u>
                    </span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>

          <div style="height: 20px"></div>
          <div style="height: 345px; background-color: #ffffff;">
            <div class="titleMin">
              <b class="font14">待派单隐患</b>
            </div>
            <hr class="hr-100width" />
            <div style="overflow-y: auto;height: 140px;">
              <div
                v-for="(item) in taskWarnList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <el-row style="padding-top: 5px">
                  <el-col :span="19">
                    <div class="col-left-min">{{ item.hiddangerName }}</div>
                    <el-row>
                      <el-col :span="16" class="col-left-min">{{ item.place }}</el-col>
                      <el-col :span="8" class="col-left-min">{{ item.reportTime | dateFilter}}</el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="5">
                    <div class="col-right-min">{{ item.level }}</div>
                    <span @click="oneDeal" :class="oneHandle">
                      <u>派单</u>
                    </span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>

    <el-row :gutter="20" style="height: 650px;padding-top: 20px">
      <el-col :span="12">
        <el-row>
          <div class="titleMin">
            <b class="font14">隐患等级分析</b>
          </div>
          <hr class="hr-100width" />
          <el-col :span="12">
            <div class="titleMin" style="padding-left: 100px">当月一般隐患</div>
            <div class="numberMid" style="padding-left: 100px">
              <b class="font24">{{ dangerGradeMin }}</b>次
            </div>
          </el-col>
          <td></td>
          <el-col :span="12" style="border-left:1px solid #F5F5F5;">
            <div class="titleMin" style="padding-left: 100px">当月重大隐患</div>
            <div class="numberMid" style="padding-left: 100px">
              <b class="font24">{{ dangerGradeMax }}</b>次
            </div>
          </el-col>
        </el-row>
        <div id="chartDangerGrade" class="chartMid"></div>
        <div style="padding-top: 20px">
          <div class="titleMin">
            <b class="font14">隐患处置率</b>
          </div>
          <hr class="hr-100width" />
          <div id="chartDangerDeal" style="height: 170px" class="chartMin"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="titleMin">
          <b class="font14">隐患来源分析</b>
        </div>
        <hr class="hr-100width" />
        <div id="chartDangerSource" class="chartMid" style="height: 260px;"></div>
        <div style="padding-top: 20px">
          <div class="titleMin">
            <b class="font14">设备完好数量</b>
          </div>
          <hr class="hr-100width" />
          <div id="chartWellNum" class="chartMax"></div>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <div style="height: 280px">
        <div class="titleMin">
          <b class="font14">触达及到场率</b>
        </div>
        <hr class="hr-100width" />
        <div id="chartTouch" style="height: 200px" class="chartMin"></div>
      </div>
    </el-row>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  filters: {
    dateFilter(value) {
      return moment(value).format('YYYY-MM-DD')
    }
  },
  data() {
    return {
      parkGrade: 0,
      preParkGrade: 0,
      dangerCount: 0,
      fireCount: 0,
      wellPercent: 0,
      optionTaskNum: {
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
          x2: 10,
          y: 0,
          height: 50
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
            name: '隐患数量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: '#FFA07A'
            },
            areaStyle: {
              color: '#F4A460'
            },
            data: []
          }
        ]
      },
      optionFire: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          x: 0,
          x2: 10,
          y: 0,
          height: 50
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
            barWidth: '40%',
            itemStyle: {
              normal: {
                color: '#DC143C'
              }
            }
          }
        ]
      },
      optionParkGrade: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          x: 40,
          x2: 40,
          y: 40,
          height: 150
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
      optionFireWave: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [],
          show: false,
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
          type: 'value'
        },
        series: [
          {
            name: '数量',
            symbol: 'none',
            color: '#1E90FF',
            type: 'line',
            stack: '',
            data: []
          }
        ]
      },
      optionDangerGrade: {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [],
          show: false
        },
        grid: {
          x: 60,
          x2: 20,
          y: 10,
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
          type: 'value'
        },
        series: [
          {
            name: '',
            symbol: 'none',
            color: '#4169E1',
            type: 'line',
            stack: '',
            data: []
          },
          {
            name: '',
            symbol: 'none',
            color: '#F08080',
            type: 'line',
            stack: '',
            data: []
          }
        ]
      },
      dangerGradeMin: 0,
      dangerGradeMax: 0,
      optionDangerDeal: {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [],
          show: false
        },
        grid: {
          x: 60,
          x2: 20,
          y: 5,
          height: 130
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
            color: '#4169E1',
            type: 'line',
            stack: '',
            data: []
          }
        ]
      },
      optionDangerSource: {
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
          y: 60,
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
          type: 'value'
        },
        series: [
          {
            name: '',
            symbol: 'none',
            color: '#4169E1',
            type: 'line',
            stack: '',
            data: []
          },
          {
            name: '',
            symbol: 'none',
            color: '#8EEF86',
            type: 'line',
            stack: '',
            data: []
          },
          {
            name: '',
            symbol: 'none',
            color: '#9370DB',
            type: 'line',
            stack: '',
            data: []
          }
        ]
      },
      optionWellNum: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          x: 60,
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
      optionTouch: {
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
          y: 60,
          height: 120
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
            color: '#4169E1',
            type: 'line',
            stack: '',
            data: []
          },
          {
            name: '',
            symbol: 'none',
            color: '#8EEF86',
            type: 'line',
            stack: '',
            data: []
          }
        ]
      },
      taskWarnList: [],
      promotionList: [],
      buildScoreList: [],
      allHandle: 'spanPre',
      oneHandle: 'spanPre'
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

      // 隐患数量（按天统计）
      this.instance
        .get('/analysis/getAnalyWarnCountByDay', {
          params: {
            archid: '',
            areaid: '',
            deptid: deptId,
            endmonth: '', //yyyy-MM
            month: month //yyyy-MM
          }
        })
        .then(res => {
          this.dangerCount = res.data.data.totalcount
          res.data.data.data.forEach(item => {
            this.optionTaskNum.xAxis.data.push(item.day)
            this.optionTaskNum.series[0].data.push(item.count)
          })
          this.$chart.myChart('chartTaskNum', this.optionTaskNum)
          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })

      // 火警总数变化趋势
      this.instance
        .get('/fireAnalysis/getAnalyByTotalFire', {
          params: {
            archid: '',
            areaid: '',
            deptid: deptId
          }
        })
        // Just to simulate the time of the request
        .then(res => {
          this.optionFire.xAxis.data = res.data.data.category
          this.optionFire.series[0].data = res.data.data.data
          this.$chart.myChart('chartFire', this.optionFire)

          res.data.data.data.forEach(item => {
            this.fireCount += item
          })

          setTimeout(() => {}, 1.5 * 100)
        })

      // 查询巡检园区得分
      this.instance
        .get('/inspectionHome/areaScore', {
          params: {
            deptId: deptId
          }
        })
        // Just to simulate the time of the request
        .then(res => {
          this.parkGrade = res.data.data.currentScore
          this.preParkGrade = res.data.data.lastMonthScore
          this.buildScoreList = res.data.data.buildScoreList
          res.data.data.buildScoreList.forEach((item, index) => {
            this.optionParkGrade.xAxis.data.push(index + 1)
            this.optionParkGrade.series[0].data.push(item.score)
          })
          this.$chart.myChart('charParkGrade', this.optionParkGrade)
          setTimeout(() => {}, 1.5 * 100)
        })

      // 超时任务信息
      this.instance
        .get('/inspectionHome/overTimeTaskList', {
          params: {
            deptId: deptId
          }
        })
        // Just to simulate the time of the request
        .then(res => {
          this.promotionList = res.data.data.data
          setTimeout(() => {}, 1.5 * 100)
        })

      // 设备健康
      this.instance
        .get('/deviceHealthStatistics', {
          params: {}
        })
        .then(res => {
          let perfect = res.data[0].per.toString().replace(/%/g, '')
          this.wellPercent = Number(perfect).toFixed(2) //设备完好率
          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })

      // 查询巡检用户首页信息
      this.instance
        .get('/inspectionHome/unDealTaskWarn', {
          params: {
            deptId: deptId
          }
        })
        .then(res => {
          this.taskWarnList = res.data.data.taskWarnList

          res.data.data.deviceNumList.forEach(item => {
            this.optionWellNum.xAxis.data.push(item.type)
            this.optionWellNum.series[0].data.push(item.data)
          })

          this.optionTouch.legend.data = ['60s触达率', '3分钟到场率']
          res.data.data.fireWarnRateList.forEach(item => {
            if (item.name === 'sixRateList') {
              this.optionTouch.series[0].name = '60s触达率'
              item.data.forEach(item => {
                this.optionTouch.xAxis.data.push(item.type)
                this.optionTouch.series[0].data.push(item.data)
              })
            } else {
              this.optionTouch.series[1].name = '3分钟到场率'
              item.data.forEach(item => {
                this.optionTouch.series[1].data.push(item.data)
              })
            }
          })

          this.$chart.myChart('chartWellNum', this.optionWellNum)
          this.$chart.myChart('chartTouch', this.optionTouch)

          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })

      // 火警总数波动按月统计(当年)
      this.instance
        .get('/fireAnalysis/getAnalyByTotalFireSurgeByMonth', {
          params: {
            archid: '',
            areaid: '',
            deptid: deptId
          }
        })
        .then(res => {
          this.optionFireWave.xAxis.data = res.data.data.category
          this.optionFireWave.series[0].data = res.data.data.data

          this.$chart.myChart('chartFireWave', this.optionFireWave)
          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })

      // 隐患等级分析·按月查询数据
      this.instance
        .get('/analysis/getAnalyByLevelMonth', {
          params: {
            areaid: '',
            deptid: deptId,
            month: month //yyyy-MM
          }
        })
        .then(res => {
          res.data.data.forEach(item => {
            if (item.type === '一般隐患') {
              this.dangerGradeMin = item.count
            } else {
              this.dangerGradeMax = item.count
            }
          })

          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })

      // 隐患等级分析
      this.instance
        .get('/analysis/getAnalyByLevelMonths', {
          params: {
            areaid: '',
            deptid: deptId
          }
        })
        .then(res => {
          this.optionDangerGrade.xAxis.data = res.data.data.category
          this.optionDangerGrade.series[0].data = res.data.data.type[0].data
          this.optionDangerGrade.series[0].name = res.data.data.type[0].name
          this.optionDangerGrade.series[1].data = res.data.data.type[1].data
          this.optionDangerGrade.series[1].name = res.data.data.type[1].name
          this.$chart.myChart('chartDangerGrade', this.optionDangerGrade)

          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })

      // 隐患处置率
      this.instance
        .get('/analysis/getAnalyByWarnDealRate', {
          params: {
            archid: '',
            areaid: '',
            deptid: deptId
          }
        })
        .then(res => {
          this.optionDangerDeal.xAxis.data = res.data.data.category
          this.optionDangerDeal.series[0].data = res.data.data.data
          this.$chart.myChart('chartDangerDeal', this.optionDangerDeal)

          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })

      // 隐患来源分析
      this.instance
        .get('/analysis/getAnalyByWarnSource', {
          params: {
            areaid: '',
            deptid: deptId
          }
        })
        .then(res => {
          this.optionDangerSource.xAxis.data = res.data.data.category
          res.data.data.type.forEach((item, index) => {
            this.optionDangerSource.legend.data.push(item.name)
            this.optionDangerSource.series[index].data = item.data
            this.optionDangerSource.series[index].name = item.name
          })

          this.$chart.myChart('chartDangerSource', this.optionDangerSource)

          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })
    },

    oneDeal() {
      this.$router.push({ path: '/d-Analysis' })
    },

    async promotion(item) {
      // this.allHandle = 'span';
      // 催办接口
      this.instance
        .get('/noticePerson', {
          params: {
            id: item.id,
            type: item.type
          }
        })
        .then(res => {
          this.$message.success(res.data.data.data)
          // Just to simulate the time of the request
          setTimeout(() => {}, 1.5 * 100)
        })
    },

    async allPromotion() {
      let deptId = this.getCookie('dept_id')
      // 一键催办接口
      this.instance
        .get('/noticePersonList', {
          params: {
            deptId: deptId,
            type: 'area'
          }
        })
        .then(res => {
          this.$message.success(res.data.data.data)
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
.col-left-min {
  padding-left: 20px;
  font-size: 14px;
  color: #000000;
  background-color: #fff;
}
.col-right-min {
  font-size: 14px;
  color: #b5b5b5;
  background-color: #fff;
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