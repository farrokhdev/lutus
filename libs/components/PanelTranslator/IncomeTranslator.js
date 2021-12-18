import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import {Divider, InputNumber, Table, Tabs, Button, Form} from "antd";
import Head from "next/head";
import WalletPres from "../../mobx/presenters/WalletPres";
import StateView from "../UI/StateView/StateView";
import Link from "next/link";
import Forbidden from "../UI/Forbidden";

const {TabPane} = Tabs;

@inject("CoreStore")
@observer
class IncomeTranslator extends Component {

  constructor(props) {
    super(props);
    this.store = new WalletPres();
    this.formRef = React.createRef();
  }

  state = {
    pay: "",
    payment: "",
    edit: true,
  }

  componentDidMount() {
    this._getData()
  }


  _getData = () => {
    this.store.getIncomeList()
  }


  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }


  handleNextPage = (page) => {
    this.store.getIncomeList({page})
  }





  _renderFinanceList = () => {

    const dataSource = this.store.incomeList.items

    const columns = [
      {
        title: 'تاریخ',
        dataIndex: 'created_at',
        align: "center"
      },
      {
        title: 'مبلغ',
        dataIndex: 'amount',
        align: "center",
        render: (amount) => (<span>{this.formatNumber(amount)} تومان </span>)

      },
      {
        title: 'بابت پروژه',
        align: "center",
        render: (item) => <Link href={`/panel/projectViewTranslator/${item.order_id}`}><a className={"text-primary"}>{item.order_title}</a></Link>
      }
    ];
    return (<>


      <Table dataSource={dataSource} columns={columns}
             pagination={{
               position: ["bottomCenter"],
               page: this.store.incomeList.page,
               hideOnSinglePage: true,
               current: this.store.incomeList.page,
               total: this.store.incomeList.total,
               pageSize: this.store.incomeList.pagesize,
               onChange: this.handleNextPage
             }}/>

    </>)
  }


  render() {


    return (
      <>
        <Head>
          <title>درآمدها</title>
        </Head>
        <div className="user-panel radius">
          <div className="d-flex justify-content-between align-items-center">
            <div className="">
              <h3 className={"mb-0 title-page"}>درآمدها</h3>
            </div>
            <div className="">
              <div className="btn-success px-3 py-1 radius">
                <span> درآمد شما: </span>
                <span>{this.formatNumber(this.store.incomeList.sum)} تومان </span>
              </div>
            </div>
          </div>
              <hr/>
          <div className="user-workSpace radius ">
            <StateView state={this.store.stateView} errorButtonAction={this._getData}>
                {this.store.certificate ? <Forbidden/>: this._renderFinanceList()}
            </StateView>
          </div>
        </div>
      </>
    );
  }

}

export default IncomeTranslator;




