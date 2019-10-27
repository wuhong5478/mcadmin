<template>
    <div class="box">
			   <toview :dialog='dialog' :form='form'></toview> <!--查看组件 -->
        <header>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="header-card"  
                  >
                        <p   style="user-select:none"  class="font">巡检人员数量</p>
                        <p   style="user-select:none" class="unm">  {{ userNumer }}  </p>
                        <img src="../../assets/picture/icon_po8igdphsks/human.png" alt="" srcset="">
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="header-card" style="background:#97B0E6">
                        <p style="user-select:none"  class="font">今日任务</p>
                        <p style="user-select:none" class="unm"> {{ jinriTask }} </p>
                        <img src="../../assets/picture/icon_po8igdphsks/renwu1.png" alt="" srcset="">
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="header-card" style="background:#00DDB3">
                        <p style="user-select:none" class="font">今日已完成任务</p>
                        <p style="user-select:none" class="unm"> {{ jinriOverTask }} </p>
                        <img src="../../assets/picture/icon_po8igdphsks/renwu.png" alt="" srcset="">
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="header-card" style="background:#8EEF86">
                        <p style="user-select:none" class="font">超时任务</p>
                        <p style="user-select:none" class="unm"> {{ outtask }} </p>
                        <img src="../../assets/picture/icon_po8igdphsks/time.png" alt="" srcset="">
                    </div>
                </el-col>
            </el-row>
        </header>
        <main>
            <!-- <template>
                    <el-select v-model="imputstatus" placeholder="请选择状态"  style="width:25%;margin-right:1.5%;margin-top:1.5%;">
                        <el-option label="进行中" value="1"></el-option>
                        <el-option label="未开始" value="2"></el-option>
                        <el-option label="完成" value="3"></el-option>
                        <el-option label="超时" value="4"></el-option>
                    </el-select>

            </template> -->
            <template>
                    <el-date-picker
                    v-model="valuetime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width:25%;margin-right:1.5%;margin-top:1.5%;"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    >
                    </el-date-picker>
            </template>
            <template>
                    <el-input placeholder="请输入任务名称关键字检索" v-model="renwu" style="width:25%;margin-right:1.5%;margin-top:1.5%;"></el-input><el-button  @click = "renw" type="primary"
                    
                    >查询</el-button>
            </template>
<!-- 查看弹窗 -->
<el-dialog title="检查结果" :visible.sync="cktc">
    <el-row>
        
        
        <el-col :span="7" style="float:right">维保状态: <el-select v-model="manstatus" placeholder="请选择状态" size="mini" style="width:60%;text-align:center">
                        <el-option label="进行中" value="1"></el-option>
                        <el-option label="未开始" value="2"></el-option>
                        <el-option label="完成" value="3"></el-option>
                        <el-option label="超时" value="4"></el-option>
        </el-select></el-col>
    </el-row>
  <el-table :data="gridData">

    
    <el-table-column property="qrcodeName" label="对象名称"></el-table-column>
    <el-table-column property="installAddress" label="对象位置"></el-table-column>
    
    <el-table-column property="isTrount" label="巡查状态">
        <template slot-scope="scope">
            {{scope.row.isTrount==1?'已完成':scope.row.isTrount=='2'?'未完成':'--'}}
        </template>
    </el-table-column>
    <el-table-column property="status" label="对象状态">
        <template slot-scope="scope">
            {{scope.row.status==1?'特级重大':scope.row.status==2?'重大':scope.row.status==3?'较大':scope.row.status==4?'一般':scope.row.status==5?'正常':'--'}}
        </template>
    </el-table-column>
    <el-table-column property="trountTime" label="巡查完成时间">
        <template slot-scope="scope">
            {{scope.row.trountTime==null?'--':scope.row.trountTime}}
        </template>
    </el-table-column>
    <el-table-column property="photoUrl" label="照片描述">
        <template slot-scope="scope">
            {{scope.row.trountTime==null?'--':scope.row.trountTime}}
        </template>
    </el-table-column>
        <el-table-column property="modification" label="审核">
            <template slot-scope="scope">
                 {{scope.row.modification==0?'未篡改':'以篡改'}}
            </template>
        </el-table-column>
    </el-table>
    <el-row>
        
        
        <el-col :span="24" style="text-align:right;margin-top:20px;user-select:none">
                   检查结果由蚂蚁金服区块链技术提供防篡改能力
        </el-col>
    </el-row>
</el-dialog>
<!-- 查看弹窗 -->

  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
                prop="routingName"
                label="任务名称">
                </el-table-column>
                <el-table-column
                label="检查结果">
               <template slot-scope="scope">
                    <span
                    size="mini"
                    
                    @click="ck(scope.$index, scope.row)"  style="color:#909399;cursor:pointer">查看
                    </span> 
                </template>
                </el-table-column>
                <el-table-column
                prop="planFinishTime"
                label="应完成时间">
                
                </el-table-column>
                <el-table-column
                prop="routngStatus"
                label="当前状态">
                </el-table-column>
                <el-table-column
                prop="actuallyFinishTime"
                label="实际完成时间">
                </el-table-column>
                <el-table-column
                prop="sysUser.name"
                label="相关责任人">
                </el-table-column>
                <el-table-column
                prop="sysUser.phone"
                label="联系电话">
                </el-table-column>
    </el-table>

            <!-- <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                prop="routingName"
                label="任务名称">
                </el-table-column>
                <el-table-column
                label="巡查对象">
               <template slot-scope="scope">
                    <span
                    size="mini"
                    
                    @click="ck(scope.$index, scope.row)" style="color:#909399;cursor: point">查看
                    </span> 
                </template>
                </el-table-column>
                <el-table-column
                prop="planFinishTime"
                label="应完成时间">
                
                </el-table-column>
                <el-table-column
                prop="routngStatus"
                label="当前状态">
                </el-table-column>
                <el-table-column
                prop="actuallyFinishTime"
                label="实际完成时间">
                </el-table-column>
                <el-table-column
                prop="sysUser.name"
                label="相关责任人">
                </el-table-column>
                <el-table-column
                prop="sysUser.phone"
                label="联系电话">
                </el-table-column>
            </el-table> -->
        </main>
    </div>
</template>
<script>
		import config from './jobConfig.json'
        import toview from './common/ToView'
        export default {
            components: {
                toview
            },
        data() {
            return {
                griiData:[],
                dept:'',
								jinriTask:0, //今日任务
								jinriOverTask:0, //今日已完成任务
								userNumer:0, //巡检人员数量
                outtask:0, //超时任务统计
                allDeviceRoutingList:[],//所有的巡检人员
                useInfo:{},//巡检人员信息
                value:'',
                value1:[], //开始结束日期筛选
                routingStatus: "", //巡检状态
								taskValue:'', //任务名称搜索
								form:{}, //查看组件接受的数据
								dialog:false, //查看组件的显示隐藏
								dateList:[],//日期数组
								routingObj:{ //新建任务
									routingName:'', // 任务名称
									routingCycle:'', // 巡检周期（日、周、月、季度
									rountStartTime:'', // 开始时间
									rountEndTime:'', // 结束时间
									personId:'',// 人员id、
									'Ids[]':'' //...... 
								},
                state:'',
                input:'',
                renwu:'',
                cktc:false,
                man:'',
                manstatus:'',
                value2: '',
                gridData:[],
                ckid:'',
                stime:'',
                etime:'',
                valuetime:'',
                imputstatus:'',
                tablist: config.task.tableConfig,
                options: config.task.select, //筛选巡检状态
                title: "新建任务",
                isShow: false,
                width: "1100px",
                height: "1000px",
                formInline: config.task.dialog,
                innerVisible: false

            }
		},
		    mounted() {
                var that = this
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
                that.dept = getCookie("dept_id")
                that.$request.garden.getDeviceRoutingfoList({deptId:that.dept}).then(res=>{
                    console.log(res);
                    this.tableData = res.data.rows
                    // console.log('这是初始数据11111123123',res.data.rows)
                    this.tableData.forEach(a=>{
                      if(a.routngStatus==1){
                        a.routngStatus='进行中'
                      }else if(a.routngStatus==2){
                        a.routngStatus='未开始'
                      }else if(a.routngStatus==3){
                        a.routngStatus='完成'
                      }else if(a.routngStatus==4){
                        a.routngStatus='超时'
                      }else if(a.routngStatus==null){
                        a.routngStatus=null
                      }
                    })

                })
                that.$request.garden.personNumber({deptId:that.dept}).then(res=>{
                    console.log('这是巡检人员数量',res)
                    this.userNumer = res.data
                })
                that.$request.garden.todayTask({deptId:that.dept}).then(res=>{
                    console.log('今日任务',res)
                    this.jinriTask = res.data
                })
                that.$request.garden.tadayFinishTask({deptId:that.dept}).then(res=>{
                    this.jinriOverTask = res.data
                })
                that.$request.garden.outingTask({deptId:that.dept}).then(res=>{
                    // alert(res.data)
                    this.outtask = res.data
                })


        },
        watch: { 
            imputstatus(val){
                // alert(val)
                 var that = this
                that.$request.garden.getDeviceTrountState({routngStatus:val,deptId:that.dept}).then(res=>{
                    if(res.code==500){
                        that.tableData = []
                    }else if(res.code==200){
                        // debugger
                        that.tableData = res.data.rows
                    }
                })
            },
            valuetime(val){
                var that = this
                that.stime = val[1]
                that.etime = val[0]
                console.log(val)
                that.$request.garden.getDeviceRoutingfoList({endTime:that.stime,startTime:that.etime}).then(res=>{
                   if(res.data==null){
                       that.tableData = []
                   }else{
                       that.tableData = res.data.rows
                       that.tableData.forEach(a=>{
                           if(a.routngStatus==1){
                               a.routngStatus='进行中'
                           }else if(a.routngStatus==2){
                               a.routngStatus='未开始'
                           }else if(a.routngStatus==3){
                               a.routngStatus='完成'
                           }else if(a.routngStatus==4){
                               a.routngStatus='超时'
                           }    
                       })
                   }
                
                })
            }
        },
        methods: {
           ck(index,row){
               var that = this
            this.editFrom = Object.assign({},row);
            this.ckid = row.id
            // alert(this.ckid)
             console.log('这是修改',row); 
            this.$request.garden.DeviceRountingForQcode({ID:that.ckid}).then(res=>{
                that.griiData = res.data
                    that.$request.garden.deviceTroudEquals({id:that.ckid}).then(res=>{
                        that.griiData.forEach(a=>{
                            a.modification = res.data
                        })
                        that.gridData = that.griiData
                        console.log('区块链',that.gridData)
                    })

            }) 
            this.cktc  = true;
          },
           renw(){
               var that = this
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
                const dept = getCookie("dept_id")
               that.$request.garden.getDeviceTrountName({routingName:that.renwu,endTime:that.stime,startTime:that.etime,routngStatus:this.imputstatus,deptId:dept}).then(res=>{
                   if(res.data==null){
                        that.tableData = []
                   }else{
                       that.tableData = res.data.rows
                       that.tableData.forEach(a=>{
                           if(a.routngStatus==1){
                               a.routngStatus='进行中'
                           }else if(a.routngStatus==2){
                               a.routngStatus='未开始'
                           }else if(a.routngStatus==3){
                               a.routngStatus='完成'
                           }else if(a.routngStatus==4){
                               a.routngStatus='超时'
                           }
                       })
                   }
               })
           },
			// clc(){
            //     var that = this
            //     that.$request.garden.getDeviceTrountState({routngStatus:that.imputstatus,deptId:that.dept}).then(res=>{
            //         if(res.data.rows==null){
            //             that.tableData=[]
            //         }else if(res.data.rows){
            //             that.tableData=res.data.rows
            //         }
            //     })
            // }		
        },
    }
</script>
<style lang="less" scoped>

    .obj {

        display: flex;
        .foot-search {
            margin-left: auto;
            display: flex;

            .add {
                color: #fff;
                background: rgba(17, 125, 221, 1);
            }
        }
    }

    .box {
        padding: 20px;
        background: #fff;

        header {

            .header-card {
                position: relative;
                padding: 20px;
                height: 88px;
                margin-top: 20px;
                background: rgba(17, 125, 221, 1);
                border-radius: 4px;
                display: flex;

                .font {
                font-size: 18px;
                font-family: MicrosoftYaHei-Bold;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                line-height: 150px;
                flex: 1;
                }

                .unm {
                margin-right: 10px;
                position: absolute;
                top: 6%;
                left: 10%;
                font-size: 40px;
                // font-family: MicrosoftYaHei-Bold;
                // font-weight: bold;
                color: rgba(255, 255, 255, 1);
                line-height: 100px;
                }
                img {

                    position: absolute;
                    padding-right: 10px;
                    right: 0;
                    top: 22%;
                    width: 80px;
                    height: 80px;
                }
            }

        }

        main {
            .main-header {
                display: flex;
                align-items: center;
                margin: 20px 0;

                .add {
                    color: #fff;
                    margin-left: auto;
                    background: rgba(17, 125, 221, 1);


                }

                .search {
                    display: flex;
                    // margin-right: auto;
                }
                .inputhange {
                    align-self: auto;
                }
                .search * {
                    margin-left: 10px;
                }
            }

        }

        .el-form-item {
            margin-bottom: 20px;
            margin-right: 180px;
        }

        .add-foot {
            border-top: 1px solid #eeee;
            width: 1000px;

            .foot-search {
                width: 50%;
                float: right;
                display: flex;
                margin: 20px 0;

                .add {
                    color: #fff;
                    background: rgba(17, 125, 221, 1);
                }
            }
        }


        .user {
            width: 100px;
            color: #347dd6;
        }
    }
</style>