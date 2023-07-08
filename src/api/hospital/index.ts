import instance from '@/utils/http.ts';

export const  getHospitalInfoApi = (hoscode:String)=>{
  return instance({
    url:`/hosp/hospital/${hoscode}`
  })
}
export const getDepartmentInfoApi = (hoscode:String)=>{
  return instance({
    url:`/hosp/hospital/department/${hoscode}`
  })
}