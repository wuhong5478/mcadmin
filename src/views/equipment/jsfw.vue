<template>
  <div id="app">
    <el-header style="background:#fff;">
      <div style="float: right; margin:20px 0 0 0;">
        预案名称:
        <el-input placeholder="请输入" v-model="pageQuery.planName" style="width: 240px;margin-right:20px" size="Medium" class="filter-item">
          <el-button slot="append" icon="el-icon-search" @click="handleFilter"></el-button>
        </el-input>
        预案类型:
        <el-select v-model="pageQuery.planType" placeholder="请选择" clearable class="filter-item" style="width: 100px;margin-right:20px" size="Medium"
        >
          <el-option v-for="item in typeList" :key="item.code" :label="item.msg" :value="item.msg"/>
        </el-select>
        事件类型:
        <el-select v-model="pageQuery.eventType" placeholder="请选择" clearable class="filter-item" style="width: 180px;margin-right:20px;" size="Medium">
          <el-option v-for="item in eventTypeList" :key="item.code" :label="item.msg" :value="item.msg"/>
        </el-select>
        <el-button type="primary" @click="exportExcel" size="medium">导出</el-button>
        <el-button type="primary" @click="handleAdd" size="medium">新增</el-button>
      </div>
    </el-header>
    <el-table
            v-loading="listLoading"
            :data="list"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            id="rebateSetTable" stripe
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="planName" label="预案名称"/>
      <el-table-column prop="planType" label="预案类型" :formatter="typeFormat"/>
      <el-table-column prop="eventType" label="事件类型" :formatter="eventTypeFormat"/>
      <el-table-column prop="architectureName" label="针对建筑"/>
      <el-table-column prop="createTime" label="发送时间" :formatter="dateFormat"/>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <span>
            <a class="amendSpan" target="_blank"  :href="`http://120.55.234.38/api/getPicture?picture=${row.fileUrl}`"
             >
            查看
            </a>
          </span><span style="select-user:none">/</span>
          <span class="amendSpan" @click="handleUpdate(row)">编辑</span><span style="select-user:none">/</span>
          <span class="amendSpan1" @click="handleDelete(row)">删除</span>
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="45%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="90px">
        <el-form-item label="预案名称:" prop="planName">
          <el-input v-model="temp.planName"/>
        </el-form-item>
        <el-form-item label="文件上传:">
          <template>
            <div class="upload-demo">
              <form action="upload" id="form" enctype="multipart/form-data" method="post">
                <input type="file" accept="application/pdf" @change="getFile($event)">
              </form>
            </div>
          </template>
          <p>温馨提示:仅能上传PDF格式文件</p>
        </el-form-item>
        <el-form-item label="预案类型:" prop="planType">
          <el-select v-model="temp.planType" placeholder="请选择" clearable class="filter-item">
            <el-option v-for="item in typeList" :key="item.code" :label="item.msg" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="事件类型:" prop="eventType">
          <el-select v-model="temp.eventType" placeholder="请选择" clearable class="filter-item">
            <el-option v-for="item in eventTypeList" :key="item.code" :label="item.msg" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="针对建筑:" prop="architectureName">
          <el-row>
            <el-col :span="12">
              <el-select v-model="temp.parkName" @change="findBuildings" placeholder="请选择园区" clearable class="filter-item">
                <el-option v-for="item in parkList" :key="item.code" :label="item.msg" :value="item.msg"/>
              </el-select>
            </el-col>
            <el-col :span="12">
              <el-select v-model="temp.architectureId" placeholder="请选择建筑" clearable class="filter-item">
                <el-option v-for="item in buildingList" :key="item.id" :label="item.architectureName" :value="item.id"/>
              </el-select>
            </el-col>
          </el-row>
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
import FileSaver from "file-saver";
import XLSX from "xlsx";
  export default {
    data() {
      return {
        listLoading: true,
        list: [],
        total: 0,
        parkList: [
          {msg: '国际会展中心二期', code: '1106'},
          {msg: '中大产业园', code: '1107'},
          {msg: '云栖小镇', code: '1026'},
          {msg: '润丰产业园', code: '1108'},
          {msg: '鹏辉产业园', code: '1109'},
          {msg: '国际会展中心一期', code: '1110'}
        ],
        parkObj: '',
        buildingList: [],
        buildingObj: {},
        typeList: [
          {msg: '应急行动指南', code: 1},
          {msg: '应急响应预案', code: 2},
          {msg: '互助应急预案', code: 3},
          {msg: '应急管理预案', code: 4}
        ],
        typeObj: {},
        eventTypeList: [
          {msg: '自然灾害', code: 1},
          {msg: '事故灾难', code: 2},
          {msg: '公共卫生事件', code: 3},
          {msg: '社会安全事件', code: 4}
        ],
        eventTypeObj: {},
        pageQuery: {
          pageNo: 1,
          pageSize: 10,
          eventTypeName: '',
          planTypeName: '',
          planName: '',
        },
        park: '',
        temp: {
          id: undefined,
          planName: '',
          planType: '',
          parkName: '',
          eventType: '',
          eventTypeName: '',
          architectureId: '',
          architectureName: '',
          fileUrl: '',
          uploadTime: '',
          remake: ''
        },
        rules: {},
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑预案',
          add: '新增预案'
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
      getFile(event) {
        if (!event.target.files[0].name.endsWith('.pdf')) {
          this.$message.error('请上传PDF文件!')
          event.target.value = ''
        }
        this.file = event.target.files[0]
      },
      getPager() {
        this.listLoading = true
        this.$utils.clean(this.pageQuery)
        const params = this.pageQuery
        request.get('/planmanagement/getplanmanagementlist', {params}).then(res => {
          this.list = res.data.rows
          this.total = res.data.totalCount
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 100)
        })
      },
      getOptionList() {
        this.parkObj = this.$utils.getMap(this.parkList, 'code', 'msg')
        this.typeObj = this.$utils.getMap(this.typeList, 'code', 'msg')
        this.eventTypeObj = this.$utils.getMap(this.eventTypeList, 'code', 'msg')
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
        const date = new Date(str)
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
      },
      typeFormat(row) {
        return this.typeObj.get(row.planType)
      },
      eventTypeFormat(row) {
        return this.eventTypeObj.get(row.eventType)
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          planName: '',
          planType: '',
          parkName: '',
          eventType: '',
          eventTypeName: '',
          architectureId: '',
          architectureName: '',
          fileUrl: '',
          uploadTime: '',
          remake: ''
        }
      },
      async findBuildings(value) {
        if (value==='') {
          this.buildingList = []
          this.temp.architectureId = ''
          return
        }
        this.temp.architectureId = ''
        let park = this.parkList.find((item) => {
          return item.msg === value
        })
        const res = await this.instance.post('/architecture/selectByAreaId?areaId=' + park.code)
        this.buildingList = res.data.data
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
        formData.append('file', this.file)
        let building = this.buildingList.find((item) => {
          return item.id === this.temp.architectureId
        })
        this.temp.architectureName = this.temp.parkName + building.architectureName
        formData.append('planName', this.temp.planName)
        formData.append('planType', this.temp.planType)
        formData.append('eventType', this.temp.eventType)
        formData.append('architectureId', this.temp.architectureId)
        formData.append('architectureName', this.temp.architectureName)//这个字段传不进去
        const resp = await this.addDanger.post("/planmanagement/addplanmanagement",formData)
        if (resp.data.code === 200) {
          this.getPager()
          this.dialogFormVisible = false
          this.$message.success('添加成功')
        } else {
          this.$message.error(resp.message)
        }
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row)
        let park = this.parkList.find((item) => {
          return item.msg === this.temp.parkName
        })
        this.instance.post('/architecture/selectByAreaId?areaId=' + park.code).then(res => {
          this.buildingList = res.data.data
        })
        console.log(this.buildingList)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        let formData = new FormData()
        formData.append('file', this.file)
        let building = this.buildingList.find((item) => {
          return item.id === this.temp.architectureId
        })
        this.temp.architectureName = this.temp.parkName + building.architectureName
        // formData.append('architectureName', this.temp.architectureName)//这个字段传不进去
        this.addDanger.put('/planmanagement/updateplanmanagement?architectureId='+this.temp.architectureId+'&eventType='+this.temp.eventType+'&id='+this.temp.id+'&planName='+this.temp.planName+'&planType='+this.temp.planType, formData).then(res => {
          if (res.data.code === 200) {
            this.getPager()
            this.dialogFormVisible = false
            this.$message.success('修改成功')
          } else {
            this.$message.error(res.message)
          }
        })
      },
      handleDelete(row) {
        this.$confirm('确认删除此预案?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.instance.delete('/planmanagement/deletetaskwarn/' + row.id).then((res) => {
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
      handleSelectionChange(val) {
        this.selectedList = val
      },
      exportExcel() {
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(
          document.querySelector("#rebateSetTable")
        );
        /* get binary string as output */
        let wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
        });
        try {
          FileSaver.saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
              "预案列表.xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
      }
    }
  }
</script>
<style>
  .amendSpan {
    color: #0080d0;
    cursor: pointer;
    text-decoration: none;
  }
  .amendSpan {
    color: #606266;
    cursor: pointer;
    text-decoration: none;
  }


</style>
