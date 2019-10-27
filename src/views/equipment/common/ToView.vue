<template>
  <el-dialog
  title="设备详情"
  :visible.sync="dialog"
  width="80%"
  :before-close="handleClose">
  <div class="equipmentInfo" v-if='flag'>
    <div class="frie">
      <header class="title"> {{ content.productName }} (ID:123{{content.deviceName}})</header>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div>设备型号</div>
            <div> {{ content.categoryName }} </div>
            <div style="padding: 20px 0;">
              <div>设备类型</div>
              <div> {{ content.productName }} </div>
            </div>
            <div>供货商</div>
            <div>-</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <div>设备状态</div>
            <div> {{ content.status === 1?'在线':(content.status === 0?'离线':'未激活') }} </div>
            <div style="padding: 20px 0;">
              <div>权属机构</div>
              <div> {{ content.organizationName }} </div>
            </div>
            <div>最后上线时间</div>
            <div> {{(new Date(content.latestOnlineTime).toLocaleString('zh', { hour12: false }))=='1970/1/1 08:00:00'?'--':(new Date(content.latestOnlineTime).toLocaleString('zh', { hour12: false }))}} </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div>部署区域</div>
            <div> {{ content.districtName }} </div>
            <div style="padding: 20px 0;">
              <div>部署位置</div>
              <div> {{ content.address }} </div>
            </div>
            <div>地理位置</div>
            <div> {{  content.longitude+'.'+content.latitude }},{{content.altitude}}米 </div>
          </div>
        </el-col>
      </el-row>
      <!--  -->
      <el-row>
        <el-col :span="24">
          <div class="status">
            <div class="title">设备运行状态</div>
            <div>上次上报时间：{{ new Date(content.lastUploadTime).toLocaleString('zh', { hour12: false }) }}</div>
          </div>
        </el-col>
      </el-row>
      <!--  -->
      <div class="status-item">
        <div class="item" v-for="(item, index) in info" :key="index">
          <div>{{item.funName}}</div>
          <div class="content"> {{item.funName === '压力值'?(item.value+'MPa'):item.funName === '电池电量'?(item.value+'%'):item.funName === '发送频率'?(item.value+'min'):item.funName === 'B相电流'?(item.value+'A'):item.funName === 'A相电流'?(item.value+'A'):item.funName === 'C相电流'?(item.value+'A'):item.funName === 'A相功率'?(item.value+'W'):item.funName === 'B相功率'?(item.value+'W'):item.funName === 'C相功率'?(item.value+'W'):item.funName === '剩余电流'?(item.value+'mA'):item.funName === 'A相线温度'?(item.value+'°C'):item.funName === 'B相线温度'?(item.value+'°C'):item.funName === 'C相线温度'?(item.value+'°C'):item.funName === 'N线温度'?(item.value+'°C'):item.funName === 'A相电压'?(item.value+'V'):item.funName === 'B相电压'?(item.value+'V'):item.funName === 'C相电压'?(item.value+'V'):item.funName === '入离网状态'?(item.value==1?'入网':'离网'):item.funName === '当前电压'?(item.value+'V'):item.value}}</div>
          <!-- <div class="item-info" @click='lookInfo(item.fundId)'>详情</div> -->
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div id="chart1" style="width:100%;height:400px;"></div>
  </div>
</el-dialog>
</template>
<script>
const option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
    }]
};
export default {
    props: {
    dialog: Boolean,
    form: Object,
    
  },
  data() {
    return {
      content:{},
      info:{},
      flag:true,
      obj:{}
    }
  },
  mounted() {
    
  },
  watch: {
    async dialog(val) {
      var that = this
      if(!val) return
      this.flag = true
      // alert(this.form.deviceName)
      // let res = await this.$request.deviceInfo.queryItemInfo({name:that.form.deviceName})
      // console.log('name',that.form.deviceName)
      this.$request.deviceInfo.queryItemInfo({name:that.form.deviceName}).then(res=>{
        
        console.log(11111111111111111111111111,res.data.device)
        that.content = res.data.device
        that.info = res.data.property
      })
      // that.content == res.device
      // console.log(res,'详情')
      
    }
  },
  methods: {
    handleClose() {
      this.$parent.dialog = false
    },
    lookInfo(id) {
      console.log(id,'详情ID')
      // 设备历史属性 接口
      // this.$request.deviceInfo.ItemInfo()
      this.flag = false
      setTimeout(()=>{
        this.$chart.myChart('chart1', option);
      })
    }
  }
}
</script>
<style lang='less' scoped>
.el-dialog__body {
  border:1px solid #ccc!important;
  padding: 10px 20px !important;
}
.equipmentInfo {
  .frie {
  .title {
    font-size: 20px;
    font-weight: 700;
    padding: 10px 0;
  }
  }
}

.grid-content {
  div:first-child {
    color: #999;
  }
}
.status {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-item {
  width: 100%;
  height: 100%;
  .status();
  justify-content: flex-start;
  flex-wrap:wrap;
  .item {
    width: 22.5%;
    padding: 10px;
    border: 1px solid #ccc;
    .content {
      text-align: center;  
      font-size: 20px;
      font-weight: 700;
      padding: 20px 0;
    }
    .item-info {
      text-align: right;
      color: skyblue;
    }
  }
}
</style>