import React, {Component} from 'react';
import {observer} from "mobx-react"
import {Card, Result, Modal, Radio, Button} from "antd";
import StepModel from "../../../mobx/models/Order/StepModel";
import login from "../../../../pages/login";


@observer
class StepPaymentUser extends Component {

    state = {
        payment: '',
        step: '',
        priceType: '',
        visible: false,
        confirmVision: false,
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

    _getConfirmProjectUser = (id) => {
        this.props.store.confirmStepProject({order_id: id}, this.callBackConfirm)
    }

    callBackConfirm = () => {
        this.props.getData()
    }

    renderPaymentType = (status, file) => {
        switch (status) {
            case"awaiting_payment":
                return <Button onClick={e => this.setState({visible: true})}
                               className={"radius login-btn"}> پرداخت</Button>
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
                return <Button disabled={!file.id} onClick={e => this.setState({confirmVision: true})}
                               className={"btn-success radius"}>تائید مرحله</Button>
            case"semi_immediate":
                return <Button disabled={true} className={" radius"}>در حال پردازش</Button>
        }
    }

    _renderEditButton = () => {
        const {projectView} = this.props.store

        let visible = true
        if (projectView.status === "freelancer_readiness")  visible = false
        if (projectView.status === "accept_detail")  visible = false
        if (projectView.status === "awaiting_payment") {
            if (projectView.payment_type !== "one")  visible = false
        }
        if (projectView.status === "readiness")  visible = false
        if (projectView.status === "in_progress")  visible = false
        if (projectView.status === "complete")  visible = false
        if (projectView.status === "ended")  visible = false
        if (projectView.status === "confirm")  visible = false
        // if (projectView.status === "freelancer_readiness")  visible = false


        console.log(projectView.status)
        return visible
    }


    _renderEditPayment = () => {
        const data = {}
        data.order_id = this.props.store.projectView.id
        this.props.store.editPaySteps(data, this.props.getData)
    }

    renderSingleStep = () => {
        const {projectView, editLoading} = this.props.store

        return <>
            <div className="custom-th row align-items-center p-3">
                <div className={"col-3"}>
                    <div className="d-flex justify-content-center">
                        <span className={"titr-title"}>قیمت</span>
                    </div>
                </div>
                <div className={"col-3"}>
                    <div className="d-flex justify-content-center">
                        <span className={"titr-title"}>تاریخ تحویل</span>
                    </div>
                </div>
                <div className={"col-3"}>
                    <div className="d-flex justify-content-center">
                        <span className={"titr-title"}>فایل پروژه</span>
                    </div>
                </div>
                <div className={"col-3"}>
                    <div className="d-flex justify-content-center">
                        <span className={"titr-title"}> وضعیت</span>
                    </div>
                </div>
            </div>

            {projectView.steps.map((item, index) => {
                return <div key={index} className="row align-items-center p-3 ">


                    <div className={"col-3"}>
                        <div className="d-flex justify-content-center">
                            <span>{this.formatNumber(item.amount)} تومان </span>
                        </div>
                    </div>
                    <div className={"col-3"}>
                        <div className="d-flex justify-content-center">
                            <span>{projectView.details.deliver_date} روز </span>
                        </div>
                    </div>
                    <div className={"col-3"}>
                        <div className="d-flex justify-content-center">
                            {item.file ? <Button onClick={() => this.props.getFile(item.file, projectView.id)}
                                                 icon={<img className={"mx-2"} src={"/static/images/download.svg"}
                                                            width={16}/>}> دانلود
                                فایل </Button> : "---"}
                        </div>
                    </div>
                    <div className={"col-3"}>
                        <div className="d-flex justify-content-center">
                            <span>{this.renderPaymentType(item.status, item.file)}</span>

                        </div>
                    </div>


                </div>
            })}
        </>
    }

    renderMultiStep = () => {
        const {projectView, editLoading} = this.props.store

        return <>
            <div className="custom-th row align-items-center   p-3 ">

                <div className="col-2">
                    <div className="d-flex justify-content-center">
                        <span className={"titr-title"}>مرحله ها</span>
                    </div>
                </div>
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
                <div className={"col-2"}>
                    <div className="d-flex justify-content-center">
                        <span className={"titr-title"}> وضعیت</span>
                    </div>
                </div>

            </div>

            {projectView.steps.map((item, index) => {
                return <div key={index} className="row align-items-center   p-3 ">

                    <div className={"col-2"}>
                        <div className="d-flex justify-content-center">
                            <span className={"titr-title"}>مرحله {index + 1}</span>
                        </div>
                    </div>
                    <div className={"col-3"}>
                        <div className="d-flex justify-content-center">
                            <span>{this.formatNumber(item.amount)} تومان </span>
                        </div>
                    </div>
                    <div className={"col-3"}>
                        <div className="d-flex justify-content-center">
                            <span>{item.description}</span>
                        </div>
                    </div>
                    <div className={"col-2"}>
                        <div className="d-flex justify-content-center">
                            {item.file ? <Button onClick={() => this.props.getFile(item.file, projectView.id)}
                                                 icon={<img className={"mx-2"} src={"/static/images/download.svg"}
                                                            width={16}/>}> دانلود
                                فایل </Button> : "---"}
                        </div>
                    </div>
                    <div className={"col-2"}>
                        <div className="d-flex justify-content-center">
                            <span>{this.renderPaymentType(item.status, item.file)}</span>
                        </div>
                    </div>


                </div>
            })}
        </>


    }

    render() {
        const {loading, wallet, projectView, editLoading} = this.props.store
        const {payment} = this.state
        const bank = {id: 'wallet', logo: '/static/images/wallet.svg', title: "پرداخت از کیف پول"}
        return (
            <>

                <Card className="radius mb-3" title={"روند پروژه"} extra={this._renderEditButton() &&
                <Button loading={editLoading} className={"btn-warning radius mx-1"}
                        onClick={this._renderEditPayment}>اصلاح قیمت و زمانبندی </Button>}>

                    {projectView.steps.length > 1 ? this.renderMultiStep() : this.renderSingleStep()}

                </Card>


                <Modal visible={this.state.visible} title={"لطفا شیوه پرداخت را انتخاب کنید"}
                       footer={[<Button onClick={e => this.setState({visible: false})}>لغو</Button>,
                           <Button disabled={!payment} loading={loading} onClick={this.sendPaymentForm}
                                   className={" addOrder-btn"}>پرداخت</Button>]}
                       onCancel={() => this.setState({visible: false})}>

                    <Radio.Group onChange={(e) => this.handlePayment(e.target.value)} className={"w-100"}
                                 value={payment}>

                        <div className="row">

                            {projectView.amount < wallet   && <div className="col-12">
                                <div className="" onClick={() => this.handlePayment(bank.id)}>
                                    <div className={`paymentMethod ${bank.id === payment && "paymentMethod-Active"} `}>


                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className={"d-flex align-items-center"}>
                                                <Radio value={bank.id}/>
                                                {/*<img className={" ml-2"} src={bank.logo} width={30}/>*/}
                                                <svg
                                                    className={'ml-2 icon-bank ' + ((payment == bank.id) ? "active" : "")}
                                                    xmlns="http://www.w3.org/2000/svg" width="30" height="30" x="0" y="0" viewBox="0 0 890.5 890.5" enableBackground={'new 0 0 512 512'} xmlSpace="preserve" >
                                                    <g>
                                                        <g xmlns="http://www.w3.org/2000/svg">
                                                            <g>
                                                                <path d="M208.1,180.56l355-96.9l-18.8-38c-12.3-24.7-42.3-34.9-67-22.6l-317.8,157.5H208.1z" ></path>
                                                                <path d="M673.3,86.46c-4.399,0-8.8,0.6-13.2,1.8l-83.399,22.8L322,180.56h289.1h126l-15.6-57.2    C715.5,101.06,695.3,86.46,673.3,86.46z" ></path>
                                                                <path d="M789.2,215.56h-11.4h-15.5h-15.5H628.5H193.8h-57h-48h-8.9H50.1c-15.8,0-29.9,7.3-39.1,18.8c-4.2,5.3-7.4,11.4-9.2,18.1    c-1.1,4.2-1.8,8.6-1.8,13.1v6v57v494.1c0,27.601,22.4,50,50,50h739.1c27.601,0,50-22.399,50-50v-139.5H542.4    c-46.9,0-85-38.1-85-85v-45.8v-15.5v-15.5v-34.4c0-23,9.199-43.899,24.1-59.199c13.2-13.601,30.9-22.801,50.7-25.101    c3.3-0.399,6.7-0.6,10.1-0.6h255.2H813h15.5h10.6v-136.5C839.2,237.96,816.8,215.56,789.2,215.56z" ></path>
                                                                <path d="M874.2,449.86c-5-4.6-10.9-8.1-17.5-10.4c-5.101-1.699-10.5-2.699-16.2-2.699h-1.3h-1h-15.5h-55.9H542.4    c-27.601,0-50,22.399-50,50v24.899v15.5v15.5v55.4c0,27.6,22.399,50,50,50h296.8h1.3c5.7,0,11.1-1,16.2-2.7    c6.6-2.2,12.5-5.8,17.5-10.4c10-9.1,16.3-22.3,16.3-36.899v-111.3C890.5,472.16,884.2,458.959,874.2,449.86z M646.8,552.36    c0,13.8-11.2,25-25,25h-16.6c-13.8,0-25-11.2-25-25v-16.6c0-8,3.7-15.101,9.6-19.601c4.3-3.3,9.601-5.399,15.4-5.399h4.2H621.8    c13.8,0,25,11.199,25,25V552.36L646.8,552.36z" ></path>
                                                            </g>
                                                        </g>

                                                    </g></svg>
                                                <div className={'d-flex flex-column align-items-start'}>
                                                    <div>
                                                        <span className={"titr-title"}>{bank.title}</span>
                                                    </div>
                                                    <div>
                                                        <small className={'text-muted'}>
                                                            کسر از کیف پول شما
                                                             </small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"d-flex flex-column"}>
                                                <span>موجودی شما:</span>
                                                <span className={"pink-title"}>{this.formatNumber(wallet)} تومان </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>}

                            <div className="col-12">
                                <div className=" " onClick={() => this.handlePayment("bank")}>
                                    <div className={`paymentMethod ${payment === "bank" && "paymentMethod-Active"} `}>
                                        <div className="d-flex align-items-center">
                                            <Radio value={"bank"}/>
                                            <div className={'d-flex flex-row'}>
                                                <div className={'d-flex align-self-center'}>
                                                    {/*<img className={"ml-2"} src={"/static/images/shetab.svg"}*/}
                                                    {/*     width={30}/>*/}

                                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                                         width="30" height="30"
                                                         x="0" y="0" viewBox="0 0 512 512"
                                                         className={'ml-2 icon-bank ' + ((payment == 'bank') ? "active" : "")}
                                                         enableBackground="new 0 0 512 512" xmlSpace="preserve"
                                                         >
                                                        <g>
                                                            <path xmlns="http://www.w3.org/2000/svg" d="m511.386 281.608-38.714-219.559c-3.418-19.384-20.275-33.022-39.299-33.022-2.303 0-339.026 59.161-339.026 59.161-21.73 3.832-36.24 24.554-32.408 46.284l3.732 21.167h303.894c38.553 0 69.918 31.365 69.918 69.918v28.017 67.97 13.311l39.495-6.964c21.73-3.831 36.24-24.553 32.408-46.283z" ></path>
                                                            <path
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        d="m409.518 351.509h-409.518v91.511c0 22.065 17.888 39.953 39.953 39.953h329.612c22.065 0 39.953-17.888 39.953-39.953zm-290.571 95.468h-67.97c-8.274 0-14.982-6.708-14.982-14.982s6.708-14.982 14.982-14.982h67.97c8.274 0 14.982 6.708 14.982 14.982s-6.707 14.982-14.982 14.982z"
                                                       ></path>
                                                            <path xmlns="http://www.w3.org/2000/svg"
                                                                                  d="m.049 223.61h409.419c-1.016-21.161-18.492-38.005-39.904-38.005h-329.611c-21.412 0-38.888 16.844-39.904 38.005z"
                                                                                 ></path>
                                                            <path
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        d="m0 253.574h409.518v67.97h-409.518z" ></path></g>
                                                    </svg>



                                                </div>
                                                <div className={'d-flex flex-column align-items-start'}>
                                                    <div>
                                                        <span className={"titr-title"}>پرداخت اینترنتی</span>
                                                    </div>
                                                    <div>
                                                        <small className={'text-muted'}> آنلاین با تمامی کارت‌های
                                                            بانکی </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </Radio.Group>

                </Modal>


                <Modal visible={this.state.confirmVision} onCancel={() => this.setState({confirmVision: false})}
                       footer={null}>
                    <Result
                        status="success"
                        title="آیا فایل این مرحله را تائید می کنید؟"
                        extra={[
                            <div className={"d-flex justify-content-center"}>
                                <Button loading={loading} className={"ok-btn mx-2 w-50"}
                                        onClick={() => this._getConfirmProjectUser(projectView.id)}>تایید</Button>
                                <Button className={"cancel-btn  mx-2 w-50"}
                                        onClick={() => this.setState({confirmVision: false})}>لغو</Button>
                            </div>
                        ]}
                    />
                </Modal>
            </>
        )
    }

}

export default StepPaymentUser;
