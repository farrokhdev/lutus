import React, {Component} from 'react';
import {observer,inject} from "mobx-react";
import Layout from "../../libs/components/UI/Layout";
import  {Button} from "antd";
import {withRouter} from 'next/router'
import Link from "next/link"
import Head from "next/head";

@inject("CoreStore")
@observer
class Index extends Component {

  cooperationBt = () => {
    const {t, CoreStore, router: {pathname}} = this.props;
    let status = "/panel/translator"

    if (CoreStore.isAuth !== 1) {
      status = "/login"
    }
    if (CoreStore.user.status === "active") {
      status = "/panel/translator"
    }
    if (CoreStore.user.status === "select_language") {
      status = "/panel/translator"
    }
    if (CoreStore.user.status === "user") {
      status = "/cooperation"
    }
    if (CoreStore.user.status === "busy") {
      status = "/panel/translator"
    }
    return status
  }

  render() {
    return (
      <>
        <Head><title>استخدام در لوتوس نویسه</title></Head>
        <Layout>
          <section>
            <div className="container">
              <div className="user-panel radius mt-3 mb-4">
                <h1 className="h5">استخدام در لوتوس نویسه</h1>
                <hr/>

                <div className="row align-items-center  my-4">
                  <div className="col-12 col-md-6">
                    <h5 > همکاری با لوتوس نویسه به عنوان مترجم</h5>
                    <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</p>
                    <Link href={this.cooperationBt()} ><a>

                      <Button className={"login-btn mt-3  "} >استخدام مترجم</Button>
                    </a></Link>
                  </div>
                  <div className="col-12 col-md-6">
                    <img src={"/static/images/hired.png"} className={"img-fluid"}/>
                  </div>
                </div>

                <div className="row  align-items-center my-4">
                  <div className="col-12 col-md-6">
                    <img src={"/static/images/cooperation.png"} className={"img-fluid"}/>
                  </div>
                  <div className="col-12 col-md-6">
                    <h5 >همکاری با لوتوس نویسه به عنوان تایپیست</h5>
                    <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</p>
                    <Link href={this.cooperationBt()} ><a>
                      <Button className={"login-btn mt-3  "} >استخدام تایپیست</Button>
                    </a></Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </>
    );
  }
}

export default withRouter(Index);