import React, {Component} from 'react';
import chatPres from "../../../mobx/presenters/ChatPres";
import {withRouter} from "next/router"
import {inject, observer} from "mobx-react"
import {message,Card, Input, Button} from "antd";
import StateView from "../../UI/StateView/StateView";
import moment from 'moment-jalaali'


const {TextArea} = Input

@inject("CoreStore")
@observer
class ConversationBox extends Component {

  constructor(props) {
    super(props);
    this.store = new chatPres()
  }

  state = {
    text: ''
  }


  componentDidMount() {
    this._getData()
  }


  _getData = () => {

    if (this.props.owner) {
      this.store.getUserChatList({order_id: this.props.router.query.status})
    } else {
      this.store.getTranslateChatList({order_id: this.props.router.query.status})
    }
  }


  handleLoadMore = () => {
    const data = {}
    data.order_id=this.props.router.query.status
    data.page=this.store.page+1
    if (this.props.CoreStore.user.role === "user") {
      this.store.getUserChatListMore(data)
    } else {
      this.store.getTranslateChatListMore(data)
    }
  }


  handleSendMessage = () => {
    const data = {}
    data.comment = this.state.text
    data.order_id = this.props.router.query.status

    if(!data.comment){return message.error("ارسال متن خالی امکان پذیر نیست")}
    if (this.props.owner) {
      this.store.sendUserChat(data, this.callBack)
    } else {
      this.store.sendTranslateChat(data, this.callBack)

    }

  }


  callBack = () => {
    this.setState({text: ''})

  }


  render() {

    return (
      <>
          <Card className="mb-3 radius " title={"مذاکرات"}>
        <StateView state={this.store.stateView} errorButtonAction={this._getData}>

            <div className="">
              {this.store.messageList.map((item, index) => {
                return <div key={'r1'+index}
                       className={`${item.by_user === this.props.CoreStore.user.role ? "messagebox-me" : "messagebox"}`}>
                    <div className="">
                      {/*<span>{item.user.name + " "+item.user.family }</span>*/}
                    </div>

                    <div className="px-2 my-2 ">
                      <span>{item.comment}</span>
                    </div>
                    <div className="d-flex justify-content-between ">
                      <img src={`/static/images${item.seen ? "/double-check" : "/check1"}.svg`} width={14}/>
                      <span className={"sub-title-gray mx-2 "}>{moment(item.created_at).locale('fa').fromNow()}</span>
                    </div>
                  </div>
              })}
              {this.store.hasMore && <div className={"d-flex my-5 "} >
                <Button className={"sample-btn  mx-auto radius w-25"} loading={this.store.loadingMore} onClick={this.handleLoadMore}>پیام های بیشتر</Button>
              </div>}
            </div>

            <div className="row align-items-end my-3 ">
              <div className="col-9">
                <TextArea value={this.state.text} onPressEnter={()=>this.handleSendMessage()} onChange={e => this.setState({text: e.target.value})} placeholder={"پیام خود را بنویسید"} />
              </div>
              <div className="col-3">
                <Button loading={this.store.loading} onClick={this.handleSendMessage} className={"login-btn w-100"}>ارسال </Button>
              </div>
            </div>


        </StateView>
          </Card>
      </>
    );
  }
}

export default withRouter(ConversationBox);
