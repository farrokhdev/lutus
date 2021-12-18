import React, {Component} from 'react';
import {observer} from "mobx-react";
import Layout from "../../libs/components/UI/Layout";
import BlogPres from "../../libs/mobx/presenters/BlogPres";
import {withRouter} from 'next/router';
import StateView from "../../libs/components/UI/StateView/StateView";
import SendComment from "../../libs/components/Blog/Comment/SendComment";
import CommentBox from "../../libs/components/Blog/Comment/Comment";
import Head from 'next/head'
import {ClockCircleOutlined, UserOutlined,FolderOutlined} from '@ant-design/icons';

@observer
class Id extends Component {

  constructor(props) {
    super(props);
    this.store = new BlogPres();
    this.props.data && this.store.setPost(props.data)
    this.props.commentData && this.store.setCommentList(props.commentData)
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    if (window) {
      window.scroll({top: 0, behavior: "smooth"})
    }
    !this.props.data && this.store.getPostView({id: this.props.router.query.id})
    !this.props.commentData && this.store.getCommentList({post_id: this.props.router.query.id})
  }

  render() {
    const {postView, commentList} = this.store
    return (
      <>
        <Head>
          <title>{postView.title}</title>
          <meta name="viewport" content={postView.meta_description}/>
          <meta name="viewport" content={postView.meta_keywords}/>
          <meta name="viewport" content={postView.meta_title}/>
        </Head>
        <Layout>
          <StateView state={this.store.stateView} errorButtonAction={this._getData}>
            <div className="container  ">
              <div className="row justify-content-center ">
                <div className="user-panel radius col-8 mt-3 mb-5">
                  <div className="d-flex flex-column ">

                    <div className="d-flex flex-column pb-4 ">
                      <div className="d-flex mb-2">
                        <h1 className={"h5"}>{postView.title}</h1>
                      </div>
                      <div className="d-flex  align-items-center  ">
                        <div className="px-2 d-flex align-items-center">
                          <ClockCircleOutlined/>
                          <span className={"text-muted pr-2"}>{postView.created_at_fa}</span>
                        </div>
                        <div className="px-2 d-flex align-items-center">
                          <UserOutlined/>
                          <span className={"text-muted  pr-2"}>{postView.author.name + " " + postView.author.family}</span>
                        </div>
                        {postView.categories.length > 0 &&<div className="px-2 d-flex  align-items-center border-right ">
                        <FolderOutlined />
                        <span className={"text-muted px-2 "}>{postView.categories[0].title}</span>
                        </div>}
                      </div>

                    </div>

                    <div className="d-flex justify-content-center pb-4">
                      <img className={"mx-auto radius img-fluid "} src={postView.image}/>
                    </div>
                    <span>{postView.content}</span>
                  </div>
                  {commentList.length>0&& <div className={"border-bottom mt-4 "}>
                    <h5 className={"titr-page"} >نظرات</h5>
                  </div>}
                  {commentList.map((comment, index) => {
                    return <CommentBox key={index} comment={comment}/>
                  })}

                  <SendComment store={this.store}/>
                </div>
              </div>
            </div>
          </StateView>
        </Layout>
      </>
    );
  }
}

export default withRouter(Id);

export async function getServerSideProps({query}) {
  let pres = new BlogPres()
  await pres.getPostView({id: query.id})
  await pres.getCommentList({id: query.id})
  return {props: {data: pres.rowData, commentData: pres.commentData}}

}