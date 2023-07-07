import { createApp } from 'vue'
import App from './App.vue'
// 导入全局重置样式
import '@/style/reset.scss'
// 导入路由
import router from "@/router/index.js"
const app = createApp(App)
app.use(router)
app.mount('#app')
