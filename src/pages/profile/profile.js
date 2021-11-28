import React, { Component } from "react";
import {
  Descriptions,
  Avatar,
  Image,
  Button,
  Upload,
  message,
  Tabs,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Layout } from "antd/lib";
import "./profile.css";
import MenuBar from "../../components/MenuBar/MenuBar";
import axios from "axios";
import OptionList from "../../components/optionList/OptionList";
import QuestionList from "../../components/questionList/questionList";

const { Header, Content } = Layout;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

export default class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      questionlistData: [],
      optionListData: [],
      votelistData: [],
      optionListData2: [],
      attitudeData: [],
      optionListData3: [],
      questionPopulated: false,
      votePopulated: false,
      attitudePopulated: false,
      username: null,
      email: null,
      loading: false,
      avatar: null,
    };
  }

  handleSubmit = () => {
    //event.preventDefault();
    this.setState({ loggedIn: true });
    localStorage.setItem("loggedIn", false);
    this.props.history.push("/login");
  };

  populateList(res, questionList, optionList) {
    for (let i = 0; i < res.data.length; i++) {
      optionList.push(res.data[i].option_list);
      console.log(optionList);
      let expiryDate = new Date(res.data[i].timeLimit * 1000);
      let question = {
        title: res.data[i].question,
        description: res.data[i].tag,
        // expired = res.data[i].expired,
        expired: res.data[i].expired,
        total_votes: res.data[i].total_votes,
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
            <Avatar src={"https://joeschmoe.io/api/v1/" + res.data[i].owner_image} />
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

  componentDidMount() {
    axios
      .post("/api/getUserinfo", {
        UID: Number(localStorage.getItem("UID")),
      })
      .then((res) => {
        console.log(res);
        console.log("avatar:" + res.data[0].image_file);
        this.setState({
          avatar:
            res.data[0].owner_image === undefined ? (
              <Avatar
                size={100}
                style={{ backgroundColor: "#6C5CE7" }}
                icon={<UserOutlined />}
              />
            ) : (
              <Avatar
                size={150}
                src={"https://joeschmoe.io/api/v1/" + res.data[0].owner_image}
              />
            ),
        });
        // console.log("user info is ", res)
        // console.log("image file data is", "https://joeschmoe.io/api/v1/" + res.data[0].owner_image);
        this.setState({ username: res.data[0].username });
        this.setState({ email: res.data[0].email });
      });

    const questionList = [];
    const optionList = [];
    axios
      .post("/api/getHistoricalQuestions", {
        UID: Number(localStorage.getItem("UID")),
      })
      .then((res) => {
        console.log("result is", res);
        this.populateList(res, questionList, optionList);
        this.setState({
          questionlistData: questionList,
          optionListData: optionList,
          questionPopulated: true,
        });
        // console.log("option1: " + this.state.optionListData);
      });

    const votelist = [];
    const optionList2 = [];
    axios
      .post("/api/getVotes", {
        UID: Number(localStorage.getItem("UID")),
      })
      .then((res) => {
        console.log("vote result is", res);
        this.populateList(res, votelist, optionList2);
        this.setState({
          votelistData: votelist,
          optionListData2: optionList2,
          votePopulated: true,
        });
        console.log("history vote data is", this.state.votelistData);
        // console.log("option2: " + this.state.optionListData2);
      });

    const attitudelist = [];
    const optionList3 = [];
    axios
      .post("/api/getAttitudes", {
        UID: Number(localStorage.getItem("UID")),
      })
      .then((res) => {
        // console.log("vote result is", res);
        this.populateList(res, attitudelist, optionList3);
        this.setState({
          attitudeData: attitudelist,
          optionListData3: optionList3,
          attitudePopulated: true,
        });
        // console.log("option3: " + this.state.optionListData3);
      });

    // console.log("option1: " + this.state.optionListData);
    // console.log("option2: " + this.state.optionListData2);
    // console.log("option3: " + this.state.optionListData3);
  }

  render() {
    return (
      <Layout className="layout">
        <MenuBar selected="profile"></MenuBar>
        {/* <Content style={{ padding: '50px 50px' }} className='profile-content'>
          Profile
        </Content> */}
        <Content style={{ padding: "50px 50px" }} className="profile-content">
          <div className="user-profile">
            {this.state.avatar}
            {/* <Avatar
              size={150}
              // src={<Image src="https://joeschmoe.io/api/v1/random" />}
              src={
                this.state.imageUrl ? (
                  <img
                    src={this.state.imageUrl}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  "https://joeschmoe.io/api/v1/random"
                )
              }
            /> */}
            <div className="user-name">{this.state.username}</div>
            <div className="logout">
              <Button
                type="primary"
                htmlType="submit"
                className="logout-button"
                onClick={this.handleSubmit}
              >
                Log Out
              </Button>
            </div>
            <Descriptions bordered>
              <Descriptions.Item label="UserName">
                {this.state.username}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {this.state.email}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className="history-data">
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Posted Questions" key="1">
                {this.state.questionPopulated === false ? null : (
                  <QuestionList
                    questionList={this.state.questionlistData}
                    optionList={this.state.optionListData}
                  />
                )}
              </TabPane>
              <TabPane tab="Your Votes" key="2">
                {this.state.votePopulated === false ? null : (
                  <QuestionList
                    questionList={this.state.votelistData}
                    optionList={this.state.optionListData2}
                  />
                )}
              </TabPane>
              <TabPane tab="Questions you liked/disliked" key="3">
                {this.state.attitudePopulated === false ? null : (
                  <QuestionList
                    questionList={this.state.attitudeData}
                    optionList={this.state.optionListData3}
                  />
                )}
              </TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout>
    );
  }
}
