import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Card,message, Button, Modal, Result, Input, Empty} from "antd";
import login from "../../../../pages/login";


const {TextArea} = Input

@observer
class UserProjectEnded extends Component {

  state = {
    confirmVision: false,
    protestVision: false,
    title: "",
    description: "",
  }

  _getConfirmProjectUser = (id) => {
    this.props.store.confirmStepProject({order_id: id},this.props.getData)
  }

  protestProject = (id) => {
    const data = {}
    data.order_id = id
    data.title = this.state.title
    data.comment = this.state.description
    if (!data.title || !data.comment) {
      message.error("لطفا تمام فیلد ها را پر کنید")
    } else {
      this.props.store.protestProjectUser(data, this.callBack)
    }

  }


  callBack = () => {
    this.setState({protestVision: false,})
  }

  getFile = ({id}, order_id) => {
    const data = {}
    data.id = id
    data.order_id = order_id
    this.props.store.downloadOrderFileUser(data)
  }

  render() {
    const {projectView} = this.props.store
    return (
      <div>
        <Card title={"اتمام پروژه"} className="radius mb-3">

          <div className="py-3">
            <h4 className={"text-success text-center "}>تبریک پروژه شما با موفیقت انجام شد</h4>
          </div>

          <div className="p-3">

            <h6 className={"text-muted"}> لطفا ابتدا فایل را دریافت کنید و با دقت بررسی نمایید</h6>
            <h6 className={"text-muted"}>اگر متن شما نیاز به اصلاح داشت از ارسال به مترجم اقدام نمایید</h6>
            <h6 className={"text-muted"}>اگر متن ترجمه شده شما مورد تائید نیست و فکر میکنید امکان توافق با مترجم نیست از
              طریق دکمه اعتراض اقدام کنید</h6>

            <div className="d-flex justify-content-center mt-5">

              <Button onClick={() => this.setState({confirmVision: true})} className={"login-btn w-25 mx-2"}>قبول
                پروژه</Button>

              <Button onClick={() => this.setState({protestVision: true})} className={"buy-btn w-25 mx-2 "}>به ترجمه
                اعتراض دارم</Button>

            </div>
          </div>
        </Card>

        <Modal visible={this.state.confirmVision} onCancel={() => this.setState({confirmVision: false})}
               footer={null}>
          <Result
            status="success"
            title="آیا از اتمام پروژه مطمئن هستید؟"
            extra={[
              <div className={"d-flex justify-content-center"}>
                <Button loading={this.props.store.loading} className={"ok-btn mx-2 w-50"}
                        onClick={() => this._getConfirmProjectUser(projectView.id)}>تایید</Button>
                <Button className={"cancel-btn  mx-2 w-50"}
                        onClick={() => this.setState({confirmVision: false})}>لغو</Button>
              </div>
            ]}
          />
        </Modal>

        <Modal visible={this.state.protestVision} title={"اعتراض به ترجمه"}
               onCancel={() => this.setState({protestVision: false})} footer={null}>

          <h6 className={"text-muted"}> لطفا ابتدا فایل را دریافت کنید و با دقت بررسی نمایید</h6>
          <h6 className={"text-muted"}>اگر متن شما نیاز به اصلاح داشت از ارسال به مترجم اقدام نمایید</h6>
          <h6 className={"text-muted"}>اگر متن ترجمه شده شما مورد تائید نیست و فکر میکنید امکان توافق با مترجم نیست از
            طریق دکمه اعتراض اقدام کنید</h6>
          <div className="p-3">
            <h6>عنوان اعتراض</h6>
            <Input onChange={(e) => this.setState({title: e.target.value})}/>
          </div>
          <div className="p-3">
            <h6>توضیحات اعتراض</h6>
            <TextArea rows={6} onChange={(e) => this.setState({description: e.target.value})}/>
          </div>
          <div className={"d-flex justify-content-center my-4"}>
            <Button loading={this.props.store.loading} className={"ok-btn mx-2 w-50"}
                    onClick={() => this.protestProject(projectView.id)}>تایید</Button>
            <Button className={"cancel-btn  mx-2 w-50"}
                    onClick={() => this.setState({protestVision: false})}>لغو</Button>
          </div>
        </Modal>

      </div>
    );
  }
}

export default UserProjectEnded;