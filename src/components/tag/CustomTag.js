import React, { Component } from 'react';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

const tagsData = ['Food', 'Sports', 'Movie', 'Travel', 'Music', 'Book', 'Style'];

class CustomTag extends Component {
  state = {
    selectedTags: ['Book'],
  };

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
        <span style={{ marginRight: 8 }}>Categories:</span>
        {tagsData.map(tag => (
          <CheckableTag
            key={tag}
            //color={"#FF7675"}
            checked={selectedTags.indexOf(tag) > -1}
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