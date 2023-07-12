<script lang="ts" setup>
import {ref,onMounted} from 'vue'
import {getPaientsListApi,deletePatientApi,updatePatientApi,addPatientApi} from '@/api/hospital/index.ts'
import {User,Edit,Delete} from '@element-plus/icons-vue'
import {gethospitalLevelApi} from '@/api/home/index.ts'
const selectUser = ref({})
const selectIndex = ref('-1')
const patientList = ref([])

const updatePatient = ref({})
const savePatient = ref({
  name:'',
  certificatesType:'',
  certificatesNo:'',
  sex:'',
  birthdate:'',
  phone:'',
  isMarry:'',
  address:' '
})
const dialogVisible = ref(false)
const dialogAdd = ref(false)
const certationArr = ref([])
const changeIndex  = (index:string,user:any)=>{
  // console.log(user)
  selectUser.value = user
  selectIndex.value = index
}
const getPatientList = async()=>{
  const res = await getPaientsListApi()
  patientList.value = res.data.data
}
// 获取证件类型的数据
const getCertificateType =async ()=>{
  const res = await gethospitalLevelApi('CertificatesType')
  certationArr.value = res.data.data
}
// 编辑就诊人信息
const editPatient = (user:any)=>{
  console.log(user)
  dialogVisible.value = true
  updatePatient.value = user
}
// 添加就诊人信息
const addPatient = ()=>{
  dialogAdd.value = true
}
// 编辑的执行函数
const editConfirm = async()=>{
  const res = await updatePatientApi(updatePatient.value)
  console.log(res)
  if(res.data.data){
    ElMessage({
      type: "success",
      message: "修改就诊人成功",
    })
  }else{
    ElMessage({
      type: "error",
      message: "修改就诊人失败",
    })
  }
}
const addConfirm = async()=>{
  const res = await addPatientApi(savePatient.value)
  console.log(res)
  if(res.data.data){
    ElMessage({
      type: "success",
      message: "添加就诊人成功",
    })
  }else{
    ElMessage({
      type: "error",
      message: "添加就诊人失败",
    })
  }
  dialogAdd.value=false
  getPatientList()
}
// 删除的执行函数
const deletePatient = async(user:any)=>{
  console.log(user)
  const res = await deletePatientApi(user.id)
  if(res.data.data){
    ElMessage({
      type: "success",
      message: "删除就诊人成功",
    })
  }else{
    ElMessage({
      type: "error",
      message: "删除就诊人失败",
    })
  }
  dialogVisible.value=false
}
const resetConfirm = ()=>{
  updatePatient.value  = {}
}
onMounted(()=>{
  getPatientList(),
  getCertificateType()
})
</script>
<template>
  <div class="content">
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>就诊人管理</span>
          <el-button type="primary" size="default" :icon="User" @click="addPatient()">添加就诊人</el-button>
        </div>
      </template>
      <!-- 卡片的身体部分展示就诊人信息 -->
      <div class="user">
        <el-card shadow="hover" class="item" v-for="(user, index) in patientList" :key="index">
          <template #header>
            <div class="card-header">
              <span class="name">{{ user.name }}</span>
              <el-button type="primary"><el-icon :size="18" @click="editPatient(user)"><Edit /></el-icon></el-button>
              <el-button type="danger"><el-icon :size="18" @click="deletePatient(user)"><Delete /></el-icon></el-button>
              
            </div>
          </template>
          <ul @click="changeIndex(index,user)">
            <li>身份证类型: <el-tag type="success">{{ user.certificatesType==10?'身份证':'户口本' }}</el-tag></li>
            <li>身份证号码: <el-tag type="success">{{ user.certificatesNo }}</el-tag></li>
            <li>用户性别: {{ user.sex==0?'女':'男' }}</li>
            <li>出生日期: {{ user.birthdate }}</li>
            <li>手机号码: {{ user.phone }}</li>
            <li>婚姻状况: {{ user.isMarry==0?'未婚':'已婚' }}</li>
            <li>当前地址: {{ user.address }}</li>
          </ul>
          <div :class="{'selected':selectIndex==index}"></div>
        </el-card>
      </div>
    </el-card>
  </div>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      >
      <el-form
        label-width="100px"
        :model="updatePatient"
        style="max-width: 460px"
        >
        <el-form-item label="就诊姓名">
          <el-input v-model="updatePatient.name" />
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select
            placeholder="请你选择证件的类型"
            style="width: 100%"
            v-model="updatePatient.certificatesType"
            >
            <el-option
              v-for="item in certationArr"
              :key="item.id"
              :label="item.name"
              :value="item.value"
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input v-model="updatePatient.certificatesNo" />
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="updatePatient.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            value-format="YYYY-MM-DD"
            v-model="updatePatient.birthdate"
            type="date"
            placeholder="Pick a day"
            :size="18"
          />  
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="updatePatient.phone" />
        </el-form-item>
        <el-form-item label="婚姻状况">
          <el-radio-group v-model="updatePatient.isMarry">
            <el-radio :label="1">已婚</el-radio>
            <el-radio :label="0">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前地址">
          <el-input v-model="updatePatient.address" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="editConfirm()">修改信息</el-button>
          <el-button type="primary" @click="resetConfirm()">重置信息</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
  <div>
    <el-dialog
      v-model="dialogAdd"
      title="Tips"
      width="30%"
      >
      <el-form
        label-width="100px"
        :model="savePatient"
        style="max-width: 460px"
        >
        <el-form-item label="就诊姓名">
          <el-input v-model="savePatient.name" />
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select
            placeholder="请你选择证件的类型"
            style="width: 100%"
            v-model="savePatient.certificatesType"
            >
            <el-option
              v-for="item in certationArr"
              :key="item.id"
              :label="item.name"
              :value="item.value"
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input v-model="savePatient.certificatesNo" />
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="savePatient.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            value-format="YYYY-MM-DD"
            v-model="savePatient.birthdate"
            type="date"
            placeholder="Pick a day"
            :size="18"
          />  
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="savePatient.phone" />
        </el-form-item>
        <el-form-item label="婚姻状况">
          <el-radio-group v-model="savePatient.isMarry">
            <el-radio :label="1">已婚</el-radio>
            <el-radio :label="0">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前地址">
          <el-input v-model="savePatient.address" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="addConfirm()">添加信息</el-button>
          <el-button type="primary" @click="resetConfirm()">重置信息</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.box-card {
    margin: 20px 0px;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user {
      display: flex;
      flex-wrap: wrap;
      .name{
        flex: 2;
      }
      .item {
        width: 32%;
        margin: 5px;
        position: relative;
        ul{
          &:hover{
            cursor: pointer;
            color: #4aaef5;
          }
          li{
            margin: 10px 0;
          }
        }
        .selected{
          position: absolute;
          left: 20%;
          top: 30%;
          width: 200px;
          height: 200px;
          color: red;
          font-size: 36px;
          border-radius: 50%;
          border: 4px dashed red;
          text-align: center;
          line-height: 200px;
          opacity: 0.3;
          transform: rotate(45deg);
          &:after{
            content:'已选择'
          }
        }
      }
    }
  }
</style>