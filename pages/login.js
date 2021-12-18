import React, {Component} from 'react';
import {observer} from "mobx-react";
import {withTranslation} from "react-i18next";
import LoginPres from "../libs/mobx/presenters/LoginPres";
import WelcomeForm from "../libs/components/Login/WelcomeForm";
import LoginForm from "../libs/components/Login/LoginForm";
import RegisterForm from "../libs/components/Login/RegisterForm";
import ForgotForm from "../libs/components/Login/ForgotForm";
import Head from "next/head";
import Link from "next/link"
import {Spin} from "antd";
import { LoadingOutlined } from '@ant-design/icons';

@observer
class Login extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.store = new LoginPres();
  }

  handleReset = () => {
    this.store.LoginVisibility = false
    this.store.RegisterVisibility = false
    this.store.forgotVisibility = false
    this.store.WelcomeVisibility = true
  }


  render() {
    const {t} = this.props;
    const {RegisterVisibility, forgotVisibility, LoginVisibility, WelcomeVisibility, loadingVisibility} = this.store;

    return (<>
        <Head>
          <title>ورود به لوتوس نویسه</title>
        </Head>
        <div className={"bg-gray p-5 "} style={{width: "100%", minHeight: "100vh"}}>
          <div className="mx-auto " style={{width: "400px"}}>
            <div className="d-flex flex-column bg-white my-4 p-3 radius w-100 shadow ">

              <div className="">
                <Link href={"/"}><a>
                  <div className="row align-items-center mb-2 justify-content-center ">

                    <img src={"/static/images/logo.svg"} width={60}/>

                  </div>
                  <div className=" text-center ">
                    <span className={"titr-title "}>{t("login.welcome")}</span>
                  </div>
                </a></Link>
              </div>
              {!WelcomeVisibility && <div className="cursor back_arrow" onClick={() => this.handleReset()}>
                <img src={"/static/images/back_arrow.svg"} width={30}/>
              </div>}
              {WelcomeVisibility && <WelcomeForm store={this.store}/>}
              {LoginVisibility && <LoginForm store={this.store} handleReset={this.handleReset}/>}
              {RegisterVisibility && <RegisterForm store={this.store}/>}
              {forgotVisibility && <ForgotForm store={this.store}/>}
              {loadingVisibility && <div className={"d-flex justify-content-center my-3 "}>
                <Spin indicator={<LoadingOutlined />} tip={"در حال ورود"} size={"large"}/>
              </div>}

              <div className="border-top text-center mt-4 pt-2 ">
                <span className={"sub-title-gray "}>{t("login.lotus-Slogan")}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}


export default withTranslation('common')(Login)