import instance from '@/utils/http.ts';

// 获取医院信息
export const  getHospitalInfoApi = (hoscode:String)=>{
  return instance({
    url:`/hosp/hospital/${hoscode}`
  })
}
// 获取科室部门信息
export const getDepartmentInfoApi = (hoscode:String)=>{
  return instance({
    url:`/hosp/hospital/department/${hoscode}`
  })
}
// 获取科室预约挂号数据
export const getRegisterApi = (page:Number,limit:number,hoscode:String,depcode:String)=>{
  return instance({
    url:`/hosp/hospital/auth/getBookingScheduleRule/${page}/${limit}/${hoscode}/${depcode}`
  })
}
// 获取排班信息
export const getScheduleListApi = (hoscode:String,depcode:String,data:String)=>{
  return instance({
    url:`/hosp/hospital/auth/findScheduleList/${hoscode}/${depcode}/${data}` 
  })
}
// 获取就诊人信息
export const getPaientsListApi = ()=>{
    return instance({
    url:'/user/patient/auth/findAll'
  })
}

// 获取挂号医生信息
export const getDocInfoApi = (scheduleId:String)=>{
  return instance({
    url: `/hosp/hospital/getSchedule/${scheduleId}`
  })
}
// 删除就诊人信息
export const deletePatientApi = (patientId:String)=>{
  return instance({
    url:`/user/patient/auth/remove/${patientId}`,
    method: 'DELETE',
  })
}
// 修改就诊人信息
export const updatePatientApi = (data:any)=>{
  return instance({
    url:'/user/patient/auth/update',
    method: 'PUT',
    data
  })
}
// 添加就诊人信息
export const addPatientApi = (data:any)=>{
  return instance({
    url:'/user/patient/auth/save',
    method: 'POST',
    data
  })
}