import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import {Table, Button} from "antd"
import Link from "next/link"
import {withRouter} from 'next/router'
import Layout from "../../../../libs/components/UI/Layout";
import PanelSideBar from "../../../../libs/components/PanelUser/PanelSideBar";
import StateView from "../../../../libs/components/UI/StateView/StateView";
import TranslatorPres from "../../../../libs/mobx/presenters/TranslatorPres";
import Head from "next/head";
import Forbidden from "../../UI/Forbidden";

@inject("CoreStore")
@observer
class TranslatorTranslate extends Component {

  constructor(props) {
    super(props);
    this.store = new TranslatorPres()
  }

  state={
    status:''
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (nextProps.router.query.status !== this.props.router.query.status) {
      this.setState({status: nextProps.router.query.status})
      this._getData(nextProps.router.query.status)
    }
  }

  componentDidMount() {
    this._getData(this.props.router.query.status)
  }

  _getData = (status) => {
    this.store.getProjectList({status})
  }

  _renderBtnStatus = (status,item) => {

    switch (status) {
      case "end_delivery_time" :
        return <span className={"orderBtn reject-orderBtn"}>اتمام زمان حویل</span>
      case "awaiting_translator_accept" :
        return <span className={"orderBtn doing-orderBtn   "}>در انتظار تائید مترجم</span>
      case "pending" :
        return <span className={"orderBtn doing-orderBtn   "}>در حال پردازش</span>
      case "freelancer_readiness" :
        return <span className={"orderBtn doing-orderBtn   "}>ارسال پیشنهاد</span>
      case "awaiting_payment_suggestion" :
        return <span className={"orderBtn doing-orderBtn   "}>در انتظار پرداخت</span>
      case "readiness" :
         if(item.suggestion){ return <span className={"orderBtn select-orderBtn"}>اعلام آمادگی شده</span>}else {
           return <span className={"orderBtn new-orderBtn  "}>ارسال پیشنهاد</span>
         }
      case "in_progress" :
        return <span className={"orderBtn new-orderBtn  "}>درحال انجام</span>
      case "ended" :
        return <span className={"orderBtn select-orderBtn"}>در انتظار تائید</span>
      case "protest" :
        return <span className={"orderBtn red-orderBtn"}>اعتراض</span>
      case "confirm" :
        return <span className={"orderBtn new-orderBtn  "}>تایید شده</span>
      case "awaiting_payment" :
        return <span className={"orderBtn new-orderBtn  "}>منتظر پرداخت</span>
      case "complete" :
        return <span className={"orderBtn complete-orderBtn "}>تکمیل شده</span>
      case "awaiting_translator_accept_steps" :
        return <span className={"orderBtn complete-orderBtn "}>در انتظار تایید پرداخت مرحله ای</span>
      case "translator_reject_steps" :
        return <span className={"orderBtn red-orderBtn"}>اعتراض به پرداخت مرحله ای</span>
      case "cancel" :
        return <span className={"orderBtn red-orderBtn  "}>لغو شده</span>
      case "paid" :
        return <span className={"orderBtn paid-orderBtn  "}>پرداخت شده</span>
      case "modifying" :
        return <span className={"orderBtn red-orderBtn  "}>داری اصلاحات</span>

    }
  }


  handleNextPage = (page) => {
    this.store.getProjectList({status: this.state.status, page})
  }

  _renderTitle = () => {

    switch (this.props.router.query.status) {
      case "":
        return "پروژه فعال"
      case "complete":
        return "پروژه های انجام شده"
      case "in_progress":
        return "پروژه های در حال انجام"
      default:
        return "پروژه فعال"
    }
  }

  render() {

    const dataSource = this.store.projectsList;
    const handleStatus = (status) => {
      switch (status) {
        case "system":
          return<span className={"type-title"}>سیستمی</span>
        case "freelancer":
          return<span className={"type-title"}>فریلنسری</span>
        case "dedicated":
          return<span className={"type-title"}>اختصاصی</span>
        default:
          return<span className={"type-title"}>سیستمی</span>
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
        title: 'زمینه',
        align: "center",
        dataIndex: 'field',
        render: (type) => {
          return <span>{type.title}</span>
        }
      },
      {
        title: 'خدمت',
        align: "center",
        dataIndex: 'service',
        render: (service) => {
          return <span>{service.title}</span>
        }
      },
      {
        title: 'تاریخ',
        dataIndex: 'created_at',
        align: "center"
      },
      {
        title: 'وضعیت',
        dataIndex: 'status',
        align: "center",
        render: (status,item) => this._renderBtnStatus(status,item)
      },
      {
        title: 'جزئیات',
        dataIndex: 'id',
        align: "center",
        render: (id) => {
          return (<Link href={`/panel/projectViewTranslator/${id}`}><a>
            <div className={"arrow-btn"} onClick={() => console.log(id)}>

              <img src={"/static/images/arrow.svg"}/>
            </div>
          </a></Link>)
        }
      },
    ];

    let locale = {
      emptyText:  <Forbidden/>,
    };

    return (
      <>
        <Head>
          <title>{this._renderTitle()}</title>
        </Head>
        <div className="user-panel user-workSpace radius">
          <StateView state={this.store.stateView} errorButtonAction={this._getData}>
            <div className="row px-5 justify-content-start">
              <h3 className={"title-page"}>{this._renderTitle()}</h3>
            </div>
            <div className="p-3 ">

              <Table locale={this.store.certificate ? locale : ""} dataSource={dataSource} columns={columns}
                     pagination={{
                position: ["bottomCenter"],
                page: this.store.page,
                hideOnSinglePage: true,
                current: this.store.page,
                total: this.store.total,
                pageSize: this.store.pagesize,
                onChange: this.handleNextPage
              }}/>
            </div>
          </StateView>
        </div>
      </>
    );
  }
}

export default withRouter(TranslatorTranslate);


