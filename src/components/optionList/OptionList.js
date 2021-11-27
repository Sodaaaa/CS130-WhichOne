import React, { Component } from "react";
import {
  Button,
  Radio,
  Input,
  Space,
  notification,
  Progress,
  Statistic,
} from "antd";

class OptionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: -1,
      listData: this.props.options,
      expired: this.props.expired,
      voted: this.props.voted,
      loggedIn: localStorage.getItem("loggedIn") == "true",
    };
  }

  openNotification = () => {
    notification.open({
      message: "Notification",
      description: "Please log in.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  onChange = (e) => {
    if (!this.state.loggedIn) {
      // alert("Please Log In");
      this.openNotification();
      return;
    }

    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  vote = () => {
    this.setState({
      voted: this.state.value,
    });
  };

  render() {
    // console.log(localStorage.getItem('loggedIn')=="true");
    const { value, listData } = this.state;
    //console.log("optionList" + listData);
    //listData.map((option) => (console.log("option: " + option.optionText)));
    console.log("expired is ", this.state.expired);
    return (
      <div>
        <Radio.Group
          className="optionList-radiogroup"
          onChange={this.onChange}
          value={value}
        >
          {/* <Space direction="horizontal" wrap="true" size='large'> */}
          <Space direction="vertical">
            {listData.map((option, i) => (
              <div key={i}>
                <Radio
                  disabled={
                    !this.state.loggedIn ||
                    this.state.expired ||
                    this.state.voted != -1
                  }
                  className="option"
                  value={i}
                  key={i}
                >
                  <p>{option.option_name} </p>
                  {/* <p>{this.state.voted}</p> */}
                  {/* <img 
                  width={272}
                  alt="logo"
                  src="https://www.k9ofmine.com/wp-content/uploads/2021/03/white-colored-maltese-850x520.jpg"
                /> */}
                </Radio>
                {this.state.voted === -1 ? null : (
                  <div>
                    <Progress percent={50} strokeColor="#E2D4F3" />
                    <Statistic
                      value={option.option_vote}
                      suffix={"/" + 150}
                      valueStyle={{ fontSize: 12 }}
                    />
                  </div>
                )}
              </div>
            ))}
            {/* <Radio className="option" value={1}>
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
          </Radio> */}
          </Space>
        </Radio.Group>
        <br />
        <Button
          type="primary"
          htmlType="button"
          onClick={() => this.vote()}
          className="vote-submit-btn"
          style={{ marginTop: 10 }}
        >
          Vote
        </Button>
      </div>
    );
  }
}

export default OptionList;
