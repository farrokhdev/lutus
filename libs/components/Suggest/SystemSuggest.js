import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Modal, Avatar, Rate, Button} from "antd";
import Link from "next/link"

@observer


class SystemSuggest extends Component {


  state = {
    visible: false
  }

  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  render() {
    const {suggest, handleBtn} = this.props
console.log(suggest);
    return (
      <>
        <div className="col-4">
          <div className="calculating-box p-4 h-100">
            <div className="d-flex flex-column justify-content-between w-100 h-100">
              <div className="d-flex flex-column text-center ">
                <div className="">
                  <Avatar src={suggest.image ? suggest.image : "/static/images/user.svg"} size={55}/>
                </div>
                <div className="d-flex flex-column px-2">

                  <div className="mt-2">
                    <Link href={`/panel/Tview/${suggest.username}`}><a>
                      <span className="titr-title">{suggest.full_name}</span>
                    </a></Link>
                  </div>
                  <Rate value={suggest.rate} disabled/>
                  <div className="mt-3">
                    <span className="text-muted">{suggest.about}</span>
                  </div>
                </div>

              </div>
              {suggest.amount && <div className="row py-3">
                <div className="col-6 ">
                  <div className="d-flex flex-column text-center">
                    <span className={'sub-title-gray'}>قیمت ارائه شده</span>
                    <span className={'titr-title'}>{this.formatNumber(suggest.amount)}  </span>
                  </div>
                </div>
                <div className="col-6 ">
                  <div className="d-flex flex-column text-center">
                    <span className={'sub-title-gray'}>زمان تحویل</span>
                    <span className={'titr-title'}>{suggest.delivery_date} روز </span>
                  </div>
                </div>
              </div>}
              {suggest.free_translate_text && <div className=" pt-4">
                  <div className={"d-flex justify-content-center"}>
                    <Button className={"sample-btn radius "} onClick={() => this.setState({visible: true})}>مشاهده نمونه ترجمه</Button>
                  </div>
                </div>}

              <div className="my-4">
                <div className="d-flex justify-content-center">

                  <Button onClick={() => handleBtn(suggest.id)} className={"login-btn w-100"}>انتخاب مترجم</Button>

                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal visible={this.state.visible} title={"نمونه ترجمه"} footer={null}
               onCancel={() => this.setState({visible: false})}>
          <div className="d-flex flex-column">
            <h6>متن اصلی</h6>
            <span className={"text-muted"}>{this.props.store.projectView.details.free_translate_text}</span>
            <hr/>
            <h6>متن ترجمه شده</h6>
            <span className={"text-muted"}>{suggest.free_translate_text}</span>
          </div>
        </Modal>
      </>
    );
  }

}

export default SystemSuggest;
