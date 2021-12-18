import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Empty} from "antd";

@observer
class JobTranslatorView extends Component {

  render() {
    const {jobs} = this.props
    return (
      <>
        <div className="calculating-box my-5 p-3">
          <div className="p-3">
            <h5>تجارب شغلی </h5>
          </div>
          {jobs ? jobs.map((item, index) => {
            return <div className={"d-flex align-items-center m-3"}>
              <div className="mx-2">
                <img src={"/static/images/work.svg"} width={60}/>
              </div>
              <div className="d-flex flex-column">
                <span className="titr-title">{item.title}</span>
                <span className="subtitle">{item.company}</span>
                <span className="subtitle"> {item.year_to} - {item.year_from}</span>
              </div>
            </div>
          }) : <Empty/>}

        </div>
      </>
    );
  }
}

export default JobTranslatorView;