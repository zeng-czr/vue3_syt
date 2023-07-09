import {defineStore} from 'pinia'
import {getCodeApi,getUserLoginApi} from "@/api/user/index.ts"
const useUserStore = defineStore('user',{
  state:()=> {
    return {
      isLogin:false,//登录组件的显示隐藏
      code:'',//验证码
      userInfo:{
        name:'',
        token:''
      }
    }
  },
  actions: {
    // 获取验证码
    async getCode (code:String){
      const res = await getCodeApi(code)  
      if(res.data.code == 200){
        console.log(res)
        this.code = res.data.data
      }
      
    },
    async getUserLogin(data:any){
      const res =  await getUserLoginApi(data)
      console.log(res);
      if(res.data.code ==200){
        this.userInfo = res.data.data
      }
    },
    logout(){
      this.userInfo = {name:'',token:''}
    }
  },
  persist:{
    key:'userInfo',
    storage:localStorage
  }
})
export default useUserStore