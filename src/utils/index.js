import Vue from 'vue'
const Web = new Vue()
async function openShow (obj = {}, type = 'date') {
  const {
    text = '此操作将删除该行数据,是否继续?'
  } = obj
  const flag = await Web.$confirm(text, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type
  }).then(() => {
    return true
  }).catch(() => {
    return false
  })
  return flag
}

function isWhat (arr = [], obj = {}, type = 'date') {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    if (type === 'date') {
      element[obj.oldName] = new Date(element[obj.oldName]).toLocaleString('zh', { hour12: false })
    }
    if (type === 'sanmu') {
      element[obj.oldName] === obj.newName ? element[obj.oldName] = obj.isTrue : element[obj.oldName] = obj.isFalse
    }
  }
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { // author: meizz
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  return fmt
}
// 防抖函数
function debounce (fn, wait) {
  var timeout = null
  return function () {
    if (timeout !== null) { clearTimeout(timeout) }
    timeout = setTimeout(fn, wait)
  }
}

function getTreeArr (dataArr, idField, parentField, parentId) {
  const treeArr = []
  for (let i = 0; i < dataArr.length; i++) {
    const obj = dataArr[i]
    const objParentId = obj[parentField] == '' ? null : obj[parentField]
    if (objParentId == parentId) {
      const childTreeArr = getTreeArr(dataArr, idField, parentField, obj[idField])
      if (childTreeArr.length > 0) {
        obj.children = childTreeArr
      }
      treeArr.push(obj)
    }
  }
  return treeArr
}

function getMenuTreeArr (dataArr, idField, parentField, parentId) {
  const treeArr = []
  for (let i = 0; i < dataArr.length; i++) {
    const obj = dataArr[i]
    const objParentId = obj[parentField] == null ? 0 : obj[parentField]
    if (objParentId === parentId) {
      const childTreeArr = getTreeArr(dataArr, idField, parentField, obj[idField])
      if (childTreeArr.length > 0) {
        obj.children = childTreeArr
      }
      treeArr.push(obj)
    }
  }
  return treeArr
}

function getMap (dataArr, idField, labelField) {
  const map = new Map()
  for (let i = 0; i < dataArr.length; i++) {
    const obj = dataArr[i]
    map.set(obj[idField], obj[labelField])
  }
  return map
}

function clean (obj) {
  var propNames = Object.getOwnPropertyNames(obj)
  for (var i = 0; i < propNames.length; i++) {
    var propName = propNames[i]
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      delete obj[propName]
    }
  }
}
export {
  openShow,
  isWhat,
  debounce,
  getTreeArr,
  getMap,
  clean,
  getMenuTreeArr
}
