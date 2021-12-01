import React, { Component, useState } from "react";
import { Layout } from "antd/lib";
import CustomTag from "../../components/tag/CustomTag";
// import OptionList from "../../components/optionList/OptionList";
import MenuBar from "../../components/MenuBar/MenuBar";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./vote.css";
// import { cloneNode } from "@babel/types";
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
      defaultPage: 0,
    };
  }

  populateList(res, questionList, optionList) {
    for (let i = 0; i < res.data.length; i++) {
      optionList.push(res.data[i].option_list);
      // console.log(optionList);
      let expiryDate = new Date(res.data[i].timeLimit * 1000);
      // console.log(res.data[i].timeLimit * 1000);
      let question = {
        title: res.data[i].question,
        description: res.data[i].tag,
        expired: res.data[i].expired,
        expiryTime: expiryDate.toLocaleDateString(),
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
        total_votes: res.data[i].total_votes,
        attitude: res.data[i].chosenAttitude,
        ID: res.data[i].questionID,
        uid: res.data[i].ownerID,
        username: res.data[i].username,
        isAnonymous: res.data[i].anonymous,
        // '#E2D4F3'
        avatar:
          res.data[i].owner_image === null ? (
            <Avatar
              style={{ backgroundColor: "#6C5CE7" }}
              icon={<UserOutlined />}
            />
          ) : (
            <Avatar
              src={"https://joeschmoe.io/api/v1/" + res.data[i].owner_image}
            />
          ),
      };
      // console.log(question);
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
        // console.log(res);
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
          console.log("filtered questions: ", res);
          this.populateList(res, questionList, optionList);
          this.setState({
            listData: questionList,
            optionListData: optionList,
            listPopulated: true,
            defaultPage: 0,
          });
          // console.log("filtered optionListData", this.state.optionListData);
          // localStorage.setItem("tag", "null");
          console.log("default", this.state.defaultPage);
          localStorage.removeItem("tag");
          // if (this.state.defaultPage === 0) this.setState({});
          // console.log(localStorage.getItem("tag"));
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
            backgroundSize: "cover",
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
                  currentPage={this.state.defaultPage}
                />
              )}
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}
