import React, {Component} from 'react';
import {observer} from "mobx-react"
import {message, Input, Modal, Radio, Button} from "antd";
import StepModel from "../../../mobx/models/Order/StepModel";


@observer
class PricePaymentUser extends Component {

  state = {
    payment: '',
    step: '',
    priceType: '',
    visible: false,
    price: ''
  }

  componentDidMount() {
    const {prices, paymentMethods, loading} = this.props.store
    prices.length === undefined && this.setState({price: prices.price})
  }

  handlePrice = (priceType, price) => {
    this.setState({priceType, price})
  }

  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  handlePayment = (payment) => {
    this.setState({payment})
  }

  sendPaymentForm = () => {
    const data = {}
    data.order_id = this.props.store.projectView.id
    data.payment_method = this.state.payment
    this.props.store.orderPayment(data, this.props.getData)
  }

  handleStepPay = (step) => {
    this.setState({step})
  }


  render() {
    const {prices, paymentMethods, loading, wallet, projectView} = this.props.store
    const {price, priceType, payment} = this.state
    const renderPriceType = (status) => {
      switch (status) {
        case"normal":
          return <h6>تحویل عادی</h6>
        case"immediate":
          return <h6>تحویل نیمه فوری</h6>
        case"semi_immediate":
          return <h6>تحویل فوری</h6>
      }
    }
    const renderPaymentType = (status) => {
      switch (status) {
        case"awaiting_payment":
          return <Button type={"primary"} onClick={e=>this.setState({visible:true})}  className={"radius"}>در انتظار پرداخت</Button>
        case"pending":
          return <Button disabled={true} className={" radius"}>در حال پردازش</Button>
        case"paid":
          return <Button disabled={true} className={" radius"}>پرداخت شده</Button>
        case"modifying":
          return <Button disabled={true} className={" radius"}>modifying</Button>
        case"confirm":
          return <Button disabled={true} className={" radius"}>confirm</Button>
        case"in_progress":
          return <Button disabled={true} className={" radius"}>in_progress</Button>

        case"semi_immediate":
          return <Button disabled={true} className={" radius"}>در حال پردازش</Button>
      }
    }
    const bank = {id: 'wallet', logo: '/static/images/wallet.svg', title: "پرداخت از کیف پول"}
    console.log(this.props.store.projectView)
    return (
      <>
        {projectView.payment_type==="one" && <>

          <div className="my-5">
            <h4 className={"mb-4"}>شیوه پرداخت</h4>
            <Radio.Group onChange={(e) => this.handlePayment(e.target.value)} className={"w-100"} value={payment}>

              <div className="row">

                {projectView.amount < wallet && <div className="col-5">
                  <div className="" onClick={() => this.handlePayment(bank.id)}>
                    <div className={`paymentMethod ${bank.id === payment && "paymentMethod-Active"} `}>

                      <img className={"mx-auto py-2"} src={bank.logo} width={45}/>
                      <div className="d-flex justify-content-center">
                        <Radio value={bank.id}/>
                        <h6>{bank.title}</h6>
                      </div>
                      <div className="d-flex justify-content-around my-2">
                        <span>موجودی شما:</span>
                        <span className={"pink-title"}>{this.formatNumber(wallet)}</span>
                      </div>
                    </div>
                  </div>
                </div>}

                <div className="col-5">
                  <div className=" " onClick={() => this.handlePayment("bank")}>
                    <div className={`paymentMethod ${payment === "bank" && "paymentMethod-Active"} `}>
                      <img className={"mx-auto py-2"} src={"/static/images/bank.svg"} width={45}/>
                      <div className="d-flex justify-content-center">
                        <Radio value={"bank"}/>
                        <h6>پرداخت از طریق درگاه بانکی</h6>
                      </div>
                      <div className="my-3"/>
                    </div>
                  </div>
                </div>
              </div>


            </Radio.Group>
          </div>

          <div className="my-5">
            <div className={"d-flex justify-content-between align-items-center "}>

              {/*<h3>مبلغ قابل پرداخت: {this.formatNumber(projectView.amount)} تومان </h3>*/}
              <Button disabled={!payment} loading={loading} onClick={this.sendPaymentForm} className={"payment-btn  w-50"} type={""}
              >پرداخت</Button>
            </div>
          </div>

        </>}
      </>
    )
  }

}

export default PricePaymentUser;
