import React, {Component} from 'react';
import {observer} from "mobx-react";
import {message, Modal, Input, Button, Form} from "antd";
import {withTranslation} from "react-i18next";
import LoginPres from "../libs/mobx/presenters/LoginPres";
import FormBuilder from 'antd-form-builder';
import Cookies from 'js-cookie';
import WelcomeForm from "../libs/components/Login/WelcomeForm";
import LoginForm from "../libs/components/Login/LoginForm";
import RegisterForm from "../libs/components/Login/RegisterForm";
import ForgotForm from "../libs/components/Login/ForgotForm";
import {withRouter} from 'next/router'
import Head from "next/head";

@observer
class Password extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.store = new LoginPres();
  }

  _handleChangePassword = (e) => {
    const data = {};
    data.email = this.props.router.query.email
    data.token = this.props.router.query.token;
    data.password = e.password;
    data.password_confirmation = e.confirmPassword;
    this.store.changePasswordByEmail(data)
  }

  render() {
    const {t} = this.props;
    const {forgotVisibility} = this.store;
    const meta = {
      columns: 4,
      formItemLayout: null,
      fields: [
        {
          key: 'password', placeholder: t("form.password"), widget: 'password', onChange: () => {
            if (this.formRef.current.isFieldTouched('confirmPassword')) {
              this.formRef.current.validateFields(['confirmPassword'])
            }
          }, required: true, colSpan: 4, message: t('form.required-password')
        },
        {
          key: 'confirmPassword', placeholder: t("form.passwordVerify"), widget: 'password', required: true, rules: [
            {
              validator: (rule, value, callback) => {
                return new Promise((resolve, reject) => {
                  if (value !== this.formRef.current.getFieldValue('password')) {
                    reject(new Error(t('form.valid-password')))
                  } else {
                    resolve()
                  }
                })
              },
            },
          ], colSpan: 4, message: t('form.valid-password')
        },
      ]
    }
    return (<>
        <Head><title>رمز عبور</title></Head>
      <div className={"bg-gray p-5 "} style={{width: "100%", minHeight: "100vh"}}>

        <div className="mx-auto " style={{width: "400px"}}>
          <div
            className="d-flex flex-column bg-white my-4 p-3 radius w-100 shadow ">
            <div className="row align-items-center my-2 justify-content-center ">
              <img src={"/static/images/logo.svg"} width={60}/>
            </div>

            <div className="pb-2 text-center ">
              <span className={"titr-title "}>{t("login.welcome")}</span>
            </div>

            {this.props.router.query.status === "ok" ?
              <div className={"pt-4 position-relative"}>
                <div className={"mb-3 text-center "}>
                  <span className={"pink-title"}>{t("login.change-password")}</span>
                </div>

                <div className="w-75 mx-auto ">
                  <Form ref={this.formRef} layout="vertical" onFinish={this._handleChangePassword}
                        onValuesChange={() => this.forceUpdate()}>
                    <FormBuilder meta={meta} form={this.formRef}/>
                    <div className="d-flex align-items-center">
                      <Button loading={this.store.loading} onClick={() => this.formRef.current.submit()}
                              className={"login-btn mx-auto w-100"}>{t("btn.changePassword")}</Button>
                    </div>
                  </Form>
                </div>

              </div>
              :
              <span className={"text-center my-4 "}>اطلاعات وارد شده صحیح نیست!</span>
            }


            <div className="border-top text-center my-2 py-2 ">
              <span className={"sub-title-gray "}>{t("login.lotus-Slogan")}</span>
            </div>
          </div>
        </div>

      </div>
      </>
    );
  }
}


export default withTranslation('common')(withRouter(Password))