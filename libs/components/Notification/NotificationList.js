import React, {Component} from 'react';
import {observer} from "mobx-react";

import moment from "jalali-moment"

@observer
class NotificationList extends Component {


  render() {

    return (
      <div>
        <div className="notificationList my-5">
          {this.props.store.notificationList.map((item, index) => {
            return <div key={index} className={"calculating-box p-4"}>
              <div className="d-flex justify-content-between">
              <div className="">
                <h6>عنوان</h6>
                <span>{item.title}</span>
              </div>

              <div className="">
                <h6>تاریخ</h6>
                <span>{moment(item.created_at).locale('fa').fromNow()}</span>
              </div>
              </div>
            </div>
          })}
        </div>
      </div>
    );
  }
}

export default NotificationList;