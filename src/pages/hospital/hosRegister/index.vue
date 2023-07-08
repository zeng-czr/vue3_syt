<script setup lang="ts">
import {ref} from 'vue'
// import Depart from './components/depart.vue'
import {Histogram} from '@element-plus/icons-vue'
import userHospitalStore from '@/store/modules/hospital.ts'

const hospitalStore = userHospitalStore()

const activeindex= ref('')
const departChildren = ref([])
  // 数字转换字符串，防止警告(强迫症，没有也可以)
const Change=(item:Number)=>{
  return item.toString()
}
  // nav菜单的回调
const navChange =(index:String)=>{
  console.log(index);
  activeindex.value = index
  departChildren.value = hospitalStore.departmentArr[index]
  console.log(departChildren.value)
}

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
      <p class="select">科室选择</p>
      <div class="content" v-if="hospitalStore.departmentArr.length!=0">
        <div class="leftNav">
          <el-menu
            :default-active="activeindex"
            class="el-menu-vertical-demo"
            @select="navChange"
            >
            <el-menu-item v-for="(depart,i) in hospitalStore.departmentArr" :key="depart.depcode" :index="Change(i)" >
              <span>{{ depart?.depname }}</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="department">
          <ul>
            <li v-for="item in departChildren?.children" :key="item.depcode">{{ item?.depname }}</li>
          </ul>
        </div>
      </div>
      <div class="noChildren" v-else>
        暂无科室分类。。。
      </div>
      <!-- <Depart :departmentArr = "hospitalStore.departmentArr"/> -->
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
    .detail{
      .select{
        font-size: 18px;
        font-weight: bold;
      }
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
      .noChildren{
        width: 100%;
        padding-top: 200px;
        text-align: center;
      }
    }
  }
</style>