import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Empty} from "antd";

@observer
class EducationTranslatorView extends Component {

  render() {
    const {education} = this.props
    return (
      <>
        <div className="calculating-box my-5 p-3">
          <div className="p-3">
            <h5>تحصیلات</h5>
          </div>
          {education ? education.map((item, index) => {
            return <div className={"d-flex align-items-center m-3"}>
              <div className="mx-2">
                <img src={"/static/images/education.svg"} width={60}/>
              </div>
              <div className="d-flex flex-column">
                <span className="titr-title">{item.title_field_study}</span>
                <span className="subtitle">{item.name_university}</span>
                <span className="subtitle">{item.grade}</span>
              </div>
            </div>
          }) : <Empty/>}

        </div>
      </>
    );
  }
}

export default EducationTranslatorView;