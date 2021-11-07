import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Layout, Menu} from 'antd/lib';
import {HomeOutlined, PlusCircleOutlined, BarsOutlined, UserOutlined } from '@ant-design/icons';
// import './homepage.css'


const { Header } = Layout;

class MenuBar extends Component {
  render() {
    return (
      <Header>
          <div className="logo"> Which One </div>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={this.props.selected}>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to='/homepage'>Home</Link>
            </Menu.Item>
            <Menu.Item key="question" icon={<PlusCircleOutlined />}>
              <Link to='/question'>Post</Link>
            </Menu.Item>
            <Menu.Item key="vote" icon={<BarsOutlined />}>
              <Link to='/vote'>Vote</Link>
            </Menu.Item>       
            <Menu.Item key="login" icon={<UserOutlined />}>
              <Link to='/login'>Login</Link>
            </Menu.Item>        
          </Menu>
        </Header>   
    )
  }
}

export default MenuBar;