import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Button, Input, Card, InputNumber} from "antd";
import StepModel from "../../../mobx/models/Order/StepModel";

const {TextArea} = Input

@observer
class TranslatorRejectSteps extends Component {

  state = {
    value: ''
  }


  stepAction = (status) => {

    const data = {}
    data.order_id = this.props.store.projectView.id
    data.user_id = this.props.store.translator.id

    if(status==="reject"){this.props.store.rejectTranslatorSteps(data, this.props.getData)}
    if(status==="edit"){this.props.store.editPaySteps(data, this.props.getData)}

  }



  render() {
    return (
      <>
        <Card className="radius " title={"رد پروژه توسط مترجم"}>
          <span className={"gray-title"}>اعتراض مترجم به مراحل پرداخت</span>
          <span>مترجم انتخابی شما به مراحل پرداخت اعتراض کرده است، اگه مایل به همکاری با مترجم انتخابی خود هستید، با زدن دکمه اصلاح پروژه، مراحل پرداخت خود را اصلاح کنید.</span>
          <div className="bg-white my-3 p-2">
            <span className={"gray-title"}>دلیل اعتراض مترجم:</span>
            <span>{this.props.store.projectView.reject_comment}</span>
          </div>
          <div className="d-flex align-items-center my-3 ">
            <Button loading={this.props.store.editLoading} className={"ok-btn mx-2"} onClick={() => this.stepAction('edit')}>اصلاح مراحل پرداخت</Button>
            <Button loading={this.props.store.loading} className={"cancel-btn mx-2"} onClick={() => this.stepAction('reject')}>لغو مترجم
              انتخابی</Button>
          </div>
        </Card>
      </>
    );
  }
}

export default TranslatorRejectSteps;