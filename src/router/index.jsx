import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Memos from '@/pages/Memos'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Memos />
      },
      {
        path: 'todos',
        lazy: () => import('@/pages/Todos')
      }
    ]
  },
  {
    path: '/memo/:id?', // 通过 ? 将路径参数设置为可选项
    lazy: () => import('@/pages/EditMemo')
  }
])

export default router
