<script setup lang="ts">
import {onMounted} from 'vue'
import {Sunrise,Sunny,Sunset,Pouring,Cloudy,Ship} from "@element-plus/icons-vue"
import {useRouter,useRoute} from "vue-router"
import userHospitalStore from '@/store/modules/hospital.ts'
const hospitalStore = userHospitalStore()
const router = useRouter()
const route = useRoute()

// 菜单切换的回调函数
const menuChange = (index:String)=>{
  router.push({
    path:index,
    query:{
      hosCode:route.query.hosCode
    }
  })
}
onMounted(()=>{
  console.log('数据持久化执行')
  hospitalStore.getHospitalInfo(route.query.hosCode)
  hospitalStore.getDepartmentInfo(route.query.hosCode)
})

</script>
<template>
  <div class="hospital">
    <!-- 左侧导航区 -->
    <div class="menu">
      <div class="top">
        <el-icon :size="20"><Ship /></el-icon>
        <p>医院详情信息</p>
      </div>
      <div class="nav">
        <el-menu
          :default-active="route.path"
          class="el-menu-vertical-demo"
          @select="menuChange"
        >
          <el-menu-item index="/hospital/hosRegister">
            <el-icon><Sunrise/></el-icon>
            <span>预约挂号</span>
          </el-menu-item>
          <el-menu-item index="/hospital/hosDetail">
            <el-icon><Sunny/></el-icon>
            <span>医院详情</span>
          </el-menu-item>
          <el-menu-item index="/hospital/hosNotice">
            <el-icon><Sunset/></el-icon>
            <span>预约须知</span>
          </el-menu-item>
          <el-menu-item index="/hospital/hosClose">
            <el-icon><Pouring/></el-icon>
            <span>停诊信息</span>
          </el-menu-item>
          <el-menu-item index="/hospital/hosSearch">
            <el-icon><Cloudy/></el-icon>
            <span>查询|取消</span>
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