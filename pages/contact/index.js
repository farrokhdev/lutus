import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Divider, Input, Button} from "antd";
import Layout from "../../libs/components/UI/Layout";
import Head from "next/head";

const {TextArea} = Input;

@observer
class Contact extends Component {
  render() {

    return (
      <>
        <Head>
          <title>ارتباط با ما</title>
        </Head>
        <Layout>
          <div className="container">

            <div className="user-panel radius my-3 mb-4 ">
              <h1 className={"h5"}>ارتباط با ما</h1>
              <hr/>
              <div className="row">
                <div className="col-12 col-md-7"><div className=" mx-auto d-flex justify-content-center flex-column">

                  <div className="my-2 flex-column d-flex">
                    <span className="titr-title">آدرس ما:</span>
                    <span className="text-muted">  تهران -تهران - تهران </span>
                  </div>

                  <div className="my-2 flex-column d-flex">
                    <span className="titr-title">تلفن:</span>
                    <span className="text-muted">  021 10203040 [ شنبه تا چهارشنبه 9 تا 18 و پنجشنبه 9 تا 13 ] </span>
                  </div>

                  <div className="my-2 flex-column d-flex">
                    <span className="titr-title">موبایل:</span>
                    <span className="text-muted">  09385440212 [ فقط برای پاسخگویی تلفنی در این لحظه ] </span>
                  </div>

                  <div className="my-2 flex-column d-flex">
                    <span className="titr-title">ایمیل:</span>
                    <span className="text-muted"> lotus@info.com </span>
                  </div>


                  <div className="my-2">
                <span
                  className="text-muted">تیم پشتیبانی لوتوس نویسه همه روزه از ساعت 9 تا 23 پاسخگوی پیام ها می باشد</span>
                  </div>
                </div></div>
                <div className="col-12 col-md-5"><div className=" mx-auto d-flex justify-content-center flex-column">
                  <div className="mb-3">
                    <span className={"titr-title"}>این فرم جهت ثبت درخواست شما فراهم شده و فقط توسط کارشناسان تیم باما قابل مشاهده است. </span>
                  </div>
                  <div className="mb-3 w-100">
                    <Input placeholder={"نام و نام خانوادگی"}/></div>
                  <div className="my-3 w-100">
                    <Input placeholder={"ایمیل"}/></div>
                  <div className="my-3 w-100">
                    <Input placeholder={"موبایل"}/></div>
                  <div className="my-3 w-100">
                    <TextArea rows={4} placeholder={"متن خود را بنویسید..."}/></div>
                  <div className="w-25 my-3">
                    <Button className={"login-btn w-100"}>ارسال</Button>
                  </div>

                </div></div>
              </div>

            </div>

          </div>
        </Layout>
      </>
    );
  }
}

export default Contact;