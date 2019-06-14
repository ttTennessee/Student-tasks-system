import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout/index'

/* Router Modules */

import nestedRouter from './modules/nested'
const role = sessionStorage.getItem('role')
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    redirect : '/student/login'
  },
  {
    path: '/dashboard',
    hidden: true,
    redirect : role==='student'? '/student/home' : '/teacher/home'
  },
  {
    path: '/student/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/teacher/login',
    component: () => import('@/views/login/teacher'),
    hidden: true
  },
  {
    path: '/teacher/register',
    component: () => import('@/views/register/teacherIndex'),
    hidden: true
  },
  {
    path: '/student/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/student/home',
    children: [
      {
        path: '/student/home',
        component: () => import('@/views/dashboard/student'),
        name: '个人主页',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/team',
    component: Layout,
    name: 'Steam',
    meta: {
      title: '小组管理',
      icon: 'nested',
      affix: true
    },
    redirect: '/team/search',

    children: [
      {
        path: '/team/search',
        component: () => import('@/views/team/search/index'),
        name: 'searchTeam',
        meta: { title: '查询小组'}
      },
      {
        path: '/team/allTeam',
        component: () => import('@/views/team/AllTeam/index'),
        name: 'allTeam',
        meta: { title: '查看小组'  }
      },
      {
        path: '/team/create',
        component: () => import('@/views/team/create/index'),
        name: 'createTeam',
        meta: { title: '创建小组' }
      },
      {
        path: '/team/mine',
        component: () => import('@/views/team/mine/index'),
        name: 'mineTeam',
        meta: { title: '我的小组' }
      },
    ]
  },


  {
    path: '/teacher',
    component: Layout,
    name: 'STeacher',
    meta: {
      title: '查看老师',
      icon: 'nested',
      affix: true
    },
    redirect: '/teacher/allTeacher',

    children: [
      {
        path: '/teacher/search',
        component: () => import('@/views/teacher/search/index'),
        name: 'searchTeacher',
        meta: { title: '查找老师'}
      },
      {
        path: '/teacher/allTeacher',
        component: () => import('@/views/teacher/AllTeacher/index'),
        name: 'allTeacher',
        meta: { title: '所有老师'  }
      }
    ]
  },


  {
    path: '/tasks',
    component: Layout,
    name: 'STask',
    meta: {
      title: '作业管理',
      icon: 'nested',
      affix: true
    },
    redirect: '/teacher/allTeacher',

    children: [
      {
        path: '/tasks/all',
        component: () => import('@/views/tasks/AllTasks/index'),
        name: 'allTasks',
        meta: { title: '查看作业'}
      },
      {
        path: '/tasks/teacherAll',
        component: () => import('@/views/tasks/AllTasks/teacherIndex'),
        name: 'teacherTasks',
        meta: { title: '查看作业'}
      },
      {
        path: '/tasks/upload',
        component: () => import('@/views/tasks/upload/index'),
        name: 'upload',
        meta: { title: '上传作业'  }
      }
    ]
  },


  {
    path: '/',
    component: Layout,
    redirect: '/teacher/home',
    children: [
      {
        path: '/teacher/home',
        component: () => import('@/views/dashboard/editor'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true },
      }
    ]
  }


]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  nestedRouter,

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,asyncRoutes

})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router


