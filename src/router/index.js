import { createWebHashHistory } from 'vue-router'
import { createRouter } from 'vue-router'
import layout from '../layout/index.vue'

/**
 * 公开路由表
 */
const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: layout,
    redirect: '/dashboard',
    children: [
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   component: () => import('@/views/profile/index.vue'),
      //   meta: {
      //     title: '个人中心',
      //     icon: 'user'
      //   }
      // },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '仪表盘',
          icon: 'dashboard'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401.vue')
      }
    ]
  }
]

/**
 * 私有路由表
 */
const privateRoutes = [
  // {
  //   path: '/user',
  //   component: layout,
  //   redirect: '/user/manage',
  //   meta: {
  //     title: '用户',
  //     icon: 'personnel'
  //   },
  //   children: [
  //     {
  //       path: '/user/manage',
  //       component: () => import('@/views/user-manage/index.vue'),
  //       meta: {
  //         title: '用户管理',
  //         icon: 'personnel-manage'
  //       }
  //     },
  //     {
  //       path: '/user/role',
  //       component: () => import('@/views/role-list/index.vue'),
  //       meta: {
  //         title: '用户列表',
  //         icon: 'role'
  //       }
  //     },
  //     {
  //       path: '/user/permission',
  //       component: () => import('@/views/permission-list/index.vue'),
  //       meta: {
  //         title: '权限列表',
  //         icon: 'permission'
  //       }
  //     },
  //     {
  //       path: '/user/info/:id',
  //       name: 'userInfo',
  //       component: () => import('@/views/user-info/index.vue'),
  //       meta: {
  //         title: 'userInfo'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/article',
  //   component: layout,
  //   redirect: '/article/ranking',
  //   meta: {
  //     title: '文章',
  //     icon: 'article'
  //   },
  //   children: [
  //     {
  //       path: '/article/ranking',
  //       component: () => import('@/views/article-ranking/index.vue'),
  //       meta: {
  //         title: '文章排名',
  //         icon: 'article-ranking'
  //       }
  //     },
  //     {
  //       path: '/article/:id',
  //       component: () => import('@/views/article-detail/index.vue'),
  //       meta: {
  //         title: '文章详情'
  //       }
  //     },
  //     {
  //       path: '/article/create',
  //       component: () => import('@/views/article-create/index.vue'),
  //       meta: {
  //         title: '创建文章',
  //         icon: 'article-create'
  //       }
  //     },
  //     {
  //       path: '/article/editor/:id',
  //       component: () => import('@/views/article-create/index.vue'),
  //       meta: {
  //         title: '编辑文章'
  //       }
  //     }
  //   ]
  // }
  {
    path: '/goods',
    component: layout,
    redirect: '/goods/goodsList',
    meta: {
      title: '商品',
      icon: 'goods'
    },
    children: [
      {
        path: '/goods/goodsList',
        component: () => import('@/views/goods-list/index.vue'),
        meta: {
          title: '商品列表',
          icon: 'goods-list'
        }
      },
      {
        path: '/goods/:id',
        component: () => import('@/views/goods-detail/index.vue'),
        meta: {
          title: '商品详情'
        }
      },
      {
        path: '/goods/create',
        component: () => import('@/views/goods-create/index.vue'),
        meta: {
          title: '商品添加',
          icon: 'goods-create'
        }
      }
    ]
  },
  {
    path: '/order',
    component: layout,
    redirect: '/order/orderList',
    meta: {
      title: '订单',
      icon: 'order'
    },
    children: [
      {
        path: '/order/orderList',
        component: () => import('@/views/order-list/index.vue'),
        meta: {
          title: '订单列表',
          icon: 'order-list'
        }
      },
      {
        path: '/order/:id',
        component: () => import('@/views/order-detail/index.vue'),
        meta: {
          title: '订单详情'
        }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes, ...privateRoutes]
})

export default router
