<script lang="ts" setup>
import {ref,onMounted} from'vue'
import {getOrderInfoApi} from '@/api/order/index.ts'

import {useRoute,useRouter} from 'vue-router'
import { PatchFlags } from 'element-plus/es/utils';
const router = useRouter()
const route = useRoute()
const orderMessage  = ref({})
const docInfo = ref({})
const orderInfo =async()=>{
  const res = await getOrderInfoApi(route.query.orderId)
  console.log(res)
  orderMessage.value = res.data.data
} 
onMounted(()=>{
  orderInfo()
})
</script>
<template>
  <div class="content">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>挂号详情</span>
        </div>
      </template>
      <div class="status">
        <div>
          <p><el-tag class="ml-2" type="success">{{ orderMessage.param?.orderStatusString }}</el-tag></p>
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
        <el-button type="success">立即支付</el-button>
        <el-button type="info">取消预约</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .content{
    margin: 20px;
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
        margin: 20px  30px 0 30px;
      }
    }
  }
</style>