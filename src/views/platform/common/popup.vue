<template>
  <div class="popuplayer">
    <el-dialog :title="dialog.title" :visible.sync="dialog.show">
      <div class="form">
        <el-form
          ref="form"
          :model="label"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px;width:auto;"
        >
          <div v-if="this.dialog.option === 'edit'">
            <el-form-item
              v-for="(item, index) in form"
              :key="index"
              :prop="item.prop"
              :label="item.label"
            >
              <el-input
                :maxlength="item.prop=='phone'?11:''"
                v-if="!item.select && !item.picker"
                :type="item.prop"
                v-model="label[item.prop]"
              ></el-input>
              <el-select v-if="item.select" v-model="label[item.prop]" placeholder="请选择">
                <el-option
                  v-for="item in item.select"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-date-picker
                v-if="item.picker"
                v-model="label[item.prop]"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div v-else>
            <el-form-item
              v-for="(item, index) in form"
              :key="index"
              :prop="item.prop"
              :label="item.label"
            >
              <el-input
                :maxlength="item.prop=='phone'?11:''"
                v-if="!item.select && !item.picker"
                :type="item.prop"
                v-model="label[item.prop]"
              ></el-input>
              <el-select v-if="item.select" v-model="label[item.prop]" placeholder="请选择">
                <el-option
                  v-for="item in item.select"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-date-picker
                v-if="item.picker"
                v-model="label[item.prop]"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel('form')">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    // dialog: Object,
    // form: Object,
    // label: Array
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      // 验证手机号
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('手机号输入错误!'))
      } else {
        callback()
      }
    }
    return {
      form_rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        oilStation: [
          { required: true, message: '输油站不能为空', trigger: 'change' }
        ],
        outerManageId: [
          { required: true, message: '请选择外管员', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '电话不能为空！', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      dialog: {},
      form: {},
      label: [],
      picker: ''
    }
  },
  mounted() {
    if (this.dialog.option === 'add') {
      // this.form.forEach(element => {
      //   this.form[element.prop] = null
      // });
      for (let key in this.label) {
        this.label[key] = null
      }
    }
    // console.log(this.label, '传入的数据')
    // console.log(this.form, 'label 和 prop')
  },
  watch: {
    // 每次组件关闭清空表单校验规则
    ['dialog.show'](val) {
      console.log(val)
      // 重置form表单校验规则
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    // 监听添加事件
    ['dialog.option'](val) {
      if (val === 'add') {
        console.log(val, '这是添加')
      } else {
        console.log(val, '这是编辑')
      }
    }
  },
  methods: {
    handleCancel(form) {
      console.log(form)
      this.dialog.show = false
    },
    onSubmit(form) {
      this.$refs[form].validate(async valid => {
        if (valid) {
          // let params =  this.form
          // 通过回调传出 params
          let message = '保存成功！'
          let type = 'success'
          let params = JSON.parse(JSON.stringify(this.label))
          this.dialog.fun(params)
          message == '保存成功！' ? (type = 'success') : (type = 'error')
          // 操作成功
          // this.$message({
          //   message,
          //   type
          // });
          this.dialog.show = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
// .text_right {
// float: right;
// }
</style>
