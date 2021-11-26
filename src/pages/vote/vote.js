import React, { Component, useState } from "react";
import { Layout } from "antd/lib";
import CustomTag from "../../components/tag/CustomTag";
import OptionList from "../../components/optionList/OptionList";
import MenuBar from "../../components/MenuBar/MenuBar";
import { List, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./vote.css";
import { cloneNode } from "@babel/types";
import QuestionList from "../../components/questionList/questionList";
import axios from "axios";
import Background from "../../img/background.jfif";

const { Content } = Layout;

// const listData = [];
// for (let i = 0; i < 23; i++) {
//   listData.push({
//     title: `Question ${i+1}`,
//     avatar: 'https://joeschmoe.io/api/v1/random',
//     description:
//       'tag',
//     content:
//       <OptionList />
//   });
// }

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default class vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      listPopulated: false,
    };
  }

  handleCallback = (tags) => {
    const list = [];
    if (tags.length != 0) {
      axios
        .get("/api/listTopics", {
          params: { tags: tags.join(), UID: localStorage.getItem("UID") },
        })
        .then((res) => {
          // console.log(res);
          this.populateList(res, list);
          this.setState({ listData: list, listPopulated: true });
          localStorage.setItem("tag", "null");
        });
    } else {
      axios
        .get("/api/getAllQuestions", {
          params: { UID: localStorage.getItem("UID") },
        })
        .then((res) => {
          // console.log(res);
          this.populateList(res, list);
          this.setState({ listData: list, listPopulated: true });
          //this.onTriggerCallBack();
        });
    }
  };

  populateList(res, list) {
    for (let i = 0; i < res.data.length; i++) {
      let question = {
        title: res.data[i].question,
        description: res.data[i].tag,
        content: <OptionList options={res.data[i].options} expired={false} />,
        likes: res.data[i].likes,
        dislikes: res.data[i].dislikes,
        liked: res.data[i].chosenAttitude === 0 ? true : false,
        disliked: res.data[i].chosenAttitude === 1 ? true : false,
        ID: res.data[i].questionID,
        uid: res.data[i].ownerID,
        username: res.data[i].username,
        isAnonymous: res.data[i].anonymous,
        // '#E2D4F3'
        avatar:
          res.data[i].avator === undefined ? (
            <Avatar
              style={{ backgroundColor: "#6C5CE7" }}
              icon={<UserOutlined />}
            />
          ) : (
            <Avatar src={res.data[i].avator} />
          ),
      };
      if (res.data[i].anonymous) {
        question.avatar = <Avatar>A</Avatar>;
        question.username = "Anonymous";
      }
      //else question.avatar = res.data[i].avator === undefined? <Avatar style={{ backgroundColor: '#E2D4F3' }} icon={<UserOutlined />} /> : res.data[i].avator};
      list.push(question);
      // options.push({content: res.data[i].options})
      // console.log(list[i]);
    }
  }

  componentDidMount() {
    const list = [];
    axios
      .get("/api/getAllQuestions", {
        params: { UID: localStorage.getItem("UID") },
      })
      .then((res) => {
        //console.log(res);
        this.populateList(res, list);
        this.setState({ listData: list, listPopulated: true });
        console.log("listData: " + this.state.listData);
      });
  }

  render() {
    return (
      <Layout className="layout">
        <MenuBar selected="vote"></MenuBar>
        <Content
          style={{
            padding: "0px 50px",
            background: `url(${Background}) no-repeat`,
          }}
          className="vote-content"
        >
          <div className="vote-site-layout-content">
            <div className="vote-tags">
              <CustomTag
                questionList={this.state.listData}
                parentCallback={this.handleCallback}
              />
            </div>
            <div className="vote-questions">
              {this.state.listPopulated === false ? null : (
                <QuestionList questionList={this.state.listData} />
              )}
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}
