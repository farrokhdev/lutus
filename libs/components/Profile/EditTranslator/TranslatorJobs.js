import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import {Card,Table, Modal, Result, Form, Button} from "antd";
import FormBuilder from 'antd-form-builder';
import StateView from "../../UI/StateView/StateView";
import JobsPres from "../../../mobx/presenters/JobsPres";
import {DeleteOutlined} from "@ant-design/icons";
import {DatePicker as DatePickerJalali} from "antd-jalali";
import moment from "moment";

@inject("CoreStore")
@observer
class TranslatorInfo extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.store = new JobsPres()
    try {
      FormBuilder.defineWidget('date-picker-jalali', DatePickerJalali);
    } catch {

    }
  }

  state = {visible: false,addJob: false, id: ''}


  componentDidMount() {
    this._getData()
  }


  _getData = () => {
    this.store.getJobsList()
  }


  _handleDeleteLanguage = () => {
    this.store.getDeleteJob({id: this.state.id}, this.callBack)
  }

  callBack = () => {
    this.store.jobsList = this.store.jobsList.filter(item => item.id !== this.state.id)
    this.setState({visible: false})
  }


  addNewJob=(e)=>{
    const data=e
    data.year_from=moment(e.year_from.$d).locale("de").format("YYYY-MM-DD")
    data.year_to=moment(e.year_to.$d).locale("de").format("YYYY-MM-DD")

    this.store.getAddJob(data,this.callBackAdd)
  }

  callBackAdd=()=>{
    this.setState({addJob:false})
  }

  handleStatus=(status)=>{

    switch (status) {
      case "pending":
        return <span className={"text-primary"}>درحال بررسی</span>
      case "active":
        return <span className={"text-success"}>تایید شده</span>
      case "reject":
        return <span className={"text-danger"}>رد شده</span>

    }
  }

  render() {

    const dataSource = this.store.jobsList

    const columns = [
      {
        title: 'عنوان',
        dataIndex: 'title',
      },
      {
        title: 'نام شرکت',
        dataIndex: 'company',

      },
      {
        title: 'تاریخ شروع',
        dataIndex: 'year_from',
      },
      {
        title: 'تاریخ خاتمه',
        dataIndex: 'year_to',
      },
      {title: ' وضعیت', align: 'center', dataIndex: 'status',render:(status)=>this.handleStatus(status)},
      {
        title: 'حذف',
        align: 'center',
        render: (item) => {
          return <DeleteOutlined style={{fontSize: "18px"}} className={"cursor"} onClick={() => {
            this.setState({visible: true, id: item.id})
          }}/>
        }
      },
    ]
    const meta = {
      formItemLayout: null,
      columns: 2,
      fields: [
        {key: 'title', label: "عنوان", placeholder: "عنوان", colSpan: 1, required: true},
        {key: 'company', label: "نام شرکت", placeholder: "نام شرکت", colSpan: 1, required: true},
        {key: 'year_from', label: "تاریخ شروع", colSpan: 1, required: true,widget: 'date-picker-jalali',},
        {key: 'year_to', label: "تاریخ خاتمه", colSpan: 1, required: true,widget: 'date-picker-jalali',},

        {key: 'description', label: "توضیحات", placeholder: "توضیحات", colSpan: 2,widget:"textarea", required: true},
      ]
    }
    return (
      <>

        <Card title={"ویرایش اطلاعات شغلی"} className="radius my-3" extra={<Button className={'radius btn-primary'} onClick={()=>this.setState({addJob:true})}>اضافه کردن شغل</Button>}>
          <StateView errorButtonAction={this._getData} state={this.store.stateView}>
            <div className={" user-workSpace"}>
              <Table dataSource={dataSource} columns={columns} pagination={false}/>
            </div>
          </StateView>
        </Card>

        <Modal footer={null} visible={this.state.visible} title={"حذف سابقه شغلی"}
               onCancel={() => this.setState({visible: false})}>
          <Result
            status="warning"
            title="آیا ازحذف سابقه شغلی مطمئن هستید؟"
            extra={[
              <div className={"d-flex justify-content-center"}>
                <Button className={"ok-btn mx-2 w-50"} loading={this.store.loading}
                        onClick={this._handleDeleteLanguage}>تایید</Button>
                <Button className={"cancel-btn  mx-2 w-50"}
                        onClick={() => this.setState({visible: false, status: ''})}>لغو</Button>
              </div>
            ]}/>
        </Modal>

        <Modal visible={this.state.addJob} title={"اضافه کردن سابقه شغلی"} width={800}
               onOk={() => this.formRef.current.submit()}
               onCancel={() => this.setState({addJob: false})}>
          <Form ref={this.formRef} layout="vertical" onFinish={this.addNewJob}>

            <FormBuilder meta={meta} form={this.formRef} />

          </Form>
        </Modal>
      </>
    );
  }
}

export default TranslatorInfo;