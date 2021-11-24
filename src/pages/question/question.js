import React, { Component } from 'react';
import { Layout, Form, Input, Button, Space, Select, DatePicker, Upload, Switch} from 'antd/lib';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "./question.css"
import MenuBar from '../../components/MenuBar/MenuBar'
import axios from 'axios';

const { Content } = Layout;
const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

export default class question extends Component {
  onSubmit = (values) =>  {
    // console.log(values);
    const expiredTimeUnix = Math.round(values.expiredDate._d.getTime()/1000);
    const currentTimeUnix = Math.round(new Date().getTime()/1000);   
    // console.log(expiredTimeUnix, currentTimeUnix)
    var isAnonymous = false;
    if (values.anonymous) {
      isAnonymous = true;
    }     
    axios.post("/api/recordPostedQuestion", {
      ownerID: localStorage.getItem('UID'),
      time: currentTimeUnix,
      tag: values.tag,
      question: values.topic,
      anonymous: isAnonymous,
      timeLimit: expiredTimeUnix,
      options: values.options
    }).then((res) => {
      console.log(res)
      if (res.data.error) {
        console.log("post failed");
        alert(res.data.error);
        this.formRef.current.resetFields();
      } else {
        console.log("post successfully");
        this.props.history.push('/vote');
      }
    });
  }
  
  onFinishFailed = () => {
    console.log("failed input");
    alert("Please check and correct your input.");
  };

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
              onFinish={this.onSubmit}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item 
                label="Topic" 
                name="topic"
                rules={[{ required: true, message: 'Missing topic' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Tag" name="tag"
                rules={[{ required: true, message: 'Missing tag' }]}>
                <Select>
                  <Select.Option value="food">Food</Select.Option>
                  <Select.Option value="sports">Sports</Select.Option>
                  <Select.Option value="music">Music</Select.Option>
                  <Select.Option value="movie">Movie</Select.Option>
                  <Select.Option value="style">Style</Select.Option>
                  <Select.Option value="travel">Travel</Select.Option>
                </Select>
              </Form.Item>
              <Form.List className="question-options" name="options">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginLeft: 130 }} align="baseline">
                        <Form.Item
                          {...restField}
                          label="Option"
                          name={[name, 'optionText']}                          
                          fieldKey={[fieldKey, 'optionText']}
                          rules={[{ required: true, message: 'Missing options' }]}
                          // style={{marginLeft: 20 }} 
                        >
                          <Input style={{marginLeft: 20 }} placeholder="Option" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'optionImage']}
                          label="Image"
                          fieldKey={[fieldKey, 'optionImage']}
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          // extra="choose an image to show your options"
                        >
                          <Upload name="logo" action="/upload.do" listType="picture">
                            <Button icon={<UploadOutlined />} style={{marginLeft: 20 }}>Click to upload</Button>
                          </Upload>
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button className="question-add-btn" type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Option
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item label="Expired Date" name="expiredDate" 
                rules={[{ required: true, message: 'Missing expired date'}]}>
                <DatePicker />
              </Form.Item>
              <Form.Item label="Anonymous" name="anonymous" valuePropName="checked">
                <Switch />
              </Form.Item>  
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit"
                  className="question-post-btn">
                  Post
                </Button>
              </Form.Item>                        
            </Form>
            {/* <Button className="question-post-btn" href="./vote">Post</Button> */}
          </div>
        </Content>
      </Layout>    
    )
  }
}

