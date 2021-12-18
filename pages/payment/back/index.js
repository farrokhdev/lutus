import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {withRouter} from 'next/router';
import Layout from "../../../libs/components/UI/Layout";
import PanelSideBar from "../../../libs/components/PanelUser/PanelSideBar";
import StateView from "../../../libs/components/UI/StateView/StateView";
import {Button} from "antd";
import Link from "next/link"
import WalletPres from "../../../libs/mobx/presenters/WalletPres";
import Head from "next/head";

@inject("CoreStore")
@observer
class Index extends Component {

  constructor(props) {
    super(props);
    this.store = new WalletPres()
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.props.router.query.wid && this.store.getPaymentResult({wid: this.props.router.query.wid})

  }

  _renderMessagePayment = () => {

    return (<>

      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        {this.props.router.query.status === "ok" ?
          <>
            <h3 className="text-success">پرداخت شما با موفقیت انجام شده</h3>
            <Link href={`/panel/projectViewUser/${this.props.router.query.order_id}`}><a>
              <Button className={"payment-btn  w-100 my-4"}>برگشت به صفحه پروژه</Button>
            </a></Link>
          </>
          :
          <>
            <h3 className="text-danger">پرداخت با خطا انجام شد</h3>
            <Link href={`/panel/projectViewUser/${this.props.router.query.order_id}`}><a>

              <Button className={"w-100 radius login-btn my-4"} type={"danger"}>پرداخت مجدد</Button>
            </a></Link>
          </>
        }
      </div>
    </>)
  }

  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  _renderWalletCharge = () => {
    const {paymentResult} = this.store;
    return (<>
      <StateView state={this.store.stateView} errorButtonAction={this._getData}>
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          {this.props.router.query.status === "ok" ?
            <>
              <h3 className="text-success">شارژ کیف پول شما با موفقیت انجام شده</h3>

              <div className="projectView my-3">
                <div className="d-flex justify-content-between">

                  <div className="d-flex align-items-center">
                    <h6 className={"mb-0 mx-2"}>شماره پرداخت</h6>
                    <span>{paymentResult.transactionId}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <h6 className={"mb-0 mx-2"}>مبلغ</h6>
                    {paymentResult.amount && <span>{this.formatNumber(paymentResult.amount)}</span>}
                  </div>


                </div>
              </div>


              <Link href={"/panel/finance"}><a>
                <Button className={"payment-btn  w-100 my-4"}>برگشت به کیف پول</Button>
              </a></Link>

            </>
            :
            <>
              <h3 className="text-danger">پرداخت با خطا انجام شد</h3>


              <Button onClick={e => this.store.getPaymentAgain({wid: this.props.router.query.wid})}
                      loading={this.store.loading}
                      className={"w-25 radius login-btn my-4"} type={"danger"}>پرداخت مجدد</Button>

            </>
          }
        </div>
      </StateView>
    </>)
  }


  render() {
    return (

      <>
        <Head><title>لوتوس نویسه</title></Head>
        <Layout>
          <div className="container">

            <div className="row">
              <div className="col-3">
                <PanelSideBar/>
              </div>
              <div className="col-9 pr-0">
                <div className="user-panel radius my-3 ">
                  <div className=" h-50"> {
                    this.props.router.query.wid ? this._renderWalletCharge() :
                      this._renderMessagePayment()
                  }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>)
  }

}

export default withRouter(Index);