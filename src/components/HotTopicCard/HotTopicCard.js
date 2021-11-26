import React, { Component } from 'react';
import {Card} from 'antd/lib';
import { withRouter } from 'react-router-dom';

class HotTopicCard extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(tag) {
    console.log("click"+tag);
    localStorage.setItem('tag', tag);
    this.props.history.push('/vote');
  }

  render() {    
    return (      
        <Card className="homepage-card" title={this.props.title}
          headStyle={{color:"#FFFFFF"}}
          style={{backgroundColor:this.props.bgcolor}}
          bordered={true}
          hoverable
          onClick={() => this.handleClick(this.props.title)}>
          {this.props.topic}          
        </Card>
    )
  }
}

export default withRouter(HotTopicCard)