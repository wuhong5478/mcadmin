<template>
  <div class="box">
    <!-- <toview :dialog="dialog" :form="form"></toview> -->
    <div class="box-header">
      <template>

        建筑名称:
        <el-input size="medium" class="box-header-sel"  @change="searchInfo" clearable v-model="listQuery.architectureName" placeholder="请输入建筑名称" suffix-icon="el-icon-search"></el-input>
      </template>
    <template>
        所属园区:
        <el-select
          size="medium"
          @change="searchInfo"
          class="box-header-sel"
          clearable
          v-model="listQuery.areaId"
          placeholder="请选择"
        >
          <el-option v-for="item in area" :key="item.areaId" :label="item.areaName" :value="item.areaId"/>
        </el-select>
      </template>
      <template>
        评估类型:
        <el-select
                size="medium"
                @change="searchInfo"
                class="box-header-sel"
                v-model="listQuery.type"
                placeholder="请选择"
        >
          <el-option v-for="item in typeEnums" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </template>
      <template>
        评估结果:
        <el-select
                size="medium"
                @change="searchInfo"
                class="box-header-sel"
                clearable
                v-model="listQuery.scoreRange"
                placeholder="请选择"
        >
          <el-option v-for="item in scoreEnums" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </template>
      <template>

        <el-button size="medium" class="box-header-btn" @click="searchInfo" type="primary">查询</el-button>
      </template>
    </div>
    <div class="box-main">
      <!-- 数据表格 -->
      <template>
        <el-table
          :header-cell-style="{background:'#FAFAFA'}"
          :data="tableData"
          style="width: 100%"
          stripe
        >
          <el-table-column prop="architectureName" label="建筑名称"></el-table-column>
          <el-table-column prop="areaName" label="所属园区"></el-table-column>
          <el-table-column prop="type" label="评估类型"></el-table-column>
          <el-table-column prop="updateTime" label="生成时间" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="quaTime" label="评估时间" ></el-table-column>
          <el-table-column prop="score" label="评估结果" ></el-table-column>
          <el-table-column label="操作">
            <template v-slot="{row}">
              <span class="amendSpan" @click="exportData(row)">导出 / </span>
              <span class="amendSpan" @click="viewData(row)">查看</span>
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
      </template>


    </div>
  </div>
</template>
<script>
import { setTimeout } from 'timers'
import moment from 'moment';
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: {
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }
      },
      getRowKeys(row) {
        return row.id
      },
        area:[],
        tableData:[],
        listQuery: {
            page: 1,
            limit: 10,
            architectureName: undefined,
            areaName: undefined,
            areaId: undefined,
            type: '1',
            scoreRange: undefined,
        },
      // 数据表格
      typeEnums: [
        { label: '月度', value: '1' },
        { label: '季度', value: '2' },
        { label: '年度', value: '3' }
      ],
      scoreEnums: [
        { label: '1-59', value: '1' },
        { label: '60-79', value: '2' },
        { label: '80-100', value: '3' }
      ],
      pageNo: 1,
      pageSize: 10,
      total: 0, // 巡检任务配置
      currentPage: 1, // 进入页面的
    }
  },
  created() {
    // 调用getCookie获取到机构id
    this.deptId = this.getCookie('dept_id')
    // console.log(this.deptId)
    this.getAllInfo()
    this.getArea()
  },
  mounted() {},
  methods: {
    // 进入页面获取所有的园区
    async getArea() {
      const res = await this.$request.map.getAllArea()
      // console.log(res)
      this.area = res.data
    },
    // 进入页面获取到用户带过来的deptid
    getCookie(cookieName) {
      var strCookie = document.cookie
      var arrCookie = strCookie.split('; ')
      for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split('=')
        if (cookieName == arr[0]) {
          return arr[1]
        }
      }
      return ''
    },
      //时间格式化  
      dateFormat:function(row, column) {
          var date = row[column.property];
          if (date == undefined) {
              return "";
          }
          return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
    // 进入页面渲染所有的巡检任务配置
      async getAllInfo() {
        const res = await this.$request.acScore.getList(this.listQuery);
          if (res.data.data === null) {
            this.tableData = []
            this.total = 0
            return
          }
          this.tableData = res.data.list
          this.total = res.data.total
    },

    // 点击编辑框巡查对象实现回显
    changePage() {
      const res = this.echoArr
      if (res) {
        let rows = []
        this.tableData4.forEach(v => {
          // console.log()
          this.echoArr.forEach(i => {
            // console.log(v.id, i.id)
            if (v.id === i.id) {
              rows.push(v)
            }
          })
        })
        console.log('id相同的', rows)
        // this.toggleSelection(rows)
        this.toggleSelection(rows)
      }
    },

    // 点击搜索实现筛选功能
    async searchInfo() {
        this.listQuery.page=1;
        this.getAllInfo()
    },
    // 分页的功能 进入页面
    async currentChange(currentPage) {
      this.listQuery.page = currentPage;
      console.log(this.obj)
      await this.getAllInfo()
    },

  }
}
</script>
<style lang="less" scoped>
.box {
  background-color: #fff;
}
.box-header {
  overflow: hidden;
  padding: 20px 10px;
  height: 20px;
  font-size: 14px;
  color: #606266;
  .add {
    float: right;
  }
}
.deleteSpan {
  color: #909399;
  cursor: pointer;
}
.form {
  overflow: hidden;
  border-bottom: 1px solid #ccc;
}
.elform {
  width: 50%;
  float: left;
}
.addInput {
  width: 20%;
  margin-bottom: 20px;
}
.chengeP {
  margin-top: 20px;
}
.roleInput {
  width: 20%;
  float: right;
}
.role {
  overflow: hidden;
}
.roleRight {
  float: right;
  margin-right: 10px;
}
.chaxun {
  color: #409eff;
  cursor: pointer;
}
.amendSpan {
  cursor: pointer;
  color: #409eff;
}
/deep/.el-table th > .cell {
  text-align: left;
}
/deep/.el-table .cell {
  text-align: left;
}
.box-header-sel {
  width: 12%;
  margin-right: 10px;
}
.box-header-inp {
  width: 15%;
  margin-left: 10px;
}
.star {
  color: #f56c6c;
}
.box-header-btn {
  margin-left: 10px;
}
</style>