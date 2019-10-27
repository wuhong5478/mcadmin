<template>
  <div id="app">
    <el-header style="background:#fff;">
      <div style="float: right">
        模型名称:
        <el-input placeholder="请输入内容" v-model="pageQuery.modelName" clearable style="width: 240px" size="small" class="filter-item">
          <el-button slot="append" icon="el-icon-search" @click="handleFilter"></el-button>
        </el-input>
        分析类型:
        <el-select v-model="pageQuery.analysisName"
                   placeholder="请选择"
                   clearable
                   class="filter-item" size="small"
        >
          <el-option v-for="item in typeList" :key="item.id" :label="item.typeName" :value="item.typeName" />
        </el-select>
        <el-button type="primary" @click="handleAdd" size="mini">新增</el-button>
      </div>
    </el-header>
    <el-table v-loading="listLoading" :data="list" style="width: 100%" stripe>
      <el-table-column prop="modelName" label="模型名称"/>
      <el-table-column prop="analysisName" label="分析类型"/>
      <el-table-column prop="" label="分析单位" :formatter="unitFormat"/>
      <el-table-column prop="createTime" label="创建时间" :formatter="dateFormat"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="amendSpan" @click="handleCheck(scope.row)">查看</span>|
          <span class="amendSpan" @click="handleDelete(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center">
      <el-pagination
              background
              layout="prev, pager, next,total"
              :total="total"
              :page-size="pageQuery.pageSize"
              :current-page.sync="pageQuery.pageNo"
              @current-change="currentChange"
      ></el-pagination>
    </div>
    <el-dialog title="新增分析模型" :visible.sync="dialogFormVisible" width="40%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="90px">
        <el-form-item label="模型名称:" prop="modelName">   
          <el-input v-model="temp.modelName" placeholder="请输入模型名称" style="width: 60%" />
        </el-form-item>
        <el-form-item label="模型类型:" prop="analysisId">
          <el-select v-model="temp.analysisId" placeholder="请选择" @change="showRow" clearable class="filter-item">
            <el-option v-for="item in typeList" :key="item.id" :label="item.typeName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-row v-if="rowVisible===70">
          <el-row>
              <el-form-item label="行业:" prop="industryId">
                  <el-select v-model="temp.industryId" @change="findParks" placeholder="请选择" clearable class="filter-item">
                      <el-option v-for="item in industryList" :key="item.typeValue" :label="item.typeName" :value="item.typeValue" />
                  </el-select>
              </el-form-item>
          </el-row>
          <el-row>
              <el-form-item label="所属园区:" prop="parkId">
                  <el-select v-model="temp.parkId" @change="findBuildings" placeholder="请选择" clearable class="filter-item">
                      <el-option v-for="item in parkList" :key="item.areaId" :label="item.areaName" :value="item.areaId" />
                  </el-select>
              </el-form-item>
          </el-row>
          <el-row>
              <el-form-item label="所属楼宇:" prop="architectureId">
                  <el-select v-model="temp.architectureId" placeholder="请选择" clearable class="filter-item">
                      <el-option v-for="item in buildingList" :key="item.id" :label="item.architectureName" :value="item.id" />
                  </el-select>
              </el-form-item>
          </el-row>
        </el-row>
        <el-row v-if="rowVisible===71">
          <el-row>
              <el-form-item label="所属园区:" prop="parkId">
                  <el-select v-model="temp.parkId" @change="findBuildings" placeholder="请选择" clearable class="filter-item">
                      <el-option v-for="item in parkList" :key="item.areaId" :label="item.areaName" :value="item.areaId" />
                  </el-select>
              </el-form-item>
          </el-row>
        </el-row>
        <el-row v-if="rowVisible===72">
          <el-row>
              <el-form-item label="所属园区:" prop="parkId">
                  <el-select v-model="temp.parkId" @change="findBuildings" placeholder="请选择" clearable class="filter-item">
                      <el-option v-for="item in parkList" :key="item.areaId" :label="item.areaName" :value="item.areaId" />
                  </el-select>
              </el-form-item>
          </el-row>
          <el-row>
              <el-form-item label="所属楼宇:" prop="architectureId">
                  <el-select v-model="temp.architectureId" placeholder="请选择" clearable class="filter-item">
                      <el-option v-for="item in buildingList" :key="item.id" :label="item.architectureName" :value="item.id" />
                  </el-select>
              </el-form-item>
          </el-row>
          <el-row>
              <el-col :span="10">
                  <el-form-item label="隐患时间:" prop="beginTime">
                      <el-date-picker
                              v-model="temp.beginTime"
                              type="date"
                              placeholder="选择时间"
                              value-format="yyyy-MM-dd"
                              style="width: 200px;" size="small"
                      />
                  </el-form-item>
              </el-col>
              <el-col :span="10">
                  <el-form-item prop="endTime">
                      <el-date-picker
                              v-model="temp.endTime"
                              type="date"
                              placeholder="选择时间"
                              value-format="yyyy-MM-dd"
                              style="width: 200px;" size="small"
                      />
                  </el-form-item>
              </el-col>
          </el-row>
        </el-row>
        <el-row v-if="rowVisible===73">
          <el-row>
              <el-form-item label="所属园区:" prop="parkId">
                  <el-select v-model="temp.parkId" @change="findBuildings" placeholder="请选择" clearable class="filter-item">
                      <el-option v-for="item in parkList" :key="item.areaId" :label="item.areaName" :value="item.areaId" />
                  </el-select>
              </el-form-item>
          </el-row>
          <el-row>
              <el-form-item label="所属楼宇:" prop="architectureId">
                  <el-select v-model="temp.architectureId" placeholder="请选择" clearable class="filter-item">
                      <el-option v-for="item in buildingList" :key="item.id" :label="item.architectureName" :value="item.id" />
                  </el-select>
              </el-form-item>
          </el-row>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="addData()">
          保存
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="行业隐患统计分析" :visible.sync="dialogIndustry" width="100%">
      <div style="padding-left: 95%">
        <el-button type="primary" @click="getPdf('industryAnalysis')" size="mini">导出</el-button>
      </div>
      <div style="background-color: #f0f0f0;padding-top: 20px;" id="industryAnalysis">
        <el-row :gutter="20" style="height: 200px;">
          <el-col :span="6">
            <div class="titleMin">本月隐患数量</div>
            <div class="numberMid"><b class="font36">{{ totalCount }}</b>次</div>
            <div class="descMin">今日隐患数量 {{ dayCount }}</div>
          </el-col>
          <el-col :span="6">
            <div class="titleMin">人工上报隐患</div>
            <div class="numberMid"><b class="font36">{{ reportTotal }}</b>个</div>
            <div class="descMin" style="padding-top: 0; height:75px" id="chartReport"></div>
          </el-col>
          <el-col :span="6">
            <div class="titleMin">超时隐患</div>
            <div class="numberMid"><b class="font36">{{ generalTimeOut+seriousTimeOut }}</b>次</div>
            <div class="descMin">
              <el-col :span="12">一般隐患 {{ generalTimeOut }}</el-col>
              <el-col :span="12">重大隐患 {{ seriousTimeOut }}</el-col>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="height: 185px; background-color: #ffffff">
              <div class="titleMin">隐患处置率</div>
              <el-col :span="12"><div class="numberMid" style="padding-left: 0"><b class="font36">{{ percentage }}</b>%</div></el-col>
              <el-col :span="12">
                <div style="padding-left: 20px">
                  <el-progress type="circle" :percentage=percentage :show-text=false :width=90 :stroke-width=12 color=#00CED1></el-progress>
                </div>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="height: 400px; padding-top: 20px">
          <el-col :span="12">
            <el-row>
              <div class="titleMin"><b class="font14">隐患等级分析</b></div>
              <hr class="hr-100width">
              <el-col :span="12">
                <div class="titleMin" style="padding-left: 100px">当月一般隐患</div>
                <div class="numberMid" style="padding-left: 100px"><b class="font24">{{ dangerGradeMin }}</b>次</div>
              </el-col>
              <td></td>
              <el-col :span="12" style="border-left:1px solid #F5F5F5;">
                <div class="titleMin" style="padding-left: 100px">当月重大隐患</div>
                <div class="numberMid" style="padding-left: 100px"><b class="font24">{{ dangerGradeMax }}</b>次</div>
              </el-col>
            </el-row>
            <div id="chartDangerGrade" class="chartMid"></div>
          </el-col>
          <el-col :span="12">
            <div>
              <div class="titleMin"><b class="font14">隐患总数变化趋势</b></div>
              <hr class="hr-100width">
              <div id="chartDangerTotal" class="chartMin"></div>
            </div>
            <div style="padding-top: 18px">
              <div class="titleMin"><b class="font14">隐患处置事件</b></div>
              <hr class="hr-100width">
              <div id="chartDangerDeal" class="chartMin"></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="height: 290px;">
          <el-col :span="12">
            <div class="titleMin"><b class="font14">隐患来源分析</b></div>
            <hr class="hr-100width">
            <div id="chartDangerSource" class="chartMid" style="height: 220px"></div>
          </el-col>
          <el-col :span="12">
            <div class="titleMin"><b class="font14">园区行业隐患统计</b></div>
            <hr class="hr-100width">
            <div id="chartDangerTrade" class="chartMid" style="height: 220px"></div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="height: 300px;">
          <el-col :span="12">
            <div class="titleMin"><b class="font14">解决隐患时长统计</b></div>
            <hr class="hr-100width">
            <div id="chartDealTime" class="chartMid" style="height: 220px"></div>
          </el-col>
          <el-col :span="12">
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <el-dialog title="小镇区域隐患统计分析" :visible.sync="dialogTown" width="100%">
      <div style="padding-left: 95%">
        <el-button type="primary" @click="getPdf('townAnalysis')" size="mini">导出</el-button>
      </div>
      <div style="background-color: #f0f0f0;padding-top: 20px;" id="townAnalysis">
        <el-row :gutter="20" style="height: 200px;">
          <el-col :span="6">
            <div class="titleMin">本月隐患数量</div>
            <div class="numberMid"><b class="font36">{{ totalCount }}</b>次</div>
            <div class="descMin">今日隐患数量 {{ dayCount }}</div>
          </el-col>
          <el-col :span="6">
            <div class="titleMin">人工上报隐患</div>
            <div class="numberMid"><b class="font36">{{ reportTotal }}</b>个</div>
            <div class="descMin" style="padding-top: 0; height:75px" id="chartReportTown"></div>
          </el-col>
          <el-col :span="6">
            <div class="titleMin">超时隐患</div>
            <div class="numberMid"><b class="font36">{{ generalTimeOut+seriousTimeOut }}</b>次</div>
            <div class="descMin">
              <el-col :span="12">一般隐患 {{ generalTimeOut }}</el-col>
              <el-col :span="12">重大隐患 {{ seriousTimeOut }}</el-col>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="height: 185px; background-color: #ffffff">
              <div class="titleMin">隐患处置率</div>
              <el-col :span="12"><div class="numberMid" style="padding-left: 0"><b class="font36">{{ percentage }}</b>%</div></el-col>
              <el-col :span="12">
                <div style="padding-left: 20px">
                  <el-progress type="circle" :percentage=percentage :show-text=false :width=90 :stroke-width=12 color=#00CED1></el-progress>
                </div>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row style="padding-top: 20px">
          <div>
            <el-col :span="15">
              <div class="titleMin"><b class="font14">园区统计分析</b></div>
            </el-col>
            <el-col :span="1">
              <div class="titleMin"></div>
            </el-col>
            <el-col :span="3">
              <div class="titleMin"><b class="font14">建筑名称</b></div>
            </el-col>
            <el-col :span="2">
              <div class="titleMin"><b class="font14">隐患数量</b></div>
            </el-col>
            <el-col :span="3">
              <div class="titleMin"><b class="font14">处置率</b></div>
            </el-col>
            <hr class="hr-100width">
            <el-col :span="15">
              <div class="titleMin">隐患总数 <b class="font14">{{ buildTotal }}</b></div>
              <div id="chartBuilding" class="chartMax"></div>
            </el-col>
            <el-col :span="9" style="height: 275px; overflow-y:auto;background-color: #ffffff">
              <div v-for="(item,index) in buildTotalData"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                <el-row style="height: 30px">
                  <el-col :span="4" style="padding-left: 20px">
                    {{ index + 1 }}
                  </el-col>
                  <el-col :span="10">
                    {{ item.type }}
                  </el-col>
                  <el-col :span="5">
                    {{ item.count }}
                  </el-col>
                  <el-col :span="5">
                    <b style="color: #8EEF86">{{ item.percentage }}%</b>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </div>
        </el-row>
        <el-row :gutter="20" style="height: 400px;padding-top: 20px">
          <el-col :span="12">
            <el-row>
              <div class="titleMin"><b class="font14">隐患等级分析</b></div>
              <hr class="hr-100width">
              <el-col :span="12">
                <div class="titleMin" style="padding-left: 100px">当月一般隐患</div>
                <div class="numberMid" style="padding-left: 100px"><b class="font24">{{ dangerGradeMin }}</b>次</div>
              </el-col>
              <td></td>
              <el-col :span="12" style="border-left:1px solid #F5F5F5;">
                <div class="titleMin" style="padding-left: 100px">当月重大隐患</div>
                <div class="numberMid" style="padding-left: 100px"><b class="font24">{{ dangerGradeMax }}</b>次</div>
              </el-col>
            </el-row>
            <div id="chartDangerGradeTown" class="chartMid"></div>
          </el-col>
          <el-col :span="12">
            <div>
              <div class="titleMin"><b class="font14">隐患总数变化趋势</b></div>
              <hr class="hr-100width">
              <div id="chartDangerTotalTown" class="chartMin"></div>
            </div>
            <div style="padding-top: 18px">
              <div class="titleMin"><b class="font14">隐患处置事件</b></div>
              <hr class="hr-100width">
              <div id="chartDangerDealTown" class="chartMin"></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="height: 300px;">
          <el-col :span="12">
            <div class="titleMin"><b class="font14">隐患来源分析</b></div>
            <hr class="hr-100width">
            <div id="chartDangerSourceTown" class="chartMid" style="height: 220px"></div>
          </el-col>
          <el-col :span="12">
            <div class="titleMin"><b class="font14">园区行业隐患统计</b></div>
            <hr class="hr-100width">
            <div id="chartDangerTradeTown" class="chartMid" style="height: 220px"></div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="height: 300px;">
          <el-col :span="12">
            <div class="titleMin"><b class="font14">解决隐患时长统计</b></div>
            <hr class="hr-100width">
            <div id="chartDealTimeTown" class="chartMid" style="height: 220px"></div>
          </el-col>
          <el-col :span="12">
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <el-dialog title="历史隐患统计分析" :visible.sync="dialogHistory" width="100%">
      <div style="padding-left: 95%">
        <el-button type="primary" @click="getPdf('historyAnalysis')" size="mini">导出</el-button>
      </div>
      <div style="background-color: #f0f0f0;padding-top: 20px;" id="historyAnalysis">
        <el-row :gutter="20" style="height: 200px;">
          <el-col :span="6">
            <div class="titleMin">本月隐患数量</div>
            <div class="numberMid"><b class="font36">{{ totalCount }}</b>次</div>
            <div class="descMin">今日隐患数量 {{ dayCount }}</div>
          </el-col>
          <el-col :span="6">
            <div class="titleMin">人工上报隐患</div>
            <div class="numberMid"><b class="font36">{{ reportTotal }}</b>个</div>
            <div class="descMin" style="padding-top: 0; height:75px" id="chartReportHistory"></div>
          </el-col>
          <el-col :span="6">
            <div class="titleMin">超时隐患</div>
            <div class="numberMid"><b class="font36">{{ generalTimeOut+seriousTimeOut }}</b>次</div>
            <div class="descMin">
              <el-col :span="12">一般隐患 {{ generalTimeOut }}</el-col>
              <el-col :span="12">重大隐患 {{ seriousTimeOut }}</el-col>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="height: 185px; background-color: #ffffff">
              <div class="titleMin">隐患处置率</div>
              <el-col :span="12"><div class="numberMid" style="padding-left: 0"><b class="font36">{{ percentage }}</b>%</div></el-col>
              <el-col :span="12">
                <div style="padding-left: 20px">
                  <el-progress type="circle" :percentage=percentage :show-text=false :width=90 :stroke-width=12 color=#00CED1></el-progress>
                </div>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="height: 450px;padding-top: 20px">
          <el-col :span="8">
            <div class="titleMin"><b class="font14">隐患等级分析</b></div>
            <div id="chartDangerGradeHistory" class="chartMin" style="height: 140px"></div>
            <div style="height: 20px"></div>
            <div style="background-color: #ffffff; height: 195px">
              <div class="titleMin"><b class="font14">隐患来源分析</b></div>
              <div id="chartState" class="chartMin">
                <div style="padding-left: 20px;height: 100px">
                  <el-col :span="8" style="padding-left: 20px">
                    <el-progress type="circle" :percentage=equipmentDanger :width=90></el-progress>
                  </el-col>
                  <el-col :span="8" style="padding-left: 12px">
                    <el-progress type="circle" :percentage=inspectionDanger :width=90></el-progress>
                  </el-col>
                  <el-col :span="8" style="padding-left: 0">
                    <el-progress type="circle" :percentage=artificialDanger :width=90></el-progress>
                  </el-col>
                </div>
                <div style="font-size: 12px;padding-top: 0;height: 20px">
                  <el-col :span="8" style="padding-left: 14%">设备隐患</el-col>
                  <el-col :span="8" style="padding-left: 10%">巡检隐患</el-col>
                  <el-col :span="8" style="padding-left: 6%">人工上报</el-col>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <div>
              <div class="titleMin"><b class="font14">隐患总数变化趋势</b></div>
              <hr class="hr-100width">
              <div id="chartDangerTotalHistory" class="chartMin" style="height: 140px;"></div>
            </div>
            <div style="padding-top: 20px">
              <div class="titleMin"><b class="font14">隐患处置事件</b></div>
              <hr class="hr-100width">
              <div id="chartDangerDealHistory" class="chartMin" style="height: 140px;"></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>


    <el-dialog title="合规运行分析分析" :visible.sync="dialogCompliance" width="100%">
      <div style="padding-left: 95%">
        <el-button type="primary" @click="getPdf('complianceAnalysis')" size="mini">导出</el-button>
      </div>
      <div style="background-color: #f0f0f0;padding-top: 20px;" id="complianceAnalysis">
        <el-row :gutter="20" style="height: 200px">
          <el-col :span="6">
            <div class="titleMin">园区得分</div>
            <div class="numberMid"><b class="font36">{{ parkGrade }}</b>分</div>
            <div class="descMin">上月园区得分 {{ preParkGrade }}</div>
          </el-col>
          <el-col :span="6">
            <div class="titleMin">隐患数量</div>
            <div class="numberMid"><b class="font36">{{ dangerCount }}</b>个</div>
            <div class="descMin" style="padding-top: 0px; height:75px" id="chartTaskNum"></div>
          </el-col>
          <el-col :span="6">
            <div class="titleMin">火警数量</div>
            <div class="numberMid"><b class="font36">{{ fireCount}}</b>次</div>
            <div class="descMin" style="padding-top: 0px; height:75px" id="chartFire"></div>
          </el-col>
          <el-col :span="6" style="height: 185px; background-color: #ffffff">
            <div>
              <div class="titleMin">设备完好率</div>
              <el-col :span="12"><div class="numberMid" style="padding-left: 0;"><b class="font36">{{ wellPercent }}</b>%</div></el-col>
              <el-col :span="12">
                <div style="padding-left: 30px">
                  <el-progress type="circle" :percentage=wellPercent :show-text=false :width=90 :stroke-width=12 color=#00FF00></el-progress>
                </div>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <div class="titleMin"><b class="font14">月巡检数量</b></div>
              <hr class="hr-100width">
              <div id="chartMonthGNum"  class="chartMax"></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <div class="titleMin"><b class="font14">月维保数量</b></div>
              <hr class="hr-100width">
              <div id="chartMonthWNum"  class="chartMax"></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="padding-top: 20px">
          <el-col :span="12">
            <div style="height: 290px;">
              <div class="titleMin"><b class="font14">火警数量波动</b></div>
              <hr class="hr-100width">
              <div id="chartFireWave" class="chartMax"></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="height: 290px">
              <div class="titleMin"><b class="font14">触达及到场率</b></div>
              <hr class="hr-100width">
              <div id="chartTouch" class="chartMax"></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="height: 650px;padding-top: 10px">
          <el-col :span="12">
            <el-row>
              <div class="titleMin"><b class="font14">隐患等级分析</b></div>
              <hr class="hr-100width">
              <el-col :span="12">
                <div class="titleMin" style="padding-left: 100px">当月一般隐患</div>
                <div class="numberMid" style="padding-left: 100px"><b class="font24">{{ dangerGradeMinCompliance }}</b>次</div>
              </el-col>
              <td></td>
              <el-col :span="12" style="border-left:1px solid #F5F5F5;">
                <div class="titleMin" style="padding-left: 100px">当月重大隐患</div>
                <div class="numberMid" style="padding-left: 100px"><b class="font24">{{ dangerGradeMaxCompliance }}</b>次</div>
              </el-col>
            </el-row>
            <div id="chartDangerGradeCompliance" class="chartMid"></div>
            <div style="padding-top: 20px">
              <div class="titleMin"><b class="font14">隐患处置率</b></div>
              <hr class="hr-100width">
              <div id="chartDangerDealCompliance" style="height: 170px" class="chartMin"></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="titleMin"><b class="font14">隐患来源分析</b></div>
            <hr class="hr-100width">
            <div id="chartDangerSourceCompliance" class="chartMid" style="height: 260px;"></div>
            <div style="padding-top: 20px">
              <div class="titleMin"><b class="font14">设备完好数量</b></div>
              <hr class="hr-100width">
              <div id="chartWellNum"  class="chartMax"></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import moment from 'moment'
  import request from '@/api/request'
  export default {
    data() {
      return {
        htmlTitle: '隐患分析模型',
        listLoading: false,
        list: [],
        typeList: [],
        industryList: [],
        buildingList: [],
        parkList: [
          {areaName: '国际会展中心二期', areaId: '1106'},
          {areaName: '中大产业园', areaId: '1107'},
          {areaName: '润丰产业园', areaId: '1108'},
          {areaName: '鹏辉产业园', areaId: '1109'},
          {areaName: '国际会展中心一期', areaId: '1110'}
        ],
        total: 0,
        pageQuery: {
          pageNo: 1,
          pageSize: 10,
          modelName: undefined,
          analysisName: undefined
        },
        temp: {
          id: undefined,
          modelName: '',
          analysisId: '',
          createTime: '',
          parkId: '',
          architectureId: '',
          industryId: '',
          beginTime: '',
          endTime: '',
        },
        rules: {},
        dialogFormVisible: false,
        dialogIndustry: false,
        dialogTown: false,
        dialogHistory: false,
        dialogCompliance: false,
        rowVisible: '',
        optionReport: {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            x: 0,
            x2: 10,
            y: 0,
            height: 50
          },
          xAxis: {
            type: 'category',
            data: [],
            show: false
          },
          yAxis: {
            type: 'value',
            show: false
          },
          series: [{
            data: [],
            type: 'bar',
            barWidth: '40%',
            itemStyle: {
              normal: {
                color: '#1E90FF'
              }
            }
          }]
        },
        optionBuilding : {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            x: 40,
            x2: 20,
            y: 30,
            height: 160
          },
          xAxis: {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: {
                color:'#DCDCDC',
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000000',
              }
            }
          },
          yAxis: {
            axisLine: {show:false},
            axisTick: {show:false},
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#DCDCDC'
              },
              show: true
            },
            type: 'value',
          },
          series: [{
            data: [],
            type: 'bar',
            barWidth: '30%',
            itemStyle: {
              normal: {
                color: '#BA55D3'
              }
            }
          }]
        },
        optionDangerGrade: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [],
            show: false
          },
          grid: {
            x: 60,
            x2: 20,
            y: 10,
            height: 150
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine: {
              lineStyle: {
                color: '#DCDCDC',
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000000',
              }
            }
          },
          yAxis: {
            axisLine: {show:false},
            axisTick: {show:false},
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#DCDCDC'
              },
              show: true
            },
            type: 'value'
          },
          series: [
            {
              name:'一般隐患',
              symbol: 'none',
              color: '#4169E1',
              type: 'line',
              stack: '',
              data: []
            },
            {
              name: '重大隐患',
              symbol: 'none',
              color: '#F08080',
              type: 'line',
              stack: '',
              data: []
            }
          ]
        },
        optionDangerGradeHistory:{
          tooltip: {
            trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
              x: 'right',
              y2: 10,
              data: ['一般隐患','重大隐患'],
              icon: "circle",
              itemWidth: 10,  // 设置宽度
              itemHeight: 10, // 设置高度
              itemGap: 5 // 设置间距
          },
          series: [
            {
              name:'隐患等级',
              type:'pie',
              radius: ['50%', '100%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 0, name: '一般隐患'},
                {value: 0, name: '重大隐患'}
              ]
            }
          ]
        },
        optionDangerTotal: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [''],
            show: false
          },
          grid:{
            x: 60,
            x2: 20,
            y: 15,
            height: 75
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine: {
              lineStyle: {
                color: '#DCDCDC',
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000000',
              }
            }
          },
          yAxis: {
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#DCDCDC'
              },
              show: true
            },
            type: 'value'
          },
          series: [
            {
              type: 'line',
              symbol: 'none',
              smooth: true,
              data: [],
              markLine: {
                symbol: 'none',
                silent: true,
                data: [[
                  {coord: ['',0]},
                  {coord: ['',0]}
                ]],
                label:{
                  normal: {
                    formatter: '预测趋势'
                  }
                },
                lineStyle: {
                  show: true,
                  color: '#808C94',
                  type: 'dashed'
                }
              }
            }
          ]
        },
        optionDangerDeal: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [''],
            show: false
          },
          grid: {
            x: 60,
            x2: 20,
            y: 10,
            height: 80
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine: {
              lineStyle: {
                color: '#DCDCDC',
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000000',
              }
            }
          },
          yAxis: {
            axisLine: {show:false},
            axisTick: {show:false},
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#DCDCDC'
              },
              show: true
            },
            type: 'value'
          },
          series: [
            {
              type: 'line',
              symbol: 'none',
              color: '#8EEF86',
              data: []
            }
          ]
        },
        optionDangerSource: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [],
            show: true,
            top: 10,
            left: 20,
            icon: 'rect'
          },
          grid: {
            x: 60,
            x2: 20,
            y: 40,
            height: 150
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine: {
              lineStyle: {
                color: '#DCDCDC',
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000000',
              }
            }
          },
          yAxis: {
            axisLine: {show:false},
            axisTick: {show:false},
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#DCDCDC'
              },
              show: true
            },
            type: 'value'
          },
          series: [
            {
              name: '',
              symbol: 'none',
              color: '#4169E1',
              type: 'line',
              stack: '',
              data: []
            },
            {
              name: '',
              symbol: 'none',
              color: '#8EEF86',
              type: 'line',
              stack: '',
              data: []
            },
            {
              name: '',
              symbol: 'none',
              color: '#9370DB',
              type:'line',
              stack: '',
              data: []
            }
          ]
        },
        optionDangerTrade: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [],
            show: true,
            top: 0,
            left: 20,
            icon:'rect'
          },
          grid: {
            x: 60,
            x2: 20,
            y: 50,
            height: 140
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine: {
              lineStyle: {
                color:'#DCDCDC',
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000000',
              }
            }
          },
          yAxis: {
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#DCDCDC'
              },
              show:true
            },
            type: 'value'
          },
          series: [
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] },
            {name: '', symbol: 'none', color: '', type: 'line',  stack: '', smooth: true, data: [] }
          ]
        },
        optionDealTime : {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            x: 40,
            x2: 20,
            y: 30,
            height: 160
          },
          xAxis: {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: {
                color:'#DCDCDC',
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000000',
              }
            }
          },
          yAxis: {
            axisLine: {show:false},
            axisTick: {show:false},
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#DCDCDC'
              },
              show: true
            },
            type: 'value',
          },
          series: [{
            data: [],
            type: 'bar',
            barWidth: '30%',
            itemStyle: {
              normal: {
                color: '#9370DB'
              }
            }
          }]
        },
        dayCount: 0,
        totalCount: 0,
        reportXData: [],
        reportYData: [],
        reportTotal: 0,
        generalTimeOut: 0,
        seriousTimeOut: 0,
        percentage: 0,
        buildTotal: 0,
        buildTotalData: [],
        buildXData: [],
        buildYData: [],
        dangerGradeMin: 0,
        dangerGradeMid: 0,
        dangerGradeMax: 0,
        equipmentDanger: 0,
        inspectionDanger: 0,
        artificialDanger: 0,

        //以下是 合规运行分析

        parkGrade: 0,
        preParkGrade: 0,
        dangerCount: 0,
        fireCount: 0,
        wellPercent: 0,
        optionTaskNum: {
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          title: {
            left: 'center',
            text: '',
          },
          grid:{
            x:0,
            x2:10,
            y:0,
            height:50
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            show: false
          },
          yAxis: {
            type: 'value',
            show: false,
            boundaryGap: [0, '100%']
          },
          series: [
            {
              name:'隐患数量',
              type:'line',
              smooth:true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                color: '#FFA07A'
              },
              areaStyle: {
                color: '#F4A460'
              },
              data: []
            }
          ]
        },
        optionFire: {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            x: 0,
            x2: 10,
            y: 0,
            height: 50
          },
          xAxis: {
            type: 'category',
            data: [],
            show : false
          },
          yAxis: {
            type: 'value',
            show : false
          },
          series: [{
            data: [],
            name: '火警数量',
            type: 'bar',
            barWidth: '40%',
            itemStyle: {
              normal: {
                color : '#DC143C'
              }
            }
          }]
        },
        optionParkGrade: {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            x: 40,
            x2: 40,
            y: 40,
            height: 150
          },
          xAxis: {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: {
                color: '#DCDCDC',
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000000',
              }
            }
          },
          yAxis: {
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#DCDCDC'
              },
              show: true
            },
            type: 'value',
          },
          series: [
            {
              data: [],
              type: 'bar',
              barWidth: '30%',
              itemStyle: {
                normal: {
                  color : '#1E90FF'
                }
              }
            }
          ]
        },
        optionFireWave: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [],
            show: false,
            top: 10,
            left: 20,
            icon:'rect'
          },
          grid:{
            x: 60,
            x2: 20,
            y: 40,
            height: 150
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine: {
              lineStyle: {
                color: '#DCDCDC',
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000000',
              }
            }
          },
          yAxis: {
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#DCDCDC'
              },
              show: true
            },
            type: 'value',
          },
          series: [
            {
              name: '数量',
              symbol: 'none',
              color: '#1E90FF',
              type: 'line',
              stack: '',
              data: []
            }
          ]
        },
        optionDangerGradeCompliance: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [],
            show: false
          },
          grid: {
            x: 60,
            x2: 20,
            y: 10,
            height: 150
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine: {
              lineStyle: {
                color: '#DCDCDC',
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000000',
              }
            }
          },
          yAxis: {
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#DCDCDC'
              },
              show: true
            },
            type: 'value'
          },
          series: [
            {
              name:'',
              symbol: 'none',
              color: '#4169E1',
              type: 'line',
              stack: '',
              data: []
            },
            {
              name: '',
              symbol: 'none',
              color: '#F08080',
              type: 'line',
              stack: '',
              data: []
            }
          ]
        },
        dangerGradeMinCompliance: 0,
        dangerGradeMaxCompliance: 0,
        optionDangerDealCompliance: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [],
            show: false
          },
          grid: {
            x: 60,
            x2: 20,
            y: 5,
            height: 130
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine: {
              lineStyle: {
                color: '#DCDCDC',
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000000',
              }
            }
          },
          yAxis: {
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#DCDCDC'
              },
              show: true
            },
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value}%'
            },
            type: 'value'
          },
          series: [
            {
              name:'',
              symbol: 'none',
              color: '#4169E1',
              type: 'line',
              stack: '',
              data: []
            }
          ]
        },
        optionDangerSourceCompliance: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [],
            show: true,
            top: 10,
            left: 20,
            icon: 'rect'
          },
          grid: {
            x: 60,
            x2: 20,
            y: 60,
            height: 150
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine: {
              lineStyle: {
                color: '#DCDCDC',
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000000',
              }
            }
          },
          yAxis: {
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#DCDCDC'
              },
              show: true
            },
            type: 'value'
          },
          series: [
            {
              name: '',
              symbol: 'none',
              color: '#4169E1',
              type: 'line',
              stack: '',
              data: []
            },
            {
              name: '',
              symbol: 'none',
              color: '#8EEF86',
              type: 'line',
              stack: '',
              data: []
            },
            {
              name: '',
              symbol: 'none',
              color: '#9370DB',
              type:'line',
              stack: '',
              data: []
            }
          ]
        },
        optionWellNum: {
          tooltip: {
            trigger: 'axis'
          },
          grid:{
            x: 60,
            x2: 20,
            y: 30,
            height: 160
          },
          xAxis: {
            type: 'category',
            data: [],
            axisLine:{
              lineStyle:{
                color:'#DCDCDC',
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000000',
              }
            }
          },
          yAxis: {
            axisLine: {show:false},
            axisTick: {show:false},
            splitLine:{
              lineStyle:{
                type: 'dashed',
                color: '#DCDCDC'
              },
              show:true
            },
            type: 'value',
          },
          series: [{
            data: [],
            type: 'bar',
            barWidth: '30%',
            itemStyle: {
              normal: {
                color : '#1E90FF'
              }
            }
          }]
        },
        optionTouch: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [],
            show: true,
            top: 10,
            left: 20,
            icon: 'rect'
          },
          grid: {
            x: 60,
            x2: 20,
            y: 60,
            height: 120
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine: {
              lineStyle: {
                color: '#DCDCDC',
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000000',
              }
            }
          },
          yAxis: {
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#DCDCDC'
              },
              show: true
            },
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value}%'
            },
            type: 'value'
          },
          series: [
            {
              name: '',
              symbol: 'none',
              color: '#4169E1',
              type: 'line',
              stack: '',
              data: []
            },
            {
              name: '',
              symbol: 'none',
              color: '#8EEF86',
              type: 'line',
              stack: '',
              data: []
            }
          ]
        }
      }
    },
    created() {
        this.getOptionList()
        this.getPager()
    },
    methods: {
        getPager() {
            this.listLoading = true
            this.$utils.clean(this.pageQuery)
            const params = this.pageQuery
            request.get('/hiddendangeranalysismodel/getHiddenDangerAnalysisModellist', {params}).then(res => {
                this.list = res.data.rows
                this.total = res.data.totalCount
                setTimeout(() => {
                    this.listLoading = false
                }, 1.5 * 100)
            })
        },
        getOptionList() {
            const params = 'pageNo=-1&pageSize=1000'
            this.$request.dictionary.getInfolist(params+'&parentId=dangeranalysis').then(res => {
                this.typeList = res.data.rows
            })
            this.$request.dictionary.getInfolist(params+'&parentId=industry').then(res => {
                this.industryList = res.data.rows
            })
        },
        handleFilter() {
            this.pageQuery.pageNo = 1
            this.getPager()
        },
        currentChange(currentPage) {
            this.pageQuery.pageNo = currentPage
            this.getUser()
        },
        dateFormat(row, column) {  //yyyy-MM-dd
            const str = row[column.property]
            if (str == null || str === '') {
                return ''
            }
            const date = new Date(str)
            return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
        },
        typeFormat(row) {
            return this.typeObj.get(row.type)
        },
        unitFormat(row) {
          return row.parkName + row.architectureName
        },
        resetTemp() {
            this.temp = {
                id: undefined,
                modelName: '',
                analysisId: '',
                createTime: '',
                parkId: '',
                architectureId: '',
                industryId: '',
                beginTime: '',
                endTime: '',
            }
            this.initParkList()
        },
        initParkList() {
            this.parkList = [
                {areaName: '国际会展中心二期', areaId: '1106'},
                {areaName: '中大产业园', areaId: '1107'},
                {areaName: '润丰产业园', areaId: '1108'},
                {areaName: '鹏辉产业园', areaId: '1109'},
                {areaName: '国际会展中心一期', areaId: '1110'}
            ]
        },
        async findParks(value) {
            if (value==='') {
                this.parkList = []
                this.temp.parkId = ''
                return
            }
            this.temp.parkId = ''
            this.parkList = []
            const res = await this.instance.post('/architecture/selectParkByIndustry?industry=' + value)
            this.parkList = res.data.data
        },
        async findBuildings(value) {
            if (value==='') {
                this.buildingList = []
                this.temp.architectureId = ''
                return
            }
            this.temp.architectureId = ''
            this.buildingList = []
            const res = await this.instance.post('/architecture/selectByAreaId?areaId=' + value)
            this.buildingList = res.data.data
        },
        showRow(value) {
            this.temp.architectureId = ''
            this.buildingList = []
            this.parkList = []
            if (value === 70) {
                this.temp.industryId = ''
                this.rowVisible = value
                return
            }
            this.initParkList()
            this.temp.parkId = ''
            this.rowVisible = value
        },
        handleAdd() {
            this.resetTemp()
            this.rowVisible = ''
            this.dialogStatus = 'add'
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
        addData() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    let formData = new FormData()
                    formData.append('modelName', this.temp.modelName)
                    formData.append('analysisId', this.temp.analysisId)
                    formData.append('parkId', this.temp.parkId)
                    formData.append('architectureId', this.temp.architectureId)
                    formData.append('industryId', this.temp.industryId)
                    formData.append('beginTime', this.temp.beginTime)
                    formData.append('endTime', this.temp.endTime)
                    this.addDanger.post('/hiddendangeranalysismodel/addHiddenDangerAnalysisModel', formData).then(res => {
                        if (res.data.code === 200) {
                            this.getPager()
                            this.dialogFormVisible = false
                            this.$message.success('添加成功')
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                }
            })
        },
        handleDelete(row) {
            this.$confirm('确认删除此模型?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.instance.delete('/hiddendangeranalysismodel/deletetaskwarn/' + row.id).then((res) => {
                    if (res.data.code === 200) {
                        this.getPager()
                        this.$message.success('删除成功')
                    } else {
                        this.$message.error(res.message)
                    }
                })
            }).catch(() => {
                this.$message.info('已取消删除')
            })
        },
        handleCheck(row) {
          this.temp = Object.assign({}, row);
            // 行业隐患统计分析 70 dialogIndustry Analysis
            // 小镇区域隐患分析 71 dialogTown
            // 历史隐患分析         dialogHistory
            // 合规运行分析         dialogCompliance
            if(this.temp.analysisId === 70){
              this.dialogIndustry = true;
              this.getInitData(this.temp)
            }else if(this.temp.analysisId === 71){
              this.dialogTown = true;
              this.getInitData(this.temp)
            }else if(this.temp.analysisId === 72){
              this.dialogHistory = true;
              this.getInitData(this.temp)
            }else if(this.temp.analysisId === 73){
              this.dialogCompliance = true;
              this.getInitComplianceData(this.temp)
            }
        },

      dateFilter(value) {
        return moment(value).format('YYYY-MM')
      },
      dateFilterYYYY(value) {
        return moment(value).format('YYYY')
      },
      dateFilterMM(value) {
        return moment(value).format('MM')
      },

      getInitData(temp) {

        let archid = temp.architectureId;
        let areaid = temp.parkId;
        let deptid = temp.deptid;
        let endmonth = this.dateFilter(temp.endTime);
        let month = this.dateFilter(temp.beginTime);

        //获取隐患数量
        this.instance
          .get('/analysis/getWarnCount', {
            params: {
              archid: archid,
              areaid: areaid,
              deptid: deptid,
              endmonth: endmonth,   //yyyy-MM
              month: month    //yyyy-MM
            }
          })
          .then(res => {
            this.dayCount = res.data.data.dayCount;
            this.totalCount = res.data.data.totalCount;
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        //人工上报数量
        this.instance
          .get('/analysis/getAnalyByRg', {
            params: {
              areaid: areaid,
              deptid: deptid,
              endmonth: endmonth,   //yyyy-MM
              month: month    //yyyy-MM
            }
          })
          .then(res => {
            res.data.data.forEach((item) => {
              this.reportXData.push(item.type);
              this.reportYData.push(item.count);
              this.reportTotal += item.count;
            });
            this.optionReport.xAxis.data = this.reportXData;
            this.optionReport.series[0].data = this.reportYData;

            if(this.temp.analysisId === 70){
              this.$chart.myChart('chartReport', this.optionReport)
            }else if(this.temp.analysisId === 71){
              this.$chart.myChart('chartReportTown', this.optionReport)
            }

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 超时隐患统计
        this.instance
          .get('/analysis/getAnalyByTimeOut', {
            params: {
              archid: archid,
              areaid: areaid,
              deptid: deptid,
              endmonth: endmonth,   //yyyy-MM
              month: month    //yyyy-MM
            }
          })
          .then(res => {
            this.generalTimeOut = res.data.data[0].count;
            this.seriousTimeOut = res.data.data[1].count;
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 隐患处置率
        this.instance
          .get('/analysis/getAnalyByPercentage', {
            params: {
              archid: archid,
              areaid: areaid,
              deptid: deptid
            }
          })
          .then(res => {
            this.percentage = res.data.data.percentage;
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 楼宇统计分析 /analysis/getAnalyByAcrh 改为按园区
        // 按园区统计分析
        this.instance
          .get('/analysis/getAnalyByArea', {
            params: {
              areaid: areaid,
              deptid: deptid,
              endmonth: endmonth,   //yyyy-MM
              month: month    //yyyy-MM
            }
          })
          .then(res => {
            this.buildTotalData = res.data.data;
            res.data.data.forEach((item, index) => {
              this.buildXData.push(index+1);
              this.buildYData.push(item.count);
              this.buildTotal += item.count;
            });
            this.optionBuilding.xAxis.data = this.buildXData;
            this.optionBuilding.series[0].data = this.buildYData;

            if(this.temp.analysisId === 71){
              this.$chart.myChart('chartBuildingTown', this.optionBuilding);
            }

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 隐患等级分析
        this.instance
          .get('/analysis/getAnalyByLevelMonths', {
            params: {
              archid: archid,
              areaid: areaid,
              deptid: deptid
            }
          })
          .then(res => {
            res.data.data.todaylist.forEach(item => {
              if(item.type === '一般隐患'){
                this.dangerGradeMin = item.count;
              }else{
                this.dangerGradeMax = item.count;
              }
            })

            this.optionDangerGrade.xAxis.data = res.data.data.category;
            this.optionDangerGrade.series[0].data = res.data.data.type[0].data;
            this.optionDangerGrade.series[0].name = res.data.data.type[0].name;
            this.optionDangerGrade.series[1].data = res.data.data.type[1].data;
            this.optionDangerGrade.series[1].name = res.data.data.type[1].name;

            let minDanger = 0;
            let maxDanger = 0;
            res.data.data.type[0].data.forEach(item =>{
              minDanger += item;
            });
            res.data.data.type[1].data.forEach(item =>{
              maxDanger += item;
            });

            this.optionDangerGradeHistory.series[0].data[0].value = minDanger;
            this.optionDangerGradeHistory.series[0].data[1].value = maxDanger;

            if(this.temp.analysisId === 70){
              this.$chart.myChart('chartDangerGrade', this.optionDangerGrade)
            }else if(this.temp.analysisId === 71){
              this.$chart.myChart('chartDangerGradeTown', this.optionDangerGrade)
            }else if(this.temp.analysisId === 72){
              this.$chart.myChart('chartDangerGradeHistory', this.optionDangerGradeHistory)
            }
            //chartDangerGradeHistory

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 隐患总数变化趋势
        this.instance
          .get('/analysis/getAnalyByTotalWarn', {
            params: {
              archid: archid,
              areaid: areaid,
              deptid: deptid
            }
          })
          .then(res => {
            this.optionDangerTotal.xAxis.data = res.data.data.category;
            this.optionDangerTotal.series[0].data = res.data.data.data;

            let forecast = (new Date).getMonth() + 2 + '月';
            let coordTop;
            coordTop = Math.max.apply(null, res.data.data.data);
            let coord = [];
            coord.push({'coord': [forecast,0]});
            coord.push({'coord': [forecast,coordTop]});
            this.optionDangerTotal.series[0].markLine.data[0] = coord;

            if(this.temp.analysisId === 70){
              this.$chart.myChart('chartDangerTotal', this.optionDangerTotal)
            }else if(this.temp.analysisId === 71){
              this.$chart.myChart('chartDangerTotalTown', this.optionDangerTotal)
            }else if(this.temp.analysisId === 72){
              this.$chart.myChart('chartDangerTotalHistory', this.optionDangerTotal)
            }

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 隐患处置事件分析
        this.instance
          .get('/analysis/getAnalyByWarnDeal', {
            params: {
              archid: archid,
              areaid: areaid,
              deptid: deptid
            }
          })
          .then(res => {
            this.optionDangerDeal.xAxis.data = res.data.data.category;
            this.optionDangerDeal.series[0].data = res.data.data.data;

            if(this.temp.analysisId === 70){
              this.$chart.myChart('chartDangerDeal', this.optionDangerDeal)
            }else if(this.temp.analysisId === 71){
              this.$chart.myChart('chartDangerDealTown', this.optionDangerDeal)
            }else if(this.temp.analysisId === 72){
              this.$chart.myChart('chartDangerDealHistory', this.optionDangerDeal)
            }

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 隐患来源分析
        this.instance
          .get('/analysis/getAnalyByWarnSource', {
            params: {
              archid: archid,
              areaid: areaid,
              deptid: deptid
            }
          })
          .then(res => {
            this.optionDangerSource.xAxis.data = res.data.data.category;
            res.data.data.type.forEach((item, index) => {
              this.optionDangerSource.legend.data.push(item.name);
              this.optionDangerSource.series[index].data = item.data;
              this.optionDangerSource.series[index].name = item.name;

              let equipmentDangerNum = 0;
              let inspectionDangerNum = 0;
              let artificialDangerNum = 0;

              if((item.name).search("设备")){
                item.data.forEach(item =>{
                  equipmentDangerNum += item
                })
              }else if((item.name).search("巡检")){
                item.data.forEach(item =>{
                  inspectionDangerNum += item
                })
              }else if((item.name).search("人工")){
                item.data.forEach(item =>{
                  artificialDangerNum += item
                })
              }
              if((equipmentDangerNum + inspectionDangerNum+ artificialDangerNum) !== 0){
                this.equipmentDanger = equipmentDangerNum/(equipmentDangerNum + inspectionDangerNum+ artificialDangerNum) * 100;
                this.inspectionDanger = inspectionDangerNum/(equipmentDangerNum + inspectionDangerNum+ artificialDangerNum) * 100;
                this.artificialDanger = artificialDangerNum/(equipmentDangerNum + inspectionDangerNum+ artificialDangerNum) * 100;
              }
            });

            if(this.temp.analysisId === 70){
              this.$chart.myChart('chartDangerSource', this.optionDangerSource)
            }else if(this.temp.analysisId === 71){
              this.$chart.myChart('chartDangerSourceTown', this.optionDangerSource)
            }

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });


        // 园区行业统计
        this.instance
          .get('/analysis/getAnalyByWarnArch', {
            params: {
              areaid: areaid,
              deptid: deptid
            }
          })
          .then(res => {
            this.optionDangerTrade.xAxis.data = res.data.data.category;
            res.data.data.type.forEach((item, index) => {
              this.optionDangerTrade.legend.data.push(item.name);
              this.optionDangerTrade.series[index].name = item.name;
              this.optionDangerTrade.series[index].data = item.data
            });

            if(this.temp.analysisId === 70){
              this.$chart.myChart('chartDangerTrade', this.optionDangerTrade)
            }else if(this.temp.analysisId === 71){
              this.$chart.myChart('chartDangerTradeTown', this.optionDangerTrade)
            }

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 解决隐患时长统计
        this.instance
          .get('/analysis/getAnalyByTimes', {
            params: {
              archid: archid,
              areaid: areaid,
              deptid: deptid,
              endmonth: endmonth,   //yyyy-MM
              month: month    //yyyy-MM
            }
          })
          .then(res => {
            this.optionDealTime.xAxis.data = res.data.data.category;
            this.optionDealTime.series[0].data = res.data.data.data;

            if(this.temp.analysisId === 70){
              this.$chart.myChart('chartDealTime', this.optionDealTime)
            }else if(this.temp.analysisId === 71){
              this.$chart.myChart('chartDealTimeTown', this.optionDealTime)
            }

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });
      },

      getInitComplianceData(temp){

        let archid = temp.architectureId;
        let areaid = temp.parkId;
        let deptid = temp.deptid;
        let endmonth = this.dateFilter(temp.endTime);
        let month = this.dateFilter(temp.beginTime);
        let yyyy = this.dateFilterYYYY(temp.beginTime);
        // let mm = this.dateFilterMM(temp.beginTime);

        // 解决隐患数量（按天统计）
        this.instance
          .get('/analysis/getAnalySolveWarnCountByDay', {
            params: {
              archid: archid,
              areaid: areaid,
              deptid: deptid,
              endmonth: endmonth,   //yyyy-MM
              month: month   //yyyy-MM
            }
          })
          .then(res => {
            this.dangerCount = res.data.data.totalcount;
            res.data.data.data.forEach(item=>{
              this.optionTaskNum.xAxis.data.push(item.day);
              this.optionTaskNum.series[0].data.push(item.count)
            });
            this.$chart.myChart('chartTaskNum', this.optionTaskNum);
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });


        // 火警总数变化趋势
        this.instance
          .get('/fireAnalysis/getAnalyByTotalFire', {
            params: {
              archid: archid,
              areaid: areaid,
              deptid: deptid
            }
          })
          // Just to simulate the time of the request
          .then(res => {
            this.optionFire.xAxis.data = res.data.data.category;
            this.optionFire.series[0].data = res.data.data.data;
            this.$chart.myChart('chartFire', this.optionFire);

            res.data.data.data.forEach(item => {
              this.fireCount += item;
            });

            setTimeout(() => {
            }, 1.5 * 100)
          });


        // 设备健康
        this.instance
          .get('/deviceHealthStatistics', {
            params: {
            }
          })
          .then(res => {

            let perfect = (res.data[0].per).toString().replace(/%/g,'');
            this.wellPercent = Number(perfect).toFixed(2); //设备完好率
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 查询巡检用户首页信息
        this.instance
          .get('/inspectionHome/unDealTaskWarn', {
            params: {
              deptId: deptid
            }
          })
          .then(res => {
            res.data.data.deviceNumList.forEach(item => {
              this.optionWellNum.xAxis.data.push(item.type);
              this.optionWellNum.series[0].data.push(item.data);
            });

            this.optionTouch.legend.data = ['60s触达率','3分钟到场率'];
            res.data.data.fireWarnRateList.forEach(item => {
              if(item.name === 'sixRateList'){
                this.optionTouch.series[0].name = '60s触达率';
                item.data.forEach(item => {
                  this.optionTouch.xAxis.data.push(item.type);
                  this.optionTouch.series[0].data.push(item.data);
                })
              }else {
                this.optionTouch.series[1].name = '3分钟到场率';
                item.data.forEach(item => {
                  this.optionTouch.series[1].data.push(item.data);
                })
              }
            });

            this.$chart.myChart('chartWellNum', this.optionWellNum);
            this.$chart.myChart('chartTouch', this.optionTouch);

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 每月任务统计  -- 月巡检数量
        this.instance
          .get('/deviceRountingAnalysis/deviceYearTaskSum', {
            params: {
              deptId: deptid,
              year: yyyy
            }
          })
          .then(res => {
            this.optionMonthGNum.xAxis.data = res.data.data.month;
            this.optionMonthGNum.series[0].data = res.data.data.data;

            this.$chart.myChart('chartMonthGNum', this.optionMonthGNum);
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 火警总数波动按月统计(当年)
        this.instance
          .get('/fireAnalysis/getAnalyByTotalFireSurgeByMonth', {
            params: {
              archid: archid,
              areaid: areaid,
              deptid: deptid
            }
          })
          .then(res => {
            this.optionFireWave.xAxis.data = res.data.data.category;
            this.optionFireWave.series[0].data = res.data.data.data;

            this.$chart.myChart('chartFireWave', this.optionFireWave);
            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 隐患等级分析
        this.instance
          .get('/analysis/getAnalyByLevelMonths', {
            params: {
              archid: archid,
              areaid: areaid,
              deptid: deptid
            }
          })
          .then(res => {
            res.data.data.todaylist.forEach(item => {
              if(item.type === '一般隐患'){
                this.dangerGradeMinCompliance = item.count;
              }else{
                this.dangerGradeMaxCompliance = item.count;
              }
            })
            this.optionDangerGradeCompliance.xAxis.data = res.data.data.category;
            this.optionDangerGradeCompliance.series[0].data = res.data.data.type[0].data;
            this.optionDangerGradeCompliance.series[0].name = res.data.data.type[0].name;
            this.optionDangerGradeCompliance.series[1].data = res.data.data.type[1].data;
            this.optionDangerGradeCompliance.series[1].name = res.data.data.type[1].name;
            this.$chart.myChart('chartDangerGradeCompliance', this.optionDangerGradeCompliance);

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 隐患处置率
        this.instance
          .get('/analysis/getAnalyByWarnDealRate', {
            params: {
              archid: archid,
              areaid: areaid,
              deptid: deptid
            }
          })
          .then(res => {
            this.optionDangerDealCompliance.xAxis.data = res.data.data.category;
            this.optionDangerDealCompliance.series[0].data = res.data.data.data;
            this.$chart.myChart('chartDangerDealCompliance', this.optionDangerDealCompliance);

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

        // 隐患来源分析
        this.instance
          .get('/analysis/getAnalyByWarnSource', {
            params: {
              areaid: areaid,
              deptid: deptid
            }
          })
          .then(res => {
            this.optionDangerSourceCompliance.xAxis.data = res.data.data.category;
            res.data.data.type.forEach((item,index) => {
              this.optionDangerSourceCompliance.legend.data.push(item.name);
              this.optionDangerSourceCompliance.series[index].data = item.data;
              this.optionDangerSourceCompliance.series[index].name = item.name
            });

            this.$chart.myChart('chartDangerSourceCompliance', this.optionDangerSourceCompliance);

            // Just to simulate the time of the request
            setTimeout(() => {
            }, 1.5 * 100)
          });

      }
    }
  }
</script>
<style>
  .titleMin {
    padding-top: 20px;
    padding-left: 20px;
    height: 35px;
    font-size: 14px;
    color: #b5b5b5;
    background-color: #fff;
  }
  .numberMid {
    padding-bottom: 10px;
    padding-left: 20px;
    height: 45px;
    font-size: 14px;
    color: #b5b5b5;
    background-color: #fff;
  }
  .descMin {
    padding-top: 40px;
    padding-left: 15px;
    height: 35px;
    font-size: 14px;
    color: #999999;
    background-color: #fff;
  }
  .chartMax {
    padding-top: 0;
    height: 220px;
    background-color: #fff;
    text-align: center;
  }
  .chartMid {
    height: 200px;
    padding-top:0;
    background-color: #ffffff
  }
  .chartMin {
    height: 118px;
    padding-top:0;
    background-color: #ffffff
  }
  .hr-90width {
    background-color: #F5F5F5;
    margin-top: 0;
    width: 90%;
    height: 1px;
    border: none;
  }
  .hr-100width {
    background-color: #F5F5F5;
    margin: 0;
    width: 100%;
    height: 1px;
    border: none;
  }
  .font14 {
    font-size: 14px;
    color: black;
  }
  .font24 {
    font-size: 24px;
    color: black;
  }
  .font36 {
    font-size: 36px;
    color: black;
  }
  .amendSpan {
    color: #0080d0;
    cursor: pointer;
  }
</style>
