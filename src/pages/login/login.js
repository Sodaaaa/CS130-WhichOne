import React, { Component } from "react";
// import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Layout } from "antd/lib";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import "./login.css";
import MenuBar from "../../components/MenuBar/MenuBar";
import Background from "../../img/background.jfif";
// import { conditionalExpression } from "@babel/types";
import axios from "axios";
const { Content } = Layout;

export default class login extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", loggedIn: false };
  }

  handleSubmit = () => {
    axios
      .post("/api/login", {
        email: document.getElementById("user").value,
        password: document.getElementById("pw").value,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.error) {
          alert(res.data.error);
          document.getElementById("user").value = "";
          document.getElementById("pw").value = "";
          this.formRef.current.resetFields();
        } else {
          this.setState({
            username: document.getElementById("user").value,
            loggedIn: true,
          });
          console.log(this.state.loggedIn);
          localStorage.setItem("email", this.state.username);
          localStorage.setItem("loggedIn", this.state.loggedIn);
          localStorage.setItem("UID", res.data.success);
          // console.log('UID is', res.data.success);
          this.props.history.push("/homepage");
        }
      });
  };
  onFinish = () => {
    // event.preventDefault();
    console.log("validation passed");
    //this.setState({verified:true});
    this.handleSubmit();
  };

  onFinishFailed = () => {
    console.log("failed validation");
    alert("Please check and correct your input.");
  };

  render() {
    return (
      <Layout className="layout">
        <MenuBar selected="login"></MenuBar>
        <Content
          name="login-content"
          style={{
            background: `url(${Background}) no-repeat`,
            backgroundColor: "#FFFFFF",
            padding: "50px 50px",
          }}
        >
          <div className="question-layout-content">
            <Form
              ref={this.formRef}
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
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
                    message: "Please input your Password!",
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
              {/* <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                      Forgot password
                    </a>
                  </Form.Item> */}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  {/* onClick={this.handleSubmit}> */}
                  Log in
                </Button>
                Or <Link to="/register">Register</Link>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    );
  }
}
