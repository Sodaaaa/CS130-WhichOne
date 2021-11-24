import React, { Component } from 'react';
import { Descriptions, Avatar, Image, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import { Layout } from 'antd/lib';
import "./profile.css";
import MenuBar from '../../components/MenuBar/MenuBar';
import axios from 'axios';
import OptionList from '../../components/optionList/OptionList';
import QuestionList from '../../components/questionList/questionList';

const { Header, Content } = Layout;

const dataSource = [
  {key: '1', name: 'daFei', age: 32},
  {key: '2', name: 'foo', age: 42},
  {key: '3', name: 'bar', age: 32},
];

export default class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn:true,
      questionlistData : [],
      votelistData: [],
      username: ""
    };
  }
  
  handleSubmit = () =>  {
    //event.preventDefault();
    //console.log(this.state.username);
    this.setState({loggedIn:true});
    localStorage.setItem('loggedIn', false);
    this.props.history.push('/login');
  }

  componentDidMount() {
    const list = [];
    axios.post("/api/getHistoricalQuestions", 
    {
      UID: Number(localStorage.getItem('UID'))
    }).then((res) => {
      // console.log("result is", res);
      for (let i = 0; i < res.data.length; i++) {
        console.log(res.data[i].avator);
        let question = {
          title: res.data[i].question,
          description: res.data[i].tag,
          content: <OptionList options={res.data[i].option_list}/>,
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
        console.log("UID is", localStorage.getItem('UID'))
        console.log("historical questions are: ",list[i]);
      } 
      this.setState({questionlistData : list});
      // this.setState({optionList : options});
      console.log("listData: " + this.state.questionlistData);
      //console.log("optionList: " + this.state.optionList);
    });

    const votelist = [];
    axios.post("/api/getVotes", 
    {
      UID: Number(localStorage.getItem('UID'))
    }).then((res) => {
      console.log("vote result is", res);
      for (let i = 0; i < res.data.length; i++) {
        console.log(res.data[i].avator);
        let question = {
          title: res.data[i].question,
          description: res.data[i].tag,
          // content: <OptionList voteoptions={res.data[i].option_name}/>,
          likes: 0,
          dislikes: 0,
          liked: false, 
          disliked: false,
          ID: res.data[i].questionID,
          uid: res.data[i].ownerID,
          isAnonymous : res.data[i].anonymous,
          username: res.data[i].username,
          avatar: res.data[i].avator === undefined? 
              <Avatar style={{ backgroundColor: '#E2D4F3' }} icon={<UserOutlined />} /> : 
              <Avatar src={res.data[i].avator} />
        };
        if (res.data[i].anonymous) {
          question.avatar = <Avatar>A</Avatar>;
          question.uid = "Anonymous";
        }
        //else question.avatar = res.data[i].avator === undefined? <Avatar style={{ backgroundColor: '#E2D4F3' }} icon={<UserOutlined />} /> : res.data[i].avator};
        votelist.push(question);
        // options.push({content: res.data[i].options})
        console.log("UID is", localStorage.getItem('UID'))
        console.log("historical questions are: ",votelist[i]);
      } 
      this.setState({votelistData : votelist});
      // this.setState({optionList : options});
      console.log("listData: " + this.state.votelistData);
      //console.log("optionList: " + this.state.optionList);
    });

  }

  render() {
    return (
      <Layout className="layout">
        <MenuBar selected="profile"></MenuBar>
        {/* <Content style={{ padding: '50px 50px' }} className='profile-content'>
          Profile
        </Content> */}
        <Content style={{ padding: '50px 50px' }} className='profile-content'>
          <div className="user-profile">
            <Avatar size={150} src={<Image src="https://joeschmoe.io/api/v1/random"/>} />
            <div className="user-name">Testuser</div>
            <div className="logout">
              <Button 
                type="primary" 
                htmlType="submit" 
                className="logout-button"
                onClick={this.handleSubmit}>
                Log Out
              </Button>
            </div>
            <Descriptions bordered>
              <Descriptions.Item label="UserName">Testuser</Descriptions.Item>
              <Descriptions.Item label="Email">{localStorage.getItem('email')}</Descriptions.Item>
            </Descriptions>
          </div>
          <div className="posted-questions">
            Posted Questions
            <br/> 
            <QuestionList questionList={this.state.questionlistData}/>
          </div>
          <div className="past-votes">
            Your Votes
            <br/>
            <QuestionList questionList={this.state.votelistData}/>
          </div>
        </Content>
      </Layout>
    )
  }
}
