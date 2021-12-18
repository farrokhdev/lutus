import React, {Component} from 'react';
import {observer} from "mobx-react";
import {message, Input, Form, Button} from "antd";
import {withTranslation} from "react-i18next";
import FormBuilder from 'antd-form-builder';
import validator from 'validator';
import Router, {withRouter} from 'next/router'

@observer
class ForgotForm extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.countDown()
  }

  state = {
    ChangePassForm: false,
    seconds: 10,
    inputPart: true,
  }

  _handleChangePassword = (e) => {
    const data = {};
    data.mobile = this.props.store.username;
    data.token = this.props.store.token;
    data.password = e.password;
    data.password_confirmation = e.confirmPassword;
    this.props.store.changePasswordByMobile(data, this.callBackChangePassword)
  }
  callBackChangePassword = () => {
    this.props._callBackLogin && this.props._callBackLogin()
  }

  _handleActiveCode = (e) => {
    this.props.store.errors = ""
    if (e.target.value.length > 4) {
      const data = {};
      data.mobile = this.props.store.username;
      data.token = e.target.value;
      this.props.store.token = e.target.value
      this.props.store.verifyCodeForgot(data, this._callBack)
    }
  }

  _callBack = () => {
    this.setState({ChangePassForm: true})
  }

  counter = () => {
    const {seconds} = this.state
    if (seconds > 0) {
      setTimeout(() => this.setState({seconds: seconds - 1}), 500);
    } else {
      clearInterval(this.countDown)
    }

  }

  countDown = () => {
    this.setState({seconds: 10})
    setInterval(() => this.counter(), 500);
  }

  sendAgainCode = () => {
    this.props.store.resendCodeForgot({mobile: this.props.store.username}, this._callBackResend)
  }

  _callBackResend = () => {
    this.countDown();
  }

  _renderForgotPart = () => {
    const {t} = this.props
    const meta = {
      formItemLayout: null,
      fields: [
        {
          key: 'password', placeholder: t("form.password"), widget: 'password', onChange: () => {
            if (this.formRef.current.isFieldTouched('confirmPassword')) {
              this.formRef.current.validateFields(['confirmPassword'])
            }
          }, required: true, message: t('form.required-password')

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
          ], message: t('form.valid-password')
        },
      ]
    }
    return <div className={" position-relative"}>

      {!this.state.ChangePassForm && <>
        <div className={"mb-3 text-center"}>
          <span className={"pink-title"}>{t("form.enter-code")}</span>
        </div>
        <div className="d-flex justify-content-center py-2 w-75 mx-auto">
          <Input onChange={this._handleActiveCode} placeholder={t("form.enter-code")}
                 disabled={this.props.store.loading}/>
        </div>
      </>}

      <span className="text-danger px-2 ">{this.props.store.errors && this.props.store.errors}</span>
      <div className="d-flex justify-content-center w-100 ">

        {this.state.ChangePassForm &&
        <div className={"d-flex flex-column justify-content-center w-100"}>
          <div className={"mb-3 text-center"}>
            <span className={"pink-title"}>تعویض رمز عبور</span>
          </div>
          <Form ref={this.formRef} layout="vertical" className={"w-75 mx-auto"} onFinish={this._handleChangePassword}
                onValuesChange={() => this.forceUpdate()}>
            <FormBuilder meta={meta} form={this.formRef}/>
            <div className="d-flex align-items-center w-100 mx-auto ">
              <Button loading={this.props.store.loading} onClick={() => this.formRef.current.submit()}
                      className={"login-btn mx-auto w-100"}>{t("btn.changePassword")}</Button>
            </div>
          </Form>
        </div>}
          </div>
        {!this.state.ChangePassForm && <div className={'sendAgain-forgot'}>
        {this.state.seconds ?
          <span className={"px-2 "}>{this.state.seconds}</span> :
          <span className={"cursor text-primary "} onClick={this.sendAgainCode}>{t("form.code-again")}</span>
        }
          </div>}
          </div>
          }

          _renderInputPart = () => {
          const {t} = this.props
          return   <div className="d-flex flex-column text-center ">

          <div className="mb-2  py-4">
          <span className={"pink-title"}>درخواست بازیابی رمز عبور</span>
          </div>

          <div className="pt-2 text-center ">
          <span className={"sub-title-gray"}>{t("login.login-username")}</span>
          </div>
          <div className=" my-1 mb-1 mx-auto  w-75 ">
          <Input value={this.props.store.username} onChange={(e) => this.props.store.username = e.target.value}/>
          </div>

          <Button loading={this.props.store.forgotLoading} onClick={this._SendUsername} className={"login-btn w-75 mx-auto mt-3 "}>دریافت کد تایید</Button>

          </div>
        }

          _SendUsername=()=>{
          this.props.store.forgotPassword({username: this.props.store.username}, this._callBackForgot)
        }

          _callBackForgot = (msg) => {

          if (!validator.isEmail(this.props.store.username)) {
          message.success(msg)
          this.setState({inputPart:false})


        } else {
          Router.push('/messagesend')
        }
        }

          render() {

          return <>
        {this.state.inputPart ? this._renderInputPart() : this._renderForgotPart()}
          </>
        }

          }

          export default withTranslation('common')(withRouter(ForgotForm))