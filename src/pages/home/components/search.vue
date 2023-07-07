<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {Search} from "@element-plus/icons-vue"
import {getHospitalBykeyApi} from '@/api/home/index.ts'
// 数据列表
const keyWord = ref('')
const hosList = ref([])
// 获取由关键字搜索到的数据列表
const getHospital = async(key:String,cb:any)=>{
  console.log(key)
  console.log(cb)
  const res = await getHospitalBykeyApi(key)
  let showData = res.data.data.map((item) => {
    return {
      value: item.hosname, //展示的医院的名字
      hoscode: item.hoscode, //存储医院的编码
    };
  });
  console.log(res)
  cb(showData)
} 
// onMounted(()=>getHospital(keyWord.value))


</script>
<template>
  <div class="content">
    <el-icon class="icon" :size="18"><Search/></el-icon>
    <el-autocomplete
    class="autoInput"
    v-model="keyWord"
    :fetch-suggestions="getHospital"
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
    
    ::v-deep .el-input__wrapper{
      width: 600px;
      border: none;
    }
  }
</style>