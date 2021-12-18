import React, {Component} from 'react';
import {observer} from "mobx-react";
import TicketPres from "../../../mobx/presenters/TicketPres";
import StateView from "../../UI/StateView/StateView";
import Link from "next/link";
import {Table, Rate, Tag, Button, Avatar, Pagination} from "antd"
import Head from "next/head";

@observer
class Support extends Component {

  constructor(props) {
    super(props);
    this.store = new TicketPres()
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.store.getTicketList()
  }

  handleNextPage = (page) => {
    this.store.getTicketList({page})
  }

  handleDepartment = (status) => {
    switch (status) {
      case 'support':
        return <span className="pink-title">پشتیبانی</span>
      case 'financial':
        return <span className="pink-title">مالی</span>
      case 'criticism':
        return <span className="pink-title">انتقادات</span>
      case 'suggestion':
        return <span className="pink-title">پیشنهادات</span>
    }
  }

  handleStatus = (status) => {
    switch (status) {
      case 'open':
        return <span className="">باز</span>
      case 'closed':
        return <span className="">بسته شده</span>
      case 'pending':
        return <span className="btn-success p-2 radius">در حال بررسی</span>
      case 'under_consideration':
        return <span className="btn-info p-2 radius">تحت نظر</span>
      case 'processing':
        return <span className="btn-primary p-2 radius">در حال پردازش</span>
      case 'customer response':
        return <span className="btn-info p-2 radius">پاسخ مشتری</span>
      case 'admin response':
        return <span className="btn-danger p-2 radius">پاسخ ادمین</span>
    }
  }

  render() {
    const dataSource = this.store.ticketList;
    const columns = [
      {
        title: 'قسمت',
        dataIndex: 'department',
        align: "center",
        render: (type) => this.handleDepartment(type)
      },
      {
        title: 'موضوع',
        dataIndex: 'subject',
        align: "center",

      },
      {
        title: 'شماره پیام',
        align: "center",
        dataIndex: 'ticket_number',
        width: "15%"
      },
      {
        title: 'وضعیت',
        align: "center",
        dataIndex: 'status',
        width: "15  %",
        render: (status) => this.handleStatus(status)

      },
      {
        title: 'جزئیات',
        dataIndex: 'id',
        align: "center",

        render: (id) => {
          return (<Link href={`/panel/supportView/${id}`}><a>
            <div className={"arrow-btn"}>
              <img src={"/static/images/arrow.svg"}/>
            </div>
          </a></Link>)
        }
      },
    ];
    return (
      <>
        <Head>
          <title>پشتیبانی</title>
        </Head>
        <div className="user-panel radius">
          <div className="mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="">
                <h3 className={"title-page"}>لیست تیکت ها</h3>
              </div>
              <div className="">
                <Link href={'/panel/addTicket'}><a>
                  <Button type={"primary"} className={"radius"}>ایجاد تیکت +</Button>
                </a></Link>
              </div>
            </div>
            <hr/>
          </div>
          <StateView state={this.store.stateView} errorButtonAction={this._getData}>
            <div className="user-workSpace">
              <Table dataSource={dataSource} columns={columns} pagination={{
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

export default Support;