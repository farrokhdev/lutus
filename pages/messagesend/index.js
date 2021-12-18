import React, {Component} from 'react';
import {observer} from "mobx-react";
import Head from "next/head";
import {Button} from "antd";
import Link from "next/link";

@observer
class messagesend extends Component {
  render() {
    return <>
      <Head><title>لوتس نویسه</title></Head>
      <div className={"bg-gray p-5 "} style={{width: "100%", minHeight: "100vh"}}>
        <div className="mx-auto " style={{width: "400px"}}>
          <div className=" bg-white my-4 p-5 radius w-100 shadow ">
            <div className="d-flex justify-content-center flex-column text-center ">

              <img className={"mx-auto "} src={"/static/images/message.svg"} width={60}/>
              <span className="titr-title pt-3 "> ایمیل بازیابی ارسال شد!</span>
              <span className="pink-title py-3  ">لطفاً به صندوق الکترونیکی خود مراجعه کرده و بر روی لینک ارسال شده کلیک نمائید.</span>
              <Link href={"/"}><a>
                <Button className={"login-btn w-75 mx-auto "}>بازگشت به لوتوس نویسه</Button>
              </a></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  }
}

export default messagesend;