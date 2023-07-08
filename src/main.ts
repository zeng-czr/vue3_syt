import { createApp } from 'vue'
import App from './App.vue'
// 导入全局重置样式
import '@/style/reset.scss'
// 导入路由
import router from "@/router/index.js"
// 导入pinia
import pinia from '@/store/index.ts'
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
