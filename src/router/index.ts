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
      component: () => import('@/pages/hospital/index.vue'),
      children:[
        {
          path:'hosRegister',
          component:()=>import('@/pages/hospital/hosRegister/index.vue')
        },
        {
          path:'hosClose',
          component:()=>import('@/pages/hospital/hosClose/index.vue')
        },
        {
          path:'hosNotice',
          component:()=>import('@/pages/hospital/hosNotice/index.vue')
        },
        {
          path:'hosDetail',
          component:()=>import('@/pages/hospital/hosDetail/index.vue')
        },
        {
          path:'hosSearch',
          component:()=>import('@/pages/hospital/hosSearch/index.vue')
        }
      ]
    }
  ],
  scrollBehavior(){
    return{
      left:0,
      top:0,
    } 
  }
})