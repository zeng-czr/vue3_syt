<script setup lang="ts">
import Depart from './components/depart.vue'
import {Histogram} from '@element-plus/icons-vue'
import userHospitalStore from '@/store/modules/hospital.ts'
import {useRoute} from "vue-router"
const hospitalStore = userHospitalStore()
const route = useRoute()
console.log(route)

</script>
<template>
  <div class="content">
    <div class="registerInfo">
      <div class="hospitalTitle">
        <p class="name">{{hospitalStore.hospitalInfo.hospital?.hosname}}</p>
        <el-icon :size="18"><Histogram /></el-icon>
        <p>{{hospitalStore.hospitalInfo.hospital?.param.hostypeString}}</p>
      </div>
      <div class="regular">
        <div class="logo">
          <img :src="`data:image/jpeg;base64,` + hospitalStore.hospitalInfo.hospital?.logoData"/>
        </div>
        <div class="info">
          <div class="guahao">
            <p>挂号规则</p>
            <ul class="infoDetail">
              <li>预约周期：
                <el-text class="mx-1" type="primary">{{ hospitalStore.hospitalInfo.bookingRule?.cycle }}</el-text>
              </li>
              <li>放号时间：
                <el-text class="mx-1" type="primary">{{ hospitalStore.hospitalInfo.bookingRule?.releaseTime }}</el-text>
                
              </li>
              <li>停挂时间：
                <el-text class="mx-1" type="primary">{{ hospitalStore.hospitalInfo.bookingRule?.stopTime }}</el-text>
              </li>
              <li>退号时间：
                就诊前一工作日<el-text class="mx-1" type="primary">{{hospitalStore.hospitalInfo.bookingRule?.quitTime}}</el-text>前取消
              </li>
            </ul>
          </div>
          <div class="yuyue">
            <p>医院预约规则</p>
            <ul>
              <li v-for="(item,index) in hospitalStore.hospitalInfo.bookingRule?.rule" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="detail">
      <Depart/>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .content{
    .registerInfo{
      margin: 10px 20px;
      .hospitalTitle{
        display: flex;
        .name{
          font-weight: bold;
          font-size: 20px;
          margin-right: 40px;
        }
      }
      .regular{
        margin-top: 30px;
        display: flex;
        .logo{
          width: 100px;
          height: 100px;
          margin-right: 30px;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .info{
          li{
            color: 	#A9A9A9;
            font-size: 14px;
          }
          .guahao{
            margin-bottom: 30px;
            p{
              margin-bottom: 20px;
              font-weight: bold;
            }
            .infoDetail{
              display: flex;
              flex-wrap: wrap;
              li{
                margin-right: 20px;
              }
            }
          }
          .yuyue{
            p{
              margin-bottom: 20px;
              font-weight: bold;
            }
            li{
              margin: 10px 0;
            }
          }
        }
      }
    }
  }
</style>