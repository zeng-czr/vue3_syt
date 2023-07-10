<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {User,Edit} from '@element-plus/icons-vue'
import {getPaientsListApi,getDocInfoApi} from '@/api/hospital/index.ts'
import {createOrder} from '@/api/order/index.ts'
import {useRouter,useRoute} from 'vue-router'
const router = useRouter()
const route = useRoute()
const patientList = ref([])
const currentIndex = ref(0)
const docInfo = ref({})
const selectIndex = ref("-1")
const selectUser = ref({})

const orderId = ref('')
// 获取就诊人信息
const getPatientList = async()=>{
  const res = await getPaientsListApi()
  patientList.value = res.data.data
}
// 获取当前挂号医生信息
const getDocInfo = async()=>{
  const res = await getDocInfoApi(route.query.docId) 
  // console.log(res)
  docInfo.value = res.data.data
  // console.log(docInfo)
}
const changeIndex  = (index:string,user:any)=>{
  // console.log(user)
  selectUser.value = user
  selectIndex.value = index
}
// 创建订单
const submitOrder = async()=>{
  let hoscode = docInfo.value.hoscode
  let scheduleId = docInfo.value.id
  let patientId = selectUser.value.id
  const res = await createOrder(hoscode,scheduleId,patientId)
  console.log(res)
  orderId.value = res.data.data
  router.push({
    path:'/order/orderList',
    query:{
      orderId:orderId.value
    }
  })
}
onMounted(()=>{getPatientList(),getDocInfo()})
</script>
<template>
  <div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <!-- 卡片:展示就诊人信息 -->
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button type="primary" size="default" :icon="User" @click="goUser">添加就诊人</el-button>
        </div>
      </template>
      <!-- 卡片的身体部分展示就诊人信息 -->
      <div class="user">
        <el-card shadow="hover" class="item" v-for="(user, index) in patientList" :key="index">
          <template #header>
            <div class="card-header">
              <span>{{ user.name }}</span>
              <el-button ><el-icon :size="18"><Edit /></el-icon></el-button>
            </div>
          </template>
          <ul @click="changeIndex(index,user)">
            <li>身份证类型: <el-tag type="success">{{ user.param.certificatesTypeString }}</el-tag></li>
            <li>身份证号码: <el-tag type="success">{{ user.certificatesNo }}</el-tag></li>
            <li>用户性别: {{ user.sex==0?'女生':'男生' }}</li>
            <li>出生日期: {{ user.birthdate }}</li>
            <li>手机号码: {{ user.phone }}</li>
            <li>婚姻状况: {{ user.isMarry==0?'未婚':'已婚' }}</li>
            <li>当前地址: {{ user.address }}</li>
            <li>详细地址: {{ user.param.fullAddress }}</li>
          </ul>
          <div :class="{'selected':selectIndex==index}"></div>
        </el-card>
      </div>
    </el-card>
    <!-- 卡片:展示医生的信息 -->
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <!-- 卡片身体部分:展示医生的信息 -->
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊日期:</div>
          </template>
          {{ docInfo.workDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊医院:</div>
          </template>
          {{ docInfo.param?.hosname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊科室:</div>
          </template>
          {{ docInfo.param?.depname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生姓名:</div>
          </template>
          {{ docInfo.docname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生职称:</div>
          </template>
          {{ docInfo.title }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生专长:</div>
          </template>
          {{ docInfo.skill }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生服务费:</div>
          </template>
          <span style="color: red">{{ docInfo.amount }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card> 
    <!-- 确定挂号按钮 -->
    <div class="btn">
      <el-button
        type="primary"
        size="default"
        :disabled="currentIndex == -1 ? true : false"
        @click="submitOrder"
        >确认挂号</el-button
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  .tip {
    font-weight: 900;
    color: #7f7f7f;
    font-size: 20px;
  }
  .box-card {
    margin: 20px 0px;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 32%;
        margin: 5px;
        position: relative;
        ul{
          &:hover{
            cursor: pointer;
            color: #4aaef5;
          }
          li{
            margin: 10px 0;
          }
        }
        .selected{
          position: absolute;
          left: 20%;
          top: 30%;
          width: 200px;
          height: 200px;
          color: red;
          font-size: 36px;
          border-radius: 50%;
          border: 4px dashed red;
          text-align: center;
          line-height: 200px;
          opacity: 0.3;
          transform: rotate(45deg);
          &:after{
            content:'已选择'
          }
        }
      }
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    margin: 10px 0px;
  }
}
</style>
