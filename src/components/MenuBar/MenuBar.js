import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd/lib";
import {
  HomeOutlined,
  PlusCircleOutlined,
  BarsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./MenuBar.css";

const { Header } = Layout;

export default class MenuBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let UserMenu;
    if (localStorage.getItem("loggedIn") == "true") {
      UserMenu = (
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <Link to="/profile">Profile</Link>
        </Menu.Item>
      );
    } else {
      UserMenu = (
        <Menu.Item key="login" icon={<UserOutlined />}>
          <Link to="/login">Login</Link>
        </Menu.Item>
      );
    }
    return (
      <Header>
        <div className="logo">         
          <img className="logo-img" src="logo.png"/>
          <span> Which One </span>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={this.props.selected}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/homepage">Home</Link>
          </Menu.Item>
          <Menu.Item key="question" icon={<PlusCircleOutlined />}>
            <Link to="/question">Post</Link>
          </Menu.Item>
          <Menu.Item key="vote" icon={<BarsOutlined />}>
            <Link to="/vote">Vote</Link>
          </Menu.Item>
          {UserMenu}
        </Menu>
      </Header>
    );
  }
}
