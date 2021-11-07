import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Layout, Menu} from 'antd/lib';
import { HomeOutlined, PlusCircleOutlined, BarsOutlined, UserOutlined } from '@ant-design/icons';
import './homepage.css';
const { Header, Content, Footer} = Layout;

export default class homepage extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo"> Which One </div>
          <div className="menu">
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={['home']}>
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
          </div>
        </Header>
        <Content style={{ padding: '50px 50px' }}>
              <div className="site-layout-content">Home</div>
        </Content> 
        <Footer style={{ textAlign: 'center' }}>CS130 Project By Which One Team</Footer>
      </Layout>    
    )
  }
}