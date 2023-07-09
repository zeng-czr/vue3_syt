<script setup lang="ts">
  import {ref,onMounted,computed} from 'vue'
  import {getRegisterApi,getScheduleListApi} from '@/api/hospital/index.ts'
  import {useRouter,useRoute} from 'vue-router'
  import {Sunny,Sunrise} from '@element-plus/icons-vue'
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
  const activeIndex = ref('-1')
  const activeStatus = ref('-2')

  const scheduleList = ref([])
  let schedule_moring = computed(()=>{return scheduleList.value.filter(item=>item.workTime==0)})
  let schedule_night = computed(()=>{return scheduleList.value.filter(item=>item.workTime==1)})
  console.log(schedule_night)
  const date = ref('')
  // 获取参数列表数据
  const getRegister = async()=>{
    const res = await getRegisterApi(pageNo.value,limit.value,hoscode,depcode)
    registerList.value = res.data.data.bookingScheduleList
    HosInfo.value = res.data.data.baseMap
    total.value = res.data.data.total
  }
  const getScheduleList = async()=>{
    const res = await getScheduleListApi(hoscode,depcode,date.value)
    console.log(res)
    scheduleList.value = res.data.data
  }
  // 页面点击事件
  const dateChange = (index:String,item:any)=>{
    activeIndex.value = index
    activeStatus.value = item.status
    console.log(item)
    date.value = item.workDate
    getScheduleList()
  }
  // 分页当前页面变化的回调
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
        <div class="item" :class="{active:item.status==-1||item.status==0&&item.availableNumber==0}" v-for="(item,index) in registerList" :key="index" @click="dateChange(index,item)">
          <div class="top"><p>{{item.workDate}}</p></div>
          <div class="bottom" :class="{select:activeIndex==index}">
            <p v-if="item.status==-1">停止挂号</p>
            <p v-if="item.status==0">有号</p>
            <p v-if="item.status==0&&item.availableNumber==0">无号</p>
            <p v-if="item.status==1">即将放号</p>
          </div>
        </div>
      </div>
      <el-pagination v-model:current-page="pageNo" @current-change="changeWorkData" :page-size="limit" background layout="prev, pager, next" :total="total" />
    </div>
    <div v-if="activeStatus=='1'">
      <p style="text-align: center;margin-top: 100px;">即将放号，请及时关注该平台。。。</p>
    </div>
    <div v-else>
      <div class="moring">
        <div class="sunny">
          <el-icon><Sunny /></el-icon>
          <p>上午号源</p>
        </div>
        <div class="doctor">
          <div class="item" v-for="item in schedule_moring" :key="item.id">
            <div class="doc_info">
              <p class="doc_name">{{ item.title }}|{{ item.docname }}</p>
              <p class="doc_key">{{ item.skill }}</p>
            </div>
            <el-text class="money" type="danger">￥{{ item.amount }}</el-text>
            <el-button type="primary">剩余{{ item.availableNumber }}</el-button>
          </div>
        </div>
      </div>
      <div class="night">
        <div class="sunrise">
          <el-icon><Sunrise /></el-icon>
          <p>下午号源</p>
        </div>
        <div class="doctor">
          <div class="item" v-for="item, in schedule_night" :key="item.id">
            <div class="doc_info">
              <p class="doc_name">{{ item.title }}|{{ item.docname }}</p>
              <p class="doc_key">{{ item.skill }}</p>
            </div>
            <el-text class="money" type="danger">￥{{ item.amount }}</el-text>
            <el-button class="btn" type="primary">剩余{{ item.availableNumber }}</el-button>
          </div>
        </div>
      </div>
    </div>
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
        .select{
          color:#FF4500;
          font-weight: bold;
        }
       }
      }
      ::v-deep(.el-pagination){
        margin:20px 0 0 380px;
      }
    }
    .moring,.night{
      margin: 20px;
      .sunny ,.sunrise{
        display: flex;
        p{
          font-weight: bold;
        }
      }
      .doctor{
        .item{
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #87CEFA;
          margin-bottom: 20px;
          .doc_info{
            flex: 2;
            margin: 10px 0;
            .doc_name{
              color: #87CEFA;
              margin-bottom: 10px;
            }
            .doc_key{
              font-size: 12px;
              color: 		#808080;
            }
          }
          .money{
            margin-right: 30px;
          }
          ::v-deep(.el-button){
            width: 80px;
          }
        }
      }
    }
  }
</style>