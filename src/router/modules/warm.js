
import Layout from '@/layout'

const warmRouter = {
  path: '/warm',
  component: Layout,
  redirect: '/warm/index',
  name: 'Warm',
  meta: {
    title: 'Warm',
    icon: 'nested'
  },
  children: [
    {
      path: 'warm',
      name: 'Warm',
      component: () => import('@/views/warm/index'),
      meta: { title: 'Warm' }
    }
  ]
}

export default warmRouter