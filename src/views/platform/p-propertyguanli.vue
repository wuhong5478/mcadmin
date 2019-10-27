<template>
<!-- 物业管理 -->
  <div class="property">
    <popup :dialog="dialog" :form="tableData"></popup>
    <maintenance :dialog="flag" :form="obj"></maintenance>
    <div class="property-info">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" v-if="allPlatform">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane
              v-for="(item, index) in allPlatform" 
              :key="index"
              :label="item.name" :name="item.id">
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>

      <div class="property-info-herder">
        <span class="headTitle">基本信息</span>
        <div>
          <el-button @click="changeEdmit" size="medium" type="primary" >编辑</el-button>
          <el-button @click="changeDisabledT" size="medium" type="primary" >保存</el-button>
        </div>
      </div>

      <div class="property-info-herder">
        <el-row>
          <el-col :span="6" v-for="(item, index) in propertyInfo" :key="index">
            <span class="headTable">{{ item.name }}：</span>
            <span class="headTable">{{ item.text }}</span>
          </el-col>

          <el-col :span="6" v-for="(item, index) in headInfo" :key="index">
            <span class="headTable">{{ item.nameHead }}:</span>
            <span class="headTable">{{ item.name }}</span>
          </el-col>
          <el-col :span="6">
            <div class="info-item">
              <div  class="headTable">服务园区:
                <span >{{currentManagementArea}}</span>
              </div>

              <el-select v-if="!disabled" v-model="value1" multiple placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>

        </el-row>
      </div>
    </div>
    <div class="person-info">
      <div class="property-info-herder">
        <span class="headTitle">维保人员信息</span>
      
      </div>
      <div class="person-form">
        <el-table :data='tableData'>
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name">
          </el-table-column>
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
          <el-table-column label="角色" prop="roleName">
            <template slot-scope="scope">{{scope.row.roleName?scope.row.roleName:'--'}}</template>
          </el-table-column>
          <el-table-column label="在职状态" prop="jobstatus">
          <template slot-scope="scope">
            {{scope.row.jobstatus==='0'?'在职':'离职'}}
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
        anan:false,
        propertyInfo: [
          {name:'公司编码', text:''},
          {name:'公司地址', text:''},
          {name:'项目经纬度', text:''},
          {name:'建筑面积', text:''}
        ],
        headInfo: [
          {nameHead:'现场负责人', name:'', phoneHead:'现场联系方式', phone:''},
          {nameHead:'单位负责人', name:'', phoneHead:'单位联系方式', phone:''}
        ],
        tableData: [],
        fireRooms:[],
        MiniFireStation:[],
        // 编辑数据
        dialog: {
          show: false,
          title: "",
          option: "edit"
        },
        // 编辑维保基本信息
        flag: {
          show: false,
          title: "",
          option: "edit"
        },
        obj:{},
        // 园区下拉选择
        disabled: true,
        options: [{
          value: '50e7op7cfe0e4e1a05373e75d11ae72100e4',
          label: '中大产业园'
        }, {
          value: '50e7op7cfe0e4e1a05373e75d11ae72100e5',
          label: '鹏辉产业园'
        }, {
          value: '50e7op7cfe0e4e1a05373e75d11ae72100e6',
          label: '润丰产业园'
        }, {
          value: '50e7op7cfe0e4e1a05373e75d11ae72100e2',
          label: '国际会展中心一期'
        }, {
          value: '50e7op7cfe0e4e1a05373e75d11ae72100e3',
          label: '国际会展中心二期'
        }],
        // 选中的园区
        value1: [],
        // 当前的园区
        currentManagementArea:'',
        currentManagementAreaId:'',
        // 维保公司id
        maintenanceId:'',
        // 默认tabs页 //选中的物业id
        activeName: '',
        // 所有物业数据
        allPlatform:[],
        options: [{
          value: '1026',
          label: '云栖小镇'
        },{
          value: '1107',
          label: '中大产业园'
        }, {
          value: '1109',
          label: '鹏辉产业园'
        }, {
          value: '1108',
          label: '润丰产业园'
        }, {
          value: '1110',
          label: '国际会展中心一期'
        }, {
          value: '1106',
          label: '国际会展中心二期'
        }],
      }
    },
    async mounted() {
      var that = this
      await this.AllPlatform()
      this.activeName = this.allPlatform[0].id
      this.queryFireRoomByInfo()
      this.queryMainManage()
      // this.handleQueryUserInfo()
      // that.$request.platform.queryUseInfo({deptId:})
    },
    watch: {
      allPlatform(val){
        console.log(12312312312312,val)
        var that = this
        
        if(val.length>0){
          this.anan = true;
          this.tableData == val
          console.log('物业编辑保存禁止')
        }else{
          this.anan = true;
        
        }
      },
      activeName(val){
        // alert(val)
        var that = this
        that.$request.platform.queryUseInfo({deptId:val}).then(res=>{
          that.tableData = res.data.rows
        })
      },
      value1(val) {
        // console.log(val)
      }
    },
    methods: {
      // 改变select
      changeSelect(val){
        this.currentManagementAreaId = val[0]
      },
      // 切换tabs页
      handleClick(tab) {
        console.log(tab.name,'维保IDD');
        this.queryMainManage({maintenanceId:tab.name})
      },
      changeEdmit() { //编辑企业基本信息
      this.disabled = false;
      this.value1=[];//清除园区选中项
      if(this.currentManagementArea){
          let areaNames=this.currentManagementArea.split("、");
          for (let i=0;i<areaNames.length;i++){
              for(let j=0;j<this.options.length;j++){
                  let labelName=this.options[j].label;
                  let areaName=areaNames[i];
                  if(labelName==areaName){
                      this.value1.push(this.options[j].value);
                  }
              }

          }
      }
      },
      // 所有物业信息
      async AllPlatform() {
        // let res = await this.$request.platform.queryMainManageList()
        let res = await this.$request.platform.getdeptlist1({type:3})
        this.allPlatform = res.data.rows
        console.log('res',this.allPlatform)
        this.maintenanceId = this.allPlatform[0].id
      },
      // 维保信息
      async queryMainManage(parmse) {
        let res = await this.$request.platform.queryMainManageList(parmse)
        this.obj =  res.data[0]
        console.log('text',res.data)
        if(this.obj){
        this.propertyInfo[0].text = this.obj.companyCode
        this.propertyInfo[1].text = this.obj.companyAddress
        this.propertyInfo[2].text = this.obj.latitudeLongitude
        this.propertyInfo[3].text = this.obj.area
        this.currentManagementArea = this.obj.managementArea
        this.headInfo[1].name = this.obj.fireSafetyManager
        this.headInfo[1].phone = this.obj.managerTelephone
        this.headInfo[0].name = this.obj.fireSafetyPersonLiable
        this.headInfo[0].phone = this.obj.personLiableTelephone      
        }else {
        this.obj = {}
        this.propertyInfo[0].text = ''
        this.propertyInfo[1].text = ''
        this.propertyInfo[2].text = ''
        this.propertyInfo[3].text = ''
        this.headInfo[1].name = ''
        this.headInfo[1].phone = ''
        this.headInfo[0].name = ''
        this.headInfo[0].phone = ''
        }
      },
      // 查询人员接口
      async handleQueryUserInfo(){
        let allUser = await this.$request.platform.queryUseInfo()
        this.tableData = allUser.data.rows
        this.$utils.isWhat(this.tableData,{oldName:'jobstatus',newName:0,isTrue:'离职',isFalse:'在职'}, 'sanmu')
        console.log(allUser.data.rows,'用户1111111信息')
        this.tableData.forEach(a=>{
          if(a.isSuperAdmin=='0'){
            a.isSuperAdmin='普通权限'
          }else if(a.isSuperAdmin=='1'){
            a.isSuperAdmin='管理权限'
          }
        })
       
      },
      //获得园区相关联的消控室信息 微型消防站信息
      async queryFireRoomByInfo() {
        let fireRooms = await this.$request.platform.queryFireRoom()
        if(fireRooms.data) {
          fireRooms = fireRooms.data[0]
        }
        this.fireRooms = fireRooms
        let MiniFireStation = await this.$request.platform.queryMiniFireStation()
        if(MiniFireStation.data) {
          MiniFireStation = MiniFireStation.data[0]
        }
        this.MiniFireStation = MiniFireStation
        console.log(this.MiniFireStation,'消控室信息')
      },
      // 新增人员信息
      addPersonInfo() {
        this.personInfo = JSON.parse(JSON.stringify(this.tableData[0]))
        let arr = [
          // {prop:'date',label:'日期'},
          {prop:'name',label:'姓名'},
          {prop:'gender',label:'性别'},
          {prop:'education',label:'学历'},
          {prop:'post',label:'工作'},
          {prop:'phone',label:'电话'},
          {prop:'brithddate',label:'出生', picker:true},
          {prop:'address',label:'地址'},
          {prop:'jobstatus',label:'状态', select:[
              {value: 0,label: '离职'}, 
              {value: 1,label: '在职'}
          ]}
        ]
        this.dialog = {
          show: true, 
          title: "新增人员信息",
          option: "add",
          fun:async (form)=> { //新增
            console.log(form,'回调')
            form.account = form.phone
            // await this.$request.platform.addUseInfo(form)
            await this.$axios({
              method: 'post',
              url: '/api/sysuser/addsysuser',
              // /maintenanceManage/updateMaintenance
              data:form
            })
            this.handleQueryUserInfo()
          }
        },
      this.$popup(this.dialog, arr, this.personInfo)
      },
      // 编辑人员信息
      handleEdit(index, row) {
        console.log(index, row)
        this.personInfo = JSON.parse(JSON.stringify(row))
        this.dialog = {
          show: true,
          title: "修改用户信息",
          option: "edit",
          fun:async (form)=> { //新增
            console.log(form,'回调')
            let obj =  JSON.parse(JSON.stringify(form))
            console.log(obj,'回调')
            if(typeof(obj.jobstatus) === 'string') {
                obj.jobstatus === '离职'?obj.jobstatus=0:obj.jobstatus=1
            }
            await this.$request.platform.updatedUseInfo(obj)
            this.handleQueryUserInfo()
          }
        }
        let arr = [
          // {prop:'date',label:'日期'},
          {prop:'name',label:'姓名'},
          {prop:'gender',label:'性别'},
          {prop:'education',label:'学历'},
          {prop:'post',label:'工作'},
          {prop:'phone',label:'电话'},
          {prop:'brithddate',label:'出生', picker:true},
          {prop:'address',label:'地址'},
          {prop:'jobstatus',label:'状态', select:[
              {value: 0,label: '离职'}, 
              {value: 1,label: '在职'}
          ]}
        ]
      this.$popup(this.dialog, arr, this.personInfo)
      },
      async handleDelete(index, row) {
        console.log(index, row); //删除人员
        let flag = await this.$utils.openShow()
        if(flag) {
          let res = await this.$request.platform.deleteUseInfo(row.id)
          this.handleQueryUserInfo()
        }             
      },
      changeDisabled() {
        this.disabled = false
      },
      async changeDisabledT() {
        var  jsonData = {
                   maintenanceId :this.maintenanceId,
                  'parkIds[]':this.value1,
                  propertyId:'EB1600B4445443C18843442FCDE564DE'  //从cookie中取出
                }
        const formData = new FormData();
         Object.keys(jsonData).forEach((key) => {
         formData.append(key, jsonData[key]);
         });
      
         this.$axios({
                method: 'post',
                url: '/api/maintenanceManage/updateMaintenance',
                data:formData
              })
              this.disabled = true;
              this.queryMainManage()
              this.queryPlatform(this.activeName);
              this.value1 = []
        //  }
      }
    }
  }
</script>
<style lang="less" scoped>
  .headTitle{
    font-size:16px;color: #333;
  }
.property {
  padding: 20px;
  background-color: #fff;
}
.property-info {
  margin-bottom: 20px;
  border-bottom: 0.5px solid #999;
}
.twoStation {
  display: flex;
  width: 100%;
  div {
    width: 50%;
    padding-right: 10px;
  }
  .title {
    font-size: 700;
    color: skyblue;
    padding-bottom: 10px;
  }
}
.property-info-herder {
  display: flex;
  justify-content: space-between;
  .logo {
    img {
      width: 100px;
      height: 100px;
      padding-top: 20px;
    }
  }
  .info {
    width: 630px;
    display: flex;
    flex-wrap:wrap;
    .info-item {
      padding: 20px;
      div {
        margin-bottom: 10px;
      }
    }
  }
  .headTable{
    font-size:14px;color: #606266;
    padding: 10px 2px;
    display: inline-block;
  }
  .head {
    display: flex;
    flex-wrap:wrap;
    .info-item {
      padding: 20px;
    }
    .headItem {
      div {
        margin-bottom: 10px;
      }
    }
  }
}
</style>