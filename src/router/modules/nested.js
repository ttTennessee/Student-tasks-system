/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout/components/Sidebar'

const nestedRouter = {
  path: '/team',
  component: Layout,
  name: 'Steam',
  meta: {
    title: '小组管理',
    icon: 'nested'
  },
  redirect: ',/team/search',

  children: [
    {
      path: '/search',
      component: () => import('@/views/team/search/index'),
      name: 'searchTeam',
      meta: { title: '查询小组' }
    },
    {
      path: '/allTeam',
      component: () => import('@/views/team/AllTeam/index'),
      name: 'allTeam',
      meta: { title: '查看小组' }
    },
    {
      path: '/createTeam',
      component: () => import('@/views/team/create/index'),
      name: 'createTeam',
      meta: { title: '创建小组' }
    },
  ]
}

export default nestedRouter
