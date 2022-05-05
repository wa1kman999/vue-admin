import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'account',
  component: RouterView,
  meta: {
    title: '账号管理'
  },
  children: [
    {
      path: 'account_list',
      name: 'account_list',
      component: () => import('@/views/account/list/index.vue'),
      meta: {
        title: '账号列表'
      }
    }
  ]
}

export default routes
