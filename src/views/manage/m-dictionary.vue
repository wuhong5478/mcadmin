<template>
  <div id="app">
    <el-header style="background:#fff;" height="80px">
    <div style="float: right">
      <el-button type="primary" @click="handleAdd" size="medium"><i class="el-icon-plus el-icon&#45;&#45;right"></i>新增</el-button>
    </div>
  </el-header>
    <el-table
            v-loading="listLoading"
            :data="list"
            style="width: 100%;padding-left: 10px;"
            :header-cell-style="{background:'#FAFAFA'}"
            row-key="id"
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}" stripe
    >
      <el-table-column
              prop="typeName"
              label="类型名称"
      />
      <el-table-column
              prop="typeValue"
              label="类型值"
      />
      <el-table-column
              prop="parentId"
              label="父级id"
      />
      <el-table-column
              prop="status"
              label="状态">
        <template v-slot="{row}">
          <span
                  class="button"
                  ref="button"
                  size="small"
          >{{row.statusName}}</span>
        </template>
      </el-table-column>
      <el-table-column
              prop="remark"
              label="备注"
      />
      <el-table-column
              prop="orderNum"
              label="排序"
      />
      <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
              <span class="amendSpan" @click="handleUpdate(scope.row)">编辑/</span>
              <span class="deleteSpan" @click="handleDelete(scope.row)">删除</span>
          </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
      <el-form
              ref="dataForm"
              :rules="rules"
              :model="temp"
              label-position="right"
              label-width="120px"
      >
          <el-form-item label="父级id" prop="parentId">
            <el-tree-select
                    ref="treeSelect"
                    v-model="temp.parentId"
                    :select-params="selectParams"
                    :tree-params="treeParams"
                    @searchFun="searchFun">
            </el-tree-select>
          </el-form-item>
          <el-form-item label="类型名称" prop="typeName">
              <el-input v-model="temp.typeName" />
          </el-form-item>
          <el-form-item label="类型值" prop="typeValue">
              <el-input v-model="temp.typeValue" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
              <el-select
                      v-model="temp.status"
                      placeholder="状态"
                      clearable
                      class="filter-item"
              >
                  <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
              <el-input v-model="temp.remark" />
          </el-form-item>
          <el-form-item label="排序" prop="orderNum">
              <el-input v-model="temp.orderNum" />
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      listLoading: true,
      list: [],
      statusList: [{label: '在用', value: '0'}, {label: '未用', value: '1'}],
      temp: {
        id: 0,
        typeName: '',
        typeValue: '',
        status: '',
        orderNum: '',
        parentId: '',
        remark: ''
      },
      rules: {
        typeName: [{ required: true, message: '类型名称非空！', trigger: 'change' }],
        typeValue: [{ required: true, message: '类型值非空！', trigger: 'change' }],
        status: [{ required: true, message: '状态非空！', trigger: 'change' }],
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改数据字典',
        add: '新增数据字典'
      },
      selectParams: {
        clearable: true,
        placeholder: '请输入内容'
      },
      treeParams: {
        clickParent: true,
        filterable: true,
        'check-strictly': true,
        'default-expand-all': true,
        'expand-on-click-node': false,
        data: [],
        props: {
          children: 'children',
          label: 'typeName',
          disabled: 'disabled',
          value: 'typeValue'
        }
      }
    }
  },
  created() {
    this.getPager()
  },
  methods: {
    searchFun(value) {
      // 如果是本地过滤：
      this.$refs.treeSelect.$refs.tree.filter(value)
    },
    async getPager() {
        const params = 'pageNo=-1&pageSize=1000'
      this.$request.dictionary.getInfolist(params).then(res => {
        this.list = res.data.rows
        this.list = this.$utils.getTreeArr(this.list,'typeValue','parentId',null)
        this.treeParams.data = this.list
        this.list.forEach(v => {
          v.status === '0' ? (v.statusName = '在用') : (v.statusName = '未用')
        })
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })
    },
    async handleDelete(row) {
      try {
        await this.$confirm('你确定要删除该数据字典吗？', '温馨提示')
        await this.$request.dictionary.deleteInfo(row.id)
        this.$message.success('删除成功')
        this.getPager()
      } catch (e) {
        this.$message.error('取消删除')
      }
    },
    resetTemp() {
      this.temp = {
          id: 0,
          typeName: '',
          typeValue: '',
          status: '',
          orderNum: '',
          parentId: '',
          remark: ''
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    async updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          this.$request.dictionary.updateInfo(tempData).then((res) => {
            if (res.code === 200) {
              this.getPager()
              this.dialogFormVisible = false
              this.$message.success('修改成功')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    async addData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid){
          this.addDanger.post('/sysDictionary/addsysdictionary', this.temp).then((res) => {
            if (res.data.code === 200) {
              this.getPager()
              this.dialogFormVisible = false
              this.$message.success('添加成功')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-header {
    line-height: 60px;
    // height: 100px;
    padding: 20px 20px;
    background: #fff;
}
.el-row {
  margin-top: 10px;
  padding-top: 10px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  float: left;
  border-radius: 4px;
  min-height: 36px;
  margin-right: 10px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
#app {
  margin-top: -10px;
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

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
// .red {
//   background-color: #f56c6c;
//   // font-weight: bold;
//   color: #fff;
// }
// .green {
//   background-color: #67c23a;
//   // font-weight: bold;
//   color: #fff;
// }
/deep/.el-table th > .cell {
  text-align: left;
}
/deep/.el-table .cell {
  text-align: left;
}
.deleteSpan {
  color: #909399;
  cursor: pointer;
}
.amendSpan {
  color: #0080d0;
  cursor: pointer;
}
</style>
