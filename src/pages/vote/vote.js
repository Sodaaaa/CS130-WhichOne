import React, { Component } from 'react';
import { Layout } from 'antd/lib';
import CustomTag from '../../components/tag/CustomTag'; 
import OptionList from '../../components/optionList/OptionList';
import MenuBar from '../../components/MenuBar/MenuBar'
import { List, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./vote.css";
import { cloneNode } from '@babel/types';
import QuestionList from '../../components/questionList/questionList';
import axios from 'axios';

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
      listData : [],
      optionList : [],
    }
  }

  componentDidMount() {
    const list = [];
    const options = [];
    axios.get("/api/getAllQuestions").then((res) => {
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        console.log(res.data[i].avator);
        let question = {
          title: res.data[i].question,
          description: res.data[i].tag,
          content: <OptionList options={res.data[i].options}/>,
          likes: res.data[i].likes,
          dislikes: res.data[i].dislikes,
          liked: false, 
          disliked: false,
          ID: res.data[i].questionID,
          uid: res.data[i].ownerID,
          isAnonymous : res.data[i].anonymous,
          avatar: res.data[i].avator === undefined? 
              <Avatar style={{ backgroundColor: '#E2D4F3' }} icon={<UserOutlined />} /> : 
              <Avatar src={res.data[i].avator} />
        };
        if (res.data[i].anonymous) {
          question.avatar = <Avatar>A</Avatar>;
          question.uid = "Anonymous";
        }
        //else question.avatar = res.data[i].avator === undefined? <Avatar style={{ backgroundColor: '#E2D4F3' }} icon={<UserOutlined />} /> : res.data[i].avator};
        list.push(question);
        // options.push({content: res.data[i].options})
        console.log(list[i]);
      } 
      this.setState({listData : list});
      // this.setState({optionList : options});
      console.log("listData: " + this.state.listData);
      //console.log("optionList: " + this.state.optionList);
    });
  }

  render() {
    if (this.state.listData.length == 0) return null;
    return (
      <Layout className="layout">
        <MenuBar selected="vote"></MenuBar>
        <Content style={{ padding: '0px 50px' }} className='vote-content'>
              <div className="vote-site-layout-content">
                <div className="vote-tags"> 
                  <CustomTag />
                </div>
                <div className="vote-questions">
                {/* <QuestionList /> */}
                  <QuestionList questionList={this.state.listData} optionList={this.state.optionList}/>
                  {/* <List
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
                  /> */}
                </div>
              </div>
        </Content>  
      </Layout>    
    )
  }
}