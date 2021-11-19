import React, { Component } from 'react';
import { Layout } from 'antd/lib';
import "./profile.css";
import MenuBar from '../../components/MenuBar/MenuBar'

const { Header, Content } = Layout;

export default class profile extends Component {
  render() {
    return (
      <Layout className="layout">
        <MenuBar selected="profile"></MenuBar>
        <Content style={{ padding: '50px 50px' }} className='profile-content'>
          Profile
        </Content>
      </Layout>
    )
  }
}
