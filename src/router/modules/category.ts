import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'category',
  component: RouterView,
  meta: {
    title: '分类管理'
  },
  children: [
    {
      path: 'category_list',
      name: 'category_list',
      component: () => import('@/views/category/list/index.vue'),
      meta: {
        title: '分类列表'
      }
    }
  ]
}

export default routes
