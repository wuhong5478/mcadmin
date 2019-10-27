<template>
  <div id="app">
    <el-header style="background:#fff;" height="80px">
      <div class="grid-content bg-purple"></div>
      <div class="grid-content bg-purple">
        <span style="font-size:12px">
          <template>
            <el-select size="medium" v-model="value" @change="changeName" placeholder="机构筛选">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </template>
        </span>
      </div>
      <div style="float: right">
        <el-button type="primary" @click="addUser" size="medium">
          <i class="el-icon-plus el-icon&#45;&#45;right"></i>新增
        </el-button>
        <el-button type="primary" @click="exportExcel" size="medium">一键导出</el-button>
      </div>
    </el-header>


    <!-- 新增用户的对话框 -->
    <el-dialog title="新增用户" width="45%" :visible.sync="dialogTableVisible">
      <el-form ref="addForm" status-icon :rules="rules" :model="form">
        <el-form-item label="账号:" prop="account" label-width="90px">
          <el-input v-model="form.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号名称:" prop="name" label-width="90px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属机构:" prop="jigou" label-width="90px">
          <template>
            <el-select v-model="value1" @change="changeRoleName" placeholder="请选择所属机构:">
              <el-option
                v-for="item in options1"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="选择角色:" label-width="90px">
          <template>
            <el-select v-model="form.roleId" placeholder="请选择角色">
              <el-option
                      v-for="item in options11"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="性别:" label-width="90px">
          <el-select v-model="form.gender" placeholder="性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生年月:" prop="brithddate" label-width="90px">
          <el-date-picker v-model="form.brithddate" type="date" placeholder="请选择出生年月" style="width:217px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="入职时间:" prop="entryTime" label-width="90px">
          <el-date-picker v-model="form.entryTime" type="date" placeholder="请选择入职时间" style="width:217px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话:" prop="phone" label-width="90px">
          <el-input type="mobile" v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="管理员:" label-width="90px">
          <el-select v-model="form.isSuperAdmin" placeholder="管理员">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>-->

        <el-form-item label="状态:" label-width="90px">
          <el-select v-model="form.status" placeholder="请选择使用状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRow">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户的对话框 -->
    <el-dialog title="编辑用户" width="45%" :visible.sync="dialogFormVisible">
      <el-form :model="obj" ref="amendForm" status-icon :rules="rules" label-position="right">
        <el-form-item label="账号:" prop="account" label-width="90px">
          <el-input v-model="obj.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号名称:" prop="name" label-width="90px">
          <el-input v-model="obj.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属机构:" label-width="90px">
          <el-select v-model="obj.deptId" @change="changeRoleName" placeholder="请选择所属机构">
            <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择角色:" label-width="90px">
          <template>
            <el-select v-model="obj.roleId" @change="changeRoleInfo" placeholder="请选择角色:">
              <el-option
                      v-for="item in options11"
                      :key="item.id"
                      :value="item.id"
                      :label="item.name"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="性别:" label-width="90px">
          <template>
            <el-select v-model="obj.gender" placeholder>
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="出生年月:" prop="brithddate" label-width="90px">
          <el-date-picker v-model="obj.brithddate" type="date" placeholder="请选择出生年月" style="width:217px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="入职时间:" prop="entryTime" label-width="90px">
          <el-date-picker v-model="obj.entryTime" type="date" placeholder="请选择入职时间" style="width:217px;"></el-date-picker>
        </el-form-item>

        <el-form-item label="联系电话:" prop="phone" label-width="90px">
          <el-input v-model="obj.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="管理员:" label-width="90px">
          <el-select v-model="obj.isSuperAdmin" placeholder="是否为管理员">
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>-->

        <el-form-item label="状态:" label-width="90px">
          <el-select v-model="obj.status" placeholder="请选择使用状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <!-- :data="tableData.slice((currentPage-1) * pagesize,currentPage * pagesize)" -->
    <!-- :data="tableData.filter(data => !search || data.account.toLowerCase().includes(search.toLowerCase()))" -->
    <el-table
      ref="multipleTable"
      tooltip-effect="dark"
      :data="tableData"
      stripe
      style="width: 100%;padding-left: 10px;"
      :header-cell-style="{background:'#FAFAFA'}"
      id="rebateSetTable"
    >
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="name" label="账号名称"></el-table-column>
      <el-table-column prop="deptName" label="所属机构">
        <template slot-scope="scope">{{scope.row.deptName?scope.row.deptName:'--'}}</template>
      </el-table-column>
      <!-- <el-table-column prop="administer" label="管辖范围">
        <el-button type="text" @click="open">查看</el-button>
      </el-table-column>-->
      <el-table-column prop="gender" label="性别">
        <template slot-scope="scope">{{scope.row.gender?(scope.row.gender=='2'?'女':'男'):'--'}}</template>
      </el-table-column>
      <el-table-column prop="phone" label="联系电话">
        <template slot-scope="scope">{{scope.row.phone?scope.row.phone:'--'}}</template>
      </el-table-column>
      <el-table-column label="出生年月" prop="brithddate">
        <template slot-scope="scope">{{scope.row.brithddate?scope.row.brithddate:'--'}}</template>
      </el-table-column>
      <el-table-column label="入职时间" prop="entryTime">
        <template slot-scope="scope">{{scope.row.entryTime?scope.row.entryTime:'--'}}</template>
      </el-table-column>
      <el-table-column prop="isSuperAdmin" label="角色">
        <template v-slot="{row}">
          <span>{{row.roleName || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <!-- @click="changeStatus(row)" -->
        <template v-slot="{row}">
          <span
            class="button"
            ref="button"
            size="medium"
            :class="row.flag?'green':'red'"
          >{{row.statusName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <!-- <template slot="header" slot-scope="scope">
          <el-input v-model="search" @change="searchKeyWord" size="mini" placeholder="输入账号搜索" />
        </template>-->
        <template slot-scope="scope">
          <span class="amendSpan" @click="handleEdit(scope.row)">编辑/</span>
          <span class="deleteSpan" @click="handleDelete(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
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
  </div>
</template>

<script>
// 一键导出表格插件
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
// import { exportMethod } from '../../api/exportForm'
export default {
  data() {
    return {
      // 表单校验
      rules: {
        phone: [
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入正确的手机号',
            required: true,
            trigger: ['change', 'blur']
          }
        ],
        name: [
          {
            message: '请输入账号名称',
            required: true,
            trigger: ['change', 'blur']
          }
        ],
        value2: [
          {
            message: '请选择所属机构',
            required: true,
            trigger: ['change', 'blur']
          }
        ],
        account: [
          {
            message: '请输入账号',
            required: true,
            trigger: ['change', 'blur']
          }
        ]
      },
      // currentPage: 1,
      pagesize: 10,
      currentPage: 1,
      total: 0,
      dialogVisible: false,
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 新增用户信息的数据对象
      form: {
        account: '',
        name: '',
        gender: '',
        phone: '',
        status: '', // 启用或禁用
        deptId: '', // 机构id
        roleId: '', // 角色id
        brithddate: '', // 出生年月
        entryTime: '' //入职时间
      },
      // 编辑用户信息的数据对象
      obj: {
        account: '',
        name: '',
        gender: '',
        phone: '',
        status: '', // 状态
        id: '', // 用户id
        deptId: '', // 机构id
        // deptName: '', // 机构名称
        roleId: '', // 角色Id
        brithddate: '', // 出生年月
        entryTime: '' //入职时间
      },
      // formLabelWidth: '120px',
      input: '',
      search: '',
      mobile: '',
      showRed: false,
      showGreen: false,
      // 编辑框的所属机构id参数
      value2: '',
      // 编辑对话框的所属机构
      options2: [],
      // 新增对话框的所属机构id
      value1: '',
      // 新增对话框中的所属机构
      options1: [],
      // 机构筛选的机构id
      value: '',
      // 机构筛选所属机构
      options: [{ name: '全部机构', id: '' }],
      options10: [], // 新增对话框中的角色信息
      value10: '', // 新增对话框的角色绑定
      options11: [], // 编辑对话框中的角色信息
      optionsRole: [], // 编辑对话框中的角色信息
      value11: '', // 编辑对话中的角色绑定
      one: '', // 判断编辑角色有无变化
      one1: '',
      two: '', // 判断编辑机构有无变化
      two1: '',
      three: '',
      four: '',
      roleId: '', //  存储角色id
      deptId: '', //存储机构id
      changeId: ''
    }
  },
  created() {
    this.getUser()
    this.getAgency()
  },
  methods: {
    // 点击新增按钮查询系统角色
    addUser() {
      this.dialogTableVisible = true
    },
    // 查询系统用户
    async getUser() {
      // const res = await this.$request.systemUser.demandUser({
      //   pageNo: this.currentPage,
      //   pageSize: this.pagesize
      // })
        // 渲染机构到下拉菜单中
        this.addDanger
            .get('/sysrole/getrolelist', {
                params: {
                    pageNo: this.pageNo,
                    pageSize: 1000
                }
            })
            .then(res => {
//          this.options11 = res.data.data.rows
                this.optionsRole = res.data.data.rows
                // console.log(this.options11)
            })

      this.addDanger
        .get('/sysuser/getuserinfolist', {
          params: {
            pageNo: this.currentPage,
            pageSize: this.pagesize,
            deptId: this.changeId
          }
        })
        .then(res => {
          // console.log(res.data)
          this.tableData = res.data.data.rows
          this.total = res.data.data.totalCount
          this.tableData.forEach(v => {
            // console.log(v.status)
            v.status === '1' ? (v.statusName = '启用') : (v.statusName = '禁用')
            v.statusName === '启用' ? (v.flag = true) : (v.flag = false)
          })
        })
      // console.log('res.data.rows', res.data.rows)
    },
    // 点击查看的方法
    // open() {
    //   this.$alert('三江工业园区3栋1103', '地理位置', {
    //     confirmButtonText: '确定',
    //     callback: action => {
    //       this.$message({
    //         type: 'info',
    //         message: `action: ${action}`,
    //         message: `已查看`,
    //         duration: 800
    //       })
    //     }
    //   })
    // },
    // 删除用户
    async handleDelete(row) {
      console.log(row)
      try {
        await this.$confirm('你确定要删除该用户信息吗？', '温馨提示', {
          type: 'warning'
        })
        await this.$request.systemUser.deleteInfo(row.id)
        this.$message({
          type: 'success',
          message: '删除成功',
          duration: 1000
        })
        this.getUser()
      } catch (e) {
        this.$message({
          type: 'info',
          message: '取消删除',
          duration: 1000
        })
      }
    },
    // 点击编辑按钮显示对话框
    handleEdit(row) {
      console.log(row)
      this.dialogFormVisible = true

        this.options11=[];
        for(let i=0;i<this.options2.length;i++){
            let dept=this.options2[i];
            if(dept.id==row.deptId){
                if(dept.name=='云栖小镇管委会'){
                    for(let j=0;j<this.optionsRole.length;j++){
                        if(this.optionsRole[j].name=='云栖管委会'||this.optionsRole[j].name=='系统管理员'){
                            this.options11.push(this.optionsRole[j]);
                        }
                    }
                }else{
                    this.options11=this.optionsRole;
                }
            }
        }
      this.obj.deptId = row.deptName // 回显机构名称
      this.obj.roleId = row.roleName // 回显权限名称
      this.obj.account = row.account //ok
      this.obj.name = row.name // ok
      this.obj.gender = row.gender // ok
      this.obj.phone = row.phone //ok
      this.obj.status = row.statusName // ok
      this.obj.id = row.id // ok
      this.obj.brithddate = row.brithddate // ok
      this.obj.entryTime = row.entryTime // ok
      this.three = row.roleId // 存储角色id
      this.four = row.deptId // 存储机构id
      console.log(this.three, this.four)
    },

    // 切换编辑对话框中的权限名称
    changeRoleInfo(value) {
      console.log(value)
      // this.obj.roleId = value
      // this.roleId = value
    },
    // 编辑用户信息(更新)
    async editUser() {
      // this.one = this.obj.roleId
      // this.two = this.obj.deptId
      // console.log(this.one, this.two)
      // console.log(this.one === this.three)
      // console.log(this.two === this.four)
      console.log(/^[\u3220-\uFA29]+$/.test(this.obj.roleId))
      console.log(/^[\u3220-\uFA29]+$/.test(this.obj.deptId))
      if (/^[\u3220-\uFA29]+$/.test(this.obj.roleId)) {
        this.obj.roleId = this.three
      }
      if (/^[\u3220-\uFA29]+$/.test(this.obj.deptId)) {
        this.obj.deptId = this.four
      }
      if (this.obj.status === '1') {
        this.tableData.forEach(v => {
          v.statusName = '启用'
        })
        // console.log(this.obj.status)
      } else {
        this.tableData.forEach(v => {
          v.statusName = '禁用'
        })
      }
      if (this.obj.status === '禁用') {
        this.obj.status = '0'
      }
      if (this.obj.status === '启用') {
        this.obj.status = '1'
      }

      // if (this.obj.isSuperAdmin === '否') {
      //   this.obj.isSuperAdmin = '0'
      // }
      // if (this.obj.isSuperAdmin === '是') {
      //   this.obj.isSuperAdmin = '1'
      // }

      console.log(this.obj)
      await this.$refs.amendForm.validate()
      await this.$request.systemUser.replaceUser(this.obj)
      // console.log(res.data)
      this.$message({
        type: 'success',
        message: '更新成功',
        duration: 1000
      })
      this.getUser()
      this.dialogFormVisible = false
    },
    // 切换新增对话框中的机构名称，将机构id保存
    changeRoleName(value) {
      // console.log(value)
        this.form.deptId = value
        this.options11=[];
        for(let i=0;i<this.options2.length;i++){
            let dept=this.options2[i];
            if(dept.id==value){
                if(dept.name=='云栖小镇管委会'){
                    for(let j=0;j<this.optionsRole.length;j++){
                        if(this.optionsRole[j].name=='云栖管委会'||this.optionsRole[j].name=='系统管理员'){
                            this.options11.push(this.optionsRole[j]);
                        }
                    }
                }else{
                    this.options11=this.optionsRole;
                }
            }
        }
    },
    // 新增用户信息
    async addRow() {
      // 默认控制新增用户的状态
      console.log(this.form.status)
      if (this.form.status === '') {
        this.form.status = '1'
      }
      console.log(this.$refs.addForm)
      await this.$refs.addForm.validate()
      await this.addDanger.post('/sysuser/addsysuser', this.form)
      this.$message({
        type: 'success',
        message: '添加成功',
        duration: 1000
      })
      this.getUser()
      this.dialogTableVisible = false
      // this.$refs.addForm.resetFields()
      this.form = {}
      this.value1 = ''
    },
    // 分页的功能
    currentChange(currentPage) {
      // console.log(currentPage)
      this.currentPage = currentPage
      this.getUser()
    },
    // 切换状态的方法
    // async changeStatus(row) {
    //   try {
    //     await this.$confirm('你确定要修改状态吗？', '温馨提示')
    //     if (row.statusName === '启用') {
    //       row.status = '0'
    //     } else {
    //       row.status = '1'
    //     }
    //     await this.$request.systemUser.replaceUser({
    //       id: row.id,
    //       status: row.status
    //     })
    //     this.$message({
    //       type: 'success',
    //       message: '修改成功',
    //       duration: 1000
    //     })
    //     // 对页面进行重构
    //     this.getUser()
    //     // this.$refs.button.style.color = '#000'
    //   } catch (e) {
    //     this.$message({
    //       type: 'info',
    //       message: '取消修改',
    //       duration: 500
    //     })
    //   }
    // },
    // 搜索关键字
    // searchKeyWord(value) {
    //   console.log(value)
    //   console.log(this.tableData)
    // },
    // 查询机构信息
    async getAgency() {
      this.instance
        .get('/sysdept/getdeptlist', {
          params: {
            pageNo: 0
          }
        })
        .then(res => {
          // this.options = res.data.data.rows
          res.data.data.rows.forEach(v => {
            this.options.push(v)
          })
          this.options1 = res.data.data.rows
          this.options2 = res.data.data.rows
        })
      // const res = await this.$request.systemUser.demandAgency({
      //   pageNo: -1
      // })
      // console.log(res.data)
    },
    // 切换机构名称渲染不同的数据
    changeName(value) {
      this.changeId = value
      this.getUser()
    },
    async exportExcel() {
      this.exportForm
        .get('/sysuser/excleUser', {
          params: {}
        })
        .then(res => {
          console.log(res)
          const link = document.createElement('a')
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)

          // link.download = res.headers['content-disposition'] //下载后文件名
          link.download = '用户导出表.xls' //下载的文件名
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="less" scoped>
#app {
  user-select: none;
}
.el-header {
  /*line-height: 60px;*/
  // height: 100px;
  padding: 20px 10px 0 10px;
}
.el-row {
  margin-top: 10px;
  padding-top: 10px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  float: left;
  border-radius: 4px;
  min-height: 36px;
  // margin-right: 10px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
// .red {
//   background-color: #f56c6c;
//   // font-weight: bold;
//   color: #fff;
// }
// .green {
//   background-color: #67c23a;
//   // font-weight: bold;
//   color: #fff;
// }
/deep/.el-table th > .cell {
  text-align: left;
}
/deep/.el-table .cell {
  text-align: left;
}
.deleteSpan {
  color: #909399;
  cursor: pointer;
}
.amendSpan {
  color: #0080d0;
  cursor: pointer;
}
.a {
  background-color: #409eff;
  float: right;
  width: 60px;
  text-align: center;
  line-height: 30px;
  height: 32px;
  color: #fff;
  border-radius: 3px;
  margin-top: 15px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 12px;
}
.el-input {
  width: 91%;
}
</style>