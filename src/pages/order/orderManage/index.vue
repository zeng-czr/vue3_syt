<script lang="ts" setup>
import {ref,onMounted} from 'vue'
import {getPaientsListApi} from '@/api/hospital/index.ts'
import {User,Edit,Delete} from '@element-plus/icons-vue'
const selectUser = ref({})
const selectIndex = ref('-1')
const patientList = ref([])
const changeIndex  = (index:string,user:any)=>{
  // console.log(user)
  selectUser.value = user
  selectIndex.value = index
}
const getPatientList = async()=>{
  const res = await getPaientsListApi()
  patientList.value = res.data.data
}
onMounted(()=>{
  getPatientList()
})
</script>
<template>
  <div class="content">
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>就诊人管理</span>
          <el-button type="primary" size="default" :icon="User" @click="goUser">添加就诊人</el-button>
        </div>
      </template>
      <!-- 卡片的身体部分展示就诊人信息 -->
      <div class="user">
        <el-card shadow="hover" class="item" v-for="(user, index) in patientList" :key="index">
          <template #header>
            <div class="card-header">
              <span class="name">{{ user.name }}</span>
              <el-button type="primary"><el-icon :size="18"><Edit /></el-icon></el-button>
              <el-button type="danger"><el-icon :size="18"><Delete /></el-icon></el-button>
              
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
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
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
      .name{
        flex: 2;
      }
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
</style>