<!-- 物业信息页面 -->
<template>
  <div class="property">
    <!-- <popup :dialog="dialog" :form="personInfo" :label='label'></popup> -->
    <propertyEdit :dialog="flag" :form="obj"></propertyEdit>
    <div class="property-info" >
      <div class="property-info-herder" style="display:flex;  justify-content: space-between;">
        <div class="headTitle">物业信息</div>
        <div>
          <el-button size="medium" @click="handleEdmit" type="primary">编辑</el-button>
        </div>
       
      </div>
        <el-row>
          <el-col :span="6" v-for="(item, index) in propertyInfo" :key="index">
              <span class="headTable">{{ item.name }}：</span>
              <span class="headTable">{{ item.text }}</span>
          </el-col>
          <el-col :span="6" v-for="(item, index) in headInfo" :key="index">
              <span class="headTable">{{ item.nameHead }}:</span>
              <span class="headTable">{{ item.name }}</span>
          </el-col>
          <el-col :span="6" v-for="(item, index) in bottomInfo" :key="index">
              <span class="headTable">{{ item.name }}:</span>
              <span class="headTable">{{ item.text }}</span>
          </el-col>
        </el-row>
    </div>
   
    <div class="person-info">
      <div class="property-herders" style="display:flex;  justify-content: space-between;">
        <div class="headTitle">物业人员信息</div>
        <div class="right">
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
          <el-table-column label="岗位" prop="post">
            <template slot-scope="scope">{{scope.row.post?scope.row.post:'--'}}</template>
          </el-table-column>
          <el-table-column label="联系电话" prop="phone">
            <template slot-scope="scope">{{scope.row.phone?scope.row.phone:'--'}}</template>
          </el-table-column>
          <el-table-column label="入职时间" prop="entryTime">
            <template slot-scope="scope">{{scope.row.entryTime?scope.row.entryTime:'--'}}</template>
          </el-table-column>
          <el-table-column label="在职状态" prop="jobstatus">
            <template slot-scope="scope">{{scope.row.jobstatus=='0'?'离职':'在职'}}</template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <span
                size="medium" class="amendSpan"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑/</span>
              <span
                size="medium"
                type="danger" class="deleteSpan"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
// import popup from './common/popup'
import propertyEdit from './common/propertyEdit' //修改物业基本信息组件
export default {
  components: {
    // popup,
    propertyEdit
  },
  data() {
    return {
      dpt: '',
      rol: '',
      Id: '',
      propertyInfo: [
        { name: '公司编码', text: '' },
        { name: '公司地址', text: '' },
        { name: '服务园区', text: '' },
        { name: '建筑面积', text: '' }
      ],
      headInfo: [
        { nameHead: '消防安全负责人', name: '' },
        { nameHead: '负责人联系方式', phone: '' },
        { nameHead: '消防安全管理人', name: '' },
        { nameHead: '管理人联系方式', phone: '' }
      ],
      bottomInfo: [
        { name: '消控室数量', text: '' },
        { name: '消防设施检测单位', text: '' }
      ],
      tableData: [],
      obj: {},
      personInfo: {
        date: '',
        name: '',
        gender: '',
        education: '',
        jobs: '',
        phone: '',
        born: '',
        address: ''
      },
      // 编辑数据
      flag: {
        show: false,
        title: '',
        option: 'edit'
      }
    }
  },
  mounted() {
    var that = this
    this.queryPlatform()
    // this.handleQueryUserInfo() //获取人员
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
    const dept = getCookie('dept_id')
    // alert(dept)
    that.$request.platform.getuserinfolist({ deptId: dept }).then(res => {
      console.log('manmanman', res.data.rows)
      that.tableData = res.data.rows
    })
  },
  methods: {
    // 物业基本信息
    async queryPlatform() {
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
      const dept = getCookie('dept_id')
      let res = await this.$request.platform.PropertyById({ propertyId: dept })
      this.obj = res.data
      console.log('<><>', this.obj)
      this.propertyInfo[0].text = this.obj.companyCode
      this.propertyInfo[1].text = this.obj.companyAddress
      this.propertyInfo[2].text = this.obj.managementArea
      this.propertyInfo[3].text = this.obj.area
      this.headInfo[0].name = this.obj.fireSafetyManager
      this.headInfo[1].name = this.obj.person_liable_telephone
      this.headInfo[2].name = this.obj.personLiableTelephone
      this.headInfo[3].name = this.obj.managerTelephone
      this.bottomInfo[0].name = this.obj.fireRoomNumber
      this.bottomInfo[1].text = this.obj.fireInspectionUnit
    },
    // 查询人员接口
    async handleQueryUserInfo() {
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
      const dept = getCookie('dept_id')
      // alert(dept)
      var that = this
      that.$request.platform.getuserinfolist({ deptId: dept }).then(res => {
        console.log('manmanman', res.data.rows)
          that.tableData = res.data.rows
      })
    },
    // 编辑人员信息
    handleEdit(index, row) {
      console.log(index, row)
      this.personInfo = JSON.parse(JSON.stringify(row))
      this.dialog = {
        show: true,
        title: '编辑人员信息',
        option: 'edit',
        fun: async form => {
          //新增
          // 编辑人员信息
          let obj = JSON.parse(JSON.stringify(form))
          console.log(obj, '回调')
          if (typeof obj.jobstatus === 'string') {
            obj.jobstatus === '离职' ? (obj.jobstatus = 0) : (obj.jobstatus = 1)
          }
          console.log(obj, '回调')
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
    // 新增人员信息
    addPersonInfo() {
      this.personInfo = JSON.parse(JSON.stringify(this.tableData[0]))
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
          console.log(form, '回调')
          form.account = form.phone
          await this.$request.platform.addUseInfo(form)
          this.handleQueryUserInfo()
        }
      }),
        this.$popup(this.dialog, arr, this.personInfo)
    },
    handleEdmit() {
      this.flag = {
        show: true,
        title: '修改物业信息',
        option: 'edit'
      }
    },
    async handleDelete(index, row) {
      console.log(index, row) //删除人员
      let flag = await this.$utils.openShow()
      if (flag) {
        let res = await this.$request.platform.deleteUseInfo(row.id)
        this.handleQueryUserInfo()
      }
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
}
.deleteSpan {
  color: #909399;
  cursor: pointer;
}
.amendSpan {
  color: #0080d0;
  cursor: pointer;
}
.property-info {
  margin-bottom: 20px;
  border-bottom: 0.5px solid #999;
  padding-bottom: 20px;
  .property-herders {
    display: flex;
    justify-content: space-between;
  }
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
/deep/.el-table th > .cell {
  text-align: left;
}
/deep/.el-table .cell {
  text-align: left;
}
</style>