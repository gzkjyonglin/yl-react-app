import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/index'
import { useNavigate } from 'react-router-dom'

const { Header, Sider } = Layout

const GeekLayout = () => {
  const { pathname } = useLocation()
  function getItem (label, key, icon, children, type) {
    return {
      label,
      key,
      icon,
      children,
      type,
    }
  }
  const items = [
    getItem(<Link to="/">数据概览</Link>, '/', <HomeOutlined />),
    getItem(<Link to="/artical">内容管理</Link>, '/artical', <DiffOutlined />),
    getItem(<Link to="/publish">发布文章</Link>, '/publish', <EditOutlined />),
  ]
  const { userStore, loginStore } = useStore()
  useEffect(() => {
    userStore.getUserInfo()
  }, [userStore])
  const navigate = useNavigate()
  const onLogout = () => {
    loginStore.loginOut()
    navigate('/login')
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">id:{userStore.userInfo.id}</span>
          <span className="user-name">superadmin:winy</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onLogout}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            defaultSelectedKeys={[pathname]}
            selectedKeys={[pathname]}
            mode="inline"
            items={items}
            style={{ height: '100%', borderRight: 0 }}
          />
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(GeekLayout)