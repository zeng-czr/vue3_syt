<script setup lang="ts">
import Search from "./components/search.vue"
import Level from "./level/index.vue"
import Card  from "./card/index.vue"
</script>
<template>
  <div class="content">
    <!-- 轮播图模块 -->
    <div class="banner">
      <el-carousel indicator-position="outside" height="350px">
        <el-carousel-item v-for="item in 4" :key="item">
          <img style="width: 100%;" src="../../assets/images/web-banner-1.png" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="search">
      <Search/>
    </div>
    <div class="container">
      <el-row gutter="20">
        <el-col :span="20">
          <Level/>
          <div class="card">
            <Card class="cardItem" v-for="item in 6" :key="item"/>
          </div>
        </el-col>
        <el-col :span="4">456</el-col>
      </el-row>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card{
  display: flex;
  flex-wrap: wrap;
  .cardItem{
    margin: 20px;
  }
}
</style>