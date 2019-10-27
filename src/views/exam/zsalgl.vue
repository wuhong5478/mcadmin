<template>
  <div id="app">
    <el-header style="background:#fff;">
      <div style="float: right">
        案例名称:
        <el-input placeholder="请输入" v-model="pageQuery.casename" style="width: 240px" size="small" class="filter-item">
          <el-button slot="append" icon="el-icon-search" @click="handleFilter"></el-button>
        </el-input>
        案例类型:
        <el-select v-model="pageQuery.casetype" placeholder="请选择" clearable class="filter-item" style="width: 100px" size="small">
          <el-option v-for="item in typeList" :key="item.code" :label="item.msg" :value="item.code"/>
        </el-select>
        <el-button type="info" @click="batchDelete" size="mini">批量删除</el-button>
<!--        <el-button type="primary" @click="batchUpload" size="mini">批量上传</el-button>-->
        <el-button type="primary" @click="handleAdd" size="mini">新增</el-button>
      </div>
    </el-header>
    <el-table
            v-loading="listLoading"
            :data="list"
            style="width: 100%"
            @selection-change="handleSelectionChange" stripe
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="caseName" label="案例名称"/>
      <el-table-column prop="caseType" label="案例类型" :formatter="typeFormat"/>
      <el-table-column prop="uploadingPeople" label="上传人" :formatter="userFormat"/>
      <el-table-column prop="uploadingTime" label="上传时间" :formatter="dateFormat"/>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <span class="amendSpan" @click="handleCheck(row)">查看</span>|
          <span class="amendSpan" @click="handleUpdate(row)">编辑</span>|
          <span class="amendSpan" @click="handleDelete(row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center">
      <el-pagination
              background
              layout="prev, pager, next,total"
              :total="total"
              :page-size="pageQuery.pageSize"
              :current-page.sync="pageQuery.pageNo"
              @current-change="currentChange"
      ></el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="60%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="90px">
        <el-form-item label="案例名称:" prop="name">
          <el-input v-model="temp.caseName"/>
        </el-form-item>
        <el-form-item label="案例类型:" prop="type">
          <el-select v-model="temp.caseType" placeholder="请选择" clearable class="filter-item">
            <el-option v-for="item in typeList" :key="item.code" :label="item.msg" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="dialogStatus==='add'" label="文件上传:">
          <template>
            <div class="upload-demo">
              <form action="upload" id="form" enctype="multipart/form-data" method="post">
                <input type="file" accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" @change="getFile($event)">
              </form>
            </div>
          </template>
          <p>只支持.doc和.docx格式文件</p>
        </el-form-item>
        <el-form-item v-if="dialogStatus==='update'" label="文件内容:" prop="uploadingFile">
          <quill-editor ref="text" v-model="temp.uploadingFile" :options="editorOption" class="ql-editor"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='add'?addData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看" :visible.sync="dialogCheckVisible" width="60%">
      <quill-editor ref="text" v-model="temp.uploadingFile" :options="editorOption" :disabled="true" class="ql-editor"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCheckVisible = false">
          关闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import request from '@/api/request'
  import { quillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  export default {
    components: {
      quillEditor
    },
    data() {
      return {
        editorOption: {},
        listLoading: true,
        list: [],
        total: 0,
        typeList: [
          {msg: '消防应急知识', code: '1'},
          {msg: '消防案例', code: '2'},
          {msg: '法律法规', code: '3'},
          {msg: '常见防火灭火小常识', code: '4'},
          {msg: '常用灭火设施器材维护', code: '5'}
        ],
        typeObj: {},
        userList: [],
        userObj: {},
        pageQuery: {
          pageNo: 1,
          pageSize: 10,
          casetype: '',
          casename: '',
        },
        temp: {
          id: undefined,
          caseName: '',
          caseType: '',
          uploadingFile: '',
          uploadingPeople: '',
          uploadingTime: ''
        },
        rules: {},
        dialogCheckVisible: false,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑案例',
          add: '新增案例'
        },
        selectedList: [],
        file: ''
      }
    },
    created() {
      this.getOptionList()
      this.getPager()
    },
    methods: {
      getCookie(name){
        var strcookie = document.cookie;//获取cookie字符串
        var arrcookie = strcookie.split("; ");//分割
        //遍历匹配
        for ( var i = 0; i < arrcookie.length; i++) {
          var arr = arrcookie[i].split("=");
          if (arr[0] === name){
            return arr[1];
          }
        }
        return "";
      },
      getFile(event) {
        if (!event.target.files[0].name.endsWith('.doc') && !event.target.files[0].name.endsWith('.docx')) {
          this.$message.error('请上传doc或docx文件!')
          event.target.value = ''
        }
        this.file = event.target.files[0]
      },
      getPager() {
        this.listLoading = true
        this.$utils.clean(this.pageQuery)
        const params = this.pageQuery
        request.get('/caseManagement/getCaseByNameOrType', {params}).then(res => {
          if (res.code != 200) {
            this.list = []
            this.total = 0
            this.listLoading = false
            return
          }
          this.list = res.data.rows
          this.total = res.data.totalCount
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 100)
        })
      },
      getOptionList() {
        this.typeObj = this.$utils.getMap(this.typeList, 'code', 'msg')
        const params = { pageNo: -1, pageSize: 1000 }
        this.$request.systemUser.demandUser(params).then(res => {
          this.userList = res.data.rows
          this.userObj = this.$utils.getMap(this.userList, 'id', 'name')
        })
      },
      handleFilter() {
        this.pageQuery.pageNo = 1
        this.getPager()
      },
      currentChange(currentPage) {
        this.pageQuery.pageNo = currentPage
        this.getPager()
      },
      dateFormat(row, column) {  //yyyy-MM-dd
        const str = row[column.property]
        if (str == null || str === '') {
          return ''
        }
        return str.substr(0, 11)
      },
      typeFormat(row) {
        return this.typeObj.get(row.caseType)
      },
      userFormat(row) {
        return this.userObj.get(row.uploadingPeople)
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          caseName: '',
          caseType: '',
          uploadingFile: '',
          uploadingPeople: '',
          uploadingTime: ''
        }
      },
      handleAdd() {
        this.resetTemp()
        this.dialogStatus = 'add'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      async addData() {
        if (this.file === '' || this.file === undefined) {
          this.$message.error('请上传文件!')
          return
        }
        let formData = new FormData()
        formData.append('uploadingFile', this.file)
        formData.append('caseName', this.temp.caseName)
        formData.append('caseType', this.temp.caseType)
        formData.append('uploadingPeople', '65346ccb-fc6a-428e-8233-87d01462f8e0')
        const resp = await this.instance.post("/caseManagement/insertCaseManagement",formData)
        if (resp.data.code === 200) {
          this.getPager()
          this.dialogFormVisible = false
          this.$message.success('添加成功')
        } else {
          this.$message.error(resp.message)
        }
      },
      async handleUpdate(row) {
        this.temp = Object.assign({}, row)
        const resp = await this.instance.post("/caseManagement/selectCase?id="+this.temp.id)
        this.temp.uploadingFile = resp.data.data
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        let formData = new FormData()
        formData.append('textHtml', this.temp.uploadingFile)
        formData.append('caseName', this.temp.caseName)
        formData.append('caseType', this.temp.caseType)
        formData.append('uploadingPeople', this.getCookie('user_id'))
        formData.append('id', this.temp.id)
        this.temp.uploadingPeople = '65346ccb-fc6a-428e-8233-87d01462f8e0'
        this.addDanger.post('/caseManagement/updateCaseManagement?id='+this.temp.id+'&uploadingPeople='+'65346ccb-fc6a-428e-8233-87d01462f8e0'+'&caseType='+this.temp.caseType+'&caseName='+this.temp.caseName+'&textHtml='+this.temp.uploadingFile).then(res => {
          if (res.data.code === 200) {
            this.getPager()
            this.dialogFormVisible = false
            this.$message.success('修改成功')
          } else {
            this.$message.error(res.message)
          }
        })
      },
      async handleCheck(row) {
        this.temp = Object.assign({}, row)
        const resp = await this.instance.post("/caseManagement/selectCase?id="+this.temp.id)
        this.temp.uploadingFile = resp.data.data
        this.dialogCheckVisible = true
      },
      handleDelete(row) {
        this.$confirm('确认删除此案例?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.instance.post('/caseManagement/deleteCase?id=' + row.id).then((res) => {
            if (res.data.code === 200) {
              this.getPager()
              this.$message.success('删除成功')
            } else {
              this.$message.error(res.message)
            }
          })
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      },
      batchDelete() {
        let ids = ''
        for (let i = 0; i < this.selectedList.length; i++) {
          ids = ids + '=' + this.selectedList[i].id + '&ids'
        }
        ids = ids.substr(0, ids.length - 4)
        this.instance.post('/caseManagement/deleteDeviceRountingByid?ids' + ids).then(res => {
          if (res.data.code === 200) {
            this.getPager()
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.message)
          }
        })
      },
      handleSelectionChange(val) {
        this.selectedList = val
      },
      // batchUpload() {
      //
      // }
    }
  }
</script>
<style>
  .amendSpan {
    color: #0080d0;
    cursor: pointer;
  }
  .ql-editor{
    height:300px;
  }
</style>
