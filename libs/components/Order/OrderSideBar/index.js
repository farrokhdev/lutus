import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Button} from "antd"

@observer
class OrderSideBar extends Component {

  backBtn = () => {
    this.props.store.handleOrder.current = this.props.store.handleOrder.current - 1
    this.props.store.serviceSelect.description = ""
  }

  render() {
    const {serviceSelect} = this.props.store
    const {current} = this.props.store.handleOrder
    return (
      <>
        <div className="d-flex justify-content-between flex-column h-100 ">
          <div className="d-flex justify-content-between flex-column py-3  ">
            {current === 1 ? <>
              <div onClick={() => this.backBtn()} className={"d-flex justify-content-center mb-3 cursor "}>
                <img src={"/static/images/back_arrow.svg"} width={17}/>
                <span className={"sub-title px-1 "}>برگشت</span>
              </div>

              <div className={"mt-4"} dangerouslySetInnerHTML={{__html: serviceSelect.description}}/>
            </> : <>
              <span className={"pink-title"}>سفارشتو ثبت کن...</span>
              <span className={"py-2 sub-title-gray"}>راحت تر و سریع تر از</span>
              <span className={"sub-title-gray"}>اون چیزی که فکرشو میکنی</span>
            </>
            }
          </div>
          <div><img src={"/static/images/orderForm.svg"} width={210}/></div>
        </div>
      </>
    );
  }

}

export default OrderSideBar;


