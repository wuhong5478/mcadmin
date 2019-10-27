<template>
  <div id="app">

    <el-container>
      <el-header style="height:80px;">
        <el-form :inline="true">
          <el-form-item label="角色名称:" style="line-height: 40px;">
            <el-input v-model="name" placeholder="请输入" @change='handleFilter' suffix-icon="el-icon-search" style="width:150%" size="medium">
            </el-input>
          </el-form-item>
          <div style="padding-right: 20px;float: right;line-height: 40px;">
            <el-button type="primary" @click="handleAdd" size="medium"><i class="el-icon-plus el-icon&#45;&#45;right"></i>新增</el-button>
          </div>
        </el-form>
      </el-header>
    </el-container>

    <el-table
      :data="tableData"
      stripe
      style="width: 100%;padding-left: 10px;"
      :header-cell-style="{background:'#FAFAFA'}"
      id="out-table"
    >
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="permissionids" label="权限" width="150">
        <template slot-scope="scope">
          <span
            @click="handleAssign(scope.row)" style="color:#0080d0; text-decoration: underline;line-height:23px;">权限</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" :formatter="dateFormat" />
      <el-table-column prop="updateBy" label="创建人" >
        <template slot-scope="scope">{{scope.row.updateBy?scope.row.updateBy:'--'}}</template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <span
            @click="handleUpdate(scope.row)" class="amendSpan">编辑 /</span>
          <span
            @click="handleDelete(scope.row)" class="deleteSpan">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
      <div style="height:300px;overflow:auto;">
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="temp"
          label-position="right"
          label-width="100px"
          style="width: 90%; margin-left:10%;"
        >
          <el-form-item label="角色编码" label-width="120px" prop="code">
            <el-input v-model="temp.code" />
          </el-form-item>
          <el-form-item label="角色名" label-width="120px" prop="name">
            <el-input v-model="temp.name" />
          </el-form-item>
          <el-form-item label="角色描述" label-width="120px" prop="description">
            <el-input v-model="temp.description" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='add'?addData():updateData()">
          提交
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配权限" :visible.sync="dialogModuleVisible" width="30%">
      <el-tree
        ref="moduleTree"
        :data="moduleTreeData"
        show-checkbox
        node-key="id"
        check-strictly="true"
        :props="defaultTreeProps"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModuleVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="addRolePermission">
          提交
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
      name: '',
      createBy: '',
      tableData: null,
      tempObj:{},
      temp: {
        code: '',
        description: '',
        name : '',
        parentId: '',
      },
      page: {
        pageNo: 1,
        pageSize: 10,
        name: undefined,
        parentId: 0,
      },
      rules: {
        name: [{ required: true, message: '角色名称非空！', trigger: 'change' }]
      },
      dialogModuleVisible: false,
      dialogFormVisible: false,
      dialogVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改角色',
        add: '新增角色'
      },
      moduleTreeData: [],
      defaultTreeProps: {
        children: 'children',
        label: 'name',
        'check-strictly': true
      },
      // 创建人
      userOptions: [{ value: 'admin', label: 'admin' },{value:'root',label:'root'}],
      // 点击未处理对话框显示的文本
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 处理内容说明绑定的值
      textarea: ''
    }
  },
  created() {
    this.getPager();
    this.getTreeData()
  },
  methods: {
    handleFilter() {
      this.getPager()
    },
    getPager() {
      this.listLoading = true;
      this.instance
        .get('/sysrole/getrolelist', {
          params: {
            pageNo: this.currentPage,
            pageSize: this.pageSize,
            name: this.name,
            parentId: ''
          }
        })
        .then(res => {
        this.tableData = res.data.data.rows;
        this.total = res.data.data.totalCount;
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })
    },
    getTreeData() {
      const params = 'pageNo=-1&pageSize=1000';
      this.$request.permission.getInfolist(params).then(res => {
        this.list = res.data.rows;
        let treeArr = [];
        treeArr = this.$utils.getTreeArr(this.list,'id','parentId',null);
        this.moduleTreeData = treeArr;
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })

    },
    dateFormat(row, column) {
      const date = row[column.property];
      if (date == null || date === '') {
        return ''
      }
      return date.substring(0, 11)
    },
    resetTemp() {
      this.temp = {}
    },
    handleAdd() {
      this.resetTemp();
      this.dialogStatus = 'add';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row);// copy obj
      this.dialogStatus = 'update';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleAssign(row) {
      this.temp = Object.assign({}, row); // copy obj
      const roleId = this.temp.id
      let idArr = [];
      this.instance
        .get('/sysrole/getrolebyid', {
          params: {
            id: roleId
          }
        }).then(res => {
        this.dialogModuleVisible = true;
        if(res.data.data.permissionid!=''&& res.data.data.permissionid!= null){
        idArr = res.data.data.permissionid.split(',');
        this.$nextTick(() => {
          this.$refs['moduleTree'].setCheckedKeys(idArr, false)
        });
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
        }
      })
    },
    addRolePermission() {
      const roleId = this.temp.id;
      const treeNodes = this.$refs['moduleTree'].getCheckedNodes(true);
      let allKey = [];
      treeNodes.forEach(item => {
        allKey.push(item.id);
        allKey.push(item.parentId)
      });

      let idStr = '';
      for (let i = 0; i < allKey.length; i++) {
        idStr += '=' + allKey[i] + '&permissionids'
      }
      let newStr1 = idStr.substr(0,idStr.length-14);

      this.instance
        .get('/sysrole/addrolepermission?permissionids'+newStr1+ '&role_id='+roleId)
        .then((res) => {
        if (res.data.code === 200) {
          this.dialogModuleVisible = false;
          this.getPager();
          this.$message.success('添加成功')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    addData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.parentId = 0;
          const tempData = Object.assign({}, this.temp);
          this.$request.role.addRole(tempData).then( res=> {
            if (res.code === 200) {
              this.getPager();
              this.dialogFormVisible = false;
              this.$message.success(res.msg)
            } else {
              this.dialogFormVisible = false;
              this.$message.error('新增失败！')
            }
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          this.addDanger.post('/sysrole/updatesysrole?code='+tempData.code+'&description='+tempData.description+'&id='+tempData.id+'&name='+tempData.name+'&parentId='+tempData.parentId).then((res) => {
            if (res.data.code === 200) {
              this.getPager();
              this.dialogFormVisible = false;
              this.$message.success(res.data.msg)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    async handleDelete(row) {
      try {
        await this.$confirm('你确定要删除该角色吗？', '温馨提示');
        await this.$request.role.deleteRole({id:row.id});
        this.$message.success('删除成功');
        this.getPager()
      } catch (e) {
        this.$message.error('取消失败')
      }
    },
    async getAllInfo() {
      this.instance
        .get('/sysrole/getrolelist', {
          params: {
            pageNo: this.currentPage,
            pageSize: this.pageSize,
            name: this.name,
            parentId: ''
          }
        })
        .then(res => {
          this.tableData = res.data.data.rows;
          this.total = res.data.data.totalCount
        })
    },
    // 分页的功能
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.getPager()
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
  .deleteSpan {
    color: #909399;
    cursor: pointer;
  }
  .amendSpan {
    color: #0080d0;
    cursor: pointer;
  }
  .box1{
    p{
      font-size: 16px;
      font-weight: 600;
    }
  }
  .box2{
    p{
      font-size: 16px;
      font-weight: 600;
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
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  span {
    font-size: 14px;
    cursor: pointer;
    user-select: none;
  }
  .showRed {
    color: red;
    font-weight: bold;
    font-size: 14px;
  }
  /deep/.el-table th > .cell {
    text-align: left;
  }
  /deep/.el-table .cell {
    text-align: left;
  }
  /deep/.el-input {
    width: 60%;
  }
  .changeSge {
    width: 70%;
    float: right;
  }
  .evengthing {
    font-size: 16px;
    color: #ff8c00;
    font-weight: bold;
  }
  .picture {
    margin-top: 20px;
    margin-bottom: 5px;
  }
  .allChange {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
