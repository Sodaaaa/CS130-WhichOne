import React, { Component } from "react";
import { Layout } from "antd/lib";
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
} from "antd";
import { Redirect } from "react-router-dom";
import "./register.css";
import MenuBar from "../../components/MenuBar/MenuBar";
import Background from "../../img/background.jfif";
import axios from "axios";

const { Header, Content } = Layout;

export default class register extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  handleSubmit = () => {
    //event.preventDefault();
    console.log("submitted");

    axios
      .post("/api/register", {
        email: document.getElementById("registerEmail").value,
        password: document.getElementById("registerPW").value,
        confirm_password: document.getElementById("registerConfirm").value,
        username: document.getElementById("registerUserName").value,
      })
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          console.log("error");
          //this.setState({loggedIn:false});
          alert(res.data.error);
          this.formRef.current.resetFields();
        } else {
          //this.setState({ signedUp:true });
          console.log("Successfully signed up.");
          this.props.history.push("/login");
          // localStorage.setItem('email', this.state.username)
          // localStorage.setItem('loggedIn', this.state.loggedIn)
        }
      });
  };

  onFinish = () => {
    this.handleSubmit();
  };

  onFinishFailed = () => {
    console.log("Validation failed.");
    alert("Please check and correct your input.");
  };

  render() {
    if (this.state.signedUp) return <Redirect to="/login" />;
    return (
      <Layout className="layout">
        <MenuBar selected="login"></MenuBar>
        <Content
          name="register-content"
          style={{
            background: `url(${Background}) no-repeat`,
            backgroundColor: "#FFFFFF",
            padding: "50px 50px",
          }}
        >
          <div className="register-layout-content">
            <Form
              ref={this.formRef}
              name="normal_register"
              className="register-form"
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input id="registerEmail" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password id="registerPW" />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password id="registerConfirm" />
              </Form.Item>

              <Form.Item
                name="nickname"
                label="Nickname"
                tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true,
                  },
                ]}
              >
                <Input id="registerUserName" />
              </Form.Item>

              <Form.Item>
                <Button
                  className="register-form-button"
                  type="primary"
                  htmlType="submit"
                  //onClick={this.handleSubmit}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    );
  }
}
