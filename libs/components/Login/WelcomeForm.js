import React, {Component} from 'react';
import {Alert,Input, Button, message} from "antd"
import {observer} from "mobx-react";
import validator from 'validator';
import {withTranslation} from "react-i18next";
import Login from "../../../pages/login";

@observer
class WelcomeForm extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  _handleUserType = () => {
    const data = {}
    data.username = this.props.store.username
    console.log(data.username)
    if (data.username.length > 10 || validator.isEmail(data.username)) {
      this.props.store.validate(data, this._callBackValidate)
    } else {
      this.props.store.errors = this.props.t("login.login-username")
    }

  }

  _callBackValidate = (e, type) => {
    if (type === "login") {
      this.props.store.WelcomeVisibility = false
      this.props.store.LoginVisibility = true
      this.props.store.RegisterVisibility = false
    } else {
      message.success(e);
      this.props.store.WelcomeVisibility = false
      this.props.store.LoginVisibility = false
      this.props.store.RegisterVisibility = true
    }
  }

  _handleType = (e) => {
    this.props.store.errors = ""
    this.props.store.username = e.target.value
  }

  render() {
    const {t} = this.props;

    return (<div className={"w-100 d-flex flex-column mx-auto "}>
      <div className="py-4 mb-1 text-center ">
        <span className={" pink-title "}>{t("login.login-title")}</span>
      </div>
      <div className="pt-2 text-center ">
        <span className={"sub-title-gray"}>{t("login.login-username")}</span>
      </div>
      <div className=" my-1 mb-1 mx-auto  w-100 text-center  ">
        <Input className={"welcome-input "}
               onChange={this._handleType} onPressEnter={this._handleUserType}/>
      </div>
      {this.props.store.errors && <span className={"err-title py-1 mx-auto"}>{this.props.store.errors}</span>}
      <Button className={"login-btn mx-auto my-1 w-75 "} loading={this.props.store.loading}
              onClick={this._handleUserType}>{t("btn.welcome")}</Button>
    </div>)
  }
}

export default withTranslation('common')(WelcomeForm)