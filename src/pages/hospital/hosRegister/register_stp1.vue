<script setup lang="ts">
  import {ref,onMounted} from 'vue'
  import {getRegisterApi} from '@/api/hospital/index.ts'
  import {useRouter,useRoute} from 'vue-router'
  const router = useRouter()
  const route = useRoute()
  //参数列表数据
  const registerList = ref([])
  const HosInfo = ref({})
  const total = ref(0)
  let pageNo = ref(1)
  const limit = ref(6)
  const hoscode = route.query.hosCode
  const depcode = route.query.depcode
  // 获取参数列表数据
  const getRegister = async()=>{
    const res = await getRegisterApi(pageNo.value,limit.value,hoscode,depcode)
    registerList.value = res.data.bookingScheduleList
    HosInfo.value = res.data.baseMap
    total.value = res.data.total
  }
  const changeWorkData = ()=>{
    getRegister()
  }
  onMounted(()=>getRegister())
</script>
<template>
  <div class="content">
    <div class="title">
      <p class="hosName">{{ HosInfo.hosname }}</p>
      <p class="tip">{{HosInfo.bigname}}·{{ HosInfo.depname }}</p>
    </div>
    <div class="dateList">
      <h1>当前月份{{ HosInfo.workDateString }}</h1>
      <div class="main">
        <div class="item" :class="{active:item.status==-1||item.status==0&&item.availableNumber==0}" v-for="(item,index) in registerList" :key="index">
          <div class="top"><p>{{item.workDate}}</p></div>
          <div class="bottom">
            <p v-if="item.status==-1">停止挂号</p>
            <p v-if="item.status==0">有号</p>
            <p v-if="item.status==0&&item.availableNumber==0">无号</p>
            <p v-if="item.status==1">即将放号</p>
          </div>
        </div>
      </div>
      <el-pagination v-model:current-page="pageNo" @current-change="changeWorkData" :page-size="limit" background layout="prev, pager, next" :total="total" />
    </div>
    <div class="morning"></div>
    <div class="night"></div>
  </div>
</template>
<style lang="scss" scoped>
  .content{
    margin: 20px;
    .title{
      display: flex;
      .hosName{
        font-size: 20px;
        font-weight: bold;
        padding-right: 20px;
        border-right: 2px solid #87CEFA;
      }
      .tip{
        font-size: 16px;
        font-size: 650;
        margin-left: 30px;
      }
    }
    .dateList{
      margin-top: 30px;
      h1{
        text-align: center;
        margin-bottom: 30px;
      }
      .main{
        display: flex;
        .active{
          border: 2px solid#696969 !important;
          background-color: 	#DCDCDC!important;
          cursor: not-allowed!important;
        }
       .item{
        width: 15%;
        height: 80px;
        border: 2px solid #87CEFA;
        background-color: 	#87CEFA;
        margin: 8px;
        &:hover{
          cursor: pointer;
          font-weight: bold;
        }
        .top{
          height: 30px;
          background-color: azure;
          p{
            font-size: 14px;
            line-height: 30px;
            text-align: center;
          }
        }
        .bottom{
          p{
            line-height: 40px;
            text-align: center;
          }
        }
       }
      }
      ::v-deep(.el-pagination){
        margin:20px 0 0 380px;
      }
    }
  }
</style>