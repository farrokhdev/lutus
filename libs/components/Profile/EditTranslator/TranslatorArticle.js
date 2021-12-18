import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import {Spin,Card,Table, Modal, Result, Form, Button} from "antd";
import FormBuilder from 'antd-form-builder';
import StateView from "../../UI/StateView/StateView";
import {DeleteOutlined} from "@ant-design/icons";
import moment from "moment";
import EducationPres from "../../../mobx/presenters/EducationPres";
import {DatePicker as DatePickerJalali} from "antd-jalali";
import ArticlePres from "../../../mobx/presenters/ArticlePres";

@inject("CoreStore")
@observer
class TranslatorArticle extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.store = new ArticlePres()
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
    this.store.getArticleList()
  }


  _handleDeleteEducation = () => {
    this.store.getDeleteArticle({id: this.state.id}, this.callBack)
  }

  callBack = () => {
    this.store.articleList = this.store.articleList.filter(item => item.id !== this.state.id)
    this.setState({visible: false})
  }


  addNewArticle=(e)=>{
    const data=e

    data.file=this.store.file
    this.store.getArticleAdd(data,this.callBackAdd)
  }

  callBackAdd=()=>{
    this.setState({addEducation:false})
  }

  handleUpload=(e)=>{
    this.store.error="";
    const formData = new FormData()
    formData.append('file', e.target.files[0]);
    this.store.getArticleUpload(formData)
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

    const optionsYear=()=>{
      const arr=[]
      for(let year=1320; year<=1400;year++ ){
        arr.unshift({label:year,value:year,key:year})
      }
      return arr
    }

    const dataSource = this.store.articleList

    const columns = [
      {title: 'عنوان', dataIndex: 'title',},
      {title: 'نام ناشر', dataIndex: 'publisher_name'},
      {title: 'سال انتشار', dataIndex: 'year_publication',},
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
        {key: 'publisher_name', label: "نام ناشر", placeholder: "نام شرکت", colSpan: 1, required: true},
        {key: 'year_publication', label: "سال انتشار", colSpan: 1, required: true,widget:"select",options:optionsYear()},
        {key: 'upload', label: "فایل", colSpan: 2,widget:()=> this.uploadFile()},
        {key: 'description', label: "توضیحات", placeholder: "توضیحات", colSpan: 2,widget:"textarea"},
      ]
    }

    return (
      <>

        <Card title={"ویرایش مقالات"} extra={<Button className={'radius btn-primary'} onClick={()=>this.setState({addEducation:true})}> مقاله جدید</Button>} className="my-3 radius">
          <StateView errorButtonAction={this._getData} state={this.store.stateView}>
            <div className={"user-workSpace"}>
              <Table dataSource={dataSource} columns={columns} pagination={false}/>
            </div>
          </StateView>
        </Card>

        <Modal footer={null} visible={this.state.visible} title={"حذف مقاله"}
               onCancel={() => this.setState({visible: false})}>
          <Result
            status="warning"
            title="آیا از حذف مقاله مطمئن هستید؟"
            extra={[
              <div className={"d-flex justify-content-center"}>
                <Button className={"ok-btn mx-2 w-50"} loading={this.store.loading}
                        onClick={this._handleDeleteEducation}>تایید</Button>
                <Button className={"cancel-btn  mx-2 w-50"}
                        onClick={() => this.setState({visible: false, status: ''})}>لغو</Button>
              </div>
            ]}/>
        </Modal>

        <Modal visible={this.state.addEducation} title={"اضافه کردن مقاله"} width={800}
               onOk={() => this.formRef.current.submit()}
               onCancel={() => this.setState({addEducation: false})}>

          <Form ref={this.formRef} layout="vertical" onFinish={this.addNewArticle}>

            <FormBuilder meta={meta} form={this.formRef} />

          </Form>
        </Modal>
      </>
    );
  }
}

export default TranslatorArticle;