import React, {Component} from 'react';
import {observer} from "mobx-react";
import {withRouter} from 'next/router';
import Layout from "../../libs/components/UI/Layout";
import {Button} from "antd";
import Link from "next/link"
import WhyLotus from "../../libs/components/Home/WhyLotus";
import QuestionBox from "../../libs/components/Home/QuestionBox";
import OrderBox from "../../libs/components/Home/OrderBox";
import Head from "next/head";

@observer
class Service extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    console.log(this.props.router.query.id)
  }

  render() {
    const process = [
      {
        icon: '/static/images/monitor.svg',
        title: 'ثبت سفارش',
        description: 'به راحتی طی چند مرحله ثبت سفارش خود را انجام دهید'
      },
      {
        icon: '/static/images/search.svg',
        title: 'بررسی در لوتوس نویسه',
        description: 'طی این مرحله توسط کارشناسان لوتوس نویسه، پروژه شما در اسرع وقت بررسی میشود و زمانبندی و قیمت های آن به شما ارئه میشود'
      },
      {
        icon: '/static/images/clock.svg',
        title: 'پرداخت',
        description: 'شما با توجه به زمان تحویل مورد نظر خودتون، پکیج مناسب خود را انتخاب کرده و پرداخت خود را انجام میدهید'
      },
      {
        icon: '/static/images/check.svg',
        title: 'سفارش شما آماده است',
        description: 'فایل ترجمه خود را مرحله به مرحله تحویل میگیرید و در صورت رضایت مبلغ پرداختی شما برای مترجم ازاد میشود'
      }
    ]
    return (
      <>
        <Head><title>خدمات</title></Head>
        <Layout>
          <section>
            <div className="container">
              <div className="user-panel radius mt-3">

                <div className="landing-card my-5">
                  <div className="row ">
                    <div className="col-6">
                      <div className="d-flex flex-column justify-content-center h-100">
                        <div className="">
                          <h1 className={"h3"}>ترجمه هایی که ارزش خوندن دارن!</h1>
                        </div>
                        <div className="my-4">
                          <span>ترجمه کتابی که هم مفهوم را منتقل کرده و هم نثر ساده و روانی داشته باشد کار ساده ای نیست. ترنسیس تیم ویژه ای برای ترجمه کتاب در اختیار دارد که پیش از شروع کار چند نمونه از ترجمه در اختیار شما قرار می دهند تا بتوانید با خیال راحت تصمیم بگیرید</span>
                        </div>
                        <div className="d-flex ">
                          <Link href={"/order"}><a><Button className={"login-btn"}>ثبت سفارش</Button></a></Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex justify-content-center">
                        <img src={"/static/images/transis.jpg"} className={"img-fluid"}/>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="process-bar mb-5 mt-5 ">
                  <div className="d-flex justify-content-center my-5">
                    <h3>روند ترجمه کتاب</h3>
                  </div>
                  <div className="row">
                    {process.map((item, index) => {
                      return <div key={index} className="col-3">
                        <div className="service-box  p-3">
                          <div className="service-icon">
                            <img src={item.icon} width={30}/>
                          </div>
                          <div className="my-4">
                            <h5>{item.title}</h5>
                          </div>
                          <span className="sub-title">{item.description}</span>
                        </div>
                      </div>
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="order-box ">
              <div className="d-flex justify-content-center pt-5 ">
                <h2 className={"white-boldtitle"}>همین الان ثبت سفارش کنید</h2>
              </div>
              <div className="d-flex justify-content-center py-4">
                <Button className={"sample-btn  radius w-25"}>ثبت سفارش</Button>
              </div>
            </div>


            <div className="container">
              <div className="w-75 mx-auto">
                <OrderBox/>
              </div>
              <div className="user-panel radius mt-3 mb-4">


                <div className="row m-0">
                  <div className="col-12 col-md-6">
                    <img src={"/static/images/login-bg.jpg"} className={"img-fluid"}/>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="d-flex flex-column justify-content-center h-100">
                      <div className="my-4">
                        <h3>کیفیت و محرمانگی ترجمه ها را تضمین می کنیم</h3>
                      </div>
                      <span>تا زمانی که از کیفیت ترجمه خود رضایت نداشته باشید مبلغی که در ترنسیس سپرده کردید متعلق به خود شما خواهد بود. در این صفحه با روش های تضمین کیفیت ترجمه در ترنسیس آشنا شوید. همچنین لازم به ذکر است که تمام حقوق مادی و معنوی ترجمه های کتاب متعلق به کارفرما خواهد بود و ترجمه کتابها تنها توسط مترجمین مستقیم ترنسیس انجام می شوند</span>
                    </div>
                  </div>
                </div>


                <div className="100 mx-auto mt-4">
                  <QuestionBox/>
                </div>


              </div>
            </div>

          </section>
        </Layout>
      </>
    );
  }
}

export default withRouter(Service);