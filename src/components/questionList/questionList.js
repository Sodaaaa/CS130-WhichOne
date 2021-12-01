import React, { Component } from "react";
import OptionList from "../../components/optionList/OptionList";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  RightCircleTwoTone,
} from "@ant-design/icons";
import { List, Avatar, Space, notification, Tag } from "antd";
import axios from "axios";
import { Collapse } from "antd";
import "./questionList.css";

const { Panel } = Collapse;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const colors = {
  Food: "#A7DB42",
  Sports: "#FDCB6E",
  Movie: "#FFC0CB",
  Music: "#75B4FF",
  Travel: "#FF7675",
  Style: "#00B894",
};

class QuestionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listData: this.props.questionList,
      loggedIn: localStorage.getItem("loggedIn") == "true",
      optionListData: this.props.optionList,
      currentPage: this.props.currentPage,
    };
  }

  openNotification = () => {
    notification.open({
      message: "Notification",
      description: "Please log in.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  recordAttitude = (id, attitude) => {
    this.setState({ listData: this.state.listData });
    axios
      .post("/api/recordAttitude", {
        userID: Number(localStorage.getItem("UID")),
        questionID: Number(id),
        attitude: attitude,
      })
      .then((res) => {
        console.log(res);
      });
  };

  cancelAttitude = (id, attitude) => {
    this.setState({ listData: this.state.listData });
    axios
      .post("/api/cancelAttitude", {
        userID: Number(localStorage.getItem("UID")),
        questionID: Number(id),
        attitude: attitude,
      })
      .then((res) => {
        console.log(res);
      });
  };

  like = (item) => {
    // console.log(item.ID);
    if (!this.state.loggedIn) {
      // alert("Please Log In");
      this.openNotification();
    }
    if (this.state.loggedIn) {
      if (item.attitude == -1) {
        item.attitude = 0;
        item.likes += 1;
        this.recordAttitude(item.ID, 0);
      } else if (item.attitude == 0) {
        item.attitude = -1;
        item.likes -= 1;
        this.cancelAttitude(item.ID, 0);
      } else {
        item.attitude = 0;
        item.likes += 1;
        item.dislikes -= 1;
        this.recordAttitude(item.ID, 0);
      }
      // if (item.liked == false && item.disliked == false) {
      //   item.liked = true;
      //   item.likes = item.likes + 1;
      //   this.recordAttitude(0);
      // } else if (item.liked == true && item.disliked == false) {
      //   item.liked = true;
      //   item.likes = item.likes + 1;
      //   this.recordAttitude(0);
      // }
    }
  };

  dislike = (item) => {
    // console.log("ID is ", item.ID);
    if (!this.state.loggedIn) {
      // alert("Please Log In");
      this.openNotification();
    }
    if (this.state.loggedIn) {
      if (item.attitude == -1) {
        item.attitude = 1;
        item.dislikes += 1;
        this.recordAttitude(item.ID, 1);
      } else if (item.attitude == 1) {
        item.attitude = -1;
        item.dislikes -= 1;
        this.cancelAttitude(item.ID, 1);
      } else {
        item.attitude = 1;
        item.likes -= 1;
        item.dislikes += 1;
        this.recordAttitude(item.ID, 1);
      }
      // if (this.state.loggedIn && item.liked == false && item.disliked == false) {
      //   item.disliked = true;
      //   item.dislikes = item.dislikes + 1;
      //   this.recordAttitude(item.ID, 1);
      // } else if (this.state.loggedIn && item.liked == false && item.disliked == true) {
      //   item.disliked = false;
      //   item.dislikes = item.dislikes - 1;
      //   this.cancelAttitude(item.ID, 1);
    }
  };

  componentDidUpdate(prevProps) {
    console.log("prev: ", prevProps);
    console.log("current: ", this.props);

    if (prevProps.questionList != this.props.questionList) {
      this.setState({ listData: this.props.questionList, currentPage: 0 });
    }
    // console.log('prevOptions: ', prevProps.optionList);
    // console.log('this.props.options', this.props.optionList)
    if (prevProps.optionList != this.props.optionList) {
      this.setState({ optionListData: this.props.optionList });
    }
  }

  render() {
    //console.log("inside questionList: ", this.state.listData)
    console.log("current page", this.state.currentPage);
    return this.state.listData.length === 0 ? (
      <List
        style={{ backgroundColor: "white" }}
        dataSource={this.state.listData}
      />
    ) : (
      <List
        // style={{backgroundColor:'white'}}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log("page", page);
            this.setState({ currentPage: page - 1 });
          },
          pageSize: 6,
        }}
        dataSource={this.state.listData}
        renderItem={(item, idx) => (
          <Collapse
            bordered={false}
            defaultActiveKey={["0"]}
            expandIcon={({ isActive }) => (
              <RightCircleTwoTone
                twoToneColor="#6C5CE7"
                rotate={isActive ? 90 : 0}
                style={{ fontSize: 20 }}
              />
            )}
          >
            <Panel key={idx} header={item.title}>
              <List.Item
                style={{
                  borderWidth: 3,
                  borderStyle: "solid",
                  borderColor: "#E2D4F3",
                  marginTop: 10,
                  borderRadius: 5,
                  backgroundColor: "rgba(211, 211, 211, 0.2)",
                }}
                key={item.title}
                actions={[
                  // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                  // <IconText onClick={like} icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                  // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                  <span onClick={() => this.like(item)}>
                    <Space>
                      {React.createElement(
                        item.attitude === 0 ? LikeFilled : LikeOutlined
                      )}
                      {item.likes}
                    </Space>
                  </span>,
                  <span onClick={() => this.dislike(item)}>
                    <Space>
                      {React.createElement(
                        item.attitude === 1 ? DislikeFilled : DislikeOutlined
                      )}
                      {item.dislikes}
                    </Space>
                  </span>,
                  <p>
                    {" "}
                    {item.expired
                      ? "expired on " + item.expiryTime
                      : "expires on " + item.expiryTime}{" "}
                  </p>,
                ]}
                // extra={
                //   <img
                //     width={272}
                //     alt="logo"
                //     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                //   />
                // }
              >
                <List.Item.Meta
                  avatar={
                    <div style={{ textAlign: "center", color: "#6C5CE7" }}>
                      {/* '#E2D4F3'}}> */}
                      <Avatar src={item.avatar} />
                      <br />
                      {"@" + item.username}
                    </div>
                  }
                  title={item.title}
                  description={
                    <Tag
                      color={colors[item.description]}
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 12,
                        textAlign: "center",
                      }}
                    >
                      {item.description}
                    </Tag>
                  }
                />
                {/* {item.content} */}
                <OptionList
                  options={
                    this.state.optionListData[idx + 6 * this.state.currentPage]
                  }
                  expired={item.expired}
                  voted={item.voted}
                  totalVotes={item.total_votes}
                  uid={item.uid}
                  questionID={item.ID}
                  // parentCallback={this.handleOptionCallBack}
                />
              </List.Item>
            </Panel>
          </Collapse>
        )}
      />
    );
  }
}

export default QuestionList;
