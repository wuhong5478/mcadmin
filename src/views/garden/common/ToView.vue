<template>
  <el-dialog
  title="巡查对象"
  :visible.sync="dialog"
  width="80%"
  :before-close="handleClose">
  <div class="equipmentInfo">
    <!-- header -->
    <el-row>
      <el-col :span="24">
        <div style="text-align: right;">
          <span>巡查状态：</span>
          <el-select clearable v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <!-- main -->
    <div class="table">
        <fi-table :colConfigs="tables" :listdata='list'>
            <el-table-column slot="opt" label="照片与描述" width="100px">
                <template>
                    <div class="buttom_c">
                        <!-- <el-button size="mini" @click="handleClick(scope.row)">查看</el-button> -->
                        <el-image 
                          style="width: 20px; height: 20px"
                          :src="srcList[0]" 
                          :preview-src-list="srcList">
                        </el-image>
                    </div>
                </template>
            </el-table-column>
        </fi-table>  
    </div>
    <!-- footer -->
    <div style="text-align: right;">
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total">
        </el-pagination>
    </div>
  </div>
</el-dialog>
</template>
<script>
import config from '../jobConfig.json'
export default {
    props: {
    dialog: Boolean,
    form: Object
  },
  data() {
    return {
        url: '',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
      content:{},
      info:{},
      flag:true,
      total:100,//总数
      currentPage:1,//当前的页数
      value:'',//下拉筛选数据
      list:[],//表格展示数据
      options:[
        {label:'已完成', value:1},
        {label:'未完成', value:2}
      ],
      tables:[
        {prop: 'qrcodeName', label:'对象名称'},
        {prop: 'installAddress', label:'对象位置'},
        {prop: 'status', label:'巡查状态'},
        {prop: 'isTrount', label:'对象状态'},
        {prop: 'trountTime', label:'巡查完成时间'},
        {slot: 'opt', label:'照片与描述'},
      ]
    }
  },
  async mounted() {
  },
  watch: {
    async dialog(val) {
      if(val) {
        let res = await this.$request.garden.queryTaskId({Id:this.form.id})
        this.list = res.data
        for(let i = 0; i < this.list.length; i++) {
          let obj = this.list[i].trountQrcode
          this.list[i] = {...this.list[i],qrcodeName:obj.qrcodeName, installAddress:obj.installAddress}
        }
        this.total = this.list.length
        console.log(this.list,'所有的人员')
      }
    }
  },
  methods: {
    handleClose() {
      this.$parent.dialog = false
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang='less' scoped>
.el-dialog__body {
  border:1px solid #ccc!important;
  padding: 10px 20px !important;
}
.equipmentInfo {
  .frie {
  .title {
    font-size: 20px;
    font-weight: 700;
    padding: 10px 0;
  }
  }
}

.grid-content {
  div:first-child {
    color: #999;
  }
}
.status {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.status-item {
  width: 100%;
  height: 100%;
  .status();
  justify-content: flex-start;
  flex-wrap:wrap;
  .item {
    width: 22.5%;
    padding: 10px;
    border: 1px solid #ccc;
    .content {
      text-align: center;  
      font-size: 20px;
      font-weight: 700;
      padding: 20px 0;
    }
    .item-info {
      text-align: right;
      color: skyblue;
    }
  }
}
</style>