<template>
  <div class="box">
    <toview :dialog="dialog" :form="form"></toview>
    <!--查看组件 -->
    <header>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="header-card">
            <p style="user-select:none" class="font">巡检人员数量</p>
            <p style="user-select:none" class="unm">{{ userNumer }}</p>
            <img src="../../assets/picture/icon_po8igdphsks/human.png" alt srcset />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="header-card" style="background:#97B0E6">
            <p style="user-select:none" class="font">今日任务</p>
            <p style="user-select:none" class="unm">{{ jinriTask }}</p>
            <img src="../../assets/picture/icon_po8igdphsks/renwu1.png" alt srcset />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="header-card" style="background:#00DDB3">
            <p style="user-select:none" class="font">今日已完成任务</p>
            <p style="user-select:none" class="unm">{{ jinriOverTask }}</p>
            <img src="../../assets/picture/icon_po8igdphsks/renwu.png" alt srcset />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="header-card" style="background:#8EEF86">
            <p style="user-select:none" class="font">超时任务</p>
            <p style="user-select:none" class="unm">{{ outtask }}</p>
            <img src="../../assets/picture/icon_po8igdphsks/time.png" alt srcset />
          </div>
        </el-col>
      </el-row>
    </header>
    <main>
      <!-- <template>
                    <el-select v-model="imputstatus" placeholder="请选择状态" @change="clc" size="medium"  style="width:25%;margin-top:1.5%;margin-right:1.5%">
                        <el-option label="未完成" value="1"></el-option>
                        <el-option label="未开始" value="2"></el-option>
                        <el-option label="完成" value="3"></el-option>
                        <el-option label="超时" value="4"></el-option>
                        <el-option label="所有" value=""></el-option>
                    </el-select>
      </template>-->
      <template>
        <el-date-picker
          v-model="valuetime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width:25%;margin-top:1.5%;margin-right:1.5%"
          value-format="yyyy-MM-dd HH:mm:ss"
          size="medium"
        ></el-date-picker>
      </template>
      <template>
        <el-input
          placeholder="请输入任务名称关键字检索"
          v-model="renwu"
          style="width:25%;margin-top:1.5%;margin-right:1.5%"
          size="medium"
        ></el-input>
        <el-button type="primary" size="medium" @click="renw">查询</el-button>
      </template>
      <!-- 查看弹窗 -->
      <el-dialog title="维保对象" :visible.sync="cktc" width="75%">
        <el-row>
          <el-col :span="7" style="float:right">
            维保状态:
            <el-select
              v-model="manstatus"
              placeholder="请选择状态"
              size="mini"
              style="width:60%;text-align:center"
            >
              <el-option label="已完成" value="1"></el-option>
              <el-option label="未完成" value="2"></el-option>
              <el-option label="超时" value="3"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-table :data="gridData">
          <el-table-column label="对象名称">
            <template v-slot="{row}">
              <span>{{row.maintenanceTrountQrcode.qrcodeName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="对象位置">
            <template v-slot="{row}">
              <span>{{row.maintenanceTrountQrcode.installAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column property="isTrount" label="巡查状态"></el-table-column>
          <el-table-column property="status" label="对象状态"></el-table-column>
          <el-table-column property="trountTime" label="巡查完成时间">
            <template v-slot="{row}">
              <span>{{row.maintenanceTrountQrcode.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column property="photoUrl" label="照片描述"></el-table-column>
        </el-table>
      </el-dialog>
      <!-- 查看弹窗 -->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="routingName" label="任务名称"></el-table-column>
        <el-table-column label="巡查对象">
          <template slot-scope="scope">
            <span
              size="mini"
              @click="ck(scope.$index, scope.row)"
              style="color: #409eff;cursor: pointer;"
            >查看</span>
          </template>
        </el-table-column>
        <el-table-column prop="planFinishTime" label="应完成时间"></el-table-column>
        <el-table-column prop="routngStatus" label="当前状态" width="180"></el-table-column>
        <el-table-column prop="actuallyFinishTime" label="实际完成时间"></el-table-column>
        <el-table-column prop="sysUser.name" label="相关责任人"></el-table-column>
        <el-table-column prop="sysUser.phone" label="联系电话"></el-table-column>
      </el-table>
    </main>
  </div>
</template>
<script>
import config from './jobConfig.json'
import toview from '../garden/common/ToView'
export default {
  components: {
    toview
  },
  data() {
    return {
      jinriTask: 0, //今日任务
      jinriOverTask: 0, //今日已完成任务
      userNumer: 0, //巡检人员数量
      outtask: 0, //超时任务统计
      allDeviceRoutingList: [], //所有的巡检人员
      useInfo: {}, //巡检人员信息
      value: '',
      value1: [], //开始结束日期筛选
      routingStatus: '', //巡检状态
      taskValue: '', //任务名称搜索
      form: {}, //查看组件接受的数据
      dialog: false, //查看组件的显示隐藏
      dateList: [], //日期数组
      routingObj: {
        //新建任务
        routingName: '', // 任务名称
        routingCycle: '', // 巡检周期（日、周、月、季度
        rountStartTime: '', // 开始时间
        rountEndTime: '', // 结束时间
        personId: '', // 人员id、
        'Ids[]': '' //......
      },
      state: '',
      input: '',
      renwu: '',
      cktc: false,
      man: '',
      manstatus: '',
      value2: '',
      gridData: [],
      ckid: '',
      stime: '',
      etime: '',
      valuetime: '',
      imputstatus: '',
      tablist: config.task.tableConfig,
      tableData: [],
      options: config.task.select, //筛选巡检状态
      title: '新建任务',
      isShow: false,
      width: '1100px',
      height: '1000px',
      formInline: config.task.dialog,
      innerVisible: false,
      dept: ''
    }
  },
  mounted() {
    var that = this
    function getCookie(name) {
      var strcookie = document.cookie //获取cookie字符串
      var arrcookie = strcookie.split('; ') //分割
      //遍历匹配
      for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split('=')
        if (arr[0] == name) {
          return arr[1]
        }
      }
      return ''
    }
    that.dept = getCookie('dept_id')
    that.$request.wb
      .getMaintenanceRoutingState({ deptId: that.dept })
      .then(res => {
        this.tableData = res.data.rows
        console.log('维保人员', res.data)
        this.tableData.forEach(a => {
          if (a.routngStatus == '3') {
            a.routngStatus = '完成'
          } else if ((a.routngStatus = '1')) {
            a.routngStatus = '未完成'
          } else if ((a.routngStatus = '2')) {
            a.routngStatus = '未开始'
          } else if ((a.routngStatus = '4')) {
            a.routngStatus = '超时'
          }
        })
      })
    that.$request.wb.peopleSum({ deptId: that.dept }).then(res => {
      console.log('人员总数', res)
      that.userNumer = res.data
    })
    that.$request.wb.todayTask({ deptId: that.dept }).then(res => {
      console.log('今日任务', res)
      that.jinriTask = res.data
    })
    that.$request.wb.tadayFinishTask({ deptId: that.dept }).then(res => {
      console.log('今日完成任务', res)
      that.jinriOverTask = res.data
    })
    that.$request.wb.overTimeTask({ deptId: that.dept }).then(res => {
      console.log('今日已完成任务', res)
      that.outtask = res.data
    })
  },
  watch: {
    manstatus(val) {
      var that = this
      that.$request.wb.getDByIdOrStatus({ id: val }).then(res => {
        that.gridData = res.data
        console.log('来了来了', res)
        // alert(res.msg)
      })
    },
    valuetime(val) {
      var that = this
      that.stime = val[1]
      that.etime = val[0]
      console.log('vvv', val)
      this.$request.wb
        .getMaintenanceRoutingState({
          endTime: that.stime,
          startTime: that.etime
        })
        .then(res => {
          if (res.data == null) {
            that.tableData = []
          } else {
            that.tableData = res.data.rows
            that.tableData.forEach(a => {
              if (a.routngStatus == '3') {
                a.routngStatus = '完成'
              } else if (a.routngStatus == '1') {
                a.routngStatus = '未完成'
              } else if (a.routngStatus == '2') {
                a.routngStatus = '未开始'
              } else if (a.routngStatus == '4') {
                a.routngStatus = '超时'
              }
            })
          }
        })
    }
  },
  methods: {
    ck(index, row) {
      console.log(row)
      var that = this
      this.editFrom = Object.assign({}, row)
      this.ckid = row.id
      // alert(this.ckid)
      console.log('这是修改', row)
      this.$request.wb.MaintenanceRoutingForQcode({ id: row.id }).then(res => {
        console.log(res.data)
        that.gridData = res.data
        that.gridData.forEach(a => {
          if (a.isTrount == '1') {
            a.isTrount = '已完成'
          } else if (a.isTrount == '2') {
            a.isTrount = '未完成'
          } else if (a.status == '1') {
            a.status = '特别重大'
          } else if (a.status == '2') {
            a.status = '重大'
          } else if (a.status == '3') {
            a.status = '较大'
          } else if (a.status == '4') {
            a.status = '一般'
          } else if (a.status == '5') {
            a.status = '正常'
          }
        })
        console.log(res)
      })
      this.cktc = true
    },
    renw() {
      var that = this
      that.$request.wb
        .getMaintenanceRoutingName({ routingName: that.renwu })
        .then(res => {
          if (res.data == null) {
            that.tableData = []
          } else {
            that.tableData = res.data.rows
            that.tableData.forEach(a => {
              if (a.routngStatus == '3') {
                a.routngStatus = '完成'
              } else if (a.routngStatus == '1') {
                a.routngStatus = '未完成'
              } else if (a.routngStatus == '2') {
                a.routngStatus = '未开始'
              } else if (a.routngStatus == '4') {
                a.routngStatus = '超时'
              }
            })
          }
        })
    },
    clc() {
      var that = this
      this.$request.wb
        .getMaintenanceRoutingState({ routngStatus: this.imputstatus })
        .then(res => {
          if (res.data == null) {
            that.tableData = null
          } else {
            that.tableData = res.data.rows
            that.tableData.forEach(a => {
              if (a.routngStatus == '3') {
                a.routngStatus = '完成'
              } else if ((a.routngStatus = '1')) {
                a.routngStatus = '未完成'
              } else if ((a.routngStatus = '2')) {
                a.routngStatus = '未开始'
              } else if ((a.routngStatus = '4')) {
                a.routngStatus = '超时'
              }
            })
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
.obj {
  display: flex;
  .foot-search {
    margin-left: auto;
    display: flex;

    .add {
      color: #fff;
      background: rgba(17, 125, 221, 1);
    }
  }
}

.box {
  padding: 20px;
  background: #fff;

  header {
    .header-card {
      position: relative;
      padding: 20px;
      height: 88px;
      margin-top: 20px;
      background: rgba(17, 125, 221, 1);
      border-radius: 4px;
      display: flex;

      .font {
        font-size: 18px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 150px;
        flex: 1;
      }

      .unm {
        margin-right: 10px;
        position: absolute;
        top: 6%;
        left: 10%;
        font-size: 40px;
        // font-family: MicrosoftYaHei-Bold;
        // font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 100px;
      }

      img {
        position: absolute;
        padding-right: 10px;
        right: 0;
        top: 22%;
        width: 80px;
        height: 80px;
      }
    }
  }

  main {
    .main-header {
      display: flex;
      align-items: center;
      margin: 20px 0;

      .add {
        color: #fff;
        margin-left: auto;
        background: rgba(17, 125, 221, 1);
      }

      .search {
        display: flex;
        // margin-right: auto;
      }
      .inputhange {
        align-self: auto;
      }
      .search * {
        margin-left: 10px;
      }
    }
  }

  .el-form-item {
    margin-bottom: 20px;
    margin-right: 180px;
  }

  .add-foot {
    border-top: 1px solid #eeee;
    width: 1000px;

    .foot-search {
      width: 50%;
      float: right;
      display: flex;
      margin: 20px 0;

      .add {
        color: #fff;
        background: rgba(17, 125, 221, 1);
      }
    }
  }

  .user {
    width: 100px;
    color: #347dd6;
  }
}
</style>