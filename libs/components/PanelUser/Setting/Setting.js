import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import {message, Button, Modal, Switch, Table} from "antd";
import SettingPres from "../../../mobx/presenters/SettingPres";
import StateView from "../../UI/StateView/StateView";
import Router from 'next/router';
import Head from "next/head";

@inject("CoreStore")
@observer
class Setting extends Component {

  constructor(props) {
    super(props);
    this.store = new SettingPres()
  }

  state = {
    visible: false
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.store.getBalanceUser()
    this.store.getSettingList()
  }

  handleChangeItem = (status, model, type, index) => {
    const data = {}
    data.type = type
    data.key = model.key
    if (status === "lock") {
      this.setState({visible: true});
    } else {
      this.store.settingList[index].loading[type] = true
      this.store.getSettingItem(data, (res) => this.callBack(res, index))
    }

  }

  callBack = (res, index) => {
    this.store.settingList[index].loading[res.data.type] = false
    this.store.settingList[index][res.data.type] = res.data.value
  }

  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  handleActivity = (condition) => {
    if (condition) {
      this.store.getActiveSms({accept: 1}, this.callBackActive)
    } else {
      Router.push("/finance")
    }
  }

  callBackActive = (res) => {
    this.setState({visible: false})
    message.success(res.data.message)
  }

  render() {
    const {settingList, sms_subscribe_amount} = this.store
    const dataSource = settingList
    const columns = [
      {
        title: 'عنوان',
        dataIndex: 'title',
        width: "50%",
      },
      {
        title: 'ایمیل',
        dataIndex: 'email',
        render: (email, item, index) => {
          return <Switch checked={email === 1 ? true : false} loading={item.loading.email}
                         onChange={() => this.handleChangeItem(email, item, "email", index)}/>
        }
      },
      {
        title: 'پیامک',
        dataIndex: 'sms',
        render: (sms, item, index) => {
          return <Switch checked={sms === 1 ? true : false} loading={item.loading.sms}
                         onChange={() => this.handleChangeItem(sms, item, "sms", index)}/>
        }
      },
      {
        title: ' اطلاع رسانی داخلی',
        dataIndex: 'message',
        align: 'center',
        render: () => {
          return <Switch disabled defaultChecked/>
        }
      },
    ];
    console.log(settingList.map(i => (i.email, i.sms, i.loading)))

    return (
      <>
        <Head>
          <title>تنظیمات</title>
        </Head>
        <div className="user-panel radius table-responsive user-workSpace ">
          <div className="mb-3">
            <h3 className={"title-page"}>تنظیمات</h3>
            <hr/>
          </div>
          <StateView state={this.store.stateView} errorButtonAction={this._getData}>
            <Table dataSource={dataSource} columns={columns} pagination={false}/>
          </StateView>
        </div>


        <Modal visible={this.state.visible} onCancel={() => this.setState({visible: false})} footer={null}
               title={"اطلاع رسانی از طریق پیامک اکنون برای شما غیرفعال است."}>
          <div className="p-3">
            <div className="mb-2">
              <span>    جهت فعالسازی آن برای یک بازه 90 روزه؛ لازم است هزینه آن را بپردازید.</span>
            </div>

            <div className="d-flex align-items-center justify-content-around my-4">
              <h5>میزان دارایی شما</h5>
              <h5 className={""}>{this.formatNumber(this.store.wallet)} تومان </h5>
            </div>
            {sms_subscribe_amount < this.store.wallet ?
              <span>شما اعتبار کافی برای فعال سازی سرویس پیام کوتاه را دارید، برای فعال سازی کلیک کنید</span>
              :
              <span>ابتدا اعتبار خود را به میزان لازم افزایش دهید و سپس با مراجعه به همین صفحه اطلاع رسانی پیامکی خود را فعال کنید.</span>}

            <div className={"d-flex justify-content-center mt-5"}>
              <Button className={"ok-btn mx-2 w-50"} loading={this.store.loading}
                      onClick={() => this.handleActivity(sms_subscribe_amount < this.store.wallet)}>فعال
                سازی</Button>
              <Button className={"cancel-btn  mx-2 w-50"} onClick={() => this.setState({visible: false})}>لغو</Button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default Setting;