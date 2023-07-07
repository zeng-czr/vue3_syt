<script setup lang="ts">
import {Star,Timer} from "@element-plus/icons-vue"

defineProps(
  {
    hospital:{
      type:Object,
      default:()=>{}
    }
  }
)
</script>
<template>
  <div class="content" >
    <el-card class="item" shadow="hover">
      <div class="itemInfo">
        <div class="info">
          <h2 class="name">{{ hospital.hosname }}</h2>
          <div class="detail">
            <text><el-icon :size="20"><Star /></el-icon>{{ hospital.param.hostypeString }}</text>
            <text><el-icon :size="20"><Timer /></el-icon>每天{{ hospital.bookingRule.releaseTime }}放号</text>
          </div>
          
        </div>
        <div class="img">
          <img :src="`data:image/jpeg;base64,${hospital.logoData}`"/>
        </div>
      </div>
    </el-card>
  </div>
</template>
<style scoped lang="scss">
    ::v-deep .el-card__body{
      padding: 0px;
      margin: 0px;
    }
  .content{
    width: 45%;
    height: 100px;
    .item{
      .itemInfo{
        height: 96px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color:#F5F5F5;
        .info{
          .name{
            font-size: 18px;
            font-weight: bold;
            margin: 0px 0px 10px 30px;
          }
          .detail{
            margin: 30px 0 0px 30px;
            color: 		#808080;
            text:first-child{
              margin-right: 20px;
            }
          }
        }
        .img{
          width: 70px;
          height: 70px;
          margin-right: 30px;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>