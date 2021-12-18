import React, {Component} from 'react';
import {observer} from "mobx-react";
import StateView from "../UI/StateView/StateView";
import {Card, Spin, Button} from "antd";
import TransferBox from "../../mobx/models/Order/TransferBox";

@observer
class UploadBoxTranslator extends Component {

  handleUpload = (e) => {
    this.props.store.fileName = e.target.files[0].name
    const formData = new FormData()
    formData.append('file', e.target.files[0]);

    this.props.store.uploadFileTranslator(formData)
  }


  SendFile = () => {
    this.props.store.sendFileTranslator()
  }

  handleDeleteUploadFile = () => {
    this.props.store.fileId = ""
  }

  getFile = ({id}) => {
    const data = {}
    data.id = id;
    data.order_id = this.props.store.projectView.id;
    this.props.store.getDownloadedFile(data)
  }

  render() {


    return (
      <div>

        <Card title={"ارسال فایل"} className="radius mb-3">

          <span className={"gray-title"}>آپلود فایل</span>
          <div className={"d-flex flex-column justify-content-center"}>

            <Spin size="large" spinning={this.props.store.loading} tip={"در حال آپلود"}/>

            {this.props.store.fileId && <div>
                        <span
                          className={"text-success my-2 d-flex justify-content-center"}>فایل شما با موفقیت آپلود شد</span>
              <div className="row d-flex justify-content-center">
                <img className={"mx-2 cursor"} src={"/static/images/x.svg"} width={14}
                     onClick={this.handleDeleteUploadFile}/>
                <span className={"d-flex justify-content-center"}>{this.props.store.fileName}</span>
              </div>
            </div>}

            <div className="d-flex flex-column justify-content-center align-items-center">

              {!this.props.store.fileId &&
              <>
                <input type="file" id="upload" hidden onChange={this.handleUpload}/>
                <label className={"upload-box w-25 "} htmlFor="upload"> ارسال فایل</label>
                <input type="file" id="actual-btn" hidden/>
              </>}
              <span className={"err-title"}>{this.props.store.errMsg}</span>
              {this.props.store.fileId &&
              <Button className={"login-btn m-3 w-25"} onClick={this.SendFile}>ارسال</Button>}

            </div>
          </div>


        </Card>

        {/*<TransferBox store={this.props.store} getFile={this.getFile}/>*/}


      </div>
    );
  }
}

export default UploadBoxTranslator;
