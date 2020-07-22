/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const productRouter = {
  path: '/products',
  component: Layout,
  redirect: '/products/drugs',
  name: 'Products',
  meta: {
    title: 'products',
    icon: 'nested'
  },
  children: [
    {
      path: 'drugs',
      name: 'Drugs',
      component: () => import('@/views/productmanagement/drugs/index'),
      meta: { title: 'drugs' }
    },
    {
      path: 'consumables',
      name: 'Consumables',
      component: () => import('@/views/productmanagement/consumables/index'),
      meta: { title: 'consumables' }
    },
    {
      path: 'goods',
      name: 'Goods',
      component: () => import('@/views/productmanagement/goods/index'),
      meta: { title: 'Goods' }
    }
  ]
}

export default productRouter
