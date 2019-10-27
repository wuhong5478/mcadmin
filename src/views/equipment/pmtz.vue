<template>
  <div class="pmtz">
    <!-- 左侧上传按钮 -->
    <div class="pmtz-header">
      <!-- 右侧搜索框 -->
      <div class="right">
        <!-- 下拉菜单选中园区id -->
        <el-select v-model="valueRight" @change="changeIearId" size="medium" placeholder="请选择园区" >
          <el-option
            v-for="item in optionsRight"
            :key="item.value"
            :label="item.areaName"
            :value="item.areaId"
          ></el-option>
        </el-select>
        <el-input v-model="input" size="medium" placeholder="请输入关键字进行搜索"></el-input>
        <el-button type="primary" class="search" size="medium" @click="getFuzzyMap">查询</el-button>
        <!-- <img
          src="http://120.55.234.38/api/getPicture?picture=b19b5b981e424ee1b8f059c3f2ab6426.png"
          alt
        />-->
      </div>
      <el-button style="float: right" type="primary" size="medium" @click="upload">上传</el-button>
    </div>
    <!-- 列表信息 -->
    <el-container>
      <!--左侧列表  -->
      <el-aside width="100%">
        <el-table
          :header-cell-style="{background:'#FAFAFA'}"
          :data="tableData.slice((currentPage-1) * pagesize,currentPage * pagesize)"
          stripe
          style="width: 100%"
        >
          <el-table-column type="index" label=" " :index="indexMethod"></el-table-column>
          <el-table-column prop="drawingName" label="图纸名称"></el-table-column>
          <el-table-column prop="fileSize" label="文件大小"></el-table-column>
          <el-table-column label="上传时间">
            <template v-slot="scope">
              <span>{{scope.row.uploadTime | dateFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{row}">
              <!-- <span class="download" @click="download(row)">下载</span> -->
              <a
                class="download"
                target="_blank"
                :href="`http://120.55.234.38/api/getPicture?picture=${row.file}`"
              >预览</a>/
              <span class="amend" @click="amend(row)">编辑</span>/
              <span class="delete" @click="deleteMap(row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <div style="text-align: center">
          <el-pagination
            background
            layout="prev, pager, next,total"
            :total="total"
            :page-size="pagesize"
            :current-page.sync="currentPage"
            @current-change="currentChange"
          ></el-pagination>
        </div>
      </el-aside>
      <!-- 右侧图纸展示 -->
      <!-- <el-main class="el-main">
        <img :src="url" alt />
      </el-main>-->
    </el-container>
    <!-- 上传图片对话框 -->
    <el-dialog title="上传图片" :visible.sync="dialogVisible" width="40%">
      <p class="mapName">图纸名称:</p>
      <!-- 园区名称 -->
      <template>
        <el-select v-model="areaName" placeholder="选择园区" @change="changeArea">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.areaName"
            :value="item.areaName + ':' + item.areaId"
          ></el-option>
        </el-select>
      </template>
      <!-- 楼号 -->
      <template>
        <el-select v-model="architectureName" placeholder="选择楼号" @change="changeBulid">
          <el-option
            v-for="item in options1"
            :key="item.id"
            :label="item.architectureName"
            :value="item.architectureName + ':' + item.id"
          ></el-option>
        </el-select>
      </template>
      <!-- 楼层 -->
      <template>
        <el-input v-model="floorInput" class="floorInput" placeholder="输入楼层"></el-input>
      </template>
      <!-- 序列号 -->
      <template>
        <el-input v-model="NumInput" class="floorInput" placeholder="输入序列号"></el-input>
      </template>
      <!-- 图片上传 -->
      <template>
        <div class="upload-demo">
          <form action="upload" id="form" enctype="multipart/form-data" method="post">
            <input type="file" name="file" ref="fileInt" />
          </form>
        </div>
      </template>
      <!-- 提示 -->
      <p>温馨提示:仅能上传png格式的图片</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadContent">上传</el-button>
      </span>
    </el-dialog>
    <!-- 修改平面图纸的对话框 -->
    <el-dialog title="修改信息" :visible.sync="dialogVisible2" width="40%">
      <p class="mapName">图纸名称:</p>
      <!-- 园区名称 -->
      <template>
        <el-select v-model="areaName" placeholder="选择园区" @change="changeArea">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.areaName"
            :value="item.areaName + ':' + item.areaId"
          ></el-option>
        </el-select>
      </template>
      <!-- 楼号 -->
      <template>
        <el-select
          v-model="amendArchitectureName"
          ref="select"
          placeholder="选择楼号"
          @change="changeBulid"
        >
          <el-option
            v-for="item in options1"
            :key="item.id"
            :label="item.architectureName"
            :value="item.architectureName + ':' + item.id"
          ></el-option>
        </el-select>
      </template>
      <!-- 楼层 -->
      <template>
        <!-- <el-input-number
          v-model="amendNum"
          @change="handleChange"
          controls-position="right"
          :min="-2"
          :max="7"
          placeholder="选择楼层"
        ></el-input-number>-->
        <el-input v-model="amendInputFloor" class="floorInput" placeholder="输入园区"></el-input>
      </template>
      <!-- 序列号 -->
      <template>
        <el-input v-model="amendInputNum" class="floorInput" placeholder="输入序列号"></el-input>
      </template>
      <!-- 图片上传 -->
      <template>
        <div class="upload-demo">
          <form action="upload" id="form" enctype="multipart/form-data" method="post">
            <!-- <label for="upPic" class="btn btn-default">上传图片</label> -->
            <!-- <p ref="p">{{pictureUrl}}</p> -->
            <input type="file" @change="changePic" id="upPic" name="file" ref="fileInt" />
          </form>
        </div>
      </template>
      <!-- 提示 -->
      <p>温馨提示:仅能上传png格式的图片</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="amendContent">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
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
      // 筛选条件的园区名称
      optionsRight: [{ areaName: '全部园区', value: '' }],
      // 筛选条件的园区id
      valueRight: '',
      // 回显的图片
      pictureUrl: '',
      //输入楼层
      floorInput: '',
      // 修改图纸的楼层输入框
      amendInputFloor: '',
      // 添加图纸所需的参数
      tableData: [],
      dialogVisible: false,
      dialogImageUrl: '',
      dialogVisible1: false,
      dialogVisible2: false,
      hideUpload: false,
      // 右侧搜索框双向绑定的input
      input: '',
      limitCount: 1,
      // 数据总数
      total: 0,
      pagesize: 10,
      currentPage: 1,
      options: [],
      options1: [],
      // options2: [
      //   { label2: '1层', value2: '1层' },
      //   { label2: '2层', value2: '2层' },
      //   { label2: '3层', value2: '3层' },
      //   { label2: '4层', value2: '4层' },
      //   { label2: '5层', value2: '5层' },
      //   { label2: '6层', value2: '6层' },
      //   { label2: '7层', value2: '7层' },
      //   { label2: '-1层', value2: '-1层' },
      //   { label2: '-2层', value2: '-2层' }
      // ],
      // 图片上传的楼层号
      // updateNum: undefined,
      // 图片修改的楼层号
      // amendNum: undefined,
      // 园区名称
      areaName: '',
      // 园区id
      areaId: '',
      // 上传图纸的楼号
      architectureName: '',
      // 修改图纸的楼号
      amendArchitectureName: '',
      label: '',
      value2: '',
      // 楼号名称
      bulidName: '',
      // 楼号id
      bulidId: '',
      // 楼层
      floorName: '',
      // 修改图纸的id
      mapId: '',
      // 图片路劲
      url: '',
      // 查询图纸的数据对象
      mapObj: {
        // 园区id
        areaId: '',
        // 图纸名称
        drawingName: ''
      },
      amendInputNum: '', // 修改图纸的序列号
      NumInput: '' // 上传图纸的序列号
    }
  },
  created() {
    // this.property()
    this.getAllMap()
    this.getAllArea()
  },
  // 监听属性--监听园区名字的变化将楼号名称重置
  watch: {
    areaName() {
      // this.architectureName = null
    }
  },
  // updated() {
  //   this.options1 = null
  // },
  methods: {
    // 限制图片上传的格式
    // fileChange(target) {
    //   var name = target.value
    //   var fileName = name.substring(name.lastIndexOf('.') + 1).toLowerCase()
    //   if (fileName != 'png') {
    //     target.value = ''
    //     this.$message({
    //       type: 'info',
    //       message: '只能上传png的格式的图片',
    //       duration: 1000
    //     })
    //     return
    //   }
    // },
    // 图纸的索引值
    indexMethod(index) {
      return index + 1 + (this.currentPage - 1) * this.pagesize
    },
    // 进入页面渲染全部园区的图纸信息
    async getAllMap() {
      const res = await this.$request.map.FuzzyQuery(this.mapObj)
      // console.log(res.data)
      this.tableData = res.data
      this.total = res.data.length
      // 处理文件大小的格式
      this.tableData.forEach(v => {
        v.fileSize = v.fileSize + 'K'
      })
    },
    // 修改
    changePic() {
      console.log(1)
      this.$refs.p.innerText = ''
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage
    },
    handleSizeChange(psize) {
      this.pagesize = psize
    },
    // 根据园区id获取园区图纸的方法
    // async showMapTwo(id) {
    //   const res = await this.$request.map.inquireMap({
    //     areaId: id
    //   })
    //   console.log(res.data)
    //   res.data.forEach(v => {
    //     console.log(v)
    //     this.tableData.push(v)
    //   })
    //   // 处理文件大小的格式
    //   // this.tableData.forEach(v => {
    //   // v.fileSize = v.fileSize + 'K'
    //   // })
    //   // console.log(res.data.length)
    //   this.total = this.tableData.length
    //   // console.log(this.total)
    // },
    // 根据物业id查询相关的园区信息
    // async property() {
    //   const res = await this.$request.map.areaInfo({
    //     propertyId: '55061421E757414486F995CDB9DD5DA0'
    //   })
    //   console.log(res.data)
    //   var arr = []
    //   res.data.forEach(v => {
    //     arr.push(v.areaId)
    //   })
    //   console.log(arr)
    //   // this.areaId = res.data[0].areaId
    //   // const id = res.data[0].areaId
    //   // console.log(id)
    //   arr.forEach(v => {
    //     this.showMapTwo(v)
    //   })
    // },
    // 点击上传按钮显示上传图片对话框
    upload() {
      // console.log(1)
      this.areaName = ''
      this.dialogVisible = true
    },

    // 修改平面图纸弹出对话框
    async amend(row) {
      this.dialogVisible2 = true
      console.log(row)
      this.amendInputFloor = row.floor
      this.pictureUrl = row.file
      this.amendInputNum = row.serialNumber
      // 根据园区id查询园区名称
      const res = await this.$request.map.getAreaName({
        areaId: row.areaId
      })
      console.log(res)
      // 根据建筑Id查询建筑名称
      const resBulid = await this.$request.map.getBulidName({
        id: row.architectureId
      })
      console.log(resBulid)
      this.amendArchitectureName = resBulid.data.architectureName
      // console.log(res.data)
      this.getBulidName(row.areaId)
      this.areaId = row.areaId
      this.bulidId = row.architectureId
      this.areaName = res.data.areaName
      this.mapId = row.id

      // console.log(row.id)
    },
    // 删除图纸的操作
    async deleteMap(row) {
      console.log(row)
      try {
        await this.$confirm('你确定要删除该图纸信息吗？', '温馨提示', {
          type: 'warning'
        })
        // console.log(row)
        await this.$request.map.deleteMap({
          drawingId: row.id
        })
        // console.log(res.data)
        // 重新渲染页面
        await this.$request.map.inquireMap({
          areaId: String(row.areaId)
        })
        // console.log(showRes)
        // this.tableData = []
        // this.tableData = showRes.data
        // this.property()
        this.$message({
          type: 'success',
          message: '删除成功',
          duration: 1000
        })
        await this.getAllMap()
        // this.total = showRes.data.length
      } catch (e) {
        this.$message({
          type: 'info',
          message: '取消删除',
          duration: 1000
        })
      }
    },

    // 获取到所有的行政区域
    async getAllArea() {
      const res = await this.$request.map.getAllArea()
      // console.log(res.data)
      this.options = res.data
      res.data.forEach(v => {
        this.optionsRight.push(v)
      })
      // this.optionsRight = res.data
      // console.log(this.areaId)
    },

    // 切换区域名称发送ajax渲染楼号名称
    async changeArea(value) {
      // console.log(value)
      // 园区名称
      this.areaName = value.split(':')[0]
      // 园区id
      this.areaId = value.split(':')[1]
      this.architectureName = ''
      this.amendArchitectureName = ''
      this.getBulidName(this.areaId)
    },
    // 更新楼号的方法
    async getBulidName(name) {
      // console.log(name);
      const res = await this.$request.map.getBulid({
        areaId: String(name)
      })
      console.log(res)
      this.options1 = res.data
    },
    // 切换楼号获取到楼号名称
    changeBulid(value) {
      // console.log(value)
      this.bulidName = value.split(':')[0]
      this.bulidId = value.split(':')[1]
      // console.log(this.bulidName)
      // console.log(this.bulidId)
    },
    // handleChange(newValue, oldValue) {

    //   if (newValue === 0 && oldValue === 1) {
    //     this.updateNum = -1
    //     newValue = -1
    //   }
    //   if (newValue === 0 && oldValue === -1) {
    //     this.updateNum = 1
    //     newValue = 1
    //   }
    //   this.floorName = newValue + '层'
    //   console.log(this.floorName)
    // },
    // 点击对话框中的上传按钮上传图片和图纸信息
    async uploadContent() {
      // 对数据进行非空校验
      // console.log(this.bulidName)

      if (
        this.areaName === '' ||
        this.bulidName === '' ||
        this.floorInput === ''
      ) {
        this.$message({
          type: 'error',
          message: '请将信息填写完整',
          duration: 1500
        })
        return
      }
      if (this.areaName === '云栖小镇') {
        this.$message({
          type: 'error',
          message: '温馨提示，云栖小镇没有更多的信息了',
          duration: 1500
        })
        return
      }
      // if (this.floorName === '0层') {
      //   this.$message({
      //     type: 'error',
      //     message: '请选择正确的楼层号',
      //     duration: 1500
      //   })
      //   return
      // }
      // 获取到图纸名称
      this.tableData.name = this.areaName + this.bulidName + this.floorInput
      console.log(this.tableData.name)
      // 图纸路径
      // console.log(this.fileList)
      let form = document.getElementById('form')
      // console.log(form.target)
      var data = new FormData(form)
      var file = this.$refs.fileInt.files[0]
      // console.log(file)
      data.append('file', file)
      data.append('areaId', this.areaId)
      data.append('architectureId', this.bulidId)
      data.append('drawingName', this.tableData.name)
      data.append('floor', this.floorInput)
      data.append('serialNumber', this.NumInput)

      // 添加图纸信息
      const res = await this.instance.post(
        '/Drawing/insertAndUpdateDrawing',
        data
      )
      // console.log(res.data)
      // 添加成功对页面进行重构
      // this.showMapTwo(this.areaId)
      // this.tableData = []
      // this.property()
      // console.log(this)
      // console.log(this.$refs.select.value)
      // this.$refs.select.value = ''
      console.log(res)
      this.$message({
        type: 'success',
        message: '上传成功',
        duration: 1500
      })
      this.areaName = ''
      this.bulidName = ''
      this.floorInput = ''
      this.dialogVisible = false
      await this.getAllMap()
    },
    // 修改图纸的信息
    async amendContent() {
      console.log(this.areaName)
      console.log(this.amendArchitectureName)
      console.log(this.amendInputFloor)
      // 对数据进行非空校验
      if (
        this.areaName === '' ||
        this.amendArchitectureName === '' ||
        this.amendInputFloor === ''
      ) {
        this.$message({
          type: 'error',
          message: '温馨提示，请将信息填写完整',
          duration: 1500
        })
        return
      }
      // 获取到图纸名称
      this.tableData.name =
        this.areaName + this.amendArchitectureName + this.amendInputFloor
      // console.log(this.tableData.name)
      // 图纸路径
      // console.log(this.fileList)
      let form = document.getElementById('form')
      // console.log(form.target)
      var data = new FormData(form)
      var file = this.$refs.fileInt.files[0]
      // console.log(file)
      // const url = this.$refs.p.innerText
      // console.log(url)
      console.log(file)
      // if (file === undefined) {

      // }
      console.log(file)
      data.append('file', file || '')
      data.append('areaId', this.areaId)
      data.append('architectureId', this.bulidId)
      data.append('drawingName', this.tableData.name)
      data.append('floor', this.amendInputFloor)
      data.append('drawingId', this.mapId)
      data.append('serialNumber', this.amendInputNum)
      console.log(data)
      // 修改图纸信息
      await this.instance.post('/Drawing/insertAndUpdateDrawing', data)
      this.$message({
        type: 'success',
        message: '修改成功',
        duration: 1500
      })
      // console.log(res.data)
      // 添加成功对页面进行重构
      // this.showMapTwo(this.areaId)
      // 解开
      // this.tableData = []
      // this.property()
      await this.getAllMap()
      this.dialogVisible2 = false
    },
    // 点击查询按钮获取到input框的文本内容
    async getFuzzyMap() {
      // console.log(this.areaId)
      // console.log(this.input)
      // if (this.input === '') {
      //   this.$message({
      //     type: 'error',
      //     message: '请输入图纸关键字',
      //     duration: 1000
      //   })
      //   return
      // }
      console.log(this.valueRight)
      const res = await this.$request.map.FuzzyQuery({
        areaId: this.valueRight,
        drawingName: this.input
      })
      // console.log(res.data)
      this.tableData = res.data
      // 处理文件大小的格式
      this.tableData.forEach(v => {
        v.fileSize = v.fileSize + 'K'
      })
      this.total = res.data.length
      // this.valueRight = ''
    },
    // 切换园区名称实现筛选功能
    changeIearId(value) {
      // console.log(value)
      this.mapObj.areaId = value
      this.getAllMap()
    },
    // 分页的功能
    currentChange(currentPage) {
      // console.log(currentPage)
      this.currentPage = currentPage
    },
    // 下载功能
    async download(row) {
      this.url = row.file
      // console.log(row.file)
    }
  }
}
</script>

<style lang="less" scoped>
.pmtz {
  padding: 20px 10px;
  user-select: none;
  background-color: #fff;
  .pmtz-header {
    overflow: hidden;
  }
  .right {
    float: left;
    .el-input {
      width: 35%;
      // margin-right: 10px;
    }
  }
  // 左侧列表
  .el-aside {
    padding-top: 10px;
    .download {
      color: #909399;
      cursor: pointer;
      margin-right: 2px;
      text-decoration: none;
    }
    .amend {
      cursor: pointer;
      color: #409eff;
      margin-right: 2px;
    }
    .delete {
      cursor: pointer;
      margin-right: 2px;
      color: #909399;
    }
  }
  // 右侧图纸展示
  .el-main {
    padding-top: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
  }
  .mapName {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .el-dropdown {
    margin-right: 30px;
  }
}
.el-upload--picture-card {
  width: 300px;
  // text-align: center;
}
.hide .el-upload--picture-card {
  display: none;
}
/deep/.el-table th > .cell {
  text-align: center;
}
/deep/.el-table .cell {
  text-align: center;
}
// 选择框样式
.el-select {
  width: 25%;
  margin-right: 10px;
}
.upload-demo {
  margin: 5px;
}
.el-input-number {
  width: 125px;
}
.floorInput {
  width: 20%;
  margin-right: 10px;
}
.search {
  margin-left: 10px;
}
</style>