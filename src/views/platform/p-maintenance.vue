<!-- 维保管理页面 -->
<template>
  <div class="property">
    <popup :dialog="dialog" :form="tableData"></popup>
    <maintenance :dialog="flag" :form="obj"></maintenance>
    <div class="property-info">
      <div class="property-herder">
        <div class="headTable">企业基本信息</div>
        <div class="edit">
          <el-button @click="changeEdmit" size="medium" type="primary">编辑</el-button>
        </div>
      </div>
      <div class="property-info-herder">
        <!-- <div class="logo">
          <div></div>
        </div>-->
        <div class="right">
          <el-row>
            <el-col :span="6" v-for="(item, index) in propertyInfo" :key="index">
              <span class="headTable">{{ item.name }}:</span>
              <span class="headTable">{{ item.text }}</span>
            </el-col>
            <el-col :span="6" v-for="(item, index) in headInfo" :key="index">
              <span class="headTable">{{ item.nameHead }}:</span>
              <span class="headTable">{{ item.text }}</span>
            </el-col>
          </el-row>

        </div>
      </div>
    </div>
    <div class="person-info">
      <div class="property-info-herder" style="display:flex;  justify-content: space-between;">
        <div class="headTable">维保人员信息</div>
        <div>
          <el-button size="medium" @click="addPersonInfo" type="primary">新增</el-button>
        </div>
      </div>
      <div class="person-form">
        <el-table :data="tableData">
          <!-- <el-table-column type="index"></el-table-column> -->
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="性别" prop="gender">
            <template slot-scope="scope">{{scope.row.gender?(scope.row.gender=='2'?'女':'男'):'--'}}</template>
          </el-table-column>
          <el-table-column label="出生年月" prop="brithddate">
            <template slot-scope="scope">{{scope.row.brithddate?scope.row.brithddate:'--'}}</template>
          </el-table-column>
          <!-- <el-table-column 
            label="学历" <el-table-column label="入职时间" prop="entryTime">
            <template slot-scope="scope">{{scope.row.entryTime?scope.row.entryTime:'--'}}</template>
          </el-table-column>
            prop="education">
          </el-table-column>-->
          <el-table-column label="岗位" prop="post">
            <template slot-scope="scope">{{scope.row.post?scope.row.post:'--'}}</template>
          </el-table-column>
          <el-table-column label="联系电话" prop="phone">
            <template slot-scope="scope">{{scope.row.phone?scope.row.phone:'--'}}</template>
          </el-table-column>

          <el-table-column label="角色" prop="roleName">
            <template slot-scope="scope">{{scope.row.roleName?scope.row.roleName:'--'}}</template>
          </el-table-column>
          <!-- <el-table-column 
            label="钉钉账号"
            prop="hhh">
          </el-table-column>-->

          <el-table-column label="在职状态" prop="jobstatus">
            <template slot-scope="scope">{{scope.row.jobstatus==='0'?'离职':'在职'}}</template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope" class="btnstyle">
              <span
                size="medium"
                class="span"
                style="color:#0080d0;"
                @click="handleEdit(scope.$index, scope.row)"
                :disabled="anan"
              >编辑</span>/
              <span
                size="medium"
                class="span"
                type="danger"
                style="color:#909399;"
                @click="handleDelete(scope.$index, scope.row)"
                :disabled="anan"
              >删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import popup from './common/popup'
import maintenance from './common/maintenance'
export default {
  components: {
    popup,
    maintenance
  },
  data() {
    return {
      xx: '',
      anan: false,
      propertyInfo: [
        { name: '公司编码', text: '' },
        { name: '公司地址', text: '' },
        { name: '服务园区', text: '' },
        { name: '建筑面积', text: '' }
      ],
      headInfo: [
        { nameHead: '现场负责人', text: '' },
        { nameHead: '现场联系方式', text: '' },
        { nameHead: '单位负责人', text: '' },
        { nameHead: '单位联系方式', text: '' }
      ],
      // bottomInfo: [
      //   { name: '消控室数量', text: '' },
      //   { name: '合同到期时间', text: '' }
      // ],
      tableData: [],
      // 编辑维保基本信息
      flag: {
        show: false,
        title: '',
        option: 'edit'
      },
      obj: {},
      // 编辑数据
      dialog: {
        show: false,
        title: '',
        option: 'edit'
      },
      deptId: ''
    }
  },
  created() {
    this.getWeibaoInfo()
    this.handleQueryUserInfo()
  },
  watch: {
    obj(val) {
      console.log('obj', val)
      if (this.val == {}) {
        this.anan = true
        this.tableData == []
      } else {
        this.anan = false
      }
    }
  },
  methods: {
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
    // 获取维保信息
    getWeibaoInfo() {
      var that = this
      const dept = this.getCookie('dept_id')
      this.deptId = this.getCookie('dept_id')
      console.log(this.deptId)
      this.$request.platform.selectById({ maintenanceId: dept }).then(res => {
        that.obj = res.data
        that.xx = that.obj.id
        console.log(this.obj)
        if (this.obj) {
          this.propertyInfo[0].text = this.obj.companyCode
          this.propertyInfo[1].text = this.obj.companyAddress
          this.propertyInfo[2].text = this.obj.managementArea
          this.propertyInfo[3].text = this.obj.area + '㎡'
          this.headInfo[0].text = this.obj.fireSafetyPersonLiable
          this.headInfo[1].text = this.obj.personLiableTelephone
          this.headInfo[2].text = this.obj.fireSafetyManager
          this.headInfo[3].text = this.obj.managerTelephone
        }
      })
    },

    // async queryMainManage() {
    //   let res = await this.$request.platform.queryMainManage()
    //   this.obj = res.data
    //   this.xx = this.obj.id
    //   console.log(this.obj)
    //   // console.log('textobj', this.xx)
    //   if (this.obj) {
    //     this.propertyInfo[0].text = this.obj.companyCode
    //     this.propertyInfo[1].text = this.obj.companyAddress
    //     this.propertyInfo[2].text = this.obj.managementArea
    //     this.propertyInfo[3].text = this.obj.area
    //     this.headInfo[0].text = this.obj.fireSafetyPersonLiable
    //     this.headInfo[1].text = this.obj.personLiableTelephone
    //     this.headInfo[2].text = this.obj.fireSafetyManager
    //     this.headInfo[3].text = this.obj.managerTelephone
    //   }
    // },
    // 查询人员接口
    async handleQueryUserInfo() {
      console.log(this.deptId)
      // alert(this.xx)
      // const deptId = getCookie('dept_id')
      let allUser = await this.$request.platform.getuserinfolist({
        deptId: this.deptId
      })
      this.tableData = allUser.data.rows
      this.$utils.isWhat(
        this.tableData,
        { oldName: 'jobstatus', newName: 0, isTrue: '离职', isFalse: '在职' },
        'sanmu'
      )
    },
    // 编辑维保信息
    changeEdmit() {
      //编辑企业基本信息
      this.flag = {
        show: true,
        title: '修改维保信息',
        option: 'edit'
      }
    },
    // 新增人员信息
    addPersonInfo() {
      // this.personInfo = JSON.parse(JSON.stringify(this.tableData[0]))
        let arr = [
            { prop: 'name', label: '姓名' },
            {
                prop: 'gender',
                label: '性别',
                select: [{ value: '1', label: '男' }, { value: '2', label: '女' }]
            },
            {
                prop: 'post',
                label: '岗位',
                select: [
                    { value: '客户经理', label: '客户经理' },
                    { value: '保安队长', label: '保安队长' },
                    { value: '保安员', label: '保安员' },
                    { value: '维修调度', label: '维修调度' },
                    { value: '保洁主管', label: '保洁主管' },
                    { value: '保洁员', label: '保洁员' },
                    { value: '其他', label: '其他' }
                ]
            },
            { prop: 'phone', label: '电话' },
            { prop: 'brithddate', label: '出生年月', picker: true },
            { prop: 'address', label: '地址' },
            {
                prop: 'jobstatus',
                label: '状态',
                select: [{ value: 0, label: '离职' }, { value: 1, label: '在职' }]
            }
        ]
      ;(this.dialog = {
        show: true,
        title: '新增人员信息',
        option: 'add',
        fun: async form => {
          //新增
          console.log(form)
          form.account = form.phone
          form.deptId = this.deptId
          form.roleId = '4'
          // await this.$request.platform.addUseInfo(form)
          await this.$axios({
            method: 'post',
            url: '/api/sysuser/addsysuser',
            data: form
          })
          this.handleQueryUserInfo()
        }
      }),
        this.$popup(this.dialog, arr, this.personInfo)
    },
    // 编辑人员信息
    handleEdit(index, row) {
      // console.log(index, row)
      this.personInfo = JSON.parse(JSON.stringify(row))
      this.dialog = {
        show: true,
        title: '修改维保信息',
        option: 'edit',
        fun: async form => {
          // 编辑人员信息
          let obj = JSON.parse(JSON.stringify(form))
          // console.log(obj, '回调')
          if (typeof obj.jobstatus === 'string') {
            obj.jobstatus === '离职' ? (obj.jobstatus = 0) : (obj.jobstatus = 1)
          }
          // console.log(form, '回调')
          await this.$request.platform.updatedUseInfo(obj)
          this.handleQueryUserInfo()
        }
      }
        let arr = [
            { prop: 'name', label: '姓名' },
            {
                prop: 'gender',
                label: '性别',
                select: [{ value: '1', label: '男' }, { value: '2', label: '女' }]
            },
            {
                prop: 'post',
                label: '岗位',
                select: [
                    { value: '客户经理', label: '客户经理' },
                    { value: '保安队长', label: '保安队长' },
                    { value: '保安员', label: '保安员' },
                    { value: '维修调度', label: '维修调度' },
                    { value: '保洁主管', label: '保洁主管' },
                    { value: '保洁员', label: '保洁员' },
                    { value: '其他', label: '其他' }
                ]
            },
            { prop: 'phone', label: '电话' },
            { prop: 'brithddate', label: '出生年月', picker: true },
            { prop: 'entryTime', label: '入职时间', picker: true },
            { prop: 'address', label: '地址' },
            {
                prop: 'jobstatus',
                label: '状态',
                select: [{ value: 0, label: '离职' }, { value: 1, label: '在职' }]
            }
        ]
      this.$popup(this.dialog, arr, this.personInfo)
    },
    // 删除人员信息
    async handleDelete(index, row) {
      console.log(row) //删除人员
      try {
        await this.$confirm('你确定要删除该维保人员信息吗？', '温馨提示', {
          type: 'warning'
        })
        const res = await this.$request.platform.deleteUseInfo(row.id)
        console.log(res)
        await this.$message({
          type: 'success',
          message: '删除成功',
          duration: 1000
        })
        // this.total = showRes.data.length
      } catch (e) {
        this.$message({
          type: 'info',
          message: '取消删除',
          duration: 1000
        })
      }
      this.handleQueryUserInfo()
    }
  }
}
</script>
<style lang="less" scoped>
  .headTable{
    font-size:14px;color: #606266;
    padding: 10px 2px;
    display: inline-block;
  }
  .headTitle{
    font-size:16px;color: #333;
  }
.property {
  padding: 20px;
  background-color: #fff;
  .el-row {
    margin: 20px;
  }
  .property-herder {
    display: flex;
    justify-content: space-between;
  }
  .property-herders {
    display: flex;
    justify-content: space-between;
  }
}
.property-info {
  margin-bottom: 40px;
  border-bottom: 1px solid #999;
}
.property-info-herder {
  display: flex;
  .logo {
    padding: 20px 20px;
    .img {
      width: 100px;
      height: 100px;
      padding-top: 20px;
      background-color: #999;
    }
  }
  .right {
    flex-grow: 1;
    .info {
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
    }
  }
}
.span {
  cursor: pointer;
}
/deep/.el-table th > .cell {
  text-align: left;
}
/deep/.el-table .cell {
  text-align: left;
}
</style>