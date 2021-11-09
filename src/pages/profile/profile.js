import React, { Component } from 'react';
import { Layout } from 'antd/lib';
import "./profile.css";
import MenuBar from '../../components/MenuBar/MenuBar'

const { Header, Content } = Layout;

export default class vote extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo"> Which One </div>
          <MenuBar selected="login"></MenuBar>
        </Header>
        <Content style={{ padding: '0px 50px' }} className='profile-content'>
          Profile
        </Content>
      </Layout>
    )
  }
}
