import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import {Divider, InputNumber, Table, Tabs, Button, Form} from "antd";
import FormBuilder from 'antd-form-builder'

import StateView from "../../../libs/components/UI/StateView/StateView";
import Head from "next/head";
import WalletPres from "../../mobx/presenters/WalletPres";
import Forbidden from "../UI/Forbidden";


const {TabPane} = Tabs;

@inject("CoreStore")
@observer
class CheckOut extends Component {

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
    this.store.getCheckOutList()
  }

  _renderBtnStatus = (status) => {
    switch (status) {

      case "pending" :
        return <span className={"doing-orderBtn     "}>در حال بررسی</span>
      case "payment" :
        return <span className={"paid-orderBtn"}>واریز شده</span>
      case "canceled" :
        return <span className={"error-orderBtn  "}>لغو شده</span>
      case "confirm" :
        return <span className={"select-orderBtn"}>در انتظار واریز</span>
    }
  }


  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }


  handleNextPage = (page) => {
    this.store.getCheckOutList({page})
  }

  _renderFinanceList = () => {

    const dataSource = this.store.checkOutList.items
    const columns = [
      {
        title: 'تاریخ درخواست',
        dataIndex: 'created_at',
        align: "center"
      },
      {
        title: 'تاریخ برداشت',
        dataIndex: 'deposited_at',
        align: "center",
        render: (deposited_at) => deposited_at ? deposited_at : '---'
      },
      {
        title: 'مبلغ',
        dataIndex: 'amount',
        align: "center",
        render: (amount) => (<span>{this.formatNumber(amount)} تومان </span>)

      },
      {
        title: 'کد پیگیری',
        dataIndex: 'response_code',
        align: "center",
        render: (response_code) => response_code ? response_code : '---'
      },
      {
        title: 'بانک',
        dataIndex: 'bank_name',
        align: "center",
        render: (bank_name) => bank_name ? bank_name : '---'
      },
      {
        title: 'وضعیت',
        dataIndex: 'status',
        align: "center",
        render: (status) => this._renderBtnStatus(status)
      },

    ];
    return (<>

      <Table dataSource={dataSource} columns={columns}
             pagination={{
               position: ["bottomCenter"],
               page: this.store.checkOutList.page,
               hideOnSinglePage: true,
               current: this.store.checkOutList.page,
               total: this.store.checkOutList.total,
               pageSize: this.store.checkOutList.pagesize,
               onChange: this.handleNextPage
             }}/>

    </>)
  }


  handleCheckOut = () => {
    if (!this.store.amount) {
      return this.store.errMsg = "لطفا مبلغ مورد نظر خود را وارد کنید"
    }
    if (this.store.amount > this.store.checkOutList.wallet) {
      return this.store.errMsg = "مبلغ مورد نظر شما بیشتر از موجودی می باشد!"
    } else {
      this.store.getCheckOutOrder({amount: this.store.amount}, this.pushList)
    }
  }

  pushList = (item) => {
    this.store.amount = ""
    this.store.checkOutList.items.push(item)
  }

  handleAmount = (e) => {
    this.store.amount = e
    this.store.errMsg = ""
  }

  _renderCheckOut = () => {
    return (<div className={"mt-5"}>
      <div className="d-flex justify-content-center my-4">
        <div className="mx-2">
          <h5 className={"title-page amount-title"}>موجودی شما:</h5>
        </div>
        <div className="mx-2">
          <h5 className={"title-page amount-title"}>{this.formatNumber(this.store.checkOutList.wallet)} تومان </h5>
        </div>
      </div>
      <div className="row">
        <div className="col-10">
          <InputNumber
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            onChange={this.handleAmount}
            className={""}
            value={this.store.amount}/>
          <div className="p-3">
            <span className={"err-title "}>{this.store.errMsg}</span>
          </div>
        </div>
        <div className="col-2">
          <div className="d-flex justify-content-end">
            <Button className="login-btn" loading={this.store.loading} onClick={this.handleCheckOut}>تسویه حساب</Button>
          </div>
        </div>
      </div>

    </div>)
  }

  render() {


    return (
      <>
        <Head>
          <title>تسویه حساب</title>
        </Head>
        <div className="user-panel radius">
          <div className="my-3">
            <h3 className={"title-page"}>تسویه حساب</h3>
            <hr/>
          </div>
          <div className="user-workSpace radius ">
            <StateView state={this.store.stateView} errorButtonAction={this._getData}>

              {this.store.certificate ? <Forbidden/>: <>
                {this._renderCheckOut()}
                {this._renderFinanceList()}
              </>}
            </StateView>
          </div>
        </div>
      </>
    );
  }

}

export default CheckOut;