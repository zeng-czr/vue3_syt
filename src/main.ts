import { createApp } from 'vue'
import App from './App.vue'
// 导入全局重置样式
import '@/style/reset.scss'
// 导入路由
import router from "@/router/index.js"
// 导入pinia
import pinia from '@/store/index.ts'
// 导入组件
import Login from "@/components/login/index.vue"
const app = createApp(App)
app.use(router)
app.use(pinia)
app.component('Login', Login)
app.mount('#app')
