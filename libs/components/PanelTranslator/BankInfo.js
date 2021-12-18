import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import {Empty, InputNumber, Table, Tabs, Button, Form} from "antd";
import FormBuilder from 'antd-form-builder'
import StateView from "../../../libs/components/UI/StateView/StateView";
import Head from "next/head";
import WalletPres from "../../mobx/presenters/WalletPres";
import Forbidden from "../UI/Forbidden";

const {TabPane} = Tabs;

@inject("CoreStore")
@observer
class BankInfo extends Component {

  constructor(props) {
    super(props);
    this.store = new WalletPres();
    this.formRef = React.createRef();
  }

  state = {
    pay: "",
    payment: "",
    edit: true,
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.store.getBankInfo()
  }


  _handleUpdateInfo = (data) => {

    if (this.store.bankInfo.bank_name) {
      this.store.getBankInfoUpdate(data, this.callBack)
    } else {
      this.store.getBankInfoCreate(data, this.callBack)
    }
  }


  callBack = () => {
    this.setState({edit: true})
  }


  _renderButtonTitle = () => {
    if(!this.store.bankInfo.bank_name){return <span>افزودن اطلاعات بانکی</span>}else {
      if(this.state.edit){return <span>اصلاح اطلاعات بانکی</span>}else{return <span>لغو</span>}
    }

  }


  _renderBankInfo = () => {

    const options = [
      {value: "بانک ملّی ", label: 'بانک ملّی '},
      {value: "بانک سپه ", label: 'بانک سپه '},
      {value: "بانک صنعت و معدن ", label: 'بانک صنعت و معدن '},
      {value: "بانک کشاورزی ", label: 'بانک کشاورزی '},
      {value: "بانک مسکن ", label: 'بانک مسکن '},
      {value: "بانک توسعه تعاون ", label: 'بانک توسعه تعاون '},
      {value: "بانک اقتصاد نوین ", label: 'بانک اقتصاد نوین '},
      {value: "بانک کارآفرین ", label: 'بانک پارسیان '},
      {value: "بانک سامان ", label: 'بانک سامان '},
      {value: "بانک شهر ", label: 'بانک شهر '},
      {value: "بانک دی ", label: 'بانک دی '},
      {value: "بانک صادرات ", label: 'بانک صادرات'},
      {value: "بانک تجارت ", label: 'بانک تجارت'},
      {value: "بانک رفاه ", label: 'بانک رفاه'},
      {value: "بانک پاسارگاد ", label: 'بانک پاسارگاد'},
    ]

    const meta = {
      formItemLayout: null,
      initialValues: this.store.bankInfo,
      fields: [
        {
          key: 'bank_name',
          label: "بانک",
          required: true,
          widget: 'select',
          options,
          placeholder: "بانک خود را انتخاب کنید"
        },
        {
          key: 'bank_account_owner',
          label: "نام و نام خانوادگی صاحب حساب",
          placeholder: "نام و نام خانوادگی صاحب حساب",
          required: true,
        }
        ,
        {key: 'bank_card_number', label: "شماره کارت", placeholder: "شماره کارت", required: true},
        {
          key: 'bank_sheba',
          label: "شماره شبا",
          placeholder: "شماره شبا",
          required: true,
          widgetProps: {suffix: "IR"}
        },
      ]
    }

    return (<>
      <div className="">
        <div className="d-flex align-items-center justify-content-end my-3">
          {this.store.bankInfo.bank_name && <div className="">
            <Button className={"btn-primary radius"} onClick={e => this.setState({edit: !this.state.edit})}>{this._renderButtonTitle()}</Button>
          </div>}
        </div>

        {(!this.store.bankInfo.bank_name && this.state.edit) &&
          <Empty description={
            <span>
          هیچ داده ای موجود نمیباشد، لطفا اطلاعات حساب بانکی خود را وارد کنید!
          </span>
          }>
            <Button className={"btn-primary radius"}
                    onClick={e => this.setState({edit: !this.state.edit})}>{this._renderButtonTitle()}</Button>
          </Empty> }

          <Form
            className={"w-50"}
            ref={this.formRef}
            layout={!this.state.edit ? "vertical" : null}
            onFinish={this._handleUpdateInfo}
          >
            {!this.state.edit ?
              <FormBuilder meta={meta} form={this.formRef}/>
              : <FormBuilder meta={meta} viewMode={true}/>}
            {!this.state.edit && <Button loading={this.store.loading} onClick={() => this.formRef.current.submit()}
                                         className={"login-btn mx-auto w-100"}>اصلاح</Button>}
          </Form>


      </div>
    </>)
  }


  render() {


    return (
      <>
        <Head>
          <title>اطلاعات حساب</title>
        </Head>
        <div className="user-panel radius">
          <div className="my-3">
            <h3 className={"title-page"}>اطلاعات حساب</h3>
            <hr/>
          </div>
          <div className="user-workSpace radius ">
            <StateView state={this.store.stateView} errorButtonAction={this._getData}>
              {this.store.certificate ? <Forbidden/>: this._renderBankInfo()}
            </StateView>
          </div>
        </div>
      </>
    );
  }

}

export default BankInfo;