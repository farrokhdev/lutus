import React, {Component} from 'react';
import {observer,inject}from "mobx-react";
import {Modal,Radio,Button} from "antd";
import Router, {withRouter} from 'next/router'

@observer
@inject("CoreStore")
class SelectRole extends Component {

  state={
    role:"",
    visible:false,
  }

  handleSelectRole=()=>{
    this.props.store.getRoleForUser({role:this.state.role},this.callBack)
  }

  callBack=(status)=>{
    // console.log(status,"status")
    Router.push("/panel/translator")
    this.props.CoreStore.user.setVals(status)
  }

  render() {
    return (
      <div>
        <div className="mt-5">
          <h1 className={"h4"}>انتخاب نقش در لوتوس نویسه</h1>
          <p className={"my-3 "}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</p>
          <hr/>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div onClick={() => {this.setState({role: "translator"})}} className={`box-type my-5  ${this.state.role === "translator" && "box-typeActive"}`}>
              <div className="mb-3">
                <Radio checked={this.state.role === "translator"}/>
                <span className={"titr-title"}>مترجم</span>
              </div>
              <span className="text-muted">شما به عنوان مترجم پس از ثبت نام وانجام آرمون، پروژه های ترجمه مرتبط با تخصص شما معرفی میشوند، آنها را مشاهده و پیشنهادتان را برای ترجمه تخصصی آن متون اعلام کنید و پس از انجام پروژه ترجمه در ترنسیس فایل ترجمه شده را به کارفرما تحویل دهید و پس از کسب رضایت وی حق الزحمه خود را دریافت کنید</span>
            </div>
          </div>
          <div className="col-12 col-md-6"><div
            // onClick={() => {this.setState({role: "typist"})}}
            className={`box-type disabled my-5 ${this.state.role === "typist" && "box-typeActive"}`}>
            <div className="mb-3">
              <Radio disabled={true} checked={this.state.role === "typist"}/>
              <span className={"titr-title "}>تایپیست</span>
            </div>
            <span className="text-muted">شما به عنوان مترجم پس از ثبت نام وانجام آرمون، پروژه های ترجمه مرتبط با تخصص شما معرفی میشوند، آنها را مشاهده و پیشنهادتان را برای ترجمه تخصصی آن متون اعلام کنید و پس از انجام پروژه ترجمه در ترنسیس فایل ترجمه شده را به کارفرما تحویل دهید و پس از کسب رضایت وی حق الزحمه خود را دریافت کنید</span>
          </div></div>
        </div>
        {this.state.role &&   <div className="d-flex align-items-center justify-content-between my-5 py-2">
        <div><span> با کلیک بر روی ثبت نام <a onClick={e=>this.setState({visible:true})} className={"text-primary"}>قوانین و مقررات</a> لوتوس نویسه را می پذیرم. </span>
        </div>
        <Button htmlType="submit" className="login-btn w-25 " onClick={this.handleSelectRole}>
          ثبت نام
        </Button>
      </div> }

        <Modal visible={this.state.visible} title={"قوانین و مقررات"} onCancel={e=>this.setState({visible:false})} footer={<Button type={"primary"} onClick={() => this.setState({visible: false})}>بستن</Button>} >
<p>

  لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.</p>
        </Modal>

      </div>
    );
  }
}

export default SelectRole;