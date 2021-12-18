import React, {Component} from 'react';
import {observer,inject} from "mobx-react";
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
class Missing extends Component {

  constructor(props) {
    super(props);
    this.store = new TranslatorPres()
  }




  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.store.getMissProjectList()
  }

  _renderBtnStatus = (status) => {

    switch (status) {
      case "end_delivery_time" :
        return <span className={"orderBtn reject-orderBtn"}>اتمام زمان حویل</span>
      case "pending" :
        return <span className={"orderBtn doing-orderBtn   "}>در حال پردازش</span>
      case "readiness" :
        return <span className={"orderBtn select-orderBtn"}>اعلام آمادگی</span>
      case "in_progress" :
        return <span className={"orderBtn new-orderBtn  "}>درحال انجام</span>
      case "confirm" :
        return <span className={"orderBtn new-orderBtn  "}>تایید شده</span>
      case "awaiting_payment" :
        return <span className={"orderBtn new-orderBtn  "}>منتظر پرداخت</span>
      case "complete" :
        return <span className={"orderBtn complete-orderBtn  "}>تکمیل شده</span>
      case "cancel" :
        return <span className={"orderBtn red-orderBtn  "}>لغو شده</span>
      case "paid" :
        return <span className={"orderBtn paid-orderBtn  "}>پرداخت شده</span>
      case "modifying" :
        return <span className={"orderBtn red-orderBtn  "}>داری اصلاحات</span>

    }
  }


  render() {

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

    const dataSource = this.store.projectsList;

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
        width:"20%"
      },
      {
        title: 'زمینه',
        align: "center",
        dataIndex: 'field',
        render: (type) => {
          return <span >{type.title}</span>
        }
      },
      {
        title: 'خدمت',
        align: "center",
        dataIndex: 'service',
        render: (service) => {
          return <span >{service.title}</span>
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
        render: (status) => this._renderBtnStatus(status)
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
          <title>پروژه های از دست رفته</title>
        </Head>
        <div className=" user-panel user-workSpace radius ">
          <StateView state={this.store.stateView} errorButtonAction={this._getData}>
            <div className="row px-5 justify-content-start">
              <h3 className={"title-page"}>پروژه های از دست رفته</h3>
            </div>
            <div className="p-3 ">
              <Table locale={this.store.certificate ? locale : ""} dataSource={dataSource} columns={columns} pagination={false}/>
            </div>
          </StateView>
        </div>
      </>
    );
  }
}

export default withRouter(Missing);


