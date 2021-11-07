import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Layout, Menu} from 'antd/lib';
import { HomeOutlined, PlusCircleOutlined, BarsOutlined, UserOutlined } from '@ant-design/icons';
const { Header, Content } = Layout;

export default class vote extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo"> Which One </div>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to='/homepage'>Home</Link>
            </Menu.Item>
            <Menu.Item key="post" icon={<PlusCircleOutlined />}>
              <Link to='/question'>Post</Link>
            </Menu.Item>
            <Menu.Item key="vote" icon={<BarsOutlined />}>
              <Link to='/vote'>Vote</Link>
            </Menu.Item>       
            <Menu.Item key="user" icon={<UserOutlined />}>
              <Link to='/login'>Login</Link>
            </Menu.Item>        
          </Menu>
        </Header>
        <Content style={{ padding: '50px 50px' }}>
              <div className="site-layout-content">Vote</div>
        </Content>  
      </Layout>    
    )
  }
}