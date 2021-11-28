import React, { Component } from "react";
import { Descriptions, Avatar, Image, Button, Upload, message } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Layout } from "antd/lib";
import "./profile.css";
import MenuBar from "../../components/MenuBar/MenuBar";
import axios from "axios";
import OptionList from "../../components/optionList/OptionList";
import QuestionList from "../../components/questionList/questionList";

const { Header, Content } = Layout;

const dataSource = [
  { key: "1", name: "daFei", age: 32 },
  { key: "2", name: "foo", age: 42 },
  { key: "3", name: "bar", age: 32 },
];

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

// function beforeUpload(file) {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJpgOrPng && isLt2M;
// }

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

  // handleUpload = info => {
  //   console.log(this.state.imageUrl);
  //   if (info.file.status === 'uploading') {
  //     this.setState({ loading: true });
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, imageUrl =>
  //       this.setState({
  //         imageUrl,
  //         loading: false,
  //       }),
  //     );
  //     console.log(this.state.imageUrl);
  //   }
  // };

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

  componentDidMount() {
    axios
      .post("/api/getUserinfo", {
        UID: Number(localStorage.getItem("UID")),
      })
      .then((res) => {
        console.log(res);
        console.log("avatar:" + res.data.image_file);
        this.setState({
          avatar:
            res.data.image_file === undefined ? (
              <Avatar
                size={100}
                style={{ backgroundColor: "#6C5CE7" }}
                icon={<UserOutlined />}
              />
            ) : (
              <Avatar src={res.data.image_file} />
            ),
        });
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
        console.log("option1: " + this.state.optionListData);
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
        console.log("option2: " + this.state.optionListData2);
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
        console.log("option3: " + this.state.optionListData3);
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
              <Upload
                className="avatar-uploader"
                name="avatar"
                // action="/upload.do"
                listType="picture"
                showUploadList={false}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                // beforeUpload={beforeUpload}
                // onChange={this.handleUpload}
              >
                <Button icon={<UploadOutlined />} style={{ marginLeft: 20 }}>
                  Upload Avatar
                </Button>
              </Upload>
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
          <div className="posted-questions">
            Posted Questions
            <br />
            {this.state.questionPopulated === false ? null : (
              <QuestionList
                questionList={this.state.questionlistData}
                optionList={this.state.optionListData}
              />
            )}
          </div>
          <div className="past-votes">
            Your Votes
            <br />
            {this.state.votePopulated === false ? null : (
              <QuestionList
                questionList={this.state.votelistData}
                optionList={this.state.optionListData2}
              />
            )}
          </div>
          <div className="past-attitude">
            Questions you liked/disliked
            <br />
            {this.state.attitudePopulated === false ? null : (
              <QuestionList
                questionList={this.state.attitudeData}
                optionList={this.state.optionListData3}
              />
            )}
          </div>
        </Content>
      </Layout>
    );
  }
}
