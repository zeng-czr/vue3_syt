<script setup lang="ts">
import {ref,onMounted} from 'vue' 
import Search from "./components/search.vue"
import Level from "./level/index.vue"
import Card  from "./card/index.vue"
// 导入接口
import {getHospitaiApi,gethospitalLevelApi} from '@/api/home/index.ts'
// 数据列表
const hospitalList = ref([])
const levelList = ref([])
const addrList = ref([])
// 分页数据
const pageSize = ref(8)
const pageNo = ref(1)
const total = ref(0)
// 获取列表数据
const getHospiyal = async()=>{
  const res = await getHospitaiApi(pageNo.value,pageSize.value)
  // console.log(res)
  hospitalList.value = res.data.data.content
  total.value = res.data.data.totalElements
}
// 获取等级列表数据
const getLevel = async()=>{
  const res = await gethospitalLevelApi('hostype')
  // console.log(res)
  levelList.value = res.data.data
}
// 获取地区列表数据
const getAddr = async()=>{
  const res = await gethospitalLevelApi('Beijin')
  console.log(res)
  addrList.value = res.data.data
}
//分页器页码发生变化时候回调
const currentChange = () => {
  getHospiyal();
};
//分页器下拉菜单发生变化的时候会触发
const sizeChange = () => {
  //当前页码归第一页
  pageNo.value = 1;
  //再次发请求获取医院的数据
  getHospiyal();
};
//接收子组件level传的值
const getLevelData = (value)=>{
  console.log("父组件方法执行")
  console.log(value)
}
onMounted(()=>{getHospiyal(),getLevel(),getAddr()})
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
    <!-- 搜索框模块 -->
    <div class="search">
      <Search/>
    </div>
    <!-- 主体模块 -->
    <div class="container">
      <el-row gutter="20">
        <el-col :span="20">
          <!-- 等级列表模块 -->
          <Level :levelList = "levelList" :addrList = "addrList" @getLevelData = "getLevelData"/>
          <!-- 医院展示卡片模块 -->
          <div class="card">
            <Card class="cardItem" v-for="item in hospitalList" :key="item.id" :hospital = item />
          </div>
          <!-- 分页模块 -->
          <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :background="true"
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
            @current-change="currentChange"
            @size-change="sizeChange"
          />
          
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
::v-deep .el-pagination{
  margin: 10px 15px;
}
</style>