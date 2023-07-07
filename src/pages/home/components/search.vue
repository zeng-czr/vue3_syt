<script setup lang="ts">
import {ref} from 'vue'
import {Search} from "@element-plus/icons-vue"
const state = ref('')
</script>
<template>
  <div class="content">
    <el-icon class="icon" :size="18"><Search/></el-icon>
    <el-autocomplete
    class="autoInput"
    v-model="state"
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