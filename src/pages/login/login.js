import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
import { Layout } from 'antd/lib';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox } from 'antd';
import './login.css';
import MenuBar from '../../components/MenuBar/MenuBar'
import Background from '../../img/background.jfif';
import { conditionalExpression } from '@babel/types';
import axios from 'axios';
const { Content } = Layout;

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {username:"", password:"", loggedIn:false};
  }

  handleSubmit = event => {
    event.preventDefault();
    //console.log(this.state.username);
    //console.log(this.state.password);
    //s.login();
    axios.post("/api/login", {
      email: document.getElementById("user").value,
      password: document.getElementById("pw").value
    }).then((res) => {
      console.log(res)
      if (res.data.error) {
        console.log("error");
        //this.setState({loggedIn:false});
        alert("Log in failed: please check your username or password.")
        document.getElementById("user").value = "";
        document.getElementById("pw").value = "";
      } else {
        this.setState({loggedIn:true});
        console.log(this.state.loggedIn);
      }
    });
  }

  // onUserNameChange = event => {
  //   this.setState({
  //     username: event.target.value
  //   });
  // }

  // onPasswordChange = event => {
  //   this.setState({
  //     password: event.target.value
  //   });
  // }

  render() {
    if (this.state.loggedIn) return <Redirect to='/homepage'/>
    return (      
      <Layout className="layout">
        <MenuBar selected="login"></MenuBar>
        <Content name = "login-content" style={{ background: `url(${Background}) no-repeat`, backgroundColor:"#FFFFFF", padding: '50px 50px' }}>
              <div className="question-layout-content">
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                  // onFinish={onFinish}
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Username!',
                      },
                    ]}
                  >
                    <Input 
                      prefix={<UserOutlined className="site-form-item-icon" />} 
                      placeholder="Username" 
                      id="user"
                      //onChange={this.onUserNameChange}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Password!',
                      },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                      id="pw"
                      //onChange={this.onPasswordChange}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                      Forgot password
                    </a>
                  </Form.Item>

                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      className="login-form-button" 
                      onClick={this.handleSubmit}>
                      Log in
                    </Button>
                    Or <Link to='/register'>Register</Link>
                  </Form.Item>
                </Form>
              </div>
        </Content>  
      </Layout>    
    )
  }
}