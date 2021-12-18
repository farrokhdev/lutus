import React, {Component} from 'react';
import {observer} from "mobx-react";
import {withRouter} from 'next/router';
import Layout from "../../../libs/components/UI/Layout";
import {Button} from "antd";
import Link from "next/link";
@observer
class Index extends Component {

  constructor(props) {
    super(props);

  }


  render() {


    return (
      <>
        <Layout>

          <div className="container">
            <div className="user-panel radius mt-3 mb-4">
              <div className="row">
                <div className="col-4">
                  <img src="/static/images/product.svg" width={350} className={"img-fluid"}/>
                </div>
                <div className="col-8">
                  <h1 className={'h5'}>کتاب کمک آموزشی ترجمه فرانسه</h1>
                  <div className="my-4">
                    <p className={""}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی،  </p>
                  </div>
                  <hr/>
                  <div className="d-flex flex-column">
                    <div className=" d-flex  align-items-end">
                      <span className={"titr-title pb-2"}>قیمت</span>
                      <div className="d-flex flex-column px-4 align-items-center">
                        <span className="off-text  ">230/000 تومان</span>
                        <span className={"price-title"}>220/000 تومان</span>
                      </div>
                    </div>
                    <div className="my-4 w-50">
                      <Link href={"/cart"}><a>
                        <Button className={"addCart-btn w-50 h-75"}> افزودن به سبد خرید</Button>
                      </a></Link>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </Layout>
      </>
    )
      ;
  }
}

export default withRouter(Index);