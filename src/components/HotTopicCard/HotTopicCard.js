import React, { Component } from 'react';
import {Card} from 'antd/lib';

export default class HotTopicCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {    
    return (      
      <a href={"./vote?tag="+this.props.title}>
        <Card className="homepage-card" title={this.props.title}
          headStyle={{color:"#FFFFFF"}}
          style={{backgroundColor:this.props.bgcolor}}
          bordered={true}
          hoverable>
          {this.props.topic}
        </Card>
      </a>       
    )
  }
}