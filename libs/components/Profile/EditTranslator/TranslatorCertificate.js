import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import {Card,Spin,message,Table, Modal, Result, Form, Button} from "antd";
import FormBuilder from 'antd-form-builder';
import StateView from "../../UI/StateView/StateView";
import {DeleteOutlined} from "@ant-design/icons";
import {DatePicker as DatePickerJalali} from "antd-jalali";
import CertificatePres from "../../../mobx/presenters/CertificatePres";

@inject("CoreStore")
@observer
class TranslatorCertificate extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.store = new CertificatePres()
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
    this.store.getCertificateList()
  }


  _handleDeleteEducation = () => {
    this.store.getCertificateDelete({id: this.state.id}, this.callBack)
  }

  callBack = () => {
    this.store.certificateList = this.store.certificateList.filter(item => item.id !== this.state.id)
    this.setState({visible: false})
  }


  addNewCertificate=(e)=>{
    const data=e
    data.file=this.store.file
    if(data.file){
    this.store.getCertificateAdd(data,this.callBackAdd)
    }else {
      message.error('فایل آپلودی الزامی است')
    }
  }

  callBackAdd=()=>{
    this.setState({addEducation:false})
  }

  handleUpload=(e)=>{
    this.store.error="";
    const formData = new FormData()
    formData.append('file', e.target.files[0]);
    this.store.getCertificateUpload(formData)
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



    const dataSource = this.store.certificateList

    const optionsYear=()=>{
      const arr=[]
      for(let year=1320; year<=1400;year++ ){
        arr.unshift({label:year,value:year,key:year})
      }
      return arr
    }





    const columns = [
      {title: 'عنوان', dataIndex: 'title',},
      {title: 'نام نهاد صادر کننده', dataIndex: 'name_issuing_entity'},
      {title: ' سال اخذ', align: 'center', dataIndex: 'year_acquisition'},
      {title: ' وضعیت', align: 'center', dataIndex: 'status',render:(status)=>this.handleStatus(status)},
      {title: 'حذف',align: 'center', render: (item) => {
          return <DeleteOutlined style={{fontSize: "18px"}} className={"cursor"} onClick={() => {
            this.setState({visible: true, id: item.id})
          }}/>
        }},
    ]

    const meta = {
      formItemLayout: null,
      columns: 2,
      fields: [
        {key: 'title', label: "عنوان", placeholder: "عنوان", colSpan: 1, required: true},
        {key: 'name_issuing_entity', label: "نام نهاد صادر کننده", placeholder: "نام نهاد صادر کننده", colSpan: 1, required: true},
        {key: 'year_acquisition', label: "سال اخذ", colSpan: 1, required: true,widget: 'select', options:optionsYear()},
        {key: 'upload', label: "فایل", colSpan: 2,widget:()=> this.uploadFile()},
        {key: 'description', label: "توضیحات", placeholder: "توضیحات", colSpan: 2,widget:"textarea"},
      ]
    }

    return (
      <>

        <Card title={"ویرایش گواهینامه"} className="radius my-5" extra={<Button className={'radius btn-primary'} onClick={()=>this.setState({addEducation:true})}> گواهینامه جدید</Button>}>
          <StateView errorButtonAction={this._getData} state={this.store.stateView}>
            <div className={"user-workSpace"}>
              <Table dataSource={dataSource} columns={columns} pagination={false}/>
            </div>
          </StateView>
        </Card>

        <Modal footer={null} visible={this.state.visible} title={"حذف گواهینامه"} onCancel={() => this.setState({visible: false})}>
          <Result status="warning" title="آیا از حذف گواهینامه مطمئن هستید؟" extra={[
              <div className={"d-flex justify-content-center"}>
                <Button className={"ok-btn mx-2 w-50"} loading={this.store.loading}
                        onClick={this._handleDeleteEducation}>تایید</Button>
                <Button className={"cancel-btn  mx-2 w-50"}
                        onClick={() => this.setState({visible: false, status: ''})}>لغو</Button>
              </div>
            ]}/>
        </Modal>

        <Modal visible={this.state.addEducation} title={"اضافه کردن گواهینامه"} width={800} onOk={() => this.formRef.current.submit()} onCancel={() => this.setState({addEducation: false})}>

          <Form ref={this.formRef} layout="vertical" onFinish={this.addNewCertificate}>

            <FormBuilder meta={meta} form={this.formRef} />

          </Form>
        </Modal>
      </>
    );
  }
}

export default TranslatorCertificate;