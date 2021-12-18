import React, {Component} from 'react';
import {Select, Input, Button} from 'antd';
import {observer} from "mobx-react";
import BlogPres from "../../../mobx/presenters/BlogPres";

@observer
class BlogSearch extends Component {


  state={
    category:"",
    subject:"",
  }

  onChangeCategory=(e)=>{
    this.setState({category:e})
  }
  onChangeSubject=(e)=>{

    this.setState({subject:e.target.value})
  }
  handleSearchBTn=()=>{
    const data={}
    data.search=this.state.subject
    data.category_id=this.state.category
    this.props.store.getPostsList(data)
  }

  render() {
    const categoryList=this.props.store.categoryList.map(item=>{return{label:item.title,value:item.id}})
    const options = [{label:"تمام موضوع ها",value: ""},...categoryList]
    return (
      <>
        <div className="Blog-Search   mx-0   ">
          <div className="col-3">
            <Select placeholder={"موضوع خود را انتخاب کنید"} options={options} className={"d-flex align-items-center w-100"}
            onChange={this.onChangeCategory}/>
          </div>
          <div className="col-6">
            <Input placeholder={"جست وجو در وبلاگ"} onChange={this.onChangeSubject}/>
          </div>
          <div className="col-3">
            <Button onClick={this.handleSearchBTn} className="login-btn w-100">جست و جو</Button>
          </div>
        </div>
      </>
    );
  }
}

export default BlogSearch;