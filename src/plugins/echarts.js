import echarts from 'echarts'
// import moment from 'moment'

// const mount  =  (params) =>{
//   return  moment(params).format('YYYY-MM-DD')
// }
const install = (Vue) => {
    Object.defineProperties(Vue.prototype, {
        $chart: {
            get() {
                return {
                    //画一条简单的线
                    myChart: (id,option) =>{
                        let chart = echarts.init(document.getElementById(id));
                        // this.chart.clear();
                        chart.setOption(option);
                        window.addEventListener("resize", () => {
                            chart.resize()
                        });
                    }
                }
            }
        }
    })
}

export default {
    install
}