<script lang="ts" setup>
import { UploadFilled } from '@element-plus/icons-vue'
</script>
<template>
  <div class="content">
    <div class="notion">
      <el-text type="info">完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。</el-text>
    </div>
    <div class="mainForm">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>认证信息表</span>
          </div>
        </template>
        <el-form
          class="formInfo"
          label-width="100px"
          label-position="right"
          >
          <el-form-item label="真实姓名">
            <el-input/>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select placeholder="Select" style="width: 100%">
              <el-option label="身份证" value="1" />
              <el-option label="户口簿" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input/>
          </el-form-item>
          <el-form-item label="证件上传">
            <el-upload
              class="upload-demo"
              drag
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              multiple
              >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                点击或者拖拽上传手持证件照照片
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item >
            <el-button type="success">确认认证</el-button>
            <el-button type="primary">重置表单</el-button>
          </el-form-item>
          
        </el-form>
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
  }
}
</style>