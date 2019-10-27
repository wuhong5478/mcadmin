<template>
  <div class="organizational">

    <el-table
            ref="multipleTable"
            tooltip-effect="dark"
            :data="adminList"
            stripe
            style="width: 100%;padding-left: 10px;padding-top:10px;"
            :header-cell-style="{background:'#FAFAFA'}"
            id="rebateSetTable"
    >
      <el-table-column prop="name" label="机构名称"></el-table-column>
      <el-table-column prop="regionId" label="行政区域"></el-table-column>
      <el-table-column prop="type" label="机构类型">
        <template slot-scope="scope">{{scope.row.type?scope.row.type:'--'}}</template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <span
                  @click="editor(scope.row)" class="amendSpan" size="medium">编辑</span>
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

    <el-dialog title="组织架构" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="机构名称：" :label-width="formLabelWidth">
          <el-input :placeholder="form.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="行政区域：" :label-width="formLabelWidth">
          <el-input :placeholder="form.regionId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="机构类型：" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择机构类型">
            <el-option label="管委会" value="1"></el-option>
            <el-option label="物业公司" value="2"></el-option>
            <el-option label="维保公司" value="3"></el-option>
            <el-option label="空选" value=""></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveData()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "100px",
      zzjg: [
        {
          label: "机构名称",
          prop: "name"
        },
        {
          label: "行政区域",
          prop: "regionId"
        },
        {
          label: "机构类型",
          prop: "type"
        },
        {
          label: "操作",
          slot: "operation"
        }
      ],
      adminList: [],
      form: {},
      a: {},
      type: "",
      table: "",
      total:0,
      currentPage :""
    };
  },
  methods: {
    async check(params = { pageNo: 1, pageSize: 10 }) {
      let res = await this.$request.zzjg.queryInstitutions({pageNo:this.currentPage,
      pageSize:this.pageSize});
      this.total = res.data.totalCount
      this.adminList = res.data.rows;
      for (let i = 0; i < this.adminList.length; i++) {
        if (this.adminList[i].type === "1") {
          this.adminList[i].type = "管委会";
        } else if (this.adminList[i].type === "2") {
          this.adminList[i].type = "物业公司";
        } else if (this.adminList[i].type === "3") {
          this.adminList[i].type = "维保公司";
        }
        if (this.adminList[i].regionId == "1106") {
          this.adminList[i].regionId = "国际会展中心二期";
        } else if (this.adminList[i].regionId == "1107") {
          this.adminList[i].regionId = "中大产业园";
        } else if (this.adminList[i].regionId == "1108") {
          this.adminList[i].regionId = "润丰产业园";
        } else if (this.adminList[i].regionId == "1109") {
          this.adminList[i].regionId = "鹏辉产业园";
        } else if (this.adminList[i].regionId == "1110") {
          this.adminList[i].regionId = "国际会展中心一期";
        } else if (this.adminList[i].regionId == "1026") {
          this.adminList[i].regionId = "云栖小镇";
        }
      }

      console.log(111111, this.adminList);
    },


    editor(scope) {
      this.dialogFormVisible = true;
      this.form = JSON.parse(JSON.stringify(scope));
      if (this.form.type === "1") {
        this.form.type = "管委会";
      } else if (this.form.type === "2") {
        this.form.type = "物业公司";
      } else if (this.form.type === "3") {
        this.form.type = "维保公司";
      }

      if (this.form.regionId == "1106") {
        this.form.regionId = "国际会展中心二期";
      } else if (this.form.regionId == "1107") {
        this.form.regionId = "中大产业园";
      } else if (this.form.regionId == "1108") {
        this.form.regionId = "润丰产业园";
      } else if (this.form.regionId == "1109") {
        this.form.regionId = "润丰产业园";
      } else if (this.form.regionId == "1110") {
        this.form.regionId = "国际会展中心一期";
      } else if (this.form.regionId == "1026") {
        this.form.regionId = "云栖小镇";
      }
      console.log("fffff", this.form);
    },
    async saveData() {
      console.log("bbbb", this.form);
      if (this.form.type === "管委会") {
        this.form.type = 1;
      } else if (this.form.type === "物业公司") {
        this.form.type = 2;
      } else if (this.form.type === "维保公司") {
        this.form.type = 3;
      }
      let abc = {};
      abc.type = this.form.type;
      abc.id = this.form.id;

      // history.go(0)
      await this.$request.zzjg.updataInstitutions(abc);
      await this.check();

      this.dialogFormVisible = false;
    }
  },
  mounted() {
    this.check();
  },
  watch:{
    currentPage(val){
      this.currentPage = val
      console.log(val)
      this.check()
    }
  }
};
</script>
<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}
.el-dialog__title {
  padding-left: 50px !important;
}
.amendSpan {
  color: #0080d0;
  cursor: pointer;
}

</style>