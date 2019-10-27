import vue from 'vue'
import popup from './popup.vue'

//使用vue的extend，以vue文件为基础组件，返回一个可以创建vue组件的特殊构造函数
const Popup = vue.extend(popup)

//dialog:Object 表单的配置参数  form:Object 表单编辑时传入的数据 label:Object 表单的label
function showPopup(dialog, form, label = {}) {
    const popupDom = new Popup({
            el: document.createElement('div'),
            data() {
                return {
                    dialog: dialog,
                    form: form,
                    label: label
                }
            }
        })　　 //在body中动态创建一个div元素，后面自动会把它替换成整个vue文件内的内容
    document.body.appendChild(popupDom.$el)
}

function registryPopup() {
    //把showPopup这个方法添加到vue的原型中，可以直接调用，当调用的时候就是执行函数内的内容
    vue.prototype.$popup = showPopup
}

export default registryPopup