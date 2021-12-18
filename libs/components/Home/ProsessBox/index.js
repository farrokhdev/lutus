import React, {Component} from 'react';
import {observer} from "mobx-react";
import Slider from "react-slick";
import SampleNextArrow from "../../UI/Arrow/SampleNextArrow";
import SamplePrevArrow from "../../UI/Arrow/SamplePrevArrow";


@observer
class ProsessBox extends Component {

  state = {
    type: 0
  }

  handleSelect = (type) => {
    this.setState({type})
  }


  settings = {
    rtl: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 5,
    initialSlide: 3,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow/>,
  };


  _renderSystematic = () => {
    return (<div className={"row"}>
      <div className="col-2">
        <div className={"d-flex mx-auto flex-column p-3 text-center"}>
          <img src={"/static/images/order.png"}  className={"img-fluid mx-auto"}/>
          <h6 className={"mx-auto"}>ثبت سفارش</h6>
          <span className={"sub-title-gray mx-auto"}>به راحتی و با طی چند گام سفارش خود را ثبت کنید</span>
        </div>
      </div>
      <div className="col-2">
        <div className={"d-flex mx-auto flex-column p-3 text-center"}>
          <img src={"/static/images/calculate.png"}  className={" img-fluid mx-auto"}/>
          <h6 className={"mx-auto mt-3"}>محاسبه قیمت و زمان بندی</h6>
          <span className={"sub-title-gray mx-auto"}>محاسبه قیمت و زمان بندی در اسرع وقت به شما بابت انتخاب اطلاع داده می شود.</span>
        </div>
      </div>
      <div className="col-2">
        <div className={"d-flex mx-auto flex-column p-3 text-center"}>
          <img src={"/static/images/pay.png"}  className={"img-fluid mx-auto"}/>
          <h6 className={"mx-auto mt-3"}>پرداخت</h6>
          <span className={"sub-title-gray mx-auto"}>پرداخت مبلغ پروژه</span>
        </div>
      </div>
      <div className="col-2">
        <div className={"d-flex mx-auto flex-column p-3 text-center"}>
          <img src={"/static/images/consider.png"} className={"img-fluid mx-auto"}/>
          <h6 className={"mx-auto mt-3"}>بررسی پیشنهادات</h6>
          <span
            className={"sub-title-gray mx-auto"}>شما در بین پیشنهادات مترجمین، مناسب ترین گزینه را انتخاب میکنید</span>
        </div>
      </div>
      <div className="col-2">
        <div className={"d-flex mx-auto flex-column p-3 text-center"}>
          <img src={"/static/images/preparation.png"}  className={"img-fluid mx-auto"}/>
          <h6 className={"mx-auto mt-3"}>آماده سازی پروژه</h6>
          <span className={"sub-title-gray mx-auto"}>شروع روند پروژه، و آغاز به کار مترجم</span>
        </div>
      </div>
      <div className="col-2">
        <div className={"d-flex mx-auto flex-column p-3 text-center"}>
          <img src={"/static/images/ready.png"}  className={"img-fluid mx-auto"}/>
          <h6 className={"mx-auto mt-3"}>پروژه شما آماده است</h6>
          <span className={"sub-title-gray mx-auto"}>پروژه شما پس از تکمیل و اتمام مراحت ترجمه به تایید کیفیت برای شما ارسال می شود</span>
        </div>
      </div>

    </div>)
    /*return (<Slider {...this.settings} >


      <div className={"d-flex flex-column p-3 text-center"}>
        <img src={"/static/images/order.png"} width={200} className={"mx-auto"}/>
        <h6 className={"mx-auto"}>ثبت سفارش</h6>
        <span className={"sub-title-gray mx-auto"}>به راحتی و با طی چند گام سفارش خود را ثبت کنید</span>
      </div>

      <div className={"d-flex flex-column p-3 text-center"}>
        <img src={"/static/images/calculate.png"} width={200} className={"mx-auto"}/>
        <h6 className={"mx-auto mt-3"}>محاسبه قیمت و زمان بندی</h6>
        <span className={"sub-title-gray mx-auto"}>محاسبه قیمت و زمان بندی در اسرع وقت به شما بابت انتخاب اطلاع داده می شود.</span>
      </div>

      <div className={"d-flex flex-column p-3 text-center"}>
        <img src={"/static/images/pay.png"} width={200} className={"mx-auto"}/>
        <h6 className={"mx-auto mt-3"}>پرداخت</h6>
        <span className={"sub-title-gray mx-auto"}>پرداخت مبلغ پروژه</span>
      </div>

      <div className={"d-flex flex-column p-3 text-center"}>
        <img src={"/static/images/consider.png"} width={200} className={"mx-auto"}/>
        <h6 className={"mx-auto mt-3"}>بررسی پیشنهادات</h6>
        <span
          className={"sub-title-gray mx-auto"}>شما در بین پیشنهادات مترجمین، مناسب ترین گزینه را انتخاب میکنید</span>
      </div>

      <div className={"d-flex flex-column p-3 text-center"}>
        <img src={"/static/images/preparation.png"} width={200} className={"mx-auto"}/>
        <h6 className={"mx-auto mt-3"}>آماده سازی پروژه</h6>
        <span className={"sub-title-gray mx-auto"}>شروع روند پروژه، و آغاز به کار مترجم</span>
      </div>

      <div className={"d-flex flex-column p-3 text-center"}>
        <img src={"/static/images/ready.png"} height={250} className={"mx-auto"}/>
        <h6 className={"mx-auto mt-3"}>پروژه شما آماده است</h6>
        <span className={"sub-title-gray mx-auto"}>پروژه شما پس از تکمیل و اتمام مراحت ترجمه به تایید کیفیت برای شما ارسال می شود</span>
      </div>


    </Slider>)*/
  }

  _renderFreeLancer = () => {
    return (<div className={"row"}>
      <div className="col-2">
        <div className={"d-flex flex-column p-3 text-center"}>
          <img src={"/static/images/order.png"}  className={"img-fluid mx-auto"}/>
          <h6 className={"mx-auto"}>ثبت سفارش</h6>
          <span className={"sub-title-gray mx-auto"}>به راحتی و با طی چند گام سفارش خود را ثبت کنید</span>
        </div>
      </div>
      <div className="col-2">
        <div className={"d-flex flex-column p-3 text-center"}>
          <img src={"/static/images/calculate.png"} className={"img-fluid mx-auto"}/>
          <h6 className={"mx-auto mt-3"}>محاسبه قیمت و زمان بندی</h6>
          <span className={"sub-title-gray mx-auto"}>محاسبه قیمت و زمان بندی در اسرع وقت به شما بابت انتخاب اطلاع داده می شود.</span>
        </div>
      </div>
      <div className="col-2">
        <div className={"d-flex flex-column p-3 text-center"}>
          <img src={"/static/images/pay.png"} className={"img-fluid mx-auto"}/>
          <h6 className={"mx-auto mt-3"}>پرداخت</h6>
          <span className={"sub-title-gray mx-auto"}>پرداخت مبلغ پروژه</span>
        </div>
      </div>
      <div className="col-2">
        <div className={"d-flex flex-column p-3 text-center"}>
          <img src={"/static/images/login-bg.jpg"} className={"img-fluid mx-auto"}/>
          <h6 className={"mx-auto mt-3"}>ارسال پیشنهادات</h6>
          <span
            className={"sub-title-gray mx-auto"}>شما در بین پیشنهادات مترجمین، مناسب ترین گزینه را انتخاب میکنید</span>
        </div>
      </div>
      <div className="col-2">
        <div className={"d-flex flex-column p-3 text-center"}>
          <img src={"/static/images/consider.png"} className={"img-fluid mx-auto"}/>
          <h6 className={"mx-auto mt-3"}>بررسی پیشنهادات</h6>
          <span
            className={"sub-title-gray mx-auto"}>شما در بین پیشنهادات مترجمین، مناسب ترین گزینه را انتخاب میکنید</span>
        </div>
      </div>
      <div className="col-2">
        <div className={"d-flex flex-column p-3 text-center"}>
          <img src={"/static/images/preparation.png"} className={"img-fluid mx-auto"}/>
          <h6 className={"mx-auto mt-3"}>آماده سازی پروژه</h6>
          <span className={"sub-title-gray mx-auto"}>شروع روند پروژه، و آغاز به کار مترجم</span>
        </div>
      </div>
      {/*<div className="col-2">
        <div className={"d-flex flex-column p-3 text-center"}>
          <img src={"/static/images/ready.png"} height={250} className={"mx-auto"}/>
          <h6 className={"mx-auto mt-3"}>پروژه شما آماده است</h6>
          <span className={"sub-title-gray mx-auto"}>پروژه شما پس از تکمیل و اتمام مراحت ترجمه به تایید کیفیت برای شما ارسال می شود</span>
        </div>
      </div>*/}
    </div>)
    /*return (<Slider {...this.settings} >


      <div className={"d-flex flex-column p-3 text-center"}>
        <img src={"/static/images/order.png"} width={200} className={"mx-auto"}/>
        <h6 className={"mx-auto"}>ثبت سفارش</h6>
        <span className={"sub-title-gray mx-auto"}>به راحتی و با طی چند گام سفارش خود را ثبت کنید</span>
      </div>

      <div className={"d-flex flex-column p-3 text-center"}>
        <img src={"/static/images/calculate.png"} width={200} className={"mx-auto"}/>
        <h6 className={"mx-auto mt-3"}>محاسبه قیمت و زمان بندی</h6>
        <span className={"sub-title-gray mx-auto"}>محاسبه قیمت و زمان بندی در اسرع وقت به شما بابت انتخاب اطلاع داده می شود.</span>
      </div>

      <div className={"d-flex flex-column p-3 text-center"}>
        <img src={"/static/images/pay.png"} width={200} className={"mx-auto"}/>
        <h6 className={"mx-auto mt-3"}>پرداخت</h6>
        <span className={"sub-title-gray mx-auto"}>پرداخت مبلغ پروژه</span>
      </div>

      <div className={"d-flex flex-column p-3 text-center"}>
        <img src={"/static/images/login-bg.jpg"} width={200} className={"mx-auto"}/>
        <h6 className={"mx-auto mt-3"}>ارسال پیشنهادات</h6>
        <span
          className={"sub-title-gray mx-auto"}>شما در بین پیشنهادات مترجمین، مناسب ترین گزینه را انتخاب میکنید</span>
      </div>

      <div className={"d-flex flex-column p-3 text-center"}>
        <img src={"/static/images/consider.png"} width={200} className={"mx-auto"}/>
        <h6 className={"mx-auto mt-3"}>بررسی پیشنهادات</h6>
        <span
          className={"sub-title-gray mx-auto"}>شما در بین پیشنهادات مترجمین، مناسب ترین گزینه را انتخاب میکنید</span>
      </div>

      <div className={"d-flex flex-column p-3 text-center"}>
        <img src={"/static/images/preparation.png"} width={200} className={"mx-auto"}/>
        <h6 className={"mx-auto mt-3"}>آماده سازی پروژه</h6>
        <span className={"sub-title-gray mx-auto"}>شروع روند پروژه، و آغاز به کار مترجم</span>
      </div>

      <div className={"d-flex flex-column p-3 text-center"}>
        <img src={"/static/images/ready.png"} height={250} className={"mx-auto"}/>
        <h6 className={"mx-auto mt-3"}>پروژه شما آماده است</h6>
        <span className={"sub-title-gray mx-auto"}>پروژه شما پس از تکمیل و اتمام مراحت ترجمه به تایید کیفیت برای شما ارسال می شود</span>
      </div>


    </Slider>)*/
  }

  render() {

    return (
      <section id={"prosess"}>
        <div className="bg-white  ">
          <div className="container ">
            <div className="padding80">
              <div className="d-flex flex-column text-center  ">
                <div className="position-relative text-center ">
                  <span className="logo-bg"/>
                  <span className=" bold-title py-3 logo-title ">پروژه ها در لوتوس نویسه </span>
                </div>
              </div>
              <div className="switch-btn radius  mt-2  mb-5">
                <div className={`switch-label ${this.state.type === 0 && "switch-active"}`}
                     onClick={() => this.handleSelect(0)}>سیستمی
                </div>
                <div className={`switch-label ${this.state.type === 1 && "switch-active"}`}
                     onClick={() => this.handleSelect(1)}>فریلنسری
                </div>
              </div>
              <div className="">
                {this.state.type === 0 ?
                  this._renderSystematic() : this._renderFreeLancer()}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ProsessBox;