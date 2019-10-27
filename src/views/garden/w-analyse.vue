<template>
  <div>
    <el-row :gutter="20" style="height: 245px">
      <el-col :span="6">
        <div class="titleDiv">维保任务
        </div>
        <div class="numberDiv"><b class="font36">{{ taskTotal }}</b>个</div>
        <div id="chartTask" class="chartMin"></div>
        <div class="descDiv"><hr class="hr-90width"><b class="font14"></b></div>
<!--        <div class="descDiv"><hr class="hr-90width">本月发布 <b class="font14">{{ allCount }}</b></div>-->
      </el-col>
      <el-col :span="6">
        <div class="titleDiv">维保设施
        </div>
        <div class="numberDiv"><b class="font36">{{ equipmentCount }}</b>个</div>
        <div id="chartEquipment" class="chartMin"></div>
        <div class="descDiv"><hr class="hr-90width">最多类型 <b class="font14">{{ equipmentName }}</b></div>
      </el-col>
      <el-col :span="6">
        <div class="titleDiv">完成率
        </div>
        <div class="numberDiv"><b class="font36">{{ undoPercent }}</b>%</div>
        <div class="chartMin">
          <el-progress :percentage=undoPercent color='#32CD32' :show-text="false" style="padding-top: 20%;width: 90%"></el-progress>
        </div>
        <el-col :span="12" style="padding: 0">
          <div class="descDiv"><hr class="hr-90width">未完成 <b class="font14">{{ allCount - doneCount }}</b></div>
        </el-col>
        <el-col :span="12" style="padding: 0">
          <div class="descDiv"><hr class="hr-90width">已发布 <b class="font14">{{ allCount }}</b></div>
        </el-col>
      </el-col>
      <el-col :span="6" style="padding-right: 0">
        <div class="titleDiv">超时数量
        </div>
        <div class="numberDiv"><b class="font36">{{ timeoutCount }}</b>个</div>
        <div class="chartMin" id="chartTimeout">
        </div>
        <div class="descDiv"><hr class="hr-90width">总超时任务数量 <b class="font14">{{ timeoutTotal }}</b></div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="padding-bottom: 20px;">
      <el-col :span="15">
        <div>
          <el-col :span="20" style="padding: 0">
            <div class="titleDiv"><b class="font14">维保任务趋势</b></div>
          </el-col>
          <el-col :span="2" style="padding: 0">
            <div class="titleDiv"><b class="font14">全年</b></div>
          </el-col>
          <el-col :span="2" style="padding: 0">
            <div class="titleDiv"></div>
          </el-col>
          <hr class="hr-100width">
          <div id="chartTrend" class="chartMax" style="height: 250px"></div>
        </div>
      </el-col>
      <el-col :span="9">
        <el-row style="height: 90px;background-color: #ffffff">
          <el-col :span="12">
            <div class="titleDiv" style="height: 20px">维保单位数量
            </div>
            <div class="numberDiv"><b class="font36">{{ unitCount }}</b>个</div>
          </el-col>
          <el-col :span="12">
            <div class="titleDiv" style="height: 20px">负责建筑数量
            </div>
            <div class="numberDiv"><b class="font36">{{ buildCount }}</b>栋</div>
          </el-col>
        </el-row>
        <hr class="hr-100width">
        <el-row style="height: 90px;background-color: #ffffff">
          <el-col :span="12">
            <div class="titleDiv" style="height: 20px">及时率
            </div>
            <div class="numberDiv"><b class="font36">{{ timely }}</b>%</div>
          </el-col>
          <el-col :span="12">
            <div id="chartEquipmentCount" class="chartMid" style="height: 90px;padding-bottom: 0"></div>
          </el-col>
        </el-row>
        <hr class="hr-100width">
        <el-row style="height: 115px;background-color: #ffffff">
          <el-col :span="12">
            <div class="titleDiv">解决隐患数量
            </div>
            <div class="numberDiv"><b class="font36">{{ doneCount }}</b>个</div>
          </el-col>
          <el-col :span="12">
            <div id="chartUndo" class="chartMin" style="height: 75px"></div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        NumPercentage: '',
        taskTotal: 0,
        monTaskTatol: 0,
        equipmentCount: 0,
        equipmentName: '',
        undoPercent: 0,
        allCount: 0,
        undoCount: 0,
        doneCount: 0,
        timeoutCount: 0,
        timeoutTotal: 0,
        unitCount: 0,
        buildCount: 0,
        timely: 0,
        optionTask: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['维保任务'],
            show: false,
            top: 10,
            left: 20,
            icon:'rect'
          },
          grid:{
            x: 0,
            x2: 10,
            y: 30,
            height: 60
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            show: false
          },
          yAxis: {
            type: 'value',
            show: false
          },
          series: [
            {
              name: '维保任务',
              symbol: 'none',
              smooth: true,
              color: '#1E90FF',
              type: 'line',
              stack: '',
              data: []
            }
          ]
        },
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
            show : false
          },
          yAxis: {
            type: 'value',
            show : false
          },
          series: [{
            data: [],
            type: 'bar',
            itemStyle: {
              normal: {
                color : '#4169E1'
              }
            }
          }]
        },
        optionTimeout: {
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
        optionTrend: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:[],
            show: true,
            top: 0,
            left: 20,
            icon: 'rect'
          },
          grid: {
            x: 50,
            x2: 20,
            y: 40,
            y2: 10,
            height: 160
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
            splitLine:{
              lineStyle:{
                type: 'dashed',
                color: '#DCDCDC'
              },
              show:true
            },
            type: 'value',
          },
          series: [
            {
              name:'',
              symbol:'none',
              color:  '#1E90FF',
              type:'line',
              stack: '',
              data:[],
              markLine: {
                symbol: 'none',
                silent: true,
                data: [[
                  {coord: ['',0]},
                  {coord: ['',0]}
                ]],
                label:{
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
              name:'',
              symbol:'none',
              color:  '#00CED1',
              type:'line',
              stack: '',
              data:[],
              markLine: {
                symbol: 'none',
                silent: true,
                data: [[
                  {coord: ['',0]},
                  {coord: ['',0]}
                ]],
                label:{
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
          ]
        },
        optionEquipmentCount: {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            y2: 0,
            data:['未完成任务','已完成任务'],
            icon: "circle",
            itemWidth: 5,  // 设置宽度
            itemHeight: 5, // 设置高度
            itemGap: 5 // 设置间距
          },
          series: [
            {
              name:'任务数量',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value: 0, name: '未完成任务', itemStyle:{ color:'#00BFFF'}},
                {value: 0, name: '已完成任务', itemStyle:{ color:'#00FA9A'}}
              ]
            }
          ]
        },
        optionUndo: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [],
            show: false,
            top: 10,
            left: 20,
            icon:'rect'
          },
          grid:{
            x: 0,
            x2: 10,
            y: 30,
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
            show: false
          },
          series: [
            {
              name: '数量',
              symbol: 'none',
              smooth: true,
              color: '#1E90FF',
              type: 'line',
              stack: '',
              data: []
            }
          ]
        }
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

        // 本月维保任务数量
        this.instance
          .get('/maintenanceRoutingAnalysis/missionThisMonth', {
            params: {
              deptId: deptId
            }
          })
          .then(res => {
            this.optionTask.xAxis.data = res.data.data.months;
            this.optionTask.series[0].data = res.data.data.data;
            let total=0;
            res.data.data.data.forEach(item => {
              total += Number(item);
            });
            this.taskTotal = total;
            this.$chart.myChart('chartTask', this.optionTask);

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 本月维保对象数量
        this.instance
          .get('/maintenanceRoutingAnalysis/quantity', {
            params: {
              deptId: deptId
            }
          })
          .then(res => {
            // this.optionEquipment.xAxis.data = res.data.data.name;
            this.optionEquipment.series[0].data = res.data.data.sum;

            let number = Math.max.apply(Math,res.data.data.sum);
            let Num = res.data.data.sum.indexOf(number);
            this.equipmentName = res.data.data.name[Num];

            let total=0;
            res.data.data.sum.forEach(item => {
              total += Number(item);
            });


            this.equipmentCount = total;
            this.$chart.myChart('chartEquipment', this.optionEquipment);
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 本月维保任务超时数量
        this.instance
          .get('/maintenanceRoutingAnalysis/OverTime', {
            params: {
              deptId: deptId
            }
          })
          .then(res => {
            this.optionTimeout.xAxis.data = res.data.data.months;
            this.optionTimeout.series[0].data = res.data.data.data;
            let total=0;
            res.data.data.data.forEach(item => {
              total += Number(item);
            });
            this.timeoutCount = total;
            this.$chart.myChart('chartTimeout', this.optionTimeout);
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 全年趋势
        this.instance
          .get('/maintenanceRoutingAnalysis/maintenanceYearTaskSum', {
            params: {
              deptId: deptId,
              year: new Date().getFullYear()
            }
          })
          .then(res => {
            this.optionTrend.xAxis.data = res.data.data.month;
            this.optionTrend.series[0].data = res.data.data.data1.data;
            this.optionTrend.series[0].name = res.data.data.data1.name;
            this.optionTrend.series[1].data = res.data.data.data2.data;
            this.optionTrend.series[1].name = res.data.data.data2.name;
            this.optionTrend.legend.data.push(res.data.data.data1.name);
            this.optionTrend.legend.data.push(res.data.data.data2.name);

            let forecast = (new Date).getMonth() + 1 + '月';
            let coordTop;
            coordTop = Math.max.apply(null, res.data.data.data1.data);
            let coord = [];
            coord.push({'coord': [forecast,0]});
            coord.push({'coord': [forecast,coordTop]});
            this.optionTrend.series[0].markLine.data[0] = coord;

            let coordTop1;
            coordTop1 = Math.max.apply(null, res.data.data.data2.data);
            let coord1 = [];
            coord.push({'coord': [forecast,0]});
            coord.push({'coord': [forecast,coordTop1]});

            this.optionTrend.series[1].markLine.data[0] = coord1;

            this.$chart.myChart('chartTrend', this.optionTrend);
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 单位数量
        this.instance
          .get('/maintenanceRoutingAnalysis/parkSum', {
            params: {
              deptId: deptId
            }
          })
          .then(res => {
            this.unitCount = res.data;
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 负责建筑数量
        this.instance
          .get('/maintenanceRoutingAnalysis/buildingSum', {
            params: {
              deptId: deptId
            }
          })
          .then(res => {
            this.buildCount = res.data.data;
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 本月维保任务完成率/及时率
        this.instance
          .get('/maintenanceRoutingAnalysis/completionRate', {
            params: {
              deptId: deptId
            }
          })
          .then(res => {
            this.undoPercent = res.data.data.data3.data;
            this.allCount = res.data.data.data1.data;
            this.doneCount = res.data.data.data2.data;
            this.timely = res.data.data.data4.data;

            this.optionEquipmentCount.series[0].data[0].value = this.allCount - this.doneCount;
            this.optionEquipmentCount.series[0].data[1].value = this.doneCount;

            this.$chart.myChart('chartEquipmentCount', this.optionEquipmentCount);
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 解决隐患数量（按天统计）
        this.instance
          .get('/analysis/getAnalySolveWarnCountByDay', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId
            }
          })
          .then(res => {
            this.doneCount = res.data.data.totalcount;
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });


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
            this.optionUndo.xAxis.data = res.data.data.category;
            this.optionUndo.series[0].data = res.data.data.data;
            this.$chart.myChart('chartUndo', this.optionUndo);
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

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
  .detail {
    height: 100px;
    background-color: #fff;
    padding-left: 20px;
    padding-right: 20px;
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
  .font36 {
    font-size: 32px;
    color: black;
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
