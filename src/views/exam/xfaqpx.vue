<template>
  <div id="app">
    <el-header style="background:#fff;">
      <div style="float: right">
        培训名称:
        <el-input placeholder="请输入" v-model="pageQuery.keywords" style="width: 240px" size="small" class="filter-item">
          <el-button slot="append" icon="el-icon-search" @click="handleFilter"></el-button>
        </el-input>
        培训时间:
        <el-date-picker
                v-model="pageQuery.trainingTime"
                type="date"
                placeholder="选择时间"
                value-format="yyyy-MM-dd"
                style="width: 200px;" size="small" :disabled="true"
        />
        培训性质:
        <el-select v-model="pageQuery.type" placeholder="请选择" clearable :disabled="true" class="filter-item" style="width: 180px" size="small">
          <el-option v-for="item in typeList" :key="item.code" :label="item.msg" :value="item.code"/>
        </el-select>
        <el-button type="primary" @click="handleAdd" size="mini">新增</el-button>
      </div>
    </el-header>
    <el-table v-loading="listLoading" :data="list" style="width: 100%" stripe>
      <el-table-column prop="name" label="培训名称"/>
      <el-table-column prop="trainingTime" label="培训时间" :formatter="dateFormat"/>
      <el-table-column prop="teacher" label="授课人"/>
      <el-table-column prop="trainingPlace" label="培训地点"/>
      <el-table-column prop="type" label="培训性质" :formatter="typeFormat"/>
      <el-table-column prop="deptIds" label="涉及部门" :formatter="deptFormat"/>
      <el-table-column prop="count" label="人数" :formatter="countFormat"/>
      <el-table-column prop="content" label="培训内容"/>
      <el-table-column label="相关文件">
        <template slot-scope="scope">
          <span @click="getFilePager(scope.row)" style="color:#0080d0; cursor: pointer;">查看</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="amendSpan" @click="handleUpdate(scope.row)">编辑</span>|
          <span class="amendSpan" @click="handleDelete(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center">
      <el-pagination
              background
              layout="prev, pager, next,total"
              :total="total"
              :page-size="pageQuery.pageSize"
              :current-page.sync="pageQuery.pageIndex"
              @current-change="currentChange"
      ></el-pagination>
    </div>
    <el-dialog title="文件查看" :visible.sync="dialogModuleVisible" width="60%">
      <el-header style="background:#fff;">
        <div style="float: right">
          <el-button type="primary" @click="handleFileAdd" size="mini">新增</el-button>
        </div>
      </el-header>
      <el-table v-loading="fileListLoading" :data="fileList" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="文件名称"/>
        <el-table-column prop="size" label="文件大小"/>
        <el-table-column prop="createTime" label="上传时间" :formatter="dateFormat"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="deleteSpan" @click="handleFileDelete(scope.row)">删除</span>|
            <span class="amendSpan" @click="handleFileUpdate(scope.row)">编辑</span>|
            <span class="amendSpan" @click="handleFileDownload(scope.row)">下载</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModuleVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textFileMap[dialogFileStatus]" :visible.sync="dialogFileFormVisible" width="40%">
      <el-form ref="dataFileForm" :rules="rules" :model="file" label-position="right" label-width="90px">
        <el-form-item label="文件名称:" prop="name" v-if="dialogFileStatus==='update'||dialogFileStatus==='check'">
          <el-input v-model="file.name"/>
        </el-form-item>
        <el-form-item label="上传文件:" v-if="dialogFileStatus==='add'">
          <template>
            <div class="upload-demo">
              <form action="upload" enctype="multipart/form-data" method="post">
                <input type="file" @change="getFile($event)">
              </form>
            </div>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFileFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogFileStatus==='add'?addFileData():updateFileData()">
          保存
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="70%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="90px">
        <el-form-item label="培训名称:" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="培训时间" prop="trainingTime">
          <el-date-picker
                  v-model="temp.trainingTime"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="授课人:" prop="teacher">
          <el-input v-model="temp.teacher"/>
        </el-form-item>
        <el-form-item label="培训地点:" prop="trainingPlace">
          <el-input v-model="temp.trainingPlace"/>
        </el-form-item>
        <el-form-item label="培训性质:" prop="type">
          <el-select v-model="temp.type" placeholder="请选择" clearable class="filter-item">
            <el-option v-for="item in typeList" :key="item.code" :label="item.msg" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="涉及部门:" prop="deptIds">
          <el-select v-model="temp.deptIds" multiple placeholder="请选择" @change="findUsers" clearable class="filter-item">
            <el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="受训人:" prop="userIds">
          <el-select v-model="temp.userIds" multiple placeholder="请选择" clearable class="filter-item">
            <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="培训内容:" prop="content">
          <el-input v-model="temp.content"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='add'?addData():updateData()">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        listLoading: true,
        list: [],
        total: 0,
        deptList: [],
        userList: [],
        typeList: [
          {msg: '岗前培训', code: '0'},
          {msg: '公众聚集场所培训', code: '1'},
          {msg: '年度培训', code: '2'},
          {msg: '其他', code: '3'}
        ],
        typeObj: '',
        deptObj: {},
        pageQuery: {
          pageIndex: 1,
          pageSize: 10,
          keywords: ''
        },
        temp: {
          id: undefined,
          name: '',
          trainingTime: '',
          trainingPlace: '',
          teacher: '',
          type: '',
          deptIds: '',
          content: '',
          userIds: '',
          attachmentIds: ''
        },
        rules: {},
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑培训',
          add: '新增培训'
        },
        dialogModuleVisible: false,
        fileList: [],
        fileListLoading: false,
        file: {
          id: undefined,
          name: '',
          suffix: '',
          size: '',
          path: '',
          trainingId: '',
          createTime: '',
          url: ''
        },
        dialogFileStatus: '',
        dialogFileFormVisible: false,
        textFileMap: {
          update: '编辑文件',
          add: '新增文件',
          check: '预览文件'
        },
        uploadFile: ''
      }
    },
    created() {
      this.getOptionList()
      this.getPager()
    },
    methods: {
      async getPager() {
        this.listLoading = true
        console.log(this.pageQuery)
        this.$utils.clean(this.pageQuery)
        const res = await this.$request.xwgl.getTrainingList(this.pageQuery)
        this.list = res.data.list
        this.total = res.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      },
      getOptionList() {
        const params = { pageNo: -1, pageSize: 1000 }
        this.$request.zzjg.queryInstitutions(params).then(res => {
          this.deptList = res.data.rows
          this.deptObj = this.$utils.getMap(this.deptList, 'id', 'name')
        })
        this.typeObj = this.$utils.getMap(this.typeList, 'code', 'msg')
      },
      handleFilter() {
        this.pageQuery.pageIndex = 1
        this.getPager()
      },
      currentChange(currentPage) {
        this.pageQuery.pageIndex = currentPage
        this.getPager()
      },
      deptFormat(row) {
        const arr = row.deptIds.split(',')
        let str = ''
        console.log(row.deptIds.length)
        for (let i = 0; i < arr.length; i++) {
          str = str + this.deptObj.get(arr[i]) + ','
        }
        str = str.substr(0, str.length-1)
        return str
      },
      dateFormat(row, column) {  //yyyy-MM-dd
        const str = row[column.property]
        if (str == null || str === '') {
          return ''
        }
        const date = new Date(str)
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
      },
      typeFormat(row) {
        return this.typeObj.get(row.type)
      },
      countFormat(row) {
        return row.userIds.split(',').length
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          title: '',
          titleImg: '',
          type: '',
          articleType: '',
          deptIds: '',
          userIds: '',
          receiveNum: '',
          sendTime: '',
          sendStatus: '',
          author: '',
          contentText: '',
          createBy: '',
          createTime: '',
          updateBy: '',
          updateTime: ''
        }
      },
      async findUsers(value) {
        if (value==='') {
          this.userList = []
          this.temp.userIds = ''
          return
        }
        this.temp.userIds = ''
        this.userList = []
        const res = await this.instance.get('/user/list?deptIds=' + value)
        this.userList = res.data
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
        this.temp.deptIds = this.temp.deptIds.toString()
        this.temp.userIds = this.temp.userIds.toString()
        const res = await this.addDanger.post("/training",this.temp)
        if (res.data.code === 200) {
          this.getPager()
          this.dialogFormVisible = false
          this.$message.success('添加成功')
        } else {
          this.$message.error(res.data.message)
        }
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row)
        if (this.temp.deptIds != null)
          this.temp.deptIds = this.temp.deptIds.split(',')
        if (this.temp.userIds != null)
          this.temp.userIds = this.temp.userIds.split(',')
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      async updateData() {
        this.temp.deptIds = this.temp.deptIds.toString()
        this.temp.userIds = this.temp.userIds.toString()
        const tempData = Object.assign({}, this.temp)
        const res = await this.addDanger.post('/training', tempData)
        if (res.data.code === 200) {
          this.getPager()
          this.dialogFormVisible = false
          this.$message.success('修改成功')
        } else {
          this.$message.error(res.data.message)
        }
      },
      handleDelete(row) {
        this.$confirm('确认删除此培训?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.instance.delete('/training/'+row.id).then((res) => {
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
      async getFilePager(row) {
        this.resetTemp()
        this.temp = Object.assign({}, row)
        const res = await this.addDanger.get('/attachment/list?trainingId=' + row.id)
        this.fileListLoading = true
        this.fileList = res.data.data
        this.dialogModuleVisible = true
        setTimeout(() => {
          this.fileListLoading = false
        }, 1.5 * 100)
      },
      resetFile() {
        this.file = {
          id: undefined,
          name: '',
          suffix: '',
          size: '',
          path: '',
          trainingId: '',
          createTime: '',
          url: ''
        }
      },
      getFile(event) {
        this.uploadFile = event.target.files[0]
      },
      handleFileAdd() {
        this.resetFile()
        this.dialogFileStatus = 'add'
        this.dialogFileFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataFileForm'].clearValidate()
        })
      },
      async addFileData() {
        if (this.uploadFile === '' || this.uploadFile === undefined) {
          this.$message.error('请上传文件!')
          return
        }
        let formData = new FormData()
        formData.append('file', this.uploadFile)
        const res = await this.instance.post('/attachment/upload?trainingId=' + this.temp.id, formData)
        if (res.data.code === 200) {
          this.getFilePager(this.temp)
          this.dialogFileFormVisible = false
          this.$message.success('添加成功')
        } else {
          this.$message.error(res.data.message)
        }
      },
      handleFileUpdate(row) {
        this.file = Object.assign({}, row)
        this.dialogFileStatus = 'update'
        this.dialogFileFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataFileForm'].clearValidate()
        })
      },
      async updateFileData() {
        const res = await this.addDanger.post('/attachment/updateName?id=' + this.file.id + '&name=' + this.file.name)
        if (res.data.code === 200) {
          this.getFilePager(this.temp)
          this.dialogFileFormVisible = false
          this.$message.success('修改成功')
        } else {
          this.$message.error(res.data.message)
        }
      },
      handleFileDelete(row) {
        this.$confirm('确认删除此附件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.instance.delete('/attachment/' + row.id).then((res) => {
            if (res.data.code === 200) {
              this.getFilePager(this.temp)
              this.$message.success('删除成功')
            } else {
              this.$message.error(res.message)
            }
          })
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      },
      handleFileDownload(row){
        this.instance.get('/attachment/download?id=' + row.id,{ responseType: 'arraybuffer'}).then((res)=>{
          const fileName = res.headers["content-disposition"].split("=")[1];
          const _res = res.data;
          console.log(_res)
          // let blob = new Blob([_res]);
          let blob = new Blob([_res],{type:'application/x-msdownload;charset=UTF-8'});
          console.log(blob.size)
          let downloadElement = document.createElement("a");
          let href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = fileName; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
      }
    }
  }
</script>
<style>
  .amendSpan {
    color: #0080d0;
    cursor: pointer;
  }
  .deleteSpan {
    color: #ff0000;
    cursor: pointer;
  }
</style>
