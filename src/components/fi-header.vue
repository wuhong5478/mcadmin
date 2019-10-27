<template>
  <div>
    <div class="header-box" style="height:60px">
      <img
        class="title"
        src="../assets/picture/icon_po8igdphsks/welcome.png"
        alt
        srcset
        style="width:335px;height:24px"
      />
      <div class="admin">
        <span
          style="font-size:14px;font-family:Microsoft YaHei;font-weight:400;color:#999999;line-height:38px"
        >{{name}}</span>
        <el-dropdown>
          <i class="el-icon-arrow-down" style="margin-left: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>系统设置</el-dropdown-item> -->
            <el-dropdown-item @click.native="downLoad">使用帮助</el-dropdown-item>
            <!-- <el-dropdown-item @click.native="showFont">修改字体</el-dropdown-item> -->
            <el-dropdown-item @click.native="showColor">个性设置</el-dropdown-item>
            <el-dropdown-item @click.native="clk">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 修改字体的对话框 -->
    <el-dialog title="修改字体" :visible.sync="dialogVisible" width="40%">
      <el-form label-position="right" label-width="90px">
        <el-form-item label="字体颜色:">
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
              <el-tag style="background-color: #000000" @click="setColor('#000000')"></el-tag>
            </el-col>
            <el-col :span="2">
              <el-tag style="background-color: #ff0000" @click="setColor('#ff0000')"></el-tag>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="选择字体:">
          <el-checkbox-group v-model="fontFamily" :min="0" :max="1">
            <el-checkbox label="平方" value="平方"></el-checkbox>
            <el-checkbox label="思源" value="思源"></el-checkbox>
            <el-checkbox label="微软雅黑" value="微软雅黑"></el-checkbox>
            <el-checkbox label="黑体" value="黑体"></el-checkbox>
            <el-checkbox label="华文楷体" value="华文楷体"></el-checkbox>
            <el-checkbox label="宋体" value="宋体"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="selectFont">确定</el-button>
      </div>
    </el-dialog>
    <!-- 修改背景颜色的对话框 -->
    <el-dialog title="背景颜色" :visible.sync="dialogVisible1" width="40%">
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
        <el-button @click="dialogVisible1 = false">取消</el-button>
        <el-button type="primary" @click="selectColor">确定</el-button>
      </div>
    </el-dialog>
    <div class="menu" v-if="list">
      <div
        class="menu-item"
        v-for="(item,index) in list"
        :key="index"
        :class="item.router ===$route.name?'menu-item-active':''"
        @click="goChild(item.router)"
        style="padding-left:6px;font-weight:bold;font-size:14px;"
      >{{item.text}}</div>
    </div>
  </div>
</template>
<script>
import router from '../router'
import menuConfig from './menu.json'
export default {
  data() {
    return {
      name: '',
      dialogVisible: false,
      dialogVisible1: false,
      fontFamily: [],
      fontColor: '',
      goindex: this.$route.name,
      faterRouter: '',
      list: [],
      routerList: router.options.routes[0].children,
      userId: ''
    }
  },
  async mounted() {
    await this.forRouter()
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
    this.name = getCookie('name')
    this.userId = getCookie('user_id')
    console.log(this.userId)
    this.getColor()

    // alert(roleId)
    // alert(name)
    // this.goindex = this.$route.name
    // eslint-disable-next-line no-console
  },
  watch: {
    $route: function(to, from) {
      // console.log(this.$route.name)
      // eslint-disable-next-line no-console
      // console.log(to, from)
      if (to.redirectedFrom) {
        this.forRouter()
        // this.faterRouter = to.redirectedFrom
        // this.findMenu(this.faterRouter)
        // //  this.goindex = this.$route.name
        // console.log(this.$route.name)
      } else {
        this.forRouter()

        // this.list =[]
        //     menuConfig.find(item =>{
        //        item.children.find(child =>{
        //            if (child.router === to.path) {
        //               this.list = child
        //            }
        //        })
        //    })
        //    this.goindex = this.$route.name
      }

      // 通过 `vm` 访问组件实例
    },
    deep: true
  },
  // created() {
  //   this.getColor()
  // },
  methods: {
    // 查询用户菜单界面颜色
    async getColor() {
      const res = await this.$request.bgcolor.getColor({
        userId: this.userId
      })
      // console.log(res)
      this.$store.state.color = res.data
    },
    clk() {
      window.location.href = 'https://home.citylink.hzcloudtown.com/'
    },
    // 点击背景颜色弹出对话框
    showColor() {
      this.dialogVisible1 = true
    },
    // showFont() {
    //   this.fontColor = ''
    //   this.fontFamily = []
    //   this.dialogVisible = true
    // },
    // 切换背景颜色
    async selectColor() {
      this.dialogVisible1 = false
      const res = await this.$request.bgcolor.changeColor({
        userId: this.userId,
        skin: this.$store.state.color
      })
      await this.$message({
        type: 'success',
        message: '修改成功',
        duration: 1000
      })
    },
    selectFont() {
      document.querySelector('html').style.color = this.fontColor
      document.querySelector('html').style.fontFamily = this.fontFamily
      this.dialogVisible = false
    },
    setColor(value) {
      this.fontColor = value
      this.$store.state.color = value
      // console.log(this.$store.state.color)
    },
    handleSelect(e) {
      this.goindex = e
    },
    goChild(e) {
      this.$router.push({
        name: e
      })
    },
    forRouter() {
      this.routerList.forEach(item => {
        // console.log(item)
        if (item.children) {
          // console.log(item.children)
          item.children.forEach(child => {
            if (child.name === this.$route.name) {
              this.findMenu(item.path)
              // console.log('打火机嗲死的好塞')
              return true
            }
          })
        } else {
          // console.log(item)
          if (item.path === this.$route.path) {
            this.list = []
          }
        }
      })
    },
    findMenu(to) {
      menuConfig.find(item => {
        if (item.children) {
          item.children.find(child => {
            if (child.router === to) {
              if (child.children) {
                this.list = child.children
                // console.log('走进来', child)
              } else {
                // console.log('走进来')
                this.list = []
              }
            }
          })
        }
      })
    },
    downLoad() {
      this.down
        .post('/SysSkin/downloadFile', {})
        .then(res => {
          console.log(res)
          console.log('成功了')
          const link = document.createElement('a')
          let blob = new Blob([res.data], {
            type:
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          })
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          // link.download = res.headers['content-disposition'] //下载后文件名
          link.download = '用户手册.docx' //下载的文件名
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
        .catch(error => {
          console.log('失败了')
          console.log(error)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.header-box {
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;

  .title {
    width: 335px;
    height: 24px;
  }

  .admin {
    display: flex;
    align-items: center;
    margin-left: auto;

    img {
      width: 24px;
      height: 26px;
      margin-right: 18px;
    }
  }
}

.menu {
  background: #fff;
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 7px 0 0 0;
  height: 40px;
  .menu-item {
    cursor: pointer;
    margin-right: 10px;
    margin-left: 14px;
    color: #909399;
    position: relative;
  }

  .menu-item-active {
    color: #117dde;
  }

  .menu-item-active::after {
    position: absolute;
    bottom: 10px;
    left: 3.5px;
    width: 96%;
    height: 1px;
    content: '';
    border-bottom: 2px solid #409eff;
  }
}
</style>
