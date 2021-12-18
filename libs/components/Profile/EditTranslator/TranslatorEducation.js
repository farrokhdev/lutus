import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import {Spin,Card,Table, Modal, Result, Form, Button} from "antd";
import FormBuilder from 'antd-form-builder';
import StateView from "../../UI/StateView/StateView";
import {DeleteOutlined} from "@ant-design/icons";
import moment from "moment";
import EducationPres from "../../../mobx/presenters/EducationPres";
import {DatePicker as DatePickerJalali} from "antd-jalali";

@inject("CoreStore")
@observer
class TranslatorEducation extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.store = new EducationPres()
    try {
      FormBuilder.defineWidget('date-picker-jalali', DatePickerJalali);
    } catch {
    }
  }

  state = {
    visible: false,
    addEducation: false,
    id: ''}


  componentDidMount() {
    this._getData()
  }


  _getData = () => {
    this.store.getEducationList()
  }


  _handleDeleteEducation = () => {
    this.store.getDeleteEdu({id: this.state.id}, this.callBack)
  }

  callBack = () => {
    this.store.educationList = this.store.educationList.filter(item => item.id !== this.state.id)
    this.setState({visible: false})
  }


  addNewEducation=(e)=>{
    const data=e


    const year_from = moment(e.year_from.$d).locale("de").format("YYYY-MM-DD");
    const year_to = moment(e.year_to.$d).locale("de").format("YYYY-MM-DD");

    console.log(year_from)
    console.log(year_to)



    data.year_from=year_from
    data.year_to=year_to

    data.file=this.store.file
    this.store.getEducationAdd(data,this.callBackAdd)
  }

  callBackAdd=()=>{
    this.setState({addEducation:false})
  }

  handleUpload=(e)=>{
    this.store.error="";
    const formData = new FormData()
    formData.append('file', e.target.files[0]);
    this.store.getEducationUpload(formData)
  }

  uploadFile=()=> {
    return( <div className={"d-flex flex-column justify-content-center"}>

      <Spin size="large" spinning={this.store.loading} tip={"در حال آپلود"}/>

      {this.store.file && <div className={"d-flex flex-column justify-content-center align-items-center"}>


               <h6 className={"text-success my-2 d-flex justify-content-center"}>فایل شما با موفقیت آپلود شد</h6>

      </div>}

      <div className="d-flex flex-column justify-content-center align-items-center">


        <div className="image-upload-profile btn-primary">
          <input className="file-upload-input" type='file' onChange={this.handleUpload}/>
          <div className="drag-text">
            <span>انتخاب فایل</span>
          </div>
        </div>

        <div className="my-3">
          <span className={"err-title"}>{this.store.error}</span>
        </div>


      </div>

    </div>)
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

    const options=[
      {value:'زیر دیپلم',key:'زیر دیپلم',label:'زیر دیپلم'},
      {value:'دیپلم',key:'دیپلم',label:'دیپلم'},
      {value:'کاردانی',key:'کاردانی',label:'کاردانی'},
      {value:'کارشناسی',key:'کارشناسی',label:'کارشناسی'},
      {value:'کارشناسی ارشد',key:'کارشناسی ارشد',label:'کارشناسی ارشد'},
      {value:'دکتری',key:'دکتری',label:'دکتری'},
    ]

    const dataSource = this.store.educationList

    const columns = [
      {
        title: 'عنوان',
        dataIndex: 'title_field_study',
      },
      {
        title: 'نام دانشگاه',
        dataIndex: 'name_university',

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
        {key: 'title_field_study', label: "عنوان", placeholder: "عنوان", colSpan: 1, required: true},
        {key: 'name_university', label: "نام دانشگاه", placeholder: "نام شرکت", colSpan: 1, required: true},
        {key: 'year_from', label: "تاریخ شروع", colSpan: 1, required: true,widget: 'date-picker-jalali',},
        {key: 'year_to', label: "تاریخ خاتمه", colSpan: 1, required: true,widget: 'date-picker-jalali',},
        {key: 'grade', label: "مقطع تحصیلی", colSpan: 1, required: true,widget: 'select',options:options},
        {key: 'upload', label: "فایل", colSpan: 2,widget:()=> this.uploadFile()},
        {key: 'description', label: "توضیحات", placeholder: "توضیحات", colSpan: 2,widget:"textarea"},
      ]
    }

    return (
      <>

        <Card title={"ویرایش اطلاعات تحصیلی"} className="radius my-3" extra={<Button className={'radius btn-primary'} onClick={()=>this.setState({addEducation:true})}> اطلاعات تحصیلی جدید</Button>}>
          <StateView errorButtonAction={this._getData} state={this.store.stateView}>
            <div className={"user-workSpace"}>
              <Table dataSource={dataSource} columns={columns} pagination={false}/>
            </div>
          </StateView>
        </Card>

        <Modal footer={null} visible={this.state.visible} title={"حذف اطلاعات تحصیلی"}
               onCancel={() => this.setState({visible: false})}>
          <Result
            status="warning"
            title="آیا ازاطلاعات تحصیلی شغلی مطمئن هستید؟"
            extra={[
              <div className={"d-flex justify-content-center"}>
                <Button className={"ok-btn mx-2 w-50"} loading={this.store.loading}
                        onClick={this._handleDeleteEducation}>تایید</Button>
                <Button className={"cancel-btn  mx-2 w-50"}
                        onClick={() => this.setState({visible: false, status: ''})}>لغو</Button>
              </div>
            ]}/>
        </Modal>

        <Modal visible={this.state.addEducation} title={"اضافه کردن اطلاعات تحصیلی"} width={800}
               onOk={() => this.formRef.current.submit()}
               onCancel={() => this.setState({addEducation: false})}>

          <Form ref={this.formRef} layout="vertical" onFinish={this.addNewEducation}>

            <FormBuilder meta={meta} form={this.formRef} />

          </Form>
        </Modal>
      </>
    );
  }
}

export default TranslatorEducation;