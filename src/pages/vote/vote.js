import React, { Component } from 'react';
import { Layout } from 'antd/lib';
import CustomTag from '../../components/tag/CustomTag'; 
import OptionList from '../../components/optionList/OptionList';
import MenuBar from '../../components/MenuBar/MenuBar'
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import "./vote.css";
import { cloneNode } from '@babel/types';
import QuestionList from '../../components/questionList/questionList';

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
  render() {
    return (
      <Layout className="layout">
        <MenuBar selected="vote"></MenuBar>
        <Content style={{ padding: '0px 50px' }} className='vote-content'>
              <div className="vote-site-layout-content">
                <div className="vote-tags"> 
                  <CustomTag />
                </div>
                <div className="vote-questions">
                  <QuestionList />
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