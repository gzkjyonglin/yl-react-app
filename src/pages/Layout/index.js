import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, Link, useLocation } from 'react-router-dom'

const { Header, Sider } = Layout

const GeekLayout = () => {
  const { pathname } = useLocation()
  function getItem (label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    }
  }
  const items = [
    getItem(<Link to="/">数据概览</Link>, '/', <HomeOutlined />),
    getItem(<Link to="/artical">内容管理</Link>, '/artical', <DiffOutlined />),
    getItem(<Link to="/publish">发布文章</Link>, '/publish', <EditOutlined />),
  ]
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">user.name</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            defaultSelectedKeys={[pathname]}
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

export default GeekLayout