import React, {Component} from 'react';
import {observer} from "mobx-react"
import {Card, message, Input, InputNumber, Radio, Button, Alert, Badge} from "antd";
import StepModel from "../../../mobx/models/Order/StepModel";
import {toJS} from "mobx";


@observer
class StepSelect extends Component {


    constructor(props) {
        super(props);
        this.timeref = React.createRef();
        this.payref = React.createRef();


        this.labels = {
            normal: "عادی",
            semi_immediate: " نیمه فوری",
            immediate: "فوری",
            very_immediate: " فوق فوری",
        }

        this.pricesTitles = {
            normal: "ترجمه عمومی",
            specialist: " ترجمه تخصصی",
            vip: "ترجمه ویژه",

        }


    }

    state = {
        priceas: 0,
        proccess_step: 0,
        total_splice_price: 0,
        payment: '',
        step: '',
        priceType: '',
        price: '',
        priceTime: '',
        priceData: null,
        priceTitle: "",
        qualityTitle: "",
        paymentTitle: "",
    }

    componentDidMount() {
        const {prices, paymentMethods, loading} = this.props.store
        prices.length === undefined && this.setState({price: prices.price})
    }

    handlePrice = (priceType, price) => {

        // priceTitle

        this.setState({
            priceType, priceData: price, priceas: 0, proccess_step: 1, priceTitle: this.pricesTitles[priceType],

            priceTime: "",
            qualityTitle: "",
        });
        this.timeref.current.scrollIntoView({behavior: 'smooth', block: 'center'})
    }

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    handlePayment = (payment) => {
        this.setState({payment})
    }


    handleStepPay = (step) => {
        this.props.store.setData("handlePayment", [new StepModel()]);
        this.setState({
            step,
            proccess_step: 3,
        })
    }


    addNewStep = () => {
        const index = new StepModel();
        if (this.props.store.handlePayment.length === 4) return message.error("حداکثر تعداد قسط 4 مرحله است");
        this.props.store.handlePayment.push(index);
    }


    deleteStep = (index) => {

        this.props.store.handlePayment.splice(index, 1)
    }


    sendStepForm = () => {
        const data = {}
        data.order_id = this.props.store.projectView.id
        data.quality = this.state.priceType
        data.payment_type = this.state.step
        data.delivery_time_type = this.state.priceTime
        data.steps = this.props.store.handlePayment

        let esendError = false;
        if (data.payment_type == "step") {
            data.steps.map((d, i) => {
                if (d.description == "") {
                    esendError = true;
                }
            })
        }

        if (esendError) {
            message.error("لطفاً توضیحات مراحل پرداخت را تکمیل نمایید.")
            return;
        }

        if (data.payment_type != "" && data.delivery_time_type != "" && data.priceTime != "") {

            this.props.store.getOrderAccept(data, this.props.getData)

        } else {
            message.error("لطفا تمام فیلدها را پر کنید")
        }

    }


    _renderNameT = (title) => {


        if (this.labels[title] != undefined) {
            return this.labels[title];
        } else {
            return "-";
        }
    }

    handlePriceType = (priceTime, priceas) => {
        this.setState({
            priceTime,
            priceas,
            qualityTitle: this.labels[priceTime],
            proccess_step: 2,
        });
        this.payref.current.scrollIntoView({behavior: 'smooth', block: 'center'})

    }

    render() {
        const {prices, paymentMethods, loading, wallet, handlePayment} = this.props.store
        const {step, priceData, priceTitle, qualityTitle, proccess_step, priceas, priceType, priceTime} = this.state

        const renderPriceType = (status) => {
            switch (status) {
                case"normal":
                    return <span className={"titr-title"}>ترجمه عمومی</span>
                case"specialist":
                    return <span className={"titr-title"}>ترجمه تخصصی</span>
                case"vip":
                    return <span className={"titr-title"}>ترجمه ویژه</span>
            }
        }

        let _disabled = (this.state.step != "" && this.state.priceType != "" && this.state.priceTime != "") ? false : true;


        let total_p = 0;
        if (step == "step") {
            handlePayment.map((d, i) => {
                total_p += d.amount;
            });
        }
        let mande = priceas - total_p;


        if (this.state.step === "step" && total_p != priceas) {
            _disabled = true;
        }

        return (
            <Card title={"قیمت و زمانبندی"} className={"radius mb-3"}>
                <div className={" mx-3"}>
                    <div className="">
                        <div className="d-flex flex-row align-items-center mb-4">

                            <div className={'step-num'}>
                                <div className="ant-steps-item-icon"><span className="ant-steps-icon">1</span></div>
                            </div>
                            <div>
                      <span className={"gray-title mx-2 mb-0"}>
                    نوع ترجمه خود را انتخاب کنید
                      </span>
                                {proccess_step == 0 && <Badge status="processing"/>}
                            </div>

                        </div>


                        <Radio.Group className={"w-100"} value={priceType}>
                            {prices.length ? <>{prices.map((price, index) => {
                                return <div key={'p' + index} className="row mx-0 "
                                            onClick={() => this.handlePrice(price.type, price.data)}>
                                    <div
                                        className={` w-100 p-2 ${price.type === priceType ? "selectBox-Active" : "selectBox"} `}>
                                        <div className=" col-4 ">
                                            <div className="px-3 d-flex">
                                                <Radio value={price.type}
                                                       onChange={(e) => this.handlePrice(e.target.value, price.data)}/>
                                                {renderPriceType(price.type)}
                                            </div>
                                        </div>
                                        <div className=" col-4  ">
                                            <div className="px-3 text-center d-flex flex-column">
                                                {price.price_discount ?
                                                    <span
                                                        className={"off-text"}>{this.formatNumber(price.old_price)} تومان </span> : null}
                                                {price.price && <span
                                                    className={"price-title"}>{this.formatNumber(price.price)} تومان </span>}
                                            </div>
                                        </div>
                                        <div className="col-4 ">
                                            <div className="p-x text-center">
                                                <span className={"sub-title"}>{price.date} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}</> : <Alert message={"خطای سیستمی در بر آورد هزینه"}/>}
                        </Radio.Group>


                    </div>

                    <div ref={this.timeref}>

                        <div className="d-flex flex-row align-items-center mb-4 mt-4">

                            <div className={'step-num'}>
                                <div className="ant-steps-item-icon"><span className="ant-steps-icon">2</span></div>
                            </div>
                            <div>
                                  <span className={"gray-title mx-2 mb-0"}>
                                زمان ترجمه خود را انتخاب کنید
                                  </span>
                                {proccess_step == 1 && <Badge status="processing"/>}

                            </div>

                        </div>


                        <div>

                            {priceType == "" && <Alert message="ابتدا نوع ترجمه خود را انتخاب کنید" type="info"/>}
                            {priceType != "" && <div>
                                <Radio.Group className={"w-100"} value={priceTime}>
                                    {priceData != undefined && <>

                                        {priceData.map((data, index) => {

                                            let priceas2 = data.price;
                                            if (data.discount > 0) {
                                                priceas2 = Math.ceil(data.price - (data.price * data.discount / 100));
                                            }
                                            return <div key={'t' + index} className="row mx-0 "
                                                        onClick={() => {
                                                            this.handlePriceType(data.type, priceas2)
                                                        }}>


                                                <div
                                                    className={` w-100 p-2 ${data.type === priceTime ? "selectBox-Active" : "selectBox"} `}>
                                                    <div className=" col-4 ">
                                                        <div className="px-3 d-flex">
                                                            <Radio value={data.type}
                                                                   onChange={(e) => this.handlePriceType(data.type, priceas2)}/>
                                                            <span
                                                                className={'titr-title'}> {this._renderNameT(data.type)}</span>
                                                        </div>
                                                    </div>
                                                    <div className=" col-4  ">
                                                        <div className="px-3 text-center d-flex flex-column">
                                                            {data.discount > 0 &&
                                                            <><span
                                                                className={"off-text"}>{this.formatNumber(data.price)} تومان </span>

                                                                <span
                                                                    className={"price-title"}> {this.formatNumber(priceas2)} تومان </span>
                                                            </>
                                                            }

                                                            {data.discount == 0 && <span
                                                                className={"price-title"}> {this.formatNumber(data.price)} تومان </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-4 ">
                                                        <div className="p-x text-center">
                                                            <span className={"sub-title"}>{data.date} </span>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>

                                        })}
                                    </>}
                                </Radio.Group>
                            </div>}


                        </div>
                    </div>

                    <div ref={this.payref}>

                        <div className="d-flex flex-row align-items-center mb-4 mt-4">

                            <div className={'step-num'}>
                                <div className="ant-steps-item-icon"><span className="ant-steps-icon">3</span></div>
                            </div>
                            <div>
                      <span className={"gray-title mx-2 mb-0"}>
                    زمانبندی پرداخت
                      </span>
                                {proccess_step == 2 && <Badge status="processing"/>}

                            </div>

                        </div>


                        <Radio.Group disabled={(priceTime == "") ? true : false} onChange={(e) => {
                            if (priceTime == "") {
                                message.error("ابتدا زمان ترجمه خود را انتخاب کنید.")
                            } else {
                                this.handleStepPay(e.target.value)
                            }
                        }} className={"w-100"}
                                     value={this.state.step}>

                            <div className={""} onClick={() => {
                                if (priceTime == "") {
                                    message.error("ابتدا زمان ترجمه خود را انتخاب کنید.")
                                } else {
                                    this.handleStepPay("one")
                                }

                            }}>
                                <div
                                    className={`px-4 w-50 p-2 ${this.state.step === "one" ? "selectBox-Active" : "selectBox"} `}>
                                    <div className="mx-3">
                                        <Radio value={"one"}/>
                                        <span className={"titr-title"}>پرداخت یکجا</span>
                                    </div>
                                </div>
                            </div>

                            {this.props.store.projectView.details.step &&
                            <div className={" "} onClick={() => {
                                if (priceTime == "") {
                                    message.error("ابتدا زمان ترجمه خود را انتخاب کنید.")
                                } else {
                                    this.handleStepPay("step")
                                }
                            }
                            }>
                                <div
                                    className={`px-4 w-50 p-2 ${this.state.step === "step" ? "selectBox-Active" : "selectBox"} `}>
                                    <div className="mx-3">
                                        <Radio value={"step"}/>
                                        <span className={"titr-title"}>پرداخت مرحله ای</span>
                                    </div>
                                </div>
                            </div>}

                        </Radio.Group>


                        {this.state.step === "step" && <div className={"projectView p-3 my-5"}>

                            <div className="row align-items-center p-3 ">
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
                                <div className="col-5">
                                    <div className="d-flex justify-content-center">
                                        <span className={"titr-title"}>توضیحات</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="d-flex justify-content-end">
                                        <Button type={"primary"} className={"radius"} onClick={this.addNewStep}>مرحله
                                            جدید</Button>
                                    </div>
                                </div>
                            </div>

                            {handlePayment.map((item, index) => (
                                <div className="row align-items-center p-3 " key={'ps' + index}>
                                    <div className="col-2">
                                        <div className="d-flex justify-content-center">
                                            <span>مرحله {index + 1}</span>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <InputNumber
                                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value) => {

                                                return value.replace(/\$\s?|(,*)/g, '')
                                            }
                                            }
                                            onChange={e => {

                                                if (e == null) {
                                                    this.props.store.setAcountHandler(0, index)

                                                } else {
                                                    this.props.store.setAcountHandler(e, index)
                                                }
                                                // handlePayment[index].setVal('amount', e)
                                                console.log(e);
                                                console.log(handlePayment[index].amount);
                                            }}
                                            value={handlePayment[index].amount}/>

                                    </div>
                                    <div className="col-5">
                                        <Input
                                            onChange={e => handlePayment[index].setVal('description', e.target.value)}
                                            value={handlePayment[index].description}/>
                                    </div>
                                    <div className="col-2">
                                        <div className="d-flex justify-content-end">
                                            <Button type={"danger"} className={"radius"}
                                                    onClick={() => this.deleteStep(index)}>حذف</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}


                            <div className={'d-flex w-100'}>

                                <Alert
                                    clasName={"w-100"}
                                    description={'مجموع پرداخت شما :' + this.formatNumber(total_p) + ' تومان میباشد.' + ((priceas < total_p) ? " مبلغ وارد شده بیش از مبلغ قابل پرداخت می باشد." : ((mande > 0) ? " مبلغ مانده : " + this.formatNumber(mande) + "تومان " : ""))}
                                    type={(priceas < total_p) ? "error" : "info"}
                                    showIcon

                                />

                            </div>


                        </div>}


                    </div>

                    <div className="mt-3 d-flex justify-content-between align-items-center">
                        <div className={"d-flex col-md-6 col-12  px-0 "}>
                            <Button loading={loading} block disabled={_disabled} onClick={this.sendStepForm}
                                    className={"login-btn radius  "}>ادامه
                                فرایند ثبت</Button>
                        </div>

                        <div className={"d-flex col-md-6 col-12  "}>
                            {/*{(priceTitle != "" ) ? priceTitle : ""}*/}
                            {/*{(qualityTitle != "" ) ? ", " + qualityTitle : ""}*/}

                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default StepSelect;
