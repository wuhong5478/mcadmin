<template>
  <div id="app">
    <el-container>
      <el-header style="padding-top:1%">
        <el-row >
          <el-col :span="8">
              <span style="margin-left:15px;margin-rifht:30px;margin-right:29.7px">设备筛选:</span>
                <template>
                  <el-select v-model="value1" placeholder="请选择" size="medium" style="margin-top:3px;">
                    <el-option
                      v-for="(item,index) in options1"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
          </el-col>
          <el-col :span="8">
                <span>处理结果: </span>         
                  <template>
                    <el-select v-model="value2" placeholder="请选择" size="medium" style="margin-top:5px">
                      <el-option
                        v-for="item in options2"
                        :key="item.value2"
                        :label="item.label2"
                        :value="item.value2"
                      ></el-option>
                    </el-select>
                  </template>   
          </el-col>
          <el-col :span="8">
            <div >
              <div class="block">
                <span class="demonstration">时间筛选: </span>
                 <el-date-picker
                v-model="value13"
                type="datetimerange"
                align="right"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00', '08:00:00']"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:50%"
                >
              </el-date-picker>


              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
        <el-row :span="22" style="background:#fff">
              <span style="margin-left:15px;margin-left:15px;">设备地址检索: </span>
              <el-input v-model="input" placeholder="请输入" style="width:195px;" size="medium" :picker-options="pickerOptions"></el-input>
              <el-button type="primary"   size="medium" @click='click'>查询</el-button>
          <el-button
                type="primary"
                @click="OneClick"
                size="medium"
                style="float:right;margin-right:20px;margin-top:3px;"
                :disabled = magic
              >一键处理
            </el-button>
      <!-- 一键处理弹窗 -->
      <el-button   type="primary" style="float:right; margin-right:20px;margin-top:3px;" @click="exportExcel" size="medium" :disabled = magic>一键导出</el-button>
        </el-row>
    </el-container>
    <!-- 表单 -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      id="out-table"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" :selectable='checkboxT'></el-table-column> 
      <!-- <el-table-column width="10px" label="全选"></el-table-column> -->
      <el-table-column prop="devName" label="设备名称"></el-table-column>
      <el-table-column prop="address" label="设备地址"></el-table-column>
      <el-table-column label="报警时间">
        <template v-slot="scope">
          <span>{{scope.row.gmtCreate | dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理结果" prop="status" style="margin-left:50px;">
        <template>
          <span
            ref="wenben"
            @click="showDialog"
            :class="{showRed: red,showOrange: orange,showGreen: green}"
          >未处理</span>
        </template>
      </el-table-column>
      <el-table-column prop="dealUser.userName" label="处理人"></el-table-column>
      <el-table-column prop="dealTime" label="处理时间"></el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
      <span size="medium"
      @click="handleEdit(scope.$index, scope.row)" style="color:#909399">查看</span> 
      </template>
      </el-table-column>
      <!-- 查看弹窗 -->
<el-dialog
  title="火警报告"
  :visible.sync="dialogVisible2"
  width="43%"
  :append-to-body="true"
  class = "searchlook"
  >
  <div class="line"></div>
  <div class = "line1"></div>
  <div class = "line2"></div>
  <div style="margin-bottom:50px;">
    <span style="font-size: 18px;opacity: 0.75;">到场人数:</span>
    <span style="font-size: 18px;opacity: 0.55;margin-left:30px;margin-right:60px;">{{headtime.arriveNum}}</span></br>
    <span style="font-size: 18px;opacity: 0.75;">到场时间:</span>
    <span style="font-size: 18px;opacity: 0.55;margin-left:10px;margin-right:40px;">{{headtime.arriveTime}}</span>
    <span style="font-size: 18px;opacity: 0.75;margin-left:100px;">持续时间:</span>
    <span style="font-size: 18px;opacity: 0.55;margin-left:5px">{{headtime.lastTime}}</span></br>

  </div>
  <div style = "margin-bottom:50px;">
    <span style="font-size: 18px;opacity: 0.75;">时间点:</span>
    <span style="font-size: 18px;opacity: 0.55;margin-left:30px">{{ls.gmtCreate}}</span></br>
    <span style="font-size: 18px;opacity: 0.75;">事件名称:</span>
    <span style="font-size: 18px;opacity: 0.55;margin-left:12px">{{ls.eventName}}</span></br>
    <span style="font-size: 18px;opacity: 0.75;">报警设备:</span>
    <span style="font-size: 18px;opacity: 0.55;margin-left:12px">{{ls.devName}}</span></br>
    <span style="font-size: 18px;opacity: 0.75;">设备地址:</span>
    <span style="font-size: 18px;opacity: 0.55;margin-left:12px">{{ls.address}}</span></br>
    <span style="font-size: 18px;opacity: 0.75;margin-top:10px;display:inline-block">时间点:</span>
    <span style="font-size: 18px;opacity: 0.55;margin-left:30px">{{ls.dealTime}}</span></br>
    <span style="font-size: 18px;opacity: 0.75;">事件名称:</span>
    <span style="font-size: 18px;opacity: 0.55;margin-left:12px">{{ls.devType}}</span></br>
  </div>
  <div v-for="(item,index) in tan" :key="index" style="margin-bottom:10px;">
    <p style = "font-size:18px;opacity:0.65;color:#000">{{item.typeDesc}}
      <p>
      <span v-for="(item1,index1) in item.con" :key = "index1" style="margin-right:20px;display:block;font-size:18px;opacity:0.55">{{item1.name}}:&nbsp&nbsp&nbsp{{item1.data}}</span>
      </p>
    </p>
    
  <el-col :span="24" style="text-align:right;margin-top:5px;user-select:none;">
                   检查结果由蚂蚁金服区块链技术提供防篡改能力
  </el-col>
  </div>


</el-dialog>
    <!-- 查看弹窗 -->
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
    <!-- 未处理的对话框 -->
    <el-dialog title="处理结果" :visible.sync="dialogVisible" width="30%">
      <p>处理结果:</p>
      <!-- 下拉框 -->
      <template>
        <el-select v-model="label2" placeholder="请选择">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label2"
            :value="item.label2"
          ></el-option>
        </el-select>
      </template>
      <p class="picture">现场照片:</p>
      <!-- 图片上传 -->
      <template>
        <div class="upload-demo">
          <form action="upload" id="form" enctype="multipart/form-data" method="post">
            <input type="file" multiple name="file" ref="fileInt" />
          </form>
        </div>
      </template>
      <p class="picture">处理说明:</p>
      <el-input type="textarea" :rows="4" placeholder="请输入说明内容" v-model="textarea"></el-input>
      <!-- <el-input type="textarea" v-model="form.desc"></el-input> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary">提 交</el-button>
      </span>
    </el-dialog>
    <!-- 一键处理的对话框 -->
    <el-dialog title="提示" :visible.sync="yjcl" width="30%">
      <span class="evengthing">是否将全部的未处理处理成误报</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="yjcl = false">取 消</el-button>
        <el-button type="primary" @click ="yjclqr">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import moment from 'moment'
// import axios from 'axios'
export default {
  // 注册局部过滤器格式化时间
  filters: {
    dateFilter(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      // multipleSelection:[],
      magic:true,
      cl:[],
      // 流水
      ls:{},
      headtime:{},
      tan:[],
      // 一键处理弹窗
      yjcl:false,
      // 查看弹窗
      dialogVisible2:false,
      // 时间数组
      timeArr:[],
      // 开始时间
      btime:'',
      // 结束时间
      time:'',
      // 未处理的对话框
      dialogVisible: false,
      // 一键处理的对话框
      dialogVisible1: false,
      value1: '',
      value2: '',
      // 时间
      value13:'',
      // isIndeterminate: '',
      input: '',
      red: '',
      orange: '',
      green: '',
      // 全选数据的数组
      multipleSelection: [],
      tableData: [],
      // 设备筛选
      options1: [{ value1: '用电安全探测器', label1: '用电安全探测器' },{value1:'烟雾报警器',label1:'烟雾报警器'}],
      // 处理结果
      options2: [{ value2: '0', label2: '未处理' },{value2:'2',label2:'处理中'},{value2:'1',label2:'已处理'},{value2:'',label2:'全部'}],
      // 点击未处理对话框中的下拉菜单选项
      options3: [{ value3: '1', label3: '未处理' }],
      // 设备筛选的文本
      label: '',
      // 处理结果的文本
      label1: '',
      // 点击未处理对话框显示的文本
      label2: '',
      currentPage: 1,
      cyrrentPage:2,
      pageSize: 5,
      total: 0,
      // 处理内容说明绑定的值
      textarea: ''
    }
  },
  beforeMount(){
   
  },
  mounted() {
    // console.log(this.pageNo, this.pageSize)
    var that = this
    // that.magic = false
    this.getAllInfo()
     var that = this
    that.$request.fireinfo.devNameList().then(res=>{
      console.log(555555555555555,res)
      that.options1 = res.data
      that.options1.forEach(a=>{
        a.value =a.devName
        a.label=a.devName
      })
      that.options1.push({ value:'', label: '全部' })
    })
  },
  methods: {
    checkboxT(row,index){
        console.log('row',row)
        if(row.status=='未处理'){
    			return 1;
    		}else if(row.status=='处理中'){
    			return 0;
    		}else if(row.status=='已处理'){
          return 0;
        }


},
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
    // 查看
    look(){
       this.dialogVisible2  = false;
    },
    // 一键导出
    exportExcel () {
 /* generate workbook object from table */
 var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
 /* get binary string as output */
 var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
 try {
  FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
 } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
 return wbout
},
    // 查看详情弹窗
     handleEdit(index,row){
       var that = this
        that.dialogVisible2  = true;
       that.editFrom = Object.assign({},row);
          console.log('这是横向的',row.id)
      that.$request.fireinfo.fireorder({fireId:row.id,type:0}).then(res=>{
        that.tan = res.data
        that.tan.forEach(a=>{
          console.log(a.con)
          a.con = JSON.parse(a.con)
        })
      }).then(res=>{
        that.$request.fireinfo.findbyid({id:row.id}).then(res=>{
          that.ls = res.data
          console.log(that.ls)

      })
      }).then(res=>{
        that.$request.fireinfo.fireReport({fireId:row.id}).then(res=>{
          console.log('冲冲冲,出来',res.data)
          that.headtime = res.data
        })
      })
    },
      // 搜索
 
      // this.$request.fireinfo.fireorder({fireId:row.id}).then(res=>{
      //   console.log(res)
      //   this.tan = res.data
      // })
      handleQQQEdit(index,row){
       this.editFrom = Object.assign({},row);
            console.log('zhe',this.row)   
      },
    // 点击查询
    click(){
      // alert(this.input)
      this.$request.fireinfo.getAllFireInfo({address:this.input,pageSize:5}).then(res=>{
         this.tableData = res.data.rows
          // console.log('ressssssssssss',res.data)
          this.total = res.data.totalCount
          this.tableData.forEach(a=>{
            if(a.status==0){
              a.status='未处理'
            }else if(a.status==1){
              a.status='已处理'
            }else if(a.status==2){
              a.status='处理中'
            }
          })
      })
    },

    // 输入监控
    pickerOptions() {

    },

    // 改变时间格式
    

    // 显示对话框
    showDialog() {
      const innerText = this.$refs.wenben.innerText
      // console.log(innerText)
      if (innerText === '未处理') {
        this.dialogVisible = true
      }
    },
    OneClick() {
      var that = this
      that.yjcl = true
    },
    // 一键处理确认
    yjclqr(){
      var that = this
      this.multipleSelection.forEach(a=>{
         that.cl.push(a.id)
      })
      console.log(this.cl)
      const id = this.getCookie('user_id')
      this.$request.fireinfo.dealFireFalse(that.cl,id).then(res=>{
        console.log(res)
        this.cl=[]
        that.yjcl = false

      })
    },
    // 全选的数据列表
    handleSelectionChange(val) {
      // val 表示选中所有的数据对象
      var that = this
      this.multipleSelection = val
      console.log(val)
      if(val.length==0){
        that.magic = true
      }else if(val.length>0){
        that.magic = false
      }
    },
    // 获取所有的火警列表
     getAllInfo() {
       console.log('页数',this.currentChange)
       console.log('条数',this.pageSize)
      this.instance.get('/fireWarn/list', {
          params: {
            pageNo: this.currentPage,
            pageSize: this.pageSize,
            devName: this.devName,
         
          }
        }).then(res => {
          // var str = res.data.data.rows[0].dealUser
          // var strr =  eval("(" + str + ")");
          // console.log(213212312312321231,strr)
          this.tableData = res.data.data.rows
          this.total = res.data.data.totalCount
          this.tableData.forEach(a=>{
            if(a.status==0){
              a.status="未处理"
            }else if(a.status=='1'){
              a.status="已处理"
            }else if(a.status=='2'){
              a.status="处理中"
            }
            a.dealUser = eval("("+a.dealUser+")");
          })
          // 遍历数据数组根据不同的处理结果显示不同的文字颜色
          
          console.log('tabledata',this.tableData)
        })
    },
    // 分页的功能
    currentChange(currentPage) {
      // console.log(currentPage)
      this.currentPage = currentPage
      this.getAllInfo()
    },currentChange1(currentPage) {
      // console.log(currentPage)
      this.currentPage1 = currentPage
      this.getAllInfo()
    },currentChange2(currentPage) {
      // console.log(currentPage)
      this.currentPage2 = currentPage
      this.getAllInfo()
    },currentChange3(currentPage){
      this.currentPage3 = currentPage
    }
  },
  // 根据不同的处理结果渲染不同的文字颜色
  updated() {
    const innerText = this.$refs.wenben.innerText
    if (innerText === '未处理') {
      // console.log(this.red)
      this.red = true
    }
  },
  watch:{
    currentPage(val){
      this.currentPage = val
    },
    value2(val){
      var  that = this
        this.$request.fireinfo.getAllFireInfo({status:val,pageSize:5,devName:that.value1,startTime:val[0],endTime:val[0],}).then(res=>{
          this.tableData = res.data.rows
          this.total = res.data.totalCount
          this.tableData.forEach(a=>{
            if(a.status==0){
              a.status='未处理'
            }else if(a.status==1){
              a.status='已处理'
            }else if(a.status==2){
              a.status='处理中'
            }
          })
        })
      
    },
    value1(val){
        this.$request.fireinfo.getAllFireInfo({devName:val,pageSize:5}).then(res=>{
          this.tableData = res.data.rows
          console.log('ressssssssssss',res.data)
          this.total = res.data.totalCount
          this.tableData.forEach(a=>{
            if(a.status==0){
              a.status='未处理'
            }else if(a.status==1){
              a.status='已处理'
            }else if(a.status==2){
              a.status='处理中'
            }
          })
        })
      
    },
    value13(val){
      // var arr = val.split(',')
     console.log('vvvvvv',val)
      this.$request.fireinfo.getAllFireInfo({startTime:val[0],endTime:val[0],pageSize:5}).then(res=>{
        this.tableData = res.data.rows
         this.total = res.data.totalCount
          this.tableData.forEach(a=>{
            if(a.status==0){
              a.status='未处理'
            }else if(a.status==1){
              a.status='已处理'
            }else if(a.status==2){
              a.status='处理中'
            }
          })
      })
    }
  }
}
</script>
<style lang="scss" scoped>


.box3{
  margin-top:50px;
}
.box1{

  p{
    font-size: 16px;
    font-weight: 600;

  }
}
.box2{

  p{
    font-size: 16px;
    font-weight: 600;

  }
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
.el-header {
  background: #fff;
  padding: 0;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
span {
  font-size: 12px;
  cursor: pointer;
  user-select: none;
  line-height: 36px;
}
.showRed {
  color: red;
  font-weight: bold;
  font-size: 14px;
}
/deep/.el-table th > .cell {
  text-align: center;
}
/deep/.el-table .cell {
  text-align: center;
}
/deep/.el-input {
  width: 60%;
}
.changeSge {
  width: 70%;
  float: right;
}
.evengthing {
  font-size: 16px;
  color: #ff8c00;
}
.picture {
  margin-top: 20px;
  margin-bottom: 5px;
}
.allChange {
  position: absolute;
  top: 0;
  left: 0;
}
.searchlook{
  font-weight:600 !important;
  font-size: 24px !important;
  border-radius: 15px !important;
}
.line2{
      width: 100%;
    height: 0.1px;
    border-top: 1px solid #E6E6E6;
    position: relative;
    top: 100px;;
}
.line1{
   width: 100%;
    height: 0.1px;
    border-top: 1px solid #E6E6E6;
    position: relative;
    top: 367px;
}
.line{
  width: 100%;
    height: 0.1px;
    border-top: 1px solid #E6E6E6;
    position: relative;
    top: -23px;
}
.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
  width:200;
}
</style>
