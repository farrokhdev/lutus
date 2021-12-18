import React, {Component} from 'react';
import {observer} from "mobx-react";

@observer
class Why extends Component {
  render() {
    return (
      <div>
        <div className="white-box radius p-3 mx-2 shadow-sm ">
            <img className="mx-auto " src="/static/images/group.svg" width="62"/>
              <span className="mt-4 ">تضمین کیفیت</span>
              <span className="sub-title pt-2 ">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده</span>
              {/*<a className="pt-3 bottom-0 position-relative " href="#"><span*/}
              {/*  className="pink-title">بیشتر بخوانید</span></a>*/}
          </div>
      </div>
    );
  }
}

export default Why;