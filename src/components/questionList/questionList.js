
import React, { Component, useState, createElement } from 'react';
import OptionList from '../../components/optionList/OptionList';
import { MessageOutlined, DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, StarOutlined } from '@ant-design/icons';
import { List, Avatar, Space} from 'antd';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    title: `Question ${i+1}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'tag',
    content:
      <OptionList />
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {liked: false, disliked: false, likes:0, dislikes: 0};
  }

  like = () => {
    if (this.state.liked == false) {
      const {likes} = this.state;
      this.setState({disliked: false, likes: likes + 1, liked: true});
    } else {
      const {likes} = this.state;
      this.setState({likes: likes - 1, liked: false});
    }
  };
  
  dislike = () => {
    if (this.state.disliked == false) {
      const {dislikes} = this.state;
      this.setState({liked: false, dislikes: dislikes + 1, disliked: true});
    } else {
      const {dislikes} = this.state;
      this.setState({dislikes: dislikes - 1, disliked: false});
    }
  };

  render() {
    let LikeAttitude;
    console.log(this.state.liked)
    if (this.state.liked == false) {
      LikeAttitude = <LikeOutlined onClick={this.like}> {this.state.likes} </LikeOutlined>;
    } else {
      LikeAttitude = <LikeFilled onClick={this.like}> {this.state.likes} </LikeFilled>;
    };

    let DislikeAttitude;
    console.log(this.state.disliked, this.state.dislikes)
    if (this.state.disliked == false) {
      DislikeAttitude = <DislikeOutlined onClick={this.dislike}> {this.state.dislikes} </DislikeOutlined>;
    } else {
      DislikeAttitude = <DislikeFilled onClick={this.dislike}> {this.state.dislikes} </DislikeFilled>;
    };
  
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{ onChange: page => { console.log(page); }, pageSize: 8, }}
        dataSource={listData}
        renderItem={item => (
          <List.Item
            style={{borderWidth: 3, borderStyle:'solid', borderColor: '#E2D4F3', marginTop: 10, borderRadius: 5, backgroundColor: 'rgba(211, 211, 211, 0.2)'}}
            key={item.title}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              // <IconText onClick={like} icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
                        // extra={
                        //   <img
                        //     width={272}
                        //     alt="logo"
                        //     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        //   />
                        // }
          >
          {LikeAttitude}
          {DislikeAttitude}
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
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