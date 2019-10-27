<template >
  <el-aside
    width="220px"
    :style="{backgroundColor:this.$store.state.color}"
    style="overflow:hidden;overflow-y:auto;height:100%;"
  >
    <div class="logo" :style="{backgroundColor:this.$store.state.color}">
      <!-- <img
        src="../assets/pic/3700be31a3d817247edcff23a8ae6d7.png"
        class="title-bg"
        alt
        srcset
      style="width:80px;height:33px;margin-top:14px;margin-bottom:9.5px;position: absolute;top: 3%;left: 29%;"/>-->
      <!-- <div class="title-text"></div> -->
    </div>
    <!-- :background-color="this.$store.state.color || '#04111d'" -->
    <el-menu
      text-color="#fff"
      active-text-color="#fafafa"
      router
      :background-color="this.$store.state.color || '#04111d'"
      style="padding-left:2px;width:220px;position:relative;top:67px;"
    >
      <el-submenu v-for="(item,index) in Config" :key="index" :index="index+''">
        <template slot="title">
          <img class="icon" :src="imgList[index]" style="width:24px;height:24px;margin-top:-2px;" />
          <span
            class="menu-title"
            style="font-weight:bold;positon:relative;right:-100px"
          >{{item.text}}</span>
        </template>
        <el-menu-item
          v-for="(child,key) in item.children"
          :key="key"
          :index="child.router"
          style="font-size:14px;margin-left:11.5%"
        >{{child.text}}</el-menu-item>
      </el-submenu>
      <!-- <div
        style="cursor:pointer;font-size:14px;font-weight:bold;height:57px;padding-left:10px;color:#fff;margin:10px 0 100px -3px;height:400px;"
        active-text-color="#fafafa"
        @click="clk"
      >菜单管理</div>-->
      <!-- 菜单管理弹窗 -->
      <!-- <el-dialog title="背景颜色" :visible.sync="dialogVisible" width="40%">
        <el-form label-position="right" label-width="90px">
          <el-form-item label="背景颜色:">
            <el-row>
              <el-col :span="2">
                <el-tag style="background-color: #047cdc" @click="setColor('#047cdc')"></el-tag>
              </el-col>
              <el-col :span="2">
                <el-tag style="background-color: #6ed0f0" @click="setColor('#6ed0f0')"></el-tag>
              </el-col>
              <el-col :span="2">
                <el-tag style="background-color: #ff9e91" @click="setColor('#ff9e91')"></el-tag>
              </el-col>
              <el-col :span="2">
                <el-tag style="background-color: #009e91" @click="setColor('#009e91')"></el-tag>
              </el-col>
              <el-col :span="2">
                <el-tag style="background-color: #04111d" @click="setColor('#04111d')"></el-tag>
              </el-col>
              <el-col :span="2">
                <el-tag style="background-color: #ff0000" @click="setColor('#ff0000')"></el-tag>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="selectFont">确定</el-button>
        </div>
      </el-dialog>-->
    </el-menu>
  </el-aside>
</template>
<script>
import router from '../router'
import menuConfig from './menu.json'
export default {
  data() {
    return {
      Config: menuConfig,
      color: '#04111d',
      // dialogVisible: false,
      // color: '#04111d',
      imgList: [
        require('../assets/pic/yuanquyilan.png'),
        require('../assets/pic/shebeiguanli.png'),
        require('../assets/picture/icon_po8igdphsks/jingqingguanli.png'),
        require('../assets/pic/shebeidianya.png'),
        require('../assets/pic/yinhuanguanli.png'),
        require('../assets/pic/xunjianguanli.png'),
        require('../assets/pic/weibaoguanli.png'),
        require('../assets/pic/yinhuanfenxi.png'),
        require('../assets/pic/kaoshiguanli.png'),
        require('../assets/pic/ziyuanguanli.png'),
        require('../assets/picture/icon_po8igdphsks/pingtaiguanli.png'),
        require('../assets/pic/renwuqueren.png'),
        require('../assets/pic/renwuqueren.png')
      ]
    }
  },

  mounted() {
    const res = document.cookie
    function getCookie(name) {
      var strcookie = document.cookie //获取cookie字符串
      var arrcookie = strcookie.split('; ') //分割
      //遍历匹配
      for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split('=')
        if (arr[0] == name) {
          return arr[1]
        }
      }
      return ''
    }
    console.log(1111112312312312111, getCookie('role_id'))
    const roleId = getCookie('role_id')
    this.instance
      .get('/syspermission/getpermissionByroleId', {
        params: {
          roleId: roleId,
          pageNo: 0
        }
      })
      .then(res => {
        let treeArr = this.$utils.getMenuTreeArr(
          res.data.data.rows,
          'id',
          'parentId',
          0
        )
        let menuArr = []
        for (let i = 0; i < treeArr.length; i++) {
          let menuObj = {}
          menuObj.icon = '../assets/picture/icon_po8igdphsks/' + treeArr[i].icon
          menuObj.text = treeArr[i].name
          let childrenArr = []
          for (let j = 0; j < treeArr[i].children.length; j++) {
            let childMenuObj = {}
            childMenuObj.text = treeArr[i].children[j].name
            childMenuObj.router = treeArr[i].children[j].permission
            childrenArr.push(childMenuObj)
          }
          menuObj.children = childrenArr
          menuArr.push(menuObj)
        }
        this.Config = menuArr
      })
  },
  methods: {
    // setColor(value) {
    //   this.color = value
    // },
    // selectFont() {
    //   this.dialogVisible = false
    // },
    // clk() {
    //   this.dialogVisible = true
    //   // alert(123)
    // },
    clkbg(e) {}
  }
}
</script>
<style lang="less" scoped>
.logo {
  position: fixed;
  // z-index: 999;
  display: block;
  height: 71px;
  background: url('../assets/pic/3700be31a3d817247edcff23a8ae6d7.png') center;
  background-size: 40%;
  background-repeat: no-repeat;
  background-color: #04111d;
  width: 219px;
  .title-bg {
    width: 50%;
    height: 40%;
    position: relative;
    top: 32%;
    left: -1%;
  }

  .title-text {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .ch {
      width: 180px;
      height: 29px;
    }

    .en {
      margin-top: 1px;
      width: 218px;
      height: 21px;
    }
  }
}
.icon {
  margin-left: -14%;
  margin-right: 10px;
}
.el-aside {
  text-align: center;
  background-color: #04111d;
}

.menu-title {
  font-size: 14px;
}
.el-menu-item {
  padding-left: 62px !important;
  display: flex;
  flex-direction: row;
  margin-left: 9.5%;
  border-radius: 5px;
}
.el-menu-item.is-active {
  background-color: #117dde !important;
}
.el-aside::-webkit-scrollbar {
  display: none;
}
.el-aside {
}
</style>