
<script setup lang="ts">
import {ArrowRight,Coin,ChatLineSquare,Calendar} from "@element-plus/icons-vue"
</script>
<template>
  <div class="tip">
    <!-- 常见科室的结构 -->
    <div class="deparment">
      <div class="header">
        <div class="left">
          <el-icon :size="18"><Coin /></el-icon>
          <span>常见科室</span>
        </div>
        <div class="right">
          <span>全部</span>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </div>
      <div class="content">
        <ul>
          <li>神经内科</li>
          <li>消化内科</li>
          <li>呼吸内科</li>
          <li>内科</li>
          <li>神经外科</li>
          <li>妇科</li>
          <li>产科</li>
          <li>儿科</li>
        </ul>
      </div>
    </div>
    <!-- 平台公共 -->
    <div class="notice">
      <div class="header">
        <div class="left">
          <el-icon :size="18"><ChatLineSquare /></el-icon>
          <p>平台公告</p>
        </div>
        <div class="right">
          <span>全部</span>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </div>
      <div class="content">
        <ul>
          <li>关于延长北京大学国际医院放假的通知</li>
          <li>北京中医药大学东方医院部分科室医生门诊医</li>
          <li>武警总医院号源暂停更新通知</li>
        </ul>
      </div>
    </div>
    <!-- 停诊公告 -->
    <div class="notice">
      <div class="header">
        <div class="left">
          <el-icon :size="18"><Calendar /></el-icon>
          <p>停诊公告</p>
        </div>
        <div class="right">
          <span>全部</span>
          <el-icon><ArrowRight /></el-icon>

        </div>
      </div>
      <div class="content">
        <ul>
          <li>中国人民解放军总医院第六医学中心(原海军总医院)呼吸内科门诊停诊公告</li>
          <li>首都医科大学附属北京潞河医院老年医学科门诊停诊公告</li>
          <li>中日友好医院中西医结合心内科门诊停诊公告</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.tip {
  color: #7f7f7f;
  .deparment {
    margin-bottom: 50px;
    margin-right: 10px;
    .header {
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        font-weight: bold;
        span {
          margin-left: 5px;
        }
      }
    }
    .content {
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          width: 40%;
          margin-top: 20px;
          font-size: 14px;
           &:hover{
          color: aqua;
          cursor: pointer;
        }
        }
      }
    }
  }
  .notice {
    margin-top: 20px;
    .header {
      display: flex;
      justify-content: space-between;
      .left{
        font-weight: bold;
        display: flex;
      }
    }
    .content {
      margin-bottom: 50px;
      ul {
        li {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 20px;
          font-size: 14px;
          &:hover{
            color: aqua;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
