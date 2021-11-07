import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Layout, Menu, Form, Input, Button, Radio, Select, DatePicker, InputNumber, Upload, Switch} from 'antd/lib';
import { HomeOutlined, PlusCircleOutlined, BarsOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import "./question.css"
import MenuBar from '../../components/MenuBar/MenuBar'

const { Header, Content } = Layout;
const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

export default class question extends Component {
  render() {
    return (
      <Layout className="layout">
        <MenuBar selected="question"></MenuBar>
        <Content style={{ backgroundColor:"#FFFFFF", padding: '50px 50px' }}>
          <div className="question-form">
            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
            >
              <Form.Item label="Topic">
                <Input />
              </Form.Item>
              <Form.Item label="Tag">
                <Select>
                  <Select.Option value="food">Food</Select.Option>
                  <Select.Option value="sports">Sports</Select.Option>
                  <Select.Option value="music">Music</Select.Option>
                  <Select.Option value="movie">Movie</Select.Option>
                  <Select.Option value="style">Style</Select.Option>
                  <Select.Option value="travel">Travel</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Expired Date">
                <DatePicker />
              </Form.Item>
              <Form.Item label="Anonymous" valuePropName="checked">
                <Switch />
              </Form.Item>                          
              <Form.Item
                name="upload"
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="choose an image to show your options"
              >
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
              {/* <Form.Item label="Post">
                <Button href="./vote">Post</Button>
              </Form.Item> */}
            </Form>
            <Button className="question-post-btn" href="./vote">Post</Button>
          </div>
        </Content>
      </Layout>    
    )
  }
}

