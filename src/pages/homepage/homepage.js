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
    axios.get("api/listHotTopics")
    .then((res) => {
      var i;
      for(i in res.data){
        var topic = res.data[i];
        switch(topic.tag){
          case "Style":
            this.setState({styleTopic: topic.question});
            break;
          case "Sports":
            this.setState({sportsTopic: topic.question});
            break;
          case "Music":
            this.setState({musicTopic: topic.question});
            break;
          case "Movie":
            this.setState({movieTopic: topic.question});
            break;
          case "Food":
            this.setState({foodTopic: topic.question});
            break;
          case "Travel":
            this.setState({travelTopic: topic.question});
        }      
      }
    });
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
                  {this.state.styleTopic}
                </Card>
              </Col>
              <Col className="homepage-col" span={6}>
                <Card className="homepage-card" title="Sports" 
                  headStyle={{color:"#FFFFFF"}}
                  style={{backgroundColor:"#FDCB6E"}} 
                  bordered={true}>
                  {this.state.sportsTopic}
                </Card>
              </Col>
              <Col className="homepage-col" span={6}>
                <Card className="homepage-card" title="Music"
                  headStyle={{color:"#FFFFFF"}}
                  style={{backgroundColor:"#75B4FF"}} 
                  bordered={true}>
                  {this.state.musicTopic}
                </Card>
              </Col>
            </Row>
            <Row className="homepage-row" gutter={40}>
              <Col className="homepage-col" span={6}>
                <Card className="homepage-card" title="Movie" 
                  headStyle={{color:"#FFFFFF"}}
                  style={{backgroundColor:"#FFC0CB"}} 
                  bordered={true}>
                  {this.state.movieTopic}
                </Card>
              </Col>
              <Col className="homepage-col" span={6}>
                <Card className="homepage-card" title="Food" 
                  headStyle={{color:"#FFFFFF"}}
                  style={{backgroundColor:"#A7DB42"}}
                  bordered={true}>
                  {this.state.foodTopic}
                </Card>
              </Col>
              <Col className="homepage-col" span={6}>
                <Card className="homepage-card" title="Travel"  
                  headStyle={{color:"#FFFFFF"}}
                  style={{backgroundColor:"#FF7675"}}
                  bordered={true}>
                  {this.state.travelTopic}
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