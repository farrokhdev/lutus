import React, {Component} from 'react';
import {observer} from "mobx-react"
import {Button, Select} from "antd";



import {DatePicker} from "antd-jalali";

import moment from "jalali-moment";


@observer
class VerbalTranslate extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    try {
      FormBuilder.defineWidget('date-picker-jalali', DatePickerJalali);
    } catch {
    }
  }

  state = {
    time_from: '',
    time_to: '',
    on_date: '',
    error: '',
    collection: []
  }

  renderChangeTime = (e, status) => {
    this.setState({[status]: e, error: ''})
  }

  addTime = () => {
    const {time_from, time_to, on_date} = this.state
    const item = {}

    item.time_from = time_from
    item.time_to = time_to
    item.on_date = moment.from(on_date.format('YYYY/MM/DD'), 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD')

    if (time_from && time_to && on_date) {
      this.state.collection.push(item);
      this.props.store.handleOrder.setVal("verbal_dates", this.state.collection)
    } else {
      this.setState({error: 'لطفا تمام فیلد ها را به درستی تکمیل کرده'})
    }
    this.setState({time_from: '', time_to: '', on_date: ''});
  }

  deleteTime = (index) => {

    let collection = this.state.collection;
    collection.splice(index, 1)
    this.setState({collection})
    this.props.store.handleOrder.setVal("verbal_dates", this.state.collection)
  }

  render() {
    const {time_from, time_to} = this.state
    const options = [
      {key: 8, value: 8},
      {key: 9, value: 9},
      {key: 10, value: 10},
      {key: 11, value: 11},
      {key: 12, value: 12},
      {key: 13, value: 13},
      {key: 14, value: 14},
      {key: 15, value: 15},
      {key: 16, value: 16},
      {key: 17, value: 17},
      {key: 18, value: 18},
      {key: 19, value: 19},
      {key: 20, value: 20},
      {key: 21, value: 21},
      {key: 22, value: 22},
    ]
    const options2 = [
      {key: 8, value: 8, disabled: time_from >= 8},
      {key: 9, value: 9, disabled: time_from >= 9},
      {key: 10, value: 10, disabled: time_from >= 10},
      {key: 11, value: 11, disabled: time_from >= 11},
      {key: 12, value: 12, disabled: time_from >= 12},
      {key: 13, value: 13, disabled: time_from >= 13},
      {key: 14, value: 14, disabled: time_from >= 14},
      {key: 15, value: 15, disabled: time_from >= 15},
      {key: 16, value: 16, disabled: time_from >= 16},
      {key: 17, value: 17, disabled: time_from >= 17},
      {key: 18, value: 18, disabled: time_from >= 18},
      {key: 19, value: 19, disabled: time_from >= 19},
      {key: 20, value: 20, disabled: time_from >= 20},
      {key: 21, value: 21, disabled: time_from >= 21},
      {key: 22, value: 22, disabled: time_from >= 22},
    ]
    const disabledDate = (current) => {
      return current && current < moment().endOf('day');
    }
    return (
      <>
        <div className="row align-items-end">
          <div className="col-12 col-md-4">
            <span className={""}>انتخاب تاریخ</span>
            <DatePicker disabledDate={e => disabledDate(e)} onChange={e => this.renderChangeTime(e, "on_date")}
                        value={this.state.on_date}/>
          </div>
          <div className="col-12 col-md-3">
            <span className={""}>از ساعت</span>
            <Select options={options} className={"w-100"} placeholder={"از ساعت"}
                    value={this.state.time_from}
                    onChange={e => this.renderChangeTime(e, "time_from")}/>
          </div>
          <div className="col-12 col-md-3">
            <span className={""}>تا ساعت</span>
            <Select options={options2} className={"w-100"} placeholder={"تا ساعت"}
                    value={this.state.time_to}
                    onChange={e => this.renderChangeTime(e, "time_to")}/>
          </div>
          <div className="col-12 col-md-2">
            <div className="d-flex justify-content-end">
              <Button type={"primary"} className={'radius'} onClick={this.addTime}>افزودن</Button>
            </div>
          </div>
        </div>
        <span className={"err-title"}>{this.state.error}</span>

        {this.props.store.handleOrder.verbal_dates && this.props.store.handleOrder.verbal_dates.map((item, index) => {

          return <div className={"row align-items-end py-2 my-3 bg-light radius "} key={index}>
            <div className="col-12 col-md-4">
              <span > تاریخ انتخابی: {moment(item.on_date).locale("fa").format("YYYY/MM/DD")} </span>
            </div>
            <div className="col-12 col-md-3">
              <span >  از ساعت: {item.time_from}  </span>
            </div>
            <div className="col-12 col-md-3">
              <span >  تا ساعت: {item.time_to}  </span>
            </div>
            <div className="col-12 col-md-2">
              <div className="d-flex justify-content-end">
                <Button onClick={e => this.deleteTime(index)} type={"danger"} className={"radius "}>حذف</Button>
              </div>
            </div>
          </div>
        })}

      </>
    );
  }
}

export default VerbalTranslate;