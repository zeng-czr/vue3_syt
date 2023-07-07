<script setup lang="ts">
import {Sunrise,Sunny,Sunset,Pouring,Cloudy,Ship} from "@element-plus/icons-vue"
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
          default-active="2"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="1">
            <el-icon><Sunrise/></el-icon>
            <span>预约挂号</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><Sunny/></el-icon>
            <span>医院详情</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><Sunset/></el-icon>
            <span>预约须知</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><Pouring/></el-icon>
            <span>停诊信息</span>
          </el-menu-item>
          <el-menu-item index="5">
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