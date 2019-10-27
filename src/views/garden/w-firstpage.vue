<template>
  <div>
    <el-row :gutter="20" style="height: 200px">
      <el-col :span="6">
        <div class="titleMin">维保任务得分</div>
        <div class="numberMid"><b class="font36">{{ taskGrade }}</b>分</div>
        <div class="descMin">上月任务得分 {{ preTaskGrade }}</div>
      </el-col>
      <el-col :span="6">
        <div class="titleMin">维保任务数量</div>
        <div class="numberMid"><b class="font36">{{ taskCount }}</b>个</div>
        <div class="descMin" style="padding-top: 0; height:75px" id="chartTaskNum"></div>
      </el-col>
      <el-col :span="6">
        <div class="titleMin">维保数量</div>
        <div class="numberMid"><b class="font36">{{ doneNumber}}</b>次</div>
        <div class="descMin" style="padding-top: 0; height:75px" id="chartNumber"></div>
      </el-col>
      <el-col :span="6" style="height: 185px;background-color: #ffffff;">
        <div>
          <div class="titleMin">解决隐患数量</div>
          <el-col :span="10"><div class="numberMid"><b class="font36">{{ dealCount }}次</b></div></el-col>
          <el-col :span="14">
            <div style="padding-left: 30px">
              <el-progress type="circle" :percentage=dealCount :show-text=false :width=90 :stroke-width=12 color=#00FF00></el-progress>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div style="">
        <el-col :span="15">
          <div style="height: 275px">
            <div class="titleMin"><b class="font14">维保任务完成率</b></div>
            <hr class="hr-100width">
            <div id="chartTaskDone" class="chartMax"></div>
          </div>
          <div style="height: 285px;padding-top: 20px">
            <div class="titleMin"><b class="font14">隐患任务处置</b></div>
            <hr class="hr-100width">
            <div id="chartTaskDeal" class="chartMax"></div>
          </div>
        </el-col>
        <el-col :span="9" style="padding-left: 20px;padding-right: 0;">
          <div style="height: 350px;background-color: #ffffff;">
            <el-col :span="17">
            <div class="titleMin"><b class="font14">任务提醒</b></div>
          </el-col>
            <el-col :span="7">
              <div class="titleMin">
                <span
                  @click="allPromotion()" :class=allHandle><u>一键促办</u>
                </span>
              </div>
            </el-col>
            <hr class="hr-100width">
            <div style="overflow-y: auto;height: 290px;">
              <div v-for="(item)  in promotionList"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                <el-row style="padding-top: 5px">
                  <el-col :span="19">
                    <div class="col-left-min">{{ item.eventName }}</div>
                    <div class="col-left-min">{{ item.dateTime | dateFilter }}</div>
                  </el-col>
                  <el-col :span="5">
                    <div class="col-right-min">{{ item.name }}</div>
                    <span
                      @click="promotion(item)" :class=oneHandle><u>{{ item.dealStatus }}</u>
                    </span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div style="height: 20px"></div>
          <div style="height: 200px; background-color: #ffffff;">
            <div class="titleMin"><b class="font14">待派单隐患</b></div>
            <hr class="hr-100width">
            <div style="overflow-y: auto;height: 140px;">
              <div v-for="(item) in taskWarnList"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                <el-row style="padding-top: 5px">
                  <el-col :span="19">
                    <div class="col-left-min">{{ item.hiddangerName }}</div>
                    <el-row>
                      <el-col :span="16" class="col-left-min">{{ item.place }}</el-col>
                      <el-col :span="8" class="col-left-min">
                        {{ item.reportTime | dateFilter}}
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="5">
                    <div class="col-right-min">{{ item.level }}</div>
                    <span
                      @click="oneDeal" :class=oneHandle><u>派单</u>
                  </span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
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
      taskGrade: 0,
      preTaskGrade: 0,
      taskCount: 0,
      doneNumber: 0,
      dealCount: 0,
      optionTaskNum: {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          left: 'center',
          text: '',
        },
        grid:{
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
            name: '维保任务数量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: '#9370DB'
            },
            areaStyle: {
              color: '#8A2BE2'
            },
            data: []
          }
        ]
      },
      optionNumber: {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          left: 'center',
          text: '',
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
            name: '维保数量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: '#00BFFF'
            },
            areaStyle: {
              color: '#87CEEB'
            },
            data: []
          }
        ]
      },
      optionTaskDone: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['完成率'],
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
              color:'#DCDCDC',
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#000000',
            }
          }
        },
        yAxis: {
          axisLine: {show: false},
          axisTick: {show: false},
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#DCDCDC'
            },
            show: true
          },
          type: 'value',
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value}%'
          },
        },
        series: [
          {
            name: '完成率',
            symbol: 'none',
            color: '#00CED1',
            type: 'line',
            stack: '',
            data:[]
          }
        ]
      },
      optionTaskDeal: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['完成率','及时率'],
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
              color:'#DCDCDC',
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#000000',
            }
          }
        },
        yAxis: {
          axisLine: {show: false},
          axisTick: {show: false},
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#DCDCDC'
            },
            show:true
          },
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value}%'
          },
          type: 'value',
        },
        series: [
          {
            name:'完成率',
            symbol:'none',
            color: '#1E90FF',
            type: 'line',
            stack: '',
            data: []
          },
          {
            name:'及时率',
            symbol:'none',
            color: '#00CED1',
            type: 'line',
            stack: '',
            data: []
          }
        ]
      },
      allHandle: 'spanPre',
      oneHandle: 'spanPre',
      promotionList: [],
      taskWarnList: []
    }
  },

  created() {
    this.getInitData()
  },
  methods: {
    getCookie(name){
      var strcookie = document.cookie;//获取cookie字符串
      var arrcookie = strcookie.split("; ");//分割
      //遍历匹配
      for ( var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] === name){
          return arr[1];
        }
      }
      return "";
    },
    getInitData() {

      let deptId = this.getCookie("dept_id");

      // 查询新闻列表
      this.instance
        .get('/maintentanceList', {
          params: {
            deptId: deptId
          }
        })
        .then(res => {
          res.data.data.dealList.forEach(item => {
            this.optionNumber.xAxis.data.push(item.dayTime);
            this.optionNumber.series[0].data.push(item.totalNum);
          });
          res.data.data.totalList.forEach(item => {
            this.optionTaskNum.xAxis.data.push(item.dayTime);
            this.optionTaskNum.series[0].data.push(item.totalNum);
          });

          this.$chart.myChart('chartTaskNum', this.optionTaskNum);
          this.$chart.myChart('chartNumber', this.optionNumber);

          // this.percentage = res.data.data.完成率;

          // Just to simulate the time of the request
          setTimeout(() => {
          }, 1.5 * 100)
        });

      // 查询新闻列表
      this.instance
        .get('/maintenanceHome', {
          params: {
            deptId: deptId
          }
        })
        .then(res => {
          let months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月', '9月', '10月', '11月', '12月'];

          // "name": "maintenanceRate"   --维保任务完成率
          // "name": "taskRate"    --一隐患任务处置 及时率
          // "name": "taskDealRate"   --一隐患任务处置 完成率
          // taskWarnList	--待派单隐患
          this.optionTaskDone.xAxis.data = months;
          this.optionTaskDeal.xAxis.data = months;
          months.forEach(item => {
            let mon = item;
            res.data.data.chartList.forEach(item => {
              if(item.name === 'maintenanceRate') {
                  item.data.forEach(item => {
                    if(mon === item.type){
                      this.optionTaskDone.series[0].data.push(item.data);
                    }
                  })
              }else if(item.name === 'taskDealRate') {
                item.data.forEach(item => {
                  if(mon === item.type){
                    this.optionTaskDeal.series[0].data.push(item.data);
                  }
                })
              }else if(item.name === 'taskRate') {
                item.data.forEach(item => {
                  if(mon === item.type){
                    this.optionTaskDeal.series[1].data.push(item.data);
                  }
                })
              }
            })
          });

          this.$chart.myChart('chartTaskDone', this.optionTaskDone);
          this.$chart.myChart('chartTaskDeal', this.optionTaskDeal);

          this.taskGrade = res.data.data.dayMonth;
          this.preTaskGrade = res.data.data.lastMonth;
          this.taskCount = res.data.data.totalNum;
          this.doneNumber = res.data.data.mainDealNum;
          this.dealCount = res.data.data.taskDealNum;
          this.taskWarnList = res.data.data.taskWarnList;

          // this.percentage = res.data.data.完成率;

          // Just to simulate the time of the request
          setTimeout(() => {
          }, 1.5 * 100)
        });

      // 超时任务信息
      this.instance
        .get('/inspectionHome/overTimeTaskList', {
          params: {
            deptId: deptId
          }
        })
        // Just to simulate the time of the request
        .then(res => {
          this.promotionList = res.data.data.data;
          setTimeout(() => {
          }, 1.5 * 100)
        });


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
          this.$message.success(res.data.data.data);
          // Just to simulate the time of the request
          setTimeout(() => {
          }, 1.5 * 100)
        })
    },

    async allPromotion () {

      let deptId = this.getCookie("dept_id");

      // 一键催办接口
      this.instance
        .get('/noticePersonList', {
          params: {
            deptId : deptId,
            type: 'dept'
          }
        })
        .then(res => {
          this.$message.success(res.data.data.data);
          // Just to simulate the time of the request
          setTimeout(() => {
          }, 1.5 * 100)
        })
    },

    oneDeal () {
      this.$router.push({path: '/d-Analysis'})
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
    padding-top:0;
    background-color: #ffffff
  }
  .chartMin {
    height: 118px;
    padding-top:0;
    background-color: #ffffff
  }
  .hr-90width {
    background-color: #F5F5F5;
    margin-top: 0;
    width: 90%;
    height: 1px;
    border: none;
  }
  .hr-100width {
    background-color: #F5F5F5;
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
    color: #40E0D0;
  }
  .col-left-min {
    /*padding-top: 5px;*/
    padding-left: 20px;
    font-size: 14px;
    color: #000000;
    background-color: #fff;
  }
  .col-right-min {
    /*padding-top: 5px;*/
    /*padding-left: 20px;*/
    font-size: 14px;
    color: #b5b5b5;
    background-color: #fff;
  }
  .el-main {
    display: flex;
    flex-wrap: wrap;
    margin-top:-30px;
    // justify-content: space-between;
    .echarts-rom {
      background: #fff;
      padding: 20px;
      display: flex;
      margin-bottom: 20px;
      text-align: center;
      position: relative;
      // margin-left: 10px;
      .title{
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