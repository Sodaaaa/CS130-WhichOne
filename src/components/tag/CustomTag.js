import React, { Component } from 'react';
import { Tag } from 'antd';
import "./CustomTag.css"

const { CheckableTag } = Tag;

const tagsData = ['Food', 'Sports', 'Movie', 'Travel', 'Music', 'Book', 'Style'];

const tagsColor = ['#A7DB42', '#FDCB6E', '#FFC0CB', '#A29BFE', '#75B4FF', '#FF7675', '#00B894'];

class CustomTag extends Component {

  state = {
    //selectedTag: 'Book',
    selectedTags: ['Book'],
  };

  createCheckableTags(selectedTags) {
    const checkableTags = [];
    for(let i = 0; i < 7; ++i) {
      checkableTags.push(
      <CheckableTag 
        key={tagsData[i]}
        //color={tagsColor[i]}
        style={{ backgroundColor: tagsColor[i], color: 'white'}}
        checked={selectedTags.indexOf(tagsData[i]) > -1} 
        onChange={checked => this.handleChange(tagsData[i], checked)}
      >
        {tagsData[i]}
      </CheckableTag>)
    }
    return checkableTags;
  }

  handleChange(tag, checked) {
    //const { selectedTag } = this.state;
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    //console.log('You are interested in: ', tag);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;
    //const { selectedTag } = this.state;
    return (
      <>
        <span className="customTag-tag" style={{ marginRight: 12, color: '#6C5CE7'}}>Categories:</span>
        {this.createCheckableTags(selectedTags)}
        {/* {tagsData.map(tag => (
          <CheckableTag
            key={tag}
            //checked={selectedTags.indexOf(tag) > -1}
            checked={selectedTag===tag}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))} */}
      </>
    );
  }
}

export default CustomTag;