<template>
  <div id="app">
    <el-header style="background:#fff;padding-top:20px;">
      <div style="float: right">
        事件类型:
        <el-select v-model="pageQuery.type" placeholder="请选择" clearable class="filter-item" style="width: 180px" size="small">
          <el-option v-for="item in typeList" :key="item.code" :label="item.msg" :value="item.code"/>
        </el-select>
        推送方式:
        <el-select v-model="pageQuery.webName" placeholder="请选择" clearable class="filter-item" style="width: 180px" size="small">
          <el-option v-for="item in sendTypeList" :key="item.code" :label="item.msg" :value="item.msg"/>
        </el-select>
        事件园区:
        <el-select v-model="pageQuery.parkId" placeholder="请选择" clearable class="filter-item" style="width: 180px" size="small">
          <el-option v-for="item in parkList" :key="item.code" :label="item.msg" :value="item.code"/>
        </el-select>
        <el-button type="primary" @click="handleFilter" size="mini">查询</el-button>
        <el-button type="primary" @click="handleAdd" size="mini">新增</el-button>
      </div>
    </el-header>
    <el-table v-loading="listLoading" :data="list" style="width: 100%" stripe>
      <el-table-column prop="type" label="事件类型" :formatter="typeFormat"/>
      <el-table-column prop="parkId" label="事件地址" :formatter="parkFormat"/>
      <el-table-column prop="webName" label="推送机构"/>
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
              :current-page.sync="pageQuery.pageNo"
              @current-change="currentChange"
      ></el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="40%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px">
        <el-form-item label="事件类型:" prop="type">
          <el-select v-model="temp.type" placeholder="请选择" clearable class="filter-item">
            <el-option v-for="item in typeList" :key="item.code" :label="item.msg" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="事件园区:" prop="parkId">
            <el-select v-model="temp.parkId" placeholder="请选择" clearable class="filter-item">
                <el-option v-for="item in parkList" :key="item.code" :label="item.msg" :value="item.code"/>
            </el-select>
        </el-form-item>
        <el-form-item label="推送方式:">
          <el-checkbox checked disabled>推送群</el-checkbox>
        </el-form-item>
        <el-form-item label="群名称:" prop="webName">
          <el-input v-model="temp.webName" placeholder="填写群名称（必填）"/>
        </el-form-item>
        <el-form-item label="推送链接:" prop="webHook">
          <el-input v-model="temp.webHook" placeholder="获得钉钉群推送方式请输入机器人链接（必填）"/>
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
  import request from '@/api/request'
  export default {
    data() {
      return {
        listLoading: true,
        list: [],
        total: 0,
        typeList: [
          {msg: '火警报警', code: 1},
          {msg: '火灾报警', code: 2}
        ],
        typeObj: '',
        parkList: [
          {msg: '国际会展中心二期', code: '1106'},
          {msg: '中大产业园', code: '1107'},
          {msg: '云栖小镇', code: '1026'},
          {msg: '润丰产业园', code: '1108'},
          {msg: '鹏辉产业园', code: '1109'},
          {msg: '国际会展中心一期', code: '1110'}
        ],
        parkObj: '',
        sendDeptList: [
          {msg: '物业公司', code: '2'},
          {msg: '维保公司', code: '3'}
        ],
        sendDeptObj: '',
        sendTypeList: [
          {msg: '钉钉个人', code: '1'},
          {msg: '钉钉小程序', code: '2'},
          {msg: '钉钉群', code: '3'}
        ],
        sendTypeObj: '',
        pageQuery: {
          pageNo: 1,
          pageSize: 10,
          parkId: '',
          type: '',
          sendType: ''
        },
        temp: {
          id: undefined,
          isAccept: '',
          parkId: '',
          type: '',
          webName: '',
          webHook: ''
        },
        rules: {
          webHook: [{ required: true, message: '必填', trigger: 'change' }],
          webName: [{ required: true, message: '必填', trigger: 'change' }]
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑事件',
          add: '新增事件'
        }
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
        const res = await this.$request.xwgl.getNoticeList(this.pageQuery)
        this.list = res.data.rows
        this.total = res.data.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      },
      getOptionList() {
        this.typeObj = this.$utils.getMap(this.typeList, 'code', 'msg')
        this.parkObj = this.$utils.getMap(this.parkList, 'code', 'msg')
        this.sendDeptObj = this.$utils.getMap(this.sendDeptList, 'code', 'msg')
        this.sendTypeObj = this.$utils.getMap(this.sendTypeList, 'code', 'msg')
      },
      handleFilter() {
        this.pageQuery.pageNo = 1
        this.getPager()
      },
      currentChange(currentPage) {
        this.pageQuery.pageNo = currentPage
        this.getPager()
      },
      typeFormat(row) {
        return this.typeObj.get(row.type)
      },
      parkFormat(row) {
        return this.parkObj.get(row.parkId)
      },
      sendDeptFormat(row) {
        return this.sendDeptObj.get(row.sendDept)
      },
      sendTypeFormat(row) {
        return this.sendTypeObj.get(row.sendType)
      },
      resetTemp() {
        this.temp = {
            id: undefined,
            isAccept: '',
            parkId: '',
            type: '',
            webName: '',
            webHook: ''
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
      addData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            this.temp.isAccept = 1
              request.post('/sendNotice/add', this.temp).then(res => {
              if (res.code === 200) {
                this.getPager()
                this.dialogFormVisible = false
                this.$message.success('添加成功')
              } else {
                this.$message.error(res.data.message)
              }
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row)
        console.log(this.temp.id)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      async updateData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            this.addDanger.put('/sendNotice/update?id='+this.temp.id+'&isAccept='+this.temp.isAccept+'&webName='+this.temp.webName+'&parkId='+this.temp.parkId+'&type='+this.temp.type+'&webHook='+this.temp.webHook).then(res => {
              if (res.data.code === 200) {
                this.getPager()
                this.dialogFormVisible = false
                this.$message.success('修改成功')
              } else {
                this.$message.error(res.data.message)
              }
            })
          }
        })
      },
      handleDelete(row) {
        this.$confirm('确认删除此事件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.instance.post('/sendNotice/delete?id=' + row.id).then((res) => {
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
      }
    }
  }
</script>
<style>
  .amendSpan {
    color: #0080d0;
    cursor: pointer;
  }
</style>
