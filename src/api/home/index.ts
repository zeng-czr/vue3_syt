// 首页home相关接口api
import instance from "@/utils/http";

// 获取医院信息
export const getHospitaiApi = (page:number,limit:number)=>{
  return instance({
    url:`/hosp/hospital/${page}/${limit}`,
  })
}
// 获取医院等级和地区
export const gethospitalLevelApi = (value:String)=>{
  return instance({
    url:`/cmn/dict/findByDictCode/${value}`
  })
}
// 根据关键字搜索
export const getHospitalBykeyApi = (key:String)=>{
  return instance({
    url:`/hosp/hospital/findByHosname/${key}`
  })
}