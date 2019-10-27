<template>
<div class="mainBox">
      <template>
      <el-select size = 'medium' v-model="currrentValue" placeholder="请选择物资类型"  style="width:15%;margin:20px 20px 0 20px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </template>
      
      <template >
      <el-date-picker
        size = 'medium'
        v-model="dateValue"
        type="date"
        placeholder="使用周期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        style=" width:15%;">
      </el-date-picker>
      </template>

      <template>
        <el-input size = 'medium' v-model.lazy="addressValue"
        
          placeholder="物资位置搜索" style="width:15%;margin:0 20px 0 20px"></el-input>
      </template>
      
      <template>
        <el-input size = 'medium' v-model.lazy="nameValue"
        
         placeholder="物资名称搜索" style="width:15%;margin-right:20px;"></el-input>
      </template>

      <template>
        <el-button size = 'medium' type="primary" @click="searchz">搜索</el-button>
        <el-button size = 'medium' type="primary" @click="addWuZi">新增</el-button>
      </template>
 
  <!-- <el-row class="headerBox" type="flex" justify="end">
    </el-col>

  </el-row> -->

  <!-- table表格 -->
<el-row>
  <el-col :span="24">
    <div class="form-box">
      <fi-table :colConfigs="yjwz" :listdata ='emergencyList'>
        <el-table-column slot="opt" label="操作" width="150">
        <template slot-scope="scope">
            <span
              size="mini"
              style="color:#0080d0;cursor: pointer;"
              @click="changePerson('edit', scope.row)">编辑</span><span style="cursor:pointer">/</span>
            <span
              size="mini"
              type="danger"
              style="color:#909399;cursor: pointer;"
              @click="handleDelete(scope.$index, scope.row)">删除</span>
        </template>
        </el-table-column>
      </fi-table>
    </div>  
  </el-col>
</el-row>
</div>
</template>
<script>
  import config from './config.json'
  export default {
    data() {
      return {
        arr:[
        {prop:'chargePerson',label:'负责人'},
        {prop:'contactTelephone',label:'联系电话'},
        {prop:'longitude',label:'经度'},
        {prop:'latitude',label:'纬度'},
        {prop:'productionDate',label:'生产日期', picker:true},
        {prop:'resourcesAddress',label:'资源位置'},
        {prop:'resourcesName',label:'资源名称'},
        {prop:'resourcesNumber',label:'资源数量'},
        {prop:'resourcesType',label:'资源类型',select:[
          {value: 1,label: '防护用品'}, 
          {value: 2,label: '生命支持'}, 
          {value: 3,label: '救援运载'}, 
          {value: 4,label: '工程设备'},
          {value: 5,label: '器材工具'},
          {value: 6,label: '其它'}
          ]
        },
        {prop:'useCycle',label:'使用周期', picker:true},
        ],
        options: [{
          value: 1,
          label: '防护用品'
        }, {
          value: 2,
          label: '生命支持'
        }, {
          value: 3,
          label: '救援运载'
        }, {
          value: 4,
          label: '工程设备'
        }, {
          value: 5,
          label: '器材工具'
        },{
          value: 6,
          label: '其它'
        }],
        emergencyList:[
          {resourcesName:'qwe',resourcesType:'sdf',resourcesNumber:112,resourcesAddress:'wiojia',longitudeLatitude:'sdf',productionDate:'1997',useCycle:'1662',chargePerson:'蔡徐坤',contactTelephone:13555555555}
        ],
        yjwz:config.yjwz, //table表格
        currrentValue:'',
        dateValue:'',
        addressValue:'',
        nameValue:""
      }
    },
    mounted() {
      this.queryAllEmergency()
    },
    watch: {
      async currrentValue(val) { //物资搜索
        console.log(val,'物资类型ID')
        if(!val) return
        let res = await this.queryAllEmergency()
     },
      async dateValue(val) { //使用周期
        console.log(val,'使用周期')
        if(!val) return
        let res = await this.queryAllEmergency()
      },
      async addressValue(val) { //物资地址搜索
        // console.log(val,'物资地址内容')
        // function aa() {
        //   console.log(1234567)
        // }
        
        // this.bounce(aa, 1000)
        // let res = await this.queryAllEmergency(
        //   {resourcesType:this.currrentValue,productionDate:val}
        // )
      }
    },
    methods: {
      searchz(){
          this.$request.yjwz.queryEmergencyInfo({ resourcesType:this.currrentValue,
            productionDate:this.dateValue,
            resourcesAddress:this.addressValue,
            resourcesName:this.nameValue,
            pageNo:1,
            pageSize:10}).then(res=>{
              this.emergencyList = res.data.rows
            })
      },
      async queryAllEmergency(params) {
        let obj = {
            resourcesType:this.currrentValue,
            productionDate:this.dateValue,
            resourcesAddress:this.addressValue,
            resourcesName:this.nameValue,
            pageNo:1,
            pageSize:10
          }
        let res = await this.$request.yjwz.queryEmergencyInfo(obj)
        if(res.data){
          this.emergencyList = res.data.rows
          this.emergencyList.forEach(item=>{
            for(let i = 0; i < this.options.length; i++){
              this.options[i].value === Number(item.resourcesType)?item.resourcesType = this.options[i].label:''
            }
            item.productionDate = new Date(item.productionDate).Format("yyyy-MM-dd")
            item.useCycle = new Date(item.useCycle).Format("yyyy-MM-dd")
          })
        }else{
          this.emergencyList = []
        }
        console.log(res.data,'所有物资')
      },
      async show() { //物资地址
        console.log(this.addressValue)
        await this.queryAllEmergency()
      },
      async showTwo() { //物资名称
        console.log(this.nameValue)
        await this.queryAllEmergency()
      },
      bounce(fn, wait) {
          var timeout = null;
          return function() {
              if (timeout !== null)
                  clearTimeout(timeout);
                  debugger
              timeout = setTimeout(fn, wait);
          }
      },
      changePerson(index, item) {
        console.log(index, item,'这是编辑')
        let newItem = JSON.parse(JSON.stringify(item))
        this.dialog = {
        show: true, 
        title: "编辑物资",
        option: "edit",
        fun:async (form)=> { //编辑
            console.log(form,'回调')
            await this.$request.yjwz.addEmergencySupplies(form)
            this.queryAllEmergency()
        }
        },
        this.$popup(this.dialog, this.arr, newItem)

      },
      async handleDelete(index, item) {
        console.log(item.id,'删除物资信息ID')
        // 根据ID删除物资信息
        let flag = await this.$utils.openShow()                
        if(flag) {
            //删除物资信息
            await this.$request.yjwz.deleteEmergency({id:item.id})
            // 查询物资信息
            this.queryAllEmergency()
        }
      },
      addWuZi() {
        console.log('这是增加')
        this.dialog = {
        show: true, 
        title: "新增物资",
        option: "add",
        fun:async (form)=> { //新增
            console.log(form,'回调')
            await this.$request.yjwz.addEmergencySupplies(form)
            this.queryAllEmergency()
        }
        },
        this.$popup(this.dialog, this.arr)
      }
    }
  }
</script>
<style lang="less" scoped>
.mainBox {
  background-color: #fff;
  .headerBox{
    .grid-content {
      margin-right: 20px;
    }
    .changesize{
      width: 20px;
    }
  }
}
.width1 {
  width: 180px;
  margin-right: 10px;
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
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
#app{
  margin-top:-10px;
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
 
</style>