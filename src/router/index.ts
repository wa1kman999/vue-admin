import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import producteRouter from './modules/product'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页' }
      },
      // 当前就只写个列表
      producteRouter
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

export const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes
})

router.beforeEach(() => {
  nprogress.start() // 开始加载进度条
})

router.afterEach(() => {
  nprogress.done()
})
