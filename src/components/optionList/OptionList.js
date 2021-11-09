import React, { Component } from 'react';
import { Radio, Input, Space } from 'antd';

class OptionList extends Component {
  state = {
    value: 1,
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { value } = this.state;
    return (
      <Radio.Group className="optionList-radiogroup" onChange={this.onChange} value={value}>
        <Space direction="vertical">
          <Radio className="option" value={1}>
            <p>Option A</p>
            <img 
              width={272}
              alt="logo"
              src="https://www.k9ofmine.com/wp-content/uploads/2021/03/white-colored-maltese-850x520.jpg"
            />
          </Radio>
          <Radio value={2}>
            <p>Option B</p>
            <img 
              width={272}
              alt="logo"
              src="https://www.petmd.com/sites/default/files/styles/article_image/public/small-kitten-walking-towards_127900829_0.jpg?itok=ah_gTtbS"
            /> 
          </Radio>
          <Radio value={3}>
            <p>Option C</p>
            <img 
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            /> 
          </Radio>
          <Radio value={4}>
            More...
            {value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
          </Radio>
        </Space>
      </Radio.Group>
    );
  }
}

export default OptionList;
