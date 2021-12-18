import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Image, Spin, Button, Form} from "antd";
import {withRouter} from 'next/router';
import TicketPres from "../../mobx/presenters/TicketPres";
import FormBuilder from 'antd-form-builder'
import Head from "next/head";
import NewEditor from "../Editor/NewEditor";


@observer
class TicketAdd extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef()
    this.store = new TicketPres()
  }

  state = {
    content: {
      text: ''
    }
  }

  handleAddTicket = (data) => {
    data.file = this.store.file
    data.message = this.store.content.text
    this.store.getAddTicket(data)
  }

  handleUpload = (e) => {
    this.store.errMsg = ""
    return
    const formData = new FormData()
    formData.append('file', e.target.files[0]);
    this.store.getUploadTicket(formData, this.CallBackUpload)
  }

  CallBackUpload = (data) => {
    console.log(data)
  }

  handleDeleteUploadFile = () => {
    this.store.file = ""
  }

  _uploadBox = () => {
    return (<div className={"d-flex flex-column w-50"}>

      <div className="cursor">


        <div className="uploadReply">
          <input className="file-reply" type='file' onChange={this.handleUpload}/>
          <div className="drag-text">
            <span>انتخاب فایل</span>
          </div>
        </div>

        <div className="my-3">
          <span className={"err-title"}>{this.store.errMsg}</span>
        </div>


      </div>

      <Spin size="large" spinning={this.store.uploadLoad} tip={"در حال آپلود"}/>

      {this.store.file && <div className={""}>


        <div className="d-flex align-items-center my-2">
          <img className={"mx-2 cursor"} src={"/static/images/x.svg"} width={14}
               onClick={this.handleDeleteUploadFile}/>

          <h6 className={"text-success my-2 d-flex justify-content-center"}>فایل شما با موفقیت آپلود شد</h6>
        </div>

      </div>}

    </div>)
  }

  render() {
    const options = [
      {value: 'support', label: 'پشتیبانی'},
      {value: 'financial', label: 'بخش مالی'},
      {value: 'criticism', label: 'انتقادات'},
      {value: 'suggestion', label: 'پشتیبانی'},
    ]
    const meta = {
      formItemLayout: null,
      columns: 2,
      fields: [
        {
          key: 'department',
          label: "بخش",
          widget: 'select',
          placeholder: "بخش خود را انتخاب کنید",
          colSpan: 1,
          required: true,
          options
        },
        {
          key: 'subject',
          label: "موضوع",
          placeholder: "موضوع خود را بنویسید",
          colSpan: 1,
          required: true
        },
        {
          key: 'message',
          label: "پیام ",
          // widget: 'textarea',
          widgetProps: {rows: 3},
          placeholder: "پیام خود را بنویسید",
          colSpan: 2,
          // required: true,
          widget: ()=><NewEditor content_text={this.store.content}/>
        },
      ]
    }
    console.log(this.store.errMsg, this.store.uploadLoad, this.store.file)
    return (
      <>
        <Head>
          <title>افزودن تیکت</title>
        </Head>
        <div className="user-panel radius">

          <div className="">

            <div className="mb-3">
              <h3 className={"title-page"}>ابجاد تیکت جدید</h3>
              <hr/>
            </div>
            <div className="mx-5">
              <Form
                ref={this.formRef}
                layout="vertical"
                onFinish={this.handleAddTicket}
              >
                <FormBuilder meta={meta} form={this.formRef}/>
                <div className="d-flex justify-content-between">
                  {this._uploadBox()}
                  <Button loading={this.store.loading} htmlType="submit"
                          className={"login-btn w-25 "}>ارسال تیکت</Button>
                </div>
              </Form>
            </div>
          </div>

        </div>
      </>
    );
  }
}

export default withRouter(TicketAdd);