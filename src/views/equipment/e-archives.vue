<template>
  <div class="box">
    <toview :dialog="dialog" :form="form"></toview>
    <div class="box-search">
      <!-- <el-autocomplete v-model="search" placeholder="请输入内容" suffix-icon="el-icon-search" @select="handleSelect">
      </el-autocomplete>-->
      <el-input v-model="search" size="small" placeholder="输入关键字搜索" />
      <ul class="search-result">
        <li
          class="result-child"
          v-for="(item,index) in listdata.filter(data => !search || data.productName.toLowerCase().includes(search.toLowerCase()))"
          :key="index"
          :class="active == index?'result-child-click':'result-Unclcik'"
          :style="item.productName==='全部'?'':''"
          @click="changeArchives(index, item)"
        >
          <h3>{{item.productName}}</h3>
          <div class="result-foot">
            <h5>在线 {{item.normal}}</h5>
            <div class="line"></div>
            <h5>全部 {{item.total}}</h5>
          </div>
        </li>
      </ul>
    </div>
    <div class="box-table">
      <div class="table-header">
        <el-select v-model="value" class="searchArea" placeholder="请选择园区" size="small">
          <el-option
            v-for="item in allPark"
            :key="item.status"
            :label="item.line"
            :value="item.status"
          ></el-option>
        </el-select>
        <el-select v-model="status" class="searchArea" placeholder="请选择设备状态" size="small">
          <el-option
            v-for="item in allStatus"
            :key="item.status"
            :label="item.line"
            :value="item.status"
          ></el-option>
        </el-select>
        <el-input v-model="deviceKey" class="deviceKey" placeholder="请输入设备编号" size="small"></el-input>
        <el-input v-model="address" class="deviceKey" placeholder="请输入设备位置" size="small"></el-input>
        <el-button @click="queryID" type="primary" size="small">查询</el-button>
      </div>
      <div class="table">
        <fi-table :colConfigs="config.tableConfig" :listdata="list">
          <el-table-column slot="opt" label="操作" width="100px">
            <template slot-scope="scope">
              <div class="buttom_c">
                <el-button size="mini" @click="handleClick(scope.row)">查看</el-button>
              </div>
            </template>
          </el-table-column>
        </fi-table>
      </div>
      <!-- 分页 -->
      <div style="text-align: right;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import tableConfig from './config.json'
import toview from './common/ToView'
const list = []
export default {
  components: {
    toview
  },
  data() {
    return {
      form: {}, //组件接受的数据
      dialog: false, //查看组件的显示隐藏
      active: 0,
      // 设备档案全部数据
      listdata: [],
      list: [],
      total: 100, //总数
      currentPage: 1, //当前的页数
      // 搜索框状态
      search: '',
      config: tableConfig,
      state: '',
      value: '', //选中的园区
      status: '', //设备状态
      deviceKey: '', //id查询
      address: '', // 位置查询
      allStatus: [
        { line: '全部', status: '' },
        { line: '在线', status: 1 },
        { line: '离线', status: 0 },
        { line: '未激活', status: 3 }
      ],
      allPark: [
        { line: '全部', status: '' },
        { line: '中大产业园', status: '中大产业园' },
        { line: '鹏辉产业园', status: '鹏辉产业园' },
        { line: '润丰产业园', status: '润丰产业园' },
        { line: '国际会展中心一期', status: '国际会展中心一期' },
        { line: '国际会展中心二期', status: '国际会展中心二期' }
      ]
      // allPark:[
      //     {lable:'全部', value:'全部'},
      //     {lable:'中大产业园', value:'中大产业园'},
      //     {lable:'润丰产业园', value:'鹏辉产业园'},
      //     {lable:'润丰产业园', value:'润丰产业园'},
      //     {lable:'国际会展中心一期', value:'国际会展中心一期'},
      //     {lable:'国际会展中心二期', value:'国际会展中心二期'}
      //     ] //所有园区
    }
  },
  async mounted() {
    await this.queryDeviceInfo()
    this.changeArchives(0, { productName: this.listdata[0].productName })
  },
  watch: {
    async value(val) {
      // console.log(val)
      // if(val==='') return
      let res = await this.changeArchives(this.active, {
        deviceName: this.deviceKey,
        productName: this.listdata[this.active].productName,
        districtName: val,
        status: this.status
      })

      this.form.deviceName = this.deviceKey
      // console.log(res, '园区返回')
    },
    async status(val) {
      // console.log(val)
      // if(val==='') return
      let res = await this.changeArchives(this.active, {
        deviceName: this.deviceKey,
        productName: this.listdata[this.active].productName,
        status: val,
        districtName: this.value
      })
      // console.log(res, '状态返回')
    },
    async deviceKey(val) {
      // console.log(val)
    }
  },
  methods: {
    async DownloadQcodeUrl() {
      try {
        let res = await this.$request.deviceInfo.insertMaintenanceTrountQrcode()
        res = res.data
        let obj = { total: 0, normal: 0, productName: '所有状态' }
        obj.normal = res.normal
        obj.total = res.total
      } catch {
        alert(obj.normal)
      }
    },
    async queryDeviceInfo() {
      // 查询设备数据
      try {
        let res = await this.$request.deviceInfo.queryDeviceInfo()
        res = res.data
        // console.log(res.total)
        // 统计总数
        let obj = { total: 0, normal: 0, productName: '全部' }
        obj.normal = res.normal
        obj.total = res.total
        this.listdata = res.deviceCategoryDTOList
        // console.log(this.listdata)
        this.listdata.unshift(obj)
        this.listdata.forEach((item, index) => {
          this.listdata[index].type = 0
        })
      } catch (e) {
        console.log(e)
      }
    },

    // 改变地址
    async changeAddress(address, options) {
      if (address == '') {
        this.tableData = null
      } else if ((address.message = 200)) {
        this.tableData = address.message
      }
    },

    async changeArchives(type, item) {
      if (this.active !== type) {
        this.currentPage = 1
        this.value = ''
        this.status = ''
        this.deviceKey = ''
        this.address = ''
      } //每次分页归零
      this.active = type
      // console.log('这是item', item)
      let newItem = item
      // 查询设备详细列表
      // console.log('是不是你啊', newItem)
      if (newItem.productName === '全部') newItem.productName = null
      let res = await this.$request.deviceInfo.queryListInfo(newItem)
      this.total = res.total
      // console.log(res.list)
      res.list.forEach((item, index) => {
        if (res.list[index].status === 0) {
          res.list[index].status = '离线'
        } else if (res.list[index].status === 1) {
          res.list[index].status = '在线'
        } else {
          res.list[index].status = '未激活'
        }
      })
      this.list = res.list
      // console.log(this.list)
    },
    // 查看方法
    handleClick(item) {
      // console.log(111111, item)
      this.form = item
      this.dialog = true
    },
    async queryID() {
      //根据id查询设备
      // console.log(this.deviceKey)
      // if(!this.deviceKey) return
      let res = await this.changeArchives(this.active, {
        deviceName: this.deviceKey,
        productName: this.listdata[this.active].productName,
        status: this.status,
        districtName: this.value,
        address: this.address
      })
      this.form.deviceName = this.deviceName
      // console.log(48979416531646, this.form)
    },
    async handleSelect() {
      let res = await this.changeArchives(this.active, {
        deviceKey: this.deviceKey
      })
      // console.log(res, '状态返回')
    },
    // 分页方法
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`, this.active)
      if (!this.list[0].productName || !this.list[0].productName === '全部')
        return

      let productName = this.list[0].productName
      if (this.active == 0) {
        productName = '全部'
      }
      this.changeArchives(this.active, {
        deviceName: this.deviceKey,
        productName: productName,
        status: this.status,
        districtName: this.value,
        address: this.address,
        pageIndex: val
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  background: #fff;
  display: flex;
  padding: 20px 0;
  margin-top: -10px;
  .box-search {
    padding: 0 20px;
    border-right: 1px solid rgba(242, 242, 242, 0.9);

    .el-autocomplete {
      width: 100%;
    }

    .search-result {
      margin-top: 20px;
      height: 700px;
      overflow: auto;
      padding-inline-start: 0px;

      .result-child {
        width: 260px;
        font-size: 14px;
        padding: 20px;
        color: #585858;
        list-style-type: none;
        cursor: pointer;

        .result-foot {
          display: flex;
          flex-direction: row;
          align-items: center;

          .line {
            width: 1px;
            height: 15px;
            border-right: 1px solid rgba(232, 232, 232, 0.9);
            margin-right: 20px;
          }
        }
      }

      .result-child-click {
        background: #347dd6;
        color: #fff;

        h5 {
          margin-right: 20px;
          color: #fff;
        }
      }

      .result-Unclcik {
        h5 {
          color: #b5b5b5;
          margin-right: 20px;
        }
      }
    }
  }

  .box-table {
    width: 0;
    padding: 0 20px;
    flex: 1;
    .table-header {
      display: flex;
    }

    .table-header * {
      margin-right: 10px;
      display: inline;
    }
  }
}
.deviceKey {
  width: 20%;
}
.searchArea {
  width: 22%;
}
</style>