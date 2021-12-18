import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Card,InputNumber, Input, Modal, Result, message, Button} from "antd";



const {TextArea} = Input

@observer
class FreeLancerSuggest extends Component {

  state = {
    count: '',
    day: '',
    freeText: '',
    visible: false,
  }

  onChange = (e, i) => {

    const {value} = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {

      this.setState({[i]: value})

    } else {
      message.error("فقط عدد وارد کنید")
    }
  };


  _callBackError = (err) => {
    message.error(err)
    this.setState({visible: false})
  }


  _callBack = () => {
    this.props.getData()
  }

  handleSendSuggest = () => {
    const data = {}
    data.order_id = this.props.store.projectView.id
    data.duration = this.state.day
    data.free_translate_text = this.state.freeText
    data.amount = this.state.count

    if (this.props.store.projectView.options.free_translate) {
      if (data.free_translate_text) {
        this.props.store.suggestFreeLancerProject(data, this._callBack, this._callBackError)
      } else {
        message.error("لطفا تمام فیلد ها رو پر کنید")
      }
    } else {
      this.props.store.suggestFreeLancerProject(data, this._callBack, this._callBackError)
    }


  }

  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  openModal = () => {
    const {projectView} = this.props.store;

    if (projectView.options.free_translate) {
      if (this.state.freeText) {
        this.setState({visible: true})
      } else {
        message.error("لطفا ترجمه خود را بنویسید")
      }

    }
    if (this.state.day && this.state.count) {
      this.setState({visible: true})
    } else {
      message.error("لطفا تمام فیلد ها رو پر کنید")
    }

  }


  render() {
    const {projectView} = this.props.store;
    const price = this.formatNumber(projectView.details.price)
    const price_to = this.formatNumber(projectView.details.price_to)
    const day = projectView.details.deliver_date
    const day_to = projectView.details.deliver_date_to

    const priceAmount = () => {
      return <span className={"text-muted"}> بازه قیمت {price} از {price_to}  </span>
    }

    const DateAmount = () => {
      return <span className={"text-muted"}> بازه زمانی {day} از {day_to}</span>
    }

    const formatter = (value) => {
      return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    return (
      <>
        <Card title={"پیشنهاد درخواستی"} className="radius mb-3 ">

          <div className="row">

            <div className="col-12 col-md-6">
              <div className="d-flex justify-content-between align-items-center">
                <span className={"gray-title"}> قیمت مورد نظر</span>
                {priceAmount()}
              </div>

              {/*<Input suffix="تومان" onChange={(e) => this.onChange(e, "count")} value={this.state.count} />*/}
              <InputNumber
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                value={this.state.count}
                onChange={(e) => this.setState({count: e})}
              />

            </div>

            <div className="col-12 col-md-6">
              <div className="d-flex justify-content-between align-items-center">
                <span className={"gray-title"}>تعداد روز </span>
                {DateAmount()}
              </div>


              <Input suffix="روز" onChange={(e) => this.onChange(e, "day")} value={this.state.day} defaultValue={day}/>


            </div>

            {projectView.options.free_translate && <div className={"row m-0"}>
              <div className="col-12 my-3">
                <span className={"gray-title"}>پارگراف تست</span>
                <span>{projectView.details.free_translate_text}</span>
              </div>
              <div className="col-12 my-3 w-100">
                <TextArea rows={6} placeholder={"ترجمه خود را بنویسید"}
                          onChange={e => this.setState({freeText: e.target.value})}/>
              </div>
            </div>}

          </div>
          <div className="my-3">
            <Button loading={this.props.store.loading} className={"login-btn"} onClick={this.openModal}>ارسال
              پیشنهاد</Button>
          </div>
        </Card>
        <Modal visible={this.state.visible} footer={null} onCancel={() => this.setState({visible: false})}>
          <Result
            status={"success"}
            title={"اعلام آمادگی برای قبول پروژه"}
            extra={[
              <div className={"d-flex justify-content-center"}>
                <Button loading={this.props.store.endLoading} className={"ok-btn mx-2 w-50"}
                        onClick={this.handleSendSuggest}>تایید</Button>
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

export default FreeLancerSuggest;