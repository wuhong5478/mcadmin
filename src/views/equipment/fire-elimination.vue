<template>
  <div id="app">

    <div class="tbox">
      

      <p>消控室信息</p>
        <el-row :gutter="20">
        </el-row>
        <el-row :gutter="24">
          <el-col :span="2" ><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple" props="123">消控室地址 : {{a.address}}</div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple"><span>管理人 : {{a.administrator}}</span></div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple"><span>管理人联系电话 : {{a.administratorTelephone}}</span></div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple"><span>消控室联系电话 : {{a.fireRoomTelephone}}</span></div></el-col>
        </el-row>
       <el-row :gutter="24">
          <el-col :span="2" ><div class="grid-content bg-purple"></div></el-col>
  
          <el-col :span="5"><div class="grid-content bg-purple"><span style="padding-right: 18.6%;">经纬度 : {{a.longitudeLatitude}}</span></div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple"><span>消控室管辖区域 : {{a.managementArea}}</span></div>
          </el-col> 

          <el-col :span="5"><div class="grid-content bg-purple"><span style="padding-right: 18.6%;">消控室名称 : {{a.name}}</span></div></el-col>

          <el-col :span="5"><div class="grid-content bg-purple"><span style="padding-right: 18.6%;">园区ID : {{a.parkId}}</span></div></el-col>


       </el-row>       
      </div> 
      <div class="bbox"> 
        <!-- <p>人员消息</p> -->
        
      
          <div class="btable">
            <el-table
          :data="tableData"
          style="width:99.9%">
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别">
          </el-table-column>
          <el-table-column
            prop="firstday"
            label="出生年月">
          </el-table-column>
          <el-table-column
            prop="education"
            label="学历">
          </el-table-column>
          <el-table-column
            prop="post"
            label="岗位">
          </el-table-column>
          <el-table-column
            prop="tel"
            label="联系电话">
          </el-table-column>
          <el-table-column
            prop="firstdata"
            label="进站日期">
          </el-table-column>
          <el-table-column
            prop="working"
            label="在职状态">
          </el-table-column>
            

<!-- 弹窗 -->

<el-table-column label="操作" width="150">
<template slot-scope="scope">
<el-button
size="mini"
@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
<el-button
size="mini"
type="danger"
@click="handleDelete(scope.$index, scope.row)">删除</el-button>
</template>
</el-table-column>

<el-dialog title="请输入表单内容" :visible.sync="dialogFormVisible"
:append-to-body='true' >
  <el-form :model="obj">
        <el-form-item label="姓名" :label-width="formLabelWidth"
     >
      <el-input v-model="obj.name" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth"  
     >
      <el-input v-model="obj.sex" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="出生年月" :label-width="formLabelWidth"
     >
      <el-input v-model="obj.firstday" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="学历" :label-width="formLabelWidth"
     >
      <el-input v-model="obj.education" autocomplete="off"></el-input>
    </el-form-item>
           <el-form-item label="岗位" :label-width="formLabelWidth"
     >
      <el-input v-model="obj.post" autocomplete="off"></el-input>
    </el-form-item>
           <el-form-item label="联系电话" :label-width="formLabelWidth"
     >
      <el-input v-model="obj.tel" autocomplete="off"></el-input>
    </el-form-item>
               <el-form-item label="进站日期" :label-width="formLabelWidth"
     >
      <el-input v-model="obj.firstdata" autocomplete="off"></el-input>
    </el-form-item>
                   <el-form-item label="在职状态" :label-width="formLabelWidth"
     >
      <el-input v-model="obj.working" autocomplete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addRow(event)" >确 定</el-button>
  </div>
</el-dialog>

<!-- <el-button type="text" @click="dialogFormVisible = true">编辑</el-button>
<el-button type="text" @click="handleDelete" style="color:red">删除</el-button>
<el-dialog title="收货地址" :visible.sync="dialogFormVisible" :append-to-body='true'> -->


 


  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>

<!-- 弹窗 -->

      
          </el-table-column>
        </el-table>
        </div>
      </div>
    <!-- </el-main> -->
    </div>
  
</template>
<style lang="scss" scoped>
  #app{
    width: 99.9%;
    height:46rem;
    margin-left: 1rem;
    margin-top:-10px;
    .tbox{
      padding: 2rem;
      width: 95%;
      height: 9.5rem;
      background: #fff;
      
      border: 0.1rem rgba(207, 205, 205, 0.616) solid;
        p{
          font-weight: 600;
      }
      .tcontent{
            padding-top: 2rem;
            font-weight: 600;
            width: 62rem;
            margin-left: 8rem;         
            span{
              padding-right: 8rem;
              display: inline-block;
              padding-bottom: 4rem;
            }
            .qvyu{
              padding-right: 1rem;
            }
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

   span{
     display: block;
   }
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
      .bbox{      
          padding: 2rem;
          width: 95%;
          margin: 0 auto;
          display: block;
          position: relative;
          left: 2.15%;
          background: #fff;
          margin-top: 20px;
          margin-left: -2.1rem;
          border: 0.1rem rgba(207, 205, 205, 0.616) solid;
        p{
          font-weight: 600;
          display: inline;
      }
        .btn{
            padding-right: 0rem;
            margin-right: 7rem;
            width: 5rem;
            padding-right: 6%;
            float: right;
        }
        .btable{
          margin-top: 3rem;
        }
    } 
  }
</style>
<script>
 import { watch } from 'fs';
    export default {
      data() {
        return {
          tableData: [{
            name: '王小虎',
            sex:'男',
            firstday:'1996-04-12',
            education:'本科',
            post:'保安',
            tel:'16621299601',
            firstdata:'2019-08-18',
            working:'在职',
          },{
            name: '王小虎',
            sex:'男',
            firstday:'1996-04-12',
            education:'本科',
            post:'保安',
            tel:'16621299601',
            firstdata:'2019-08-18',
            working:'在职',
          },{
            name: '王小虎',
            sex:'男',
            firstday:'1996-04-12',
            education:'本科',
            post:'保安',
            tel:'16621299601',
            firstdata:'2019-08-18',
            working:'在职',
          },{
            name: '王小虎',
            sex:'男',
            firstday:'1996-04-12',
            education:'本科',
            post:'保安',
            tel:'16621299601',
            firstdata:'2019-08-18',
            working:'在职',
          }],
            form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },obj:{
          name: '',
          sex: '',
          firstday: '',
          education: '',
          post: '',
          tel: '',
          firstdata: '',
          working: ''
        },
          dialogTableVisible: false,
          dialogFormVisible: false,
          formLabelWidth: '120px',
          a:{}
        }
      },

      mounted(){
        var that = this
        that.$request.xks.selectByFireRoomName ({
          fireRoomName:2,
          parkId:1106
        }).then(res=>{  
          console.log(666,res.data[0])  
          that.a = res.data[0]
          // console.log('消控室请求',that.a)
        }
        )

      },
       methods: {
      handleClose(done) {
        this.$confirm('确认关闭？').then(_ => {
            done();
          }).catch(_ => {});
      },
         handleDelete(index, row) {
        
        this.tableData.splice(index, 1)
      },
          handleEdit(index,row){
            // that = this
            this.editFrom = Object.assign({},row);
            console.log(index,row)
          this.obj = row
             console.log('obj',this.obj);
            this.dialogFormVisible  = true;
          },
           addRow(event){
             console.log(12312312312321,this.obj)
            this.tableData.push(this.obj)
             this.dialogFormVisible = false
            console.log('add',tableData)
      }
    }
  }
  </script>