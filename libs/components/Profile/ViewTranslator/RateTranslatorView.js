import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Rate} from "antd";
import {MehOutlined, FrownOutlined, SmileOutlined} from '@ant-design/icons';

@observer
class JobTranslatorView extends Component {

  render() {
    const {rate} = this.props
    const fontSize = '65px'
    return (
      <>
        <div className="calculating-box my-5 p-3">
          <div className="p-3">
            <h5>رضایت کلی کارفرمایان</h5>
          </div>

          <div className="d-flex justify-content-center  ">
            <div className="mx-3 text-center "><h6>کاملا راضی</h6>
              <SmileOutlined style={{fontSize, color: '#3adc3d'}}/>
              <h6 className={"my-2"}> {Math.round(rate.very_good)} % </h6>

            </div>
            <div className="mx-3 text-center "><h6>راضی</h6>
              <SmileOutlined style={{fontSize, color: '#6afc50'}}/>
              <h6 className={"my-2"}> {Math.round(rate.normal)} % </h6>

            </div>
            <div className="mx-3 text-center "><h6>متوسط</h6>
              <FrownOutlined style={{fontSize, color: '#dce31d'}}/>
              <h6 className={"my-2"}> {Math.round(rate.good)} % </h6>

            </div>
            <div className="mx-3 text-center "><h6>ناراضی</h6>
              <MehOutlined style={{fontSize, color: '#cc2900'}}/>
              <h6 className={"my-2"}> {Math.round(rate.bad)} % </h6>

            </div>
          </div>

          <div className="d-flex flex-column">
            <div className="my-3">
              <div className="d-flex justify-content-center align-items-center  my-2">
                <h6 className={"mx-2 mb-0"}>کیفیت ترجمه</h6>
                <Rate value={rate.translate_quality} allowHalf={true} disabled/>
              </div>
              <div className="d-flex justify-content-center align-items-center  my-2">
                <h6 className={"mx-2 mb-0"}>تحویل به موقع</h6>
                <Rate value={rate.timely_delivery} allowHalf={true} disabled/>
              </div>
              <div className="d-flex justify-content-center align-items-center  my-2">
                <h6 className={"mx-2 mb-0"}>رعایت اصول نگارشی</h6>
                <Rate value={rate.principles_write} allowHalf={true} disabled/>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center">
          <h6> تعداد کل رای ها : {rate.total}</h6>
          </div>

        </div>
      </>
    );
  }
}

export default JobTranslatorView;