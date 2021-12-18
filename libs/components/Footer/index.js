import React, {Component} from 'react';
import {observer} from "mobx-react";
import Link from "next/link";

@observer
class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="d-flex bg-navyBlue p-4  ">
          <div className="container">
            <div className="d-flex justify-content-start py-4 ">
              <img src="/static/images/logo.svg"/>
              <div className="d-flex flex-column px-2 ">
                <span className="white-title">لوتوس نویسه</span>
                <span className="white-subtitle">خدمات تایپ و ترجمه</span>
              </div>
            </div>
            <div className="row py-4 ">
              <div className="col-12 col-md-5">
                <div className="d-flex flex-column">
                  <span className="white-subtitle">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکاره،</span>
                  <span className="white-subtitle py-4 ">ما را در شبکه های اجتماعی دنبال کنید:</span>
                  <div className="d-flex  ">
                    <img src="/static/images/aparat.svg" width="40" className="mx-2"/>
                    <img src="/static/images/insta.svg" width="40" className="mx-2"/>
                    <img src="/static/images/telegram.svg" width="40" className="mx-2"/>
                    <img src="/static/images/youtube.svg" width="40" className="mx-2"/>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2 py-4 py-md-0">
                <div className="d-flex flex-row flex-md-column align-items-center connect-us text-center">
                  <div className="col-4 col-md-12 px-2  py-1 mx-auto">
                    <div className="mb-3">
                      <span className="white-title">راه های تماس</span>
                    </div>
                    <div className="">
                      <img src="/static/images/phone.svg" width="17"/>
                      <span className=" px-1">شماره تماس</span>
                    </div>
                    <div className="">
                      <span className="">021-77833036</span>
                    </div>
                  </div>
                  <div className="col-4 col-md-12 px-2 py-5 mx-auto ">
                    <div className="">
                      <img src="/static/images/fax.svg" width="17"/>
                      <span className=" px-1">شماره فکس</span>
                    </div>
                    <div className="">
                      <span className="">021-77833036</span>
                    </div>
                  </div>
                  <div className="col-4 col-md-12 px-2 py-4 mx-auto ">
                    <div className="">
                      <img src="/static/images/email.svg" width="17"/>
                      <span className=" px-1">ایمیل</span>
                    </div>
                    <div className="">
                      <span className="">info@balvin.ir</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-2 py-4 py-md-0   ">
                <div className="d-flex flex-column text-center">
                  <div className="mb-3">
                    <span className="white-title">بیشتر بدانید</span>
                  </div>

                  {/*<ul className={"list-unstyled footer-menu"}>*/}
                  {/*  <li><a href="#">خدمات</a> </li>*/}
                  {/*  <li><a href="#">تعرفه ها</a> </li>*/}
                  {/*  <li><a href="#">فروشگاه</a> </li>*/}
                  {/*  <li><a href="#">وبلاگ</a> </li>*/}
                  {/*  <li><a href="#">درباره ما</a> </li>*/}
                  {/*  <li><a href="#">تماس با ما</a> </li>*/}
                  {/*</ul>*/}

                  <div className="d-flex flex-column list-unstyled footer-menu">
                    <Link href={"/service"}><a className={""}>خدمات</a></Link>
                    <Link href={"/price"}><a className={""}>تعرفه ها</a></Link>
                    <Link href={"/store"}><a className={""}>فروشگاه</a></Link>
                    <Link href={"/blog"}><a className={""}>وبلاگ</a></Link>
                    <Link href={"/about"}><a className={""}>درباره ما</a></Link>
                    <Link href={"/contact"}><a className={""}>تماس با ما</a></Link>
                  </div>


                </div>
              </div>
              <div className="col-6 col-md-3 d-flex justify-content-center ">
                <div className="d-flex flex-column justify-content-center ">
                  <div className=" enamad-box text-center">
                    <img src="/static/images/enamad.svg" width="85"/>
                  </div>
                  <div className=" enamad-box text-center">
                    <img src="/static/images/samandehi.svg" width="85"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center border-top py-4 ">
              <span className="white-subtitle">کلیه حقوق مادی و معنوی این سایت متعلق به لوتوس نویسه میباشد</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;