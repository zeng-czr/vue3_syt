import {defineStore} from 'pinia'
import {getHospitalInfoApi,getDepartmentInfoApi} from '@/api/hospital/index.ts'

const userHospitalStore = defineStore('hospital',{
  state:()=>{
    return {
      hospitalInfo:{},
      departmentArr:[]
    }
  },
  actions:{
    async getHospitalInfo(hoscode:String){
      const res = await getHospitalInfoApi(hoscode)
      this.hospitalInfo = res.data.data
    },
    // getHospitalInfo(hoscode:String){
    //   console.log(hoscode)
    // }
    async getDepartmentInfo(hoscode:String){
      console.log("sotre的请求方法执行了")
      const res = await getDepartmentInfoApi(hoscode)
      this.departmentArr = res.data.data
      console.log(res)
    }
  }
})
export default userHospitalStore