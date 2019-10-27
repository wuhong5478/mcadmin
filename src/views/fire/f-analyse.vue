<template>
  <div>
    <el-row :gutter="20" style="height: 200px">
      <el-col :span="6">
        <div class="titleMin">本月报警数量</div>
        <div class="numberMid"><b class="font36">{{ totalCount }}</b>次</div>
        <div class="descMin">今日报警数量 {{ dayCount }}</div>
      </el-col>
      <el-col :span="6">
        <div class="titleMin">确认火警数量</div>
        <div class="numberMid"><b class="font36">{{ reportTotal }}</b>次</div>
        <div class="descMin" style="padding-top: 0px; height:75px" id="chartReport"></div>
      </el-col>
      <el-col :span="6" >
        <div style="height: 185px; background-color: #ffffff;">
          <div class="titleMin">60S触达率</div>
          <el-col :span="10"><div class="numberMid"><b class="font36">{{ touchPercentage }}%</b></div></el-col>
          <el-col :span="14">
            <div style="padding-left: 40px">
              <el-progress type="circle" :percentage=touchPercentage :show-text=false :width=90 :stroke-width=12 color=#32CD32></el-progress>
            </div>
          </el-col>
        </div>
      </el-col>
      <el-col :span="6">
        <div style="height: 185px; background-color: #ffffff;">
          <div class="titleMin">3分钟到场率</div>
          <el-col :span="10"><div class="numberMid"><b class="font36">{{ presentPercentage }}%</b></div></el-col>
          <el-col :span="14">
            <div style="padding-left: 40px">
              <el-progress type="circle" :percentage=presentPercentage :show-text=false :width=90 :stroke-width=12 color=#1E90FF></el-progress>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div>
        <el-col :span="15">
          <div class="titleMin"><b class="font14">火警建筑统计</b></div>
        </el-col>
        <el-col :span="1">
          <div class="titleMin"></div>
        </el-col>
        <el-col :span="3">
          <div class="titleMin"><b class="font14">建筑名称</b></div>
        </el-col>
        <el-col :span="2">
          <div class="titleMin"><b class="font14">火警数量</b></div>
        </el-col>
        <el-col :span="3">
          <div class="titleMin"><b class="font14">触达率</b></div>
        </el-col>
        <hr class="hr-100width">
        <el-col :span="15">
<!--          <div class="titleMin">隐患总数 <b class="font14">{{ buildTotal }}</b></div>-->
          <div id="chartBuilding" class="chartMax" style="height: 275px"></div>
        </el-col>
        <el-col :span="9" style="height: 275px; overflow-y:auto;background-color: #ffffff">
          <div v-for="(item,index) in buildTotalData"
               :key="item.value"
               :label="item.label"
               :value="item.value">
            <el-row style="height: 30px">
              <el-col :span="4" style="padding-left: 20px">
                {{ index + 1 }}
              </el-col>
              <el-col :span="10">
                {{ item.type }}
              </el-col>
              <el-col :span="5">
                {{ item.count }}
              </el-col>
              <el-col :span="5">
                <b style="color: #8EEF86">{{ item.percentage }}%</b>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </div>
    </el-row>
    <el-row :gutter="20" style="height: 300px;padding-top: 20px">
      <el-col :span="12">
        <div class="titleMin"><b class="font14">月报警数量趋势</b></div>
        <hr class="hr-100width">
        <div id="chartReportTrend" class="chartMid" style="height: 220px"></div>
      </el-col>
      <el-col :span="12">
        <div class="titleMin"><b class="font14">火警来源统计</b></div>
        <hr class="hr-100width">
        <div id="chartFireSource" class="chartMid" style="height: 220px"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="height: 245px;padding-top: 20px">
      <el-col :span="10" style="padding-left: 0">
        <div class="titleMin"><b class="font14">报警设备数量统计</b>
        </div>
        <div id="chartEquipment" class="chartMid"></div>
      </el-col>
      <el-col :span="7" style="padding-left: 0;padding-right: 0">
        <div class="titleMin"><b class="font14">到场分段统计</b>
        </div>
        <div id="chartPresent" class="chartMid"></div>
      </el-col>
      <el-col :span="7" style="padding-left: 0">
        <div class="titleMin"><b class="font14">触达分段统计</b>
        </div>
        <div id="chartTouch" class="chartMid"></div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        optionReport: {
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
              name:'',
              type:'line',
              smooth:true,
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
        optionBuilding : {
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
          },
          series: [{
            data: [],
            type: 'bar',
            barWidth: '30%',
            itemStyle: {
              normal: {
                color : '#FA8072'
              }
            }
          }]
        },
        optionDangerGrade: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:[],
            show:false
          },
          grid:{
            x:60,
            x2:20,
            y:10,
            height:150
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine:{
              lineStyle:{
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
            axisLine: {show:false},
            axisTick: {show:false},
            splitLine:{
              lineStyle:{
                type: 'dashed',
                color: '#DCDCDC'
              },
              show:true
            },
            type: 'value'
          },
          series: [
            {
              name:'一般隐患',
              symbol:'none',
              color:  '#4169E1',
              type:'line',
              stack: '',
              data:[]
            },
            {
              name:'重大隐患',
              symbol:'none',
              color:  '#F08080',
              type:'line',
              stack: '',
              data:[]
            }
          ]
        },
        optionDangerTotal: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:[''],
            show:false
          },
          grid:{
            x:60,
            x2:20,
            y:10,
            height:80
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine:{
              lineStyle:{
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
            axisLine: {show:false},
            axisTick: {show:false},
            splitLine:{
              lineStyle:{
                type: 'dashed',
                color: '#DCDCDC'
              },
              show:true
            },
            type: 'value'
          },
          series: [
            {
              type:'line',
              symbol:'none',
              smooth: true,
              data:[]
            }
          ]
        },
        optionDangerDeal: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:[''],
            show:false
          },
          grid:{
            x:60,
            x2:20,
            y:10,
            height:80
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine:{
              lineStyle:{
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
            axisLine: {show:false},
            axisTick: {show:false},
            splitLine:{
              lineStyle:{
                type: 'dashed',
                color: '#DCDCDC'
              },
              show:true
            },
            type: 'value'
          },
          series: [
            {
              type:'line',
              symbol:'none',
              color:  '#8EEF86',
              data:[]
            }
          ]
        },
        optionReportTrend: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [],
            show: false,
            top: 10,
            left:20,
            icon:'rect'
          },
          grid:{
            x: 60,
            x2: 20,
            y: 40,
            height: 150
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine:{
              lineStyle:{
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
            type: 'value'
          },
          series: [
            {
              name:'',
              symbol:'none',
              color:  '#FF00FF',
              type:'line',
              stack: '',
              data:[]
            }
          ]
        },
        optionFireSource: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [],
            show: true,
            top: 0,
            left: 20,
            icon: 'rect'
          },
          grid:{
            x: 60,
            x2: 20,
            y: 50,
            height: 140
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine: {
              lineStyle: {
                color: '#DCDCDC',
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
            type: 'value'
          },
          series: [
            {name: '', symbol: 'none', color: '#DC143C', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '#00FF00', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '#DEB887', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '#00BFFF', type: 'line',  stack: '', smooth: true, data: [] }
          ]
        },
        optionEquipment: {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            y2: 10,
            data: [],
            icon: "circle",
            itemWidth: 10,  // 设置宽度
            itemHeight: 10, // 设置高度
            itemGap: 5 // 设置间距
          },
          series: [
            {
              name:'报警设备',
              type:'pie',
              radius: ['50%', '90%'],
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
                {value: 0, name: '', itemStyle:{ color:'#00BFFF'}},
                {value: 0, name: '', itemStyle:{ color:'#00FA9A'}},
                {value: 0, name: '', itemStyle:{ color:'#BA55D3'}},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''},
                {value: 0, name: ''}
              ]
            }
          ]
        },
        optionPresent: {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            y2: 10,
            data: [],
            icon: "circle",
            itemWidth: 10,  // 设置宽度
            itemHeight: 10, // 设置高度
            itemGap: 5 // 设置间距
          },
          series: [
            {
              name: '到场分段',
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
                {value: 0, name: '', itemStyle:{ color:'#00BFFF'}},
                {value: 0, name: '', itemStyle:{ color:'#00FA9A'}},
                {value: 0, name: '', itemStyle:{ color:'#BA55D3'}}
              ]
            }
          ]
        },
        optionTouch: {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            y2: 10,
            data: [],
            icon: "circle",
            itemWidth: 10,  // 设置宽度
            itemHeight: 10, // 设置高度
            itemGap: 5 // 设置间距
          },
          series: [
            {
              name:'触达分段',
              type:'pie',
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
                {value: 0, name: '', itemStyle:{ color:'#00BFFF'}},
                {value: 0, name: '', itemStyle:{ color:'#00FA9A'}},
                {value: 0, name: '', itemStyle:{ color:'#BA55D3'}}
              ]
            }
          ]
        },
        dayCount: 0,
        totalCount: 0,
        reportXData: [],
        reportYData: [],
        reportTotal: 0,
        generalTimeOut: 0,
        seriousTimeOut: 0,
        percentage: 0,
        touchPercentage: 0,
        presentPercentage: 0,
        buildTotal: 0,
        buildTotalData: {}

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

      dateFilterYYYYMM(value) {
        return moment(value).format('YYYY-MM')
      },

      getInitData() {

        let deptId = this.getCookie("dept_id");
        let month = this.dateFilterYYYYMM(new Date);

        // 获取火警数量
        this.instance
          .get('/fireAnalysis/getFireCount', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId,
              month: month
            }
          })
          .then(res => {
            this.dayCount = res.data.data.dayCount;
            this.totalCount = res.data.data.totalCount;
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 确认火警数量
        this.instance
          .get('/fireAnalysis/getFireCountByStatus', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId,
              month: month
            }
          })
          .then(res => {
            this.reportTotal = res.data.data.total;
            this.optionReport.xAxis.data = res.data.data.category;
            this.optionReport.series[0].data = res.data.data.data;
            this.$chart.myChart('chartReport', this.optionReport);
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 60S触达率
        this.instance
          .get('/fireAnalysis/getAnalyByReadPercentage', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId,
              month: month
            }
          })
          .then(res => {
            this.touchPercentage = res.data.data.percentage;
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 3分钟到场率
        this.instance
          .get('/fireAnalysis/getAnalyByDoPercentage', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId,
              month: month
            }
          })
          .then(res => {
            this.presentPercentage = res.data.data.percentage;
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 火警建筑统计
        this.instance
          .get('/fireAnalysis/getFireAnalyByAcrh', {
            params: {
              archid: '',
              deptid: deptId,
              month: month
            }
          })
          .then(res => {
            this.buildTotalData = res.data.data;
            res.data.data.forEach((item, index) => {
              this.optionBuilding.xAxis.data.push(index+1);
              this.optionBuilding.series[0].data.push(item.count);
              this.buildTotal += item.count;
            });
            this.$chart.myChart('chartBuilding', this.optionBuilding);
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 火警总数变化趋势 月报警数量趋势
        this.instance
          .get('/fireAnalysis/getAnalyByTotalFire', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId
            }
          })
          .then(res => {
            this.optionReportTrend.xAxis.data = res.data.data.category;
            this.optionReportTrend.series[0].data = res.data.data.data;
            this.$chart.myChart('chartReportTrend', this.optionReportTrend);
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 火警来源分析
        this.instance
          .get('/fireAnalysis/getAnalyByFireSource', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId
            }
          })
          .then(res => {
            this.optionFireSource.xAxis.data = res.data.data.category;
              res.data.data.type.forEach((item,index) => {
                this.optionFireSource.legend.data.push(item.name);
                this.optionFireSource.series[index].data = item.data;
                this.optionFireSource.series[index].name = item.name;
            });

            this.$chart.myChart('chartFireSource', this.optionFireSource);

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });


        // 报警设备数据统计
        this.instance
          .get('/fireAnalysis/getFireAnalyByDevType', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId,
              month: month
            }
          })
          .then(res => {
            res.data.data.forEach((item,index) => {
              this.optionEquipment.legend.data.push(item.type);
              this.optionEquipment.series[0].data[index].name = item.type;
              this.optionEquipment.series[0].data[index].value = item.count
            });
            this.$chart.myChart('chartEquipment', this.optionEquipment);

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 到场分段统计
        this.instance
          .get('/fireAnalysis/getAnalyByDoLevel', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId,
              month: month
            }
          })
          .then(res => {
            res.data.data.forEach((item,index) => {
              this.optionPresent.legend.data.push(item.type);
              this.optionPresent.series[0].data[index].name = item.type;
              this.optionPresent.series[0].data[index].value = item.count
            });
            this.$chart.myChart('chartPresent', this.optionPresent);

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 触达分段统计
        this.instance
          .get('/fireAnalysis/getAnalyByReadLevel', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId,
              month: month
            }
          })
          .then(res => {
            res.data.data.forEach((item,index) => {
              this.optionTouch.legend.data.push(item.type)
              this.optionTouch.series[0].data[index].name = item.type
              this.optionTouch.series[0].data[index].value = item.count
            });
            this.$chart.myChart('chartTouch', this.optionTouch);

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
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
