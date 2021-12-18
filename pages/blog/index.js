import React, {Component} from 'react';
import {observer} from "mobx-react";
import Layout from "../../libs/components/UI/Layout";
import BlogSearch from "../../libs/components/Blog/BlogSearch";
import BlogPres from "../../libs/mobx/presenters/BlogPres";
import StateView from "../../libs/components/UI/StateView/StateView";
import {Card,Pagination, Empty} from "antd"
import Head from "next/head";
import BlogHome from "../../libs/components/Blog/BlogHome/BlogHome";

@observer
class Blog extends Component {

  constructor(props) {
    super(props);
    this.store = new BlogPres()
    this.props.data && this.store.setPostList(props.data)
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.store.getCategoryList()
    !this.props.data && this.store.getPostsList()
  }


  nextPage = (e) => {
    this.store.getPostsList({page: e})
  }

  render() {
    const {page, pageSize, total, stateView, postsList} = this.store


    return (
      <>
        <Head><title>وبلاگ</title></Head>
        <Layout>
          <div className="container">
            <Card title={<h3>وبلاگ</h3>} className={"my-3 radius"}>
            <BlogSearch store={this.store}/>
            <StateView state={stateView} errorButtonAction={this._getData}>
              <div className="row my-4">
                {postsList.length > 0 ? postsList.map((item, index) => {
                  return <div className="col-10 col-md-3 my-3" key={index}>
                    <BlogHome item={item}/>
                  </div>
                }) : <div className={"d-flex justify-content-center w-100"}><Empty/></div>}
              </div>

              <div className="row justify-content-center my-4">
                <Pagination hideOnSinglePage pageSize={pageSize} current={page} total={total} onChange={this.nextPage}/>
              </div>
            </StateView>
            </Card>
          </div>
        </Layout>
      </>
    );
  }
}

export default Blog;


export async function getServerSideProps() {
  let pres = new BlogPres();
  await pres.getPostsList();
  return {props: {data: pres.rowData}}
}