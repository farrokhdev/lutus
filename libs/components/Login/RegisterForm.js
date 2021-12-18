import React, {Component} from 'react';
import {observer} from "mobx-react";
import {message, Form, Button} from "antd";
import {withTranslation} from "react-i18next";
import FormBuilder from 'antd-form-builder';

@observer
class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.countDown()
  }

  state = {
    seconds: 60
  }

  handleFinish = (data) => {
    data.mobile=this.props.store.username
    this.props.store.registerUser(data, this._callBack)
  }

  _callBack = () => {
    message.success(this.props.t("message.logged_in"));
    this.props._callBackLogin();
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
    this.setState({seconds: 60})
    setInterval(() => this.counter(), 500);
  }

  sendAgain = () => {
    this.props.store.resendCodeRegister({mobile: this.props.store.username}, this.countDown)
  }

  render() {
    const {t} = this.props;
    const meta = {
      columns: 4,
      formItemLayout: null,
      fields: [
        {
          key: 'active_code',
          required: true,
          placeholder: t("form.active_code"),
          colSpan: 4,
          message: t('form.required-active'),
          help: <span className={'err-title'}>{this.props.store.errors.code}</span>,
          widgetProps:{
            onChange:()=>{this.props.store.errors = ""}
          }
        },
        {key: 'name', placeholder: t("form.name"), required: true, colSpan: 2, message: t('form.required-name')},
        {
          key: 'family',
          placeholder: t("form.family"),
          required: true,
          colSpan: 2,
          message: t('form.required-family')
        },
        {
          key: 'email',
          placeholder: t("form.email"),
          colSpan: 4,
          required: true,
          message: t('form.required-email'),
          help: <span className={'err-title'}>{this.props.store.errors.email}</span>,
          widgetProps:{
            onChange:()=>{this.props.store.errors = ""}
          }
        },
        {
          key: 'password', placeholder: t("form.password"), widget: 'password', onChange: () => {
            if (this.formRef.current.isFieldTouched('confirmPassword')) {
              this.formRef.current.validateFields(['confirmPassword'])
            }
          }, required: true, colSpan: 2, message: t('form.required-password')
        },
        {
          key: 'password_confirmation',
          placeholder: t("form.passwordVerify"),
          widget: 'password',
          required: true,
          message: t('form.required-password'),
          rules: [
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
          ],
          colSpan: 2
        }
      ]
    }
    return <div className={"pt-2 position-relative "}>
      <div className={"mb-3 "}>
        <span className={"pink-title"}> حساب کاربری با شماره {this.props.store.username} وجود ندارد.</span>
        <br/>
        <span className={"pink-title"}> برای ساخت حساب جدید، کد تایید برای این شماره ارسال گردید. </span>
      </div>

      <Form
        ref={this.formRef}
        layout="vertical"
        onFinish={this.handleFinish}
        onValuesChange={() => this.forceUpdate()}
      >
        <FormBuilder meta={meta} form={this.formRef}/>

        <div className="d-flex align-items-center justify-content-between flex-column ">
          <Button onClick={() => this.formRef.current.submit()}
                  className={"radius login-btn w-100 "}>{t("btn.register")}</Button>
        </div>

        <div className="send-again">
          {this.state.seconds ?
            <span className={"px-2 "}>{this.state.seconds}</span> :
            <span onClick={this.sendAgain} className={"cursor text-primary   "}>{t("form.code-again")}</span>}
        </div>

      </Form>
    </div>

  }
}

export default withTranslation('common')(RegisterForm)