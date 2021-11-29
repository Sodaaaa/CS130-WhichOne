import React, { Component } from "react";
import {
  Layout,
  Form,
  Input,
  Button,
  Space,
  Select,
  DatePicker,
  Upload,
  Switch,
  Modal,
} from "antd/lib";
import {
  UploadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./question.css";
import MenuBar from "../../components/MenuBar/MenuBar";
import axios from "axios";
import { LuckyWheel } from "@lucky-canvas/react";

const { Content } = Layout;
const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

export default class question extends Component {
  constructor() {
    super();
    this.myLucky = React.createRef();
    this.state = {
      autoVisible: false,
      postVisible: false,
      modalText: "",
      modalTopic: "",
      blocks: [{ padding: "13px", background: "#6C5CE7" }],
      buttons: [
        { radius: "50px", background: "#6C5CE7" },
        { radius: "45px", background: "#fff" },
        { radius: "41px", background: "#6C5CE7", pointer: true },
        {
          radius: "35px",
          background: "#6C5CE7",
          fonts: [
            { text: "Start", fontSize: "18px", top: -10, fontColor: "#FFFFFF" },
          ],
        },
      ],
      defaultStyle: {
        fontColor: "#6C5CE7",
        fontSize: "14px",
      },
      optionList: [],
      hasUndefined: true,
    };
  }

  customRequest(option) {
    const formData = new FormData();
    formData.append("files[]", option.file);
    // console.log(option.file);
    // console.log(option);
    const reader = new FileReader();
    reader.readAsDataURL(option.file);
    reader.onloadend = function (e) {
      // console.log(e.target.result); // print base64
      if (e && e.target && e.target.result) {
        option.onSuccess();
      }
    };
  }

  onSubmit = (values) => {
    // console.log(values);
    const expiredTimeUnix = Math.round(values.expiredDate._d.getTime() / 1000);
    const currentTimeUnix = Math.round(new Date().getTime() / 1000);
    // console.log(expiredTimeUnix, currentTimeUnix)
    var isAnonymous = false;
    if (values.anonymous) {
      isAnonymous = true;
    }
    axios
      .post("/api/recordPostedQuestion", {
        ownerID: localStorage.getItem("UID"),
        time: currentTimeUnix,
        tag: values.tag,
        question: values.topic,
        anonymous: isAnonymous,
        timeLimit: expiredTimeUnix,
        options: values.options,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.error) {
          console.log("post failed");
          alert(res.data.error);
          this.formRef.current.resetFields();
          this.showPostModal();
          this.setState({ modalText: "Post failed..." });
        } else {
          console.log("post successfully");
          this.showPostModal();
          this.setState({
            modalText:
              "You have successfully posted a question! Click Confirm to view it on the vote page...",
          });
          // this.props.history.push('/vote');
          // window.location.href = "./vote";
        }
      });
  };

  onFinishFailed = () => {
    console.log("failed input");
    alert("Please check and correct your input.");
  };

  formRef = React.createRef();
  autoSelect = () => {
    // console.log(values);
    this.setState({ hasUndefined: true });
    this.showAutoModal();
    var topic = this.formRef.current.getFieldValue("topic");
    var options = this.formRef.current.getFieldValue("options");
    // console.log(this.state.modalText);
    if (topic == undefined) {
      this.setState({ modalText: "Please provide a topic!" });
    } else if (options == undefined || options.length < 2) {
      this.setState({ modalText: "Please provide at least TWO options!" });
    } else {
      var hasUndefined = false;
      for (let i in options) {
        if (options[i] == undefined) {
          this.setState({ modalText: "Please fill out all the options!" });
          hasUndefined = true;
          break;
        }
      }
      if (!hasUndefined) {
        this.setState({ hasUndefined: false });
        // console.log(options.length);
        // var rand = Math.floor(Math.random()*options.length);
        // var rOption = options[rand];
        this.setState({ modalTopic: topic });
        this.setState({ modalText: "" });
        // this.setState({modalText: "We auto select an option for you: "+rOption.optionText})        // this.setState({randomOption: rOption.optionText})
        // console.log(rOption.optionText)
        for (let i in options) {
          // console.log(options);
          if (i == options.length - 1 && i % 3 == 0) {
            this.state.optionList.push({
              title: options[i].option_name,
              background: "#E2D4F3",
              fonts: [{ text: options[i].option_name, top: "18%" }],
            });
            break;
          }
          if (i % 3 == 0) {
            this.state.optionList.push({
              title: options[i].option_name,
              background: "#eae3f3",
              fonts: [{ text: options[i].option_name, top: "18%" }],
            });
          } else if (i % 3 == 1) {
            this.state.optionList.push({
              title: options[i].option_name,
              background: "#E2D4F3",
              fonts: [{ text: options[i].option_name, top: "18%" }],
            });
          } else if (i % 3 == 2) {
            this.state.optionList.push({
              title: options[i].option_name,
              background: "#d0bbe9",
              fonts: [{ text: options[i].option_name, top: "18%" }],
            });
          }
        }
      }
    }
  };

  handleAutoConfirm = () => {
    this.hideAutoModal();
    this.formRef.current.resetFields();
  };

  showAutoModal = () => {
    this.setState({ autoVisible: true });
  };

  hideAutoModal = () => {
    this.setState({ autoVisible: false });
    this.state.optionList = [];
  };

  handlePostConfirm = () => {
    this.hidePostModal();    
    window.location.href = "./vote";
  };

  showPostModal = () => {
    this.setState({ postVisible: true });
  };

  hidePostModal = () => {
    this.setState({ postVisible: false });
    this.formRef.current.resetFields();
    this.state.optionList = [];
  };

  render() {
    if (localStorage.getItem("loggedIn") == "false") {
      return (
        <Layout className="layout">
          <MenuBar selected="question"></MenuBar>
          <Content className="question-content">
            <div className="no-loggin-alert">
              <p>
                You haven't logged in. Please log in first to post a question!
              </p>
              <Button type="primary" className="login-btn" href="./login">
                Log in
              </Button>
            </div>
          </Content>
        </Layout>
      );
    } else {
      return (
        <Layout className="layout">
          <MenuBar selected="question"></MenuBar>
          <Content className="question-content">
            <div className="question-title">
              <p>What's on your mind?</p>
            </div>
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
                  rules={[{ required: true, message: "Missing topic" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Tag"
                  name="tag"
                  rules={[{ required: true, message: "Missing tag" }]}
                >
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
                        <Space
                          key={key}
                          style={{ display: "flex", marginLeft: 135 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            label="Option"
                            name={[name, "option_name"]}
                            fieldKey={[fieldKey, "option_name"]}
                            rules={[
                              { required: true, message: "Missing options" },
                            ]}
                          >
                            <Input
                              style={{ marginLeft: 20 }}
                              placeholder="Option"
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "option_image"]}
                            label="Image"
                            fieldKey={[fieldKey, "option_image"]}
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                          >
                            <Upload
                              name="logo"
                              customRequest={this.customRequest}
                              listType="picture"
                              maxCount={1}
                            >
                              <Button
                                icon={<UploadOutlined />}
                                style={{ marginLeft: 20 }}
                              >
                                Click to upload
                              </Button>
                            </Upload>
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          className="question-add-btn"
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Option
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                <Form.Item
                  label="Expire Date"
                  name="expiredDate"
                  rules={[{ required: true, message: "Missing expired date" }]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  label="Anonymous"
                  name="anonymous"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    type="primary"
                    htmlType="button"
                    onClick={this.autoSelect}
                    className="question-post-btn"
                  >
                    Auto Select
                  </Button>
                  <Modal
                    className="auto-select-modal"
                    title="Auto Select"
                    visible={this.state.autoVisible}
                    onOk={this.handleAutoConfirm}
                    onCancel={this.hideAutoModal}
                    okText="Confirm"
                    cancelText="Cancel"
                    focusTriggerAfterClose={false}
                  >
                    <p>{this.state.modalTopic}</p>
                    <p>{this.state.modalText}</p>
                    {/* <div style={{textAlign: 'center'}}><Spin/></div> */}
                    {!this.state.hasUndefined && (
                      <div className="luckyWheel">
                        <LuckyWheel
                          ref={this.myLucky}
                          width="300px"
                          height="300px"
                          blocks={this.state.blocks}
                          prizes={this.state.optionList}
                          buttons={this.state.buttons}
                          defaultStyle={this.state.defaultStyle}
                          onStart={() => {
                            this.myLucky.current.play();
                            setTimeout(() => {
                              const index = (Math.random() * 6) >> 0;
                              this.myLucky.current.stop(index);
                            }, 2500);
                          }}
                          onEnd={(prize) => {
                            console.log(prize);
                            alert(
                              "We auto select an option for you: " + prize.title
                            );
                            this.state.optionList = [];
                          }}
                        ></LuckyWheel>
                      </div>
                    )}
                  </Modal>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="question-post-btn"
                  >
                    Post
                  </Button>
                  <Modal
                    className="post-modal"
                    title="Post a Question"
                    visible={this.state.postVisible}
                    onOk={this.handlePostConfirm}
                    onCancel={this.hidePostModal}
                    okText="Confirm"
                    // cancelText="Cancel"
                    footer={
                      <Button key="back" onClick={this.handlePostConfirm}>
                        Confirm
                      </Button>
                    }
                    focusTriggerAfterClose={false}
                  >
                    <p>{this.state.modalText}</p>
                  </Modal>
                </Form.Item>
              </Form>
            </div>
          </Content>
        </Layout>
      );
    }
  }
}
