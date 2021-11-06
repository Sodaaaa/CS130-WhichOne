import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd/lib';
import { HomeOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;

export default class homepage extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to='/homepage'>Home</Link>
            </Menu.Item>
            <Menu.Item key="post" icon={<HomeOutlined />}>
              <Link to='/question'>question</Link>
            </Menu.Item>
            <Menu.Item key="vote" icon={<HomeOutlined />}>
              Vote
            </Menu.Item>            
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
              <div className="site-layout-content">Content</div>
        </Content>  
      </Layout>    
    )
  }
}