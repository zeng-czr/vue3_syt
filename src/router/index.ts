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
        },
        {
          path:'register_stp1',
          component:()=>import('@/pages/hospital/hosRegister/register_stp1.vue')
        },
        {
          path:'register_stp2',
          component:()=>import('@/pages/hospital/hosRegister/register_stp2.vue')
        }
      ]
    },
    {
      path:'/order',
      component:() => import('@/pages/order/index.vue'),
      children:[
        {
          path:'identification',
          component:()=>import('@/pages/order/identification/index.vue')
        },
        {
          path:'changePwd',
          component:()=>import('@/pages/order/changePwd/index.vue')
        },
        {
          path:'orderList',
          component:()=>import('@/pages/order/orderList/index.vue')
        },
        {
          path:'orderManage',
          component:()=>import('@/pages/order/orderManage/index.vue')
        },
        {
          path:'feedback',
          component:()=>import('@/pages/order/feedback/index.vue')
        },
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