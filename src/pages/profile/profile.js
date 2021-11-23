import React, { Component } from 'react';
import { Descriptions, Avatar, Image, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import { Layout } from 'antd/lib';
import "./profile.css";
import MenuBar from '../../components/MenuBar/MenuBar'

const { Header, Content } = Layout;

const dataSource = [
  {key: '1', name: 'daFei', age: 32},
  {key: '2', name: 'foo', age: 42},
  {key: '3', name: 'bar', age: 32},
];

export default class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn:true};
  }
  
  handleSubmit = () =>  {
    //event.preventDefault();
    //console.log(this.state.username);
    this.setState({loggedIn:true});
    localStorage.setItem('loggedIn', false);
    this.props.history.push('/login');
  }

  render() {
    return (
      <Layout className="layout">
        <MenuBar selected="profile"></MenuBar>
        {/* <Content style={{ padding: '50px 50px' }} className='profile-content'>
          Profile
        </Content> */}
        <Content style={{ padding: '50px 50px' }} className='profile-content'>
          <div className="user-profile">
            <Avatar size={150} src={<Image src="https://joeschmoe.io/api/v1/random"/>} />
            <div className="user-name">Testuser</div>
            <div className="logout">
              <Button 
                type="primary" 
                htmlType="submit" 
                className="logout-button"
                onClick={this.handleSubmit}>
                Log Out
              </Button>
            </div>
            <Descriptions bordered>
              <Descriptions.Item label="UserName">Testuser</Descriptions.Item>
              <Descriptions.Item label="Email">{localStorage.getItem('email')}</Descriptions.Item>
            </Descriptions>
          </div>
          <div className="posted-questions">Question List</div>
          <div className="past-votes">Past Vote List</div>
        </Content>
      </Layout>
    )
  }
}
