import request from '@/api/request'
// 五设备信息接口请求

const zzjg = {
    // 查询
    queryInstitutions(params) {
        return request.get('/sysdept/getdeptlist', {params})
    },
    // 刷新(分页)
    updataInstitutions(params) {
        return request.post('/sysdept/updatesysdept', params)
    }
}

export default zzjg;