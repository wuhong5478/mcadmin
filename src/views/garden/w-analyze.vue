<template>
  <div class="box">
    <!-- <toview :dialog="dialog" :form="form"></toview> -->
    <div class="box-header">
      <template>
        <el-select
          size="medium"
          @change="searchCycle"
          class="box-header-sel"
          v-model="value7"
          placeholder="请选择频率"
        >
          <el-option label="全部频率" value></el-option>
          <el-option label="日" value="日"></el-option>
          <el-option label="周" value="周"></el-option>
          <el-option label="月" value="月"></el-option>
          <el-option label="季度" value="季度"></el-option>
        </el-select>
      </template>
      <template>
        <el-date-picker
          v-model="value6"
          size="medium"
          type="datetimerange"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </template>
      <template>
        <el-input size="medium" class="box-header-inp" v-model="input6" placeholder="请输入任务名称"></el-input>
        <el-button size="medium" class="box-header-btn" @click="searchInfo" type="primary">查询</el-button>
      </template>
      <el-button size="medium" @click="dialogVisible = true" class="add" type="primary">新增</el-button>
    </div>
    <div class="box-main">
      <!-- 数据表格 -->
      <template>
        <el-table
          :header-cell-style="{background:'#FAFAFA'}"
          :data="tableData"
          style="width: 100%;padding-left:10px;"
          stripe
        >
          <el-table-column prop="planName" label="任务名称"></el-table-column>
          <el-table-column label="应完成时间">
            <template v-slot="{row}">
              <!-- <span>{{row.startTime.slice(0,11) + '至' + row.endTime.slice(0,11)}}</span> -->
              <span>{{row.startTime | dateFilter}}</span>
              <span>至</span>
              <span>{{row.endTime | dateFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cycle" label="频率"></el-table-column>
          <el-table-column label="人员">
            <template v-slot="{row}">
              <!-- <span>人员</span> -->
              <span>{{row.sysUser.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{row}">
              <span class="amendSpan" @click="amendInfo(row)">编辑/</span>
              <span class="deleteSpan" @click="deleteInfo(row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <div style="text-align: center">
          <el-pagination
            background
            layout="prev, pager, next,total"
            :total="total"
            :page-size="pageSize"
            :current-page.sync="currentPage"
            @current-change="currentChange"
          ></el-pagination>
        </div>
      </template>
      <!-- 新增计划的对话框 -->
      <el-dialog title="任务详情" :visible.sync="dialogVisible" width="70%">
        <span class="star">*&nbsp</span>
        <span>任务名称：</span>
        <el-input class="addInput" size="small" v-model="addinput" placeholder="请输入内容"></el-input>
        <el-form class="form">
          <el-form-item class="eightelform" label="选择频率:" required>
            <template>
              <el-select size="small" v-model="changevalue" placeholder="请选择频率">
                <!-- <el-option label="全部频率" value></el-option> -->
                <el-option label="日" value="日"></el-option>
                <el-option label="周" value="周"></el-option>
                <el-option label="月" value="月"></el-option>
                <el-option label="季度" value="季度"></el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item class="eightelform" label="选择园区:" required>
            <template>
              <el-select size="small" v-model="addArea" @change="changeArea" placeholder="请选择园区">
                <!-- <el-option label="全部频率" value></el-option> -->
                <el-option
                  v-for="item in optionsArea"
                  :key="item.value"
                  :label="item.areaName"
                  :value="item.areaId"
                ></el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="排班时间:" required>
            <el-date-picker
              size="small"
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="rightelform" label="对象选择:" required>
            <span class="chaxun" @click="dialogVisible1 = true ">选择巡查对象>></span>
          </el-form-item>
        </el-form>
        <p class="chengeP">人员选择</p>
        <div class="role">
          <el-button class="roleRight" size="small" @click="addGetRole" type="primary">查询</el-button>
          <el-input v-model="roleinput" size="small" class="roleInput" placeholder="请输入人员名称"></el-input>
          <template>
            <el-select
              class="roleRight"
              size="small"
              @change="addRole"
              v-model="value2"
              placeholder="请选择角色"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
          <template>
            <!-- @selection-change="handleSelectionChange1" -->
            <!-- :label="scope.row.sysUser" -->
            <el-table :data="tableData1" style="width: 100%">
              <el-table-column label="单选" width="65px">
                <template v-slot="scope">
                  <el-radio
                    v-model="radio"
                    :label="scope.row"
                    @change.native="getTemplateRow(scope.$index,scope.row)"
                  >&nbsp</el-radio>
                </template>
              </el-table-column>
              <!-- <el-table-column type="selection" width="55"></el-table-column> -->
              <el-table-column prop="name" label="人员名称"></el-table-column>
              <el-table-column prop="roleName" label="角色"></el-table-column>
              <el-table-column prop="phone" label="联系电话"></el-table-column>
            </el-table>
          </template>
          <!-- 分页 -->
          <div style="text-align: center">
            <el-pagination
              background
              layout="prev, pager, next,total"
              :total="total2"
              :page-size="pageSize"
              :current-page.sync="currentPage3"
              @current-change="currentChange3"
            ></el-pagination>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addPlanOk">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 新增对话框的巡检配置 -->
      <el-dialog title="选择维保对象" :visible.sync="dialogVisible1" width="60%">
        <!-- <span>这是一段信息</span> -->
        <el-button class="roleRight" size="small" type="primary" @click="getTypeName">查询</el-button>
        <el-input v-model="duixianginput" size="small" class="roleInput" placeholder="请输入检查对象名称"></el-input>
        <template>
          <el-select
            class="roleRight"
            size="small"
            @change="changeType"
            v-model="value3"
            placeholder="请选择类型"
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
        <template>
          <el-table
            :data="tableData2"
            style="width: 100%"
            :row-key="getRowKeys"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" :reserve-selection="true" align="center"></el-table-column>
            <el-table-column prop="qrcodeName" label="检查对象名称"></el-table-column>
            <el-table-column prop="name" label="检查对象类型"></el-table-column>
            <el-table-column prop="installAddress" label="所属部位"></el-table-column>
          </el-table>
        </template>
        <!-- 分页器 -->
        <div style="text-align: center">
          <el-pagination
            background
            layout="prev, pager, next,total"
            :total="total1"
            :page-size="pageSize"
            :current-page.sync="currentPage1"
            @current-change="currentChange1"
          ></el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑的对话框 -->
      <el-dialog title="任务详情" :visible.sync="dialogVisible3" width="70%">
        <span class="star">*&nbsp</span>
        <span>任务名称：</span>
        <el-input class="addInput" size="small" v-model="amendinput" placeholder="请输入人员名称"></el-input>
        <el-form class="form">
          <el-form-item class="eightelform" label="选择频率:" required>
            <template>
              <el-select size="small" v-model="amendvalue" placeholder="请选择频率">
                <!-- <el-option label="全部频率" value></el-option> -->
                <el-option label="日" value="日"></el-option>
                <el-option label="周" value="周"></el-option>
                <el-option label="月" value="月"></el-option>
                <el-option label="季度" value="季度"></el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item class="eightelform" label="选择园区:" required>
            <template>
              <el-select
                size="small"
                v-model="amendArea"
                @change="amendchangeArea"
                placeholder="请选择园区"
              >
                <!-- <el-option label="全部频率" value></el-option> -->
                <el-option
                  v-for="item in amendoptionsArea"
                  :key="item.value"
                  :label="item.areaName"
                  :value="item.areaId"
                ></el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="排班时间:" required>
            <el-date-picker
              v-model="value4"
              type="datetimerange"
              range-separator="至"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="rightelform" label="对象选择:" required>
            <!-- 4 -->
            <span class="chaxun" @click="huixian">选择巡查对象>></span>
          </el-form-item>
        </el-form>
        <p class="chengeP">人员选择</p>
        <div class="role">
          <el-button class="roleRight" size="small" type="primary" @click="amendRoleName">查询</el-button>
          <el-input v-model="amendroleinput" size="small" class="roleInput" placeholder="请输入检查对象名称"></el-input>
          <template>
            <el-select
              class="roleRight"
              size="small"
              @change="amendChangeRole"
              v-model="value5"
              placeholder="请选择角色"
            >
              <el-option
                v-for="item in amendoptions"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
          <template>
            <!-- @selection-change="handleSelectionChange1" -->
            <el-table :data="tableData3" style="width: 100%">
              <el-table-column label="单选" width="65px">
                <template v-slot="scope">
                  <el-radio
                    v-model="radio1"
                    :label="scope.row"
                    @change.native="getTemplateRow1(scope.$index,scope.row)"
                  >&nbsp</el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="人员名称"></el-table-column>
              <el-table-column prop="roleName" label="角色"></el-table-column>
              <el-table-column prop="phone" label="联系电话"></el-table-column>
            </el-table>
          </template>
          <!-- 分页 -->
          <div style="text-align: center">
            <el-pagination
              background
              layout="prev, pager, next,total"
              :total="total2"
              :page-size="pageSize"
              :current-page.sync="currentPage3"
              @current-change="currentChange3"
            ></el-pagination>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="amendPlanBtn">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑对话框中选择巡查对象 -->
      <el-dialog title="选择维保对象" :visible.sync="dialogVisible4" width="60%">
        <!-- <span>这是一段信息</span> -->
        <el-button class="roleRight" size="small" type="primary" @click="amendGetName">查询</el-button>
        <el-input v-model="amendduixianginput" size="small" class="roleInput" placeholder="请输入内容"></el-input>
        <template>
          <el-select
            class="roleRight"
            size="small"
            @change="amendChangeType"
            v-model="amendrolevalue"
            placeholder="请选择类型"
          >
            <el-option
              v-for="item in options10"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
        <template>
          <el-table
            :data="tableData4"
            style="width: 100%"
            ref="multipleTable"
            :row-key="getRowKeys"
            @selection-change="handleSelectionChange1"
          >
            <el-table-column type="selection" :reserve-selection="true" align="center"></el-table-column>
            <el-table-column prop="qrcodeName" label="检查对象名称"></el-table-column>
            <el-table-column prop="name" label="检查对象类型"></el-table-column>
            <el-table-column prop="installAddress" label="所属部位"></el-table-column>
          </el-table>
        </template>
        <!-- 分页器 -->
        <div style="text-align: center">
          <el-pagination
            background
            layout="prev, pager, next,total"
            :total="total1"
            :page-size="pageSize"
            :current-page.sync="currentPage1"
            @current-change="currentChange2"
          ></el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible4 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible4 = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
// import querystring from 'querystring'

import { setTimeout } from 'timers'
export default {
  // 注册局部过滤器格式化时间
  filters: {
    dateFilter(value) {
      return moment(value).format('YYYY-MM-DD')
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: {
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }
      },
      getRowKeys(row) {
        return row.id
      },
      amendinput: '', // 编辑的输入框
      amendvalue: '', // 编辑的频率选择
      value4: [], // 编辑的时间选择
      amendroleinput: '', // 编辑对话框中输入框
      value5: '', // 编辑框中的选择角色下拉菜单
      radio: '1',
      radio1: '1',
      value1: '', // 新增对话框日期选择
      // 数据表格
      tableData: [],
      tableData1: [], // 新增对话框的角色列表
      tableData2: [], // 查询巡检对象数据
      tableData3: [], // 编辑框中的角色列表
      tableData4: [], // 编辑框中的巡检配置
      amendduixianginput: '', // 编辑框巡检对象里的搜索框
      amendrolevalue: '', // 编辑框巡检对象里的下拉菜单
      options10: [
        { label: '建筑防火分隔设施', value: '1' },
        { label: '火灾自动报警 系统维保口其他', value: '2' },
        { label: '防烟、排烟设施维保', value: '3' },
        { label: '水系统维保', value: '4' },
        { label: '消防电气和通讯设施维保', value: '5' },
        { label: '气体灭火系统维保', value: '6' }
      ], // 编辑框巡检对象的下拉菜单数据数组
      pageNo: 1,
      pageSize: 10,
      total: 0, // 巡检任务配置
      total1: 0, // 角色列表
      total2: 0,
      currentPage: 1, // 进入页面的
      currentPage1: 1, // 新增巡检
      currentPage2: 1, // 编辑巡检
      currentPage3: 1, // 角色列表
      // 新增计划的对话框
      dialogVisible: false, // 新增的对话框
      dialogVisible1: false, // 查询巡查对象的对话框
      dialogVisible3: false, // 编辑对话框
      dialogVisible4: false, // 编辑对话框选择巡检对象
      addinput: '', //新增对话中的输入框
      changevalue: '', // 新增对话框频率选择
      addArea: '', // 新增对话框中的园区选择
      options: [{ name: '全部角色', id: '' }], // 新增对话框的角色选择数据
      amendoptions: [{ name: '全部角色', id: '' }], // 编辑对话框下的下拉菜单
      value2: '', // 角色选择的绑定数据
      options2: [
        // { label: '所有类型', value: '' },
        { label: '建筑防火分隔设施', value: '1' },
        { label: '火灾自动报警 系统维保口其他', value: '2' },
        { label: '防烟、排烟设施维保', value: '3' },
        { label: '水系统维保', value: '4' },
        { label: '消防电气和通讯设施维保', value: '5' },
        { label: '气体灭火系统维保', value: '6' }
      ], // 新增选择巡检类型的绑定数据
      value3: '', // 新增选择巡检类型的下拉菜单
      duixianginput: '',
      roleinput: '', // 角色通过关键字搜索绑定数据
      multipleSelection: [],
      multipleSelection1: [],
      // 新增计划所需数据
      addPlan: {
        cycle: '', // 频率,
        endTime: '', // 结束时间
        personId: '', // 责任人id
        planName: '', // 任务名称
        startTime: '', // 开始时间
        IDS: '',
        parkid: '' // 园区id
      },
      // 渲染巡检任务列表所需参数
      obj: {
        cycle: '',
        endTime: '',
        pageNo: '',
        pageSize: '',
        planName: '',
        startTime: '',
        deptId: ''
      },
      // 编辑所需参数
      amendPlan: {
        cycle: '', // 频率,
        endTime: '', // 结束时间
        personId: '', // 责任人id
        planName: '', // 任务名称
        startTime: '', // 开始时间
        IDS: '',
        id: '',
        parkid: ''
      },
      // 查询角色信息所需参数
      roleObj: {
        roleId: '',
        name: '',
        pageNo: '',
        pageSize: '',
        deptId: ''
      },
      // 查询维保配置的所需数据
      weibaoObj: {
        pageNo: '',
        pageSize: '',
        parkid: '', //园区id
        qrcodeName: '', // 维保对象名称
        otherOption: '' // 类型选择
      },
      // 回显巡检配置数组
      echoArr: [],
      value6: '', // 筛选条件的时间选择
      input6: '', // 筛选条件的任务名称输入框
      value7: '', // 筛选条件选择频率的下拉框
      planId: '', // 编辑巡检计划时判断用户有没有进行角色id更改
      deptId: '', // 进入页面保存用户带过来的机构id
      optionsArea: [], // 渲染新增园区的数组
      amendoptionsArea: [], // 渲染编辑园区的数组
      amendArea: '' // 编辑对话框中的园区选择绑定的值
    }
  },
  created() {
    this.deptId = this.getCookie('dept_id')
    this.getArea()
    this.getAllInfo()
    this.getRole()
    this.getRoleName()
    this.getDeviceInfo()
  },
  mounted() {},
  methods: {
    // 进入页面获取所有的园区
    async getArea() {
      const res = await this.$request.map.getAllArea()
      // console.log(res)
      this.optionsArea = res.data
      this.amendoptionsArea = res.data
    },
    // 获取用户带过来的deptid
    getCookie(cookieName) {
      var strCookie = document.cookie
      var arrCookie = strCookie.split('; ')
      for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split('=')
        if (cookieName == arr[0]) {
          return arr[1]
        }
      }
      return ''
    },
    // 进入页面渲染所有的巡检任务配置
    getAllInfo() {
      this.obj.deptId = this.deptId
      this.obj.cycle = this.value7
      this.obj.planName = this.input6
      this.obj.startTime = this.value6[0]
      this.obj.endTime = this.value6[1]
      this.obj.pageNo = this.currentPage
      this.obj.pageSize = this.pageSize
      this.addDanger
        .get('/maintenancerountingplan/getMaintenanceRountingPlanByTime', {
          params: this.obj
        })
        .then(res => {
          // console.log(res)
          if (res.data.data === null) {
            this.tableData = []
            this.total = 0
            return
          }
          this.tableData = res.data.data.rows
          this.total = res.data.data.totalCount
        })
    },
    // 查询系统角色渲染到新增对话框角色选择中
    getRole() {
      this.addDanger
        .get('/sysrole/getrolelist', {
          params: {
            pageNo: this.pageNo,
            pageSize: 1000
          }
        })
        .then(res => {
          // this.options = res.data.data.rows
          res.data.data.rows.forEach(v => {
            this.options.push(v)
            this.amendoptions.push(v)
          })
          // this.amendoptions = res.data.data.rows
        })
    },
    // 查询角色人员
    getRoleName() {
      this.roleObj.deptId = this.deptId
      this.roleObj.pageNo = this.currentPage3
      this.roleObj.pageSize = this.pageSize
      this.addDanger
        .get('/sysuser/getuserinfolist', {
          params: this.roleObj
        })
        .then(res => {
          // console.log(res.data.data)
          this.tableData1 = res.data.data.rows
          this.tableData3 = res.data.data.rows
          this.total2 = res.data.data.totalCount
        })
    },
    // 查询维保对象设备
    getDeviceInfo() {
      this.weibaoObj.pageNo = this.currentPage1
      this.weibaoObj.pageSize = this.pageSize
      // this.weibaoObj.parkid = this.addArea
      // this.weibaoObj.qrcodeName = this.duixianginput
      // this.weibaoObj.natureOption = this.pageSize
      return this.addDanger
        .get('/maintenanceTrountQrcode/getMaintenanceTrountQrcodefoList', {
          params: this.weibaoObj
        })
        .then(res => {
          // console.log(res)
          res.data.data.rows.forEach(v => {
            console.log(v.natureOption)
            if (v.otherOption === '1') {
              v.name = '建筑防火分隔设施'
            }
            if (v.otherOption === '2') {
              v.name = '火灾自动报警 系统维保口其他'
            }
            if (v.otherOption === '3') {
              v.name = '防烟、排烟设施维保'
            }
            if (v.otherOption === '4') {
              v.name = '水系统维保'
            }
            if (v.otherOption === '5') {
              v.name = '消防电气和通讯设施维保'
            }
            if (v.otherOption === '6') {
              v.name = '气体灭火系统维保'
            }
          })
          this.tableData2 = res.data.data.rows
          this.tableData4 = res.data.data.rows
          this.total1 = res.data.data.totalCount
        })
    },
    // 切换新增对话框中的园区选择实现筛选
    changeArea(value) {
      console.log(value)
      this.weibaoObj.parkid = value
      this.getDeviceInfo()
    },
    // 切换编辑对话中的园区进行筛选
    amendchangeArea(value) {
      this.amendPlan.parkid = value
      this.weibaoObj.parkid = value
      this.getDeviceInfo()
    },
    // 新增巡检对象的多选
    async handleSelectionChange(val) {
      console.log(val)
      const arr = []
      val.forEach(v => {
        arr.push(v.id)
      })
      //   console.log(arr)
      this.addPlan.IDS = arr
      this.addPlan.IDS = this.addPlan.IDS.join(',')
    },
    // 编辑巡检的多选
    async handleSelectionChange1(val) {
      console.log('选中的' + val.length, val)
      this.multipleSelection1 = val
      const arr = []
      val.forEach(v => {
        arr.push(v.id)
      })
      //   console.log(arr)
      this.addPlan.IDS = arr
      this.addPlan.IDS = this.addPlan.IDS.join(',')
    },
    //新增获取选中数据
    getTemplateRow(index, row) {
      console.log(row)
      this.addPlan.personId = row.id
      console.log(this.addPlan.personId)
    },
    //编辑获取选中数据
    getTemplateRow1(index, row) {
      console.log(row)
      this.planId = row.roleId
      console.log(this.planId)
    },
    // 点击新增对话框的确认实现功能
    async addPlanOk() {
      this.addPlan.parkid = this.addArea
      this.addPlan.planName = this.addinput
      this.addPlan.cycle = this.changevalue
      this.addPlan.endTime = this.value1[1]
      this.addPlan.startTime = this.value1[0]
      console.log(this.addPlan)
      console.log(this.$request)
      console.log(this.$request.weibaoPlan)
      if (
        this.addPlan.endTime === undefined &&
        this.addPlan.startTime === undefined
      ) {
        this.$message({
          type: 'error',
          message: '排班时间不能为空',
          duration: 1000
        })
        return
      }
      console.log(this.addPlan)
      for (let key in this.addPlan) {
        console.log(this.addPlan[key])
        if (this.addPlan[key] === '') {
          this.$message({
            type: 'error',
            message: '请将信息填写完整',
            duration: 1000
          })
          return
        }
      }
      await this.$request.weibaoPlan.addPlan(this.addPlan)
      await this.$message({
        type: 'success',
        message: '新增成功',
        duration: 1000
      })
      await this.getAllInfo()
      this.dialogVisible = false
      // 清空已选择数据
      this.addinput = ''
      this.changevalue = ''
      this.value1 = []
      // this.multipleSelection = []
    },
    // 删除巡检计划  ok
    async deleteInfo(row) {
      console.log(row)
      try {
        await this.$confirm('你确定要删除该维保计划吗？', '温馨提示', {
          type: 'warning'
        })
        const res = await this.$request.weibaoPlan.deleteInfo({
          id: row.id
        })
        console.log(res)
        await this.$message({
          type: 'success',
          message: '删除成功',
          duration: 1000
        })
        await this.getAllInfo()
        // this.total = showRes.data.length
      } catch (e) {
        this.$message({
          type: 'info',
          message: '取消删除',
          duration: 1000
        })
      }
    },
    // 多选框的回显
    toggleSelection(rows) {
      if (rows) {
        setTimeout(() => {
          rows.forEach(row => {
            // console.log();
            this.$refs.multipleTable.toggleRowSelection(row, true)
          })
        }, 50)
      }
    },

    // 编辑巡检计划
    async amendInfo(row) {
      this.dialogVisible3 = true
      console.log(row)
      // 根据园区id查询园区名称回显到下拉菜单中
      const resName = await this.$request.weibaoPlan.getAreaName({
        areaId: row.parkId
      })
      console.log(resName)
      this.amendArea = resName.data.areaName
      // 对用户有无更改角色id进行判断
      if (this.planId) {
        this.amendPlan.personId = this.planId
      } else {
        this.amendPlan.personId = row.personId
      }
      this.radio = row
      this.value4 = []
      this.amendinput = row.planName
      this.amendvalue = row.cycle
      this.value4.push(row.startTime)
      this.value4.push(row.endTime)
      this.value4[1] = row.endTime
      this.amendPlan.id = row.id
      this.amendPlan.parkid = row.parkId
      // 根据维保计划id获取巡检配置
      const res = await this.$request.weibaoPlan.getPlanInfo({
        id: row.id
      })
      // console.log(res)
      this.echoArr = res.data
    },
    // 点击编辑框巡查对象实现回显
    changePage() {
      const res = this.echoArr
      console.log(this.echoArr)
      console.log(this.tableData4)
      if (res) {
        let rows = []
        this.tableData4.forEach(v => {
          // console.log()
          this.echoArr.forEach(i => {
            // console.log(v.id, i.id)
            if (v.id === i.id) {
              rows.push(v)
            }
          })
        })
        console.log('id相同的', rows)
        // this.toggleSelection(rows)
        this.toggleSelection(rows)
      }
    },
    huixian() {
      this.dialogVisible4 = true
      this.changePage()
    },
    // 切换新增维保类型实现功能 ok
    async changeType(value) {
      console.log(value)
      this.weibaoObj.otherOption = value
      this.getDeviceInfo()
      // const res = await this.addDanger.get(
      //   '/maintenanceTrountQrcode/getMaintenanceTrountQrcodefootherOption',
      //   {
      //     params: {
      //       natureOption: value,
      //       pageNo: this.currentPage1,
      //       pageSize: this.pageSize
      //     }
      //   }
      // )
      // console.log(res)
      // res.data.data.rows.forEach(v => {
      //   console.log(v.natureOption)
      //   if (v.natureOption === '1') {
      //     v.name = '建筑防火分隔设施'
      //   }
      //   if (v.natureOption === '2') {
      //     v.name = '火灾自动报警 系统维保口其他'
      //   }
      //   if (v.natureOption === '3') {
      //     v.name = '防烟、排烟设施维保'
      //   }
      //   if (v.natureOption === '4') {
      //     v.name = '水系统维保'
      //   }
      //   if (v.natureOption === '5') {
      //     v.name = '消防电气和通讯设施维保'
      //   }
      //   if (v.natureOption === '6') {
      //     v.name = '气体灭火系统维保'
      //   }
      // })
      // this.tableData2 = res.data.data.rows
      // this.total1 = res.data.data.totalCount
    },
    // 点击新增的查询实现筛选角色 ok
    addGetRole() {
      console.log(this.roleinput)
      this.roleObj.name = this.roleinput
      this.getRoleName()
    },
    // 切换编辑巡检类型实现筛选 ok
    async amendChangeType(value) {
      console.log(value)
      this.weibaoObj.natureOption = value
      this.getDeviceInfo()
      // const res = await this.addDanger.get(
      //   '/maintenanceTrountQrcode/getMaintenanceTrountQrcodefootherOption',
      //   {
      //     params: {
      //       natureOption: value,
      //       pageNo: this.currentPage1,
      //       pageSize: this.pageSize
      //     }
      //   }
      // )
      // this.tableData4 = res.data.data.rows
      // this.total1 = res.data.data.totalCount
    },
    // 点击编辑的查询筛选角色 ok
    amendRoleName() {
      console.log(this.amendroleinput)
      this.addDanger
        .get('/sysuser/getuserinfolist', {
          params: {
            pageNo: this.pageNo,
            pageSize: 1000,
            name: this.amendroleinput
          }
        })
        .then(res => {
          // console.log(res.data.data)
          // this.tableData1 = res.data.data.rows
          this.tableData3 = res.data.data.rows
          this.total2 = res.data.data.totalCount
        })
    },
    // 根据新增巡检名称筛选 ok
    async getTypeName() {
      this.weibaoObj.qrcodeName = this.duixianginput
      this.getDeviceInfo()
      // const res = await this.addDanger.get(
      //   '/maintenanceTrountQrcode/getMaintenanceTrountQrcodefoName',
      //   {
      //     params: {
      //       qrcodeName: this.duixianginput,
      //       pageNo: this.currentPage1,
      //       pageSize: this.pageSize
      //     }
      //   }
      // )
      // console.log(res)
      // res.data.data.rows.forEach(v => {
      //   console.log(v.natureOption)
      //   if (v.natureOption === '1') {
      //     v.name = '建筑防火分隔设施'
      //   }
      //   if (v.natureOption === '2') {
      //     v.name = '火灾自动报警 系统维保口其他'
      //   }
      //   if (v.natureOption === '3') {
      //     v.name = '防烟、排烟设施维保'
      //   }
      //   if (v.natureOption === '4') {
      //     v.name = '水系统维保'
      //   }
      //   if (v.natureOption === '5') {
      //     v.name = '消防电气和通讯设施维保'
      //   }
      //   if (v.natureOption === '6') {
      //     v.name = '气体灭火系统维保'
      //   }
      // })
      // this.tableData2 = res.data.data.rows
      // this.total1 = res.data.data.totalCount
    },
    // 根据编辑巡检名称筛选 ok
    async amendGetName() {
      this.weibaoObj.planName = this.amendduixianginput
      this.getDeviceInfo()
      // const res = await this.addDanger.get(
      //   '/maintenanceTrountQrcode/getMaintenanceTrountQrcodefoName',
      //   {
      //     params: {
      //       qrcodeName: this.amendduixianginput,
      //       pageNo: this.currentPage1,
      //       pageSize: this.pageSize
      //     }
      //   }
      // )
      // this.tableData4 = res.data.data.rows
      // this.total1 = res.data.data.totalCount
    },
    // 切换新增角色实现筛选
    addRole(value) {
      console.log(value)
      this.roleObj.roleId = value
      this.getRoleName()
    },
    // 切换编辑的角色实现筛选
    amendChangeRole(value) {
      this.addDanger
        .get('/sysuser/getuserinfolist', {
          params: {
            pageNo: this.pageNo,
            pageSize: 1000,
            roleId: value
          }
        })
        .then(res => {
          console.log(res.data.data)
          this.tableData3 = res.data.data.rows
          this.total2 = res.data.data.totalCount
        })
    },
    // 点击编辑实现修改功能
    async amendPlanBtn() {
      if (this.value4 === null || this.amendinput === '') {
        this.$message({
          type: 'error',
          message: '请将信息填写完整',
          duration: 1000
        })
        return
      }
      this.amendPlan.planName = this.amendinput
      this.amendPlan.cycle = this.amendvalue
      // console.log(this.value4)
      this.amendPlan.startTime = this.value4[0]
      this.amendPlan.endTime = this.value4[1]
      console.log(this.amendPlan)
      // this.amendPlan.IDS = this.multipleSelection1
      const arr = []
      this.multipleSelection1.forEach(v => {
        arr.push(v.id)
      })
      //   console.log(arr)
      this.amendPlan.IDS = arr
      this.amendPlan.IDS = this.amendPlan.IDS.join(',')
      console.log(this.amendPlan)
      const res = await this.$request.weibaoPlan.amendPlanInfo(this.amendPlan)
      console.log(res)
      await this.$message({
        type: 'success',
        message: '修改成功',
        duration: 1000
      })
      this.dialogVisible3 = false
      this.getAllInfo()
    },
    // 根据频率进行筛选
    async searchCycle(value) {
      console.log(value)
      this.obj.cycle = value
      this.getAllInfo()
    },
    // 点击搜索实现筛选功能
    async searchInfo() {
      this.obj.planName = this.input6
      this.obj.startTime = this.value6[0]
      this.obj.endTime = this.value6[1]
      console.log(this.obj.planName)
      this.getAllInfo()
    },
    // 分页的功能 进入页面
    async currentChange(currentPage) {
      this.currentPage = currentPage
      console.log(this.obj)
      // this.searchCycle()
      await this.getAllInfo()
    },
    // 新增
    currentChange1(currentPage) {
      // console.log(currentPage)
      console.log(this.value3)
      this.currentPage1 = currentPage
      this.getDeviceInfo()
    },
    currentChange3(currentPage) {
      // console.log(currentPage)
      this.currentPage3 = currentPage
      this.getRoleName()
    },
    // 编辑
    async currentChange2(currentPage) {
      if (this.amendrolevalue) {
        this.currentPage1 = currentPage
        this.amendChangeType(this.amendrolevalue)
        this.changePage()
      } else {
        this.currentPage1 = currentPage
        await this.getDeviceInfo()
        this.changePage()
        // console.log(this.echoArr)
      }
      // console.log(currentPage)
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  background-color: #fff;
  user-select: none;
}
.box-header {
  overflow: hidden;
  padding: 20px 10px;
  height: 20px;
  .add {
    float: right;
    // width: 5%;
  }
}
.deleteSpan {
  color: #909399;
  cursor: pointer;
}
.form {
  overflow: hidden;
  border-bottom: 1px solid #ccc;
}
.elform {
  width: 50%;
  float: left;
}
.addInput {
  width: 20%;
  margin-bottom: 20px;
}
.chengeP {
  margin-top: 20px;
}
.roleInput {
  width: 20%;
  float: right;
}
.role {
  overflow: hidden;
}
.roleRight {
  float: right;
  margin-right: 10px;
}
.chaxun {
  color: #409eff;
  cursor: pointer;
}
.amendSpan {
  cursor: pointer;
  color: #409eff;
}
/deep/.el-table th > .cell {
  text-align: left;
}
/deep/.el-table .cell {
  text-align: left;
  padding-left: 0px;
}
.box-header-sel {
  width: 12%;
  margin-right: 10px;
}
.box-header-inp {
  width: 15%;
  margin-left: 10px;
}
.star {
  color: #f56c6c;
}
.box-header-btn {
  margin-left: 10px;
}
</style>