import React, {Component} from 'react';
import {observer} from "mobx-react";
import Why from "./Why";
import Link from "next/link";

@observer
class WhyLotus extends Component {
  render() {
    return (
      <section id={"why"}>
        <div className="bg-gray">
          <div className="container  ">
            <div className="padding80">
              <div className="d-flex flex-column text-center   ">
                <div className="position-relative text-center  ">
                  <span className="logo-bg"/>
                  <span className=" bold-title  logo-title ">چرا لوتوس نویسه؟</span>
                </div>
                <span className="sub-title pt-3"> موسسه لوتوس با جمعی از بهترین متخصصین در سطح کشور</span>
              </div>
              <div className="scroll-x row flex-nowrap flex-md-wrap py-5 ">

                {Array(4).fill("a").map((i, index) => {
                  return <div className="col-5 col-md-3">
                    <Why/>
                  </div>
                })}
              </div>
              <div className="row ">
                <div className="col-12 col-md-6 py-4 py-md-0 ">
                  <div className="bg-navyBlue radius p-3 shadow cursor">
                    <Link href={"/hired"}><a>
                    <div className="d-flex align-items-center">
                      <img src="/static/images/typing.svg" width="152"/>
                      <div className="d-flex flex-column px-2 ">
                        <span className="white-title">همکاران  <span className="gold-title">نویسنده </span>لوتوس نویسه باشید</span>
                        <span className="white-subtitle">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است</span>
                      </div>
                    </div>
                    </a></Link>
                  </div>
                </div>
                <div className="col-12 col-md-6 py-4 py-md-0 ">
                  <div className="bg-navyBlue radius p-3 shadow ">
                    <Link href={"/hired"}><a>
                    <div className="d-flex align-items-center">
                      <img src="/static/images/typing.svg" width="152"/>
                      <div className="d-flex flex-column px-2 ">
                        <span className="white-title">همکاران  <span className="gold-title">نویسنده </span>لوتوس نویسه باشید</span>
                        <span className="white-subtitle">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است</span>
                      </div>
                    </div>
                    </a></Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default WhyLotus;