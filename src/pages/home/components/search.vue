<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {Search} from "@element-plus/icons-vue"
import {getHospitalBykeyApi} from '@/api/home/index.ts'
// 数据列表
const keyWord = ref<String>('北京')
const hosList = ref([])
// 获取由关键字搜索到的数据列表
const getHospital = async(key:String)=>{
  const res = await getHospitalBykeyApi(key)
  console.log(res)
} 
onMounted(()=>getHospital(keyWord))


</script>
<template>
  <div class="content">
    <el-icon class="icon" :size="18"><Search/></el-icon>
    <el-autocomplete
    class="autoInput"
    v-model="keyWord"
    :fetch-suggestions="querySearchAsync"
    placeholder="点击输入医院名称"
    @select="handleSelect"
  />
  <el-button class="btn" :icon = "Search"><el-text type="primary">搜索</el-text></el-button>
  </div>
</template>
<style scoped lang="scss">
  .content{
    width: 800px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background-color: aqua;
    padding: 0 10px;
    margin: 0 auto;
    border-bottom: 1px solid 	#DCDCDC;
    .con{
        
    }
    ::v-deep .el-input__wrapper{
      width: 600px;
      border: none;
    }
  }
</style>