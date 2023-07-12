<script lang="ts" setup>
import {ref,onMounted} from'vue'
import {getOrderInfoApi,getOrderInfoListApi ,canalOrderApi} from '@/api/order/index.ts'
import {ElMessage}  from 'element-plus'
import {useRoute,useRouter} from 'vue-router'
import { fa } from 'element-plus/es/locale/index.js';
const router = useRouter()
const route = useRoute()
const orderDetail = ref({})
const orderMessage  = ref({})
const orderInfoList = ref([])//订单列表
const pageNo = ref<Number>(1)
const pageSize = ref<Number>(10)
const total = ref(0)

const dialogVisible = ref(false)
const dialogDetail = ref(false)
const dialogImg = ref(false)
const orderInfo =async()=>{
  const res = await getOrderInfoApi(route.query.orderId)
  // console.log(res)
  orderMessage.value = res.data.data
} 
//获取订单列表
const getOrderInfoList =async()=>{
  const res = await getOrderInfoListApi(pageNo.value,pageSize.value)
  orderInfoList.value = res.data.data.records
  total.value = res.data.data.total
} 
const canal = ()=>{
  dialogVisible.value = true
}
// 取消预约
const canalOrder =async ()=>{
  dialogVisible.value = false
  const res = await canalOrderApi(route.query.orderId)
  // console.log(res)
  if(res.data.data){
    ElMessage({
      type: "success",
      message:"订单取消预约成功"
    })
  }else{
    ElMessage({
      type: "error",
      message:"订单取消预约失败"
    })
  }
}
// 查看订单详情
const confirm = (item:any)=>{
  console.log(item)
  dialogDetail.value = true
  orderDetail.value = item
}
// 当前页码变化
const currentChange = (item:Number)=>{
  // console.log(item)
  pageNo.value = item
  getOrderInfoList()
}
// 每页显示数量变化
const sizeChange = (item:Number)=>{
  // console.log(item)
  pageSize.value = item
  getOrderInfoList()
}
onMounted(()=>{
  orderInfo(),
  getOrderInfoList()
})
</script>
<template>
  <div class="content" >
    <el-card shadow="hover" v-show="orderMessage">
      <template #header>
        <div class="card-header">
          <span>挂号订单</span>
        </div>
      </template>
      <div class="status">
        <div>
          <p><el-tag class="ml-2" type="success">{{ orderMessage?.param?.orderStatusString }}</el-tag></p>
          <p class="title">就诊人信息： {{ orderMessage?.patientName }}</p>
        </div>
        <div class="appInfo">
          <img src="../../../assets/images/code_app.png" alt="">
          <div>
            <p>微信关注公众号</p>
            <p>快速预约挂号</p>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="orderInfo">
          <el-descriptions class="margin-top" :column="1" border>
            <el-descriptions-item width="100px">
              <template #label>
                <div class="cell-item" >就诊日期:</div>
              </template>
              {{ orderMessage?.fetchTime }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊医院:</div>
              </template>
              {{ orderMessage?.hosname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊科室:</div>
              </template>
              {{ orderMessage?.depname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">医生职称:</div>
              </template>
              {{ orderMessage?.title }}
              </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">医生服务费:</div>
              </template>
              <el-text class="mx-1" type="danger">{{ orderMessage?.amount }}</el-text>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">挂号订单:</div>
              </template>
              {{ orderMessage?.outTradeNo }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">挂号时间:</div>
              </template>
              {{ orderMessage?.createTime }}
            </el-descriptions-item>
          </el-descriptions>  
        </div>
        <div class="action">
          <h1>注意事项</h1>
          <ul>
            <li><p>1、请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</p></li>
            <li class="red"><p>2、【取号】就诊当天需在2023-07-1109:00前在医院取号，未取号视为爽约，该号不退不换；</p></li>
            <li><p>3、【退号】在2023-07-10 15:30前可在线退号 ，逾期将不可办理退号退费；</p></li>
            <li><p>4、北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；</p></li>
            <li><p>5、请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p></li>
          </ul>
        </div>
      </div>
      <div class="btn">
        <el-button type="success" @click="dialogImg=true">立即支付</el-button>
        <el-button type="info" @click="canal">取消预约</el-button>
      </div>
    </el-card>
    <div class="orderList" v-show="!orderMessage">
      <h1 class="title">挂号订单</h1>
      <el-table 
      :data="orderInfoList" 
      stripe 
      :cell-style="{'text-align':'center','height':'45px'}"
      :header-cell-style="{'text-align':'center','font-weight':'bold','color':'black'}">
        <el-table-column prop="fetchTime" label="就诊时间" width="160" />
        <el-table-column prop="hosname" label="医院" width="130" />
        <el-table-column prop="depname" label="科室" width="150"/>
        <el-table-column prop="title" label="医生" width="100"/>
        <el-table-column prop="amount" label="医师服务费" />
        <el-table-column prop="patientName" label="就诊人" />
        <el-table-column label="订单状态" width="130">
          <template #default="scope">
            <el-tag>{{ scope.row?.param.orderStatusString }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" >
          <template #default="scope">
            <el-button type="primary" size="small" @click="confirm(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      class="padina"
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @current-change="currentChange"
        @size-change="sizeChange"
      />
    </div>
  </div>
  <el-dialog
    class="dialogDiv"
    v-model="dialogVisible"
    title="取消预约"
    width="30%"
    >
    <span>是否确定要取消预约</span><br>
    <el-text type="warning">一旦取消后就需要重新预约挂号</el-text>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="canalOrder()">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="dialogDetail"
    title="挂号订单详情"
    width="30%"
    >
    <div class="detail">
      <ul>
        <li>就诊人信息：{{ orderDetail?.patientName }}</li>
        <li>订单状态：<el-tag>{{ orderDetail?.param?.orderStatusString }}</el-tag></li>
        <li>就诊日期：{{ orderDetail?.fetchTime }}</li>
        <li>就诊医院：{{ orderDetail?.hosname }}</li>
        <li>就诊科室：{{ orderDetail?.depname }}</li>
        <li>医生职称：{{ orderDetail?.title }}</li>
        <li>医师服务费：<el-tag type="danger">{{ orderDetail?.amount }}</el-tag></li>
        <li>挂号订单：<el-tag type="success">{{ orderDetail?.outTradeNo }}</el-tag></li>
        <li>挂号时间：{{ orderDetail.createTime }}</li>
      </ul>
      <el-button type="primary" @click="dialogDetail=false">确定</el-button>
    </div>
  </el-dialog>
  <el-dialog
    v-model="dialogImg"
    title="支付界面"
    width="30%"
    >
    <div class="wxImg">
      <img src="../../../assets/images/wxCode.jpg" alt="">
    </div>
    <el-button type="primary" @click="dialogImg=false">关闭窗口</el-button>
  </el-dialog>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .content{
    margin: 10px 20px;
    box-shadow: 0 0 10px 10px #cfcdcd;
    .status{
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
      border-bottom: 1px solid #cfcdcd;
      .title{
        margin: 20px 0 0 10px;
      }
      .appInfo{
        display: flex;
        img{
          width: 60px;
          margin-right: 20px;
        }
        p{
          margin: 10px 0;
        }
      }
    }
    .main{
      display: flex;
      .orderInfo{
        width: 48%;
      }
      .action{
        width: 48%;
        margin: 10px;
        h1{
          margin: 10px 0;
          font-size: 18px;
          font-weight: bold;
        }
        ul{
          li{
            margin: 10px 0;
          }
          .red{
            color: red;
          }
        }
      }
    }
    .btn{
      text-align: center;
      button{
        margin: 10px  30px 0 30px;
      }
    }
    .orderList{
      .title{
        font-size: 16px;
        font-weight: bold;
        margin: 10px 10px;
        padding-top: 20px;
      }
      .padina{
        margin: 10px;
        padding-bottom: 10px;
      }
    }
  }
  .dialogDiv{
    span{
      display: block;
      margin:5px 0;
    }
  }
  .detail{
    li{
      margin: 10px 0;
    }
    button{
      margin-left: 350px;
    }
  }
  .wxImg{
    margin-left: 20px;
  }
  button{
      margin-left: 300px;
    }
</style>