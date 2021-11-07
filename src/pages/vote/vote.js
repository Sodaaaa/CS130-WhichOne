import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Layout, Menu} from 'antd/lib';
import CustomTag from '../../components/tag/CustomTag'; 
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { HomeOutlined, PlusCircleOutlined, BarsOutlined, UserOutlined } from '@ant-design/icons';
import "./vote.css";
import { cloneNode } from '@babel/types';

const { Header, Content } = Layout;

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    title: `Question ${i+1}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'voting options - todo',
    content:
      'voting options - todo'
  });
}

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
        <Header>
          <div className="logo"> Which One </div>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={["vote"]}>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to='/homepage'>Home</Link>
            </Menu.Item>
            <Menu.Item key="question" icon={<PlusCircleOutlined />}>
              <Link to='/question'>Post</Link>
            </Menu.Item>
            <Menu.Item key="vote" icon={<BarsOutlined />}>
              <Link to='/vote'>Vote</Link>
            </Menu.Item>       
            <Menu.Item key="login" icon={<UserOutlined />}>
              <Link to='/login'>Login</Link>
            </Menu.Item>        
          </Menu>
        </Header>
        <Content style={{ padding: '0px 50px' }} className='vote-content'>
              <div className="vote-site-layout-content">
                <div className="vote-tags"> 
                  <CustomTag />
                  {/* <Tag color="#A7DB42">Food</Tag> */}
                  {/* <Tag color="#FDCB6E">Sports</Tag> */}
                  {/* <Tag color="#FFC0CB">Movie</Tag> */}
                  {/* <Tag color="#A29BFE">Travel</Tag> */}
                  {/* <Tag color="#75B4FF">Music</Tag> */}
                  {/* <Tag color="#FF7675">Book</Tag> */}
                  {/* <Tag color="#00B894">Style</Tag> */}
                </div>
                <div className="vote-questions">
                  <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{ onChange: page => { console.log(page); }, pageSize: 8, }}
                    dataSource={listData}
                    renderItem={item => (
                      <List.Item
                        key={item.title}
                        actions={[
                          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                        extra={
                          <img
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                          />
                        }
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
                </div>
              </div>
        </Content>  
      </Layout>    
    )
  }
}