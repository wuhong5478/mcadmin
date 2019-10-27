<template>
  <div>
    <el-row :gutter="20" style="height: 200px">
      <el-col :span="6">
        <div class="titleMin">本月隐患数量</div>
        <div class="numberMid"><b class="font36">{{ totalCount }}</b>次</div>
        <div class="descMin">今日隐患数量 {{ dayCount }}</div>
      </el-col>
      <el-col :span="6">
        <div class="titleMin">人工上报隐患</div>
        <div class="numberMid"><b class="font36">{{ reportTotal }}</b>个</div>
        <div class="descMin" style="padding-top: 0; height:75px" id="chartReport"></div>
      </el-col>
      <el-col :span="6">
        <div class="titleMin">超时隐患</div>
        <div class="numberMid"><b class="font36">{{ generalTimeOut+seriousTimeOut }}</b>次</div>
        <div class="descMin">
          <el-col :span="12">一般隐患 {{ generalTimeOut }}</el-col>
          <el-col :span="12">重大隐患 {{ seriousTimeOut }}</el-col>
        </div>
      </el-col>
      <el-col :span="6">
        <div style="height: 185px; background-color: #ffffff">
          <div class="titleMin">隐患处置率</div>
          <el-col :span="10"><div class="numberMid" style="padding-left: 0"><b class="font36">{{ percentage }}</b>%</div></el-col>
          <el-col :span="14">
            <div style="padding-left: 40px">
              <el-progress type="circle" :percentage=percentage :show-text=false :width=90 :stroke-width=12 color=#00CED1></el-progress>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div>
        <el-col :span="15">
          <div class="titleMin"><b class="font14">园区统计分析</b></div>
        </el-col>
        <el-col :span="1">
          <div class="titleMin"></div>
        </el-col>
        <el-col :span="3">
          <div class="titleMin"><b class="font14">建筑名称</b></div>
        </el-col>
        <el-col :span="2">
          <div class="titleMin"><b class="font14">隐患数量</b></div>
        </el-col>
        <el-col :span="3">
          <div class="titleMin"><b class="font14">处置率</b></div>
        </el-col>
        <hr class="hr-100width">
        <el-col :span="15">
          <div class="titleMin">隐患总数 <b class="font14">{{ buildTotal }}</b></div>
          <div id="chartBuilding" class="chartMax"></div>
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
    <el-row :gutter="20" style="height: 400px;padding-top: 20px">
      <el-col :span="12">
        <el-row>
          <div class="titleMin"><b class="font14">隐患等级分析</b></div>
          <hr class="hr-100width">
          <el-col :span="12">
            <div class="titleMin" style="padding-left: 100px">当月一般隐患</div>
            <div class="numberMid" style="padding-left: 100px"><b class="font24">{{ dangerGradeMin }}</b>次</div>
          </el-col>
<!--          <el-col :span="8" style="border-left:1px solid #F5F5F5;border-right:1px solid #F5F5F5;">-->
<!--            <div class="titleMin">当月较大隐患</div>-->
<!--            <div class="numberMid"><b class="font24">{{ dayCount }}</b>次</div>-->
<!--          </el-col>-->
          <td></td>
          <el-col :span="12" style="border-left:1px solid #F5F5F5;">
            <div class="titleMin" style="padding-left: 100px">当月重大隐患</div>
            <div class="numberMid" style="padding-left: 100px"><b class="font24">{{ dangerGradeMax }}</b>次</div>
          </el-col>
        </el-row>
        <div id="chartDangerGrade" class="chartMid"></div>
      </el-col>
      <el-col :span="12">
        <div>
          <div class="titleMin"><b class="font14">隐患总数变化趋势</b></div>
          <hr class="hr-100width">
          <div id="chartDangerTotal" class="chartMin"></div>
        </div>
        <div style="padding-top: 18px">
          <div class="titleMin"><b class="font14">隐患处置事件</b></div>
          <hr class="hr-100width">
          <div id="chartDangerDeal" class="chartMin"></div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="height: 300px;">
      <el-col :span="12">
        <div class="titleMin"><b class="font14">隐患来源分析</b></div>
        <hr class="hr-100width">
        <div id="chartDangerSource" class="chartMid" style="height: 220px"></div>
      </el-col>
      <el-col :span="12">
        <div class="titleMin"><b class="font14">园区行业隐患统计</b></div>
        <hr class="hr-100width">
        <div id="chartDangerTrade" class="chartMid" style="height: 220px"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="height: 300px;">
      <el-col :span="12">
        <div class="titleMin"><b class="font14">解决隐患时长统计</b></div>
        <hr class="hr-100width">
        <div id="chartDealTime" class="chartMid" style="height: 220px"></div>
      </el-col>
      <el-col :span="12">
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
          series: [{
            data: [],
            type: 'bar',
            barWidth: '40%',
            itemStyle: {
              normal: {
                color: '#1E90FF'
              }
            }
          }]
        },
        optionBuilding : {
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
                color: '#BA55D3'
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
            axisLine: {show:false},
            axisTick: {show:false},
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
              name:'一般隐患',
              symbol: 'none',
              color: '#4169E1',
              type: 'line',
              stack: '',
              data: []
            },
            {
              name: '重大隐患',
              symbol: 'none',
              color: '#F08080',
              type: 'line',
              stack: '',
              data: []
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
            data: [''],
            show: false
          },
          grid:{
            x: 60,
            x2: 20,
            y: 15,
            height: 75
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
              show: true
            },
            type: 'value'
          },
          series: [
            {
              type: 'line',
              symbol: 'none',
              smooth: true,
              data: [],
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
            data: [''],
            show: false
          },
          grid: {
            x: 60,
            x2: 20,
            y: 10,
            height: 80
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
            axisLine: {show:false},
            axisTick: {show:false},
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
              type: 'line',
              symbol: 'none',
              color: '#8EEF86',
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
            y: 40,
            height: 150
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
            axisLine: {show:false},
            axisTick: {show:false},
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
              type:'line',
              stack: '',
              data: []
            }
          ]
        },
        optionDangerTrade: {
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
            icon:'rect'
          },
          grid: {
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
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] }
          ]
        },
        optionDealTime : {
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
                color: '#9370DB'
              }
            }
          }]
        },
        dayCount: 0,
        totalCount: 0,
        reportXData: [],
        reportYData: [],
        reportTotal: 0,
        generalTimeOut: 0,
        seriousTimeOut: 0,
        percentage: 0,
        buildXData: [],
        buildYData: [],
        buildTotal: 0,
        buildTotalData: {},
        dangerGradeMin: 0,
        dangerGradeMid: 0,
        dangerGradeMax: 0
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

        //获取隐患数量
        this.instance
          .get('/analysis/getWarnCount', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId,
              endmonth: '',   //yyyy-MM
              month: month    //yyyy-MM
            }
          })
          .then(res => {
            this.dayCount = res.data.data.dayCount;
            this.totalCount = res.data.data.totalCount;
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        //人工上报数量
        this.instance
          .get('/analysis/getAnalyByRg', {
            params: {
              areaid: '',
              deptid: deptId,
              endmonth: '',   //yyyy-MM
              month: month    //yyyy-MM
            }
          })
          .then(res => {
            res.data.data.forEach((item) => {
              this.reportXData.push(item.type);
              this.reportYData.push(item.count);
              this.reportTotal += item.count;
            });
            this.optionReport.xAxis.data = this.reportXData;
            this.optionReport.series[0].data = this.reportYData;
            // this.optionReport.series[0].data = [1,2,3,4,5,6]
            this.$chart.myChart('chartReport', this.optionReport);
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 超时隐患统计
        this.instance
          .get('/analysis/getAnalyByTimeOut', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId,
              endmonth: '',   //yyyy-MM
              month: month    //yyyy-MM
            }
          })
          .then(res => {
            this.generalTimeOut = res.data.data[0].count;
            this.seriousTimeOut = res.data.data[1].count;
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 隐患处置率
        this.instance
          .get('/analysis/getAnalyByPercentage', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId
            }
          })
          .then(res => {
            this.percentage = res.data.data.percentage;
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 楼宇统计分析 /analysis/getAnalyByAcrh 改为按园区
        // 按园区统计分析
        this.instance
          .get('/analysis/getAnalyByArea', {
            params: {
              areaid: '',
              deptid: deptId,
              endmonth: '',   //yyyy-MM
              month: month   //yyyy-MM
            }
          })
          .then(res => {
            this.buildTotalData = res.data.data;
            res.data.data.forEach((item, index) => {
              this.buildXData.push(index+1);
              this.buildYData.push(item.count);
              this.buildTotal += item.count;
            });
            this.optionBuilding.xAxis.data = this.buildXData;
            this.optionBuilding.series[0].data = this.buildYData;
            this.$chart.myChart('chartBuilding', this.optionBuilding);

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 隐患等级分析·按月查询数据
        this.instance
          .get('/analysis/getAnalyByLevelMonth', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId,
              endmonth: '',   //yyyy-MM
              month: month    //yyyy-MM
            }
          })
          .then(res => {
            res.data.data.forEach(item => {
              if(item.type === '一般隐患'){
                this.dangerGradeMin = item.count;
              }else{
                this.dangerGradeMax = item.count;
              }
            })
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 隐患等级分析
        this.instance
          .get('/analysis/getAnalyByLevelMonths', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId
            }
          })
          .then(res => {
            this.optionDangerGrade.xAxis.data = res.data.data.category;
            this.optionDangerGrade.series[0].data = res.data.data.type[0].data;
            this.optionDangerGrade.series[1].data = res.data.data.type[1].data;
            this.$chart.myChart('chartDangerGrade', this.optionDangerGrade);

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 隐患总数变化趋势
        this.instance
          .get('/analysis/getAnalyByTotalWarn', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId
            }
          })
          .then(res => {
            this.optionDangerTotal.xAxis.data = res.data.data.category;
            this.optionDangerTotal.series[0].data = res.data.data.data;

            let forecast = (new Date).getMonth() + 2 + '月';
            let coordTop;
            coordTop = Math.max.apply(null, res.data.data.data);
            let coord = [];
            coord.push({'coord': [forecast,0]});
            coord.push({'coord': [forecast,coordTop]});
            this.optionDangerTotal.series[0].markLine.data[0] = coord;
            this.$chart.myChart('chartDangerTotal', this.optionDangerTotal);

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 隐患处置事件分析
        this.instance
          .get('/analysis/getAnalyByWarnDeal', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId
            }
          })
          .then(res => {
            this.optionDangerDeal.xAxis.data = res.data.data.category;
            this.optionDangerDeal.series[0].data =  res.data.data.data;
            this.$chart.myChart('chartDangerDeal', this.optionDangerDeal);

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 隐患来源分析
        this.instance
          .get('/analysis/getAnalyByWarnSource', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId
            }
          })
          .then(res => {
            this.optionDangerSource.xAxis.data = res.data.data.category;
            res.data.data.type.forEach((item,index) => {
              this.optionDangerSource.legend.data.push(item.name);
              this.optionDangerSource.series[index].data = item.data;
              this.optionDangerSource.series[index].name = item.name
            });

            this.$chart.myChart('chartDangerSource', this.optionDangerSource);

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });


        // 园区行业统计
        this.instance
          .get('/analysis/getAnalyByWarnArch', {
            params: {
              areaid: '',
              deptid: deptId
            }
          })
          .then(res => {
            this.optionDangerTrade.xAxis.data = res.data.data.category;
            res.data.data.type.forEach((item,index) => {
              this.optionDangerTrade.legend.data.push(item.name);
              this.optionDangerTrade.series[index].name = item.name;
              this.optionDangerTrade.series[index].data = item.data
            });

            this.$chart.myChart('chartDangerTrade', this.optionDangerTrade);

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 解决隐患时长统计
        this.instance
          .get('/analysis/getAnalyByTimes', {
            params: {
              archid: '',
              areaid: '',
              deptid: deptId,
              endmonth: '',   //yyyy-MM
              month: month    //yyyy-MM
            }
          })
          .then(res => {
            this.optionDealTime.xAxis.data = res.data.data.category;
            this.optionDealTime.series[0].data = res.data.data.data;
            this.$chart.myChart('chartDealTime', this.optionDealTime);

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });
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
