import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/admin/index.vue'),
      redirect:'/welcome',//重定向
      children:[
       {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/admin/welcome.vue'),
       },
       {
        path: '/card',
        name: 'card',
        component: () => import('../views/admin/card.vue'),
       },
       {
        path: '/qiye',
        name: 'qiye',
        component: () => import('../views/admin/qiye.vue'),
       },
      ]
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('../views/admin/add.vue'),
     },
  ]
})

export default router
