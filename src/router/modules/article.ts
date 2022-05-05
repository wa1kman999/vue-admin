import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'article',
  component: RouterView,
  meta: {
    title: '文章'
  },
  children: [
    {
      path: 'article_list',
      name: 'article_list',
      component: () => import('@/views/article/list/index.vue'),
      meta: {
        title: '文章列表'
      }
    },
    {
      path: 'create_article',
      name: 'create_article',
      component: () => import('@/views/article/create/index.vue'),
      meta: {
        title: '新建文章'
      }
    }
  ]
}

export default routes
