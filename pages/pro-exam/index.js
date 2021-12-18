import React, {Component} from 'react';
import Layout from "../../libs/components/UI/Layout";
import PanelSideBar from "../../libs/components/PanelUser/PanelSideBar";
import {Empty, Modal, Result, Button, message, Input} from "antd";
import {observer} from "mobx-react";
import CooperationPres from "../../libs/mobx/presenters/CooperationPres";
import {withRouter} from 'next/router'
import StateView from "../../libs/components/UI/StateView/StateView";
import Countdown from "react-countdown";
import Head from "next/head";

const {TextArea} = Input;

@observer
class ProExam extends Component {

  constructor(props) {
    super(props);
    this.store = new CooperationPres()
  }

  state = {
    Exam: '',
    field: '',
    fieldModal: false,
    success: false,
  }


  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.store.getSubcategoryField({language_id: this.props.router.query.id})
  }


  _SubmitForExam = () => {
    this.store.getProExam({id: this.state.Exam.id})
  }

  _renderOptionsExam = () => {

    const statusButton = (lng) => {

      switch (lng.status) {
        case "pending":
          return <Button onClick={() => this.setState({Exam: lng})} className={"m-1 radius doing-orderBtn"}>{lng.title} (آماده
            آزمون) </Button>
        case "exam_checking":
          return <Button className={"m-1 radius btn-warning h-100 "} disabled={true}>{lng.title} (درحال بررسی) </Button>
        case "deActive":
          return <Button className={"m-1 radius h-100"}>{lng.title} (غیر فعال) </Button>
        case "ok":
          return <Button className={"m-1 btn-success radius h-100"}>{lng.title} (فعال) </Button>
        default:
          return <Button onClick={() => this.setState({Exam: lng})} className={"m-1 btm"}>{lng.title} {lng.status}</Button>
      }

    }

    return (<>
      <div className="mb-4">
        <h3>زمینه های زبان انتخابی</h3>
        <hr/>
      </div>
      <div className="row">
        {this.store.subCategoryFields.length > 0 ? this.store.subCategoryFields.map((field, index) => {
            return <div className={"col-12 col-md-6"}>
              <div className="calculating-box p-3 my-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h6>{field.title}</h6>
                  <div className="d-flex align-items-center">

                    <div className="p-2 cursor mx-1" onClick={() => this.setState({deleteModal: true, field})}>
                      <img src={"static/images/x.svg"} width={10}/>
                    </div>


                    <div className="p-2 cursor mx-1" onClick={() => this.setState({activeModal: true, field})}>
                      <img src={`static/images/${field.status == 1 ? "active" : "deactive"}.svg`} width={14}/>
                    </div>


                  </div>
                </div>
                <div className="row justify-content-center ">
                  <div className="mx-auto py-2 ">
                    {field.items.map(lng => statusButton(lng))}
                  </div>
                </div>
              </div>
            </div>
          }) :
          <div className={"w-100 mx-auto my-3"}>
            <Empty
              description={<span>زمینه ای انتخاب نشد،لطفا زمینه مورد نظر خود را انتخاب کنید</span>}
            >
              <Button  href={`/language-subcategory/?id=${this.props.router.query.id}`}  className={""}>انتخاب زمینه ها</Button>
            </Empty>
          </div>
        }
      </div>

    </>)
  }

  _renderHelpExam = () => {
    return (

      <>
        <div className="w-100 mx-auto my-4">
          <h4> مترجم عزیز به بخش آمون اخصاصی خوش آمدید!</h4>
        </div>
        <div className="d-flex flex-column py-2">
          <span>لطفا قبل از شروع آزمون به نکات زیر دقت کنید</span>
          <span>در این بخش شما 10 دقیقه فرصت دارید تا پارگرافی که به شما داده میشود را ترجمه کنید</span>
          <span>سعی کنید تمرکز لازم را داشته باشید، چون زمان آزمون متوقف نخواهد شد</span>
          <span>پس از اتمام زمان، آزمون به صرت خود کار بسته میشود</span>
        </div>
        <div className=" my-5">
          <Button onClick={this._SubmitForExam} className={"login-btn mx-auto w-25 "}>شرکت در آزمون</Button>
        </div>
      </>)
  }

  _submitProQuiz = () => {
    const data = {}
    const {proExamQuestion} = this.store
    data.text_translated = proExamQuestion.answer
    data.language_to_id = proExamQuestion.language_to_id
    data.language_from_id = proExamQuestion.language_from_id
    data.field_id = proExamQuestion.field_id
    if (proExamQuestion.answer) {
      this.store.submitProExam(data, this.callBack)
    } else {
      message.error("لطفا پاراگراف را پر کنید")
    }
  }

  callBack = () => {
    this.setState({success: true})
  }

  handleText = (e) => {
    this.store.proExamQuestion.setVal("answer", e.target.value)
  }

  _renderExam = () => {
    const {proExamQuestion} = this.store
    return (<>
      <div className="d-flex justify-content-between">
        <div className="">
          <h4>{proExamQuestion.field.title} ({proExamQuestion.language_from.title} - {proExamQuestion.language_to.title})</h4>
        </div>
        <div className="">
          <Countdown date={Date.now() + proExamQuestion.time * 1000}
                     onComplete={() => this.setState({visible: true})}
                     renderer={(props) => (
                       <h4>{props.formatted.seconds} : {props.formatted.minutes}</h4>
                     )}/>
        </div>
      </div>
      <hr/>
      <p>{proExamQuestion.content}</p>

      <TextArea rows={6} onChange={this.handleText}/>
      <div className=" my-5">
        <Button onClick={this._submitProQuiz} loading={this.store.loading} className={"login-btn mx-auto w-25 "}>ثبت
          آزمون</Button>
      </div>
      <Modal title={<h4>وقت شما به اتمام رسید</h4>} visible={this.state.visible} footer={null}>

        <div className="d-flex justify-content-center flex-column">
          <div className={"py-4 mx-auto"}>

            <h5>وقت شما تمام شد لطفا یک بار دیگر مراجع نمایید</h5>
          </div>
          <div className=" mx-auto">
            <Button type={"primary"} href={"panel/translator"}>برگشت</Button>
          </div>
        </div>
      </Modal>
    </>)
  }

  _renderShowComponent = () => {

    if (this.state.success) {
      return this._renderSuccessMessage()
    }
    if (this.store.proExamQuestion.content) {
      return this._renderExam()
    }
    if (this.state.Exam) {
      return this._renderHelpExam()
    } else {
      return this._renderOptionsExam()
    }
  }

  _renderSuccessMessage = () => {
    return (<>
      <Result
        status="success"
        title={<h4>آزمون اختصاصی شما با موفیقت ارسال شد!</h4>}
        subTitle={<h5>پس از بررسی کارشناسان ما، اعلام نتیجه به حضور شما خواهد رسید</h5>}
        extra={<Button className={"my-4"} href={"panel/translator"}>پنل مدریت زبان</Button>}/>
    </>)
  }

  handleActiveField = () => {
    this.store.getActiveField({
      field_id: this.state.field.field_id,
      type: this.state.field.status ? 0 : 1
    }, this.callBackActive)
  }

  handleDeleteField = () => {
    const field_id = this.state.field.field_id
    this.store.getDeleteField({field_id}, () => this.callBackDelete(field_id))
  }


  callBackActive = (msg) => {
    this.setState({activeModal: false})
    message.success(msg)
    const index = this.store.subCategoryFields.findIndex(item => item.field_id === this.state.field.field_id)
    this.store.subCategoryFields[index].setVal("status", !this.state.field.status)
  }

  callBackDelete = (id) => {
    this.setState({deleteModal: false})
    this.store.subCategoryFields = this.store.subCategoryFields.filter(item => item.field_id !== id)

  }

  render() {

    return (
      <>
        <Head><title>آزمون تخصصی</title></Head>
        <Layout>
          <section>
            <div className="container">
              <div className="row">
                <div className="col-3"><PanelSideBar/></div>
                <div className="col-9 pr-0">
                  <div className="user-panel radius my-3">
                    <StateView state={this.store.stateView} errorButtonAction={this._getData}>
                      {this._renderShowComponent()}
                    </StateView>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>

        <Modal visible={this.state.deleteModal} title={this.state.field.title}
               onOk={this.handleDeleteField} onCancel={() => this.setState({deleteModal: false})}>
          <Result
            status="error"
            title="آیا از حذف مطمئن هستید؟"/>
        </Modal>

        <Modal visible={this.state.activeModal} title={this.state.field.title}
               onOk={this.handleActiveField} onCancel={() => this.setState({activeModal: false})}>
          <Result
            status="warning"
            title="آیا از فعال/غیر فعال کردن مطمئن هستید؟"/>
        </Modal>
      </>
    );
  }
}

export default withRouter(ProExam);