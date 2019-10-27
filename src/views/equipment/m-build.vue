<template>
  <div id="app">
    <el-container>
      <el-dialog title="新增表单" :visible.sync="dialogTableVisible">
        <el-form :model="form">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.architectureName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="所属园区" :label-width="formLabelWidth">
            <el-select v-model="form.affiliatedPark" placeholder="请选择所属园区">
              <el-option label="鹏辉产业园" value="1109"></el-option>
              <el-option label="国际会展中心一期" value="1110"></el-option>
              <el-option label="国际会展中心二期" value="1106"></el-option>
              <el-option label="中大产业园" value="1107"></el-option>
              <el-option label="润丰产业园" value="1108"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="建筑类型" :label-width="formLabelWidth">
            <el-select v-model="form.architectureType" placeholder="请选择建筑类型">
              <el-option label="居住建筑" value="1"></el-option>
              <el-option label="公共建筑" value="2"></el-option>
              <el-option label="工业建筑" value="3"></el-option>
              <el-option label="农业建筑" value="4"></el-option>
              <el-option label="其他建筑" value="5"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="负责人" :label-width="formLabelWidth">
            <el-input v-model="form.personLiable" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="form.telephone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="经度" :label-width="formLabelWidth">
            <el-input v-model="form.longitude" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="纬度" :label-width="formLabelWidth">
            <el-input v-model="form.latitude" autocomplete="off"></el-input>
          </el-form-item>
         <el-form-item label="建筑编号" :label-width="formLabelWidth">
            <el-input v-model="form.buildNo" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="图纸类型" :label-width="formLabelWidth">
            <el-select v-model="form.drawingType" placeholder="请选择图纸类型">
              <el-option label="平面图" value="1"></el-option>
              <el-option label="立面图" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="建筑的所属行业" :label-width="formLabelWidth">
            <el-select v-model="form.industry" placeholder="请选择所属行业">
              <el-option label="农业生产" value="1"></el-option>
              <el-option label="农业加工" value="2"></el-option>
              <el-option label="生产" value="3"></el-option>
              <el-option label="仓储" value="4"></el-option>
              <el-option label="辅助" value="5"></el-option>
              <el-option label="动力" value="6"></el-option>
              <el-option label="商业" value="7"></el-option>
              <el-option label="行政" value="8"></el-option>
              <el-option label="文教" value="9"></el-option>
              <el-option label="科研" value="10"></el-option>
              <el-option label="医疗" value="11"></el-option>
              <el-option label="观览" value="12"></el-option>
              <el-option label="体育" value="13"></el-option>
              <el-option label="交通" value="14"></el-option>
              <el-option label="通信" value="15"></el-option>
              <el-option label="居住" value="16"></el-option>
              <el-option label="商住一体" value="17"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="重点单位" :label-width="formLabelWidth">
            <el-select v-model="form.isKeyUnit" placeholder="是否为重点单位">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRow">确 定</el-button>
        </div>
      </el-dialog>


      <!-- 编辑弹窗 -->
    <el-dialog title="编辑表单" :visible.sync="bjtc">
        <el-form :model="obj">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="obj.architectureName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="所属园区" :label-width="formLabelWidth">
            <el-select v-model="obj.affiliatedPark" placeholder="请选择所属园区">
              <el-option label="鹏辉产业园" value="1109"></el-option>
              <el-option label="国际会展中心一期" value="1110"></el-option>
              <el-option label="国际会展中心二期" value="1106"></el-option>
              <el-option label="中大产业园" value="1107"></el-option>
              <el-option label="润丰产业园" value="1108"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="建筑类型" :label-width="formLabelWidth">
            <el-select v-model="obj.architectureType" placeholder="请选择建筑类型">
              <el-option label="居住建筑" value="1"></el-option>
              <el-option label="公共建筑" value="2"></el-option>
              <el-option label="工业建筑" value="3"></el-option>
              <el-option label="农业建筑" value="4"></el-option>
              <el-option label="其他建筑" value="5"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="负责人" :label-width="formLabelWidth">
            <el-input v-model="obj.personLiable" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="obj.telephone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="经度" :label-width="formLabelWidth">
            <el-input v-model="obj.longitude" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="纬度" :label-width="formLabelWidth">
            <el-input v-model="obj.latitude" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="建筑编号" :label-width="formLabelWidth">
            <el-input v-model="obj.buildNo" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="图纸类型" :label-width="formLabelWidth">
            <el-select v-model="obj.drawingType" placeholder="请选择图纸类型">
              <el-option label="平面图" value="1"></el-option>
              <el-option label="立面图" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="建筑的所属行业" :label-width="formLabelWidth">
            <el-select v-model="obj.industry" placeholder="请选择所属行业">
              <el-option label="农业生产" value="1"></el-option>
              <el-option label="农业加工" value="2"></el-option>
              <el-option label="生产" value="3"></el-option>
              <el-option label="仓储" value="4"></el-option>
              <el-option label="辅助" value="5"></el-option>
              <el-option label="动力" value="6"></el-option>
              <el-option label="商业" value="7"></el-option>
              <el-option label="行政" value="8"></el-option>
              <el-option label="文教" value="9"></el-option>
              <el-option label="科研" value="10"></el-option>
              <el-option label="医疗" value="11"></el-option>
              <el-option label="观览" value="12"></el-option>
              <el-option label="体育" value="13"></el-option>
              <el-option label="交通" value="14"></el-option>
              <el-option label="通信" value="15"></el-option>
              <el-option label="居住" value="16"></el-option>
              <el-option label="商住一体" value="17"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="重点单位" :label-width="formLabelWidth">
            <el-select v-model="obj.isKeyUnit" placeholder="是否为重点单位">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="bjtc = false">取 消</el-button>
          <el-button type="primary" @click="handleQedit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑弹窗 -->
      <el-header style="background:#fff">
        <div style="padding:15px">
          <el-button
            type="primary"
            size="medium"
            @click="dialogTableVisible = true;"
            style="float:right"
          >新增</el-button>

          <el-select v-model="value" placeholder="所属园区" size="medium" clearable>
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :span="8" style="position:relative">
            <div class="grid-content bg-purple">
              <span style="
    font-size: 12px;
    margin-top: 3.7%;
    display: inline-block;"></span>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="background:#fff">
        <el-table
          ref="multipleTable"
          :data="b.filter(data => !search || data.user.toLowerCase().includes(search.toLowerCase()))"
          tooltip-effect="dark"
          style="width: 100%"
        >

          <el-table-column prop="architectureName" label="名称"></el-table-column>
          <el-table-column prop="affiliatedPark" label="所属园区"></el-table-column>
          <el-table-column prop="architectureType" label="建筑类型"></el-table-column>
          <el-table-column prop="personLiable" label="负责人"></el-table-column>
          <el-table-column prop="telephone" label="联系电话"></el-table-column>
          <el-table-column prop="longitude" label="经度"></el-table-column>
          <el-table-column prop="latitude" label="纬度"></el-table-column>
          <el-table-column prop="drawingType" label="图纸类型"></el-table-column>
          <el-table-column prop="industry" label="行业"></el-table-column>
          <el-table-column prop="isKeyUnit" label="重点单位"></el-table-column>
          <el-table-column prop="buildNo" label="建筑编号"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <span
                size="medium"
                @click="handleEdit(scope.$index, scope.row)"
                style="color:#0080d0;cursor: pointer;"
              >编辑</span>
              <span
                size="medium"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                style="color:#909399;cursor: pointer;"
              >删除</span>
              
              
            </template>
          </el-table-column>
<!-- 分页器 -->

        </el-table>
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
      </el-main>
    </el-container>
  </div>
</template>




<style lang="less" scoped>
.el-row {
  margin-top: 10px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
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
<script>
export default {
  data() {
    return {
      look:false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      rowId: "",
      bj: {},
      bjqd: {},
      bjtc: false,
      sbj: {},
      options: [
        {
          label: "鹏辉产业园",
          value: "1109"
        },
        {
          label: "国际会展中心二期",
          value: "1106"
        },
        {
          label: "国际会展中心一期",
          value: "1110"
        },
        {
          label: "中大产业园",
          value: "1107"
        },
        {
          label: "润丰产业园",
          value: "1108"
        },{
          label:"全部",
          value:null
        }
      ],
      value: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        architectureName: "",
        affiliatedPark: "",
        architectureType: "",
        personLiable: "",
        id: "",
        telephone: "",
        longitude: "",
        industry: "",
        latitude: ""
      },
      obj: {
        architectureName: "",
        affiliatedPark: "",
        architectureType: "",
        personLiable: "",
        telephone: "",
        longitude: "",
        industry: "",
        id: "",

        latitude: ""
      },
      b: [],
      formLabelWidth: "120px",
      search: ""
    };
  },
  mounted() {
    var that = this;
    that.$request.build
      .selectArchitectureByCriteria({
        currentPage: 1,
        pageSize: 10
      })
      .then(res => {
        console.log('res',res)
        that.total = res.data.totalCount;
        that.b = res.data.rows;
        that.b.forEach(a=>{
          if(a.isKeyUnit=='1'){
            a.isKeyUnit = '是'
          }else if(a.isKeyUnit=='0'){
            a.isKeyUnit = '否'
          }
        })
        that.b.forEach(a => {
          if (a.affiliatedPark == 1026) {
            a.affiliatedPark = "云栖小镇";
          } else if (a.affiliatedPark == 1106) {
            a.affiliatedPark = "国际会展中心二期";
          } else if (a.affiliatedPark == 1107) {
            a.affiliatedPark = "中大产业园";
          } else if (a.affiliatedPark == 1108) {
            a.affiliatedPark = "润丰产业园";
          } else if (a.affiliatedPark == 1109) {
            a.affiliatedPark = "鹏辉产业园";
          } else if ((a.affiliatedPark = 1110)) {
            a.affiliatedPark = "国际会展中心一期";
          }

          if (a.architectureType == 1) {
            a.architectureType = "居住建筑";
          } else if (a.architectureType == 2) {
            a.architectureType = "公共建筑";
          } else if (a.architectureType == 3) {
            a.architectureType = "公共建筑";
          } else if (a.architectureType == 4) {
            a.architectureType = "农业建筑";
          } else if (a.architectureType == 5) {
            a.architectureType = "其他建筑";
          }
        });
        that.b.forEach(a => {
          if (a.drawingType == 1) {
            a.drawingType = "平面图";
          } else if (a.drawingType == 2) {
            a.drawingType = "立面图";
          }
        });
        that.b.forEach(a => {
          if (a.industry == 1) {
            a.industry = "农业生产";
          } else if (a.industry == 2) {
            a.industry = "农业加工";
          } else if (a.industry == 3) {
            a.industry = "生产";
          } else if (a.industry == 4) {
            a.industry = "仓储";
          } else if (a.industry == 5) {
            a.industry = "辅助";
          } else if (a.industry == 6) {
            a.industry = "动力";
          } else if (a.industry == 7) {
            a.industry = "商业";
          } else if (a.industry == 8) {
            a.industry = "行政";
          } else if (a.industry == 9) {
            a.industry = "文教";
          } else if (a.industry == 10) {
            a.industry = "科研";
          } else if (a.industry == 11) {
            a.industry = "医疗";
          } else if (a.industry == 12) {
            a.industry = "观览";
          } else if (a.industry == 13) {
            a.industry = "体育";
          } else if (a.industry == 14) {
            a.industry = "交通";
          } else if (a.industry == 15) {
            a.industry = "通信";
          } else if (a.industry == 16) {
            a.industry = "居住";
          } else if (a.industry == 17) {
            a.industry = "商住一体";
          }
        });
      });
  },
  // 监听控制园区选择列表
  watch: {
    
    async value(val) {
      let res = await this.$request.build.selectArchitectureByCriteria({
        currentPage: 1,
        pageSize: 10,
        affiliatedPark: val
      });
      this.total = res.data.totalCount
      this.b = res.data.rows;
      var that = this;
      that.b.forEach(a=>{
          if(a.isKeyUnit=='1'){
            a.isKeyUnit = '是'
          }else if(a.isKeyUnit=='0'){
            a.isKeyUnit = '否'
          }
        })
      that.b.forEach(a => {
        if (a.architectureType == 1) {
          a.architectureType = "居住建筑";
        } else if (a.architectureType == 2) {
          a.architectureType = "公共建筑";
        } else if (a.architectureType == 3) {
          a.architectureType = "公共建筑";
        } else if (a.architectureType == 4) {
          a.architectureType = "农业建筑";
        } else if (a.architectureType == 5) {
          a.architectureType = "其他建筑";
        }
      });
      that.b.forEach(a => {
        if (a.affiliatedPark == 1026) {
          a.affiliatedPark = "云栖小镇";
        } else if (a.affiliatedPark == 1106) {
          a.affiliatedPark = "国际会展中心二期";
        } else if (a.affiliatedPark == 1107) {
          a.affiliatedPark = "中大产业园";
        } else if (a.affiliatedPark == 1108) {
          a.affiliatedPark = "润丰产业园";
        } else if (a.affiliatedPark == 1109) {
          a.affiliatedPark = "鹏辉产业园";
        } else if (a.affiliatedPark == 1110) {
          a.affiliatedPark = "国际会展中心一期";
        }
      });

      that.b.forEach(a => {
        if (a.drawingType == 1) {
          a.drawingType = "平面图";
        } else if (a.drawingType == 2) {
          a.drawingType = "立面图";
        }
      });
      that.b.forEach(a => {
        if (a.industry == 1) {
          a.industry = "农业生产";
        } else if (a.industry == 2) {
          a.industry = "农业加工";
        } else if (a.industry == 3) {
          a.industry = "生产";
        } else if (a.industry == 4) {
          a.industry = "仓储";
        } else if (a.industry == 5) {
          a.industry = "辅助";
        } else if (a.industry == 6) {
          a.industry = "动力";
        } else if (a.industry == 7) {
          a.industry = "商业";
        } else if (a.industry == 8) {
          a.industry = "行政";
        } else if (a.industry == 9) {
          a.industry = "文教";
        } else if (a.industry == 10) {
          a.industry = "科研";
        } else if (a.industry == 11) {
          a.industry = "医疗";
        } else if (a.industry == 12) {
          a.industry = "观览";
        } else if (a.industry == 13) {
          a.industry = "体育";
        } else if (a.industry == 14) {
          a.industry = "交通";
        } else if (a.industry == 15) {
          a.industry = "通信";
        } else if (a.industry == 16) {
          a.industry = "居住";
        } else if (a.industry == 17) {
          a.industry = "商住一体";
        }
      });
    }
  },

  methods: {
    currentChange(currentPage){
      var that = this
      that.currentPage = currentPage;
      that.$request.build.selectArchitectureByCriteria({
        currentPage:that.currentPage,
        pageSize:that.pageSize
      }).then(res=>{
        that.b = res.data.rows;
        that.total = res.data.totalCount

         that.b.forEach(a => {
          if (a.affiliatedPark == 1026) {
            a.affiliatedPark = "云栖小镇";
          } else if (a.affiliatedPark == 1106) {
            a.affiliatedPark = "国际会展中心二期";
          } else if (a.affiliatedPark == 1107) {
            a.affiliatedPark = "中大产业园";
          } else if (a.affiliatedPark == 1108) {
            a.affiliatedPark = "润丰产业园";
          } else if (a.affiliatedPark == 1109) {
            a.affiliatedPark = "鹏辉产业园";
          } else if ((a.affiliatedPark = 1110)) {
            a.affiliatedPark = "国际会展中心一期";
          }

          if (a.architectureType == 1) {
            a.architectureType = "居住建筑";
          } else if (a.architectureType == 2) {
            a.architectureType = "公共建筑";
          } else if (a.architectureType == 3) {
            a.architectureType = "公共建筑";
          } else if (a.architectureType == 4) {
            a.architectureType = "农业建筑";
          } else if (a.architectureType == 5) {
            a.architectureType = "其他建筑";
          }
        });
         that.b.forEach(a=>{
          if(a.isKeyUnit=='1'){
            a.isKeyUnit = '是'
          }else if(a.isKeyUnit=='0'){
            a.isKeyUnit = '否'
          }
        })
        that.b.forEach(a => {
          if (a.drawingType == 1) {
            a.drawingType = "平面图";
          } else if (a.drawingType == 2) {
            a.drawingType = "立面图";
          }
        });
        that.b.forEach(a => {
          if (a.industry == 1) {
            a.industry = "农业生产";
          } else if (a.industry == 2) {
            a.industry = "农业加工";
          } else if (a.industry == 3) {
            a.industry = "生产";
          } else if (a.industry == 4) {
            a.industry = "仓储";
          } else if (a.industry == 5) {
            a.industry = "辅助";
          } else if (a.industry == 6) {
            a.industry = "动力";
          } else if (a.industry == 7) {
            a.industry = "商业";
          } else if (a.industry == 8) {
            a.industry = "行政";
          } else if (a.industry == 9) {
            a.industry = "文教";
          } else if (a.industry == 10) {
            a.industry = "科研";
          } else if (a.industry == 11) {
            a.industry = "医疗";
          } else if (a.industry == 12) {
            a.industry = "观览";
          } else if (a.industry == 13) {
            a.industry = "体育";
          } else if (a.industry == 14) {
            a.industry = "交通";
          } else if (a.industry == 15) {
            a.industry = "通信";
          } else if (a.industry == 16) {
            a.industry = "居住";
          } else if (a.industry == 17) {
            a.industry = "商住一体";
          }
        })
      })
    },
    handleDelete(index, row) {
      // this.b.splice(index, 1)
      var that = this
      this.editFrom = Object.assign({}, row);
      this.obj = row;
      this.bj = this.obj;
      console.log(this.obj);
      var that = this;
      that.$request.build
        .deleteArchitecture({
          architectureId: that.bj.id
        })
        .then(res => {
          console.log("删除");
          that.$request.build
            .selectArchitectureByCriteria({
              currentPage: that.currentPage,
              pageSize: 10
            })
            .then(res => {
              that.b = res.data.rows;
              that.b.forEach(a=>{
                if(a.isKeyUnit==1){
                  a.isKeyUnit == "是"
                }else if(a.isKeyUnit==0){
                  a.isKeyUnit == "否"
                }
              })
              that.b.forEach(a => {
                if (a.affiliatedPark == 1026) {
                  a.affiliatedPark = "云栖小镇";
                } else if (a.affiliatedPark == 1106) {
                  a.affiliatedPark = "国际会展中心二期";
                } else if (a.affiliatedPark == 1107) {
                  a.affiliatedPark = "中大产业园";
                } else if (a.affiliatedPark == 1108) {
                  a.affiliatedPark = "润丰产业园";
                } else if (a.affiliatedPark == 1109) {
                  a.affiliatedPark = "鹏辉产业园";
                } else if ((a.affiliatedPark = 1110)) {
                  a.affiliatedPark = "国际会展中心一期";
                }

                if (a.architectureType == 1) {
                  a.architectureType = "居住建筑";
                } else if (a.architectureType == 2) {
                  a.architectureType = "公共建筑";
                } else if (a.architectureType == 3) {
                  a.architectureType = "公共建筑";
                } else if (a.architectureType == 4) {
                  a.architectureType = "农业建筑";
                } else if (a.architectureType == 5) {
                  a.architectureType = "其他建筑";
                }
              });
              that.b.forEach(a => {
                if (a.drawingType == 1) {
                  a.drawingType = "平面图";
                } else if (a.drawingType == 2) {
                  a.drawingType = "立面图";
                }
              });
              that.b.forEach(a => {
                if (a.industry == 1) {
                  a.industry = "农业生产";
                } else if (a.industry == 2) {
                  a.industry = "农业加工";
                } else if (a.industry == 3) {
                  a.industry = "生产";
                } else if (a.industry == 4) {
                  a.industry = "仓储";
                } else if (a.industry == 5) {
                  a.industry = "辅助";
                } else if (a.industry == 6) {
                  a.industry = "动力";
                } else if (a.industry == 7) {
                  a.industry = "商业";
                } else if (a.industry == 8) {
                  a.industry = "行政";
                } else if (a.industry == 9) {
                  a.industry = "文教";
                } else if (a.industry == 10) {
                  a.industry = "科研";
                } else if (a.industry == 11) {
                  a.industry = "医疗";
                } else if (a.industry == 12) {
                  a.industry = "观览";
                } else if (a.industry == 13) {
                  a.industry = "体育";
                } else if (a.industry == 14) {
                  a.industry = "交通";
                } else if (a.industry == 15) {
                  a.industry = "通信";
                } else if (a.industry == 16) {
                  a.industry = "居住";
                } else if (a.industry == 17) {
                  a.industry = "商住一体";
                }
              });
            });
        });

     
    },

    handleEdit(index, row) {
      this.editFrom = Object.assign({}, row);
      this.obj = row;
      console.log(this.obj);
      console.log("点开编辑弹窗obj", this.obj);

      this.bjtc = true;
    },
    // 编辑修改按钮
    handleQedit() {
      var that = this;
      this.sbj = this.obj
      if(this.sbj.isKeyUnit=="是"){
        this.sbj.isKeyUnit = 1
      }else if(this.sbj.isKeyUnit=="否"){
        this.sbj.isKeyUnit = 0
      }
      if(this.sbj.affiliatedPark=="鹏辉产业园"){
        this.sbj.affiliatedPark='1109'
      }else if(this.sbj.affiliatedPark=="国际会展中心一期"){
        this.sbj.affiliatedPark='1110'
      }else if(this.sbj.affiliatedPark=="国际会展中心二期"){
        this.sbj.affiliatedPark='1106'
      }else if(this.sbj.affiliatedPark=="中大产业园"){
        this.sbj.affiliatedPark='1107'
      }else if(this.sbj.affiliatedPark=="润丰产业园"){
        this.sbj.affiliatedPark='1108'
      }
      if(this.sbj.architectureType=='居住建筑'){
        sbj.architectureType='1'
      }else if(this.sbj.architectureType=='公共建筑'){
        this.sbj.architectureType='2'
      }else if(this.sbj.architectureType=='工业建筑'){
        this.sbj.architectureType='3'
      }else if(this.sbj.architectureType=='农业建筑'){
        this.sbj.architectureType='4'
      }else if(this.sbj.architectureType=='其他建筑'){
        this.sbj.architectureType='5'
      }
      if(this.sbj.drawingType=='平面图'){
        this.sbj.drawingType='1'
      }else if(this.sbj.drawingType=='立面图'){
        this.sbj.drawingType='2'
      }
      if(this.sbj.industry=='农业生产'){
        this.sbj.industry='1'
      }else if(this.sbj.industry=='农业加工'){
        this.sbj.industry='2'
      }else if(this.sbj.industry=='生产'){
        this.sbj.industry='3'
      }else if(this.sbj.industry=='仓储'){
        this.sbj.industry='4'
      }else if(this.sbj.industry=='辅助'){
        this.sbj.industry='5'
      }else if(this.sbj.industry=='动力'){
        this.sbj.industry='6'
      }else if(this.sbj.industry=='商业'){
        this.sbj.industry='7'
      }else if(this.sbj.industry=='行政'){
        this.sbj.industry='8'
      }else if(this.sbj.industry=='文教'){
        this.sbj.industry='9'
      }else if(this.sbj.industry=='科研'){
        this.sbj.industry='10'
      }else if(this.sbj.industry=='医疗'){
        this.sbj.industry='11'
      }else if(this.sbj.industry=='观览'){
        this.sbj.industry='12'
      }else if(this.sbj.industry=='体育'){
        this.sbj.industry='13'
      }else if(this.sbj.industry=='交通'){
        this.sbj.industry='14'
      }else if(this.sbj.industry=='通信'){
        this.sbj.industry='15'
      }else if(this.sbj.industry=='居住'){
        this.sbj.industry='16'
      }else if(this.sbj.industry=='商住一体'){
        this.sbj.industry='17'
      }
      console.log("确定编辑弹窗sbj 已翻译", that.sbj);
     that.$request.build.addAndUpdateArchitecture(that.sbj).then(res=>{
       that.$request.build.selectArchitectureByCriteria({currentPage:that.currentPage,pageSize :10}).then(res=>{
         that.b = res.data.rows
         that.b.forEach(a=>{
           if(a.isKeyUnit=='1'){
             a.isKeyUnit='是'
           }else if(a.isKeyUnit=='0'){
             a.isKeyUnit='否'
           }
            if (a.affiliatedPark =='1026') {
            a.affiliatedPark = "云栖小镇";
          } else if (a.affiliatedPark =='1106') {
            a.affiliatedPark = "国际会展中心二期";
          } else if (a.affiliatedPark =='1107') {
            a.affiliatedPark = "中大产业园";
          } else if (a.affiliatedPark =='1108') {
            a.affiliatedPark = "润丰产业园";
          } else if (a.affiliatedPark =='1109') {
            a.affiliatedPark = "鹏辉产业园'";
          } else if ((a.affiliatedPark ='1110')) {
            a.affiliatedPark = "国际会展中心一期";
          }

          if (a.architectureType =='1') {
            a.architectureType ="居住建筑";
          } else if (a.architectureType =='2') {
            a.architectureType ="公共建筑";
          } else if (a.architectureType =='3') {
            a.architectureType ="公共建筑";
          } else if (a.architectureType =='4') {
            a.architectureType ="农业建筑";
          } else if (a.architectureType =='5') {
            a.architectureType ="其他建筑";
          }
          if (a.drawingType =='1') {
            a.drawingType = "平面图";
          } else if (a.drawingType =='2') {
            a.drawingType = "立面图";
          }
           if (a.industry =='1') {
            a.industry = "农业生产";
          } else if (a.industry == '2') {
            a.industry = "农业加工";
          } else if (a.industry == '3') {
            a.industry = "生产";
          } else if (a.industry == '4') {
            a.industry = "仓储";
          } else if (a.industry == '5') {
            a.industry = "辅助";
          } else if (a.industry == '6') {
            a.industry = "动力";
          } else if (a.industry == '7') {
            a.industry = "商业";
          } else if (a.industry == '8') {
            a.industry = "行政";
          } else if (a.industry == '9') {
            a.industry = "文教";
          } else if (a.industry == '10') {
            a.industry = "科研";
          } else if (a.industry == '11') {
            a.industry = "医疗";
          } else if (a.industry == '12') {
            a.industry = "观览";
          } else if (a.industry == '13') {
            a.industry = "体育";
          } else if (a.industry == '14') {
            a.industry = "交通";
          } else if (a.industry == '15') {
            a.industry = "通信";
          } else if (a.industry == '16') {
            a.industry = "居住";
          } else if (a.industry == '17') {
            a.industry = "商住一体";
          }
        });
      

       }) 
     }) 
     

     
      this.bjtc = false;
    },
    // 添加
    async addRow(event) {
      console.log("添加", this.form);
      var that = this;
      await this.$request.build
        .addAndUpdateArchitecture(this.form).then(res => {
              that.$request.build
              .selectArchitectureByCriteria({
              currentPage: 1,
              pageSize: 10
            })
            .then(res => {
              that.b = res.data.rows;
              that.b.forEach(a => {
                if (a.affiliatedPark == 1026) {
                  a.affiliatedPark = "云栖小镇";
                } else if (a.affiliatedPark == 1106) {
                  a.affiliatedPark = "国际会展中心二期";
                } else if (a.affiliatedPark == 1107) {
                  a.affiliatedPark = "中大产业园";
                } else if (a.affiliatedPark == 1108) {
                  a.affiliatedPark = "润丰产业园";
                } else if (a.affiliatedPark == 1109) {
                  a.affiliatedPark = "鹏辉产业园";
                } else if ((a.affiliatedPark = 1110)) {
                  a.affiliatedPark = "国际会展中心一期";
                }

                if (a.architectureType == 1) {
                  a.architectureType = "居住建筑";
                } else if (a.architectureType == 2) {
                  a.architectureType = "公共建筑";
                } else if (a.architectureType == 3) {
                  a.architectureType = "公共建筑";
                } else if (a.architectureType == 4) {
                  a.architectureType = "农业建筑";
                } else if (a.architectureType == 5) {
                  a.architectureType = "其他建筑";
                }
              });
              that.b.forEach(a=>{
                if(a.isKeyUnit=='1'){
                  a.isKeyUnit='是'
                }else if(a.isKeyUnit=='0'){
                  a.isKeyUnit='否'
                }
              })
              that.b.forEach(a => {
                if (a.drawingType == 1) {
                  a.drawingType = "平面图";
                } else if (a.drawingType == 2) {
                  a.drawingType = "立面图";
                }
              });
              that.b.forEach(a => {
                if (a.industry == 1) {
                  a.industry = "农业生产";
                } else if (a.industry == 2) {
                  a.industry = "农业加工";
                } else if (a.industry == 3) {
                  a.industry = "生产";
                } else if (a.industry == 4) {
                  a.industry = "仓储";
                } else if (a.industry == 5) {
                  a.industry = "辅助";
                } else if (a.industry == 6) {
                  a.industry = "动力";
                } else if (a.industry == 7) {
                  a.industry = "商业";
                } else if (a.industry == 8) {
                  a.industry = "行政";
                } else if (a.industry == 9) {
                  a.industry = "文教";
                } else if (a.industry == 10) {
                  a.industry = "科研";
                } else if (a.industry == 11) {
                  a.industry = "医疗";
                } else if (a.industry == 12) {
                  a.industry = "观览";
                } else if (a.industry == 13) {
                  a.industry = "体育";
                } else if (a.industry == 14) {
                  a.industry = "交通";
                } else if (a.industry == 15) {
                  a.industry = "通信";
                } else if (a.industry == 16) {
                  a.industry = "居住";
                } else if (a.industry == 17) {
                  a.industry = "商住一体";
                }
              });
            });
        });

      (this.form = {
        architectureName: "",
        affiliatedPark: "",
        architectureType: "",
        personLiable: "",
        telephone: "",
        longitude: "",
        id: ""
      }),
        (this.dialogTableVisible = false);
    }
  }
};
</script>