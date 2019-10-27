<template>
  <div class="box">
    <header>
      <el-form :inline="true">
        <el-form-item label="检查对象名称">
          <el-input
            v-model="state"
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            style="display:inline-block;width:70%"
            size="medium"
          ></el-input>
          <el-button @click="search1" type="primary" size="medium">查询</el-button>
        </el-form-item>
        <el-form-item label="检查对象地址">
          <el-input
            v-model="stateaddress"
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            style="display:inline-block;width:70%"
            size="medium"
          ></el-input>
          <el-button @click="search2" type="primary" size="medium">查询</el-button>
        </el-form-item>
        <el-form-item class="header-buttom">
          <el-button type="primary" @click="xjtc= true" size="medium">新增</el-button>
          <el-button type="primary" size="medium" @click="download" :disabled="downloadButton">批量下载</el-button>
        </el-form-item>
      </el-form>
    </header>
    <main>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" @click="select(scope.$index, scope.row)"></el-table-column>
        <el-table-column prop="qrcodeNumber" label="二维码编号"></el-table-column>
        <el-table-column prop="qrcodeName" label="检查对象名称"></el-table-column>

        <el-table-column prop="parkId" label="园区"></el-table-column>
        <el-table-column prop="installAddress" label="检查对象地址"></el-table-column>
        <el-table-column prop="otherOption" label="检查对象类型"></el-table-column>
        <el-table-column prop="updateTime" label="上次编辑时间"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <span
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              style="color:#0080d0;cursor: pointer;"
            >编辑/</span>
            <span
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              style="color:#909399;cursor: pointer;"
            >删除</span>

            <!-- 编辑弹窗 -->
            <el-dialog title="编辑" :visible.sync="dialogFormVisible">
              <el-form :model="obj" ref="ruleForm">
                <el-form-item label="二维码编号" :label-width="formLabelWidth" :disabled="true">
                  <el-input v-model="obj.qrcodeNumber" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="检查对象名称" :label-width="formLabelWidth">
                  <el-input v-model="obj.qrcodeName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="检查对象地址" :label-width="formLabelWidth">
                  <el-input v-model="obj.installAddress" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="检查对象类型" :label-width="formLabelWidth">
                  <el-select v-model="obj.otherOption" placeholder="请检查对象类型">
                    <el-option label="建筑防火分隔设施" value="1"></el-option>
                    <el-option label="火灾自动报警系统维保 " value="2"></el-option>
                    <el-option label="防烟、排烟设施维保 " value="3"></el-option>
                    <el-option label="水系统维保" value="4"></el-option>
                    <el-option label="消防电气和通讯设施维保 " value="5"></el-option>
                    <el-option label="气体灭火系统维保 " value="6"></el-option>
                    <el-option label="其他 " value="7"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="所属园区" :label-width="formLabelWidth">
                  <el-select v-model="obj.parkId" placeholder="请选择所属园区">
                    <el-option label="国际会展中心二期" value="1106"></el-option>
                    <el-option label="中大产业园 " value="1107"></el-option>
                    <el-option label="润丰产业园" value="1108"></el-option>
                    <el-option label="鹏辉产业园" value="1109"></el-option>
                    <el-option label="国际会展中心一期 " value="1110"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="上次编辑时间" :label-width="formLabelWidth">
                  <el-input v-model="obj.updateTime" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleQEdit">确 定</el-button>
              </div>
            </el-dialog>
            <!-- 编辑弹窗 -->
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="新增" :visible.sync="xjtc">
        <el-form :model="oobj">
          <el-form-item label="维保对象名称" required :label-width="formLabelWidth">
            <el-input v-model="oobj.qrcodename" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="维保对象地址" required :label-width="formLabelWidth">
            <el-input v-model="oobj.installAddress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="维保对象类型" required :label-width="formLabelWidth">
            <el-select v-model="oobj.otherOption" placeholder="请选择对象性质">
              <el-option label="建筑防火分隔设施" value="1"></el-option>
              <el-option label="火灾自动报警系统维保 " value="2"></el-option>
              <el-option label="防烟、排烟设施维保 " value="3"></el-option>
              <el-option label="水系统维保" value="4"></el-option>
              <el-option label="消防电气和通讯设施维保 " value="5"></el-option>
              <el-option label="气体灭火系统维保 " value="6"></el-option>
              <el-option label="其他 " value="7"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属园区" required :label-width="formLabelWidth">
            <el-select v-model="oobj.parkId" placeholder="请选择所属园区">
              <el-option label="国际会展中心二期" value="1106"></el-option>
              <el-option label="中大产业园" value="1107"></el-option>
              <el-option label="润丰产业园" value="1108"></el-option>
              <el-option label="鹏辉产业园" value="1109"></el-option>
              <el-option label="国际会展中心一期" value="1110"></el-option>
            </el-select>
          </el-form-item>

          <!-- <div style="margin: 20px 0;margin-left:23px;">备注:</div> -->
          <el-form-item label="备注" required :label-width="formLabelWidth">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="oobj.remark"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="xjtc = false">取 消</el-button>
          <el-button type="primary" @click="handleQQEdit">确 定</el-button>
        </div>
      </el-dialog>

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
    </main>
  </div>
</template>
<script>
import config from './jobConfig.json'
export default {
  data() {
    return {
      total: 0,
      pagesize: 10,
      currentPage: 1,
      downloadButton: false,
      formInline: config.config,
      title: '新建二维码',
      isShow: false,
      width: '600px',
      height: '1000px',
      tableData: [],
      bjtc: false,
      remark: '',
      lj: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      xjtc: false,
      state: '',
      stateaddress: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        select: '',
        currentPage: ''
      },
      // rules: {
      //   qrcodeName: [
      //     {
      //       required: true,
      //       message: '请输入巡检对象名称',
      //       trigger: 'change'
      //     }
      //   ],
      //   address: [
      //     {
      //       required: true,
      //       message: '请输入检查对象地址',
      //       trigger: 'change'
      //     }
      //   ],
      //   nature_option: [
      //     {
      //       required: true,
      //       message: '请输入检查对象类型',
      //       trigger: 'change'
      //     }
      //   ],
      //   xzname: [
      //     {
      //       required: true,
      //       message: '请输入维保对象名称',
      //       trigger: 'change'
      //     }
      //   ],
      //   xzdz: [
      //     {
      //       required: true,
      //       message: '请输入维保对象地址',
      //       trigger: 'change'
      //     }
      //   ],
      //   dxlx: [
      //     {
      //       required: true,
      //       message: '请选择维保对象类型',
      //       trigger: 'change'
      //     }
      //   ],
      //   yznm: [
      //     {
      //       required: true,
      //       message: '请选择所填项类型',
      //       trigger: 'change'
      //     }
      //   ]
      // },
      obj: {},
      oobj: {},
      // down:{Id:''},

      multipleSelection: [],
      downloadArr: [],
      sc: {},
      tabledata: [],
      formLabelWidth: '120px'
    }
  },
  watch: {
    multipleSelection(val) {
      // alert(val.length)
      if (val.length == 0) {
        this.downloadButton = true
      } else {
        this.downloadButton = false
      }
    },
    currentPage(val) {}
  },
  methods: {
    currentChange(currentPage) {
      // console.log(currentPage)
      var that = this
      this.currentPage = currentPage
      that.$request.wb
        .getMaintenanceTrountQrcodefoList({
          pageNo: this.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
          // alert('请求了哦~-',res.data.rows)
          that.total = res.data.totalCount
          that.tableData = res.data.rows
          console.log('诸神之战', res.data.rows)
          that.tableData.forEach(a => {
            if (a.parkId == 1106) {
              a.parkId = '国际会展中心二期'
            } else if (a.parkId == 1107) {
              a.parkId = '中大产业园'
            } else if (a.parkId == 1108) {
              a.parkId = '润丰产业园'
            } else if (a.parkId == 1109) {
              a.parkId = '鹏辉产业园'
            } else if (a.parkId == 1110) {
              a.parkId = '国际会展中心一期'
            }
            if (a.otherOption == 1) {
              a.otherOption = '建筑防火分隔设施'
            } else if (a.otherOption == 2) {
              a.otherOption = '火灾自动报警系统维保'
            } else if (a.otherOption == 3) {
              a.otherOption = '防烟、排烟设施维保'
            } else if (a.otherOption == 4) {
              a.otherOption = '水系统维保'
            } else if (a.otherOption == 5) {
              a.otherOption = '消防电气和通讯设施维保'
            } else if (a.otherOption == 6) {
              a.otherOption = '气体灭火系统维保'
            } else if (a.otherOption == 7) {
              a.otherOption = '其他'
            }
          })
        })
    },

    download() {
      this.multipleSelection.forEach(a => {
        this.downloadArr.push(a.id)
      })
      console.log(this.downloadArr)
      let str = this.downloadArr.join(',')
      this.zip
        .post('/maintenanceTrountQrcode/DownloadQcodeUrl?Id=' + str)
        .then(res => {
          console.log(res)
          const link = document.createElement('a')
          let blob = new Blob([res.data], {
            type: 'application/json; application/octet-stream'
          })
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)

          // link.download = res.headers['content-disposition'] //下载后文件名
          link.download = '二维码下载.zip' //下载的文件名
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
      this.downloadArr = []
    },
    search1() {
      var that = this
      that.$request.wb
        .getMaintenanceTrountQrcodefoName({ qrcodeName: that.state })
        .then(res => {
          // this.total = res.data.totalCount
          if (res.msg == '未找到相关数据') {
            that.tableData = null
          } else {
            that.tableData = res.data.rows
            that.total = res.data.totalCount

            that.tableData.forEach(a => {
              if (a.parkId == '1106') {
                a.parkId = '国际会展中心二期'
              } else if (a.parkId == '1107') {
                a.parkId = '中大产业园'
              } else if (a.parkId == '1108') {
                a.parkId = '润丰产业园'
              } else if (a.parkId == '1109') {
                a.parkId = '鹏辉产业园'
              } else if (a.parkId == '1110') {
                a.parkId = '国际会展中心一期'
              }
              if (a.natureOption == '1') {
                a.natureOption = '应急灯、疏散指示灯'
              } else if (a.natureOption == '2') {
                a.natureOption = '消火栓'
              } else if (a.natureOption == '3') {
                a.natureOption = '灭火器'
              } else if (a.natureOption == '4') {
                a.natureOption = '防火门、防火卷帘'
              } else if (a.natureOption == '5') {
                a.natureOption = '重点单位'
              } else if (a.natureOption == '6') {
                a.natureOption = '疏散通道'
              } else if (a.natureOption == '7') {
                a.natureOption = '其他'
              }

              if (a.otherOption == '1') {
                a.otherOption = '消防设施'
              } else if (a.otherOption == '2') {
                a.otherOption = '疏散通道'
              } else if (a.otherOption == '3') {
                a.otherOption = '重点部位'
              } else if (a.otherOption == '4') {
                a.otherOption = '其他'
              }
            })
          }
        })
    },
    handleSelectionChange(val) {
      // val 表示选中所有的数据对象
      this.multipleSelection = val
      console.log(1111111111111111, this.multipleSelection)
    },
    search2() {
      var that = this
      that.$request.wb

        .getMaintenanceTrountQrcodefoinstallAddress({
          installAddress: that.stateaddress
        })
        .then(res => {
          if (res.data == null) {
            that.tableData = null
          } else {
            that.tableData = res.data.rows
            that.total = res.data.totalCount
            that.tableData.forEach(a => {
              if (a.parkId == '1106') {
                a.parkId = '国际会展中心二期'
              } else if (a.parkId == '1107') {
                a.parkId = '中大产业园'
              } else if (a.parkId == '1108') {
                a.parkId = '润丰产业园'
              } else if (a.parkId == '1109') {
                a.parkId = '鹏辉产业园'
              } else if (a.parkId == '1110') {
                a.parkId = '国际会展中心一期'
              }
              if (a.otherOption == '1') {
                a.otherOption = '建筑防火分隔设施'
              } else if (a.otherOption == '2') {
                a.otherOption = '火灾自动报警系统维保'
              } else if (a.otherOption == '3') {
                a.otherOption = '防烟、排烟设施维保'
              } else if (a.otherOption == '4') {
                a.otherOption = '水系统维保'
              } else if (a.otherOption == '5') {
                a.otherOption = '消防电气和通讯设施维保'
              } else if (a.otherOption == '6') {
                a.otherOption = '气体灭火系统维保'
              } else if (a.otherOption == '7') {
                a.otherOption = '其他'
              }
            })
          }
        })
    },
    select(index, row) {
      this.editFrom = Object.assign({}, row)
      console.log('chulai', row)
    },

    click(e) {
      console.log('eeee建松', e)
    },
    handleEdit(index, row) {
      console.log(row)
      this.dialogFormVisible = true

      this.editFrom = Object.assign({}, row)
      this.obj = row

      console.log('1111我打开了编辑哦', this.tableData)
    },
    handleQQEdit() {
      var that = this

      console.log('这个是新增弹窗', this.oobj)
      this.$request.wb.insertMaintenanceTrountQrcode(this.oobj).then(res => {
        console.log('这是个oobj', this.oobj)
        this.$request.wb.getMaintenanceTrountQrcodefoList().then(res => {
          that.oobj = {}
          res.data.rows.forEach(a => {
            if (a.parkId == '1106') {
              a.parkId = '国际会展中心二期'
            } else if (a.parkId == '1107') {
              a.parkId = '中大产业园'
            } else if (a.parkId == '1108') {
              a.parkId = '润丰产业园'
            } else if (a.parkId == '1109') {
              a.parkId = '鹏辉产业园'
            } else if (a.parkId == '1110') {
              a.parkId = '国际会展中心一期'
            }
            if (a.otherOption == '1') {
              a.otherOption = '建筑防火分隔设施'
            } else if (a.otherOption == '2') {
              a.otherOption = '火灾自动报警系统维保'
            } else if (a.otherOption == '3') {
              a.otherOption = '防烟、排烟设施维保'
            } else if (a.otherOption == '4') {
              a.otherOption = '水系统维保'
            } else if (a.otherOption == '5') {
              a.otherOption = '重点消防电气和通讯设施维保单位'
            } else if (a.otherOption == '6') {
              a.otherOption = '气体灭火系统维保'
            } else if (a.otherOption == '7') {
              a.otherOption = '其他'
            }
          })
          that.tableData = res.data.rows
        })
      })

      this.xjtc = false
    },
    handleQEdit() {
      var that = this
      // console.log('cnm就你一直报错', that.obj)
      if (that.obj.parkId == '国际会展中心二期') {
        that.obj.parkId = 1106
      } else if (that.obj.parkId == '中大产业园') {
        that.obj.parkId = 1107
      } else if (that.obj.parkId == '润丰产业园') {
        that.obj.parkId = 1108
      } else if (that.obj.parkId == '鹏辉产业园') {
        that.obj.parkId = 1109
      } else if (that.obj.parkId == '国际会展中心一期') {
        that.obj.parkId = 1110
      }
      if (that.obj.otherOption == '建筑防火分隔设施') {
        that.obj.otherOption = 1
      } else if (that.obj.otherOption == '火灾自动报警系统维保') {
        that.obj.otherOption = 2
      } else if (that.obj.otherOption == '防烟、排烟设施维保') {
        that.obj.otherOption = 3
      } else if (that.obj.otherOption == '水系统维保') {
        that.obj.otherOption = 4
      } else if (that.obj.otherOption == '消防电气和通讯设施维保') {
        that.obj.otherOption = 5
      } else if (that.obj.otherOption == '气体灭火系统维保') {
        that.obj.otherOption = 6
      } else if (that.obj.otherOption == '其他') {
        that.obj.otherOption = 7
      }

      console.log('确定编辑了哦', this.obj)
      this.$request.wb.updateMaintenanceTrountQrcodeById(this.obj).then(res => {
        // alert(res)
        this.$request.wb.getMaintenanceTrountQrcodefoList().then(res => {
          that.tableData = res.data.rows
          that.tableData.forEach(a => {
            if (a.parkId == '1106') {
              a.parkId = '国际会展中心二期'
            } else if (a.parkId == '1107') {
              a.parkId = '中大产业园'
            } else if (a.parkId == '1108') {
              a.parkId = '润丰产业园'
            } else if (a.parkId == '1109') {
              a.parkId = '鹏辉产业园'
            } else if (a.parkId == '1110') {
              a.parkId = '国际会展中心一期'
            }
            if (a.otherOption == '1') {
              a.otherOption = '建筑防火分隔设施'
            } else if (a.otherOption == '2') {
              a.otherOption = '火灾自动报警系统维保'
            } else if (a.otherOption == '3') {
              a.otherOption = '防烟、排烟设施维保'
            } else if (a.otherOption == '4') {
              a.otherOption = '水系统维保'
            } else if (a.otherOption == '5') {
              a.otherOption = '消防电气和通讯设施维保'
            } else if (a.otherOption == '6') {
              a.otherOption = '气体灭火系统维保'
            } else if (a.otherOption == '7') {
              a.otherOption = '其他'
            }
          })
          console.log(res.data.rows)

          console.log(that.tableData)
          this.dialogFormVisible = false
        })
      })

      this.dialogFormVisible = false
    },
    closeMoule(e) {
      this.isShow = e
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var that = this
          console.log(111111111111111111, this.formInline.dialog.ruleForm)
          // alert('submit!');

          that.$request.xj
            .insertDeviceTrountQrcode(that.formInline.dialog.ruleForm)
            .then(res => {
              alert(res)
              console.log('成了')
              that.$request.xj.getDeviceTrountQrcodefoList({}).then(res => {
                that.tableData = res.data.rows
                console.log('成了成了', res.data.rows)
              })
            })
          this.isShow = false

          this.formInline.dialog.ruleForm = {}
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.isShow = false
      this.$refs['ruleForm'].resetFields()
    },
    async handleDelete(index, row) {
      try {
        await this.$confirm('你确定要删除该维保信息吗？', '温馨提示', {
          type: 'warning'
        })
        var that = this
        this.editFrom = Object.assign({}, row)
        this.sc = row
        console.log('scscscs', this.sc)
        this.$request.wb
          .deleteMaintenanceById({
            Id: this.sc.id
          })
          .then(res => {
            // alert(res)
            that.$request.wb
              .getMaintenanceTrountQrcodefoList({
                pageNo: 1,
                pageSize: 10,
                qrcodeName: that.state,
                stateaddress: that.stateaddress
              })
              .then(res => {
                console.log('来了来了，他真的来了', res.data.rows)
                that.tableData = res.data.rows
                that.tableData.forEach(a => {
                  if (a.parkId == 1106) {
                    a.parkId = '国际会展中心二期'
                  } else if (a.parkId == 1107) {
                    a.parkId = '中大产业园'
                  } else if (a.parkId == 1108) {
                    a.parkId = '润丰产业园'
                  } else if (a.parkId == 1109) {
                    a.parkId = '鹏辉产业园'
                  } else if (a.parkId == 1110) {
                    a.parkId = '国际会展中心一期'
                  }

                  if (a.otherOption == 1) {
                    a.otherOption = '建筑防火分隔设施'
                  } else if (a.otherOption == 2) {
                    a.otherOption = '火灾自动报警系统维保'
                  } else if (a.otherOption == 3) {
                    a.otherOption = '防烟、排烟设施维保'
                  } else if (a.otherOption == 4) {
                    a.otherOption = '水系统维保'
                  } else if (a.otherOption == 5) {
                    a.otherOption = '消防电气和通讯设施维保'
                  } else if (a.otherOption == 6) {
                    a.otherOption = '气体灭火系统维保'
                  } else if (a.otherOption == 7) {
                    a.otherOption = '其他'
                  }
                })
              })
              .then(res => {
                console.log('来了来了，他真的来了', res.data.rows)
                that.tableData = res.data.rows
              })
          })
      } catch (e) {
        this.$message({
          type: 'info',
          message: '取消删除',
          duration: 1000
        })
      }
    }
  },
  mounted() {
    var that = this
    that.$request.wb
      .getMaintenanceTrountQrcodefoList({ pageNo: 1, pageSize: 10 })
      .then(res => {
        // alert('请求了哦~-',res.data.rows)
        that.tableData = res.data.rows
        console.log('诸神之战', res.data.rows)
        that.tableData.forEach(a => {
          if (a.parkId == 1106) {
            a.parkId = '国际会展中心二期'
          } else if (a.parkId == 1107) {
            a.parkId = '中大产业园'
          } else if (a.parkId == 1108) {
            a.parkId = '润丰产业园'
          } else if (a.parkId == 1109) {
            a.parkId = '鹏辉产业园'
          } else if (a.parkId == 1110) {
            a.parkId = '国际会展中心一期'
          }
          if (a.otherOption == 1) {
            a.otherOption = '建筑防火分隔设施'
          } else if (a.otherOption == 2) {
            a.otherOption = '火灾自动报警系统维保'
          } else if (a.otherOption == 3) {
            a.otherOption = '防烟、排烟设施维保'
          } else if (a.otherOption == 4) {
            a.otherOption = '水系统维保'
          } else if (a.otherOption == 5) {
            a.otherOption = '消防电气和通讯设施维保'
          } else if (a.otherOption == 6) {
            a.otherOption = '气体灭火系统维保'
          } else if (a.otherOption == 7) {
            a.otherOption = '其他'
          }

          that.total = res.data.totalCount
        })
      })
  }
}
</script>
<style lang="less" scoped>
.box {
  padding: 20px;
  background: #fff;

  header {
    border-bottom: 1px solid #eee;

    .header-buttom {
      float: right;
    }
  }
  .obj-rom {
    display: flex;
    align-items: flex-end;
  }
  .obj-build {
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 5px;
  }
  .obj {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
  }
}
</style>