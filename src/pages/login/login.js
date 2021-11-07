import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Layout } from 'antd/lib';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox } from 'antd';
import './login.css';
import MenuBar from '../../components/MenuBar/MenuBar'
import Background from '../../img/background.jfif';
const { Content } = Layout;

export default class register extends Component {
  render() {
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
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                    <Button type="primary" htmlType="submit" className="login-form-button">
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