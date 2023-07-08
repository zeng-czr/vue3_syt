<script lang="ts" setup>
import userHospitalStore from '@/store/modules/hospital.ts'
import {Position ,Histogram} from '@element-plus/icons-vue'
const hospitalStore = userHospitalStore()
</script>
<template>
 <div class="content">
    <div class="registerInfo">
      <div class="hospitalTitle">
        <p class="name">{{hospitalStore.hospitalInfo.hospital?.hosname}}</p>
        <el-icon :size="18"><Histogram /></el-icon>
        <p>{{hospitalStore.hospitalInfo.hospital?.param.hostypeString}}</p>
      </div>
      <div class="detail">
        <div class="logo">
          <img :src="`data:image/jpeg;base64,` + hospitalStore.hospitalInfo.hospital?.logoData"/>
        </div>
        <div class="info">
          <el-icon :size="18"><Position /></el-icon>
          <p class="route">{{ hospitalStore.hospitalInfo.hospital.route }}</p>
        </div>
      </div>
      <div class="intro">
        <p class="introTit">医院介绍</p>
        <p class="introCon">
          北京协和医院是集医疗、教学、科研于一体的大型三级甲等综合医院，是国家卫生计生委指定的全国疑难重症诊治指导中心，
          也是最早承担高干保健和外宾医疗任务的医院之一，以学科齐全、技术力量雄厚、特色专科突出、多学科综合优势强大享誉海
          内外。在2010、2011、2012、2013、2014年复旦大学医院管理研究所公布的“中国最佳医院排行榜”中连续五年名列榜首。 
          医院建成于1921年，由洛克菲勒基金会创办。建院之初，就志在“建成亚洲最好的医学中心”。90余年来，医院形成了“严谨、
          求精、勤奋、奉献”的协和精神和兼容并蓄的特色文化风格，创立了“三基”、“三严”的现代医学教育理念，形成了以“教授、
          病案、图书馆”著称的协和“三宝”，培养造就了张孝骞、林巧稚等一代医学大师和多位中国现代医学的领军人物，并向全国
          输送了大批的医学管理人才，创建了当今知名的10余家大型综合及专科医院。2011年在总结90年发展经验的基础上，创新性
          提出了“待病人如亲人，提高病人满意度；待同事如家人，提高员工幸福感”新办院理念。 目前，医院共有2个院区、总建筑
          面积53万平方米，在职职工4000余名、两院院士5人、临床和医技科室53个、国家级重点学科20个、国家临床重点专科29个、
          博士点16个、硕士点29个、国家级继续医学教育基地6个、二级学科住院医师培养基地18个、三级学科专科医师培养基地15个。开
          放住院床位2000余张，单日最高门诊量约1.5万人次、年出院病人约8万余人次。被评为“全国文明单位”、“全国创先争优先进
          基层党组织”、“全国卫生系统先进集体”、“首都卫生系统文明单位”、“最受欢迎三甲医院”，荣获全国五一劳动奖章。同时，
          医院还承担着支援老少边穷地区、国家重要活动和突发事件主力医疗队的重任，在2008年北京奥运工作中荣获“特别贡献奖”。
           90多年来，协和人以执着的医志、高尚的医德、精湛的医术和严谨的学风书写了辉煌的历史，今天的协和人正为打造“国际知名、
           国内一流”医院的目标而继续努力。
        </p>
      </div>
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
      .detail{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 40px;
        .logo{
          width: 190px;
          height: 100px;
          margin-right: 30px;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .info{
          display: flex;
        }
      }
      .intro{
        margin-top: 30px;
        .introTit{
          font-size: 18px;
          font-weight: bold;
          margin: 20px 0;
        }
        .introCon{
          font-size: 14px;
          color: 	#808080;
          line-height: 25px;
        }
      }
    }
}
</style>