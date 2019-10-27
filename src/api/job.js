import request from '@/api/request'

const job = {
    // 今日完成任务统计
    todayOverTask(params) {
        return request.post('/maintenanceTasks/maintenanceRoutingfinishToday', params)
    },
    //今日任务统计
    todayTask(params) {
        return request.post('/maintenanceTasks/maintenanceRoutingtodayTask', params)
    },
    // 巡检人员数量
    personNumber(params) {
        return request.post('/maintenanceTasks/maintenanceRoutingpeopleSum', params)
    },
    //超时任务统计
    outingTask(params) {
        return request.post('/maintenanceTasks/maintenanceRoutingtimeoutTask', params)
    }
}
export default job