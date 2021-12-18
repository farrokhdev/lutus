import React, {Component} from 'react';
import {Spin, Input, Button, message} from "antd"
import {observer} from "mobx-react";
import Router, {withRouter} from 'next/router'
import {withTranslation} from "react-i18next";


@observer
class LoginForm extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  handleLogin = () => {

    if (this.props.store.password) {
      const data = {}
      data.username = this.props.store.username
      data.password = this.props.store.password
      this.props.store.Login(data, this.props._callBackLogin ? this.props._callBackLogin : () => {
      })
    } else {
      this.props.store.errors = this.props.t("login.login-password")
    }
  }

  _handleForgotForm = () => {
    this.props.store.LoginVisibility = false
    this.props.store.forgotVisibility = true

  }


  render() {
    const {t} = this.props;

    return (<div className={"d-flex flex-column w-100"}>
      <Spin spinning={this.props.store.forgotLoading} tip={"در حال ارسال"}>
        <div className="text-center mx-auto mb-2 py-4">
          <span className={" pink-title"}>{t("login.login-password")}</span>
        </div>
        <div className="mx-auto my-2 w-75 ">
          <span>شما با {this.props.store.username} وارد شده اید.</span>


        </div>
        <div className="mx-auto my-2 w-75 ">
          <Input className={" login-input"}
                 onPressEnter={this.handleLogin}
                 onChange={(e) => {
                   this.props.store.errors = ""
                   this.props.store.password = e.target.value
                 }} type={"password"}
                 placeholder={t("login.login-password")}/>
          {this.props.store.errors && <span className={"err-title py-1 mx-auto"}>{this.props.store.errors}</span>}
        </div>
        <div className="px-5 my-2 cursor " onClick={this._handleForgotForm}>

          <span className={"link-title text-center"}>{t("login.forgot")}</span>
        </div>
        <div className="px-5 my-2 cursor ">
          <span className={"link-title cursor"} onClick={this.props.handleReset}>اصلاح نام کاربری</span>
        </div>
        <div className="d-flex justify-content-between align-items-center mx-auto w-75">

          <Button className={"login-btn  mt-2 w-100 "} type={"primary"} loading={this.props.store.loading}
                  onClick={this.handleLogin}>{t("btn.login")}</Button>
        </div>
      </Spin>
    </div>)
  }
}

export default withTranslation('common')(withRouter(LoginForm))