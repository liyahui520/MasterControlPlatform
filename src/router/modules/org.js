/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const orgRouter = {
  path: '/org',
  component: Layout,
  redirect: '/org/businesstype',
  name: 'Businesstype',
  meta: {
    title: 'Businesstype',
    icon: 'nested'
  },
  children: [
    {
      path: 'businesstype',
      name: 'Businesstype',
      component: () => import('@/views/org/businesstype/index'),
      meta: { title: 'Businesstype' }
    }
  ]
}

export default orgRouter
