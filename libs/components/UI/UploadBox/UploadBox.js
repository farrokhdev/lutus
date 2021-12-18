import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Spin, Image, Empty, Upload} from 'antd';

@observer
class UploadBox extends Component {

  handleDeleteUploadFile = () => {
    const {status, store} = this.props
    store.user.setVal(status, "")
  }

  render() {
    const {status, store} = this.props;
    return (
      <>
        <div className={"d-flex flex-column align-items-center justify-content-center"}>

          <Spin size="large" spinning={store.loadingUpload[status]} tip={"در حال آپلود"}/>

          {store.user[status] && <div className={"d-flex flex-column justify-content-center align-items-center"}>

            <Image
              // width={260}
              height={100}
              src={store.user[status]}
              preview={store.user[status]}
            />


          </div>}

          <div className="d-flex flex-column justify-content-center align-items-center">


           <div className="image-upload-profile btn-primary my-2">
              <input className="file-upload-input" type='file' onChange={e => this.props.handleUpload(e, status)}/>
              <div className="drag-text">
                <span>انتخاب فایل</span>
              </div>
            </div>

            <div className="my-3">
              <span className={"err-title"}>{store.uploadErrorMsg[status]}</span>
            </div>


          </div>

        </div>
      </>
    );
  }

}

export default UploadBox;