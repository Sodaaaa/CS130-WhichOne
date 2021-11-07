import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Layout, Menu} from 'antd/lib';
import { HomeOutlined, PlusCircleOutlined, BarsOutlined, UserOutlined, LockOutlined} from '@ant-design/icons';
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import './register.css';
import MenuBar from '../../components/MenuBar/MenuBar'

const { Header, Content } = Layout;

export default class login extends Component {
  render() {
    return (      
      <Layout className="layout">
        <MenuBar selected="login"></MenuBar>
        <Content style={{ backgroundColor:"#FFFFFF", padding: '50px 50px' }}>
              <div className="site-layout-content">
                <Form
                    name="normal_register"
                    className="register-form"
                >
                  <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="nickname"
                    label="Nickname"
                    tooltip="What do you want others to call you?"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your nickname!',
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>
              </Form>
              </div>
        </Content>  
      </Layout>    
    )
  }
}