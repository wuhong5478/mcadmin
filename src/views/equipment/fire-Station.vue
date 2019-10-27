<template>
  <div class="wrap">
    <div class="box">
      <div class="form-box">
        <p class="title" style="font-size:16px;color:#333">微型消防站管理</p>
        <el-button
                    size="medium"
                    type="primary"
                    @click="handleTabsEdit('','add')"
                    :disabled="bjan"
                    style="position: relative;top:-39px;float:right"
                    
         >新增</el-button>
        <el-tabs v-model="editableTabsValue"  type="card" closable @edit="handleTabsEdit">
          <el-tab-pane
            v-for="(item) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >

<el-dialog
  title="提示"
  :visible.sync="firedelete"
  width="30%"
  :before-close="handleClose">
  <span icon="el-icon-warning-outline">是否删除该微型消防站信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="firedelete = false">取 消</el-button>
    <el-button type="primary" @click="removefire">确 定</el-button>
  </span>
</el-dialog>

            <el-row type="flex" justify="end">
              <el-col :span="4">
                <div style="text-align:right;">
                  <el-button size="medium" @click="chageWei()" type="primary">{{weiText}}</el-button>
                  
                </div>
              </el-col>
            </el-row>
            <el-form :inline="true" :disabled="wei" :model="listFire">
              <el-form-item label="微型消防站名称">
                <el-input v-model="listFire.name"></el-input>
              </el-form-item>
              <el-form-item label="微型消防站地址" >
                <el-input v-model="listFire.address" style="padding-left:13px;
              "></el-input>
              </el-form-item>
              <el-form-item label="微型消防站经度">
                <el-input v-model="listFire.longitude" ></el-input>
              </el-form-item>
              <el-form-item label="微型消防站纬度" >
                <el-input v-model="listFire.latitude" ></el-input>
              </el-form-item>
              <el-form-item label="管理人联系电话">
                <el-input v-model="listFire.administratorTelephone"></el-input>
              </el-form-item>
              
              <el-form-item label="微型消防站管理人" >
                <el-input v-model="listFire.administrator"></el-input>
              </el-form-item>
              
              <el-form-item label="管辖区域">
                <el-select v-model="listFire.managementArea" placeholder="请选择" style="padding-left:41px;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="form-box addStyle" style="padding:20px">
        <div style="font-size:16px;color:#333;">微消站人员信息</div>
        <el-button
          size="medium"
          class="oneButton"
          style="position:relative;top:-26px;"
          type="primary"
          @click="changePersonNew()"
        >新增</el-button>
        <fi-table :colConfigs="tabConfig" :listdata="userInfo" style="margin-top:-25px;">

          <el-table-column slot="opt" label="操作" width="150">
            <template slot-scope="scope">
              <span
                size="medium"
                style="color:#0080d0;cursor: pointer;"
                @click="changePerson('edit', scope.row)"
                :disabled="bjan"
              >编辑</span>
            
             <!-- <span
                size="medium"
                type="danger"
                style="color:#909399;"
                @click="handleDelete(scope.$index, scope.row)"
                :disabled="true"
              >删除</span>  -->
            </template>
          </el-table-column>
        </fi-table>
      </div>
      <div class="form-smallbox">
        <!-- <div class="title1">车辆总数: <span> 888</span></div> -->
        <fi-table :colConfigs="formInline.Material.car" :listdata="carlist">
          <el-table-column label="操作" width="150" slot="opt">
            <template slot-scope="scope">
              <span size="medium" style="color:#0080d0;" @click="changeCar('car', scope.row)">编辑</span>
            </template>
          </el-table-column>
        </fi-table>
      </div>
      <div class="form-smallbox">
        <fi-table :colConfigs="formInline.Material.Extinguisher" :listdata="list2">
          <el-table-column label="操作" width="150" slot="opt">
            <template slot-scope="scope">
              <span size="medium" style="color:#0080d0;" @click="tool1('Extinguisher', scope.row)">编辑</span>
            </template>
          </el-table-column>
        </fi-table>
      </div>

      <div class="form-smallbox">
        <fi-table :colConfigs="formInline.Material.Extinguisher" :listdata="list2">
          <el-table-column label="操作" width="150" slot="opt">
            <template slot-scope="scope">
              <span size="medium" style="color:#0080d0;" @click="tool1('Extinguisher', scope.row)">编辑</span>
            </template>
          </el-table-column>
        </fi-table>
      </div>
      <div class="form-smallbox">
        <fi-table :colConfigs="formInline.Material.Dismantler" :listdata="list3">
          <el-table-column label="操作" width="150" slot="opt">
            <template slot-scope="scope">
              <span size="medium" style="color:#0080d0;" @click="tool1('Extinguisher', scope.row)">编辑</span>
            </template>
          </el-table-column>
        </fi-table>
      </div>
      <div class="form-smallbox">
        <fi-table :colConfigs="formInline.Material.Personal" :listdata="list4">
          <el-table-column label="操作" width="150" slot="opt">
            <template slot-scope="scope">
              <span size="medium" style="color:#0080d0;" @click="tool1('Dismantler', scope.row)">编辑</span>
            </template>
          </el-table-column>
        </fi-table>
      </div>
      <div class="form-smallbox">
        <fi-table :colConfigs="formInline.Material.Communication" :listdata="list5">
          <el-table-column label="操作" width="150" slot="opt">
            <template slot-scope="scope">
              <span size="medium" style="color:#0080d0;" @click="tool1('Personal', scope.row)">编辑</span>
            </template>
          </el-table-column>
        </fi-table>
      </div>
      <div class="form-smallbox">
        <fi-table :colConfigs="formInline.Material.Video" :listdata="list6">
          <el-table-column label="操作" width="150" slot="opt">
            <template slot-scope="scope">
              <span size="medium" style="color:#0080d0;" @click="tool1('Communication', scope.row)">编辑</span>
            </template>
          </el-table-column>
        </fi-table>
      </div>
      <el-dialog title="增加微型消防站人员" :visible.sync="dialogVisible" width="60%">
        <el-table :data="tabArr" :count="count" @selection-change="handler">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="gender" label="性别">
            <template slot-scope="scope">
              {{scope.row.gender==1?'男':scope.row.gender==2?'女':scope.row.gender==null?'':scope.row.gender=='男'?'男':scope.row.gender=='女'?'女':''}}
            </template>
          </el-table-column>
          <el-table-column prop="birthddate" label="出生年月"></el-table-column>
          <el-table-column prop="post" label="岗位"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop="jobstatus" label="在职状态">
            <template slot-scope="scope">
                  {{scope.row.jobstatus==1?'在职':'不在职'}}
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>

         <!-- 分页 -->
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

      </el-dialog>
    </div>
  </div>
</template>
<script>
    import config from './config.json'
    export default {
        data() {
            return {
              currentPage: 1,
              pageSize: 10,
              total: 0,
                targetNum:'',
                firedelete:false,
                delete:{
                "fireStationId":"",
                "type":1,
                "userId":""
                },
                nkn:'',
                bjan:false,
                wei: true,
                weiText: '编辑',
                carlist:[],//车量
                list2:[],//工具
                list3:[],//工具
                list4:[],//工具
                list5:[],//工具
                list6:[],//工具
                userInfo:[],//微消站人员信息
                options:[
                    {value:'国际会展中心二期', lable:'1106'},
                    {value:'中大产业园', lable:'1107'},
                    {value:'润丰产业园', lable:'1108'},
                    {value:'鹏辉产业园', lable:'1109'},
                    {value:'国际会展中心一期', lable:'1110'}
                ],
                listFire:{},//微型消防站管理列表
                tabConfig: config.station.tabConfig,
                formInline:config.station,
                personnelVisible:false,


        editableTabsValue: '2',
        editableTabs: [],
        tabIndex: 2,
        dialogVisible:false,
        tabArr:[],
        id:'',
        totalCount:[],
        selectArr:[],

        subtypesId:'',
        count:0
        }
        },
        mounted() {
            this.FireStationList()
            
            this.queryPersonList(this.editableTabsValue) //查询人员
            var that = this
            that.$request.equipment.selectMaterialByType({miniFireStationId :2}).then(res=>{{
                console.log('嚯嚯嚯',res.data)
                this.carlist = res.data[1]
                this.list2 = res.data[2]
                this.list3 = res.data[3]
                this.list4 = res.data[4]
                this.list5 = res.data[5]
                this.list6 = res.data[6]
            }})
        },
        watch:{
            editableTabs(val){
                // alert(val)
                if(val==[]){
                    this.bjan = true
                    this.formInline = []
                }
            },
            async editableTabsValue(val) {
                this.nkn = val
               
                console.log(val) //根据id查询微消站信息
                let res = await this.$request.equipment.queryMaterialID({id:val})
                this.listFire = res.data
                console.log('您出来了',this.listFire)
                if(this.listFire.managementArea==1106){
                  this.listFire.managementArea='国际会展中心二期'
                }else if(this.listFire.managementArea==1107){
                  this.listFire.managementArea='中大产业园'
                }else if(this.listFire.managementArea==1108){
                  this.listFire.managementArea='润丰产业园'
                }else if(this.listFire.managementArea==1109){
                  this.listFire.managementArea='鹏辉产业园'
                }else if(this.listFire.managementArea==1110){
                  this.listFire.managementArea='国际会展中心一期'
                }
                this.queryPersonList(val)
                //根据微消站站id查询物资
                // this.queryListInfo({miniFireStationId:val})
                var that = this
                that.$request.equipment.selectMaterialByType({miniFireStationId:val }).then(res=>{
                    console.log('这是物资',res)
                        this.carlist = res.data[1]
                        this.list2 = res.data[2]
                        this.list3 = res.data[3]
                        this.list4 = res.data[4]
                        this.list5 = res.data[5]
                        this.list6 = res.data[6]
                    
                })
            }
        },
        methods: {
            // 分页点击
            currentChange(){
                 var that = this
              that.$request.xks.getuserinfolist({pageNo:that.currentPage,pageSize:10}).then(res=>{
                that.tabArr = res.data.rows
                that.total = res.dataSize
              })
            },

            // 删除微消站弹窗
            removefire(){
              var that = this
              // alert(that.targetNum)
            that.$request.equipment.removeMaterial({miniFireStationId:that.targetNum}).then(res=>{
              that.FireStationList()
            })
              that.firedelete = false
            },
            // 新增
            changePersonNew(){
               var that = this
               this.dialogVisible = true;
               this.$request.systemUser.getuserinfolist({
                            // EAC180ED704144018783DD0741B01FD5
                            account:'',
                            deptId: 'EAC180ED704144018783DD0741B01FD5',
                            pageNo:1,
                            pageSize:10,
                            phone:'',
                            roleId:'',
                            subtypes:1,//  1 属于微型消防站 2 属于消控室
                            integer:''
                        }).then((result) => {
                            that.tabArr =result.data.rows
                            that.total = result.dataSize
                        }).catch((err) => {
                            
                        });

            },
            submit(){
      
              var that = this
                let arr = []
                this.selectArr.forEach(el =>{
                    arr.push(el.id)
                })
                 var jsonData ={
                            "ids": arr,
                            subtypes: 1,
                            subtypesId: this.subtypesId
                            }


                 that.$request.systemUser.batchAdd(jsonData).then(res=>{
                   console.log(res)
                   that.$request.equipment.queryMaterialUser({subtypes:1,subtypesId:that.subtypesId}).then(res=>{
                     console.log(res)
                     that.userInfo = res.data.rows
                     this.$utils.isWhat(this.userInfo,{oldName:'jobstatus',newName:0,isTrue:'离职',isFalse:'在职'}, 'sanmu')
                     this.$utils.isWhat(this.userInfo,{oldName:'gender',newName:'1',isTrue:'男',isFalse:'女'}, 'sanmu')
                   })
                 });
                 this.dialogVisible=false
                
            },
            handler (val){
                this.selectArr=val
            },
            async queryPersonList(value) {
                this.subtypesId = value
                //根据id查询微消站人员信息
                let userInfo = await this.$request.equipment.queryMaterialUser({subtypes:1,subtypesId:value})
                console.log(userInfo.data.rows,'微消站人员信息')
                this.userInfo = userInfo.data.rows
                // this.userInfo.gender==1?'男':this.userInfo.gender==2?'女':this.userInfo.gender==null?'':this.userInfo.gender=='男'?'男':this.userInfo.gender=='女'?'女':''
                this.$utils.isWhat(this.userInfo,{oldName:'jobstatus',newName:0,isTrue:'离职',isFalse:'在职'}, 'sanmu')
                this.$utils.isWhat(this.userInfo,{oldName:'gender',newName:'1',isTrue:'男',isFalse:'女'}, 'sanmu')
                
                console.log(this.userInfo,'asdfrtgy')
            },
            async handleTabsEdit(targetName, action) {
                console.log(targetName, action)
                // debugger
                if(action === 'add'){
                console.log('这是增加')
                let arr = [
                {prop:'name',label:'微消站名称'},
                {prop:'address',label:'微消站地址'},
                {prop:'longitude',label:'微消站经度'},
                {prop:'latitude',label:'微消站纬度'},
                {prop:'managementArea',label:'管辖区域', select:[
                  
                    {value: 1106,label: '国际会展中心二期'},
                    {value: 1107,label: '中大产业园'},
                    {value: 1108,label: '润丰产业园'},
                    {value: 1109,label: '鹏辉产业园'},
                    {value: 1110,label: '国际会展中心一期'}
                ]},
                {prop:'administrator',label:'微型消防站管理人'},
                {prop:'administratorTelephone',label:'管理人联系电话'},
                ]
                this.dialog = {
                show: true, 
                title: "新增微型消防站",
                option: "add",
                // disabled:this.bjan
                fun:async (form)=> { //新增
                    console.log(form,'回调')
                    form.parkId = 1106
                    await this.$request.equipment.addAndUpdateMiniFireStation(form)
                    this.FireStationList()
                }
                },
                this.$popup(this.dialog, arr)
                }
                if(action === 'remove') {
                    // 根据微消站ID删除微消站
                    console.log('remove0',targetName)
                    this.targetNum = targetName
                    this.firedelete = true
                        // await this.$request.equipment.removeMaterial({miniFireStationId:targetName})
                        // this.FireStationList()
                }
            },
            chageWei() {
                if (this.wei === true) {
                    this.wei = false
                    this.weiText = '保存'
                } else {
                    this.wei = true
                    console.log(this.listFire,'提交编辑请求')
                    this.$request.equipment.addAndUpdateMiniFireStation (this.listFire)
                     this.weiText = '编辑'
                }
            },
            async FireStationList() {
                let res = await this.$request.equipment.queryFireStationList()
                this.listFire = res.data[0]
                let objs = []
                console.log('hhhhhhhhh',res.data)
                res.data.forEach(element => {
                    let num = element.id+''
                    let obj = {title:element.name, name:num}
                    objs.push(obj)
                });
                this.editableTabs = objs
                console.log(this.editableTabs,'dangqian')
                console.log(res.data,'消防站列表')
                console.log(this.listFire ,'展示列表')
            }
            ,
            async queryListInfo(params) { //获取物资列表
                let res = await this.$request.equipment.queryMaterialInfo(params)
                this.carlist = res.data[1]
                this.list2 = res.data[2]
                this.list3 = res.data[3]
                this.list4 = res.data[4]
                this.list5 = res.data[5]
                this.list6 = res.data[6]
                console.log(res,'信息')
            }
            ,
            changePerson(value, item = {}) {
                let arr = [
                {prop:'name',label:'姓名'},
                {prop:'gender',label:'性别',select:[
                  {value:'男',label:1},
                  {value:'女',label:2}
                ]},
                {prop:'brithddate',label:'出生日期', picker:true},
                {prop:'post',label:'岗位',select:[
                    {value:'站长',label:'站长'},
                    {value:'副站长',label:'副站长'},
                    {value:'消防员',label:'消防员'},
                    {value:'控制室值班员',label:'控制室值班员'}
                ]},
                {prop:'phone',label:'联系电话'},
                {prop:'jobstatus',label:'在职状态', select:[
                    {value: 0,label: '离职'}, 
                    {value: 1,label: '在职'}
                ]}
                ]
                this.dialog = {
                show: true, 
                title: "增加微消站人员",
                option: "add",
                fun:async (form)=> { //新增
                    console.log(form,'回调',this.editableTabsValue)
                    form.subtypes = 1 //微消站 是1
                    form.subtypesId = this.editableTabsValue //微消站 IDD
                    //添加人员
                    console.log(form.id,'idididi')
                    if(form.id){
                        // 编辑人员信息
                        let obj =  JSON.parse(JSON.stringify(form))
                        console.log(obj,'回调')
                        if(typeof(obj.jobstatus) === 'string') {
                            obj.jobstatus === '离职'?obj.jobstatus=0:obj.jobstatus=1
                        }
                        console.log(obj)
                        await this.$request.platform.updatedUseInfo(obj)
                    }else{
                        // 新增人员信息
                        form.account = form.phone
                        await this.$request.platform.addUseInfo(form)
                    }    
                    this.queryPersonList(this.editableTabsValue) //查询人员
                }
                }
                if(value === 'add') {
                    console.log('这是增加')
                    this.$popup(this.dialog, arr)
                }else {
                    console.log(item,'这是编辑')
                    let objs = {...this.dialog,title:'编辑微消站人员',option: "edit",}                 
                    this.$popup(objs, arr, JSON.parse(JSON.stringify(item)))
                } 
            },
             async handleDelete(index, item) {
                console.log(index, item.id)
                // 根据微消站ID删除人员信息
                let flag = await this.$utils.openShow()                
                if(flag) {
                    //删除人员信息
                    // alert(11111111111111,item)
                    // await this.$request.platform.deleteUseInfo(item.id)
                    // 查询人员信息
                    // this.queryPersonList(this.editableTabsValue)
                }
                
            },
            changeCar(flag, item) {
                console.log(flag, item,)
                let currentFlag = [] //必传参数 form表单的 prop 和 label
                currentFlag = JSON.parse(JSON.stringify(this.formInline.Material.car)) //🚗
                this.dialog = { //必传参数 组件的显示 以及 配置项
                show: true, 
                title: "编辑车辆信息",
                option: "edit",
                fun:async (form)=> { //编辑
                    console.log(form,'回调')
                    await this.$request.equipment.addAndUpdateFireEmergency(form)
                     var that = this
                        that.$request.equipment.selectMaterialByType({miniFireStationId:1}).then(res=>{{
                            console.log('嚯嚯嚯',res.data)
                            this.carlist = res.data[1]
                            this.list2 = res.data[2]
                            this.list3 = res.data[3]
                            this.list4 = res.data[4]
                            this.list5 = res.data[5]
                            this.list6 = res.data[6]
                        }})
                }
                },
                this.$popup(this.dialog, currentFlag, item)
                
            },
            tool1(flag, item) {
                console.log(flag, item,)
                let currentFlag = [] //必传参数 form表单的 prop 和 label
                currentFlag = JSON.parse(JSON.stringify(this.formInline.Material.Extinguisher)) //🚗
                this.dialog = { //必传参数 组件的显示 以及 配置项
                show: true, 
                title: "编辑工具信息",
                option: "edit",
                fun:async (form)=> { //编辑
                    console.log(form,'回调')
                    await this.$request.equipment.addAndUpdateFireEmergency(form)
                    this.FireStationList()
                   var that = this
                        that.$request.equipment.selectMaterialByType({miniFireStationId:1}).then(res=>{{
                            console.log('嚯嚯嚯',res.data)
                            this.carlist = res.data[1]
                            this.list2 = res.data[2]
                            this.list3 = res.data[3]
                            this.list4 = res.data[4]
                            this.list5 = res.data[5]
                            this.list6 = res.data[6]
                        }})
                }
                },
                this.$popup(this.dialog, currentFlag, item)
                
            },
    chageWei() {
      if (this.wei === true) {
        this.wei = false
        this.weiText = '保存'
      } else {
        this.wei = true
        console.log(this.listFire, '提交编辑请求')
        var that = this
        this.$request.equipment.addAndUpdateMiniFireStation(this.listFire).then(res=>{
          
        })
        this.weiText = '编辑'
      }
    },
    async FireStationList() {
      let res = await this.$request.equipment.queryFireStationList()
      this.listFire = res.data[0]
     
      let objs = []
      res.data.forEach(element => {
        let num = element.id + ''
        let obj = { title: element.name, name: num }
        objs.push(obj)
      })
      this.editableTabs = objs
      console.log(this.editableTabs, 'dangqian')
      console.log(res.data, '消防站列表')
      console.log(this.listFire, '展示列表')
    },
    async queryListInfo(params) {
      //获取物资列表
      let res = await this.$request.equipment.queryMaterialInfo(params)
      this.carlist = res.data[1]
      this.list2 = res.data[2]
      this.list3 = res.data[3]
      this.list4 = res.data[4]
      this.list5 = res.data[5]
      this.list6 = res.data[6]
      console.log(res, '信息')
    },
    changePerson(value, item = {}) {
      let arr = [
        { prop: 'name', label: '姓名' },
        { prop: 'phone', label: '联系电话' },
        {
          prop: 'gender',
          label: '性别',
          select: [{ value:1, label: '男' }, { value:2, label: '女' }]
        },
        { prop: 'brithddate', label: '出生年月', picker: true },  
        {prop:'post',label:'岗位',format:"yyyy-MM-dd HH:mm:ss",select:[
                    {value:'站长',label:'站长'},
                    {value:'副站长',label:'副站长'},
                    {value:'消防员',label:'消防员'},
                    {value:'控制室值  员',label:'控制室值班员'}
        ]},
        {
          prop: 'jobstatus',
          label: '在职状态',
          select: [{ value: 0, label: '离职' }, { value: 1, label: '在职' }]
        }
      ]
      this.dialog = {
        show: true,
        title: '增加微消站人员',
        option: 'add',
        fun: async form => {
          //新增
          console.log(form, '回调', this.editableTabsValue)
          form.subtypes = 1 //微消站 是1
          form.subtypesId = this.editableTabsValue //微消站 IDD
          //添加人员
          console.log(form.id, 'idididi')
          if (form.id) {
            // 编辑人员信息
            let obj = JSON.parse(JSON.stringify(form))
            console.log(obj, '回调')
            if (typeof obj.jobstatus === 'string') {
              obj.jobstatus === '离职'
                ? (obj.jobstatus = 0)
                : (obj.jobstatus = 1)
            }
            console.log(obj)
            await this.$request.platform.updatedUseInfo(obj)
          } else {
            // 新增人员信息
            form.account = form.phone
            await this.$request.platform.addUseInfo(form)
          }
          this.queryPersonList(this.editableTabsValue) //查询人员
        }
      }
      if (value === 'add') {
        console.log('这是增加')
        this.$popup(this.dialog, arr)
      } else {
        console.log(item, '这是编辑')
        let objs = { ...this.dialog, title: '编辑微消站人员', option: 'edit' }
        this.$popup(objs, arr, JSON.parse(JSON.stringify(item)))
      }
    },
    async handleDelete(index, item) {
      console.log(index, item.id)
      // 根据微消站ID删除人员信息
      let flag = await this.$utils.openShow()
      console.log(flag)
      if (flag) {
        //删除人员信息
        console.log(22222222222222222222,item);
        this.delete.fireStationId = this.editableTabsValue
        this.delete.userId = item.id
       var jsonDelete =JSON.stringify({
           fireStationId: this.editableTabsValue,
                            subtypes: 1,
                            subtypesId: item.id
                            })
        console.log('出来',jsonDelete)

        await this.$request.platform.deleteuserfireroomfirestation(jsonDelete)
        查询人员信息
        
        this.queryPersonList(this.editableTabsValue)
      }
    },
    changeCar(flag, item) {
      console.log(flag, item)
      let currentFlag = [] //必传参数 form表单的 prop 和 label
      currentFlag = JSON.parse(JSON.stringify(this.formInline.Material.car)) //🚗
      ;(this.dialog = {
        //必传参数 组件的显示 以及 配置项
        show: true,
        title: '编辑车辆信息',
        option: 'edit',
        fun: async form => {
          //编辑
          console.log(form, '回调')
          // await this.$request.equipment.addEditMaterial(form)
          // this.FireStationList()
        }
      }),
        this.$popup(this.dialog, currentFlag, item)
    },
    tool1(flag, item) {
      console.log(flag, item)
      let currentFlag = [] //必传参数 form表单的 prop 和 label
      currentFlag = JSON.parse(
        JSON.stringify(this.formInline.Material.Extinguisher)
      ) //🚗
      ;(this.dialog = {
        //必传参数 组件的显示 以及 配置项
        show: true,
        title: '编辑车辆信息',
        option: 'edit',
        fun: async form => {
          //编辑
          console.log(form, '回调')
          // await this.$request.equipment.addEditMaterial(form)
          // this.FireStationList()
        }
      }),
        this.$popup(this.dialog, currentFlag, item)
          }
        }
}
</script>
<style lang="less" scoped>
.box {
  padding: 0 20px 0 20px;
  margin-top: -30px;
  .title {
    margin: 30px 0px 20px 0;
    font-size:16px;
    color:#333;
  }
  .title1 {
    color: skyblue;
    font-family: 'Microsoft YaHei';
    font-size: 18px;
    font-weight: bold;
  }
  .form-box {
    padding: 20px 20px 0 20px;
    background: #fff;
    margin-bottom: 20px;
  }
  .form-smallbox{
     padding: 8px 20px 20px 20px;
    background: #fff;
    margin-bottom: 20px;
  }
  .addStyle {
    display: flex;
    flex-direction: column;
    .oneButton {
      align-self: flex-end;
    }
  }
}
</style>