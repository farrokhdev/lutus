import React, {Component} from 'react';
import {observer} from "mobx-react";
import BlogPres from "../../../mobx/presenters/BlogPres";
import StateView from "../../UI/StateView/StateView";
import BlogItem from "../../Blog";
import BlogHome from "../../Blog/BlogHome/BlogHome";
import Slider from "react-slick";
import SampleNextArrow from "../../UI/Arrow/SampleNextArrow";
import SamplePrevArrow from "../../UI/Arrow/SamplePrevArrow";

@observer
class NewsBox extends Component {

  constructor(props) {
    super(props);
    this.store = new BlogPres()
  }


  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.store.getBlogIndex()
  }

  settings = {
    rtl: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 3,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow/>,
  };

  render() {

    return (
      <section id={'news'}>
        <div className="bg-gray">
          <div className="container  ">
            <div className="padding80">
              <div className="d-flex flex-column text-center pb-3">
                <div className="position-relative text-center  ">
                  <span className="logo-bg"/>
                  <span className=" bold-title py-3 logo-title ">اخبار و اطلاعیه ها</span>
                </div>
                <span className="sub-title">تازه ترین اخبار و اطلاعیه های موسسه لوتوس</span>
              </div>
              <StateView state={this.store.stateView} errorButtonAction={this._getData}>

                <Slider {...this.settings} >

                  {this.store.blogIndexList.map((item, index) => {
                    return<div key={index} className={"px-3"}> <BlogHome item={item} /></div>})}

                </Slider>
              </StateView>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default NewsBox;