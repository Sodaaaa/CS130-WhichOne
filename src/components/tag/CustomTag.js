import React, { Component } from 'react';
import { Tag } from 'antd';
import "./CustomTag.css"
import axios from 'axios';
import OptionList from '../../components/optionList/OptionList';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { CheckableTag } = Tag;

const tagsData = ['Food', 'Sports', 'Movie', 'Music', 'Travel', 'Style'];

const tagsColor = ['#A7DB42', '#FDCB6E', '#FFC0CB', '#75B4FF', '#FF7675', '#00B894'];

class CustomTag extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTags: [],
      listData: this.props.questionList,
      loggedIn: localStorage.getItem('loggedIn')=="true",
    //optionList: this.props.optionList
    };
  }

  // createCheckableTags(selectedTags) {
  //   const checkableTags = [];
  //   for(let i = 0; i < 7; ++i) {
  //     checkableTags.push(
  //     <CheckableTag 
  //       key={tagsData[i]}
  //       //color={tagsColor[i]}
  //       style={{ backgroundColor: tagsColor[i], color: 'white'}}
  //       checked={selectedTags.indexOf(tagsData[i]) > -1} 
  //       onChange={checked => this.handleChange(tagsData[i], checked)}
  //     >
  //       {tagsData[i]}
  //     </CheckableTag>)
  //   }
  //   return checkableTags;
  // }

  onTriggerCallBack(nextSelectedTags) {
    //this.props.parentCallback(this.state.listData);
    this.props.parentCallback(nextSelectedTags);
  }

  // populateList(res, list) {
  //   for (let i = 0; i < res.data.length; i++) {
  //     let question = {
  //       title: res.data[i].question,
  //       description: res.data[i].tag,
  //       content: <OptionList options={res.data[i].options}/>,
  //       likes: res.data[i].likes,
  //       dislikes: res.data[i].dislikes,
  //       liked: false, 
  //       disliked: false,
  //       ID: res.data[i].questionID,
  //       uid: res.data[i].ownerID,
  //       isAnonymous : res.data[i].anonymous,
  //       avatar: res.data[i].avator === undefined? 
  //           <Avatar style={{ backgroundColor: '#E2D4F3' }} icon={<UserOutlined />} /> : 
  //           <Avatar src={res.data[i].avator} />
  //     };
  //     if (res.data[i].anonymous) {
  //       question.avatar = <Avatar>A</Avatar>;
  //       question.uid = "Anonymous";
  //     }
  //     //else question.avatar = res.data[i].avator === undefined? <Avatar style={{ backgroundColor: '#E2D4F3' }} icon={<UserOutlined />} /> : res.data[i].avator};
  //     list.push(question);
  //     // options.push({content: res.data[i].options})
  //     console.log(list[i]);
  //   } 

  //   console.log("new list:" + this.state.listData);
  // }

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });

    const list = [];
    console.log("selectedTags: ", nextSelectedTags);
    this.onTriggerCallBack(nextSelectedTags);
    // if (nextSelectedTags.length != 0) {
    //   axios.get("/api/listTopics", {
    //     params: {tag: nextSelectedTags[0]}
    //   }).then((res) => {
    //     console.log(res);
    //     this.populateList(res, list);
    //     this.setState({listData: list});
    //     this.onTriggerCallBack();
    //   });
    // } else {
    //   axios.get("/api/getAllQuestions").then((res) => {
    //     console.log(res);
    //     this.populateList(res, list);
    //     this.setState({listData : list});
    //     this.onTriggerCallBack();
    //   });
    // }
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <>
        <span className="customTag-tag" style={{ marginRight: 12 }}>
          <Tag color='#6C5CE7' size='50px' style={{borderRadius: 3, fontSize: 20, height: 30, paddingTop:3.5}}>What's your interest?</Tag>
        </span>
        {/* {this.createCheckableTags(selectedTags)} */}
        <div className="customTag-tagList">
        {tagsData.map((tag, i) => (
          <CheckableTag
            key={tag}
            style={{ backgroundColor: tagsColor[i], color: 'white', marginTop: 12, fontWeight: 'bold', fontSize: 13, textAlign: 'center'}}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
        </div>
      </>
    );
  }
}

export default CustomTag;