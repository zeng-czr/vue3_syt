<script lang="ts" setup>
// import {onMounted} from 'vue'
import {Sunrise,Sunny,Sunset,Pouring,Cloudy,Ship} from "@element-plus/icons-vue"
import {useRouter,useRoute} from "vue-router"
// import userHospitalStore from '@/store/modules/hospital.ts'
// const hospitalStore = userHospitalStore()
const router = useRouter()
const route = useRoute()

// 菜单切换的回调函数
const menuChange = (index:String)=>{
  router.push({
    path:index
  })
}
</script>
<template>
  <div class="hospital">
    <!-- 左侧导航区 -->
    <div class="menu">
      <div class="top">
        <el-icon :size="20"><Ship /></el-icon>
        <p>订单详细信息</p>
      </div>
      <div class="nav">
        <el-menu
          :default-active="route.path"
          class="el-menu-vertical-demo"
          @select="menuChange"
        >
          <el-menu-item index="/order/identification">
            <el-icon><Sunrise/></el-icon>
            <span>实名认证</span>
          </el-menu-item>
          <el-menu-item index="/order/orderList">
            <el-icon><Sunny/></el-icon>
            <span>挂号订单</span>
          </el-menu-item>
          <el-menu-item index="/order/orderManage">
            <el-icon><Sunset/></el-icon>
            <span>就诊人管理</span>
          </el-menu-item>
          <el-menu-item index="/order/changePwd">
            <el-icon><Pouring/></el-icon>
            <span>修改账号信息</span>
          </el-menu-item>
          <el-menu-item index="/order/feedback">
            <el-icon><Cloudy/></el-icon>
            <span>意见反馈</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <!-- 右侧内容区 -->
    <div class="content">
      <!-- 二级路由出口 -->
      <Router-view></Router-view>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .hospital {
    margin-top: 35px;
    display: flex;
    .menu{
      flex: 2;
      .top{
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: 	#87CEFA;
      }
      .nav{
        .el-menu{
          border: none;
        }
        ul{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          li:hover{
            background-color: #FFF;
            color:"#87CEFA";
            font-size: 20px;
          }
        }
      }
    }
    .content{
      flex: 8;
    }
  }
</style>