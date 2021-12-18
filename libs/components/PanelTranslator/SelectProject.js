import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Card, message, Result, Button, Modal, Input} from "antd";
import login from "../../../pages/login";

const {TextArea} = Input;

@observer
class SelectProject extends Component {


  state = {
    visible: false,
    status: '',
    comment: '',
  }

  handleSubmit = () => {
    const data = {}
    data.order_id = this.props.store.projectView.id
    data.free_translate_text = this.state.comment

    if (this.state.status === "ok") {

      this.props.store.suggestProject(data, this.callBack)


    } else {
      this.props.store.deleteProject(data, this.callBack)
    }
  }


  callBack = () => {
    this.setState({visible: false})
  }

  openModal = () => {

    if (this.props.store.projectView.details.free_translate_text) {
      if (this.state.comment) {
        this.setState({visible: true, status: "ok"})
      } else {
        message.error("لطفا متن ترجمه را ترجمه کنید")
      }
    } else {
      this.setState({visible: true, status: "ok"})
    }
  }

  render() {
    const {projectView} = this.props.store

    return (
      <>
        <Card title={"پروژه جدید"} className="radius mb-3">
          <div className="row align-items-end py-2">


            <div className={"col-12"}>
              {!projectView.suggestion ? (projectView.details.free_translate_text ?
                <div className={"d-flex flex-column"}>
                  <span className={"gray-title"}>لطفا متن پایین را ترجمه کنید</span>
                  <div className="py-3">
                    <div className="projectView p-3">
                      <span>{projectView.details.free_translate_text}</span>
                    </div>
                  </div>
                  <TextArea placeholder={"ترجمه خود را بنویسید"}
                            onChange={(e) => this.setState({comment: e.target.value})}/>
                </div> :
                <div className={"d-flex flex-column"}>
                  <span className={"gray-title"}>اعلام آمادگی</span>
                  <span>برای اعلام آمادگی دکمه را نتخاب کنید</span>
                </div>)
                : <div className={"d-flex flex-column"}>
                  <span className={"gray-title"}>اعلام عدم آمادگی</span>
                  <span>عدم اعلام آمادگی فقط در  صورتی امکان پذیر است که کارفرما قبول نکرده باشد</span>
                </div>}
            </div>

            <div className="col-3 mt-3 ">
              <div className="d-flex justify-content-end">
                {projectView.suggestion ?
                  <Button loading={this.props.store.loading}
                          onClick={() => this.setState({visible: true, status: "delete"})}
                          className={"login-btn mx-2 w-100 "}>عدم آمادگی</Button>
                  :
                  <Button loading={this.props.store.loading}
                          onClick={this.openModal}
                          className={"ok-btn mx-2 w-100 "}>اعلام آمادگی</Button>
                }

              </div>
            </div>

          </div>
        </Card>

        <Modal visible={this.state.visible} footer={null} onCancel={() => this.setState({visible: false})}>
          <Result
            status={this.state.status !== 'ok' ? "warning" : "success"}
            title={this.state.status !== 'ok' ? "عدم آمادگی برای قبول پروژه" : "اعلام آمادگی برای قبول پروژه"}
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

export default SelectProject;