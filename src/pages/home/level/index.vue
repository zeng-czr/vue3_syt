<template>
  <div class="content">
    <h1 class="title">医院快速查询</h1>
    <div class="level">
      <div class="title"><span>等级:</span></div>
      <ul>
        <li class="active">全部</li>
        <li>三级甲等</li>
        <li>三级甲等</li>
        <li>三级甲等</li>
        <li>三级甲等</li>
      </ul>
    </div>
    <div class="addr">
      <div class="title"><span>地区:</span></div>
      <ul>
        <li class="active">全部</li>
        <li>海淀区</li>
        <li>朝阳区</li>
        <li>金水区</li>
        <li>二七区</li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .content{
    margin: 50px 20px 20px 20px;
    border-bottom: 2px solid #00BFFF;
    .title{
      font-size: 20px;
      padding-left: 10px;
      margin-bottom: 30px;
      border-left: 2px solid 	#00BFFF;
    }
    .level{
      display: flex;
      ul{
        display: flex;
        li{
          margin: 0 20px;
          cursor: pointer;
          &.active{
            color: #55a6fe;
            font-size: 18px;
          }
        }
        li:hover{
          color: #55a6fe;
        }
      }
    }
    .addr{
      display: flex;
      ul{
        display: flex;
        cursor: pointer;
        li{
          margin: 0 20px;
          &.active{
            color: #55a6fe;
            font-size: 18px;
          }
        }
        li:hover{
          color: #55a6fe;
        }
      }
    }
  }
</style>