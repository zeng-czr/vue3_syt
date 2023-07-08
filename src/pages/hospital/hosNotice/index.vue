<script lang="ts" setup>
import userHospitalStore from '@/store/modules/hospital.ts'
const hospitalStore = userHospitalStore()
</script>
<template>
  <div class="content">
   <div class="title">{{hospitalStore.hospitalInfo.hospital?.hosname}}预约挂号须知</div>
   <p class="next">为方便您早日就医康复，请您认真阅读预约挂号须知：</p>
   <div class="one">
    <p class="subTitle">一、预约实名制：</p>
    <p>统一平台电话预约和网上预约挂号均采取实名制注册预约，请您如实提供就诊人员的真实姓名、
      有效证件号（身份证、护照）、性别、手机号码、社保卡号等基本信息。</p>
   </div>
   <div class="two">
    <p class="subTitle">二、预约挂号</p>
    <p class="rule">按照北京市卫健委统一平台要求，预约挂号规则如下：</p>
    <ul>
      <li>在同一自然日，同一医院，同一科室，同一就诊单元，同一就诊人，可以预约最多1个号源；</li>
      <li>在同一自然周，同一就诊人，可以预约最多8个号源；</li>
      <li>在同一自然月，同一就诊人，可以预约最多12个号源；</li>
      <li>在同一自然季度，同一就诊人，可以预约最多24个号源</li>
    </ul>
   </div>
   <div class="three">
    <p class="subTitle">三、取消预约</p>
    <p>已完成预约的号源，如需办理退号，至少在就诊前一工作日14:00前通过网站、
      微信公众号、114电话等平台预约渠道进行取消预约。</p>
   </div>
   <div class="four">
    <p class="subTitle">四、爽约处理：</p>
    <p class="no">如预约成功后患者未能按时就诊且不办理取消预约号视为爽约，同一患者在自然年内爽约规则如下</p>
    <ul>
      <li>累计爽约3次，自3次爽约日起，90天内不允许通过114平台进行预约挂号；</li>
      <li>累计爽约6次，自6次爽约日起，180天内不允许通过114平台进行预约挂号。</li>
    </ul>
   </div>
  </div>
</template>
<style lang="scss" scoped>
  .subTitle{
        font-size: 18px;
        font-weight: 550;
        margin: 10px 0;
      }
  .content{
    .title{
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin: 10px 0;
    }
    .next{
      margin: 60px 0 20px 0;
    }
    .one,.two,.three,.four{
      margin: 30px 0;
    }
    .two{
      .rule{
        margin: 20px 0;
      }
      ul{
        li{
          margin: 5px 0;
        }
      }
    }
    .four{
      .no{
        margin: 15px 0;
      }
      ul{
        li{
          margin: 5px 0;
        }
      }
    }
  }
</style>