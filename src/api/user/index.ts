import instance from "@/utils/http";
// 验证码接口
export const getCodeApi = (iphone:String)=>{
  return instance({
    url:`/sms/send/${iphone}`
  })
}
// 用户登录接口
export const getUserLoginApi = (data:any)=>{
  return instance({
    url:`/user/login`,
    method: 'POST',
    data
  })
}
// 二维码登录接口
export const getWxLoginApi = (iphone:String)=>{
  return instance({
    url:`/sms/send${iphone}`
  })
}
// 用户认证
export const getidentificationApi = (data:any)=>{
  return instance({
    url:'/user/auth/userAuah',
    method: 'POST',
    data
  })
}
