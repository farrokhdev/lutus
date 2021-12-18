import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Button, Empty} from "antd";

@observer
class TransferBox extends Component {


  render() {
    const {projectView} = this.props.store
    const {file} =projectView.steps[0]
    return (
      <div>
        <div className="calculating-box my-5">
          <div className="p-3">
            <h6>فایل های دریافت شده:</h6>
          </div>
          <div className="p-5">
            <div className="d-flex flex-column ">

              {file  ? <div className={"col-12"}>
                  <div className="my-3 p-3  border radius">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex  align-items-center">
                        <img width={18} src={"/static/images/document.svg"}/>
                        <span className={"mx-2"}> فایل ارسال شده</span>
                      </div>
                      <div className="">
                        <span className={"mx-3 "}> تاریخ ارسال: {file.created_at} </span>
                      </div>
                      <div className="d-flex  align-items-center">

                        <Button onClick={() => this.props.getFile(file, projectView.id)}
                                icon={<img className={"mx-2"} src={"/static/images/download.svg"} width={16}/>}> دانلود
                          فایل </Button>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <Empty/>
              }
            </div>
          </div>


        </div>
      </div>
    );
  }
}

export default TransferBox;