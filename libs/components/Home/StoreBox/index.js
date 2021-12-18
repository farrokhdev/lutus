import React, {Component} from 'react';
import {observer} from "mobx-react";
import Store from "./Store";
import {Button} from "antd";
import StoreBox from "./Store";

@observer
class StoreSection extends Component {
  render() {
    return (
      <section id={"store"}>
        <div className="container ">
          <div className="padding80">
            <div className="d-flex flex-column text-center  ">
              <div className="position-relative text-center ">
                <span className="logo-bg"/>
                <span className=" bold-title logo-title ">فروشگاه لوتوس</span>
              </div>
              {/*<span className="sub-title">مجموعه محصولات مورد نیاز برای ترجمه و تایپ</span>*/}
            </div>
            <div className=" scroll-x row flex-nowrap flex-md-wrap py-4 ">
              {Array(6).fill("a").map((i, index) => {
                return <div className="col-8 col-md-4">
                  <StoreBox/>
                </div>
              })}


            </div>
            <div className="  ">
              <Button className={"login-btn w-25 mx-auto "}>ورود به فروشگاه</Button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default StoreSection;