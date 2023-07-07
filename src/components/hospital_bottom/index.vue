<script setup lang="ts">

</script>
<template>
  <div class="bottom">
    <div class="left">
    <span>京ICP备 13018369号</span>
    <span>预约电话010-62666028</span>
    </div>
    <div class="right">
      <span>联系我们</span>
      <span>合作伙伴</span>
      <span>用户协议</span>
      <span>隐私协议</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .bottom{
    width: 100%;
    height: 50px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      margin-left: 35px;
      span{
        margin: 5px;
      }
    }
    .right{
      margin-right: 40px;
      span{
        margin-left: 5px;
        padding-left: 5px;
        border-left: 2px solid #ADD8E6;
        &:hover{
          cursor: pointer;
          color: #ADD8E6;
        }
      }
    }
  }
</style>