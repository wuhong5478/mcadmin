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
              prop="name"
              label="权限名"
      />
      <el-table-column
              prop="description"
              label="权限描述"
      />
      <el-table-column
              prop="icon"
              label="图标地址"
      />
      <el-table-column
              prop="level"
              label="权限级别">
        <template v-slot="{row}">
          <span
                  class="button"
                  ref="button"
                  size="small"
          >{{row.levelName}}</span>
        </template>
      </el-table-column>
      <el-table-column
              prop="parentId"
              label="父权限id"
      />
        <el-table-column
                prop="actionUrl"
                label="后台请求地址"
        />
      <el-table-column
              prop="permission"
              label="前台请求地址"
      />
      <el-table-column
              prop="type"
              label="权限类型"
      >
          <template v-slot="{row}">
          <span
                  class="button"
                  ref="button"
                  size="small"
          >{{row.typeName}}</span>
          </template>
      </el-table-column>
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
          <el-row>
              <el-col :span="12">
                  <el-form-item label="父权限id" prop="parentId">
                    <el-tree-select
                            ref="treeSelect"
                            v-model="temp.parentId"
                            :select-params="selectParams"
                            :tree-params="treeParams"
                            @searchFun="searchFun">
                    </el-tree-select>
<!--                      <el-input v-model="temp.parentId" ></el-input>-->
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="权限描述" prop="description">
                      <el-input v-model="temp.description" />
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                  <el-form-item label="权限名" prop="name">
                      <el-input v-model="temp.name" />
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="图标地址" prop="icon">
                      <el-input v-model="temp.icon" />
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                  <el-form-item label="权限级别" prop="level">
                      <el-select
                              v-model="temp.level"
                              placeholder="权限级别"
                              clearable
                              class="filter-item"
                      >
                          <el-option v-for="item in levelList" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="权限类型" prop="type">
                      <el-select
                              v-model="temp.type"
                              placeholder="权限类型"
                              clearable
                              class="filter-item"
                      >
                          <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                  <el-form-item label="后台请求地址" prop="actionUrl">
                      <el-input v-model="temp.actionUrl" />
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="前台请求地址" prop="permission">
                      <el-input v-model="temp.permission" />
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                  <el-form-item label="排序" prop="orderNum">
                      <el-input v-model="temp.orderNum" />
                  </el-form-item>
              </el-col>
          </el-row>
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
      levelList: [{label: '顶层', value: 1}, {label: '二级', value: 2}],
      typeList: [{label: '菜单', value: '0'}, {label: '按钮', value: '1'}],
      temp: {
        actionUrl: '',
        description: '',
        icon: '',
        level: '',
        name: '',
        orderNum: '',
        parentId: '',
        permission: '',
        type: ''
      },
      rules: {
        actionUrl: [{ required: true, message: '后台请求地址非空！', trigger: 'change' }],
        level: [{ required: true, message: '权限级别非空！', trigger: 'change' }],
        name: [{ required: true, message: '权限名非空！', trigger: 'change' }],
        type: [{ required: true, message: '权限类型非空！', trigger: 'change' }]
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改权限',
        add: '新增权限'
      },
      selectParams: {
        clearable: true,
        placeholder: '默认为顶级'
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
          label: 'name',
          disabled: 'disabled',
          value: 'id'
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
        const params = 'pageNo=0&pageSize=1000'
      this.$request.permission.getInfolist(params).then(res => {
          this.list = res.data.rows
        this.list.forEach(v => {
          v.level === 1 ? (v.levelName = '顶层') : (v.levelName = '二级')
          v.type === '0' ? (v.typeName = '菜单') : (v.typeName = '按钮')
        })
          this.list = this.$utils.getTreeArr(this.list,'id','parentId',null)
          this.treeParams.data = this.list
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })
    },
    async handleDelete(row) {
      try {
        await this.$confirm('你确定要删除该权限吗？', '温馨提示')
        await this.$request.permission.deleteInfo(row.id)
        this.$message.success('删除成功')
        this.getPager()
      } catch (e) {
        this.$message.error('取消删除')
      }
    },
    resetTemp() {
      this.temp = {}
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
        if (this.temp.parentId===0)
            this.temp.parentId=null
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    async updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
            if (this.temp.parentId===''||this.temp.parentId===null)
                this.temp.parentId=0
          if (this.temp.orderNum==null)
              this.temp.orderNum=0
          this.addDanger.post('/syspermission/updatepermission?actionUrl='+this.temp.actionUrl+'&description='+this.temp.description+'&icon='+this.temp.icon+'&id='+this.temp.id+'&level='+this.temp.level+'&name='+this.temp.name+'&orderNum='+this.temp.orderNum+'&parentId='+this.temp.parentId+'&permission='+this.temp.permission+'&type='+this.temp.type).then((res) => {
            if (res.data.code === 200) {
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
            if (this.temp.parentId===''||this.temp.parentId===null)
                this.temp.parentId=0
          this.$request.permission.addInfo(this.temp).then((res) => {
            if (res.code === 200) {
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
