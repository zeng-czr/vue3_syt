<script lang="ts" setup>
import {ref,onMounted} from 'vue'
import {gethospitalLevelApi} from '@/api/home/index.ts'
import {getidentificationApi} from '@/api/user/index.ts'
const typeList  = ref([])
const form = ref(null)
const upload = ref(null)
const status = ref(0)//0表示进入认证页面  1表示认证成功  2表示认证失败
const dialogVisible = ref(false)
const formData = ref({
  certificatesNo: "",
  certificatesType: "",
  certificatesUrl: "",
  name: "",
})
// 获取证件类型的数据
const getCertificateType =async ()=>{
  const res = await gethospitalLevelApi('CertificatesType')
  typeList.value = res.data.data
}
// 认证函数
const confirm = async()=>{
  console.log(formData)
  const res = await getidentificationApi(formData.value)
  console.log(res)
  if(res.data.code==200){
    status.value = 1
    ElMessage({
      type: "success",
      message: res.data.message,
    })
  }else{
    status.value = 2
    ElMessage({
      type: "error",
      message: res.data.message,
    })
  }
  reset()
}
onMounted(()=>{
  getCertificateType()
})
//超出数量的钩子
const exceedhandler = () => {
  ElMessage({
    type: "error",
    message: "图片只能上传一张图片",
  });
};
//图品上传成功的钩子
const successhandler = (response: any) => {
  //如果图片上传成功校验结果清除
  // form.value.clearValidate('certificatesUrl');
  //收集上传成功图片地址
  //response:上传图片请求服务器返回的数据
  //uploadFile上传文件对象
  formData.value.certificatesUrl = response.data;
};

//照片墙预览的钩子
const handlePictureCardPreview = () => {
  //触发预览的钩子的时候，对话框显示
  dialogVisible.value = true;
};

//找皮墙删除图片的钩子
const handleRemove = () => {
  formData.value.certificatesUrl = "";
};

//重写按钮的回调
const reset = () => {
  //清除文件上传列表
  upload.value.clearFiles();
  //清空数据
  Object.assign(formData.value, {
    certificatesNo: "",
    certificatesType: "",
    certificatesUrl: "",
    name: "",
  });
};
</script>
<template>
  <div class="content">
    <div class="notion">
      <el-text type="info">完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。</el-text>
    </div>
    <div class="mainForm">
      <el-card class="box-card" >
        <template #header>
          <div class="card-header">
            <span>认证信息表</span>
          </div>
        </template>
        <el-form 
          v-show="status==0"
          ref="form"
          class="formInfo"
          label-width="100px"
          label-position="right"
          :model = "formData"
          >
          <el-form-item label="真实姓名" >
            <el-input v-model="formData.name" placeholder="请输入真实姓名"/>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select placeholder="选择证件类型" style="width: 100%" v-model="formData.certificatesType">
              <el-option v-for="(type,index) in typeList" :label="type.name" :value="type.name" :key="index"/>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" >
            <el-input v-model="formData.certificatesNo" placeholder="请输入正确的证件号码"/>
          </el-form-item>
          <el-form-item label="证件上传">
            <el-upload
              ref="upload"
              list-type="picture-card"
              :on-remove="handleRemove"
              :on-preview="handlePictureCardPreview"
              :on-success="successhandler"
              :on-exceed="exceedhandler"
              :limit="1"
              action="/api/oss/file/fileUpload?fileHost=userAuah"
            >
              <img
                style="width: 100%; height: 100%"
                src="../../../assets/images/auth_example.png"
                alt=""
              />
            </el-upload>

            <el-dialog v-model="dialogVisible">
              <img
                w-full
                v-if="formData.certificatesUrl"
                style="width: 100%; height: 100%"
                :src="formData.certificatesUrl"
                alt="Preview Image"
              />
            </el-dialog>
          </el-form-item>
          <el-form-item >
            <el-button type="success" @click="confirm()">确认认证</el-button>
            <el-button type="primary" @click="reset()">重置表单</el-button>
          </el-form-item>
        </el-form>
        <div class="result" v-show="status==1">
          <el-result
            icon="success"
            title="实名认证成功"
            sub-title="可以进行其他挂号业务的办理"
            >
          </el-result>  
        </div>
        <div class="result" v-show="status==2">
          <el-result
            icon="error"
            title="实名认证失败"
            sub-title="请重新实名认证操作的办理"
            >
          </el-result>  
        </div>
      </el-card>
    </div>
  </div>
</template>
<style lang="scss" scoped>
::v-deep(.el-upload-dragger){
  padding: 0;
}
.content{
  padding: 10px;
  .notion{
    text-align: center;
    margin-bottom: 30px;
  }
  .mainForm{
    .formInfo{
      max-width: 460px;
      text-align: center;
      margin:0 200px;
      .upload-demo{
        width: 100%;
      }
      button{
        margin: 0 40px;
      }
    }
    .result{
      height: 335.67px;
    }
  }
}
</style>