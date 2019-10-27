<template>
  <div class="popuplayer">
    <el-dialog :title="dialog.title" :visible.sync="dialog.show">
      <div class="form">
        <el-form
          ref="form"
          :model="form"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px;width:auto;"
        >
          <el-form-item prop="area" label="建筑面积:">
            <el-input type="area" v-model="form.area"></el-input>
          </el-form-item>
          <el-form-item prop="companyCode" label="公司编码:">
            <el-input type="companyCode" v-model="form.companyCode"></el-input>
          </el-form-item>
          <el-form-item prop="company_address" label="公司地址:">
            <el-input type="company_address" v-model="form.company_address"></el-input>
          </el-form-item>
          <el-form-item prop="file" label="上传头像:">
            <input type="file" @change="getFile($event)" />
            <!-- <el-input type="file" id="file" name="file"  @change="getFile($event)" multiple></el-input> -->
          </el-form-item>
          <!-- company_name -->
          <el-form-item prop="company_name" label="公司名称:">
            <el-input type="company_name" v-model="form.company_name"></el-input>
          </el-form-item>
          <el-form-item prop="fire_inspection_unit" label="消防设施检测单位:">
            <el-input type="fire_inspection_unit" v-model="form.companyName"></el-input>
          </el-form-item>
          <el-form-item prop="fireSafetyManager" label="消防安全管理人:">
            <el-input type="fireSafetyManager" v-model="form.fireSafetyManager"></el-input>
          </el-form-item>
          <el-form-item prop="fireSafetyPersonLiable" label="消防安全负责人:">
            <el-input type="fireSafetyPersonLiable" v-model="form.fireSafetyPersonLiable"></el-input>
          </el-form-item>
          <el-form-item prop="latitudeLongitude" label="经纬度:">
            <el-input type="latitudeLongitude" v-model="form.latitudeLongitude"></el-input>
          </el-form-item>
          <el-form-item prop="personLiableTelephone" label="管理人联系方式:">
            <el-input
              type="personLiableTelephone"
              v-model="form.personLiableTelephone"
              maxlength="11"
            ></el-input>
          </el-form-item>
          <el-form-item prop="managerTelephone" label="负责人联系方式:">
            <el-input type="managerTelephone" v-model="form.managerTelephone"></el-input>
          </el-form-item>
          <el-form-item class="text_right">
            <el-button @click="handleCancel('form')">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: Object,
    form: Object
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
      files: [],
      file: ''
    }
  },
  watch: {
    // 每次组件关闭清空表单校验规则
    ['dialog.show'](val) {
      // 重置form表单校验规则
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    }
  },
  methods: {
    getFile(event) {
      alert(1)
      this.file = event.target.files[0]
      console.log(this.file)
    },
    handleCancel(form) {
      console.log(form)
      this.dialog.show = false
    },
    onSubmit(form) {
      this.$refs[form].validate(async valid => {
        if (valid) {
          this.form.fire_inspection_unit = this.form.companyName
          this.form.fire_safety_manager = this.form.fireSafetyManager
          this.form.fire_safety_person_liable = this.form.fireSafetyPersonLiable
          this.form.latitude_longitude = this.form.latitudeLongitude
          this.form.manager_telephone = this.form.managerTelephone
          this.person_liable_telephone = this.form.personLiableTelephone
          let params = JSON.parse(JSON.stringify(this.form))
          console.log(params, 'ganjin')

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
          const dept = getCookie('dept_id')

          let formData = new FormData()
          formData.append('company_image', this.file)
          formData.append('area', this.form.area)
          formData.append('companyCode', this.form.companyCode)
          formData.append('company_address', this.form.companyAddress)
          formData.append('company_name', this.form.companyName)
          formData.append(
            'fire_inspection_unit',
            this.form.fire_inspection_unit
          )
          formData.append('fire_safety_manager', this.form.fireSafetyManager)
          formData.append(
            'fire_safety_person_liable',
            this.form.fireSafetyPersonLiable
          )
          formData.append('latitude_longitude', this.form.latitudeLongitude)
          formData.append('manager_telephone', this.form.managerTelephone)
          formData.append(
            'person_liable_telephone',
            this.form.personLiableTelephone
          )
          formData.append('propertyId', dept)
          // for(let i in params){
          //   formData.append(i, params[i])
          // }
          let message = '保存成功！'
          let type = 'success'
          if (this.dialog.option == 'add') {
            // message = res.message
          } else {
            // 修改物业基本信息
            // let res = await this.$request.platform.changePlatformInfo(params)
            let res = await this.instance.post(
              '/property/updatePropertyById',
              formData
            )
            // 刷新物业信息
            this.$parent.queryPlatform()
            message = res.msg
          }
          message == '修改成功' ? (type = 'success') : (type = 'error')
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
</style>