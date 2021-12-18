import React, {Component} from 'react';
import {observer, Observer} from "mobx-react";
import Layout from "../../libs/components/UI/Layout";
import OrderSideBar from "../../libs/components/Order/OrderSideBar";
import {Input, Checkbox, Modal, Radio, Steps, Card, Button, message, Form, Upload} from 'antd';
import FormBuilder from 'antd-form-builder'
import Head from "next/head";
import OrderCategoryBox from "../../libs/components/Order/OrderCategoryBox";
import OrderPres from "../../libs/mobx/presenters/OrderPres";
import StateView from "../../libs/components/UI/StateView/StateView";
import {withTranslation} from "react-i18next";
import LoginPres from "../../libs/mobx/presenters/LoginPres";
import {DatePicker as DatePickerJalali} from "antd-jalali";
import TranslateForm from "../../libs/components/Order/Form/TranslateForm";
import {withRouter} from 'next/router';
import Link from "next/link"

const {Dragger} = Upload;
const {Step} = Steps;
const {TextArea} = Input;

@observer
class Order extends Component {

    constructor(props) {
        super(props);
        this.store = new OrderPres();
        this.loginStore = new LoginPres();
        this.formRef = React.createRef();

        try {
            FormBuilder.defineWidget('date-picker-jalali', DatePickerJalali);
        } catch {
        }

    }

    componentDidMount() {
        this._getData()


        window.addEventListener('popstate', ()=>{
            this.store.changeValue("current", 0);

        });


    }


    _getData = () => {


        this.store.getServiceList();
        this.store.getFieldList();

        if (this.props.router.query.service) {
            this.handleSelectCategory({id: this.props.router.query.id})
        }

        this.props.router.query.username && this.store.getProfileView({username: this.props.router.query.username})
    }

    onChange = (current) => {

        switch (current) {
            case 0:
                this.store.handleOrder.current = current
                this.store.serviceSelect.description = ""
                break
            case 1:
                if (this.store.handleOrder.category === "") {
                    message.error("لطفا فیلد مورد نظر خود را انتخاب کنید")
                } else {
                    this.store.handleOrder.current = current
                }
                break;
            case 2:
                if (!this.store.handleOrder.fillForm) {
                    message.error("لطفا فرم مورد نظر درخواست خود را پر کنید")
                } else {
                    this.store.handleOrder.current = current
                }
                break;
            case 3:
                if (!this.store.handleOrder.fillForm) {
                    message.error("لطفا فرم مورد نظر درخواست خود را پر کنید")
                } else {
                    this.store.handleOrder.current = current
                }
                break;
            default:
                this.store.handleOrder.current = current
                break;

        }
    }

    _changeTab = (key, value) => {
        this.store.changeValue(key, value)
    }

    _renderProgressItems = () => {
        const {current} = this.store.handleOrder;

        switch (current) {
            case 0:
                return this._renderCategory()
            case 1:
                return (<>
                    <TranslateForm store={this.store} onChange={this._changeTab} getData={this._getData}
                                   profileView={this.store.profileView}/>
                </>)
            case 2:
                return this._renderSuccess()
        }
    }

    _renderCategory = () => {

        return (
            <StateView state={this.store.stateView} errorButtonAction={this._getData}>
                <div className={"row py-4 "}>
                    {this.store.ServiceList.map((item, index) => {
                        return <div key={'n' + index} className={"col-6 col-md-4 my-3 "}>
                            <OrderCategoryBox item={item} handleSelectCategory={this.handleSelectCategory}/>
                        </div>
                    })}
                </div>
            </StateView>
        )
    }

    _renderSuccess = () => {

        return (<>
            <div className="row text-center flex-column py-4">

                <h3 className={"text-success py-3 "}>تبریک! پروژه با موفقیت ایجاد شد</h3>

                <span className="titr-title py-3 ">مرحله بعدی چیست؟</span>
            </div>
            <div className="row justify-content-around">
                <div className="d-flex align-items-center py-2 border-bottom">
                    <div className="d-flex flex-column ">
                        <span className="titr-title px-2 ">1- بررسی پروژه و قیمت گذاری</span>
                        <span className="text-muted">پروژه شما در ارسع وقت توسط تیم پشتیبانی بررسی و قیمت گذاری شده اطلاع رسانی های لازم به شما صورت میگیرد</span>
                    </div>
                    <img src={"/static/images/support.jpg"} width={200}/>
                </div>
                <div className="d-flex align-items-center py-2 border-bottom">
                    <div className="d-flex flex-column ">
                        <span className="titr-title px-2 ">2- سپرده گذاری مبلغ پروژه</span>
                        <span className="text-muted">پروژه شما در ارسع وقت توسط تیم پشتیبانی بررسی و قیمت گذاری شده اطلاع رسانی های لازم به شما صورت میگیرد</span>
                    </div>
                    <img src={"/static/images/mony.jpg"} width={200}/>
                </div>
                <div className="d-flex align-items-center py-2 ">
                    <div className="d-flex flex-column ">
                        <span className="titr-title px-2 ">3- شروع کار</span>
                        <span className="text-muted">پروژه شما در ارسع وقت توسط تیم پشتیبانی بررسی و قیمت گذاری شده اطلاع رسانی های لازم به شما صورت میگیرد</span>
                    </div>
                    <img src={"/static/images/login-bg.jpg"} width={200}/>
                </div>
            </div>
            <div className="row justify-content-center w-100">
                <Link href={`/panel/projectViewUser/${this.store.handleOrder.id}`}><a>
                    <Button className={"btn-main btn-success  "}>صفحه پروژه</Button>
                </a></Link>
            </div>
        </>)
    }


    render() {
        let {handleOrder: {current, category, destination, origin}} = this.store;

        const steps = [
            {
                title: 'انتخاب موضوع',
            }, {title: 'انتخاب زبان',}, {title: 'تکمیل اطلاعات',},
        ];

        return (
            <>
                <Head>
                    <title>ثبت سفارش</title>
                </Head>
                <Layout>
                    <div className="container">
                        <div className="user-panel mt-3 mb-5 radius">
                            <div className="row justify-content-center">
                                <div className="col-12  col-md-3 py-3 d-none d-md-block ">
                                    <OrderSideBar store={this.store}/>
                                </div>
                                <div className="col-12 col-md-6 py-3">
                                    <Steps responsive={true} className={'py-3 '} current={current}
                                           onChange={this.onChange}>
                                        {steps.map(item => (<Step key={item.title} title={item.title}/>))}
                                    </Steps>
                                    {this._renderProgressItems()}
                                    <div className="d-flex align-items-end justify-content-start steps-action">

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            </>
        );
    }


    handleSelectCategory = ({id, title, alias}) => {
        this.store.getOriginLanguage({service_id: id})
        this.store.handleOrder.category = title
        this.store.handleOrder.alias = alias
        this.store.handleOrder.categoryId = id
        this.store.handleOrder.service_id = id
        this.store.handleOrder.language_from_id = ""
        this.store.handleOrder.language_to_id = ""
        this.store.handleOrder.current = this.store.handleOrder.current + 1;


        if (alias != undefined) {
            this.props.router.push('order/' + alias + '/' + id);
        }
    }


}

export default withTranslation("common")(withRouter(Order));
