<template>
        <el-container>
<!-- tab页面 -->
        <el-main style="background:#fff">
            <p style="margin:0 0 20px 0;font-size:16px;color:#333" >消控室管理</p>
            <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit" >
              <el-tab-pane
                :key="item.name"
                v-for="(item) in editableTabs"
                :label="item.name"
                :name="item.id"
                style="padding-left:20px;"
              >

              <el-dialog
                title="提示"
                :visible.sync="deletexks"
                width="30%"
                :before-close="handleClose">
                <span>是否删除该消控室信息</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="deletexks = false">取 消</el-button>
                  <el-button type="primary" @click="deletexksroom">确 定</el-button>
                </span>
              </el-dialog>

                <el-row>
                  <el-col :span="6"><div class="grid-content bg-purple">消控室地址：{{item.address}}</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple-light">管理人：{{item.administrator}}</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">管理人联系电话:{{item.administratorTelephone}}</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple-light">消控室联系电话：{{item.fireRoomTelephone}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="6"><div class="grid-content bg-purple">经度:{{item.longitude}}</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">纬度:{{item.latitude}}</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple-light">消控室管辖区域：{{item.managementArea}}</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">消控室名称:{{item.name}}
                    
                    </div></el-col>
                  
                </el-row>
                <el-row>
                  <el-col :span="6"><div class="grid-content bg-purple-light">园区：{{item.parkId}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><el-button type="primary" size="medium" @click="bjbj" style="float:right;">编辑</el-button>
                  </el-col>
                </el-row>
              </el-tab-pane>
  <el-row>
    <el-col :span="24">
      <el-button type="primary"  @click="xzz"  style="float:right;margin-top:20px;" size="medium" 
      :disabled=nn>新增</el-button>
    </el-col>
    
  </el-row>         
  <el-row>
    <el-col :span ="24" style="color:#999">
      <p style="font-size:16px;color:#333">消控室人员信息</p>
    </el-col>
  </el-row>


      <el-table
      :data="tableData"
      style="width: 100%; margin-top:20px;">
      <el-table-column
        prop="name"
        label="姓名"
        
        >
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        >
          <template slot-scope="scope">
            {{scope.row.gender=='1'?'男':'女'}}
          </template>
      </el-table-column>
      <el-table-column
        prop="brithddate"
        label="出生年月">
      </el-table-column>
      <el-table-column
        prop="post"
        label="岗位">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="入职日期">
      </el-table-column>
      <el-table-column
        prop="jobstatus"
        label="在职状态">
       
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <span
        size="medium"
        @click="handleEdit(scope.$index, scope.row)" style="color:#0080d0;cursor: pointer;">编辑</span><span style="cursor:pointer">/</span> 
          <span
        size="medium"
        type="danger"
        @click="handleDelete(scope.$index, scope.row)" style="color:909399;cursor: pointer;">删除</span> 
        </template>
        </el-table-column>
    </el-table>
    </el-tabs>
        </el-main>

<!-- 删除弹窗 -->
<el-dialog
  title="提示"
  :visible.sync="deletelog"
  width="30%"
  :type='warning'>
  <span>此操作将删除本消控室的该条人员信息 , 是否进行?</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deletelog = false">取 消</el-button>
    <el-button type="primary" @click="deleteRight">确 定</el-button>
  </span>
</el-dialog>

<!-- 编辑弹窗 -->
<el-dialog title="编辑弹窗" :visible.sync="bjtc">
  <el-form :model="bjjh">
    <el-form-item label="消控室名称" :label-width="formLabelWidth">
      <el-input v-model="bjjh.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="消控室地址" :label-width="formLabelWidth">
      <el-input v-model="bjjh.address" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="管理人" :label-width="formLabelWidth">
      <el-input v-model="bjjh.administrator" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="消控室联系电话" :label-width="formLabelWidth">
      <el-input v-model="bjjh.fireRoomTelephone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="管理人联系电话" :label-width="formLabelWidth">
      <el-input v-model="bjjh.administratorTelephone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="经度" :label-width="formLabelWidth">
      <el-input v-model="bjjh.longitude" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="纬度" :label-width="formLabelWidth">
      <el-input v-model="bjjh.latitude" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="消控室管辖区域" :label-width="formLabelWidth">
      <el-input v-model="bjjh.managementArea" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="园区" :label-width="formLabelWidth">
      <el-select v-model="bjjh.parkId" placeholder="请选择所属园区">
        <el-option label="国际会展中心二期" value="1106"></el-option>
        <el-option label="中大产业园" value="1107"></el-option>
        <el-option label="润丰产业园" value="1108"></el-option>
        <el-option label="鹏辉产业园" value="1109"></el-option>
        <el-option label="国际会展中心一期" value="1110"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="bjtc = false">取 消</el-button>
    <el-button type="primary" @click="bjright">确 定</el-button>
  </div>
</el-dialog>

<!-- 编辑弹窗 -->
<el-dialog
  title="新增消控室"
  :visible.sync="dialogVisible"
  width="50%"
  >
   <el-form :model="obj">

    <el-form-item label="消控室地址" :label-width="formLabelWidth">
    <el-input v-model="obj.address" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="管理人" :label-width="formLabelWidth">
    <el-input v-model="obj.administrator" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="管理人联系电话" :label-width="formLabelWidth">
    <el-input v-model="obj.administratorTelephone" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="消控室联系电话" :label-width="formLabelWidth">
    <el-input v-model="obj.fireRoomTelephone" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="经纬度" :label-width="formLabelWidth">
    <el-input v-model="obj.longitudeLatitude" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="消控室管辖区域" :label-width="formLabelWidth">
    <el-input v-model="obj.managementArea" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="消控室名称" :label-width="formLabelWidth">
    <el-input v-model="obj.name" autocomplete="off"></el-input>
    </el-form-item>

    <!-- <el-form-item label="园区ID" :label-width="formLabelWidth">
    <el-input v-model="obj.parkId" autocomplete="off"></el-input>
    </el-form-item> -->

                <el-form-item label="园区" :label-width="formLabelWidth">
                  <el-select v-model="obj.parkId" placeholder="请选择园区">
                    <el-option label="鹏辉产业园" value="1109"></el-option>
                    <el-option label="国际会展中心一期" value="1110"></el-option>
                    <el-option label="国际会展中心二期" value="1106"></el-option>
                    <el-option label="中大产业园" value="1107"></el-option>
                    <el-option label="润丰产业园" value="1108"></el-option>
                    <el-option label="云栖小镇" value="1026"></el-option>
                  </el-select>
                </el-form-item>

  </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="right">确 定</el-button>

      </span>
</el-dialog>


<!-- 新增人员 -->
<el-dialog
  title="新增消控室人员"
  :visible.sync="xzry"
  width="60%"
 
  >
  <!-- <el-table :data="bjdr"
  @selection-change = "handler"
   :data="tableData"
 >
    <el-table-column
      type="selection">
    </el-table-column>
    <el-table-column property="name" label="姓名"></el-table-column>
    <el-table-column property="gender" label="性别"></el-table-column>
    <el-table-column property="birthddate" label="出生年月"></el-table-column>
    <el-table-column property="gender" label="性别">
      <template slot-scope="scope">
            {{scope.row.gender=='1'?'男':'女'}}
      </template>
    </el-table-column>
    <el-table-column property="post" label="岗位"></el-table-column>
    <el-table-column property="phone" label="电话"></el-table-column>
    <el-table-column property="createTime" label="入职日期"></el-table-column>
    <el-table-column property="jobstatus" label="在职状态"></el-table-column>

  </el-table> -->

    <el-table
    :data="xksman"
    style="width: 100%"
    :row-class-name="tableRowClassName"
     @selection-change = "handler">
     <el-table-column
      type="selection">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="gender"
      label="性别">
      <template slot-scope="scope">
              {{scope.row.gender==1?'男':scope.row.gender==2?'女':scope.row.gender==null?'':scope.row.gender=='男'?'男':scope.row.gender=='女'?'女':''}}
            </template>
    </el-table-column>
    <el-table-column
      prop="birthddata"
      label="出生年月">
    </el-table-column>
    <el-table-column
      prop="post"
      label="岗位">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话">
    </el-table-column>
    <el-table-column
      prop="creatTime"
      label="入职时间">
    </el-table-column>
    <el-table-column
      prop="jobstatus"
      label="在职状态">
      <template slot-scope="scope">
            {{scope.row.jobstatus==1?'在职':'不在职'}}
      </template>
    </el-table-column>
  </el-table>

  <span slot="footer" class="dialog-footer">
    <el-button @click="xzry = false">取 消</el-button>
    <el-button type="primary" @click="xzzr">确 定</el-button>
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

<!-- 编辑人员列表 -->
<el-dialog title="编辑" :visible.sync="bjry">
  <el-form :model="rowData">
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="rowData.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="性别" :label-width="formLabelWidth">
      <el-select v-model="rowData.gender" placeholder="请选择性别">
        <el-option label="男" value="1"></el-option>
        <el-option label="女" value="2"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="出生年月" :label-width="formLabelWidth">
      <div class="grid-content changesize">
        <el-date-picker
          class="width1"
          size = 'medium'
          v-model="rowData.brithddate"
          type="date"
          placeholder="出身年月"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
    </el-form-item>
      <el-form-item label="岗位" :label-width="formLabelWidth">
      <el-select v-model="rowData.post" placeholder="请选择岗位">
        <el-option label="管理人" value="管理人"></el-option>
        <el-option label="消控室值班员" value="消控室值班员"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="联系电话" :label-width="formLabelWidth">
      <el-input v-model="rowData.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="入职日期" :label-width="formLabelWidth">
      <el-input v-model="rowData.createTime" autocomplete="off"
      :disabled = "true"></el-input>
      
  
    </el-form-item>
    <el-form-item label="在职状态" :label-width="formLabelWidth">
      <el-select v-model="rowData.jobstatus" placeholder="请选择在职状态">
        <el-option label="在职" value=1></el-option>
        <el-option label="离职" value=2></el-option>
      </el-select>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="bjry = false">取 消</el-button>
    <el-button type="primary" @click="handleQEdit">确 定</el-button>
  </div>
</el-dialog>
  
  </el-container>
</template>

<script>
import { request } from 'http';
import { async } from 'q';
  export default {
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        xksman:[],
        deletexks:false,
        deletejson:{
        fireRoomId: 0,
        id: 0,
        type: 2,
        userId: ""
      },
        deletelog:false,
        flag: {
        show: false,
        title: '',
        option: 'edit'
      },
        rowData:'',
        editableTabsValue:49,
        dialogVisible: false,
        bjry:false,
        xzry:false,
        bjtc:false,
        editableTabs: [],
        tabIndex: 1, 
        formLabelWidth: '120px',
        bbb:[],
        typeid:62,
        sc:{},
        bj:{},
        bjdr:[],
        bjid:[],
        multipleTable:''
        ,
        bjjh:{}
        ,
        slct:[1,2,3,4,5,6],
        xz:{
          brithddate: '2019-09-03',
          createTime: '2019-09-03',
          deptId: null,
          education: null,
          gender: null,
          id: null,
          jobstatus: null,
          name: null,
          phone: null,
          post: null,
          subtypes: 2,
          subtypesId: null,

        },
        multipleTable:''
        ,
        nn:'',
        idxz:{"ids":[],"subtypes":2,"subtypesId":0},
        xzr:{},
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
        ,
        obj:{
          address:'',
          administrator:'',
          administratorTelephone:'',
          fireRoomTelephone:'',
          longitudeLatitude:'',
          managementArea:'',
          name:'',
          parkId:''
        },
         bj:{},
        formLabelWidth:'120px'
        ,
        tableData:[]
      }
    },
    watch:{
       editableTabsValue(val){
        //  alert(val)
         var that = this
         this.typeid = val
         that.deletejson.fireRoomId = val
         console.log('val',val)
         console.log('wuwuwwu',this.typeid)
         that.$request.xks.getuserinfolist({
           pageNo:1,
           pageSize:20,
           subtypes:2,
           subtypesId:val
         }).then(res=>{
           this.tableData = res.data.rows
           console.log('resssssssssss',res)
           that.tableData.forEach(a=>{
          if(a.jobstatus==1){
            a.jobstatus='在职'
          }else{
            a.jobstatus='离职'
          }
        })
        
         })
       },editableTabs(val){
         console.log('valllllll',val)
         if(val.length==0){
            this.nn = true
         }else{
            this.nn = false
         }
       }
    },
    mounted(){   
         var that = this
        that.$request.xks.selectByFireRoomName ().then(res=>{  
          that.editableTabs = res.data
          that.editableTabs.forEach(a=>{
            if(a.parkId=="1106"){
              a.parkId="国际会展中心二期"
            }else if(a.parkId=="1107"){
              a.parkId="中大产业园"
            }else if(a.parkId=="1108"){
              a.parkId="润丰产业园"
            }else if(a.parkId=="1109"){
              a.parkId="鹏辉产业园"
            }else if(a.parkId=="1110"){
              a.parkId="国际会展中心一期"
            }
          })
          console.log('asdasdasdasdasdasd',that.editableTabs)  
        }
        )
        
       
       that.$request.xks.getuserinfolist({
           pageNo:1,
           pageSize:20,
           subtypesId:that.editableTabsValue,
           subtypes: 2
       }).then(res=>{
         console.log('bjdrrrrrrrrrrrrrrrrrr',res.data.rows);
         that.tableData = res.data.rows
        console.log('mounted',that.tableData)
        that.tableData.forEach(a=>{
          if(a.jobstatus==1){
            a.jobstatus='在职'
          }else{
            a.jobstatus='离职'
          }
        })
       })
    },
    methods:{
      deletexksroom(){
        var that = this
           that.$request.xks.deleteFireRoom({fireRoomId:that.
          editableTabsValue}).then(res=>{
            console.log(res)
            // alert(111111  )
          that.$request.xks.selectByFireRoomName().then(res=>{
            that.editableTabs = res.data
          })
           
          })
        that.deletexks = false
      },
      // 编辑弹窗
      bjbj(){
        this.bjtc = true
        var that = this
        // console.log(13546416331635)
        that.$request.xks.selectById({id:that.editableTabsValue}).then(res=>{
          that.bjjh = res.data
          that.$request.xks.getuserinfolist({
            pageNo:1,
           pageSize:20,
           subtypes:2,
           subtypesId:this.editableTabsValue
          }).then(res=>{
            this.table = res.data.rows
          })
        })

      },
      // 编辑确定
      bjright(){
        var that = this
        that.$request.xks.addAndUpdateFireRoom(that.bjjh).then(res=>{
          console.log(res);
          that.$request.xks.selectByFireRoomName().then(res=>{
            console.log(res)
              that.editableTabs = res.data
             that.editableTabs.forEach(a=>{
            if(a.parkId=="1106"){
              a.parkId="国际会展中心二期"
            }else if(a.parkId=="1107"){
              a.parkId="中大产业园"
            }else if(a.parkId=="1108"){
              a.parkId="润丰产业园"
            }else if(a.parkId=="1109"){
              a.parkId="鹏辉产业园"
            }else if(a.parkId=="1110"){
              a.parkId="国际会展中心一期"
            }
          })
          })
        })
        this.bjtc = false
      }
      ,

      // 获取选择数据
      handler(select){
        console.log('select',select)
        this.slct = select
        
        console.log(11111111,this.slct)

        
    },
    // 打开新增人员弹窗
      xzz(){
          var that = this
          this.xzry = true
          this.xz.subtypesId = parseInt(this.editableTabsValue)
          that.$request.xks.getuserinfolist({pageNo:that.currentPage,pageSize:10}).then(res=>{
            that.xksman = res.data.rows
            that.total = res.dataSize
          })
          
        },
      // 分页器点击
      currentChange(){
          var that = this
           that.$request.xks.getuserinfolist({pageNo:that.currentPage,pageSize:10}).then(res=>{
            that.xksman = res.data.rows
            that.total = res.dataSize
          })
      },
    // 弹窗footer确定按钮
    xzzr(){
      var that = this
      console.log(this.typeid);
          this.slct.forEach(a=>{
            console.log(that.subtypes,that.subtypesId)
            this.select = {}
            that.idxz.ids.push(a.id)
            that.idxz.subtypesId = that.typeid

           
        })
         console.log(1111111111111111111111111,this.idxz) 
          // console.log('这是这个消控室下边的所选的人哦',this.idxz)
          var that = this
          
          this.$request.xks.batchAdd(this.idxz).then(res=>{
            console.log(res)
                that.$request.xks.getuserinfolist({pageNo:1,pageSize:50,subtypes:2,subtypesId:that.typeid}).then(res=>{
                  that.tableData = res.data.rows
                  that.tableData.forEach(a=>{
                    if(a.jobstatus==1){
                      a.jobstatus='在职'
                    }else{
                      a.jobstatus='离职'
                    }
                  })
                  that.select = null
                  that.handler = []
                  that.idxz = {"ids":[],"subtypes":2,"subtypesId":0}
                })
          })
          this.xzry = false;
          // this.slct
    },
      right(){
        var that = this
        this.dialogVisible=false
        this.$request.xks.addAndUpdateFireRoom(this.bj).then(res=>{
          that.$request.xks.selectByFireRoomName().then(res=>{
            that.editableTabs = res.data
          })
        })
   
        this.bj = {
          address:'',
          administrator:'',
          administratorTelephone:'',
          fireRoomTelephone:'',
          longitudeLatitude:'',
          managementArea:'',
          name:'',
          parkId:''
        }
        ,
        this.obj = {
          address:'',
          administrator:'',
          administratorTelephone:'',
          fireRoomTelephone:'',
          longitudeLatitude:'',
          managementArea:'',
          name:'',
          parkId:''
        
          }
      },
      handleTabsEdit(targetName, action) {
        // console.log(this.editableTabsValue,'editableTabsValue')
        if (action === 'add') {
          this.dialogVisible = true
          this.obj = this.bj
          this.editableTabsValue = newTabName;
              
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          console.log(this.editableTabsValue);
          this.deletexks = true
       
        }
      },
       handleEdit(index,row){
         var that = this
            that.bjry = true;
            that.editFrom = Object.assign({},row);
            that.rowData = row
            
           


          }, 
        handleQEdit(){
          var that = this
          for(let i in that.rowData){
              console.log(666)
              if(that.rowData.jobstatus=="在职"){
            that.rowData.jobstatus=1
          }else if(that.rowData.jobstatus=="离职"){
            that.rowData.jobstatus=0
          }
          }

          
          console.log('rowData',that.rowData)
          that.$request.xks.updatesysuser(
            that.rowData
          ).then(res=>{
            for(let i in that.rowData){
              if(that.rowData.jobstatus=='1'){
                that.rowData.jobstatus="在职"
              }else if(that.rowData.jobstatus=='0'){
                that.rowData.jobstatus="离职"
              }
            }
            
          })
          // that.$request.xks.getuserinfolist({
          //   pageNo:1,
          //   pageSize:50,
          //   subtypesId:that.editableTabsValue
          // }).then(res=>{
          //   console.log('这是用户信息',res.data)
          // })
          this.bjry = false
        }, 
         handleDelete(index, row) {
           var that = this
          that.editFrom = Object.assign({},row);
          that.sc = row
          that.bj = this.obj
          console.log('manmanman', that.sc) //删除人员
          that.deletejson.id = that.sc.id
          that.deletejson.userId = that.sc.roleId
          console.log('many',that.deletejson)
          that.deletelog = true
      //      var that = this
      //         that.$request.xks.deletesysuser(
      //           that.sc.id
      //         ).then(res=>{
      //           console.log('删除ccccccccccc',res)
      //         })
            
            // that.$request.xks.getuserinfolist({
            //   pageNo:1,
            //   pageSize:50,
            //   subtypes:2,
            //   subtypesId:this.editableTabsValue

      //     }).then(res=>{
      //       that.tableData = res.data.rows
      //       that.tableData.forEach(a => {
      //       a.jobstatus=='1'?(a.jobstatus='在职'):(a.jobstatus='离职')
       
      // })
      //  })
      },
      deleteRight(){
        var that = this
        console.log(that.deletejson,'chulaiba')
        that.$request.xks.deleteuserfireroomfirestation(that.deletejson).then(res=>{
          console.log(res)
        })
        that.deletelog = false
      }
      


    }
  }
</script>
<style lang="scss" scoped>
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    font-size: 14px;
  
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>