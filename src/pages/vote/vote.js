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
      optionListData: [],
      listPopulated: false,
    };
  }

  populateList(res, questionList, optionList) {
    for (let i = 0; i < res.data.length; i++) {
      optionList.push(res.data[i].options_list);
      console.log(optionList);
      let question = {
        title: res.data[i].question,
        description: res.data[i].tag,
        // content: <OptionList
        //             options={res.data[i].options}
        //             expired={false}
        //             voted={res.data[i].voted}
        //             questionID={res.data[i].questionID}
        //             // parentCallback={this.handleOptionCallBack}
        //           />,
        likes: res.data[i].likes,
        dislikes: res.data[i].dislikes,
        // liked: res.data[i].chosenAttitude === 0 ? true : false,
        // disliked: res.data[i].chosenAttitude === 1 ? true : false,
        voted: res.data[i].voted,
        attitude: res.data[i].chosenAttitude,
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
      console.log(question);
      if (res.data[i].anonymous) {
        question.avatar = <Avatar>A</Avatar>;
        question.username = "Anonymous";
      }
      //else question.avatar = res.data[i].avator === undefined? <Avatar style={{ backgroundColor: '#E2D4F3' }} icon={<UserOutlined />} /> : res.data[i].avator};
      questionList.push(question);
      // options.push({content: res.data[i].options})
      // console.log(list[i]);
    }
  }

  getAllQuestions() {
    const questionList = [];
    const optionList = [];
    axios
      .get("/api/getAllQuestions", {
        params: { UID: Number(localStorage.getItem("UID")) },
      })
      .then((res) => {
        console.log(res);
        this.populateList(res, questionList, optionList);
        this.setState({
          listData: questionList,
          optionListData: optionList,
          listPopulated: true,
        });
        //this.onTriggerCallBack();
      });
  }

  handleCallback = (tags) => {
    console.log("tags: " + tags);
    if (tags.length != 0) {
      const questionList = [];
      const optionList = [];
      axios
        .get("/api/listTopics", {
          params: {
            tags: tags.join(),
            UID: Number(localStorage.getItem("UID")),
          },
        })
        .then((res) => {
          // console.log(res);
          this.populateList(res, questionList, optionList);
          this.setState({
            listData: questionList,
            optionListData: optionList,
            listPopulated: true,
          });
          // localStorage.setItem("tag", "null");
          localStorage.removeItem("tag");
          console.log(localStorage.getItem("tag"));
        });
    } else {
      this.getAllQuestions();
    }
  };

  // handleOptionCallBack = () => {
  //   console.log("option call back")
  //   this.getAllQuestions();
  // };

  componentDidMount() {
    this.getAllQuestions();
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
                <QuestionList
                  questionList={this.state.listData}
                  optionList={this.state.optionListData}
                />
              )}
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}
