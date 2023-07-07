import { createRouter, createWebHistory } from 'vue-router'
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      component: () => import('@/pages/home/index.vue')
    },
    {
      path: '/hospital',
      component: () => import('@/pages/hospital/index.vue')
    }
  ],
  scrollBehavior(){
    return{
      left:0,
      top:0,
    } 
  }
})