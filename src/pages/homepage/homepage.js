import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import { Layout, Menu, Card, Row, Col, Button} from 'antd/lib';
import { HomeOutlined, PlusCircleOutlined, BarsOutlined, UserOutlined, SmallDashOutlined } from '@ant-design/icons';
import './homepage.css'

const { Header, Content, Footer } = Layout;

export default class homepage extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
        <div className="logo"> Which One </div>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={["home"]}>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to='/homepage'>Home</Link>
            </Menu.Item>
            <Menu.Item key="post" icon={<PlusCircleOutlined />}>
              <Link to='/question'>Post</Link>
            </Menu.Item>
            <Menu.Item key="vote" icon={<BarsOutlined />}>
              <Link to='/vote'>Vote</Link>
            </Menu.Item>       
            <Menu.Item key="user" icon={<UserOutlined />}>
              <Link to='/login'>Login</Link>
            </Menu.Item>        
          </Menu>
        </Header>
        <Content className="homepage-content">
          <div className="homepage-title">
              Which One? <br/> Decide for you and others
          </div>  
          <div className="homepage-cards">
            <Row className="homepage-row" gutter={40}>
              <Col className="homepage-col" span={6}>
                <Card className="homepage-card" title="Style"
                  headStyle={{color:"#FFFFFF"}}
                  style={{backgroundColor:"#00B894"}}
                  bordered={true}>
                  What should I wear for my date?
                </Card>
              </Col>
              <Col className="homepage-col" span={6}>
                <Card className="homepage-card" title="Sports" 
                  headStyle={{color:"#FFFFFF"}}
                  style={{backgroundColor:"#FDCB6E"}} 
                  bordered={true}>
                  What shoud I do for today’s workout?
                </Card>
              </Col>
              <Col className="homepage-col" span={6}>
                <Card className="homepage-card" title="Music"
                  headStyle={{color:"#FFFFFF"}}
                  style={{backgroundColor:"#75B4FF"}} 
                  bordered={true}>
                  What music should ...
                </Card>
              </Col>
            </Row>
            <Row className="homepage-row" gutter={40}>
              <Col className="homepage-col" span={6}>
                <Card className="homepage-card" title="Movie" 
                  headStyle={{color:"#FFFFFF"}}
                  style={{backgroundColor:"#FFC0CB"}} 
                  bordered={true}>
                  VenomII or 007?
                </Card>
              </Col>
              <Col className="homepage-col" span={6}>
                <Card className="homepage-card" title="Food" 
                  headStyle={{color:"#FFFFFF"}}
                  style={{backgroundColor:"#A7DB42"}}
                  bordered={true}>
                  What should I have for lunch today?
                </Card>
              </Col>
              <Col className="homepage-col" className="homepage-col" span={6}>
                <Card className="homepage-card" title="Travel"  
                  headStyle={{color:"#FFFFFF"}}
                  style={{backgroundColor:"#FF7675"}}
                  bordered={true}>
                  LA or NYC?
                </Card>
              </Col>
            </Row>
          </div>  
          <div>
            <Button className="homepage-btn" type="primary" 
              shape="round" icon={<SmallDashOutlined />}
              href="./vote">
              More
            </Button>
          </div>
        </Content>      
        <Footer style={{ textAlign: 'center' }}>CS130 Project By Which One Team</Footer>    
      </Layout>    
    )
  }
}