import React, { Component, useState, createElement } from 'react';
import OptionList from '../../components/optionList/OptionList';
import { MessageOutlined, DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, StarOutlined } from '@ant-design/icons';
import { List, Avatar, Space, Tooltip} from 'antd';
import axios from 'axios';

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

class QuestionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
    listData: this.props.questionList,
    loggedIn: localStorage.getItem('loggedIn')=="true",
    //optionList: this.props.optionList
    };
  }

  like = (item) => {
    // console.log(item.ID);
    if (!this.state.loggedIn) {
      alert("Please Log In");
    }
    if (this.state.loggedIn && item.liked == false && item.disliked == false) {
      item.liked = true;
      item.likes = item.likes + 1;
      this.setState({listData: this.state.listData});
      axios.post("/api/recordAttitude", {
        userID: localStorage.getItem('UID'),
        questionID: item.ID,
        attitude: 0
      }).then((res) => {
        console.log(res);
      })
    }
  };
  
  dislike = (item) => {
    // console.log("ID is ", item.ID);
    if (!this.state.loggedIn) {
      alert("Please Log In");
    }
    if (this.state.loggedIn && item.liked == false && item.disliked == false) {
      item.disliked = true;
      item.dislikes = item.dislikes + 1;
      this.setState({listData: this.state.listData});
      axios.post("/api/recordAttitude", {
        userID: localStorage.getItem('UID'),
        questionID: item.ID,
        attitude: 1
      }).then((res) => {
        console.log(res);
      })
    }
  };

  render() {

    //console.log(this.state.listData);
    //const { listData, optionList } = this.state;
    //console.log("optionList: " + optionList)
    // listData.map((question, i) => (
    //   //console.log(this.props.optionList[i].content)
    //   question.content = <OptionList options={this.props.optionList[i].content} />
    // ));
    //optionList.map((option) => (console.log(option)))
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{ onChange: page => { console.log(page); }, pageSize: 8, }}
        dataSource={this.state.listData}
        renderItem={item => (
          <List.Item
            style={{borderWidth: 3, borderStyle:'solid', borderColor: '#E2D4F3', marginTop: 10, borderRadius: 5, backgroundColor: 'rgba(211, 211, 211, 0.2)'}}
            key={item.title}
            actions={[
              // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              // <IconText onClick={like} icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
             //LikeAttitude,
             // DislikeAttitude
                <span onClick={() => this.like(item)}>
                  <Space>
                    {React.createElement(item.liked === true ? LikeFilled : LikeOutlined)}
                    {item.likes}
                  </Space>
                </span>,
                <span onClick={() => this.dislike(item)}>
                  <Space>
                    {React.createElement(item.disliked === true ? DislikeFilled : DislikeOutlined)}
                    {item.dislikes}
                  </Space>
                </span>
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
            avatar=
            {<div style={{textAlign: 'center', color: '#E2D4F3'}}>
              <Avatar src={item.avatar} />
              <br/>
              {item.uid}
            </div>}
            title={item.title}
            description={item.description}
          />
            {item.content}
          </List.Item>
        )}
      />
    )
  }
}

export default QuestionList;