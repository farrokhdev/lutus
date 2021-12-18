import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Card, Result, Button, Modal, Input} from "antd";

const {TextArea} = Input;

@observer
class DedicateProject extends Component {


  state = {
    visible: false,
    status: '',
    comment: '',
  }

  handleSubmit = () => {
    const data={}
    data.order_id= this.props.store.projectView.id
    if(this.state.status ==="cancel"){
      data.accept=0
    }else{
      data.accept=1
    }
    this.props.store.translatorSelectProject(data)


  }


  render() {
    return (
      <>
        <Card title={"پروژه اختصاصی"} className={" mb-5 radius"}>
          <div className="d-flex align-items-center justify-content-between">

            <div className="">
              <Button size="large" className={"mx-3 btn-warning radius"}
                      onClick={() => this.setState({visible: true, status: "cancel"})}>انصراف</Button>

              <Button size="large" className={"mx-3 btn-success radius"}
                      onClick={() => this.setState({visible: true, status: "end"})}>اعلام آمادگی برای پروژه</Button>
            </div>
          </div>

        </Card>

        <Modal visible={this.state.visible} footer={null} onCancel={() => this.setState({visible: false})}>
          <Result
            status={this.state.status === 'cancel' ? "warning" : "success"}
            title={this.state.status === 'cancel' ? "آیا از انصراف از پروژه مطمئن هستید؟" : "آیا از قبول پروژه مطمئن هستید؟"}
            extra={[
              <div className={"d-flex justify-content-center"}>
                <Button loading={this.props.store.endLoading} className={"ok-btn mx-2 w-50"}
                        onClick={this.handleSubmit}>تایید</Button>
                <Button className={"cancel-btn  mx-2 w-50"}
                        onClick={() => this.setState({visible: false, status: ''})}>لغو</Button>
              </div>
            ]}
          />
        </Modal>
      </>
    );
  }
}

export default DedicateProject;