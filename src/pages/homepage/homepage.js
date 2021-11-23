import React, { Component } from 'react';
import { Layout, Card, Row, Col, Button} from 'antd/lib';
import { SmallDashOutlined } from '@ant-design/icons';
import './homepage.css'
import MenuBar from '../../components/MenuBar/MenuBar';
import axios from 'axios';

const { Content, Footer } = Layout;

export default class homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {styleTopic:"", sportsTopic:"", musicTopic:"", movieTopic:"", foodTopic:"", travelTopic:""};
  }
  
  render() {
    return (
      <Layout className="layout">
        <MenuBar selected="home"></MenuBar>
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
                  Which song should I use as bgm for my vlog?
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
              <Col className="homepage-col" span={6}>
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
        {/* <div>
          {localStorage.getItem('email') && (
              <div>
                Name: <p>{localStorage.getItem('email')}</p>
              </div>
          )}
        </div>   */}
        <Footer style={{ textAlign: 'center' }}>CS130 Project By Which One Team</Footer>    
      </Layout>    
    )
  }
}