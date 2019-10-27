<!-- 园区管理页面 -->
<template>
  <div class="property">
    <popup :dialog="dialog" :form="tableData"></popup>
    <!-- 园区基本信息 -->
    <div class="property-info">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
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
        <span class="headTitle">园区物业信息</span>
        <div>
          <el-button size="medium" @click="changeDisabled" type="primary" >编辑</el-button>
          <el-button size="medium" @click="saveManData" type="primary">保存</el-button>
        </div>
      </div>
      <el-row>
        <el-col :span="6" v-for="(item, index) in propertyInfo" :key="index" >
         <div class="headTable" >
          <span >
              {{ item.name}}:
            <span >
              {{ item.text == 'null' || item.text =='undefined' ? '':item.text}}
            </span>
          </span>
         </div>
        </el-col>
        <el-col :span="6">
          <div class="info-item">
            <div  class="headTable">服务园区:
              <span >{{managementArea}}</span>
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
        <el-row v-for="(item,index) in headInfo" :key ="index">
        <el-col :span="6" >
          <div class="headTable" >
            <span >{{ item.nameHead }}:</span>
            <span >{{ item.name}}</span>
          </div>
        </el-col>
          <el-col :span="6" >
          <div class="headTable" >
            <span >{{ item.phoneHead }}:</span>
            <span >{{ item.phone}}</span>
          </div>
        </el-col>
        </el-row>
        <!--<el-col :span="6" v-for="(item,index) in headInfo" :key="index" >-->
          <!---->
        <!--</el-col>-->
        </el-row>


    </div>
    <!-- 消控室  微型消防站 -->
    <div class="twoStation" style="padding: 20px 0;">
      <div>
        <div class="title">消控室信息</div>
        <el-table
          :data="fireRooms"
          :border='true'
          stripe
          style="width: 100%">
          <el-table-column
            prop="parkId"
            label="园区">
            <template slot-scope="scope">
            {{scope.row.parkId=='1106'?'国际会展中心二期':scope.row.parkId=='1107'?'中大产业园':scope.row.parkId=='1108'?'润丰产业园':scope.row.parkId=='1109'?'鹏辉产业园':'国际会展中心一期'}}
          </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="消控室名称">
          </el-table-column>
          <el-table-column
            prop="fireRoomTelephone"
            label="消控室电话">
          </el-table-column>
          <el-table-column
            prop="administrator"
            label="消控负责人">
          </el-table-column>
          <el-table-column
            prop="administratorTelephone"
            label="负责人电话">
          </el-table-column>
        </el-table>
      </div>
      <div>
        <div class="title">微消站信息</div>
        <el-table
          :data="MiniFireStation"
          :border='true'
          stripe
          style="width: 100%">
          <el-table-column
            prop="parkId"
            label="园区">
            <template slot-scope="scope">
            {{scope.row.parkId=='1106'?'国际会展中心二期':scope.row.parkId=='1107'?'中大产业园':scope.row.parkId=='1108'?'润丰产业园':scope.row.parkId=='1109'?'鹏辉产业园':'国际会展中心一期'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="微消站名称">
          </el-table-column>
          <el-table-column
            prop="miniFireStationTelephone"
            label="微消站电话">
          </el-table-column>
          <el-table-column
            prop="administrator"
            label="微消负责人">
          </el-table-column>
          <el-table-column
            prop="administratorTelephone"
            label="负责人电话">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="person-info">
      <div class="property-info-herder">
        <span class="headTitle">物业人员信息</span>
        <!-- <el-button size="mini" @click="addPersonInfo" type="primary">新增</el-button> -->
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
          <el-table-column prop="gender" label="性别">
            <template slot-scope="scope">{{scope.row.gender?(scope.row.gender=='2'?'女':'男'):'--'}}</template>
          </el-table-column>
          <el-table-column 
            label="出生年月"
            prop="brithddate">
            <template slot-scope="scope">{{scope.row.brithddate?scope.row.brithddate:'--'}}</template>
          </el-table-column>
          <!-- <el-table-column 
            label="学历"
            prop="education">
          </el-table-column> -->
          <el-table-column 
            label="岗位"
            prop="post">
            <template slot-scope="scope">{{scope.row.post?scope.row.post:'--'}}</template>
          </el-table-column>
          <el-table-column 
            label="联系电话"
            prop="phone">
            <template slot-scope="scope">{{scope.row.phone?scope.row.phone:'--'}}</template>
          </el-table-column>
          <el-table-column 
            label="入职时间"
            prop="entryTime">
            <template slot-scope="scope">{{scope.row.entryTime?scope.row.entryTime:'--'}}</template>
          </el-table-column>

           <el-table-column 
            label="角色"
            prop="roleName">
            <!-- <template slot-scope="scope">
            {{scope.row.isSuperAdmin==='0'?'普通权限':'管理权限'}}
          </template> -->
             <template slot-scope="scope">{{scope.row.roleName ? scope.row.roleName:'--'}}</template>
          </el-table-column>
          <el-table-column 
            label="在职状态"
            prop="jobstatus">
          </el-table-column>
        <!-- <el-table-column label="操作" width="150">
          <template slot-scope="scope" class="btnstyle">
            <span
              size="mini"
              style="color:#0080d0;"
              @click="handleEdit(scope.$index, scope.row)">编辑 </span>/
            <span
              size="mini"
              type="danger"
              style="color:#909399;"
              @click="handleDelete(scope.$index, scope.row)"> 删除</span>
          </template>
        </el-table-column> -->
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import popup from './common/popup'
  export default {
  components: {
    popup
  },
    data() {
      return {
        jgid:'',
        propertyInfo: [
          {name:'项目编码', text:''},
          {name:'建筑面积', text:''},
          {name:'消防设施维保单位', text:''},
          {name:'项目地址', text:''},
          {name:'项目经纬度', text:''}
        ],
        headInfo: [
          {nameHead:'消防安全负责人', name:'', phoneHead:'负责人联系方式', phone:''},
          {nameHead:'消防安全管理人', name:'', phoneHead:'管理人联系方式', phone:''}
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
        // 园区下拉选择
        disabled: true,
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
        // 选中的园区
        value1: [],
        managementArea:"",
        // 当前的园区
        currentManagementArea:'',
        // 默认tabs页 //选中的物业id
        activeName: '',
        // 所有物业数据
        allPlatform:[]
      }
    },
    async mounted() {
      await this.AllPlatform()
//      this.queryFireRoomByInfo()
//      this.queryPlatform()
//      this.handleQueryUserInfo()
    },
    watch: {
     
      activeName(val){
          this.queryPlatform(val);
      },
      value1(val) {

        console.log(val)
      }
    },
    methods: {
      // 切换tabs页
      handleClick(tab) {
        console.log(tab.name,'物业IDD');
        // this.queryPlatform2({propertyId:tab.name}).then(res=>{
        //   console.log(11111111,res.data)
        // })
        // console.log(111)

      },
        async queryPlatform(val){
            var that = this
            debugger
            that.$request.platform.getuserinfolist({deptId:val}).then(res=>{
                console.log(val,res.data)
                that.tableData = res.data.rows
                that.tableData.forEach(a=>{
                    if(a.jobstatus=="0"){
                        a.jobstatus = '离职'
                    }else if(a.jobstatus=="1"){
                        a.jobstatus = '在职'
                    }
                })

                that.$request.platform.selectByDeptId({deptId:val}).then(res=>{
                    that.MiniFireStation = res.data
                })
                that.$request.platform.selectFireRoomByDeptId({deptId:val}).then(res=>{
                    that.fireRooms = res.data
                })

                that.$request.platform.PropertyById({propertyId :val}).then(res=>{
                    that.managementArea = res.data.managementArea
                    this.value1=[];//清除园区选中项
                    if(this.managementArea){
                        let areaNames=this.managementArea.split("、");
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
//                    for(i in res.data){
//                        if(res.data.area = null){
//                            res.data.area = ''
//                        }else if(res.data.area = undefined){
//                            res.data.area = ''
//                        }
//                    }

                    that.propertyInfo[0].text = res.data.companyCode
                    that.propertyInfo[1].text = res.data.area
                    that.propertyInfo[2].text = res.data.fireInspectionUnit
                    that.propertyInfo[3].text = res.data.companyAddress
                    that.propertyInfo[4].text = res.data.latitudeLongitude
                    that.headInfo[0].name = res.data.fireSafetyPersonLiable
                    that.headInfo[0].phone = res.data.personLiableTelephone
                    that.headInfo[1].name = res.data.fireSafetyManager
                    that.headInfo[1].phone = res.data.managerTelephone
                })


            })
        },
      // 所有物业信息
      async AllPlatform() {
        let res = await this.$request.platform.getdeptlist1({pageNo:1,pageSize:10,type:"2"})
        this.allPlatform = res.data.rows
          this.activeName = this.allPlatform[0].id;
        // this.Id = res.data.rows.id
        console.log(55555555555555,res.data.rows)
      },
      // 查询人员接口
      async handleQueryUserInfo(){
        let allUser = await this.$request.platform.queryUseInfo()
        this.tableData = allUser.data.rows
        this.$utils.isWhat(this.tableData,{oldName:'jobstatus',newName:0,isTrue:'离职',isFalse:'在职'}, 'sanmu')
        console.log(allUser.data.rows,'用户信息')
      },
      //获得园区相关联的消控室信息 微型消防站信息
      async queryFireRoomByInfo() {
        let fireRooms = await this.$request.platform.queryFireRoom()
        fireRooms = fireRooms.data[0]
        this.fireRooms = fireRooms
        let MiniFireStation = await this.$request.platform.queryMiniFireStation()
        MiniFireStation = MiniFireStation.data[0]
        this.MiniFireStation = MiniFireStation
        console.log(this.MiniFireStation,'消控室信息')
      },
      // 新增人员信息
      addPersonInfo() {
        this.personInfo = JSON.parse(JSON.stringify(this.tableData[0]))
        let arr = [{prop:'createTime',label:'日期'},
          {prop:'name',label:'姓名'},
          {prop:'gender',label:'性别'},
          {prop:'education',label:'学历'},
          {prop:'post',label:'工作'},
          {prop:'phone',label:'电话'},
          {prop:'brithddate',label:'出生'},
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
            // 编辑人员信息
            let obj =  JSON.parse(JSON.stringify(form))
            console.log(obj,'回调')
            if(typeof(obj.jobstatus) === 'string') {
                obj.jobstatus === '离职'?obj.jobstatus=0:obj.jobstatus=1
            }
            console.log(form,'回调')
            await this.$request.platform.updatedUseInfo(obj)
            this.handleQueryUserInfo()
          }
        }
        let arr = [
          // {prop:'createTime',label:'日期'},
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
        this.value1=[];//清除园区选中项
        if(this.managementArea){
            let areaNames=this.managementArea.split("、");
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
      async saveManData() {
        this.disabled = true
          debugger
        if(this.value1.length === 0) return
        await this.$request.platform.changeParkOproperty({'parkIds[]':String(this.value1),propertyId:this.activeName})
        this.queryPlatform(this.activeName);
        this.value1 = []
      }
    }
  }
</script>
<style lang="less" scoped>
.property {
  padding: 20px;
  background-color: #fff;
}
.property-info {
  margin-bottom: 20px;
  padding-bottom:20px;
  border-bottom:0.5px solid #666;
}
.headTable{
  font-size:14px;color: #606266;
  padding: 10px 2px;
  display: inline-block;
}
.headTitle{
   font-size:16px;color: #333;
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