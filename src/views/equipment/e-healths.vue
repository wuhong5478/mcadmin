<template>
  <div class="box">
    <!-- 头部筛选框 -->
    <div class="box-header">
      <template>
        <el-select
          class="area"
          @change="changeArea"
          v-model="areaValue"
          size="medium"
          placeholder="请选择园区"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.areaName"
            :value="item.areaName"
          ></el-option>
        </el-select>
      </template>
      <template>
        <el-select
          class="area"
          @change="changeStatus"
          v-model="statusValue"
          size="medium"
          placeholder="请选择信息状态"
        >
          <el-option v-for="item in options1" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </template>
      <template>
        <el-select class="area" v-model="healthValue" size="medium" placeholder="请选择健康度">
          <el-option
            v-for="item in options2"
            :key="item.areaId"
            :label="item.areaName"
            :value="item.areaId"
          ></el-option>
        </el-select>
      </template>
      <el-input v-model="searchInputName" size="medium" class="searchInput" placeholder="请输入设备名称"></el-input>
      <el-input v-model="searchInputRoom" size="medium" class="searchInput" placeholder="请输入设备位置"></el-input>
      <el-button size="medium" @click="searchBtn" type="primary">查询</el-button>
    </div>
    <!-- 数据列表 -->
    <template>
      <el-table
        :header-cell-style="{background:'#FAFAFA'}"
        stripe
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="productName" label="设备名称"></el-table-column>
        <el-table-column prop="districtName" label="所属园区"></el-table-column>
        <el-table-column prop="address" label="安装位置"></el-table-column>
        <el-table-column prop="status" label="信息状态"></el-table-column>
        <!-- <el-table-column prop label="电池电量"></el-table-column> -->
        <el-table-column label="最后上线时间">
          <template v-slot="{row}">
            <span v-show="row.latestOnlineTime">{{row.latestOnlineTime | dateFilter }}</span>
            <span v-show="!row.latestOnlineTime">--</span>
            <!-- <span>{{row.latestOnlineTime | dateFilter}}</span> -->
          </template>
        </el-table-column>
        <el-table-column prop label="健康度">
          <template v-slot="{row}">
            <span>--</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{row}">
            <span @click="lookInfo(row)" class="searchSpan">查看</span>
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
    <!-- 设备详情的对话框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="80%">
      <!-- <span>这是一段信息</span> -->
      <el-form class="el-form">
        <el-form-item class="one" label="健康得分:">{{huixanObj.one || '--'}}</el-form-item>
        <el-form-item class="one" label="故障次数:">{{huixanObj.two || '--'}}</el-form-item>
        <el-form-item class="one" label="信息状态:">{{huixanObj.status}}</el-form-item>
        <el-form-item class="one" label="未处理故障:">{{huixanObj.three || '--'}}</el-form-item>
      </el-form>
      <!-- 设备隐患列表 -->
      <p class="list">设备隐患列表</p>
      <template>
        <!-- <span class="headerSpan"></span> -->
        <el-select
          size="medium"
          @change="changeDangerStatus"
          v-model="searchResult"
          placeholder="处理结果"
        >
          <el-option label="所有处理结果" value></el-option>
          <el-option label="待分配" value="0"></el-option>
          <el-option label="处理中" value="1"></el-option>
          <el-option label="处理未确认" value="2"></el-option>
          <el-option label="处理未达标" value="3"></el-option>
          <el-option label="处理已确认" value="4"></el-option>
          <el-option label="超时未处理" value="5"></el-option>
        </el-select>
      </template>
      <!-- 报警时间 -->
      <template>
        <!-- <span class="headerSpan">实际处理时间:</span> -->
        <el-date-picker
          size="medium"
          v-model="valueTime"
          type="datetimerange"
          range-separator="至"
          class="searchInputTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </template>
      <!-- 设备名称 -->
      <el-input
        v-model="searchInputDanger"
        size="medium"
        class="searchInputDanger"
        placeholder="请输入隐患名称"
      ></el-input>
      <el-button size="medium" @click="searchDangerInfo" type="primary">查询</el-button>
      <!-- 隐患数据列表 -->
      <template>
        <el-table
          :header-cell-style="{background:'#FAFAFA'}"
          stripe
          :data="tableData1"
          style="width: 100%"
        >
          <el-table-column prop="hiddangerName" label="隐患名称"></el-table-column>
          <el-table-column prop="reportTime" label="报警时间"></el-table-column>
          <el-table-column prop="hiddenDescript" label="报警描述">
            <template v-slot="{row}">
              <span @click="searchDangerPic(row)" class="searchSpan">查看</span>
            </template>
          </el-table-column>
          <el-table-column label="处理人">
            <template v-slot="{row}">
              <span>{{row.handlerName || '--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="处理时间">
            <template v-slot="{row}">
              <span>{{row.processTime || '--'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="resultName" label="处理结果"></el-table-column>
          <el-table-column label="处理描述">
            <template v-slot="{row}">
              <span @click="searchPic(row)" class="searchSpan">查看</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div style="text-align: center">
          <el-pagination
            background
            layout="prev, pager, next,total"
            :total="total1"
            :page-size="pagesize1"
            :current-page.sync="currentPage1"
            @current-change="currentChange1"
          ></el-pagination>
        </div>
      </template>
    </el-dialog>
    <!-- 处理描述的对话框 -->
    <el-dialog title="处理描述" :visible.sync="dialogVisible1" width="45%">
      <!-- <span>这是一段信息</span> -->
      <el-form>
        <el-form-item label="照片:">
          <!-- <div @click="lookPicture">
            <a class="download" target="_blank" :href="dangerHref">预览</a>
          </div>-->
          <img class="img" :src="`${pic}`" alt />
        </el-form-item>
        <el-form-item label="处理描述:"></el-form-item>
      </el-form>
    </el-dialog>
    <!-- 报警描述的对话框 -->
    <el-dialog title="报警描述" :visible.sync="dialogVisible2" width="45%">
      <!-- <span>这是一段信息</span> -->
      <el-form>
        <el-form-item label="照片:">
          <!-- <div @click="lookPicture">
            <a class="download" target="_blank" :href="dangerHref">预览</a>
          </div>-->
          <img class="img" :src="`${dangerHref}`" alt />
        </el-form-item>
        <el-form-item label="报警描述:"></el-form-item>
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
      valueTime: '',
      dangerHref: '', // 图片预览
      title: '', // 设备详情的设备名称
      dialogVisible: false, // 设备详情的对话框
      dialogVisible1: false, // 处理描述的对话框
      dialogVisible2: false, // 报警描述的对话框
      searchInputName: '', // 筛选条件设备名称
      searchInputRoom: '', // 筛选条件设备地址
      options: [], // 筛选条件园区选择
      areaValue: '', //
      options1: [
        { label: '全部状态', id: '' },
        { label: '离线', id: '0' },
        { label: '在线', id: '1' },
        { label: '未激活', id: '3' }
      ], // 信息状态筛选条件
      statusValue: '', // 筛序条件信息状态
      healthValue: '', // 健康度选择
      options2: [], // 健康度筛选
      tableData: '', // 数据列表
      tableData1: '', // 隐患数据列表
      pagesize: 10,
      currentPage: 1,
      total: 0,
      total1: 0,
      pagesize1: 10,
      currentPage1: 1,
      searchResult: '', // 设备详情的隐患处理结果
      searchTime: '', // 设备详情的隐患报警时间
      searchInputDanger: '', // 设备详情的隐患名称
      obj: {
        pageIndex: '',
        pageSize: '',
        status: '', // 状态
        districtName: '', // 园区名称
        address: '', // 设备地址
        productName: '' // 设备名称
      },
      // 回显设备信息所需对象参数
      huixanObj: {
        one: '', // 得分
        two: '', // 故障次数
        three: '', // 未处理故障
        status: ''
      },
      // 获取隐患数据的所需对象参数
      dangerObj: {
        name: '', // 隐患名称
        workOrderStates: '', // 隐患状态
        endTime: '', // 结束时间
        startTime: '', //开始时间
        productkey: '',
        devicename: '',
        currentPage: '',
        pageSize: ''
      },
      // 预览图片所需的参数
      picObj: {
        deviceName: '',
        pictureId: '',
        productKey: '',
        type: ''
      },
      itemArr: [],
      href: '',
      pic: ''
    }
  },
  created() {
    this.getAllArea()
    // this.dangerObj.maintenanceId = this.getCookie('dept_id')
    // this.dangerObj.institutionType = this.getCookie('dept_type')
    // if (this.dangerObj.institutionType === '1') {
    //   this.dangerObj.institutionType = '0'
    //   this.dangerObj.maintenanceId = ''
    // }
    // if (this.dangerObj.institutionType === '2') {
    //   this.dangerObj.institutionType = '2'
    // }
    // if (this.dangerObj.institutionType === '3') {
    //   this.dangerObj.institutionType = '1'
    // }
    this.getAllInfo()
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
    // 获取当前时间
    getNowTime() {
      const time = new Date()
      let y = time.getFullYear()
      let m = time.getMonth() + 1
      let d = time.getDate()
      let h = time.getHours()
      let mi = time.getMinutes()
      let s = time.getSeconds()
      m = m < 10 ? `0${m}` : m
      d = d < 10 ? `0${d}` : d
      h = h < 10 ? `0${h}` : h
      mi = mi < 10 ? `0${mi}` : mi
      s = s < 10 ? `0${s}` : s
      return `${y}-${m}-${d} ${h}:${mi}:${s}`
    },
    //获取3个月前时间
    getOldTime() {
      const time = new Date()
      let y = time.getFullYear()
      let m = time.getMonth() - 2
      let d = time.getDate()
      let h = time.getHours()
      let mi = time.getMinutes()
      let s = time.getSeconds()
      m = m < 10 ? `0${m}` : m
      d = d < 10 ? `0${d}` : d
      h = h < 10 ? `0${h}` : h
      mi = mi < 10 ? `0${mi}` : mi
      s = s < 10 ? `0${s}` : s
      return `${y}-${m}-${d} ${h}:${mi}:${s}`
    },
    // 获取所有的园区
    async getAllArea() {
      const res = await this.$request.health.getAreaAll()
      // console.log(res)
      const obj = { areaName: '全部园区', areaId: '' }
      this.options.push(obj)
      res.data.forEach(v => {
        this.options.push(v)
      })
    },
    //查询所有的设备信息
    async getAllInfo() {
      this.obj.pageIndex = this.currentPage
      this.obj.pageSize = this.pagesize
      const res = await this.$request.health.getAllInfo(this.obj)
      // console.log(res)
      this.tableData = res.list
      this.tableData.forEach(v => {
        if (v.status === 0) {
          v.status = '离线'
        }
        if (v.status === 1) {
          v.status = '在线'
        }
        if (v.status === 3) {
          v.status = '未激活'
        }
      })
      this.total = res.total
    },
    // 根据园区进行筛选
    changeArea(value) {
      this.currentPage = '1'
      if (value === '全部园区') {
        value = ''
      }
      this.obj.districtName = value
      this.getAllInfo()
    },
    // 根据状态进行筛选
    changeStatus(value) {
      this.currentPage = '1'
      this.obj.status = value
      this.getAllInfo()
    },
    // 根据设备名称和设备地址进行筛选
    searchBtn() {
      this.currentPage = '1'
      this.obj.address = this.searchInputRoom
      this.obj.productName = this.searchInputName
      this.getAllInfo()
    },
    // 点击单个设备查询详细信息并获取隐患数据信息
    async lookInfo(row) {
      this.dialogVisible = true
      // console.log(row)
      this.title = row.productName
      this.huixanObj.status = row.status
      this.dangerObj.devicename = row.deviceName
      this.dangerObj.productkey = row.productKey
      this.dangerObj.startTime = this.getNowTime()
      this.dangerObj.endTime = this.getOldTime()
      this.getDangerInfo()
    },
    // 获取隐患数据列表
    async getDangerInfo() {
      this.dangerObj.currentPage = this.currentPage1
      this.dangerObj.pageSize = this.pagesize1
      const res = await this.$request.health.getDangerAllLIst(this.dangerObj)
      // console.log(res)
      this.tableData1 = res.data.rows
      this.total1 = res.data.totalCount
      this.tableData1.forEach(v => {
        if (v.workOrderStates === '0' || v.workOrderStates === null) {
          v.resultName = '待分配'
        }
        if (v.workOrderStates === '1') {
          v.resultName = '处理中'
        }
        if (v.workOrderStates === '2') {
          v.resultName = '处理未确认'
        }
        if (v.workOrderStates === '3') {
          v.resultName = '处理未达标'
        }
        if (v.workOrderStates === '4') {
          v.resultName = '处理已确认'
        }
        if (v.workOrderStates === '5') {
          v.resultName = '超时未处理'
        }
      })
    },
    // 根据隐患处理结果进行筛选
    changeDangerStatus(value) {
      // console.log(value)
      this.dangerObj.workOrderStates = value
      this.getDangerInfo()
    },
    // 根据隐患名称进行筛选
    searchDangerInfo() {
      // console.log(this.searchInputDanger)
      this.dangerObj.startTime = this.valueTime[0]
      this.dangerObj.endTime = this.valueTime[1]
      this.dangerObj.name = this.searchInputDanger
      this.getDangerInfo()
    },
    // 点击隐患列表中的处理描述查看
    searchPic(row) {
      this.pic = ''
      this.dialogVisible1 = true
      // console.log(row)
      // this.pic = row.livePhoto
      this.picObj.deviceName = row.equipment
      this.picObj.pictureId = row.livePhoto
      this.picObj.productKey = row.productKey
      this.picObj.type = '1'
      this.lookOverworkOr(row.workOrderId)
      // console.log(this.picObj)
    },
    // 点击隐患列表中的报警描述查看
    searchDangerPic(row) {
      this.dangerHref = ''
      this.dialogVisible2 = true
      // console.log(row)
      this.pic = row.livePhoto
      this.picObj.deviceName = row.equipment
      this.picObj.pictureId = row.livePhoto
      this.picObj.productKey = row.productKey
      this.picObj.type = '1'
      this.lookPicture()
    },
    // 查看工单流水的方法
    async lookOverworkOr(parameter) {
      // console.log(1)
      const res = await this.addDanger.get('/workordertrack/gettaskwarnlist', {
        params: {
          workOrderId: parameter,
          pageNo: 0,
          pageSize: 10000
        }
      })
      // console.log(res.data.data.rows)
      this.itemArr = res.data.data.rows
      this.itemArr.forEach(v => {
        // console.log(v.descript)
        // 显示工单处理的照片
        // console.log(this.href)
        if (v.descript === null || v.descript === '') {
          v.descript = '暂无工单流水'
        }
        // v.wenzi = v.descript.split(',')[0]
        this.href = v.descript.split(':')[1]
        // console.log(this.href)
        this.pic = `http://120.55.234.38/api/getPicture?picture=${this.href}`
        // console.log(this.pic)
        // console.log(v.wenzi)
        // console.log(this.href)
      })
    },
    // 预览图片的预览功能
    async lookPicture() {
      // console.log(this.examineObj.three)
      // console.log(this.examineObj.three.indexOf('.') != -1)
      if (this.pic.indexOf('.') != -1) {
        // const res = await this.addDanger.get('')
        this.dangerHref = `http://120.55.234.38/api/getPicture?picture=${this.pic}`
        // console.log(this.dangerHref)
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
    // 分页的功能
    currentChange(currentPage) {
      // console.log(currentPage)
      this.currentPage = currentPage
      this.getAllInfo()
    },
    currentChange1(currentPage) {
      // console.log(currentPage)
      this.currentPage1 = currentPage
      this.getDangerInfo()
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  background-color: #fff;
  padding: 10px;
  .searchInput {
    width: 14%;
    margin-right: 10px;
  }
  .area {
    width: 16%;
    margin-right: 10px;
  }
}
/deep/.el-table th > .cell {
  text-align: left;
}
/deep/.el-table .cell {
  text-align: left;
  padding-left: 0px;
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
  border-bottom: 1px solid #e6e6e6;
}
.list {
  line-height: 24px;
  font-size: 18px;
  color: #303133;
  margin-top: 20px;
  margin-bottom: 10px;
}
.headerSpan {
  margin-left: 10px;
}
.searchInputDanger {
  width: 20%;
  margin: 0 10px;
}
.searchInputTime {
  width: 36%;
  margin: 0 10px;
}
.img {
  width: 90%;
  // height: 90%;
}
</style>

