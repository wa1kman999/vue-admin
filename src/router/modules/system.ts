import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'system',
  component: RouterView,
  meta: {
    title: '系统'
  },
  children: [
    {
      path: 'system_state',
      name: 'system_state',
      component: () => import('@/views/system/state/index.vue'),
      meta: {
        title: '服务器状态'
      }
    }
  ]
}

export default routes
