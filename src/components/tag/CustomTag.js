import React, { Component } from 'react';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

const tagsData = ['Food', 'Sports', 'Movie', 'Travel', 'Music', 'Book', 'Style'];

class CustomTag extends Component {
  state = {
    selectedTag: 'Book',
    //selectedTags: ['Book'],
  };

  handleChange(tag, checked) {
    //const { selectedTag } = this.state;
    //const { selectedTags } = this.state;
    //const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    //console.log('You are interested in: ', nextSelectedTags);
    console.log('You are interested in: ', tag);
    this.setState({ selectedTag: tag });
  }

  render() {
    //const { selectedTags } = this.state;
    const { selectedTag } = this.state;
    return (
      <>
        <span style={{ marginRight: 8 }}>Categories:</span>
        {tagsData.map(tag => (
          <CheckableTag
            key={tag}
            //color={"#FF7675"}
            //checked={selectedTags.indexOf(tag) > -1}
            checked={selectedTag===tag}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </>
    );
  }
}

export default CustomTag;