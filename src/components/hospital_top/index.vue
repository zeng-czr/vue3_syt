<script lang="ts" setup>
import {useRouter} from 'vue-router'
import useUserStore from '@/store/modules/use.ts'
const userStore = useUserStore()
const router = useRouter()
const login = ()=>{
  userStore.isLogin = true
}
</script>
<template>
  <div class="top">
    <div class="content">
      <Router-link to="/">
        <div class="left">
          <img src="../../assets/images/logo.png">
          <p>尚医通·预约挂号统一平台</p>
        </div>
      </Router-link>
      <div class="right">
        <p class="help">帮助中心</p>
        <p class="login" @click="login" v-if="!userStore.userInfo.name">登陆/注册</p>
        <p class="login" v-else>用户名为:{{ userStore.userInfo.name }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.top{
  position: fixed;//固定在顶部不动
  z-index: 999;
  width: 100%;
  height: 70px;
  background-color: 	#fff;
  display: flex;
  justify-content: center;
  
  .content{
    width: 1200px;
    height: 70px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    a{
      text-decoration: none;
    }
    .left{
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img{
        width: 50px;
        height: 50px;
      }
      p{
        margin-left: 5px;
        font-size: 20px;
        color: #ADD8E6;
      }
    }
    .right{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 20px;
      .help{
        border-right: 2px solid #ADD8E6;
        padding-right: 5px;
        margin-right: 5px;
        &:hover{
          color: #ADD8E6;
          cursor: pointer;
        }
      }
      .login{
        &:hover{
          color: #ADD8E6;
          cursor: pointer;
        }
      }
      
    }
  }
}
</style>