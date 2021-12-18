import React, {Component} from 'react';
import {observer} from "mobx-react"
import {Card, Result, Modal, Radio, Button} from "antd";
import StepModel from "../../../mobx/models/Order/StepModel";
import login from "../../../../pages/login";


@observer
class StepPaymentTranslator extends Component {

  state = {
    payment: '',
    step: '',
    priceType: '',
    visible: false,
    confirmVision: false,
    price: ''
  }

  componentDidMount() {

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

  _getConfirmProjectUser = (id) => {
    this.props.store.confirmStepProject({order_id: id},this.callBackConfirm)
  }

  callBackConfirm=()=>{
    this.props.getData()
  }


  renderPaymentType = (status,file) => {
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
        return <Button disabled={true} className={" radius"}>تائید شده</Button>
      case"in_progress":
        return <Button disabled={true} className={"btn-primary radius"}>در حال انجام</Button>
      case"send_file":
        return <Button disabled={!file.id}  onClick={e=>this.setState({confirmVision: true})} className={"btn-success radius"}>در انتظار تائید</Button>

      case"semi_immediate":
        return <Button disabled={true} className={" radius"}>در حال پردازش</Button>
    }
  }

  render() {
    const {projectView} = this.props.store


    return (
      <Card title={"روند پروژه"} className={"radius mb-3"}>


          <div className="custom-th row align-items-center p-3 ">
            {projectView.steps.length>1 && <div className="col-2">
              <div className="d-flex justify-content-center">
                <span className={"titr-title"}>مرحله ها</span>
              </div>
            </div>}
            <div className="col-3">
              <div className="d-flex justify-content-center">
                <span className={"titr-title"}>قیمت</span>
              </div>
            </div>
            <div className="col-3">
              <div className="d-flex justify-content-center">
                <span className={"titr-title"}>توضیحات</span>
              </div>
            </div>
            <div className="col-2">
              <div className="d-flex justify-content-center">
                <span className={"titr-title"}>فایل پروژه</span>
              </div>
            </div>
            <div className="col">
              <div className="d-flex justify-content-center">
                <span className={"titr-title"}>وضعیت</span>
              </div>
            </div>
          </div>


          {projectView.steps.map((item, index) => (
            <div key={index} className="row align-items-center p-3 " >
              {projectView.steps.length>1 && <div className="col-2">
                <div className="d-flex justify-content-center">
                  <span className={"titr-title"}>مرحله {index + 1}</span>
                </div>
              </div>}
              <div className="col-3">
                <div className="d-flex justify-content-center">
                  <span>{this.formatNumber(item.amount)} تومان </span>
                </div>
              </div>
              <div className="col-3">
                <div className="d-flex justify-content-center">
                  <span>{item.description}</span>
                </div>
              </div>
              <div className="col-2">
                <div className="d-flex justify-content-center">
                  {item.file ?  <Button  onClick={() => this.props.getFile(item.file, projectView.id)}
                                         icon={<img className={"mx-2"} src={"/static/images/download.svg"} width={16}/> }> دانلود فایل  </Button> : "---"}
                </div>
              </div>
              <div className="col">
                <div className="d-flex justify-content-center">
                  <span>{this.renderPaymentType(item.status,item.file)}</span>
                </div>
              </div>
            </div>
          ))}



      </Card>
    )
  }

}

export default StepPaymentTranslator;