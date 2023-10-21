import { Outlet } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import { UnorderedListOutline, FillinOutline } from 'antd-mobile-icons'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

const tabs = [
  {
    key: '/',
    title: '备忘录',
    icon: <FillinOutline />
  },

  {
    key: '/todos',
    title: '待办',
    icon: <UnorderedListOutline />
  }
]

function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeKey, setActiveKey] = useState('')

  function switchRoute(path) {
    navigate(path)
    setActiveKey(path)
  }

  // 监听路径变化改变 NavBar 高亮选项
  useEffect(() => {
    setActiveKey(location.pathname)
  }, [location])

  return (
    <div className="layout">
      {/* 二级路由出口 备忘录&待办 */}
      <Outlet />

      {/* TabBar */}
      <TabBar activeKey={activeKey} className="tabbar" onChange={switchRoute}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  )
}

export default Layout
