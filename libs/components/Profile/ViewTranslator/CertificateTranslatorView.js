import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Empty} from "antd";

@observer
class CertificateTranslatorView extends Component {

  render() {
    const {certificates} = this.props
    return (
      <>
        <div className="calculating-box my-5 p-3">
          <div className="p-3">
            <h5>گواهی نامه</h5>
          </div>
          {certificates ? certificates.map((item, index) => {
            return <div className={"d-flex align-items-center m-3"}>
              <div className="mx-2">
                <img src={"/static/images/certificate.svg"} width={60}/>
              </div>
              <div className="d-flex flex-column">
                <span className="titr-title">{item.title}</span>
                <span className="subtitle">{item.name_issuing_entity}</span>
                <span className="subtitle">{item.year_acquisition}</span>
              </div>
            </div>
          }) : <Empty/>}

        </div>
      </>
    );
  }
}

export default CertificateTranslatorView;