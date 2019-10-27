<template>
  <div class="boxer">
    <el-header style="background:#fff;padding-top:10px;">
      <template>
        <el-select
          placeholder="请选择所属园区"
          @change="changeArea"
          v-model="input2"
          style="width:16%;"
          size="medium"
        >
          <el-option label="全部园区" value></el-option>
          <el-option label="鹏辉产业园" value="1109"></el-option>
          <el-option label="国际会展中心一期" value="1110"></el-option>
          <el-option label="国际会展中心二期" value="1106"></el-option>
          <el-option label="中大产业园" value="1107"></el-option>
          <el-option label="润丰产业园" value="1108"></el-option>
        </el-select>
      </template>
      <template>
        <el-input
          v-model="input1"
          placeholder="请输入事件名称"
          style="width:16%;margin:0 10px ;"
          size="medium"
          @blur="btn"
        ></el-input>
        <el-button size="medium" type="primary" @blur="btn">查询</el-button>
      </template>
      <template>
        <el-button size="medium" type="primary" style="float:right;" @click="xz">+新增</el-button>
      </template>
    </el-header>

    <el-main style="background:#fff">
      <!-- :data="tableData.slice((currentPage-1) * pagesize,currentPage * pagesize)" -->
      <template>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column label="事件名称">
            <template v-slot="{row}">
              <span>{{row.noticeType}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="parkId" label="所属园区" :formatter="getArea"></el-table-column>
          <el-table-column prop="deptId" label="机构组织" :formatter="getDept"></el-table-column>
          <el-table-column label="推送人员">
            <template v-slot="scope">
              <span @click="handleMan(scope.row)" style="color:#0080d0;cursor: pointer;">查看</span>
            </template>
          </el-table-column>
          <el-table-column prop="noticeMode" label="推送方式" :formatter="getType"></el-table-column>
          <el-table-column prop="pushTimeNew" label="推送时间"></el-table-column>
          <el-table-column prop="pushFrequencyNew" label="发送频率"></el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <span @click="handleEdit(scope.row)" style="color:#0080d0;cursor: pointer;">编辑</span>
              <span style="cursor:pointer">/</span>
              <span
                size="medium"
                type="danger"
                @click="handleDelete(scope.row)"
                style="color:#909399;cursor: pointer;"
              >删除</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
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
    </el-main>
    <!-- 新增弹窗 -->
    <el-dialog title="新增" :visible.sync="dialogVisible2" width="50%">
      <el-form v-model="xzlist" ref="ruleForm">
        <el-form-item label="事件名称:" required :label-width="formLabelWidth">
          <el-select v-model="xzlist.noticeType" placeholder="请选择">
            <el-option
              v-for="item in noticeType"
              :key="item.code"
              :label="item.msg"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推送机构:" required :label-width="formLabelWidth">
          <el-select @change="changedept" v-model="xzlist.deptId" placeholder="请选择推送机构">
            <el-option v-for="item in jglist1" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属园区:" required :label-width="formLabelWidth">
          <el-checkbox-group v-model="checkListAdd">
            <el-checkbox
              v-for="item in addOptionArea"
              :key="item.areaId"
              :label="item.areaId"
            >{{item.areaName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="推送时间:" required :label-width="formLabelWidth">
          <el-select v-model="xzlist.pushTime" placeholder="请选择推送时间">
            <el-option
              v-for="item in pushTime"
              :key="item.code"
              :label="item.msg"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发送频率:" required :label-width="formLabelWidth">
          <el-select v-model="xzlist.pushFrequency" placeholder="请选择发送频率">
            <el-option label="1次" value="1"></el-option>
            <el-option label="2次" value="2"></el-option>
            <el-option label="3次" value="3"></el-option>
            <el-option label="4次" value="4"></el-option>
            <el-option label="5次" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理人员:" required :label-width="formLabelWidth">
          <template>
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedPeople">
              <el-checkbox v-for="item in allPeople" :key="item.id" :label="item">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
        <el-form-item label="推送方式:" required :label-width="formLabelWidth">
          <el-checkbox-group v-model="checkListAdd1">
            <el-checkbox
              v-for="item in noticeMode1"
              :key="item.code"
              :label="item.code"
            >{{item.msg}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="addDingLink" placeholder="获取钉钉群推送方式请输入机器人链接(必填)"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2= false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑事件" :visible.sync="dialogVisible" width="50%">
      <el-form v-model="bjbj">
        <el-form-item label="事件名称" required :label-width="formLabelWidth">
          <el-select placeholder="请选择事件名称" v-model="bjbj.noticeType">
            <el-option
              v-for="item in amendNoticeType"
              :key="item.code"
              :label="item.msg"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推送机构:" required :label-width="formLabelWidth">
          <el-select v-model="bjbj.deptId" @change="changeDeptAmend" placeholder="请选择推送机构">
            <el-option v-for="item in jglist2" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属园区" :label-width="formLabelWidth">
          <el-checkbox-group v-model="checkList1">
            <el-checkbox
              v-for="item in amendOptionArea"
              :key="item.areaId"
              :label="item.areaId"
            >{{item.areaName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="推送时间" required :label-width="formLabelWidth">
          <el-select v-model="bjbj.pushTime" placeholder="请选择所属园区">
            <el-option
              v-for="item in amendPushTime"
              :key="item.code"
              :label="item.msg"
              :value="item.code"
            ></el-option>
          </el-select>
          <span>(*距离事件发生时间)</span>
        </el-form-item>
        <el-form-item label="推送频率" required :label-width="formLabelWidth">
          <el-select v-model="bjbj.pushFrequency" placeholder="请选择推送频率">
            <el-option label="1次" value="1"></el-option>
            <el-option label="2次" value="2"></el-option>
            <el-option label="3次" value="3"></el-option>
            <el-option label="4次" value="4"></el-option>
            <el-option label="5次" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理人员" required :label-width="formLabelWidth">
          <template>
            <el-checkbox
              :indeterminate="isIndeterminate1"
              v-model="checkAll1"
              @change="handleCheckAllChange1"
            >全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedPeople1">
              <el-checkbox v-for="item in allPeople1" :key="item.id" :label="item">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
        <el-form-item label="推送方式:" required :label-width="formLabelWidth">
          <el-checkbox-group v-model="checkList">
            <el-checkbox
              v-for="item in amendNoticeMode"
              :key="item.code"
              :label="item.code"
            >{{item.msg}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="amendDing" placeholder="获取钉钉群推送方式请输入机器人链接(必填)"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="amend">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 推送人员的对话框 -->
    <el-dialog title="推送人员" :visible.sync="dialogVisible3" width="40%">
      <!-- <span>这是一段信息</span> -->
      <span class="userName" v-for="(item,index) in userName" :key="item.index">
        <span class="round"></span>
        <span class="name">{{item}}</span>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      noticeMode1: [],
      amendNoticeMode: [],
      amendNoticeType: [],
      noticeType: [],
      pushTime: [],
      amendPushTime: [],
      amendDing: '',
      addDingLink: '',
      amendPl: '',
      amendTime: '',
      amendFire: '',
      dialogVisible3: false,
      dialogVisible2: false,
      amendDept: '',
      addOptionArea: [],
      amendOptionArea: [],
      show: false,
      xzlist: {
        parkId: '',
        userId: '',
        noticeMode: '',
        dingLink: ''
      },
      bjbj: {
        parkId: '',
        userId: '',
        noticeMode: '',
        dingLink: '',
        pushTime: '',
        pushFrequency: '',
        id: '',
        noticeType: '',
        deptId: ''
      },
      jglist: [],
      jglist1: [],
      jglist2: [],
      parkid: '',
      deleteobj: {},
      checkAll: false,
      checkAll1: false,
      isIndeterminate: true,
      isIndeterminate1: true,
      checkList: [],
      checkList1: [],
      checkListAdd1: [],
      checkListAdd: [],
      formLabelWidth: '120px',
      dialogVisible: false,
      input1: '',
      input2: '',
      input3: '',
      total: 0,
      pagesize: 10,
      currentPage: 1,
      tableData: [],
      checkedPeople: [],
      checkedPeople1: [],
      allPeople: [],
      allPeople1: [],
      obj: {
        deptId: '',
        noticeType: '',
        parkId: ''
      },
      noticeMode: '',
      userName: [],
      deptList: {}
    }
  },
  mounted() {
    var that = this
    that.getTable()

    that.$request.tz.getdeptlist().then(res => {
      console.log(res.data.rows)
      this.deptList = this.$utils.getMap(res.data.rows, 'id', 'name')
      // console.log('牛哦',res.data.rows)
      that.jglist = res.data.rows
      that.jglist.forEach(v => {
        // console.log(v.name)
        that.jglist1.push(v)
        that.jglist2.push(v)
      })
    })
  },
  created() {
    this.getAllArea()
    this.getTypeList()
  },
  methods: {
    // 获取所有通知方式配置
    async getTypeList() {
      const res = await this.$request.tz.getTypeList()
      this.noticeType = res.data.noticeTypes
      this.amendNoticeType = res.data.noticeTypes
      this.pushTime = res.data.noticeTimes
      this.amendPushTime = res.data.noticeTimes
      this.noticeMode1 = res.data.noticeModes
      this.amendNoticeMode = res.data.noticeModes
    },
    // 获取所有的园区
    async getAllArea() {
      const res = await this.$request.health.getAreaAll()
      // this.addOptionArea = res.data
      // this.amendOptionArea = res.data
    },
    // 切换新增对话中的机构筛选处理人和园区
    async changedept(value) {
      console.log(value)
      const res = await this.$request.tz.getPeople({
        deptIds: value
      })
      const resArea = await this.$request.tz.getArea({
        deptId: value
      })
      console.log(resArea)
      this.allPeople = res
      this.addOptionArea = resArea.data
      // this.amendOptionArea = resArea.data
      // console.log(this.allPeople);
    },
    // 切换编辑对话框中的机构筛选处理人
    async changeDeptAmend(value) {
      this.checkList1 = []
      this.checkedPeople1 = []
      const res = await this.$request.tz.getPeople({
        deptIds: value
      })
      const resArea = await this.$request.tz.getArea({
        deptId: value
      })
      this.allPeople1 = res
      this.amendOptionArea = resArea.data
    },
    handleMan(row) {
      this.userName = []
      console.log(row)
      let arr = row.userId.split(',')
      console.log(arr)
      arr.forEach(async v => {
        const res = await this.$request.tz.getUserName({
          params: {
            id: v
          }
        })
        console.log(res.data.name)
        this.userName.push(res.data.name)
        console.log(this.userName)
      })
      this.dialogVisible3 = true
    },
    // 获取所有机构
    getlist() {
      var that = this
      console.log(that)
    },
    btn() {
      var that = this
      // console.log()
      var dept = this.getCookie('dept_id')
      that.$request.tz
        .selectNotice({ deptId: dept, noticeType: that.input1 })
        .then(res => {
          that.tableData = res.data
          that.currentPage
          that.pageSize
        })
    },
    getTable() {
      this.obj.deptId = this.getCookie('dept_id')
      this.$request.tz.selectNotice(this.obj).then(res => {
        this.tableData = res.data
        this.noticeMode = res.data.noticeMode
        this.total = res.data.length
        this.tableData.forEach(v => {
          // console.log(v.noticeType)
          if (v.noticeType === '1') {
            v.noticeType = '培训'
          }
          if (v.noticeType === '2') {
            v.noticeType = '隐患分析提示管理'
          }
          if (v.noticeType === '3') {
            v.noticeType = '火灾报警'
          }
          if (v.noticeType === '4') {
            v.noticeType = '火警报警'
          }
          if (v.noticeType === '5') {
            v.noticeType = '巡检报告'
          }
          if (v.noticeType === '6') {
            v.noticeType = '维保报告'
          }
          if (v.noticeType === '7') {
            v.noticeType = '建筑物火灾风险报告管理'
          }
          if (v.noticeType === '8') {
            v.noticeType = '超时任务'
          }
          if (v.pushFrequency === 1) {
            v.pushFrequencyNew = '1次'
          }
          if (v.pushFrequency === 2) {
            v.pushFrequencyNew = '2次'
          }
          if (v.pushFrequency === 3) {
            v.pushFrequencyNew = '3次'
          }
          if (v.pushFrequency === 4) {
            v.pushFrequencyNew = '4次'
          }
          if (v.pushFrequency === 5) {
            v.pushFrequencyNew = '5次'
          }
          if (v.pushTime === '1') {
            v.pushTimeNew = '1分钟'
          }
          if (v.pushTime === '2') {
            v.pushTimeNew = '3分钟'
          }
          if (v.pushTime === '3') {
            v.pushTimeNew = '15分钟'
          }
          if (v.pushTime === '4') {
            v.pushTimeNew = '60分钟'
          }
          if (v.pushTime === '5') {
            v.pushTimeNew = '1天'
          }
          if (v.pushTime === '6') {
            v.pushTimeNew = '1周'
          }
          if (v.pushTime === '7') {
            v.pushTimeNew = '1月'
          }
          if (v.pushTime === '8') {
            v.pushTimeNew = '1年'
          }
        })
      })
    },
    getDept(row) {
      return this.deptList.get(row.deptId)
    },
    getType(row) {
      let str = row.noticeMode
      let arr = str.split(',')
      let noticeMode = ''
      arr.forEach(v => {
        if (v === '1') {
          v = '短信'
        }
        if (v === '2') {
          v = '电话'
        }
        if (v === '3') {
          v = '钉钉群'
        }
        if (v === '4') {
          v = '钉钉小程序'
        }
        if (v === '5') {
          v = '执法仪'
        }
        if (v === '6') {
          v = '消息'
        }
        noticeMode += v + ','
      })
      noticeMode = noticeMode.slice(0, noticeMode.length - 1)
      return noticeMode
    },
    getArea(row) {
      let str = row.parkId
      let arr = str.split(',')
      let noticeMode = ''
      arr.forEach(v => {
        if (v === '1106') {
          v = '国际会展中心二期'
        }
        if (v === '1107') {
          v = '中大产业园'
        }
        if (v === '1108') {
          v = '润丰产业园'
        }
        if (v === '1109') {
          v = '鹏辉产业园'
        }
        if (v === '1110') {
          v = '国际会展中心一期'
        }
        noticeMode += v + ','
      })
      noticeMode = noticeMode.slice(0, noticeMode.length - 1)
      return noticeMode
    },

    // 根据园区进行筛选
    changeArea(value) {
      this.obj.parkId = value
      this.getTable()
    },
    getCookie(name) {
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
    },
    xz() {
      this.dialogVisible2 = true
    },
    async handleDelete(row) {
      console.log(row.id)
      try {
        await this.$confirm('你确定要删除该图纸信息吗？', '温馨提示', {
          type: 'warning'
        })
        // console.log(row)
        await this.$request.tz.deleteNotice(row.id)
        this.$message({
          type: 'success',
          message: '删除成功',
          duration: 1500
        })
        await this.getTable()
        // this.total = showRes.data.length
      } catch (e) {
        this.$message({
          type: 'info',
          message: '取消删除',
          duration: 1500
        })
      }
    },
    handleCheckAllChange(val) {
      console.log(val)
      this.checkedPeople = val ? this.allPeople : []
      this.isIndeterminate = false
    },
    handleCheckAllChange1(val) {
      console.log(val)
      this.checkedPeople1 = val ? this.allPeople1 : []
      this.isIndeterminate1 = false
    },
    // 点击新增对话框确认实现新增
    async add() {
      this.xzlist.noticeMode = ''
      this.xzlist.parkId = ''
      this.xzlist.userId = ''
      // 对园区进行数据格式处理
      this.checkListAdd.forEach(v => {
        this.xzlist.parkId += v + ','
      })
      this.xzlist.parkId = this.xzlist.parkId.slice(
        0,
        this.xzlist.parkId.length - 1
      )
      console.log(this.xzlist.parkId)
      // 对处理人进行数据处理
      this.checkedPeople.forEach(v => {
        this.xzlist.userId += v.id + ','
      })
      this.xzlist.userId = this.xzlist.userId.slice(
        0,
        this.xzlist.userId.length - 1
      )
      // 对推送方式进行数据处理
      console.log(this.checkListAdd1)
      this.checkListAdd1.forEach(v => {
        this.xzlist.noticeMode += v + ','
      })
      this.xzlist.noticeMode = this.xzlist.noticeMode.slice(
        0,
        this.xzlist.noticeMode.length - 1
      )
      console.log(this.xzlist.noticeMode)
      this.xzlist.dingLink = this.addDingLink
      if (
        this.xzlist.noticeMode.indexOf('3') != -1 &&
        this.addDingLink === ''
      ) {
        this.$message({
          type: 'error',
          message: '以钉钉群方式进行推送请输入机器人链接',
          duration: 1500
        })
        return
      }
      console.log(this.xzlist)
      const res = await this.$request.tz.addNotice(this.xzlist)
      console.log(res)
      await this.$message({
        type: 'success',
        message: '新增成功',
        duration: 1500
      })
      this.getTable()
      this.dialogVisible2 = false
      this.xzlist = {}
      this.checkListAdd = []
      this.checkedPeople = []
      this.checkListAdd1 = []
      this.isIndeterminate = true
      this.addDingLink = ''
    },
    // 点击编辑进行数据的回显
    async handleEdit(row) {
      console.log(row)
      this.bjbj.noticeType = row.noticeType
      this.bjbj.deptId = row.deptId
      this.bjbj.pushTime = row.pushTime
      this.bjbj.pushFrequency = row.pushFrequency.toString()
      this.bjbj.id = row.id
      this.amendDing = row.dingLink
      // 根据机构id查询园区和处理人员
      const res = await this.$request.tz.getPeople({
        deptIds: row.deptId
      })
      const resArea = await this.$request.tz.getArea({
        deptId: row.deptId
      })
      this.amendOptionArea = resArea.data
      this.allPeople1 = res
      this.checkList1 = []
      this.dialogVisible = true
      console.log(row)
      // if (row.parkId.indexOf('[') != -1) {
      //   let str = row.parkId.split('[')[1]
      //   str = str.split(']')[0]
      //   let arr = str.split(',')
      //   arr.forEach(v => {
      //     this.checkList1.push(v)
      //   })
      // } else {
      //   this.checkList1.push(row.parkId)
      // }
      let str = row.parkId
      let arr = str.split(',')
      arr.forEach(v => {
        this.checkList1.push(v)
      })
      let strPeo = row.userId
      let arrPeo = strPeo.split(',')
      // console.log(arrPeo)
      this.allPeople1.forEach(v => {
        console.log(v.id)
        arrPeo.forEach(i => {
          if (v.id === i) {
            this.checkedPeople1.push(v)
          }
        })
      })
      let strMode = row.noticeMode
      let arrMode = strMode.split(',')
      arrMode.forEach(v => {
        this.checkList.push(v)
      })
    },
    // 实现修改功能
    async amend() {
      this.bjbj.noticeMode = ''
      this.bjbj.parkId = ''
      this.bjbj.userId = ''
      console.log(this.bjbj)
      this.bjbj.dingLink = this.amendDing
      // 对园区进行数据格式处理
      this.checkList1.forEach(v => {
        this.bjbj.parkId += v + ','
      })
      this.bjbj.parkId = this.bjbj.parkId.slice(0, this.bjbj.parkId.length - 1)
      // 对处理人进行数据处理
      this.checkedPeople1.forEach(v => {
        this.bjbj.userId += v.id + ','
      })
      this.bjbj.userId = this.bjbj.userId.slice(0, this.bjbj.userId.length - 1)
      // 对推送方式进行数据处理
      this.checkList.forEach(v => {
        this.bjbj.noticeMode += v + ','
      })
      this.bjbj.noticeMode = this.bjbj.noticeMode.slice(
        0,
        this.bjbj.noticeMode.length - 1
      )
      console.log(this.bjbj.noticeMode)
      if (this.bjbj.noticeMode.indexOf('3') != -1 && this.amendDing === '') {
        this.$message({
          type: 'error',
          message: '以钉钉群方式进行推送请输入机器人链接',
          duration: 1500
        })
        return
      }
      await this.$request.tz.updateNotice(this.bjbj)
      await this.$message({
        type: 'success',
        message: '修改成功',
        duration: 1500
      })
      this.getTable()
      this.dialogVisible = false
      this.bjbj = {}
      this.checkList1 = []
      this.checkedPeople1 = []
      this.checkList = []
      this.isIndeterminate = true
      this.amendDing = ''
    },
    // 分页的功能
    currentChange(currentPage) {
      // console.log(currentPage)
      this.currentPage = currentPage
    }
  }
}
</script>
<style lang="less" scoped>
.boxer {
  padding: 10px;
}
.round {
  width: 16px;
  height: 16px;
  background-color: #489be9;
  display: inline-block;
  border-radius: 50%;
}
.userName {
  display: inline-block;
  width: 25%;
}
.name {
  width: 100px;
  height: 25px;
  display: inline-block;
  color: #666666;
  font-size: 18px;
  margin-left: 10px;
}
</style>
