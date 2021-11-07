import React, { Component } from 'react';
import { Tag } from 'antd';
import "./CustomTag.css"

const { CheckableTag } = Tag;

const tagsData = ['Food', 'Sports', 'Movie', 'Travel', 'Music', 'Book', 'Style'];

const tagsColor = ['#A7DB42', '#FDCB6E', '#FFC0CB', '#A29BFE', '#75B4FF', '#FF7675', '#00B894'];

class CustomTag extends Component {

  state = {
    selectedTags: ['Book'],
  };

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

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <>
        <span className="customTag-tag" style={{ marginRight: 12 }}>
          <Tag color='#6C5CE7' size='50px' style={{borderRadius: 3, fontSize: 20, height: 30, paddingTop:3.5}}>What's your interest?</Tag>
        </span>
        {/* {this.createCheckableTags(selectedTags)} */}
        <div className="customTag-tagLiss">
        {tagsData.map((tag, i) => (
          <CheckableTag
            key={tag}
            style={{ backgroundColor: tagsColor[i], color: 'white', marginTop: 12}}
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