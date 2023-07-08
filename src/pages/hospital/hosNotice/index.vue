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
  </div>
</template>