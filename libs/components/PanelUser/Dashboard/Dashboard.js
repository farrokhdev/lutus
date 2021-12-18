import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import {Table, Button} from "antd"
import Head from "next/head";
import DashBoardPres from "../../../mobx/presenters/DashBoardPres";
import StateView from "../../UI/StateView/StateView";
import Link from "next/link"
import {Tabs} from 'antd';

const {TabPane} = Tabs;

@inject("CoreStore")
@observer
class Dashboard extends Component {


    constructor(props) {
        super(props);
        this.store = new DashBoardPres()
    }

    componentDidMount() {
        this._getData()
    }

    _getData = () => {
        this.store.getDashBoardInfo();
        this.props.CoreStore.user.role === "translator" && this.store.getDashBoardTranslator()
    }

    _renderBtnStatus = (status) => {

        switch (status) {
            case "end_delivery_time" :
                return <span className={"reject-orderBtn"}>اتمام زمان حویل</span>
            case "awaiting_translator_accept_steps" :
                return <span className={"complete-orderBtn "}>در انتظار تایید پرداخت مرحله ای</span>
            case "translator_reject_steps" :
                return <span className={"orderBtn red-orderBtn"}>اعتراض به پرداخت مرحله ای</span>
            case "awaiting_translator_accept" :
                return <span className={"orderBtn doing-orderBtn   "}>در انتظار تائید مترجم</span>
            case "accept_detail" :
                return <span className={"orderBtn new-orderBtn   "}>در انتظار تائید </span>
            case "pending" :
                return <span className={"orderBtn doing-orderBtn   "}>در حال پردازش</span>
            case "readiness" :
                return <span className={"orderBtn select-orderBtn"}>انتخاب مترجم</span>
            case "in_progress" :
                return <span className={"orderBtn new-orderBtn  "}>درحال انجام</span>
            case "freelancer_readiness" :
                return <span className={"orderBtn doing-orderBtn   "}>درا نتظار پیشنهاد</span>
            case "awaiting_payment_suggestion" :
                return <span className={"orderBtn doing-orderBtn   "}>در انتظار پرداخت</span>
            case "confirm" :
                return <span className={"orderBtn new-orderBtn  "}>تایید شده</span>
            case "awaiting_payment" :
                return <span className={"orderBtn new-orderBtn  "}>منتظر پرداخت</span>
            case "complete" :
                return <span className={"orderBtn complete-orderBtn "}>تکمیل شده</span>
            case "cancel" :
                return <span className={"orderBtn red-orderBtn  "}>لغو شده</span>
            case "paid" :
                return <span className={"orderBtn paid-orderBtn  "}>پرداخت شده</span>
            case "modifying" :
                return <span className={"orderBtn red-orderBtn  "}>داری اصلاحات</span>

        }
    }


    render() {
        const {type_projects, translate_projects, translate_items, unread_messages} = this.store.view;
        const {role} = this.props.CoreStore.user;

        const dataSource = translate_items;
        const dataSourceTranslator = this.store.translatorOrder;

        const handleStatus = (status) => {
            switch (status) {
                case "system":
                    return <span className={"type-title"}>سیستمی</span>
                case "freelancer":
                    return <span className={"type-title"}>فریلنسری</span>
                case "dedicated":
                    return <span className={"type-title"}>اختصاصی</span>
                default:
                    return <span className={"type-title"}>سیستمی</span>
            }
        }

        const columns = [
            {
                title: 'نوع',
                dataIndex: 'project_type',
                align: "center",
                render: (type) => handleStatus(type)
            },
            {
                title: 'عنوان',
                dataIndex: 'title',
                align: "center",
                width: "20%"
            },
            {
                title: 'زمینه/خدمت',
                align: "center",
                dataIndex: 'field',
                render: (type, model) => {
                    return <div className={"d-flex flex-column"}>
                        <span>{type.title}</span>
                        <span>{model.service.title}</span>
                    </div>
                }
            },
            /*{
              title: 'خدمت',
              align: "center",
              dataIndex: 'service',
              render: (service) => {
                return <span>{service.title}</span>
              }
            },*/
            {
                title: 'تاریخ',
                dataIndex: 'created_at',
                align: "center"
            },
            {
                title: 'وضعیت',
                dataIndex: 'status',
                align: "center",
                render: (status) => this._renderBtnStatus(status)
            },
            {
                title: 'جزئیات',
                dataIndex: 'id',
                align: "center",
                render: (id) => {
                    return (<Link href={`/panel/projectViewUser/${id}`}><a>
                        <div className={"arrow-btn"} onClick={() => console.log(id)}>

                            <img src={"/static/images/arrow.svg"}/>
                        </div>
                    </a></Link>)
                }
            },
        ];

        let locale = {
            emptyText: <div className={"my-4"}><Link href={"/order"}><a>

                <p className={"mb-3 text-muted"}>سفارشی موجود نیست</p>
                <Button className={"login-btn p-3 mx-auto "}> ثبت سفارش جدید</Button>
            </a></Link></div>,
        };

        return (
            <>
                <Head>
                    <title>پیشخوان</title>
                </Head>
                <div className=" user-workSpace radius ">
                    <StateView state={this.store.stateView} errorButtonAction={this._getData}>
                        <div className="row  ">
                            <div className="col-sm-4 col-6 mb-2 mb-md-0  d-flex justify-content-center ">
                                <Link href={"/notification"}><a className={"w-100 "}>
                                    <div className="panel-information1 radius  ">
                                        <div className={'d-flex align-items-center justify-content-center'}>
                                            <div className={'icon-d'}>
                                                <img src={"/static/images/income.svg"} />
                                            </div>
                                            <div className="d-flex flex-column ">
                                                <span className={"white-boldtitle"}>{unread_messages} تیکت </span>
                                                <span className={"white-subtitle"}>پیام های خوانده نشده</span>
                                            </div>
                                        </div>
                                    </div>
                                </a></Link>
                            </div>
                            <div className="col-sm-4 col-6 mb-2 mb-md-0 d-flex justify-content-center ">
                                <Link href={"/panel/project"}><a className={"w-100"}>
                                    <div className="panel-information2  radius x  ">
                                        <div className={'d-flex align-items-center justify-content-center'}>
                                            <div className={'icon-d'}>
                                            <img src={"/static/images/translate-order.svg"} />
                                            </div>
                                            <div className="d-flex flex-column mx-2">
                                                <span className={"white-boldtitle"}>{type_projects} سفارش</span>
                                                <span className={"white-subtitle"}>کل سفارشات ترجمه</span>
                                            </div>
                                        </div>
                                    </div>
                                </a></Link>
                            </div>
                            <div className="col-sm-4 col-12 mb-2 mb-md-0 d-flex justify-content-center ">
                                <div
                                    className="panel-information3 radius row align-items-center justify-content-center ">
                                    <div className={'icon-d'}>
                                    <img src={"/static/images/type-order.svg"} />
                                    </div>
                                    <div className="d-flex flex-column mx-2">
                                        <span className={"white-boldtitle"}>{translate_projects} سفارش</span>
                                        <span className={"white-subtitle"}>کل سفارشات تایپ</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="user-panel radius my-3 ">
                            <Tabs defaultActiveKey="1">
                                {this.props.CoreStore.user.role === "translator" && <TabPane tab="پروژه های من" key="2">
                                    <div className=" my-3 ">
                                        <Table locale={locale} dataSource={dataSourceTranslator} columns={columns}
                                               pagination={false}/>
                                    </div>
                                </TabPane>}
                                <TabPane tab="سفارش های من" key="1">
                                    <div className=" my-3 ">
                                        <Table locale={locale} dataSource={dataSource} columns={columns}
                                               pagination={false}/>
                                    </div>
                                </TabPane>
                                <TabPane tab="پروژه های تایپ" key="3">
                                    <div className=" my-3 ">
                                        <Table locale={locale} columns={columns} pagination={false}/>
                                    </div>
                                </TabPane>

                            </Tabs>


                        </div>

                    </StateView>
                </div>
            </>
        );
    }
}

export default Dashboard;
