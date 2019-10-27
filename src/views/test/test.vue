<template>
  <div>
      <div class="test">
          大家上帝撒娇的
      </div>
         <el-main>
                <el-table :data="tableData">
                    <el-table-column prop="date" label="日期" width="140">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                </el-table>
            </el-main>
  </div>
</template>
<style lang="less" scoped>
.test{
    width: 100%;
   
    padding: 20px;
    background: #fff;
    margin-top: 10px;
}
</style>
