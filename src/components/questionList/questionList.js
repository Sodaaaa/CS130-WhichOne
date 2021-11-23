
import React, { Component, useState } from 'react';
import OptionList from '../../components/optionList/OptionList';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { List, Avatar, Space} from 'antd';

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
      //optionList: this.props.optionList
    };
  }
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
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
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