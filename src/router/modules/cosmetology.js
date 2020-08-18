
import Layout from '@/layout'

const cosmetologyRouter = {
  path: '/cosmetology',
  component: Layout,
  redirect: '/cosmetology/index',
  name: 'Cosmetology',
  meta: {
    title: 'Cosmetology',
    icon: 'nested'
  },
  children: [
    {
      path: 'cosmetology',
      name: 'Cosmetology',
      component: () => import('@/views/cosmetology/index'),
      meta: { title: 'Cosmetology' }
    }
  ]
}

export default cosmetologyRouter