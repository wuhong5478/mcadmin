<template>
  <div class="box">
    <!-- 头部筛选框 -->
    <div class="box-header">
      <!-- 单位选择 -->
      <template>
        <el-select
          size="medium"
          @change="changeDept"
          v-model="inputDept"
          class="area"
          placeholder="请选择单位"
        >
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </template>
      <!-- 违规类别 -->
      <template>
        <el-select
          size="medium"
          @change="changeType"
          v-model="inputDanger"
          class="area"
          placeholder="请选择违规类别"
        >
          <el-option label="全部类别" value="0"></el-option>
          <el-option label="火警" value="1"></el-option>
          <el-option label="重大隐患" value="2"></el-option>
          <el-option label="一般隐患" value="4"></el-option>
        </el-select>
      </template>
      <!-- 状态选择 -->
      <!-- @change="changeType"
      v-model="inputDanger"-->
      <template>
        <el-select
          size="medium"
          @change="changestates"
          v-model="searchStatus"
          class="area"
          placeholder="请选择处理状态"
        >
          <el-option label="全部状态" value="0"></el-option>
          <el-option label="火警待确认" value="01"></el-option>
          <el-option label="火灾处理中" value="02"></el-option>
          <el-option label="火灾处理结束" value="03"></el-option>
          <el-option label="火灾误报" value="04"></el-option>
          <el-option label="隐患待分配" value="10"></el-option>
          <el-option label="隐患处理中" value="11"></el-option>
          <el-option label="隐患处理未处理" value="12"></el-option>
          <el-option label="隐患处理未达标" value="13"></el-option>
          <el-option label="隐患已完成" value="14"></el-option>
        </el-select>
      </template>
      <!-- 发件事件 -->
      <el-date-picker
        v-model="value1"
        type="datetimerange"
        size="medium"
        class="searchInputTime"
        value-format="yyyy-MM-dd HH:mm:ss"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <!-- 告警点位 -->
      <el-input size="medium" v-model="inputAdress" class="searchInput" placeholder="请输入告警点位"></el-input>
      <el-input size="medium" v-model="inputName" class="searchInput" placeholder="请输入告警名称"></el-input>
      <el-button size="medium" @click="searchInfo" type="primary">查询</el-button>
    </div>
    <!-- 数据列表 -->
    <template>
      <el-table
        :header-cell-style="{background:'#FAFAFA'}"
        stripe
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="warnname" label="告警名称"></el-table-column>
        <el-table-column prop="reporttime" label="发生时间">
          <template v-slot="{row}">
            <span>{{row.reporttime | dateFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deptname" label="发件单位"></el-table-column>
        <el-table-column prop="address" label="告警点位"></el-table-column>
        <el-table-column prop="typename" label="违规类别"></el-table-column>
        <el-table-column prop label="告警内容">
          <template v-slot="{row}">
            <span @click="lookDanger(row)" class="searchSpan">查看</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="处理状态"></el-table-column>
        <el-table-column label="反馈内容">
          <template v-slot="{row}">
            <span @click="lookContent(row)" class="searchSpan">查看</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="text-align: center">
        <el-pagination
          background
          layout="prev, pager, next,total"
          :total="total"
          :page-size="pagesize"
          :current-page.sync="currentPage"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </template>
    <!-- 告警内容的对话框 -->
    <el-dialog title="告警内容" :visible.sync="dialogVisible" width="45%">
      <!-- <span>这是一段信息</span> -->
      <el-form>
        <el-form-item label="照片:">
          <img class="img" :src="dangerHref" alt />
        </el-form-item>
        <el-form-item label="报警描述:">{{dangerObj.des || '无'}}</el-form-item>
      </el-form>
    </el-dialog>
    <!-- 反馈中心的对话框 -->
    <el-dialog title="处理结果" :visible.sync="dialogVisible1" width="45%">
      <!-- <span>这是一段信息</span> -->
      <el-form class="el-form">
        <el-form-item class="one" label="处理状态:">{{backObj.status || '无'}}</el-form-item>
        <el-form-item class="one" label="处理时间:">{{backObj.time || '无'}}</el-form-item>
        <el-form-item class="one" label="处理人员:">{{backObj.name || '无'}}</el-form-item>
        <el-form-item label="处理电话:">{{backObj.phone || '无'}}</el-form-item>
        <el-form-item label="处理照片:">
          <img class="img" :src="dangerHref" alt />
        </el-form-item>
        <el-form-item class="one" label="处理描述:">{{backObj.des || '无'}}</el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  // 注册局部过滤器格式化时间
  filters: {
    dateFilter(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      options: [
        {
          name: '全部单位',
          id: ''
        }
      ],
      inputName: '',
      searchStatus: '',
      inputAdress: '',
      inputDept: '', // 筛选条件单位选择
      inputDanger: '', // 违规类别
      pickerOptions: {
        shortcuts: [
          {
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value1: '', // 事件筛选
      tableData: [],
      pagesize: 10,
      currentPage: 1,
      total: 0,
      dialogVisible: false, // 告警内容对话框
      dialogVisible1: false, // 反馈中心对话框
      obj: {
        deptid: '', //单位名称
        type: '', // 违规类别
        startTime: '',
        endTime: '',
        address: '',
        pageSize: '',
        currentPage: '',
        status: '',
        warnname: ''
      },
      // 告警内容的数据集
      dangerObj: {
        des: '',
        pic: ''
      },
      // 反馈内容的参数
      backObj: {
        tiem: '',
        name: '',
        phone: '',
        pic: '',
        des: '',
        status: ''
      },
      // 预览图片所需的参数
      picObj: {
        deviceName: '',
        pictureId: '',
        productKey: '',
        type: ''
      },
      dangerHref: '',
      itemArr: [],
      href: ''
    }
  },
  created() {
    this.getDeptList()
    this.getInfoList()
  },
  methods: {
    // 进入页面获取到用户的cookie
    getCookie(cookieName) {
      var strCookie = document.cookie
      var arrCookie = strCookie.split('; ')
      for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split('=')
        if (cookieName == arr[0]) {
          return arr[1]
        }
      }
      return '无'
    },
    // 查询系统机构渲染筛选下拉框
    async getDeptList() {
      const res = await this.$request.platform.getdeptlist1({
        pageNo: 1,
        pageSize: 10,
        type: '2'
      })
      // console.log(res)
      // this.options = res.data.rows
      res.data.rows.forEach(v => {
        this.options.push(v)
      })
    },
    // 查询告警信息反馈列表
    async getInfoList() {
      this.obj.currentPage = this.currentPage
      this.obj.pageSize = this.pagesize
      const res = await this.$request.health.getInfoList(this.obj)
      // console.log(res.data.rows)
      this.tableData = res.data.rows
      // this.tableData.forEach(v => {
      //   console.log();
      //   // console.log(v.workOrderId)
      //   // console.log(v.status)
      // })
      this.total = res.data.totalCount
    },
    //根据单位名称筛选
    changeDept(value) {
      this.currentPage = 1
      this.obj.deptid = value
      this.getInfoList()
    },
    // 根据违规类别进行筛选
    changeType(value) {
      if (value === '0') {
        value = ''
      }
      this.currentPage = 1
      this.obj.type = value
      this.getInfoList()
    },
    // 根据时间进行筛选
    searchInfo() {
      // console.log(this.value1)
      if (this.value1) {
        this.obj.startTime = this.value1[0]
        this.obj.endTime = this.value1[1]
        this.currentPage = 1
      }
      if (this.value1 === null) {
        this.obj.startTime = ''
        this.obj.endTime = ''
        this.currentPage = 1
      }
      this.currentPage = 1
      this.obj.address = this.inputAdress
      this.obj.warnname = this.inputName
      this.getInfoList()
    },
    // 根据处理状态进行筛选
    changestates(value) {
      if (value === '0') {
        value = ''
      }
      this.currentPage = 1
      this.obj.status = value
      this.getInfoList()
    },
    // 查看告警内容
    async lookDanger(row) {
      // console.log(row)
      this.dialogVisible = true
      if (row.type === '4' || row.type === '2') {
        // console.log(row.id)
        const res = await this.$request.health.getDangerInfo({
          id: row.id
        })
        // console.log(res)
        this.dangerObj.des = res.data.hiddenDescript
        this.picObj.deviceName = res.data.equipment
        this.picObj.pictureId = res.data.livePhoto
        this.picObj.productKey = res.data.productKey
        this.picObj.type = '1'
        // console.log(this.picObj)
        this.dangerHref = ''
        this.lookPicture(res.data.livePhoto)
      }
      if (row.type === '1') {
        this.dangerHref = ''
        // console.log(row)
        this.dangerObj.des = row.warnname
        const res = await this.$request.health.getFireInfo({
          fireId: row.id,
          type: '4'
        })
        res.data.forEach(v => {
          v.con = JSON.parse(v.con)
        })
        // console.log(res.data[0].con)
        res.data[0].con.forEach(v => {
          if (v.name === '图片') {
            this.dangerObj.pic = v.data
            this.getPic(this.dangerObj.pic)
          }
        })
      }
    },

    // 查看图片的方法
    getPic(pic) {
      this.dangerHref = `http://120.55.234.38/api/getPicture?picture=${pic}`
    },
    // 预览图片的预览功能
    async lookPicture(pic) {
      if (pic.indexOf('.') != -1) {
        this.getPic(pic)
      } else {
        // console.log(2)
        // 添加随机数防止浏览器缓存
        const res = await this.addDanger.get(
          '/taskwarn/getiotpictureUrl',
          // `/taskwarn/getiotpictureUrl?r=${Math.random()}`,
          {
            params: this.picObj
          }
        )
        // console.log(res.data.data)
        this.dangerHref = res.data.data
      }
    },
    //查看反馈内容
    async lookContent(row) {
      console.log(row)
      this.dialogVisible1 = true
      if (row.type === '1') {
        this.backObj.status = row.status
        const res = await this.$request.health.getFireInfo({
          fireId: row.id,
          type: '8'
        })
        res.data.forEach(v => {
          v.con = JSON.parse(v.con)
        })
        // console.log(res.data)
        this.backObj.time = res.data[0].createTime
        // console.log(res.data[0].con)
        res.data[0].con.forEach(v => {
          if (v.name === '处理人员') {
            v.data = v.data.split('-')
            // console.log(v.data)
            this.backObj.phone = v.data[1]
            this.backObj.name = v.data[0]
            this.backObj.des = v.data[2]
            // v.data.forEach(v => {
            //   console.log(v)
            // })
          }
        })
      }
      if (row.type === '2' || row.type === '4') {
        this.dangerHref = ''
        const orderRes = await this.$request.health.getOrderInfo({
          id: row.workOrderId
        })
        // console.log(orderRes.data)
        this.backObj.des = orderRes.data.processResult
        this.backObj.name = orderRes.data.userName
        this.backObj.status = row.status
        this.backObj.phone = row.phone
        this.backObj.time = orderRes.data.actualTime
        // 根据工单id查询流水
        const worderRes = await this.addDanger.get(
          '/workordertrack/gettaskwarnlist',
          {
            params: {
              workOrderId: row.workOrderId,
              pageNo: 0,
              pageSize: 10000
            }
          }
        )
        // console.log(worderRes.data.data.rows)
        this.itemArr = worderRes.data.data.rows
        for (let i = this.itemArr.length - 1; i >= 0; i--) {
          // console.log(this.itemArr[i])
          this.href = this.itemArr[i].descript.split(':')[1]
          // console.log(this.href)
          this.pic = `http://120.55.234.38/api/getPicture?picture=${this.href}`
        }
        this.itemArr.forEach(v => {
          // console.log(v.descript)
          v.wenzi = v.descript.split(',')[0]
          this.href = v.descript.split(':')[1]
          console.log(this.href)
          this.dangerHref = `http://120.55.234.38/api/getPicture?picture=${this.href}`
          // console.log(v.wenzi)
          // console.log(this.href)
        })
      }
    },
    // 分页的功能
    currentChange(currentPage) {
      // console.log(currentPage)
      this.currentPage = currentPage
      this.getInfoList()
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  background-color: #fff;
  padding: 10px;
  .area {
    width: 10%;
    margin-right: 10px;
  }
}
.searchInputTime {
  width: 28%;
  margin: 0 10px 10px 0;
}
.searchInput {
  width: 14%;
  margin-right: 10px;
}
.searchSpan {
  color: #409eff;
  cursor: pointer;
}
.one {
  width: 50%;
  float: left;
}
.el-form {
  overflow: hidden;
  border-top: 1px solid #e6e6e6;
}
.img {
  width: 90%;
}
</style>

