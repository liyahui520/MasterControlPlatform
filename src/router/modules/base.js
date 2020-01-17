/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const baseRouter = {
  path: '/base',
  component: Layout,
  redirect: '/base/unit',
  name: 'Base',
  meta: {
    title: 'Base',
    icon: 'nested'
  },
  children: [
    {
      path: 'unit',
      name: 'Unit',
      component: () => import('@/views/base/unit/index'),
      meta: { title: 'Unit' }
    }
  ]
}

export default baseRouter
