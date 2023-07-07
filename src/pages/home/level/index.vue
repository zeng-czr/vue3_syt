<script setup lang="ts">
import {ref} from 'vue'
// 向父组件传递参数
let $emit = defineEmits(['getLevelData']);
// 接收父组件传递的参数
defineProps({
  levelList:{
    type: Array,
    default:()=>[]
  },
  addrList:{
    type: Array,
    default:()=>[]
  }
})
// level的触发函数
const activeLevel = ref('')
const levelTabChange = (value:String)=>{
  activeLevel.value = value
  console.log(activeLevel.value)
  $emit('getLevelData',value);
}
// adddr的触发函数
const activeAddr = ref('')
const addrTabChange = (value:String)=>{
  activeAddr.value = value
  console.log(activeAddr.value)
}
</script>
<template>
  <div class="content">
    <h1 class="Mtitle">医院快速查询</h1>
    <div class="level">
      <div class="title " id="levTit"><span>等级:</span></div>
      <ul>
        <li :class="{active:activeLevel==''}" @click="levelTabChange('')">全部</li>
        <li :class="{active:activeLevel==item.value}" v-for="item in levelList" :key="item.id" @click="levelTabChange(item.value)">{{ item.name }}</li>
      </ul>
    </div>
    <div class="addr">
      <div class="title"><span>地区:</span></div>
      <ul>
        <li :class="{active:activeAddr==''}" @click="addrTabChange('')">全部</li>
        <li :class="{active:activeAddr==item.value}" v-for="item in addrList" :key="item.id" @click="addrTabChange(item.value)">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .content{
    margin: 50px 20px 20px 20px;
    border-bottom: 2px solid #00BFFF;
    .Mtitle{
      width: 200px;
      font-size: 20px;
      padding-left: 10px;
      margin-bottom: 30px;
      border-left: 2px solid 	#00BFFF;
    }
    .title{
      width: 100px;
      font-size: 20px;
      padding-left: 10px;
      margin-bottom: 30px;
      border-left: 2px solid 	#00BFFF;
    }
    .level{
      display: flex;
      #levTit{
        width: 70px;
      }
      ul{
        display: flex;
        li{
          margin: 0 20px;
          cursor: pointer;
          &.active{
            color: #55a6fe;
            font-size: 18px;
          }
        }
        li:hover{
          color: #55a6fe;
        }
      }
    }
    .addr{
      display: flex;
      ul{
        display: flex;
        cursor: pointer;
        flex-wrap: wrap;
        li{
          margin: 0 20px;
          &.active{
            color: #55a6fe;
            font-size: 18px;
          }
        }
        li:hover{
          color: #55a6fe;
        }
      }
    }
  }
</style>