import React, {Component} from 'react';
import {observer} from "mobx-react";
import Layout from "../../libs/components/UI/Layout";
import Head from "next/head";
import Router from 'next/router';

@observer
class Select extends Component {
  render() {
    return (
      <>
        <Head>
          <title>ثبت سفارش</title>
        </Head>
        <Layout>
          <div className="container">
            <div className="user-panel mt-3 mb-5 radius">
              <h1 className={"h5"}>ثبت سفارش در لوتوس نویسه</h1>
              <hr/>
              <h2 className={"h6 text-muted"}>لوتوس نویسه علاوه بر دارا بودن امکان ترجمه متن و مقاله و ... امکان تایپ محتوی شما را نیز دارد.</h2>
              <h2 className={"h6 text-muted"}>لطفا نوع سفارش خود را تعیین کنید.</h2>
              <div className="row justify-content-center my-5">
                <div className="col-12 col-md-3">
                  <div className="category-box  p-3 m-1" onClick={()=>Router.push("/order")} >
                    <img className="mx-auto " src={"/static/images/Translate.svg"} width="70"/>
                    <span className="mt-4 titr-title">ثبت سفارش ترجمه</span>
                  </div>
                </div>
                <div className="col-12 col-md-3">
                  <div className="category-box  p-3 m-1" onClick={()=>Router.push("/order")} >
                    <img className="mx-auto " src={"/static/images/type.svg"} width="70"/>
                    <span className="mt-4 titr-title">ثبت سفارش تایپ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

export default Select;
