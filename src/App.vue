<script setup lang="ts">
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
</script>

<template>
  <div class="container">
    <!-- 顶部组件 -->
    <HospitalTop/>
    <div class="content">
      <!-- 一级路由出口 -->
      <router-view/>
    </div>
    <!-- 尾部组件 -->
    <HospitalBottom/>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: 	#F5F5F5;
  overflow-y: hidden;
  overflow-x: auto;
  .content{
    width: 1200px;
    min-height: 680px;
    margin-top: 35px;
    background-color:white;
  }

}
</style>
