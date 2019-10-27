import Vue from 'vue'
import Router from 'vue-router'
const getComponent = (name /* 文件夹名 */, component /* 文件名 */) => () =>
    import(`@/views/${name}/${component}.vue`) //动态引入vue文件
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'layout',
            component: getComponent('layout', 'layout'),
            redirect: 'g-firstpage-rom',
            children: [
                {
                    path: '/e-alarm-rom',
                    name: 'e-alarm-rom',
                    redirect: 'e-alarm',
                    component: getComponent('alarm', 'e-alarm-rom'),
                    children: [
                        {
                            path: '/e-alarm',
                            name: 'e-alarm',
                            component: getComponent('alarm', 'e-alarm')
                        }
                    ]
                },
                {
                    path: '/e-statistic-rom',
                    name: 'e-statistic-rom',
                    redirect: 'e-statistic',
                    component: getComponent('alarm', 'e-statistic-rom'),
                    children: [
                        {
                            path: '/e-statistic',
                            name: 'e-statistic',
                            component: getComponent('alarm', 'e-statistic')
                        }
                    ]
                },
                // 大屏
                {
                    path: '/b-screen-rom',
                    name: 'b-screen-rom',
                    redirect: 'b-screen',
                    component: getComponent('screen', 'b-screen-rom'),
                    children: [
                        {
                            path: '/b-screen',
                            name: 'b-screen',
                            component: getComponent('screen', 'b-screen')
                        }
                    ]
                },
                // 行业隐患统计分析
                {
                    path: '/h-model-rom',
                    name: 'h-model-rom',
                    redirect: 'h-model',
                    component: getComponent('model', 'h-model-rom'),
                    children: [
                        {
                            path: '/h-model',
                            name: 'h-model',
                            component: getComponent('model', 'h-model')
                        }
                    ]
                },
                // 小镇区域隐患统计分析
                {
                    path: '/x-model-rom',
                    name: 'x-model-rom',
                    redirect: 'x-model',
                    component: getComponent('model', 'x-model-rom'),
                    children: [
                        {
                            path: '/x-model',
                            name: 'x-model',
                            component: getComponent('model', 'x-model')
                        }
                    ]
                },
                // 历史隐患统计
                {
                    path: '/l-model-rom',
                    name: 'l-model-rom',
                    redirect: 'l-model',
                    component: getComponent('model', 'l-model-rom'),
                    children: [
                        {
                            path: '/l-model',
                            name: 'l-model',
                            component: getComponent('model', 'l-model')
                        }
                    ]
                },
                // 合规运行分析
                {
                    path: '/g-model-rom',
                    name: 'g-model-rom',
                    redirect: 'g-model',
                    component: getComponent('model', 'g-model-rom'),
                    children: [
                        {
                            path: '/g-model',
                            name: 'g-model',
                            component: getComponent('model', 'g-model')
                        }
                    ]
                },
                {
                  path: '/w-firstpage-rom',
                  name: 'w-firstpage-rom',
                  redirect: 'w-firstpage',
                  component: getComponent('garden', 'w-firstpage-rom'),
                  children: [
                    {
                      path: '/w-firstpage',
                      name: 'w-firstpage',
                      component: getComponent('garden', 'w-firstpage')
                    }
                  ]
                },
                {
                    path: '/e-analyse-rom',
                    name: 'e-analyse-rom',
                    redirect: 'e-analyse',
                    component: getComponent('equipment', 'e-analyse-rom'),
                    children: [
                        {
                            path: '/e-analyse',
                            name: 'e-analyse',
                            component: getComponent('equipment', 'e-analyse')
                        }
                    ]
                },
                {
                    path: '/e-archives-rom',
                    name: 'e-archives-rom',
                    redirect: 'e-archives',
                    component: getComponent('equipment', 'e-archives-rom'),
                    children: [
                        {
                            path: '/e-archives',
                            name: 'e-archives',
                            component: getComponent('equipment', 'e-archives')
                        }
                    ]
                },
                // 设备健康度
                {
                    path: '/e-healths-rom',
                    name: 'e-healths-rom',
                    redirect: 'e-healths',
                    component: getComponent('equipment', 'e-healths-rom'),
                    children: [
                        {
                            path: '/e-healths',
                            name: 'e-healths',
                            component: getComponent('equipment', 'e-healths')
                        }
                    ]
                },
                // 设备查询
                {
                    path: '/e-search-rom',
                    name: 'e-search-rom',
                    redirect: 'e-search',
                    component: getComponent('equipment', 'e-search-rom'),
                    children: [
                        {
                            path: '/e-search',
                            name: 'e-search',
                            component: getComponent('equipment', 'e-search')
                        }
                    ]
                },
                // 设备档案
                {
                    path: '/e-dossier-rom',
                    name: 'e-dossier-rom',
                    redirect: 'e-dossier',
                    component: getComponent('equipment', 'e-dossier-rom'),
                    children: [
                        {
                            path: '/e-dossier',
                            name: 'e-dossier',
                            component: getComponent('equipment', 'e-dossier')
                        }
                    ]
                },
                // 设备总览
                {
                    path: '/e-overview-rom',
                    name: 'e-overview-rom',
                    redirect: 'e-overview',
                    component: getComponent('equipment', 'e-overview-rom'),
                    children: [
                        {
                            path: '/e-overview',
                            name: 'e-overview',
                            component: getComponent('equipment', 'e-overview')
                        }
                    ]
                },
                {
                    path: '/f-rom',
                    name: 'f-rom',
                    redirect: 'f-record',
                    component: getComponent('fire', 'f-rom'),
                    children: [
                        {
                            path: '/f-record',
                            name: 'f-record',
                            component: getComponent('fire', 'f-record')
                        }
                    ]
                },
                {
                    path: '/f-fx-rom',
                    name: 'f-fx-rom',
                    redirect: 'f-fx',
                    component: getComponent('fire', 'f-fx-rom'),
                    children: [
                        {
                            path: '/f-fx',
                            name: 'f-fx',
                            component: getComponent('fire', 'f-fx')
                        }
                    ]
                },
                {
                    path: '/f-analyse-rom',
                    name: 'f-analyse-rom',
                    redirect: 'f-analyse',
                    component: getComponent('fire', 'f-analyse-rom'),
                    children: [
                        {
                            path: '/f-analyse',
                            name: 'f-analyse',
                            component: getComponent('fire', 'f-analyse')
                        }
                    ]
                },
                {
                    path: '/f-tz-rom',
                    name: 'f-tz-rom',
                    redirect: 'f-tz',
                    component: getComponent('fire', 'f-tz-rom'),
                    children: [
                        {
                            path: '/f-tz',
                            name: 'f-tz',
                            component: getComponent('fire', 'f-tz')
                        }
                    ]
                },
                {
                    path: '/m-rom',
                    name: 'm-rom',
                    redirect: 'm-user',
                    component: getComponent('manage', 'm-rom'),
                    children: [
                        {
                            path: '/m-user',
                            name: 'm-user',
                            component: getComponent('manage', 'm-user')
                        }
                    ]
                },
                {
                    path: '/m-permission-rom',
                    name: 'm-permission-rom',
                    redirect: 'm-permission',
                    component: getComponent('manage', 'm-permission-rom'),
                    children: [
                        {
                            path: '/m-permission',
                            name: 'm-permission',
                            component: getComponent('manage', 'm-permission')
                        }
                    ]
                },
                {
                    path: '/m-dictionary-rom',
                    name: 'm-dictionary-rom',
                    redirect: 'm-dictionary',
                    component: getComponent('manage', 'm-dictionary-rom'),
                    children: [
                        {
                            path: '/m-dictionary',
                            name: 'm-dictionary',
                            component: getComponent('manage', 'm-dictionary')
                        }
                    ]
                },
                {
                    path: '/p-garden-rom',
                    name: 'p-garden-rom',
                    redirect: 'p-garden',
                    component: getComponent('platform', 'p-garden-rom'),
                    children: [
                        {
                            path: '/p-garden',
                            name: 'p-garden',
                            component: getComponent('platform', 'p-garden')
                        }
                    ]
                },
                {
                    path: '/p-propertyguanli-rom',
                    name: 'p-propertyguanli-rom',
                    redirect: 'p-propertyguanli',
                    component: getComponent('platform', 'p-propertyguanli-rom'),
                    children: [
                        {
                            path: '/p-propertyguanli',
                            name: 'p-propertyguanli',
                            component: getComponent('platform', 'p-propertyguanli')
                        }
                    ]
                },
                {
                    path: '/p-property-rom',
                    name: 'p-property-rom',
                    redirect: 'p-property',
                    component: getComponent('platform', 'p-property-rom'),
                    children: [
                        {
                            path: '/p-property',
                            name: 'p-property',
                            component: getComponent('platform', 'p-property')
                        }
                    ]
                },
                {
                    path: '/p-maintenance-rom',
                    name: 'p-maintenance-rom',
                    redirect: 'p-maintenance',
                    component: getComponent('platform', 'p-maintenance-rom'),
                    children: [
                        {
                            path: '/p-maintenance',
                            name: 'p-maintenance',
                            component: getComponent('platform', 'p-maintenance')
                        }
                    ]
                },
                {
                    path: '/p-role-rom',
                    name: 'p-role-rom',
                    redirect: 'p-role',
                    component: getComponent('platform', 'p-role-rom'),
                    children: [
                        {
                            path: '/p-role',
                            name: 'p-role',
                            component: getComponent('platform', 'p-role')
                        }
                    ]
                },
                {
                    path: '/m-room',
                    name: 'm-room',
                    redirect: 'm-elimination',
                    component: getComponent('manage', 'm-room'),
                    children: [
                        {
                            path: '/m-elimination',
                            name: 'm-elimination',
                            component: getComponent('manage', 'm-elimination')
                        }
                    ]
                },
                {
                    path: '/j-rom',
                    name: 'j-rom',
                    redirect: 'j-parkSurvey',
                    component: getComponent('equipment', 'e-rom'),
                    children: [
                        {
                            path: '/j-parksurvey',
                            name: 'j-parkSurvey',
                            component: getComponent('job', 'j-parkSurvey')
                        }
                    ]
                },
                {
                    path: '/d-rom',
                    name: 'd-rom',
                    redirect: 'd-Analysis',
                    component: getComponent('danger', 'd-rom'),
                    children: [
                        {
                            path: '/d-Analysis',
                            name: 'd-Analysis',
                            component: getComponent('danger', 'd-Analysis')
                        }
                    ]
                },

                {
                    path: '/d-fx-rom',
                    name: 'd-fx-rom',
                    redirect: 'd-fx',
                    component: getComponent('danger', 'd-fx-rom'),
                    children: [
                        {
                            path: '/d-fx',
                            name: 'd-fx',
                            component: getComponent('danger', 'd-fx')
                        }
                    ]
                },
                {
                    path: 'd-mx-rom',
                    name: 'd-mx-rom',
                    redirect: 'd-mx',
                    component: getComponent('danger', 'd-mx-rom'),
                    children: [
                        {
                            path: '/d-mx',
                            name: 'd-mx',
                            component: getComponent('danger', 'd-mx')
                        }
                    ]
                },
                {
                    path: '/test',
                    name: 'test',
                    component: getComponent('test', 'test')
                },
                {
                    path: '/g-rom',
                    name: 'g-rom',
                    redirect: 'analyze',
                    component: getComponent('garden', 'g-rom'),
                    children: [
                        {
                            path: '/analyze',
                            name: 'analyze',
                            component: getComponent('garden', 'analyze')
                        }
                    ]
                },
                {
                    path: '/g-firstpage-rom',
                    name: 'g-firstpage-rom',
                    redirect: 'g-firstpage',
                    component: getComponent('garden', 'g-firstpage-rom'),
                    children: [
                        {
                            path: '/g-firstpage',
                            name: 'g-firstpage',
                            component: getComponent('garden', 'g-firstpage')
                        }
                    ]
                },
                {
                    path: '/g-analyse-rom',
                    name: 'g-analyse-rom',
                    redirect: 'g-analyse',
                    component: getComponent('garden', 'g-analyse-rom'),
                    children: [
                        {
                            path: '/g-analyse',
                            name: 'g-analyse',
                            component: getComponent('garden', 'g-analyse')
                        }
                    ]
                },
                {
                    path: '/g-configuration-rom',
                    name: 'g-configuration-rom',
                    redirect: 'configuration',
                    component: getComponent('garden', 'g-configuration-rom'),
                    children: [
                        {
                            path: '/configuration',
                            name: 'configuration',
                            component: getComponent('garden', 'configuration')
                        }
                    ]
                },
                {
                    path: '/g-jh-rom',
                    name: 'g-jh-rom',
                    redirect: 'g-jh',
                    component: getComponent('garden', 'g-jh-rom'),
                    children: [
                        {
                            path: '/g-jh',
                            name: 'g-jh',
                            component: getComponent('garden', 'g-jh')
                        }
                    ]
                },
                // 巡检报告管理
                {
                    path: '/g-report-rom',
                    name: 'g-report-rom',
                    redirect: 'g-report',
                    component: getComponent('garden', 'g-report-rom'),
                    children: [
                        {
                            path: '/g-report',
                            name: 'g-report',
                            component: getComponent('garden', 'g-report')
                        }
                    ]
                },
                {
                    path: '/g-room',
                    name: 'g-room',
                    redirect: 'j-task',
                    component: getComponent('garden', 'g-room'),
                    children: [
                        {
                            path: '/j-task',
                            name: 'j-task',
                            component: getComponent('job', 'j-task')
                        }
                    ]
                },
                {
                    path: '/g-analyze-rom',
                    name: 'g-analyze-rom',
                    redirect: 'w-analyze',
                    component: getComponent('garden', 'g-analyze-rom'),
                    children: [
                        {
                            path: '/w-analyze',
                            name: 'w-analyze',
                            component: getComponent('garden', 'w-analyze')
                        }
                    ]
                },
                {
                    path: '/d-rom-e',
                    name: 'd-rom-e',
                    redirect: 'd-emergency',
                    component: getComponent('garden', 'd-rom-e'),
                    children: [
                        {
                            path: '/d-emergency',
                            name: 'd-emergency',
                            component: getComponent('garden', 'd-emergency')
                        }
                    ]
                },
                {
                    path: '/w-analyse-rom',
                    name: 'w-analyse-rom',
                    redirect: 'w-analyse',
                    component: getComponent('garden', 'w-analyse-rom'),
                    children: [
                        {
                            path: '/w-analyse',
                            name: 'w-analyse',
                            component: getComponent('garden', 'w-analyse')
                        }
                    ]
                },
                {
                    path: '/g-config-rom',
                    name: 'g-config-rom',
                    redirect: 'j-config',
                    component: getComponent('garden', 'g-config-rom'),
                    children: [
                        {
                            path: '/j-config',
                            name: 'j-config',
                            component: getComponent('job', 'j-config')
                        }
                    ]
                },
                {
                    path: '/fire-rom',
                    name: 'fire-rom',
                    redirect: 'fire-Station',
                    component: getComponent('equipment', 'fire-rom'),
                    children: [
                        {
                            path: '/fire-Station',
                            name: 'fire-Station',
                            component: getComponent('equipment', 'fire-Station')
                        }
                    ]
                },
                {
                    path: '/m-build-rom',
                    name: 'm-build-rom',
                    redirect: 'm-build',
                    component: getComponent('equipment', 'm-build-rom'),
                    children: [
                        {
                            path: '/m-build',
                            name: 'm-build',
                            component: getComponent('equipment', 'm-build')
                        }
                    ]
                },
                {
                    path: '/m-bim-rom',
                    name: 'm-bim-rom',
                    redirect: 'm-bim',
                    component: getComponent('equipment', 'm-bim-rom'),
                    children: [
                        {
                            path: '/m-bim',
                            name: 'm-bim',
                            component: getComponent('equipment', 'm-bim')
                        }
                    ]
                },
                {
                    path: '/xksgl-rom',
                    name: 'xksgl-rom',
                    redirect: 'xksgl',
                    component: getComponent('equipment', 'xksgl-rom'),
                    children: [
                        {
                            path: '/xksgl',
                            name: 'xksgl',
                            component: getComponent('equipment', 'xksgl')
                        }
                    ]
                },
                {
                    path: '/yjwz-rom',
                    name: 'yjwz-rom',
                    redirect: 'yjwz',
                    component: getComponent('equipment', 'yjwz-rom'),
                    children: [
                        {
                            path: '/yjwz',
                            name: 'yjwz',
                            component: getComponent('equipment', 'yjwz')
                        }
                    ]
                },
                {
                    path: '/pmtz-rom',
                    name: 'pmtz-rom',
                    redirect: 'pmtz',
                    component: getComponent('equipment', 'pmtz-rom'),
                    children: [
                        {
                            path: '/pmtz',
                            name: 'pmtz',
                            component: getComponent('equipment', 'pmtz')
                        }
                    ]
                },
                {
                    path: '/jsfw-rom',
                    name: 'jsfw-rom',
                    redirect: 'jsfw',
                    component: getComponent('equipment', 'jsfw-rom'),
                    children: [
                        {
                            path: '/jsfw',
                            name: 'jsfw',
                            component: getComponent('equipment', 'jsfw')
                        }
                    ]
                },
                {
                    path: '/yqxx-rom',
                    name: 'yqxx-rom',
                    redirect: 'yqxx',
                    component: getComponent('manage', 'yqxx-rom'),
                    children: [
                        {
                            path: '/yqxx',
                            name: 'yqxx',
                            component: getComponent('manage', 'yqxx')
                        }
                    ]
                },
                {
                    path: '/wywbxx-rom',
                    name: 'wywbxx-rom',
                    redirect: 'wywbxx',
                    component: getComponent('manage', 'wywbxx-rom'),
                    children: [
                        {
                            path: '/wywbxx',
                            name: 'wywbxx',
                            component: getComponent('manage', 'wywbxx')
                        }
                    ]
                },
                {
                    path: '/zzjg-rom',
                    name: 'zzjg-rom',
                    redirect: 'zzjg',
                    component: getComponent('manage', 'zzjg-rom'),
                    children: [
                        {
                            path: '/zzjg',
                            name: 'zzjg',
                            component: getComponent('manage', 'zzjg')
                        }
                    ]
                },
                {
                    path: '/pxkh-rom',
                    name: 'pxkh-rom',
                    redirect: 'pxrygl',
                    component: getComponent('exam', 'pxkh-rom'),
                    children: [
                        {
                            path: '/pxrygl',
                            name: 'pxrygl',
                            component: getComponent('exam', 'pxrygl')
                        }
                    ]
                },
                {
                    path: '/xfzs-rom',
                    name: 'xfzs-rom',
                    redirect: 'zsalgl',
                    component: getComponent('exam', 'xfzs-rom'),
                    children: [
                        {
                            path: '/zsalgl',
                            name: 'zsalgl',
                            component: getComponent('exam', 'zsalgl')
                        }
                    ]
                },
                {
                    path: '/exam-rom',
                    name: 'exam-rom',
                    redirect: 'exam',
                    component: getComponent('exam', 'exam-rom'),
                    children: [
                        {
                            path: '/exam',
                            name: 'exam',
                            component: getComponent('exam', 'exam')
                        }
                    ]
                },
                {
                    path: '/xfaqpx-rom',
                    name: 'xfaqpx-rom',
                    redirect: 'xfaqpx',
                    component: getComponent('exam', 'xfaqpx-rom'),
                    children: [
                        {
                            path: '/xfaqpx',
                            name: 'xfaqpx',
                            component: getComponent('exam', 'xfaqpx')
                        }
                    ]
                },
                {
                    path: '/xfaqyl-rom',
                    name: 'xfaqyl-rom',
                    redirect: 'xfaqyl',
                    component: getComponent('exam', 'xfaqyl-rom'),
                    children: [
                        {
                            path: '/xfaqyl',
                            name: 'xfaqyl',
                            component: getComponent('exam', 'xfaqyl')
                        }
                    ]
                },
                {
                    path: '/xwgl-rom',
                    name: 'xwgl-rom',
                    redirect: 'xwgl',
                    component: getComponent('exam', 'xwgl-rom'),
                    children: [
                        {
                            path: '/xwgl',
                            name: 'xwgl',
                            component: getComponent('exam', 'xwgl')
                        }
                    ]
                },{
                    path: '/tzfspz-rom',
                    name: 'tzfspz-rom',
                    redirect: 'tzfspz',
                    component: getComponent('exam', 'tzfspz-rom'),
                    children: [
                        {
                            path: '/tzfspz',
                            name: 'tzfspz',
                            component: getComponent('exam', 'tzfspz')
                        }
                    ]
                },
                // 建筑风险评估列表
                {
                    path: '/ac-score',
                    name: 'ac-score',
                    redirect: 'ac-score',
                    component: getComponent('archscore', 'ac-score'),
                    children: [
                        {
                            path: '/ac-score',
                            name: 'ac-score',
                            component: getComponent('archscore', 'ac-score')
                        }
                    ]
                },
                {
                    path: '/login-rom',
                    name: 'login-rom',
                    redirect: 'login',
                    component: getComponent('login', 'login-rom'),
                    meta: {
                        keepAlive: true
                    },
                    children: [
                        {
                            path: '/login',
                            name: 'login',
                            component: getComponent('login', 'login')
                        }
                    ]
                }
                // {
                //   path: '/g-room',
                //   name: 'g-room',
                //   redirect: 'w-analyze',
                //   component: getComponent('garden', 'g-room'),
                //   children: [{
                //     path: '/w-analyze',
                //     name: 'w-analyze',
                //     component: getComponent('garden', 'w-analyze'),
                //   },{
                //     path:'/w-record',
                //     name:'w-record',
                //     component: getComponent('garden', 'w-record')
                //   },{
                //     path:'/w-configuration',
                //     name:'w-configuration',

                //     component: getComponent('garden', 'w-configuration')
                //   }
                // ]
                // }
            ]
        }
    ]
})
function getCookie(name){
    var strcookie = document.cookie;//获取cookie字符串
    var arrcookie = strcookie.split("; ");//分割
    //遍历匹配
    for ( var i = 0; i < arrcookie.length; i++) {
    var arr = arrcookie[i].split("=");
    if (arr[0] == name){
    return arr[1];
  }
}
return "";
}
console.log(11111,getCookie("dept_type"))

var depttype = getCookie("dept_type")
// 如未有roleId那将跳转IoT
const res = document.cookie
const roleId = res.role_id
console.log(123,getCookie("dept_type"))
console.log('这是dept_type',getCookie("dept_type"))
// alert('cookie',res)

// 获取cookie--dept_type进行跳转 1管委会 2物业 3维保
router.beforeEach((to, from, next) => {
    if (to.path =="/g-firstpage") {
      if(depttype=="1" ||depttype=="2" ||depttype==""){
        next()
      }else if(depttype=="3"){
        next({path:"/w-firstpage"})

      }
    } else {
      next()
    }
  })
  router.beforeEach((to, from, next) => {
    if (to.path =="/b-screen") {
        window.open('https://cloudfire.citylink.hzcloudtown.com/screen/')
    } else {
        next()
    }
  })


router.beforeEach((to, from, next) => {
    if (roleId == undefined) {
        // 如不需要验证请注释
        // alert('未登录，请登录')
        // window.location.href =
        //   'https://home.citylink.hzcloudtown.com/login/login.htm'
        // 如不需要验证请注释
        next()
    } else {
        next()
    }
    return ''
})

// const roleId = getCookie("role_id")
console.log(11111111,getCookie("dept_id"))
// console.log('cookie',res)
// router.beforeEach((to,from,next)=>{
//   if(roleId == undefined){
//     // 如不需要验证请注释
//         // alert('未登录，请登录')
//         window.location.href='https://home.citylink.hzcloudtown.com/login/login.htm'
//         next()
//   }else{
//     next()
//   }
// })
export default router
