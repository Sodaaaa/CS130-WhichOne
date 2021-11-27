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
import axios from "axios";

class OptionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.voted,
      listData: this.props.options,
      expired: this.props.expired,
      voted: this.props.voted,
      questionID: this.props.questionID,
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
    //console.log(e.target.value)
    this.setState({
      value: e.target.value,
    });
  };

  // onTriggerCallBack() {
  //   console.log("triggered")
  //   this.props.parentCallback();
  // }


  vote = () => {
    this.setState({
      voted: this.state.value,
      // listData: this.state.listData
    });
    console.log(this.state.value)
    axios.post('/api/recordVote', {
      userID: Number(localStorage.getItem('UID')),
      questionID: Number(this.state.questionID),
      optionID: Number(this.state.value)
    }).then((res) => {
      console.log(res)
      // this.setState({listData: this.state.listData})
      // this.onTriggerCallBack();
    })
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
                  style={{minWidth:100}}
                  disabled={
                    !this.state.loggedIn ||
                    this.state.expired ||
                    this.state.voted != -1
                  }
                  className="option"
                  value={option.optionID}
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
                      // value={this.state.listData[i].option_vote}
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
          disabled={this.state.voted != -1}
        >
          Vote
        </Button>
      </div>
    );
  }
}

export default OptionList;
