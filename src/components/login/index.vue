<script setup lang="ts">
import {ref,computed,reactive} from 'vue'
import {User,Lock} from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/use.ts'
const userStore = useUserStore()
const changeMade = ref(true)
let ruleForm = reactive({
  phone:"",
  code:""
})
// 改变登陆方式手机号和扫码
const change = ()=>{
  changeMade.value = !changeMade.value
}
// 表单验证
let isPhone = computed(()=>{
  const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
  return reg.test(ruleForm.phone)
})
const validatorPhone = (rule: any, value: any, callBack: any) => {
  //rule:即为表单校验规则对象
  //value:即为当前文本的内容
  //callBack:回调函数
  const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
  if (reg.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的手机号码格式"));
  }
};
//验证码自定义校验规则
const validatorCode = (rule: any, value: any, callBack: any) => {
  //rule:即为表单校验规则对象
  //value:即为当前文本的内容
  //callBack:回调函数
  if (/^\d{6}$/.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的验证码格式"));
  }
};
// 验证码自定义校验规则
const rules = {
  phone: [{ trigger: "change", validator: validatorPhone }],
  code: [{ trigger: "change", validator: validatorCode }],
};
// 获取验证码
const getCode = async()=>{
  await userStore.getCode(ruleForm.phone)
  ruleForm.code = userStore.code
}
// 登录
const login= ()=>{
  userStore.getUserLogin(ruleForm)
  userStore.isLogin = false
}
</script>
<template>
  <div class="content">
    <el-dialog
      v-model="userStore.isLogin"
      title="用户登录"
      width="750px"
      >
      <el-row>
        <el-col :span="12">
          <div class="loginForm">
            <div class="iphone" v-show="changeMade">
              <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                status-icon
                :rules="rules"
                class="demo-ruleForm"
                >
                <el-form-item prop="phone">
                  <el-input 
                  v-model="ruleForm.phone" 
                  placeholder="请输入手机号码" 
                  :prefix-icon = "User"
                  />
                </el-form-item>
                <el-form-item prop="code">
                  <el-input
                    v-model="ruleForm.code"
                    placeholder="请输入验证码"
                    :prefix-icon = "Lock"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button :disabled = "!isPhone" style="margin-left: 200px;" @click="getCode">点我获取验证码</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button style="width: 200px;" type="primary" @click="login"
                    >登录</el-button
                  >
                  <el-button style="width: 110px;" @click="console.log('重置')">重置</el-button>
                </el-form-item>
              </el-form>
              <div class="change">
                <p @click="change">微信扫码登陆</p>
              </div>
            </div>
            <div class="codeWx" v-show="!changeMade">
              <img src="../../assets/images/code_login_wechat.png" alt="">
              <div class="change">
                <p @click="change">手机号登陆</p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="box">
            <div class="oneBox">
              <img src="../../assets/images/code_app.png" alt="">
              <p>微信扫一扫关注</p>
              <p>"快速预约挂号"</p>
            </div>
            <div class="twoBox">
              <img src="../../assets/images/code_app.png" alt="">
              <p>扫一扫下载</p>
              <p>"预约挂号APP"</p>
            </div>
          </div>
          <div class="boxBottom">
            <text>XXXXX官方指定平台</text>
            <text>快速挂号，安全放心</text>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
  .content{
    .loginForm{

      width: 350px;
      box-shadow: 0 0 20px 10px  #DCDCDC;
      padding: 10px;  
      ::v-deep(.el-form-item){
        margin: 30px 0;
      }
      .iphone{
        .change{
          &:hover{
            color: #00BFFF;
            cursor: pointer;
            text-decoration-line: underline;
          }
        }
      }
      .codeWx{
        padding: 30px 30px 0 30px;
        .change{
          margin-top: 10px;
          padding-left: 0;
          &:hover{
            color: #00BFFF;
            cursor: pointer;
            text-decoration-line: underline;
          }
        }
      }
    }
    ::v-deep(.el-dialog__body){
      border-top: 2px solid #00BFFF;
      .box{
        border-left: 1px solid 	#F5F5F5;
        display: flex;
        .oneBox , .twoBox{
          width: 200px;
          margin: 20px;
          img{
            width: 150px;
            height: 150px;
          }
          p{
            text-align: center;
            margin: 10px 0;
          }
        }
      }
      .boxBottom{
        display: flex;
        flex-direction: column;
        align-items: center;
        text{
          margin: 10px 0;
          font-size: 22px;
        }
      }
    }
  }
</style>