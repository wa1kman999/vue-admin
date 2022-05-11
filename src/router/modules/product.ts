import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'product',
  component: RouterView,
  meta: {
    title: '服务器'
  },
  children: [
    {
      path: 'product_list',
      name: 'product_list',
      component: () => import('@/views/product/list/index.vue'),
      meta: {
        title: '服务器列表'
      }
    },
    {
      path: 'product_attr',
      name: 'product_attr',
      component: () => import('@/views/product/attr/index.vue'),
      meta: {
        title: '上传下载'
      }
    }
  ]
}

export default routes
