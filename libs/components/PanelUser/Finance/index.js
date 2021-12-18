import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import {Divider, InputNumber, Table, Tabs, Button, Form} from "antd";
import FormBuilder from 'antd-form-builder'
import Layout from "../../../../libs/components/UI/Layout";
import PanelSideBar from "../../../../libs/components/PanelUser/PanelSideBar";
import WalletPres from "../../../../libs/mobx/presenters/WalletPres";
import StateView from "../../../../libs/components/UI/StateView/StateView";
import Head from "next/head";

const {TabPane} = Tabs;

@inject("CoreStore")
@observer
class Finance extends Component {

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
    this.store.getFinanceList()
    // this.store.getPaymentList()
    // this.store.getBankInfo()
  }

  _renderBtnStatus = (status) => {
    switch (status) {

      case "withdraw" :
        return <span className={"error-orderBtn radius orderBtn "}>برداشت</span>
      case "deposit" :
        return <span className={"doing-orderBtn radius orderBtn  "}>واریز</span>

    }
  }


  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }


  handleNextPage = (page) => {
    this.store.getFinanceList({page})
  }


  _renderFinanceList = () => {
    const dataSource = this.store.financeList
    const columns = [
      {
        title: 'تاریخ',
        dataIndex: 'created_at',
        align: "center"
      },
      {
        title: 'مبلغ',
        dataIndex: 'amount',
        align: "center",
        render: (amount) => (<span>{this.formatNumber(amount)} تومان </span>)

      },
      {
        title: 'وضعیت',
        dataIndex: 'type',
        align: "center",
        render: (type) => this._renderBtnStatus(type)
      },
      /*  {
          title: 'جزئیات',
          dataIndex: 'detail',
          align: "center",
          render: () => {
            return (<img src={"/static/images/arrow.svg"}/>)
          }
        },*/
    ];
    return (<>


      <Table dataSource={dataSource} columns={columns}
             pagination={{
               position: ["bottomCenter"],
               page: this.store.page,
               hideOnSinglePage: true,
               current: this.store.page,
               total: this.store.total,
               pageSize: this.store.pagesize,
               onChange: this.handleNextPage
             }}/>

    </>)
  }


  handleCharge = () => {
    const data = {}
    data.amount = this.state.pay
    data.payment_method_id = this.state.payment
    this.store.getChargeCredit(data)
  }


  _renderMyCredit = () => {
    const {paymentList} = this.store
    return (<>


      <div className=" my-2 ">

       {/* <div className="d-flex justify-content-between align-items-center">
          <h3 className={"title-page mb-0"}>شارژ کیف پول</h3>
          <div className="d-flex align-items-center">
            <h6 className={"mb-0"}>موجودی:</h6>
            <span className={"  radius mx-2  "}>   {this.formatNumber(this.store.balance)} تومان</span>
          </div>
        </div>
        <hr/>*/}

        <div className="">
          <span>برای شارژ کیف پول خود، میتوانید از پرداخت های اماده استفاده کنید یا مبلغ دلخواه خود را وارد کنید</span>
        </div>

        <div className="my-5">
          <div className="d-flex justify-content-around mx-5 ">
            <span className={`cursor p-2 radius  ${this.state.pay === 20000 ? ' wallet-btn-Active' : ' wallet-btn'}`}
                  onClick={e => this.setState({pay: 20000})}>20/000 تومان</span>
            <span className={`cursor p-2 radius  ${this.state.pay === 50000 ? ' wallet-btn-Active' : ' wallet-btn'}`}
                  onClick={e => this.setState({pay: 50000})}>50/000 تومان</span>
            <span className={`cursor p-2 radius   ${this.state.pay === 100000 ? 'wallet-btn-Active' : ' wallet-btn'}`}
                  onClick={e => this.setState({pay: 100000})}>100/000 تومان</span>
          </div>

        </div>

        <Divider><h6>یا</h6></Divider>

        <div className="my-5">
          <div className="d-flex flex-column align-items-center justify-content-center">

            <div className="mb-2">
              <span>مبلغ دلخواه</span>
            </div>

            <div className=" w-25 mx-2">
              <InputNumber
                placeholder={"مبلغ مورد نظر خود را وارد کنید"}
                value={this.state.pay}
                formatter={value => `  ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={e => this.setState({pay: e})}
              />

            </div>

          </div>
        </div>


         <div className="my-5 d-flex justify-content-center">
          <Button disabled={!this.state.pay} className="login-btn w-25" loading={this.store.loading} onClick={this.handleCharge}>پرداخت</Button>
        </div>


      </div>
    </>)
  }

  render() {


    return (
      <>
        <Head>
        <title>تراکنش مالی</title>
      </Head>
        <div className="user-panel radius">
          <div className="user-workSpace radius ">
            <StateView state={this.store.stateView} errorButtonAction={this._getData}>
              <Tabs defaultActiveKey="1" tabBarExtraContent={ <div className="d-flex align-items-center">
                <span className={"titr-title"}>موجودی:</span>
                <span className={"  radius mx-2  "}>   {this.formatNumber(this.store.balance)} تومان</span>
              </div>}>

                <TabPane tab="افزایش شارژ" key="1">{this._renderMyCredit()}</TabPane>


                <TabPane tab="لیست تراکنش ها" key="2">{this._renderFinanceList()}</TabPane>


              </Tabs>

            </StateView>
          </div>
        </div>
      </>
    );
  }

}

export default Finance;




