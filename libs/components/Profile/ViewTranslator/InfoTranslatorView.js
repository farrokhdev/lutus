import React, {Component} from 'react';
import {Avatar, Rate, Button} from "antd";
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import moment from "jalali-moment";
import {observer} from "mobx-react";
import login from "../../../../pages/login";

@observer
class InfoTranslatorView extends Component {


  render() {
    const {profileView, profileView: {info}} = this.props
    const getFullName = info.name + " " + info.family
    const time =moment.from(info.created_at, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD')

    return (
      <>
        <div className="calculating-box  p-3">
          <div className="row w-100 align-items-center justify-content-between">
            <div className="col-6">
              <div className="d-flex align-items-center">
                <div className="">
                  <Avatar src={info.image} size={120}/>
                </div>

                <div className="d-flex flex-column px-3">
                  <span className={"titr-title"}>{getFullName}</span>
                  <Rate value={info.rate/2} allowHalf={true} disabled/>
                  <span className="text-muted">{moment(time).locale("fa").fromNow()}</span>
                </div>
              </div>
            </div>
            <div className="col-2"/>
            <div className="col-4">
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between">

                  <span className="text-success">85 ترجمه موفق</span>


                  <span className="text-danger">0 ترجمه ناموفق</span>

                </div>
                <Button type={"primary"} className={'radius w-100 mt-3'}>ایجاد پروژه اختصاصی</Button>
                <Button className={'favorite-btn radius w-100 my-3'} loading={profileView.loading}
                        onClick={() => profileView.getAddFavorite()}>
                  <div className="d-flex align-items-center ">
                    {profileView.favorite ? <> حذف از منتخب ها<HeartFilled style={{color: "red"}}
                                                                           className={"mx-1"}/> </> : <> افزودن به منتخب
                      ها<HeartOutlined className={"mx-1"}/> </>}
                  </div>
                </Button>
                <Button className={'login-btn w-100'}>دعوت به پروژه</Button>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column my-4">
            <h5 className={"my-3 mx-4"}>{info.title}</h5>
            <span className={"sub-title"} style={{lineHeight: "30px"}}>{info.about}</span>
          </div>
        </div>
      </>
    );
  }
}

export default InfoTranslatorView;