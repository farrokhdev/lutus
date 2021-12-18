import React, {Component} from 'react';
import {Comment, Avatar} from 'antd';

class CommentBox extends Component {
  render() {
    const {comment}=this.props
    return (
      <>
        <div className="d-flex flex-column border radius m-0 p-3 my-5">

          <div className="d-flex  justify-content-between align-items-center mx-2">
            <div className="d-flex align-items-center">
              <Avatar src={"/static/images/man.png"}/>
              <span className={"px-2"}>{comment.author_name}</span>
            </div>
            <span>{comment.created_at_fa}</span>
          </div>
          <div className="p-3">
            <span >{comment.comment}</span>
          </div>
          {comment.replies && comment.replies.map((reply,index)=>{
          return <div key={index} className="row mx-4 border-top p-3 align-items-center ">
            <img src={"/static/images/reply.png"} height={20}/>
            <Avatar src={"/static/images/admin.svg"} className={'mx-3'}/>
            <span>{reply.comment}</span>
          </div>})}
        </div>
      </>
    );
  }
}

export default CommentBox;