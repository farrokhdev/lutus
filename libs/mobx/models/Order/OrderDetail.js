import React, {Component} from 'react';
import StateView from "../../../components/UI/StateView/StateView";
import {observer} from "mobx-react";
import {Card, Button, Descriptions} from "antd";
import login from "../../../../pages/login";
import Link from "next/link"
import moment from "jalali-moment";

@observer
class OrderDetail extends Component {

  _renderBtnStatus = () => {
    const {status} = this.props.store.projectView

    switch (status) {
      case "end_delivery_time" :
        return <span className={"orderBtn reject-orderBtn"}>اتمام زمان حویل</span>
      case "awaiting_translator_accept_steps" :
        return <span className={"orderBtn complete-orderBtn "}>در انتظار تایید پرداخت مرحله ای</span>
      case "pending" :
        return <span className={"orderBtn doing-orderBtn   "}>در حال پردازش</span>
      case "awaiting_translator_accept" :
        return <span className={"orderBtn doing-orderBtn   "}>در انتظار تائید مترجم</span>
      case "accept_detail" :
        return <span className={"orderBtn new-orderBtn   "}>در انتظار تائید </span>
      case "readiness" :
        return <span className={"orderBtn select-orderBtn"}>ارائه پیشنهاد</span>
      case "ended" :
        return <span className={"orderBtn select-orderBtn"}>در انتظار تائید</span>
      case "freelancer_readiness" :
        return <span className={"orderBtn doing-orderBtn   "}>درا نتظار پیشنهاد</span>
      case "awaiting_payment_suggestion" :
        return <span className={"orderBtn doing-orderBtn   "}>در انتظار پرداخت</span>
      case "protest" :
        return <span className={"orderBtn red-orderBtn"}>اعتراض</span>
      case "translator_reject_steps" :
        return <span className={"orderBtn red-orderBtn"}>اعتراض به پرداخت مرحله ای</span>
      case "in_progress" :
        return <span className={"orderBtn new-orderBtn  "}>درحال انجام</span>
      case "confirm" :
        return <span className={"orderBtn new-orderBtn  "}>تایید شده</span>
      case "awaiting_payment" :
        return <span className={"orderBtn new-orderBtn  "}>منتظر پرداخت</span>
      case "complete" :
        return <span className={"orderBtn complete-orderBtn   "}>تکمیل شده</span>
      case "cancel" :
        return <span className={"orderBtn red-orderBtn "}>لغو شده</span>
      case "paid" :
        return <span className={"orderBtn paid-orderBtn  "}>پرداخت شده</span>
      case "modifying" :
        return <span className={"orderBtn red-orderBtn  "}>داری اصلاحات</span>

    }
  }

  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  fileDownload = ({id, content_type, content}) => {

    if (content_type === "link") {
      window.open("//"+content, "_blank")
    } else {
      this.props.store.downloadOrderFile({order_id: id})

    }
  }

  additional_items = () => {

    const arr = []
    if(this.props.store.projectView.options.additional_items != undefined){
    this.props.store.projectView.options.additional_items.map((item, index) => {
      switch (item) {
        case "footnote":
          arr.push("پاورقی")
          break
        case "table":
          arr.push("جدول")
          break
        case "shape":
          arr.push("شکل")
          break
        case "chart":
          arr.push("نمودار")
          break
        case "source":
          arr.push("منابع")
          break
        case "content":
          arr.push("فهرست")
          break
        case "subtitle":
          arr.push("زیر نویس")
          break
        case "word-list":
          arr.push("واژنامه")
          break
        case "formula":
          arr.push("تایپ فرمول")
          break

      }
    })
    }
    return <div className={"row"}>
      {arr.map((i, index) => {
        return <div className={"col-3"} key={index}><span className={"text-muted p-2"}>{index + 1} - {i}</span></div>
      })}
    </div>
  }

  timeTranslate = () => {
    const {projectView} = this.props.store

    switch (projectView.delivery_time_type) {
      case "normal":
        return <span className={"text-muted"}>عادی</span>
      case "semi_immediate":
        return <span className={"text-muted"}>نیمه فوری</span>
      case "immediate":
        return <span className={"text-muted"}>فوری</span>
    }
  }

  qualityTranslate = () => {
    const {projectView} = this.props.store

    switch (projectView.quality) {
      case "normal":
        return <span className={"text-muted"}>عادی</span>
      case "vip":
        return <span className={"text-muted"}>ویژه</span>
      case "specialist":
        return <span className={"text-muted"}>تخصصی</span>
      default:
        <span>----</span>
        return
    }
  }

  _renderTypeMedia = (media, options) => {
    let type = media === "video-file" ? "فایل تصویری" : "فایل صوتی"
    let option = ""


    switch (options) {
      case "just_implement":
        option = "فقط پیاده سازی"
        break
      case "translation_implementation":
        option = "ترجمه و پیاده سازی"
        break
      case "translation_only":
        option = "فقط ترجمه"
        break
      case "no_subtitles_implementation":
        option = "بدون زیر نویس فقط پیاده سازی"
        break
      case "no_subtitles_translation_implementation":
        option = "بدون زیر نویس فقط ترجمه و پیاده سازی"
        break
      case "no_subtitles_only_translation":
        option = "بدون زیر نویس و فقط ترجمه"
        break
      case "has_subtitles":
        option = "دارای زیر نویس"
        break

    }

    return (<span className={"text-muted"}>{type} ({option})</span>)
  }

  render() {
    const {projectView} = this.props.store

    return (
      <>
        <Card className=" mb-3 radius " title={ <div className="d-flex align-items-center">
          <span className={"titr-title px-2 mb-0"}>وضعیت پروژه:</span>
          <span>{this._renderBtnStatus()}</span>
        </div>} extra={ <div className="d-flex align-items-center">
          <span className={"titr-title px-2 mb-0 "}>نوع پروژه:</span>
          <span className={"pink-title"}>{projectView.project_type === "system" ? "سیستمی" : "فریلنسری"}</span>
        </div>}>
          <StateView state={this.props.store.stateView} errorButtonAction={this._getData}>
            <div>

            <div className="row  py-1 ">

              <div className="col-12 col-md-6">
                <div className="d-flex flex-column p-3">

                  <span className={"titr-title "}>نام سفارش دهنده</span>
                  <span className={"text-muted"}>{projectView.customer_name} {projectView.customer_family}</span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex flex-column p-3">
                    <span className={"titr-title px-2 mb-0 "}>نام پروژه:</span>
                    <span className={"text-muted"}>{projectView.title}</span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex flex-column p-3">
                  <span className={"titr-title "}>موضوع</span>
                  <span className={"text-muted"}>{projectView.field.title}</span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex flex-column p-3">
                  <span className={"titr-title "}>هزینه پروژه</span>
                  <span className={"text-muted"}>{projectView.amount ? (this.formatNumber(projectView.amount) +"  "+"تومان" ) : "---"}</span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex flex-column p-3">
                  <span className={"titr-title "}>خدمت</span>
                  <span className={"text-muted"}>{projectView.service.title}</span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex flex-column p-3">
                  <span className={"titr-title "}>زبان مبدا</span>
                  <span className={"text-muted"}>{projectView.language_from_id.title}</span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex flex-column p-3">
                  <span className={"titr-title "}>زبان مقصد</span>
                  <span className={"text-muted"}>{projectView.language_to_id.title}</span>
                </div>
              </div>
              {projectView.options.multimedia && <div className="col-12 col-md-6">
                <div className="d-flex flex-column p-3">
                  <span className={"titr-title "}>نوع فایل</span>
                  <span>{this._renderTypeMedia(projectView.options.multimedia, projectView.options.multimedia_option)}</span>
                </div>
              </div>}
              {projectView.content_type !== "presence" && <div className="col-12 col-md-6">
                <div className="d-flex flex-column p-3">
                  <span className={"titr-title "}>فایل پروژه</span>
                  <div className="py-2 cursor">
                    {projectView.content_type === "text" ?
                      <Link href={`/panel/viewContent/${projectView.id}/${projectView.user_owner}`}><a>
                        <Button type={"primary"} className={"mx-2"}> مشاهده فایل متن</Button>
                      </a></Link>
                      :
                      <Button type={"primary"} onClick={() => this.fileDownload(projectView)}>{projectView.content_type ==="link" ? "مشاهده لینک":"دانلود فایل"}</Button>
                    }
                  </div>
                </div>
              </div>}
              {/*{projectView.content_type !== "presence"  && <div className="col-12 col-md-6">
                <div className="d-flex flex-column p-3">
                  <span className={""}>تاریخ تحویل</span>
                  <span>{projectView.delivery_date}</span>
                </div>
              </div> }*/}
              <div className="col-12 col-md-6">
                <div className="d-flex flex-column p-3">
                  <span className={"titr-title "}>کیفیت ترجمه</span>
                  {this.qualityTranslate()}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex flex-column p-3">
                  <span className={"titr-title "}>نوع تحویل</span>
                  {this.timeTranslate()}
                </div>
              </div>

              {projectView.content_type === "presence" && <div className="col-12">
                <div className="d-flex flex-column p-3">
                  <span>زمان تحویل</span>
                  {projectView.onDates.map((date, index) => {
                    return <div className={"d-flex py-2 text-center "}>
                      <div className="col-4"> تاریخ
                        انتخابی: {moment(date.on_date).locale("fa").format("YYYY/MM/DD")}</div>
                      <div className="col-4"> از ساعت: {date.time_from} </div>
                      <div className="col-4"> تا ساعت: {date.time_to} </div>
                    </div>
                  })}
                </div>
              </div>}
              {this.props.store.projectView.options.additional_items != undefined &&<>
              {this.props.store.projectView.options.additional_items.length > 0 && <div className="col-12 ">
                <div className="d-flex flex-column p-3">
                  <span className={" titr-title "}>موارد تکمیلی</span>
                  {this.additional_items()}
                </div>
              </div>}
              </>}
              {projectView.details.description && <div className="col-12 ">
                <div className="d-flex flex-column p-3">
                  <span className={"titr-title  "}>توضیحات</span>
                  <span className={"text-muted"}>{projectView.details.description}</span>
                </div>
              </div>}
            </div>
            </div>
          </StateView>
        </Card>
      </>
    );
  }
}

export default OrderDetail;
