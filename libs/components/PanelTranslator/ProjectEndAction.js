import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Card, message, Result, Button, Modal, Input} from "antd";

const {TextArea} = Input;

@observer
class ProjectEndAction extends Component {


  state = {
    visible: false,
    status: '',
    comment: '',
  }

  handleSubmit = () => {
    const data = {}
    data.order_id = this.props.store.projectView.id

    if (this.state.status === "end") {
      this.props.store.getEndOfProject(data)
    } else {
      if (this.state.comment) {
        data.comment = this.state.comment
        this.props.store.getCancelProject(data)
      } else {
        message.error("علت انصراف خود را بنویسید")
      }
    }
  }


  render() {
    return (
      <>
        <Card title={"انصراف از پروژه"} className={"mb-3 radius"}>
          <div className="d-flex align-items-center justify-content-between">

            <span>با انصراف از پروژه، در صورت قبول ناظر از امتیاز شما کم شده و مرد جریمه توسط سایت قرار میگیرید.</span>

            <Button size="large" className={"mx-3 btn-warning radius"}
                    onClick={() => this.setState({visible: true, status: "cancel"})}>انصراف</Button>


          </div>

        </Card>

        <Modal visible={this.state.visible} footer={null} onCancel={() => this.setState({visible: false})}>
          <Result
            status={this.state.status === 'cancel' ? "warning" : "success"}
            title={this.state.status === 'cancel' ? "آیا از انصراف از پروژه مطمئن هستید؟" : "آیا از اتمام پروژه مطمئن هستید؟"}
            subTitle={this.state.status === 'cancel' ? <TextArea placeholder={"علت انصراف خود را بنویسید"}
                                                                 onChange={(e) => this.setState({comment: e.target.value})}/> : null}
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

export default ProjectEndAction;