import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import StateView from "../UI/StateView/StateView";
import {withRouter} from 'next/router';
import TicketPres from "../../mobx/presenters/TicketPres";
import {Avatar, Spin, Input, Button, Empty} from "antd";
import NewEditor from "../Editor/NewEditor";

const {TextArea} = Input;

@inject("CoreStore")
@observer
class TicketView extends Component {

  constructor(props) {
    super(props);
    this.store = new TicketPres()
  }

  state = {
    text: ''
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.store.getTicketView({ticket_id: this.props.router.query.status})
  }


  sendTicket = () => {
    const data = {}
    data.message = this.state.text
    data.ticket_id = this.store.ticketView.id
    data.file = this.store.file
    this.store.getReplyTicket(data, this._callBack)
  }

  _callBack = () => {
    this.setState({value: ''})
    this.store.file = ""
    document.getElementById("replyBox").style.display = "none"
  }

  hiddenBox = () => {
    const display = document.getElementById("replyBox").style.display
    display === "" || display === "none" ?
      document.getElementById("replyBox").style.display = "flex" :
      document.getElementById("replyBox").style.display = "none"

  }

  downloadFile = (model) => {
    console.log(model.message)
    model.getFileTicket({id: this.store.ticketView.id})
  }

  render() {
    const {ticketView} = this.store
    return (
      <div className={""}>
        <StateView state={this.store.stateView} errorButtonAction={this._getData}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center ">
              <h6 className={"mb-0 mx-2"}>موضوع:</h6>
              <span>{ticketView.subject}</span>
            </div>
            <div className="d-flex align-items-center ">
              <h6 className={"mb-0 mx-2"}>تاریخ:</h6>
              <span>{ticketView.created_at}</span>
            </div>
          </div>
          <hr/>
          <div className="custom-th py-2 mb-4 px-3 ">
            <div onClick={this.hiddenBox} className="cursor d-flex align-items-center">

              <img src={"/static/images/edit.svg"} width={20}/>
              <div className="mx-2">
                <span className={"white-title"}>پاسخ:</span>
              </div>

            </div>
            <div id={'replyBox'} className="align-items-end flex-column  my-3">
              <div className="w-100">
                <NewEditor content_text={this.state}/>
                {/*<TextArea rows={3} placeholder={'پیام خود را بنویسید'} value={this.state.value}*/}
                {/*          onChange={e => this.setState({value: e.target.value})}/>*/}
              </div>
              <div className=" w-100 d-flex align-items-center justify-content-between mt-3 ">

                {this._uploadBox()}


                <Button loading={this.store.loading} onClick={this.sendTicket} type={"primary"}
                        className={"login-btn"}>ارسال تیکت</Button>

              </div>

            </div>
            {this.store.file && <div className={"d-flex "}>


              <div className="d-flex align-items-center my-2">
                <img className={"mx-2 cursor"} src={"/static/images/x.svg"} width={14}
                     onClick={this.handleDeleteUploadFile}/>

                <h6 className={"text-success my-2 d-flex justify-content-center"}>فایل شما با موفقیت آپلود شد</h6>
              </div>

            </div>}

            {this.store.errMsg && <div className="d-flex ">
              <span className={"err-title"}>{this.store.errMsg}</span>
            </div>}
          </div>

          <div className="">


            {ticketView.replies ? ticketView.replies.map((reply, index) => {

              return <div key={index} className="bg-white p-3 my-3 radius">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <Avatar src={"/static/images/user.svg"} size={45}/>
                    <div className="d-flex flex-column mx-2 ">
                    <span className="">{reply.user.name + " " + reply.user.family}</span>
                      <span className="text-muted">{reply.add_by === "admin" ? 'ناظر':'کاربر'}</span>
                    </div>
                  </div>
                  <span className="">{reply.created_at}</span>
                </div>
                <hr/>
                <div className="d-flex flex-column">
                  <div dangerouslySetInnerHTML={{__html:reply.message}}></div>
                  {/*{reply.message}*/}
                  <div className="m-2">
                    {reply.file &&
                    <Button type={"primary"} className={"radius"} loading={reply.loading}
                            onClick={() => this.downloadFile(reply)}>
                      {/*<img src={"/static/images/download.svg"} width={18}/>*/}
                      <span className={"mx-1"}>دانلود فایل</span>
                    </Button>}
                  </div>
                </div>
              </div>
            }) : <Empty/>}


            <div className="bg-white p-3 my-3 radius">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Avatar src={"/static/images/user.svg"} size={45}/>
                  <div className="d-flex flex-column mx-2">
                  <span className="">{ticketView.user.name + " " + ticketView.user.family}</span>
                  <span className="text-muted">{ticketView.add_by === "admin" ? 'ناظر':'کاربر'}</span>
                  </div>
                </div>
                <span className="">{ticketView.created_at}</span>
              </div>
              <hr/>
              <div className="d-flex flex-column">
                <div dangerouslySetInnerHTML={{__html:ticketView.message}}></div>
                {/*{ticketView.message}*/}
                <div className="m-2">
                  {ticketView.file &&
                  <Button type={"primary"} className={"radius "} loading={ticketView.loading}
                          onClick={() => this.downloadFile(ticketView)}>
                    {/*<img src={"/static/images/download.svg"} width={18}/>*/}
                    <span className={"mx-1"}>دانلود فایل</span>
                  </Button>}
                </div>
              </div>
            </div>

          </div>


        </StateView>
      </div>
    );
  }

  

  handleUpload = (e) => {
    this.store.errMsg = ""
    const formData = new FormData()
    formData.append('file', e.target.files[0]);
    this.store.getUploadTicket(formData, this.CallBackUpload)
  }

  CallBackUpload = (data) => {
    console.log(data)
  }

  handleDeleteUploadFile = () => {
    this.store.file = ""
  }

  _uploadBox = () => {
    return (<div className={"w-100 "}>

      <div className="d-flex w-25">
        <div className="uploadReply">
          <input className="file-reply" type='file' onChange={this.handleUpload}/>
          <div className="drag-text">
            <span>انتخاب فایل</span>
          </div>
        </div>
      </div>


      <Spin size="large" spinning={this.store.uploadLoad} tip={"در حال آپلود"}/>


    </div>)
  }

}

export default withRouter(TicketView);