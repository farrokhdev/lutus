import React, {Component} from 'react';
import {observer} from "mobx-react"
import {message,Input, Button} from "antd"
import validator from "validator";

const {TextArea} = Input;

@observer
class SendComment extends Component {

  state = {
    name: '',
    email: '',
    comment: '',
    errors: '',
  }

  handleNameInput = (e) => {
    this.setState({name: e.target.value, errors: {name: ''}})
  }

  handleEmailInput = (e) => {
    this.setState({email: e.target.value, errors: {email: ''}})
  }

  handleCommentInput = (e) => {
    this.setState({comment: e.target.value})
  }

  sendComment = () => {
    const data = {}
    data.author_name = this.state.name
    data.author_email = this.state.email
    data.author_website = this.state.web
    data.comment = this.state.comment
    data.post_id = this.props.store.postView.id


    if (!this.state.name.length > 0) {
      this.setState({errors: {name: "نام خود را وارد کنید"}})
      return;
    }
    if (!this.state.email.length > 0 ) {
      this.setState({errors: {email: "ایمیل خود را وارد کنید"}})
      return
    }
    if (!validator.isEmail(this.state.email)) {
      this.setState({errors: {email: "ایمیل خود را وارد کنید"}})
      return
    }
    if (!this.state.comment.length > 0) {
      this.setState({errors: {comment: "دیدگاه خود را وارد کنید"}})
      return;
    }

    this.props.store.addCommentBlog(data,this._callBack)

  }

  _callBack=()=>{
    this.setState({name:"",email:"",web:"",comment:"",errors:''})
    message.success("دیدگاه شما با موفقیت ثبت شد، پس از تایید ادمین منتشر میشود")
  }

  render() {
    return (
      <>
        <div className="sendComment-box radius p-4 mt-4 mb-2">
          <div className="row">
            <div className="col-6">
              <Input placeholder={"نام خود را وارد کنید"} onChange={this.handleNameInput} value={this.state.name}/>
              {this.state.errors.name && <span className={"err-title"}>{this.state.errors.name}</span>}
            </div>
            <div className="col-6">
              <Input placeholder={"ایمیل خود را وارد کنید"} onChange={this.handleEmailInput}  value={this.state.email}/>
              {this.state.errors.email && <span className={"err-title"}>{this.state.errors.email}</span>}
            </div>
            <div className="col-12 pt-3">
              <TextArea rows={10} placeholder={"دیدگاه خود را وارد کنید"} onChange={this.handleCommentInput}  value={this.state.comment}/>
              {this.state.errors.comment && <span className={"err-title"}>{this.state.errors.comment}</span>}
              <Button className={"login-btn mt-3 w-100"} onClick={this.sendComment} loading={this.props.store.loading}>ارسال
                دیدگاه</Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SendComment;