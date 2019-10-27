<template>
<div>
<el-row :gutter="10">
  <el-col :span="18">
    <el-row :gutter="10">
      <el-col :span="12"><div id="chart1" style="width:100%;" class="bg-purple"></div></el-col>
      <el-col :span="12"><div id="chart2" style="width:100%;" class="bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px;">
      <el-col :span="24">
          <div class="yuanqushebei" > 
            <div class="yuanqushebei-left" style="width:70%;">
              <div class="title">园区设备</div>
              <div><span style="padding-right:30px;">设备总数</span><span>32800</span></div>
              <div class="status">
                <span style="padding-left:46px;">正常&nbsp;&nbsp;&nbsp;&nbsp;30000</span>
                <span style="padding-right:66px;">故障&nbsp;&nbsp;&nbsp;&nbsp;2800</span></div>
              <div><el-progress :percentage="70" color='#117FE1'></el-progress></div>
              <div class="status-info">
                <div  v-for="(item, index) in dataList" :key="index">
                  <span>{{ item.title }}</span>
                  <span style="padding: 0 34px;">{{ item.normal }}</span>
                  <span> {{ item.error }}</span>
                </div>
              </div>
              <div class="status-info addStyle">
                <div  v-for="(item, index) in dataList1" :key="index">
                  <span>{{ item.title }}</span>
                  <span style="padding: 0 34px;">{{ item.normal }}</span>
                  <span> {{ item.error }} </span>
                </div>
              </div>
            </div>
            <div style="width:30%;" id="chart3"></div>
          </div>
      </el-col>
    </el-row>
  </el-col>
  <el-col :span="6">

    <div class="parksurvey-right" style="height:509px;overflow:auto">
      <header>
        <div class="left"></div>
        <div class="right">一键促办</div>
      </header>
      <main>
        <div v-for="item in 4" :key="item" class="parksurvey-right-info">
          <div class="main-info">
            <div><span>1号楼北消防通道堵塞</span><span>一般隐患</span></div>
            <div class="main-style"><span>中大园区</span><span>2019.09.01 16:00:00</span></div>
          </div>
          <div class="callMe">促办</div>
        </div>
      </main>
    </div>
  </el-col>
</el-row>
<el-row :gutter="10" style="margin-top: 10px;">
  <el-col :span="6">
    <div class="header-card" style="background:#fff;">
        <p>隐患处置</p>
        <div class="main" style="display: flex; flex-direction: column;justify-content: center;text-align: center;">
          <div class="title1"></div>
          <div><span>1124</span>件</div>
          <div>发现隐患数</div>
          <div>处置率  <span>99%</span></div>
          <div>超时未处理隐患  <span>6</span>件</div>
        </div>
    </div>
  </el-col>
  <el-col :span="6">
    <div class="header-card" style="background:#fff">
      <p>巡检情况</p>
      <div style="background:#fff; display: flex; flex-direction: column;justify-content: center;text-align: center;">
        <div class="title1"></div>
        <div><span>1124</span>件</div>
        <div>发现隐患数</div>
        <div>处置率  <span>99%</span></div>
        <div>超时未处理隐患  <span>6</span>件</div>
      </div>
    </div>
  </el-col>
  <el-col :span="6">
    <div class="header-card" style="background:#fff;">
        <p>维保情况</p>
        <div style="background:#fff; display: flex; flex-direction: column;justify-content: center;text-align: center;">
          <div class="title1"></div>
          <div><span>1124</span>件</div>
          <div>发现隐患数</div>
          <div>处置率  <span>99%</span></div>
          <div>超时未处理隐患  <span>6</span>件</div>
        </div>
    </div>
  </el-col>
  <el-col :span="6">
    <div class="header-card" style="background:#fff">
        <p>应急情况</p>
        <div style="padding: 20px 0; background:#fff; display: flex;justify-content: center;text-align: center;">
          <div>
            <div>。</div>
            <div>100%</div>
            <div>触达率</div>
          </div>
          <div style="padding:0 40px">
            <div>。</div>
            <div>100%</div>
            <div>触达率</div>
          </div>
          <div>
            <div>。</div>
            <div>100%</div>
            <div>触达率</div>
          </div>
        </div>
    </div>
  </el-col>
</el-row>
</div>
</template>
<script>
// 园区情况表
const option = {
    title : {
      bottom:'78%',
      text: '园区情况',
      subtext: '(近30天得分)'
    },
    grid: {
        left: '3%',
        right: '1%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ['08.01', '08.02', '08.03', '08.04', '08.05']
    },
    yAxis: {
        type: 'value',
    },
    grid: {
        left: '3%',
        right: '1%',
        bottom: '3%',
        containLabel: true
    },
    series: [{
        color: '#117FE1',
        data: [13, 33, 40, 50, 80],
        type: 'line',
        smooth: true
    }]
};
// 柱状图
const option1 = {
    title: {
        text: '园区今日工作',
        bottom:'85%'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        x: 'right',
        bottom:'85%',
        data: ['已完成', '未完成']
    },
    grid: {
        left: '3%',
        right: '1%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ['报警','隐患','巡检','维保']
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    series: [     
        {
          color:'#117FE1',
          name: '已完成',
          type: 'bar',
          data: [200, 400, 800, 1000]
        },
        {
          color: '#F29B76',
          name: '未完成',
          type: 'bar',
          data: [300, 400, 800, 1000]
        }
    ]
};
// 饼图
const option2 = {
    title : {
        text: '设备在线率',
        x:'center',
        y: 'bottom'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x: 'right',
        data: ['在线率', '离线率']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:310, name:'离线率'},
                {value:600, name:'在线率'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
          color: ['#F29B76','#117FE1']
        }
    ]
};
export default {
  data() {
    return {
      dataList:[
        // {title:'', normal:'正常', error:'故障'},
        {title:'火灾自动报警系统', normal:'6000', error:'580'},
        {title:'电器火灾报警系统', normal:'6000', error:'580'},
        {title:'独立式感烟探测器', normal:'6000', error:'580'},
        // {title:'消防水系统', normal:'6000', error:'580'},
        // {title:'气体检测系统', normal:'6000', error:'580'}
      ],
      dataList1:[
        {title:'消防水系统', normal:'6000', error:'580'},
        {title:'气体检测系统', normal:'6000', error:'580'}
      ]
    }
  },
  mounted() {
    this.$chart.myChart('chart1', option);
    this.$chart.myChart('chart2', option1);
    this.$chart.myChart('chart3', option2);
  }
}
</script>
<style lang="less" scoped>
.bg-purple-dark {
  background-color: #fff;
  text-align: center;
  height: 500px;
}
.bg-purple {
  background-color: #fff;
  text-align: center;
  height: 265px;
}
.grid-content {
  background-color: skyblue;
  text-align: center;
  height: 245px;
}
.yuanqushebei {
  background-color: #fff;
  padding: 10px;
  display: flex;
  line-height:38px;
  height: 100%;
  .yuanqushebei-left {
    flex: 1;
    color:rgba(0,0,0,1);
    font-family:'Microsoft YaHei';
    // width: 500px;
    font-size:14px;
    font-weight:400;
    .title {
      font-weight:bold;
    }
    .status {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .status-info {
      text-align: left;
      display: inline-block;
    }
    .addStyle {
      text-align: right;
    }
  }
  .box {
    flex: 1
  }
}
.parksurvey-right {
  // height: 480px;
  // margin-bottom: 20px;
  // margin-left: 20px;
  padding: 18px;
  padding-top: 10px;
  background-color: #fff;
  header {
    display: flex;
    justify-content: space-between;
    font-size:20px;
    font-family:'Microsoft YaHei';
    color:rgba(0,0,0,1);
    padding-bottom: 18px;
    border-bottom: 1px solid #ccc;
    .left {
      font-weight:bold;
    }
    .right {
      background:rgba(17,127,225,1);
      border-radius:6px;
      font-weight:400;
      line-height: 24px;
      font-size: 15px;
      color:rgba(255,255,255,1);
      padding: 2px 10px;
    }
  }
  .main-info {
    div {
      display: flex;
      justify-content: space-between;
    }
    .main-style {
      margin: 10px 0 15px 0;
    }
  }
  .parksurvey-right-info {
    display: flex;
    flex-direction: column;
    .callMe {
      align-self:flex-end;
      width: 30px;
      background:rgba(17,127,225,1);
      border-radius:6px;
      font-weight:400;
      font-size: 15px;
      color:rgba(255,255,255,1);
      padding: 2px 10px;
    }
  }
}
.header-card {
    padding: 20px;
    height: 200px;
    background: rgba(17, 125, 221, 1);
    border-radius: 4px;
    .title1 {
      width: 40px;
      height: 40px;
      background-color: #F29B76;
      border-radius: 50%;
      margin: 0 auto;
    }
}
</style>