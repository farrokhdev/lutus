import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Table, Button} from "antd"
import Link from "next/link"
import {withRouter} from 'next/router'
import PanelPres from "../../../../libs/mobx/presenters/PanelPres";
import StateView from "../../../../libs/components/UI/StateView/StateView";
import PanelSideBar from "../../../../libs/components/PanelUser/PanelSideBar";
import Layout from "../../../../libs/components/UI/Layout";


@observer
class Type extends Component {

  constructor(props) {
    super(props);
    this.store = new PanelPres()
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.store.getOrderList()
  }


  _renderBtnStatus = (status) => {

    switch (status) {
      case "end_delivery_time" :
        return <span className={"reject-orderBtn"}>اتمام زمان حویل</span>
      case "pending" :
        return <span className={"doing-orderBtn   "}>در حال پردازش</span>
      case "readiness" :
        return <span className={"select-orderBtn"}>انتخاب مترجم</span>
      case "in_progress" :
        return <span className={"new-orderBtn  "}>درحال انجام</span>
      case "confirm" :
        return <span className={"new-orderBtn  "}>تایید شده</span>
      case "awaiting_payment" :
        return <span className={"new-orderBtn  "}>منتظر پرداخت</span>
      case "complete" :
        return <span className={"complete-orderBtn  "}>تکمیل شده</span>
      case "cancel" :
        return <span className={"red-orderBtn  "}>لغو شده</span>
      case "paid" :
        return <span className={"paid-orderBtn  "}>پرداخت شده</span>
      case "modifying" :
        return <span className={"red-orderBtn  "}>داری اصلاحات</span>

    }
  }

  render() {

    const dataSource = this.store.projectsList;

    const columns = [
      {
        title: 'نوع',
        dataIndex: 'project_type',
        align: "center",
        render: (type) => {
          return (type === "system" ? <span className={"pink-title"}>سیستمی</span> :
            <span className={"pink-title"}>فریلنسری</span>)
        }
      },
      {
        title: 'عنوان',
        dataIndex: 'title',
        align: "center",
        // render: (type) => {
        //   return (type === "system" ? <span className={""}>تایپ</span> : <span className={""}>ترجمه</span>)
        // }
      },
      {
        title: 'تاریخ',
        dataIndex: 'created_at',
        align: "center"
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
          return (<Link href={`/project/view/${id}`}><a>
            <div className={"arrow-btn"} onClick={() => console.log(id)}>

              <img src={"/static/images/arrow.svg"}/>
            </div>
          </a></Link>)
        }
      },
    ];

    return (
      <>
        <Layout>
          <section>
            <div className="container">
              <div className="row">
                <div className="col-3"><PanelSideBar/></div>
                <div className="col-9">
                  <div className="user-workSpace radius my-5">
                    <StateView state={this.store.stateView} errorButtonAction={this._getData}>
                      <div className="row px-5 justify-content-start">
                        <span>پروژه ها</span>
                      </div>
                      <div className="p-3 ">
                        <Table dataSource={dataSource} columns={columns} pagination={false}/>
                      </div>
                    </StateView>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </>
    );
  }
}

export default withRouter(Type);


