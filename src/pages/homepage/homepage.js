import React, { Component } from 'react';
import { Layout, Row, Col, Button} from 'antd/lib';
import { SmallDashOutlined } from '@ant-design/icons';
import './homepage.css'
import MenuBar from '../../components/MenuBar/MenuBar';
import HotTopicCard from '../../components/HotTopicCard/HotTopicCard';
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
                <HotTopicCard title="Style"
                  topic={this.state.styleTopic}
                  bgcolor="#00B894"/>
              </Col>
              <Col className="homepage-col" span={6}>
                <HotTopicCard title="Sports"
                  topic={this.state.sportsTopic}
                  bgcolor="#FDCB6E"/>
              </Col>
              <Col className="homepage-col" span={6}>
                <HotTopicCard title="Music"
                  topic={this.state.musicTopic}
                  bgcolor="#75B4FF"/>
              </Col>
            </Row>
            <Row className="homepage-row" gutter={40}>
              <Col className="homepage-col" span={6}>
                <HotTopicCard title="Movie"
                  topic={this.state.movieTopic}
                  bgcolor="#FFC0CB"/>
              </Col>
              <Col className="homepage-col" span={6}>
                <HotTopicCard title="Food"
                  topic={this.state.foodTopic}
                  bgcolor="#A7DB42"/>
              </Col>
              <Col className="homepage-col" span={6}>
                <HotTopicCard title="Travel"
                  topic={this.state.travelTopic}
                  bgcolor="#FF7675"/>
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