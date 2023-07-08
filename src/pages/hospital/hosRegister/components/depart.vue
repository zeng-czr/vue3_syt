<script setup lang="ts">
import {ref} from "vue"
  import userHospitalStore from '@/store/modules/hospital.ts'
  const hospitalStore = userHospitalStore()
  const departList = hospitalStore.departmentArr
  console.log(hospitalStore.departmentArr)

  const activeindex= ref('0')
  const departChildren = ref(departList[0].children)
  // 数字转换字符串，防止警告(强迫症，没有也可以)
  const Change=(item:Number)=>{
    return item.toString()
  }
  // nav菜单的回调
  const navChange =(index:String)=>{
    console.log(index);
    activeindex.value = index
    departChildren.value = departList[index].children
    console.log(departChildren.value)
  }
</script>
<template>
  <div class="content">
    <div class="leftNav">
      <el-menu
        :default-active="activeindex"
        class="el-menu-vertical-demo"
        @select="navChange"
        >
        <el-menu-item v-for="(depart,i) in departList" :key="depart.depcode" :index="Change(i)" >
          <span>{{ depart?.depname }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="department">
      <ul>
        <li v-for="item in departChildren" :key="item.depcode">{{ item?.depname }}</li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .content{
    margin-top: 20px;
    display: flex;
    .leftNav{
      height: 400px;
      overflow-y: auto;
      overflow-y: scroll;
      flex: 2;
      &::-webkit-scrollbar{
        width:0!important
      }
      .is-active{
          border-left: 2px solid #87CEFA;
          border-right: 2px solid #87CEFA;
        }
      li{
        &:hover{
          background-color: #FFF;
            color:"#87CEFA";
            font-size: 20px;
        }
      }
    }
    .department{
      flex: 8;
      height: 400px;
      overflow-y: auto;
      &::-webkit-scrollbar{
        width:0!important
      }
      ul{
        display: flex;
        flex-wrap: wrap;
        li{
          width: 30%;
          margin: 15px 10px;
          &:hover{
            cursor: pointer;
            color: 	#87CEFA;
          }
        }
      }
    }
  }
</style>