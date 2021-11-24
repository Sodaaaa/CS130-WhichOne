import React, { Component } from 'react';
import { Layout, Form, Input, Button, Space, Select, DatePicker, Upload, Switch, Modal, Spin} from 'antd/lib';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "./question.css"
import MenuBar from '../../components/MenuBar/MenuBar'
import axios from 'axios';
import { LuckyWheel } from '@lucky-canvas/react'

const { Content } = Layout;
const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

export default class question extends Component {
  //state = {visible: false, modalText: "", modalTopic: ""};
  constructor () {
    super();
    this.myLucky = React.createRef()
    this.state = {
      visible: false, modalText: "", modalTopic: "",
      blocks: [
        { padding: '13px', background: '#d64737' }
      ],
      prizes: [
        { title: '1元红包', background: '#f9e3bb', fonts: [{ text: '1元红包', top: '18%' }] },
        { title: '100元红包', background: '#f8d384', fonts: [{ text: '100元红包', top: '18%' }] },
        { title: '0.5元红包', background: '#f9e3bb', fonts: [{ text: '0.5元红包', top: '18%' }] },
        { title: '2元红包', background: '#f8d384', fonts: [{ text: '2元红包', top: '18%' }] },
        { title: '10元红包', background: '#f9e3bb', fonts: [{ text: '10元红包', top: '18%' }] },
        { title: '50元红包', background: '#f8d384', fonts: [{ text: '50元红包', top: '18%' }] },
      ],
      buttons: [
        { radius: '50px', background: '#d64737' },
        { radius: '45px', background: '#fff' },
        { radius: '41px', background: '#f6c66f', pointer: true },
        {
          radius: '35px', background: '#ffdea0',
          fonts: [{ text: '开始\n抽奖', fontSize: '18px', top: -18 }]
        }
      ],
      defaultStyle: {
        fontColor: '#d64737',
        fontSize: '14px'
      },
    }
  }
  
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
        // this.props.history.push('/vote');
        window.location.href = './vote'
      }
    });
  }
  
  onFinishFailed = () => {
    console.log("failed input");
    alert("Please check and correct your input.");
  };

  formRef = React.createRef();
  autoSelect = () => {
    // console.log(values);
    this.showModal();
    var topic = this.formRef.current.getFieldValue('topic');
    var options = this.formRef.current.getFieldValue('options');
    console.log(options)
    if(topic == undefined){
      this.setState({modalText: "Please provide a topic!"})
    }
    else if(options == undefined){
      this.setState({modalText: "Please provide at least ONE option!"})
    }
    else{
      var hasUndefined = false;
      for(let i in options){
        if(options[i] == undefined){
          this.setState({modalText: "Please fill out all the options!"})
          hasUndefined = true;
          break;
        }
      }
      if(!hasUndefined){
        console.log(options.length)
        var rand = Math.floor(Math.random()*options.length);
        var rOption = options[rand];
        this.setState({modalTopic: topic})
        this.setState({modalText: "We auto select an option for you: "+rOption.optionText})        // this.setState({randomOption: rOption.optionText})
        console.log(rOption.optionText)    
      }              
    }        
  }

  handleConfirm = () => {
    this.hideModal();
    console.log("confirm");
    this.formRef.current.resetFields();
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    console.log("hide");
    this.setState({
      visible: false,
    });
  };

  render() {
    if (localStorage.getItem('loggedIn')=="false") {
      return (
        <Layout className="layout">
          <MenuBar selected="question"></MenuBar>
          <Content className="question-content">
            <div className="no-loggin-alert">
              <p>You haven't logged in. Please log in first to post a question!</p>
              <Button type="primary"
                  className="login-btn" href="./login">
                  Log in
                </Button>
            </div>
          </Content>
        </Layout>
      )
    }
    else {      
      return (
        <Layout className="layout">
          <MenuBar selected="question"></MenuBar>
          <Content className="question-content">
            <div className="question-form">
              <Form
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                ref={this.formRef}
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
                    <Select.Option value="Food">Food</Select.Option>
                    <Select.Option value="Sports">Sports</Select.Option>
                    <Select.Option value="Music">Music</Select.Option>
                    <Select.Option value="Movie">Movie</Select.Option>
                    <Select.Option value="Style">Style</Select.Option>
                    <Select.Option value="Travel">Travel</Select.Option>
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
                  <Button type="primary" htmlType="button" onClick={this.autoSelect}
                    className="question-post-btn">
                    Auto Select
                  </Button>
                  <Modal
                    className="auto-select-modal"
                    title="Auto Select"
                    visible={this.state.visible}
                    onOk={this.handleConfirm}
                    onCancel={this.hideModal}
                    okText="Confirm"
                    cancelText="Cancel"
                    focusTriggerAfterClose={false}
                  >
                    <p>{this.state.modalTopic}</p>
                    <p>{this.state.modalText}</p>
                    {/* <div style={{textAlign: 'center'}}><Spin/></div> */}
                    <LuckyWheel
                      ref={this.myLucky}
                      width="300px"
                      height="300px"
                      blocks={this.state.blocks}
                      prizes={this.state.prizes}
                      buttons={this.state.buttons}
                      defaultStyle={this.state.defaultStyle}
                      onStart={() => { // 点击抽奖按钮会触发star回调
                        // 调用抽奖组件的play方法开始游戏
                        this.myLucky.current.play()
                        // 模拟调用接口异步抽奖
                        setTimeout(() => {
                          // 假设拿到后端返回的中奖索引
                          const index = Math.random() * 6 >> 0
                          // 调用stop停止旋转并传递中奖索引
                          this.myLucky.current.stop(index)
                        }, 2500)
                      }}
                      onEnd={prize => { // 抽奖结束会触发end回调
                        console.log(prize)
                        alert('恭喜获得大奖:' + prize.title)
                      }}
                    ></LuckyWheel>
                  </Modal>
                  <Button type="primary" htmlType="submit"
                    className="question-post-btn">
                    Post
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Content>
        </Layout>    
      )
    }
  }
}