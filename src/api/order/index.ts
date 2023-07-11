import instance from '@/utils/http.ts'

// 创建订单号
export const createOrder = (hoscode:String,scheduleId:String,patientId:String)=>{
  return instance({
    url: `/order/orderInfo/auth/submitOrder/${hoscode}/${scheduleId}/${patientId}`,
    method: 'POST'
  })
}
// 通过订单号获取订单
export const getOrderInfoApi = (orderId:String)=>{
  return instance({
    url:`/order/orderInfo/auth/getOrderInfo/${orderId}`
  })
}
// 获取订单列表
export const getOrderInfoListApi = (page:Number,limit:Number)=>{
  return instance({
    url:`/order/orderInfo/auth/${page}/${limit}`
  })
}
// 取消订单
export const canalOrderApi = (orderId:String)=>{
  return instance({
    url:`/order/orderInfo/auth/cancelOrder/${orderId}`
  })
}