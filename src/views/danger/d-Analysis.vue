<template>
  <div style>
    <div class="box">
      <!-- 头部隐患 -->
      <header>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="header-card">
              <p class="font">处理人员数量</p>
              <p class="unm">{{this.handlerCount || '0'}}</p>
              <img src="../../assets/picture/icon_po8igdphsks/human.png" alt srcset />
            </div>
          </el-col>
          <el-col :span="6">
            <div class="header-card" style="background:#97B0E6">
              <p class="font">今日发现隐患</p>
              <p class="unm">{{this.warnCount || '0'}}</p>
              <img src="../../assets/picture/icon_po8igdphsks/renwu1.png" alt srcset />
            </div>
          </el-col>
          <el-col :span="6">
            <div class="header-card" style="background:#00DDB3">
              <p class="font">超时处理</p>
              <p class="unm">{{this.overTimeCount || '0'}}</p>
              <img src="../../assets/picture/icon_po8igdphsks/renwu.png" alt srcset />
            </div>
          </el-col>
          <el-col :span="6">
            <div class="header-card" style="background:#8EEF86">
              <p class="font">今日已处理隐患</p>
              <p class="unm">{{this.processedCount || '0'}}</p>
              <img src="../../assets/picture/icon_po8igdphsks/time.png" alt srcset />
            </div>
          </el-col>
        </el-row>
      </header>
      <!-- 菜单 -->
      <main style="padding-top: 20px">
        <header style="margin-bottom: 10px">
          <!-- 隐患状态 -->
          <template>
            <!-- <span class="headerSpan">:</span> -->
            <el-select
              class="mini"
              size="medium"
              v-model="searchStatus"
              @change="changeStatus"
              placeholder="隐患等级"
            >
              <el-option label="所有隐患" value></el-option>
              <el-option label="一般隐患" value="4"></el-option>
              <el-option label="重大隐患" value="2"></el-option>
            </el-select>
          </template>
          <!-- 处理结果 -->
          <template>
            <!-- <span class="headerSpan"></span> -->
            <el-select
              class="mini headerSpan"
              size="medium"
              v-model="searchResult"
              @change="changeResult"
              placeholder="处理结果"
            >
              <el-option label="所有处理结果" value></el-option>
              <el-option label="待分配" value="0"></el-option>
              <el-option label="处理中" value="1"></el-option>
              <el-option label="处理未确认" value="2"></el-option>
              <el-option label="处理未达标" value="3"></el-option>
              <el-option label="处理已确认" value="4"></el-option>
              <el-option label="超时未处理" value="5"></el-option>
            </el-select>
          </template>
          <!-- 园区选择 -->
          <template>
            <el-select
              class="mini headerSpan"
              size="medium"
              v-model="searchArea"
              placeholder="请选择园区"
              @change="changeArea"
            >
              <el-option
                v-for="item in optionArea"
                :key="item.areaId"
                :label="item.areaName"
                :value="item.areaName"
              ></el-option>
            </el-select>
          </template>
          <!-- 实际处理时间 -->
          <template>
            <!-- <span class="headerSpan">实际处理时间:</span> -->
            <el-date-picker
              class="date headerSpan"
              size="medium"
              v-model="searchTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="实际处理时间"
            ></el-date-picker>
          </template>
          <!-- 处理人 -->
          <template>
            <!-- <span class="headerSpan">:</span> -->
            <el-input class="mini headerSpan" size="medium" v-model="searchInput" placeholder="处理人"></el-input>
          </template>

          <el-button @click="searchInfo" type="primary" class="search" size="medium">查询</el-button>
          <!-- <el-button type="primary" class="flr" @click="dialogTableVisible = true" size="mini">
            新增
          </el-button>-->
          <!-- style="margin-right: 5ox" -->
          <!-- dialogVisible=true -->

          <el-button size="medium" class="flr" type="primary" @click="set">设置</el-button>
        </header>
        <!-- 数据表单 -->
        <div>
          <el-table
            :header-cell-style="{background:'#FAFAFA'}"
            style="width: 100%"
            :data="tableData"
            stripe
          >
            <el-table-column prop="hiddangerName" label="任务名称"></el-table-column>
            <el-table-column prop="source" label="隐患来源"></el-table-column>
            <el-table-column label="隐患等级">
              <template v-slot="{row}">
                <span>{{row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="place" label="隐患位置"></el-table-column>
            <el-table-column label="隐患详情">
              <template v-slot="{row}">
                <span class="lookOver" @click="lookOver(row)">查看详情</span>
              </template>
            </el-table-column>
            <el-table-column label="当前状态">
              <template v-slot="{row}">
                <!-- :class="{noOrder:showOrange,overAll:showGreen}" -->

                <span :class="row.flag? 'noOrder' : 'overAll'" @click="noOrder(row)">{{row.order}}</span>
              </template>
            </el-table-column>
            <el-table-column label="应处理时间">
              <template v-slot="{row}">
                <span>{{row.processTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="处理人">
              <template v-slot="{row}">
                <span>{{row.handlerName || '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="处理结果">
              <template v-slot="{row}">
                <span @click="clickSpan(row)" class="resultName">{{row.resultName || '--'}}</span>
              </template>
              <!-- <span @click="clickSpan">处理结果未确定</span> -->
            </el-table-column>
            <el-table-column label="评估"></el-table-column>
            <el-table-column label="操作">
              <!-- <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="输入任务名称" />
              </template>-->
              <template v-slot="scope">
                <span
                  :class="{examineSpan : isexamineSpan,open: scope.row.one}"
                  @click="orderExamine(scope.row)"
                >审核/</span>
                <span
                  :class="{amendSpan : isexamineSpan,amend: scope.row.three}"
                  @click="handleEdit(scope.row)"
                >编辑/</span>
                <span
                  :class="{examineSpan : isexamineSpan,examine: scope.row.two}"
                  @click="orderDelete(scope.row)"
                >撤销</span>
                <span :class="{none: scope.row.xianshi}">--</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页器 -->
          <div style="text-align: center">
            <el-pagination
              background
              layout="prev, pager, next,total"
              :total="total"
              :page-size="pagesize"
              :current-page.sync="currentPage"
              @current-change="currentChange"
            ></el-pagination>
          </div>
        </div>
        <!-- 新增隐患的对话框 -->
        <el-dialog title="新增隐患" :visible.sync="dialogTableVisible">
          <el-form :model="taskWarning">
            <el-form-item label="任务名称" :label-width="formLabelWidth">
              <el-input v-model="taskWarning.hiddangerName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="隐患来源" :label-width="formLabelWidth">
              <el-input v-model="taskWarning.source" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="隐患等级" :label-width="formLabelWidth">
              <!-- <el-input v-model="taskWarning.level" autocomplete="off"></el-input> -->
              <el-select v-model="taskWarning.level" placeholder="请选择">
                <el-option label="一般" value="4"></el-option>
                <!-- <el-option label="较大" value="3"></el-option> -->
                <el-option label="重大" value="2"></el-option>
                <!-- <el-option label="特级重大" value="1"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="隐患位置" :label-width="formLabelWidth">
              <el-input v-model="taskWarning.place" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="隐患详情" :label-width="formLabelWidth">
              <el-input v-model="taskWarning.hiddenDescript" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="当前状态" :label-width="formLabelWidth">
              <template>
                <el-select v-model="addId" placeholder="请选择">
                  <el-option label="未派单" value="1"></el-option>
                </el-select>
              </template>
            </el-form-item>
            <el-form-item label="应处理时间" :label-width="formLabelWidth">
              <el-input v-model="taskWarning.processTime" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="处理人" :label-width="formLabelWidth">
              <el-input v-model="taskWarning.handler" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="处理结果" :label-width="formLabelWidth">
              <el-select v-model="taskWarning.processResult" placeholder="请选择处理状态">
                <el-option label="已处理" value="已处理"></el-option>
                <el-option label="未处理" value="未处理"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRow">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 更新隐患的对话框 -->
        <el-dialog title="更新工单" width="35%" :visible.sync="dialogFormVisible">
          <el-form :model="obj" :rules="rules" ref="ruleForm">
            <!-- <el-form-item label="任务名称" :label-width="formLabelWidth">
              <el-input v-model="obj.hiddangerName" autocomplete="off"></el-input>
            </el-form-item>-->
            <!-- <el-form-item label="隐患来源" :label-width="formLabelWidth">
              <el-input v-model="obj.source" autocomplete="off"></el-input>
            </el-form-item>-->
            <!-- <el-form-item label="隐患等级" :label-width="formLabelWidth">
              <template>
                <el-select v-model="obj.level" placeholder="请选择">
                  <el-option label="一般" value="4"></el-option>
                  <el-option label="较大" value="3"></el-option>
                  <el-option label="重大" value="2"></el-option>
                  <el-option label="特级重大" value="1"></el-option>
                </el-select>
              </template>
            </el-form-item>-->
            <!-- <el-form-item label="隐患位置" :label-width="formLabelWidth">
              <el-input v-model="obj.place" autocomplete="off"></el-input>
            </el-form-item>-->
            <!-- <el-form-item label="隐患详情" :label-width="formLabelWidth">
              <el-input v-model="obj.hiddenDescript" autocomplete="off"></el-input>
            </el-form-item>-->
            <!-- <el-form-item label="当前状态" :label-width="formLabelWidth">
              <template>
                <el-select v-model="amendId" placeholder="请选择">
                  <el-option label="未派单" value="1"></el-option>
                  <el-option label="已派单" value="2"></el-option>
                </el-select>
              </template>
            </el-form-item>-->

            <el-form-item label="处理人员:">
              <!-- <el-input v-model="obj.handler" autocomplete="off"></el-input> -->
              <template>
                <el-select
                  class="select"
                  @change="amendchangeSystmName"
                  v-model="amendsystmNameId"
                  placeholder="处理角色"
                >
                  <el-option
                    v-for="item in options3"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </template>
              <template>
                <el-select
                  class="select"
                  @change="amendchangeHandleName"
                  v-model="amendhandleNameId"
                  placeholder="处理人员"
                >
                  <el-option
                    v-for="item in options4"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </template>
            </el-form-item>
            <el-form-item label="应处理时间:" prop="time">
              <!-- <el-input v-model="obj.processTime" autocomplete="off"></el-input> -->
              <el-date-picker
                v-model="obj.time"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions2"
                @change="changTime1"
              ></el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="处理结果:" label-width="85px">
              <el-select class="select" v-model="obj.processResult" placeholder="选择处理状态">
                <el-option label="已处理" value="已处理"></el-option>
                <el-option label="未处理" value="未处理"></el-option>
              </el-select>
            </el-form-item>-->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="replace">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 点击设置对话框 -->
        <el-dialog title="设置" :visible.sync="dialogVisible" width="50%">
          <el-form label-position="top">
            <el-form-item label="工单派送模式:">
              <el-select @change="changeMethod" v-model="checkValue" placeholder="请选择派送模式">
                <el-option label="手动" value="2"></el-option>
                <el-option label="自动" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择事件类型派送到运营公司:">
              <template>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox
                    v-for="item in checkboxList"
                    :key="item.id"
                    :disabled="checkbox"
                    :label="item.id"
                  >{{item.typeName}}</el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="assign">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 点击未派单的对话框 -->
        <el-dialog title="未派单" :visible.sync="dialogVisible1" width="35%">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="处理人员:">
              <template>
                <el-select
                  class="select"
                  @change="changeSystmName"
                  v-model="systmNameId"
                  placeholder="处理角色"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </template>
              <template>
                <el-select
                  class="select"
                  @change="changeHandleName"
                  v-model="handleNameId"
                  placeholder="处理人员"
                >
                  <el-option
                    v-for="item in options1"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </template>
            </el-form-item>
            <el-form-item label="应处理时间:" prop="time">
              <el-date-picker
                v-model="ruleForm.time"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                align="right"
                :picker-options="pickerOptions1"
                @change="changeTime"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="派单人员:">
              <span>{{dispatchName}}</span>
            </el-form-item>
            <!-- <el-form-item label="派单描述:">
              <el-input type="textarea" :rows="5" placeholder="请输入备注" v-model="textarea"></el-input>
            </el-form-item>-->
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="Order">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 点击查看详情的对话框 -->
        <el-dialog title="隐患详情" :visible.sync="dialogVisible2" width="35%">
          <el-form>
            <el-form-item label="上报人:">
              <span>{{examineObj.one}}</span>
            </el-form-item>
            <el-form-item label="上报时间:">
              <span>{{examineObj.two}}</span>
            </el-form-item>
            <el-form-item label="现场照片:">
              <!-- <div @click="lookPicture">
                <a class="download" target="_blank" :href="dangerHref">预览</a>
              </div>-->
              <img class="img" :src="`${dangerHref}`" alt />
              <!-- <el-popover placement="right" trigger="hover">
                >
                <img :src="`${dangerHref}`" alt />
                <img class="img" :src="`${dangerHref}`" :alt="`${dangerHref}`" />
              </el-popover>-->
            </el-form-item>
            <el-form-item label="隐患描述:">
              <span>{{examineObj.four || '无'}}</span>
            </el-form-item>
          </el-form>
          <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </span>-->
        </el-dialog>
        <!-- 已派单的对话框 -->
        <el-dialog title="已派单" :visible.sync="dialogVisible3" width="35%">
          <el-form>
            <el-form-item label="处理人员:">
              <span>{{completeObj.one}}</span>
            </el-form-item>
            <el-form-item label="应处理时间:">
              <span>{{completeObj.two}}</span>
            </el-form-item>
            <el-form-item label="派单人员:">
              <span>{{dispatchName}}</span>
            </el-form-item>
            <el-form-item label="派单时间:">
              <span>{{completeObj.four}}</span>
            </el-form-item>
          </el-form>
          <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible3 = false">取 消</el-button>
            <el-button type="primary">保 存</el-button>
          </span>-->
        </el-dialog>
        <!-- 处理结果为处理中的对话框 -->
        <el-dialog title="工单详情" :visible.sync="dialogVisible4" width="40%">
          <el-form class="resultFormOne">
            <el-form-item class="resultForm" label="处理结果:">处理中</el-form-item>
            <el-form-item class="resultForm" label="处理人员电话:">{{resulting.phone}}</el-form-item>
            <el-form-item class="resultForm" label="处理人员:">{{resulting.resultName}}</el-form-item>
            <el-form-item class="resultForm" label="应处理时间:">{{resulting.resultTime}}</el-form-item>
            <el-form-item class="resultForm" label="实际处理时间:">{{resulting.actualresultTime}}</el-form-item>
            <el-form-item class="resultForm" label="派单人员:">{{resulting.orderName}}</el-form-item>
            <el-form-item label="派单时间:">{{resulting.orderTime}}</el-form-item>
            <el-form-item label="结果描述:">{{resulting.resultDescribe || '无'}}</el-form-item>
            <el-form-item label="工单流水:">
              <p>&nbsp</p>
              <p
                v-for="(item,index) in itemArr"
                :key="index"
              >{{item.createTime + ': ' + item.wenzi}}</p>
            </el-form-item>
            <!-- <el-form-item label="结果照片:">
              <a
                class="download"
                target="_blank"
                :href="`http://120.55.234.38/api/getPicture?picture=${href}`"
              >预览</a>
            </el-form-item>-->
            <!-- <el-form-item label="结果描述:">
              <span>{{resulting.resultDescribe}}</span>
            </el-form-item>-->
          </el-form>
          <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible4 = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </span>-->
        </el-dialog>
        <!-- 处理结果为处理结果未确认的对话框 -->
        <el-dialog title="工单详情" :visible.sync="dialogVisible5" width="40%">
          <el-form class="resultFormOne">
            <el-form-item class="resultForm" label="处理结果:">处理未确认</el-form-item>
            <el-form-item class="resultForm" label="处理人员电话:">{{noResult.phone}}</el-form-item>
            <el-form-item class="resultForm" label="处理人员:">{{noResult.resultName}}</el-form-item>
            <el-form-item class="resultForm" label="应处理时间:">{{noResult.resultTime}}</el-form-item>
            <el-form-item class="resultForm" label="实际处理时间:">{{noResult.actualresultTime}}</el-form-item>
            <el-form-item class="resultForm" label="派单人员:">{{noResult.orderName}}</el-form-item>
            <el-form-item label="派单时间:">{{noResult.orderTime}}</el-form-item>
            <el-form-item label="结果描述:">{{noResult.resultDescribe || '无'}}</el-form-item>
            <el-form-item label="结果照片:">
              <!-- <a
                class="download"
                target="_blank"
                :href="`http://120.55.234.38/api/getPicture?picture=${href}`"
              >预览</a>-->
              <img class="img" :src="`${pic}`" alt />
            </el-form-item>
            <el-form-item label="工单流水:">
              <p>&nbsp</p>
              <p
                v-for="(item,index) in itemArr"
                :key="index"
              >{{item.createTime + ': ' + item.wenzi}}</p>
            </el-form-item>
            <!-- <el-form-item label="结果确认:">
              <template>
                <el-select
                  
                  class="noResultValue"
                  size="small"
                  placeholder="请选择"
                >
                  <el-option label="处理结果已确认" value="4"></el-option>
                  <el-option label="处理结果未达标" value="3"></el-option>
                </el-select>
              </template>
            </el-form-item>-->
          </el-form>
          <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible5 = false">取 消</el-button>
            <el-button type="primary" @click="noResulting">确 定</el-button>
          </span>-->
        </el-dialog>
        <!-- 处理结果为处理结果已确认的对话框 -->
        <el-dialog title="工单详情" :visible.sync="dialogVisible6" width="40%">
          <el-form class="resultFormOne">
            <el-form-item class="resultForm" label="处理结果:">处理结果已确认</el-form-item>
            <el-form-item class="resultForm" label="处理人员电话:">{{resultFinish.phone}}</el-form-item>
            <el-form-item class="resultForm" label="处理人员:">{{resultFinish.resultName}}</el-form-item>
            <el-form-item class="resultForm" label="应处理时间:">{{resultFinish.resultTime}}</el-form-item>
            <el-form-item class="resultForm" label="实际处理时间:">{{resultFinish.actualresultTime}}</el-form-item>
            <el-form-item class="resultForm" label="派单人员:">{{resultFinish.orderName}}</el-form-item>
            <el-form-item label="派单时间:">{{resultFinish.orderTime}}</el-form-item>
            <el-form-item label="结果描述:">{{resultFinish.resultDescribe || '无'}}</el-form-item>
            <el-form-item label="结果照片:">
              <!-- <a
                class="download"
                target="_blank"
                :href="`http://120.55.234.38/api/getPicture?picture=${href}`"
              >预览</a>-->
              <img class="img" :src="`${pic}`" alt />
            </el-form-item>
            <!-- <el-form-item label="结果确认:">已确认</el-form-item> -->
            <el-form-item label="工单流水:">
              <p>&nbsp</p>
              <p
                v-for="(item,index) in itemArr"
                :key="index"
              >{{item.createTime + ': ' + item.wenzi}}</p>
            </el-form-item>
          </el-form>
          <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible6 = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </span>-->
        </el-dialog>
        <!-- 处理结果为处理结果未达标的对话框 -->
        <el-dialog title="工单详情" :visible.sync="dialogVisible8" width="40%">
          <!-- <span>这是一段信息</span> -->
          <el-form class="resultFormOne">
            <el-form-item class="resultForm" label="处理结果:">处理未达标</el-form-item>
            <el-form-item class="resultForm" label="处理人员电话:">{{standardResult.phone}}</el-form-item>
            <el-form-item class="resultForm" label="处理人员:">{{standardResult.resultName}}</el-form-item>
            <el-form-item class="resultForm" label="应处理时间:">{{standardResult.resultTime}}</el-form-item>
            <el-form-item class="resultForm" label="实际处理时间:">{{standardResult.actualresultTime}}</el-form-item>
            <el-form-item class="resultForm" label="派单人员:">{{standardResult.orderName}}</el-form-item>
            <el-form-item label="派单时间:">{{standardResult.orderTime}}</el-form-item>
            <el-form-item label="结果描述:">{{standardResult.resultDescribe || '无'}}</el-form-item>
            <el-form-item label="结果照片:">
              <!-- <a
                class="download"
                target="_blank"
                :href="`http://120.55.234.38/api/getPicture?picture=${href}`"
              >预览</a>-->
              <img class="img" :src="`${pic}`" alt />
            </el-form-item>
            <!-- <el-form-item label="结果确认:">已确认</el-form-item> -->
            <el-form-item label="工单流水:">
              <p>&nbsp</p>
              <p
                v-for="(item,index) in itemArr"
                :key="index"
              >{{item.createTime + ': ' + item.wenzi}}</p>
            </el-form-item>
          </el-form>
          <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible8 = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </span>-->
        </el-dialog>
        <!-- 处理结果为处理超时的对话框 -->
        <el-dialog title="工单详情" :visible.sync="dialogVisible9" width="40%">
          <!-- <span>这是一段信息</span> -->
          <el-form class="resultFormOne">
            <el-form-item class="resultForm" label="处理结果:">超时未处理</el-form-item>
            <el-form-item class="resultForm" label="处理人员电话:">{{overtimeResult.phone}}</el-form-item>
            <el-form-item class="resultForm" label="处理人员:">{{overtimeResult.resultName}}</el-form-item>
            <el-form-item class="resultForm" label="应处理时间:">{{overtimeResult.resultTime}}</el-form-item>
            <el-form-item class="resultForm" label="实际处理时间:">{{overtimeResult.actualresultTime}}</el-form-item>
            <el-form-item class="resultForm" label="派单人员:">{{overtimeResult.orderName}}</el-form-item>
            <el-form-item label="派单时间:">{{overtimeResult.orderTime}}</el-form-item>
            <el-form-item label="结果描述:">{{standardResult.resultDescribe || '无'}}</el-form-item>
            <el-form-item label="结果照片:">
              <!-- <a
                class="download"
                target="_blank"
                :href="`http://120.55.234.38/api/getPicture?picture=${href}`"
              >预览</a>-->
              <img class="img" :src="`${pic}`" alt />
            </el-form-item>
            <el-form-item label="工单流水:">
              <p>&nbsp</p>
              <p
                v-for="(item,index) in itemArr"
                :key="index"
              >{{item.createTime + ': ' + item.wenzi}}</p>
            </el-form-item>
            <!-- <el-form-item label="结果描述:"></el-form-item>
            <el-form-item label="结果确认:">已确认</el-form-item>-->
          </el-form>
          <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible9 = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </span>-->
        </el-dialog>
        <!-- 审核的对话框 -->
        <el-dialog title="审核工单" :visible.sync="dialogVisible7" width="40%">
          <el-form class="resultFormOne">
            <!-- <el-form-item class="resultForm" label="处理结果:">处理结果已确认</el-form-item> -->
            <el-form-item class="resultForm" label="处理人员电话:">{{examineOrder.phone}}</el-form-item>
            <el-form-item class="resultForm" label="处理人员:">{{examineOrder.resultName}}</el-form-item>
            <el-form-item class="resultForm" label="应处理时间:">{{examineOrder.resultTime}}</el-form-item>
            <el-form-item label="实际处理时间:">{{examineOrder.actualresultTime}}</el-form-item>
            <el-form-item class="resultForm" label="派单人员:">{{examineOrder.orderName}}</el-form-item>
            <el-form-item label="派单时间:">{{examineOrder.orderTime}}</el-form-item>
            <el-form-item label="结果照片:">
              <!-- <a
                class="download"
                target="_blank"
                :href="`http://120.55.234.38/api/getPicture?picture=${href}`"
              >预览</a>-->
              <img class="img" :src="`${pic}`" alt />
            </el-form-item>
            <el-form-item label="结果描述:">
              <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="examineTextarea"></el-input>
            </el-form-item>
            <el-form-item label="结果确认:">
              <template>
                <el-select
                  size="medium"
                  class="noResultValue"
                  v-model="examineValue"
                  placeholder="请选择"
                >
                  <el-option label="处理未达标" value="3"></el-option>
                  <el-option label="处理已确认" value="4"></el-option>
                </el-select>
              </template>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible7 = false">取 消</el-button>
            <el-button type="primary" @click="noResulting">确 定</el-button>
          </span>
        </el-dialog>
      </main>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
import moment from 'moment'
// import { fail } from 'assert'
// import { setTimeout } from 'timers'
export default {
  // 注册局部过滤器格式化时间
  filters: {
    dateFilter(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      ruleForm: {
        time: ''
      },
      rules: {
        time: [
          {
            required: true,
            message: '应处理时间不能为空',
            trigger: ['change', 'blur']
          }
        ]
      },
      // 控制--的存在
      // xianshi: true,
      // 处理中的工单图片
      href: '',
      // 隐患图片跳转地址
      dangerHref: '',
      // 应处理时间
      time: '',
      // 未派单选择的应处理时间
      pickerOptions1: {
        shortcuts: [
          {
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }
        ]
      },
      // 编辑框中的应处理时间
      pickerOptions2: {
        shortcuts: [
          {
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }
        ]
      },
      itemArr: [],
      workorName: '', // 工单流水的文本
      // 处理结果
      result: '',
      // 控制审核有无
      isopen: false,
      // 控制撤销有无
      isexamine: false,
      // 控制编辑有无
      isamend: false,
      // 控制编辑的颜色
      isexamineSpan: true,
      // 审核对话框中的文本域
      examineTextarea: '',
      // 审核对话框的下拉菜单绑定的处理结果的id
      examineValue: '',
      // 处理结果未确认下拉菜单双向绑定的值
      noResultValue: '',
      // 搜索框的隐患状态
      searchStatus: '',
      // 搜索框的时间选择
      searchTime: '',
      // 搜索框的处理人选择
      searchInput: '',
      // 搜索框的处理结果选择
      searchResult: '',
      // 每页条数
      pagesize: 10,
      // 当前页码
      currentPage: 1,
      // 数据总条数
      total: 0,
      tableData: [],
      // 新增隐患的数据
      taskWarning: {
        hiddangerName: '',
        source: '',
        level: '',
        place: '',
        hiddenDescript: '',
        status: '',
        processTime: '',
        handler: '',
        processResult: ''
      },
      // 更新工单回显的数据
      obj: {
        hiddangerName: '',
        handler: '',
        // 更新隐患所需的id
        id: '',
        time: ''
      },
      value1: '',
      value2: '',
      value: '',
      // 更新的派单状态id
      amendId: '',
      amendTime: '',
      // 新增隐患派单的id
      addId: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogVisible: false,
      // 未派单的对话框
      dialogVisible1: false,
      // 查看详情的对话框
      dialogVisible2: false,
      // 已派单的对话框
      dialogVisible3: false,
      // 处理结果为处理中的对话框
      dialogVisible4: false,
      // 处理结果为处理结果未确认的对话框
      dialogVisible5: false,
      // 处理结果为处理结果已确认的对话框
      dialogVisible6: false,
      // 审核工单的对话框
      dialogVisible7: false,
      // 处理结果为处理结果未达标的对话框
      dialogVisible8: false,
      // 处理结果为处理超时的对话框
      dialogVisible9: false,
      formLabelWidth: '120px',
      // 多选框的数据
      checkList: [],
      // 多选框选择的值
      checkValue: '',
      // 控制多选择的禁用
      checkbox: false,
      // 多选框的数据数组
      checkboxList: [],
      // 为派单中的文本域内容
      textarea: '',
      // 未派单对话框中的系统角色
      options: [],
      // 系统角色id
      systmNameId: '',
      // 系统角色所对应的的系统人员
      options1: [],
      // 处理人员id
      handleNameId: '',
      // 更新工单对话框渲染的系统角色
      options3: [],
      // 系统角色id
      amendsystmNameId: '',
      // 更新工单对话框渲染的系统人员
      options4: [],
      // 系统人员id
      amendhandleNameId: '',
      // 应处理时间
      handleTime: '',
      // 隐患id
      id: '',
      // 工单id
      orderId: '',
      // 未派单的显示颜色
      showOrange: false,
      // 已派单显示的颜色
      showGreen: false,
      // 处理人员数量
      handlerCount: '',
      // 今日发现隐患
      warnCount: '',
      // 超时处理
      overTimeCount: '',
      // 今日已处理隐患
      processedCount: '',
      // 有无派单配置的变量，控制新增和修改请求
      differentRequest: [],
      // 物业id
      propertyId: '',
      propertyId1: '',
      // 是否发新增配单的变量
      addRequest: [],
      // 已派单回显的数据
      completeObj: {
        one: '',
        two: '',
        three: '',
        four: ''
      },
      // 查看详情的回显数据
      examineObj: {
        one: '',
        two: '',
        three: '',
        four: ''
      },
      // 查看所有隐患的参数对象
      lookDangerInfo: {
        // 实际处理时间
        actualTime: '',
        // 隐患状态
        level: '',
        // 处理人
        handler: '',
        // 处理结果
        workOrderStates: '',
        institutionType: '',
        pageNo: '',
        pageSize: '',
        maintenanceId: '',
        place: ''
      },
      // 处理中的数据
      resulting: {
        phone: '',
        resultName: '',
        resultTime: '',
        actualresultTime: '',
        orderName: '',
        orderTime: '',
        resultDescribe: ''
      },
      // 处理结果未确认的数据对象
      noResult: {
        phone: '',
        resultName: '',
        resultTime: '',
        actualresultTime: '',
        orderName: '',
        orderTime: '',
        resultDescribe: ''
      },
      // 处理结果未达标的数据对象
      standardResult: {
        phone: '',
        resultName: '',
        resultTime: '',
        actualresultTime: '',
        orderName: '',
        orderTime: '',
        resultDescribe: ''
      },
      // 处理结果超时的数据对象
      overtimeResult: {
        phone: '',
        resultName: '',
        resultTime: '',
        actualresultTime: '',
        orderName: '',
        orderTime: '',
        resultDescribe: ''
      },
      // 处理结果已确认的数据对象
      resultFinish: {
        phone: '',
        resultName: '',
        resultTime: '',
        actualresultTime: '',
        orderName: '',
        orderTime: '',
        resultDescribe: ''
      },
      // 审核工单的数据对象
      examineOrder: {
        phone: '',
        resultName: '',
        resultTime: '',
        actualresultTime: '',
        orderName: '',
        orderTime: '',
        resultDescribe: ''
      },
      // 审核处理结果未确认的参数对象
      workOrder: {
        // 工单id
        id: '',
        // 描述
        processResult: '',
        // 状态
        states: '',
        // 物业id
        propertyId: ''
      },
      n: '',
      m: '',
      // 预览图片所需的参数
      picObj: {
        deviceName: '',
        pictureId: '',
        productKey: '',
        type: ''
      },
      dispatchName: '', // 派单人员的回显
      dispatchId: '', // 派单人员id
      maintenanceId: '', // 点击未派单保存所属id
      institutionType: '', // 查询用户所需的类型id
      handlerType: '', // 处理人的类型
      pic: '',
      searchArea: '', // 根据园区进行选择
      optionArea: []
    }
  },
  created() {
    // 进入页面获取到查询用户所需的类型
    this.institutionType = this.getCookie('dept_type')
    this.handlerType = this.getCookie('dept_type')
    this.lookDangerInfo.maintenanceId = this.getCookie('dept_id')
    this.propertyId = this.getCookie('dept_id')
    this.propertyId1 = this.getCookie('dept_id')
    if (this.institutionType === '1') {
      this.institutionType = '0'
      this.lookDangerInfo.maintenanceId = ''
      this.propertyId1 = ''
    }
    if (this.institutionType === '2') {
      this.institutionType = '2'
      this.handlerType = '1'
    }
    if (this.institutionType === '3') {
      this.institutionType = '1'
      this.handlerType = '2'
    }
    this.getDabgerInfo()
    this.getAllSdictionary()
    // this.getSystmName()
    this.getDeploy()
    this.getDnagerNum()
    this.getAllOrder()
    this.getArea()
    // this.result =
  },
  watch: {
    // amendhandleNameId(newValue,oldValue) {
    // }
  },
  methods: {
    // 进入页面获取到用户的cookie
    getCookie(cookieName) {
      var strCookie = document.cookie
      var arrCookie = strCookie.split('; ')
      for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split('=')
        if (cookieName == arr[0]) {
          return arr[1]
        }
      }
      return '无'
    },
    // 根据机构id查询园区
    async getArea() {
      const res = await this.$request.danger.getArea({
        params: {
          deptId: this.propertyId
        }
      })
      console.log(res)
      this.optionArea = res.data
    },
    // 根据园区进行查找
    changeArea(value) {
      this.lookDangerInfo.place = value
      this.getDabgerInfo()
    },
    // 进入页面查询所有的自动派单配置
    async getAllOrder() {
      const res = await this.$request.danger.getAllOrder()
      // console.log(res.data)
      this.differentRequest = res.data
      // console.log(this.differentRequest)
    },
    // 获取所有的用户相关的数量
    async getDnagerNum() {
      const res = await this.$request.danger.getInfoNum({
        params: {
          maintenanceId: this.propertyId1
        }
      })
      // console.log(res.data)
      this.handlerCount = res.data.handlerCount
      this.warnCount = res.data.warnCount
      this.overTimeCount = res.data.overTimeCount
      this.processedCount = res.data.processedCount
    },
    // 根据物业id获取自动派单配置回显到多选框组中
    async getDeploy() {
      const res = await this.$request.danger.getDeploy({
        propertyId: this.propertyId
      })
      // console.log(res)
      this.addRequest = res.data
      // console.log(this.addRequest)
      // 是自动还是手动
      this.checkValue = res.data.pattern
      // 派单配置项
      const str = res.data.eventType
      // str === '' ? str === null : str
      // console.log(this.differentRequest)
      // console.log(str.split(','))
      const arr = str.split(',')
      if (arr[0] === '') {
        arr.shift()
      }
      // console.log(arr)
      // console.log(arr)
      arr.forEach(v => {
        // console.log(v)
        this.checkList.push(Number(v))
      })
    },
    // 时间选定后的事件
    changeTime(time) {
      // console.log(time)
      this.handleTime = time
    },
    // 编辑时间选定的
    changTime1(time) {
      this.obj.time = time
    },
    // 获取所有的系统角色列表渲染到未派单的下拉菜单中
    async getSystmName() {
      const res = await this.$request.danger.getSystemName()
      // console.log(res.data.rows)
      this.options = res.data.rows
      this.options3 = res.data.rows
    },
    // 切换未派单对话框系统角色渲染系统所对应的的人员
    changeSystmName(value) {
      this.handleNameId = ''
      // 系统角色id
      this.systmNameId = value

      console.log(value)
      // const res = await this.$request.danger.changeName({
      //   id: value
      // })
      // console.log(res.data)
      this.addDanger
        .get('/sysuser/getuserinfolist', {
          params: {
            roleId: value,
            pageNo: -1
          }
        })
        .then(res => {
          console.log(res)
          this.options1 = res.data.data.rows
        })
    },
    // 切换编辑对话框系统角色渲染系统所对应的的人员
    amendchangeSystmName(value) {
      // 系统角色id
      this.amendhandleNameId = ''
      this.amendsystmNameId = value
      console.log(value)
      // const res = await this.$request.danger.changeName({
      //   id: value
      // })
      // console.log(res.data)
      this.addDanger
        .get('/sysuser/getuserinfolist', {
          params: {
            roleId: value,
            pageNo: -1
          }
        })
        .then(res => {
          console.log(res.data.data)
          this.options4 = res.data.data.rows
        })
    },
    // 切换处理人员保存id
    changeHandleName(value) {
      // 处理人员id
      this.handleNameId = value
      console.log(value)
    },
    // 切换编辑对话框处理人员保存id
    amendchangeHandleName(value) {
      // 处理人员id
      this.m = value
      console.log(value)
    },
    // 获取所有的数据字典
    async getAllSdictionary() {
      this.instance
        .get('/sysDictionary/getsysdictionarylist', {
          params: {
            pageNo: -1,
            pageSize: 24,
            parentId: '00001'
          }
        })
        .then(res => {
          // console.log(res.data.data.rows)
          this.checkboxList = res.data.data.rows
        })
    },
    // 修改派单配置的方法
    async amendOrder() {
      // this.differentRequest.forEach(async v => {
      //   // console.log(v.propertyId)
      //   if (v.propertyId != this.propertyId) {
      //     return
      //   }
      //   if (v.propertyId === this.propertyId) {
      const str = this.checkList.join(',')
      // console.log(this.checkList)
      // console.log(this.checkValue)
      this.$request.danger.assignWorder({
        eventType: str,
        pattern: this.checkValue,
        propertyId: this.propertyId
      })
      this.$message({
        type: 'success',
        message: '修改成功',
        duration: 1000
      })
      //   }
      // })
    },
    //新增派单配置的方法
    addOrder() {
      const str = this.checkList.join(',')
      // console.log(this.checkList)
      // console.log(this.checkValue)
      this.$request.danger.addOrder({
        eventType: str,
        pattern: this.checkValue,
        propertyId: this.propertyId
      })
      this.$message({
        type: 'success',
        message: '新增成功',
        duration: 1000
      })
    },
    // 点击设置弹出对话框
    async set() {
      this.dialogVisible = true
      console.log(this.checkList)
      this.checkList = []
      await this.getDeploy()
      console.log(this.checkList)
      if (this.checkValue === '2') {
        this.checkbox = true
        this.checkList = []
      }
    },
    // 点击设置的对话框实现新增或修改分派工单
    assign() {
      // console.log(this.propertyId)
      // console.log(this.checkList, this.checkValue)
      if (this.checkValue === '' && this.checkList.length === 0) {
        this.$message({
          type: 'error',
          message: `请进行选择`,
          duration: 800
        })
        return
      }
      if (this.checkValue === '' && this.checkList.length > 0) {
        this.$message({
          type: 'error',
          message: `请选择工单派送模式`,
          duration: 800
        })
        return
      }
      if (this.checkValue === '1' && this.checkList.length === 0) {
        this.$message({
          type: 'error',
          message: `事件类型不能为空`,
          duration: 800
        })
        return
      }
      // 实现修改工单配置
      this.differentRequest.forEach(async v => {
        console.log(v.propertyId)
        if (v.propertyId === this.propertyId) {
          await this.amendOrder()
        }
      })
      // 实现工单新增配置
      if (this.addRequest === null) {
        this.addOrder()
        this.getDeploy()
      }
      this.dialogVisible = false
    },
    // 查看详情回显信息
    lookOver(row) {
      this.dangerHref = ''
      console.log(row)
      this.picObj.deviceName = row.equipment
      this.picObj.pictureId = row.livePhoto
      this.picObj.productKey = row.productKey
      this.picObj.type = '1'
      // this.examineObj.three = row.livePhoto
      this.examineObj.three = row.livePhoto
      this.examineObj.four = row.hiddenDescript
      this.lookPicture()
      console.log(this.examineObj.three)
      this.addDanger
        .get('/taskwarn/gettaskwarnbyid', {
          params: {
            id: String(row.id)
          }
        })
        .then(res => {
          console.log(res.data)
          this.examineObj.two = res.data.data.reportTime
          this.examineObj.one = res.data.data.problemReporter

          // this.examineObj.three = res.data.data.livePhoto
        })

      this.dialogVisible2 = true
    },
    // 点击当前状态根据未派单和已派单弹出对话框
    noOrder(row) {
      console.log(row)
      console.log(row.maintenanceId)
      // 对当前状态进行筛选
      if (row.order === '未派单') {
        // 判断
        if (row.maintenanceId != null) {
          this.getSystmName()
        }
        // 隐患id
        this.id = row.id
        // 工单id
        this.orderId = row.workOrderId
        this.maintenanceId = row.maintenanceId
        this.dispatchName = this.getCookie('name')
        console.log(this.dispatchName)
        this.dialogVisible1 = true
      }
      if (row.order === '已派单') {
        this.completeObj.one = row.handlerName
        this.completeObj.two = row.processTime
        this.completeObj.four = row.distributeTime
        this.dispatchName = this.getCookie('name')
        this.dialogVisible3 = true
      }
    },
    // 点击确认实现派单功能
    async Order() {
      await this.$refs.ruleForm.validate()
      console.log(1)
      console.log(
        this.id,
        this.maintenanceId,
        this.handleNameId,
        this.handleTime
      )
      const res = await this.$request.danger.achieveOrder({
        // actualTime: '',
        // distributeTime: '',
        handlerType: this.handlerType, // 需通过物业和维保确定具体值  666666666666666666666
        // processResult: '',
        // resultTime: '',
        // states: '',
        // 隐患id
        taskWarnId: this.id,
        // 工单id
        id: this.orderId,
        processTime: this.handleTime,
        maintenanceId: this.maintenanceId,
        userId: this.handleNameId
      })
      console.log(res)
      await this.$message({
        type: 'success',
        message: res.msg,
        duration: 800
      })
      // 清空派单对话框中的选中状态
      this.systmNameId = ''
      this.handleNameId = ''
      this.time = ''
      this.dialogVisible1 = false
      this.getDabgerInfo()
    },

    // 点击编辑按钮弹出对话框
    async handleEdit(row) {
      this.getSystmName()
      console.log(row)
      console.log(row.userId)
      this.maintenanceId = row.maintenanceId
      const id = row.userId
      this.n = row.userId
      this.orderId = row.workOrderId
      // this.obj.hiddangerName = row.hiddangerName
      // this.obj.source = row.source
      // this.obj.level = row.name
      // this.obj.place = row.place
      // this.obj.hiddenDescript = row.hiddenDescript
      // this.obj.status = row.status
      // this.obj.processTime = row.processTime
      // this.obj.handler = row.handler
      // this.obj.processResult = row.processResult
      this.amendhandleNameId = row.handlerName
      this.obj.id = row.id
      this.dialogFormVisible = true
      this.obj.time = row.processTime
      // 根据用户id渲染对应的角色
      // const res = await this.$request.danger.getrole({
      //   id: id
      // })
      const res = await this.instance.get('/sysuser/getuserbyid', {
        params: {
          id: id
        }
      })
      console.log(res)
      this.amendsystmNameId = res.data.data.roleName

      // 根据角色id渲染用户列表
      const roleList = await this.addDanger.get('/sysuser/getuserinfolist', {
        params: {
          roleId: this.amendsystmNameId,
          pageNo: -1
        }
      })
      console.log(roleList)
      this.options4 = roleList.data.data.rows
      // .then(res => {
      //   console.log(res.data.data)
      // })
    },
    // 点击确定实现更新功能
    async replace() {
      await this.$refs.ruleForm.validate()
      // if (Number(this.amendhandleNameId) ===NaN)
      // const n = Number(this.amendhandleNameId)
      // console.log(isNaN(n))
      // console.log(/^[\u3220-\uFA29]+$/.test(this.amendhandleNameId))
      if (/^[\u3220-\uFA29]+$/.test(this.amendhandleNameId)) {
        this.amendhandleNameId = this.n
      } else {
        this.amendhandleNameId = this.m
      }
      // console.log(this.obj)
      // if (this.obj.level === '一般') {
      //   this.obj.level = 4
      // }
      // if (this.obj.level === '较大') {
      //   this.obj.level = 3
      // }
      // if (this.obj.level === '重大') {
      //   this.obj.level = 2
      // }
      // if (this.obj.level === '特级重大') {
      //   this.obj.level = 1
      // }
      // await this.$request.danger.replaceDanger(this.obj)
      // console.log(res.data)
      const res = await this.$request.danger.achieveOrder({
        // actualTime: '',
        // distributeTime: '',
        handlerType: this.handlerType, // 需通过物业和维保确定具体值  666666666666666666666
        // processResult: '',
        // resultTime: '',
        // states: '',
        // 隐患id
        // taskWarnId: '',
        // 工单id
        id: this.orderId,
        processTime: this.obj.time,
        maintenanceId: this.maintenanceId,
        userId: this.amendhandleNameId
      })
      console.log(res)
      this.$message({
        type: 'success',
        message: '更新成功',
        duration: 1000
      })
      // this.searchResult = '4'
      this.getDabgerInfo()
      this.dialogFormVisible = false
    },
    // 查询所有的隐患信息
    getDabgerInfo() {
      this.lookDangerInfo.actualTime = this.searchTime
      this.lookDangerInfo.level = this.searchStatus
      this.lookDangerInfo.handler = this.searchInput
      this.lookDangerInfo.workOrderStates = this.searchResult
      this.lookDangerInfo.institutionType = this.institutionType
      this.lookDangerInfo.pageNo = this.currentPage
      this.lookDangerInfo.pageSize = this.pagesize
      // console.log(this.pagesize, this.currentPage)
      this.addDanger
        .get('/taskwarn/gettaskwarnlist', {
          params: this.lookDangerInfo
        })
        .then(res => {
          console.log(res.data.data.rows)
          this.tableData = res.data.data.rows
          this.tableData.forEach(v => {
            // console.log(v.workOrderStates)
            // console.log(v.hiddangerName)
            // console.log(v)
            // if (v.level === 1) {
            //   v.name = '特级重大'
            // }
            if (v.level === 2) {
              v.name = '重大'
            }
            // if (v.level === 3) {
            //   v.name = '较大'
            // }
            if (v.level === 4) {
              v.name = '一般'
            }
            if (v.workOrderStates === '0' || v.workOrderStates === null) {
              v.resultName = '待分配'
              // this.isopen = true
              // v.one = true
              // v.two = true
              // v.three = true
              // v.xianshi = false
            }
            if (v.workOrderStates === '1') {
              v.resultName = '处理中'
              // this.isopen = true
              v.one = true
              v.two = false
              v.three = false
              v.xianshi = true
            }
            if (v.workOrderStates === '2') {
              v.resultName = '处理未确认'
              v.one = false
              v.two = false
              v.three = true
              v.xianshi = true
            }
            if (v.workOrderStates === '3') {
              v.resultName = '处理未达标'
              v.one = true
              v.two = true
              v.three = true
              v.xianshi = true
            }
            if (v.workOrderStates === '4') {
              v.resultName = '处理已确认'
              v.one = true
              v.two = true
              v.three = true
              v.xianshi = false
              // this.xianshi = false
            }
            if (v.workOrderStates === '5') {
              v.resultName = '超时未处理'
              v.one = true
              v.two = false
              v.three = false
              v.xianshi = true
            }
            v.status === 1 ? (v.order = '未派单') : (v.order = '已派单')
            v.order === '未派单' ? (v.flag = true) : (v.falg = false)
            console.log(v.order)
            if (v.order === '未派单') {
              v.one = true
              v.two = true
              v.three = true
              v.xianshi = false
            }
            // this.result = v.resultName
          })
          // console.log(this.tableData)
          this.total = res.data.data.totalCount
        })
    },
    // 新增隐患的方法
    async addRow() {
      // console.log(this.taskWarning)
      if (this.taskWarning.level === '一般') {
        this.taskWarning.level = 4
      }
      // if (this.taskWarning.level === '较大') {
      //   this.taskWarning.level = 3
      // }
      if (this.taskWarning.level === '重大') {
        this.taskWarning.level = 2
      }
      // if (this.taskWarning.level === '特级重大') {
      //   this.taskWarning.level = 1
      // }
      this.addDanger
        .post('/taskwarn/addtaskwarn', this.taskWarning)
        .then(res => {
          console.log(res.data)
          this.$message({
            type: 'success',
            message: '添加成功',
            duration: 1000
          })
        })
      this.getDabgerInfo()
      this.dialogTableVisible = false
      // console.log('add', tableData)
    },
    // 分页的功能
    currentChange(currentPage) {
      // console.log(currentPage)
      this.currentPage = currentPage
      this.getDabgerInfo()
    },
    // 切换自动或手动获取到的值
    changeMethod(value) {
      if (value === '2') {
        this.checkbox = true
        this.checkList = []
      }
      if (value === '1') {
        this.checkbox = false
      }
    },
    // 根据筛选条件进行隐患搜索
    changeStatus(value) {
      console.log(value)
      this.searchStatus = value
      this.getDabgerInfo()
    },
    changeResult(value) {
      console.log(value)
      this.searchResult = value
      this.getDabgerInfo()
    },
    // 点击查询按钮实现筛选功能
    async searchInfo() {
      this.getDabgerInfo()
    },
    // 查看工单流水的方法
    async lookOverworkOr(parameter) {
      // console.log(1)
      const res = await this.addDanger.get('/workordertrack/gettaskwarnlist', {
        params: {
          workOrderId: parameter,
          pageNo: 0,
          pageSize: 10000
        }
      })
      console.log(res.data.data.rows)
      this.itemArr = res.data.data.rows
      for (let i = this.itemArr.length - 1; i >= 0; i--) {
        console.log(this.itemArr[i])
        this.href = this.itemArr[i].descript.split(':')[1]
        console.log(this.href)
        this.pic = `http://120.55.234.38/api/getPicture?picture=${this.href}`
      }
      this.itemArr.forEach(v => {
        console.log(v.descript)
        // 显示工单处理的照片
        // console.log(this.href)
        if (v.descript === null || v.descript === '') {
          v.descript = '暂无工单流水'
        }
        v.wenzi = v.descript.split(',')[0]
        // this.href = v.descript.split(':')[1]
        // console.log(this.href)
        // this.pic = `http://120.55.234.38/api/getPicture?picture=${this.href}`
        // console.log(v.wenzi)
        // console.log(this.href)
      })
    },
    // 点击处理结果弹出不同的对话框
    clickSpan(row) {
      console.log(row)
      if (row.resultName === '处理中') {
        this.dialogVisible4 = true
        this.resulting.orderName = this.getCookie('name')
        this.resulting.phone = row.handlerPhone
        this.resulting.resultName = row.handlerName
        this.resulting.resultTime = row.processTime
        this.resulting.actualresultTime = row.actualTime
        this.resulting.orderTime = row.distributeTime
        this.resulting.resultDescribe = row.processResult
        // this.href = row.livePhoto
        this.lookOverworkOr(row.workOrderId)
      }
      if (row.resultName === '处理未确认') {
        this.dialogVisible5 = true
        this.noResult.orderName = this.getCookie('name')
        this.noResult.phone = row.handlerPhone
        this.noResult.resultName = row.handlerName
        this.noResult.resultTime = row.processTime
        this.noResult.actualresultTime = row.actualTime
        this.noResult.orderTime = row.distributeTime
        this.noResult.resultDescribe = row.processResult
        // this.href = row.livePhoto
        this.lookOverworkOr(row.workOrderId)
      }
      if (row.resultName === '处理未达标') {
        this.dialogVisible8 = true
        this.standardResult.orderName = this.getCookie('name')
        this.standardResult.phone = row.handlerPhone
        this.standardResult.resultName = row.handlerName
        this.standardResult.resultTime = row.processTime
        this.standardResult.actualresultTime = row.actualTime
        this.standardResult.orderTime = row.distributeTime
        this.standardResult.resultDescribe = row.processResult
        // this.href = row.livePhoto
        this.lookOverworkOr(row.workOrderId)
      }
      if (row.resultName === '超时未处理') {
        this.dialogVisible9 = true
        this.overtimeResult.orderName = this.getCookie('name')
        this.overtimeResult.phone = row.handlerPhone
        this.overtimeResult.resultName = row.handlerName
        this.overtimeResult.resultTime = row.processTime
        this.overtimeResult.actualresultTime = row.actualTime
        this.overtimeResult.orderTime = row.distributeTime
        this.overtimeResult.resultDescribe = row.processResult
        // this.href = row.livePhoto
        this.lookOverworkOr(row.workOrderId)
      }
      if (row.resultName === '处理已确认') {
        this.dialogVisible6 = true
        this.resultFinish.orderName = this.getCookie('name')
        this.resultFinish.phone = row.handlerPhone
        this.resultFinish.resultName = row.handlerName
        this.resultFinish.resultTime = row.processTime
        this.resultFinish.actualresultTime = row.actualTime
        this.resultFinish.orderTime = row.distributeTime
        this.resultFinish.resultDescribe = row.processResult
        // this.href = row.livePhoto
        this.lookOverworkOr(row.workOrderId)
      }
    },
    // 点击审核对话框中的确认按钮
    async noResulting() {
      const num = this.examineValue
      this.workOrder.processResult = this.examineTextarea
      this.workOrder.states = this.examineValue
      console.log(this.workOrder)
      if (num === '3') {
        // 调用审核工单接口
        if (this.examineTextarea === '') {
          this.$message({
            type: 'error',
            message: '请填写审核不通过原因',
            duration: 1500
          })
          return
        }
        const res = await this.$request.danger.examineworkorder(this.workOrder)
        this.$message({
          type: 'success',
          message: '审核成功',
          duration: 1000
        })
        console.log(res)
      }
      if (num === '4') {
        console.log(this.workOrder)
        // 先调用审核接口
        await this.$request.danger.examineworkorder(this.workOrder)
        console.log('审核了')
        // 调用完成工单接口
        const id = this.workOrder.id
        console.log(id)
        const res = await this.$request.danger.completeworkorder({ id })
        // const res = await this.addDanger.put('/workorder/completeworkorder', {
        //   id: id
        // })
        this.$message({
          type: 'warning',
          message: res.msg,
          duration: 1000
        })
        console.log(res)
      }
      this.dialogVisible7 = false
      this.getDabgerInfo()
      console.log(this.examineValue)
    },
    // 点击审核弹出对话框
    orderExamine(row) {
      console.log(row)
      this.dialogVisible7 = true
      this.examineOrder.orderName = this.getCookie('name')
      this.examineOrder.phone = row.handlerPhone
      this.examineOrder.resultName = row.handlerName
      this.examineOrder.resultTime = row.processTime
      this.examineOrder.orderTime = row.distributeTime
      this.examineOrder.resultDescribe = row.processResult
      this.workOrder.id = row.workOrderId
      this.workOrder.propertyId = row.propertyId
      // this.href = row.livePhoto
      this.lookOverworkOr(row.workOrderId)
      // this.maintenanceId = row.maintenanceId
    },
    // 撤销工单
    async orderDelete(row) {
      console.log(row)
      try {
        await this.$confirm('你确定要撤销该工单吗？', '温馨提示', {
          type: 'warning'
        })
        // 发送请求
        await this.$request.danger.orderDelete({
          id: row.workOrderId,
          handlerType: row.handlerType,
          maintenanceId: row.maintenanceId,
          taskWarnId: row.id
        })
        this.$message({
          type: 'success',
          message: '撤销成功',
          duration: 1000
        })
        // 页面重构
        await this.getDabgerInfo()
      } catch (e) {
        this.$message({
          type: 'info',
          message: '取消撤销',
          duration: 1000
        })
      }
    },
    // 预览图片的预览功能
    async lookPicture() {
      // console.log(this.examineObj.three)
      // console.log(this.examineObj.three.indexOf('.') != -1)
      if (this.examineObj.three.indexOf('.') != -1) {
        // const res = await this.addDanger.get('')
        this.dangerHref = `http://120.55.234.38/api/getPicture?picture=${this.examineObj.three}`
      } else {
        // console.log(2)
        // 添加随机数防止浏览器缓存
        console.log(this.picObj)
        const res = await this.addDanger.get(
          '/taskwarn/getiotpictureUrl',
          // `/taskwarn/getiotpictureUrl?r=${Math.random()}`,
          {
            params: this.picObj
          }
        )
        console.log(res.data.data)
        this.dangerHref = res.data.data
      }
    }
  }
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
  box-sizing: border-box;
  background: #fff;
  margin-top: -17px;
  user-select: none;
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
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
      .Hidden {
        margin-top: 3%;
        padding-right: 2%;
        display: inline-block;
      }
    }

    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }

    .main-header {
      display: flex;
      align-items: center;
      margin: 20px 0;

      .add {
        color: #fff;
        background: rgba(17, 125, 221, 1);
      }

      .search {
        display: flex;
        margin-left: auto;
      }

      .search * {
        margin-left: 10px;
      }
    }
  }

  .add-foot {
    border-top: 1px solid #eeee;
    width: 1200px;

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
.lookOver {
  cursor: pointer;
  color: #117ddd;
  // font-weight: bold;
}
.overAll {
  cursor: pointer;
  color: #117ddd;
  // font-weight: bold;
}
.noOrder {
  cursor: pointer;
  color: orange;
  // font-weight: bold;
}
.select {
  width: 35%;
  margin-right: 20px;
}
// 对话框的样式
/deep/.el-dialog__body {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 0px;
}
/deep/.el-checkbox {
  width: 24%;
}
.mini {
  width: 13%;
}
.headerSpan {
  font-size: 14px;
  color: #909399;
  font-weight: bold;
  margin-left: 10px;
}
.date {
  width: 19%;
}
.flr {
  float: right;
}
.amendSpan {
  color: #0080d0;
  cursor: pointer;
}
.resultName {
  cursor: pointer;
}
.resultForm {
  width: 50%;
  float: left;
}
.resultFormOne {
  overflow: hidden;
}
/deep/.el-table th > .cell {
  text-align: left;
}
/deep/.el-table .cell {
  text-align: left;
  padding-left: 0px;
}
.noResultValue {
  width: 35%;
}
.examineSpan {
  color: #909399;
  cursor: pointer;
}
.selectTime {
  width: 47%;
}
.download {
  // text-decoration: none;
  color: #117ddd;
}
.open {
  display: none;
}
.examine {
  display: none;
}
.amend {
  display: none;
}
.none {
  display: none;
}
.search {
  margin-left: 10px;
}
.img {
  width: 90%;
}
</style>
