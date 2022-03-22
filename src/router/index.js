import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/cluster',
    component: Layout,
    redirect: '/cluster/index',
    meta: {
      title: 'cluster',
      icon: 'el-icon-folder'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/cluster/index'),
        name: 'User',
        meta: { title: 'cluster管理', icon: 'el-icon-s-tools', noCache: true }
      },
      {
        path: 'status',
        component: () => import('@/views/cluster/status'),
        name: 'Status',
        meta: { title: 'cluster状态', icon: 'el-icon-view', noCache: true }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/user/index'),
        name: 'User',
        meta: { title: '用户管理', icon: 'user', noCache: true }
      },
      {
        path: 'profile',
        component: () => import('@/views/user/profile'),
        name: 'Profile',
        hidden: true,
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  },

  {
    path: 'wlua',
    component: Layout,
    children: [
      {
        path: 'https://github.com/hanxi/wlua',
        meta: { title: 'wlua', icon: 'link' }
      }
    ]
  },

  {
    path: 'wlua-demo',
    component: Layout,
    children: [
      {
        path: 'https://github.com/hanxi/wlua-demo',
        meta: { title: 'wlua-demo', icon: 'link' }
      }
    ]
  },

  {
    path: 'skynet-admin',
    component: Layout,
    children: [
      {
        path: 'https://github.com/hanxi/skynet-admin',
        meta: { title: 'skynet-admin', icon: 'link' }
      }
    ]
  },

  {
    path: 'skynet',
    component: Layout,
    children: [
      {
        path: 'https://github.com/cloudwu/skynet',
        meta: { title: 'skynet', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
