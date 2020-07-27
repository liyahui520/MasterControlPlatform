/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const stockRouter = {
  path: '/stock',
  component: Layout,
  redirect: '/stock/drugs',
  name: 'Stock',
  meta: {
    title: 'Stock',
    icon: 'nested'
  },
  children: [
    {
      path: 'drugs',
      name: 'Drugs',
      component: () => import('@/views/stock/drugs/index'),
      meta: { title: 'drugs' }
    },
    {
      path: 'consumables',
      name: 'Consumables',
      component: () => import('@/views/stock/consumables/index'),
      meta: { title: 'consumables' }
    },
    {
      path: 'goods',
      name: 'Goods',
      component: () => import('@/views/stock/goods/index'),
      meta: { title: 'Goods' }
    }
  ]
}

export default stockRouter
