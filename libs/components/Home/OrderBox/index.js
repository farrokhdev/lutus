import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Spin, Button, Input, Select} from "antd";
import StateView from "../../UI/StateView/StateView";
import CalculatePres from "../../../mobx/presenters/CalculatePres";
import Link from "next/link"
import {InfoCircleOutlined, CalendarOutlined} from "@ant-design/icons"

@observer
class OrderBox extends Component {

    constructor(props) {
        super(props);
        this.store = new CalculatePres()
    }

    state = {
        imageDisplay: true,
        field: '',
        language: '',
        service: '',
        subtitle: '',
        quality: 'system',
        type: 'TEXT',
        count: '',
        selectItem: null,
    }

    componentDidMount() {
        this._getData()
    }

    _getData = () => {
        this.store.getFieldsItems()
    }


    changeField = (e, status, item = null) => {

        this.store.errMsg = false
        item && this.setState({type: item.key, language: ""})


        this.setState({[status]: e})

        if (item != null) {
            this.setState({selectItem: item})
        }

        setTimeout(() => this.calculateItems(), 500)
    }


    calculateItems = () => {
        const data = {}
        data.service_id = this.state.service ? this.state.service : this.store.ServiceList[0].id;
        data.field_id = this.state.field ? this.state.field : this.store.FieldList[0].id;
        data.subtitle = this.state.subtitle ? this.state.subtitle : "no_subtitle";

        data.from_to = this.state.language ? this.state.language : (this.state.type !== "hours" ? this.store.languageList[0].from_to : this.store.other_languages[0].id);
        data.number_count = this.state.count ? this.state.count : "100";
        data.type = this.state.quality ? this.state.quality : "system";

        this.store.getCalculatedItem(data)
    }

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    renderPriceType = (status) => {
        switch (status) {
            case"normal":
                return <span className={"titr-title"}> عادی</span>
            case"immediate":
                return <span className={"titr-title"}> فوری</span>
            case"semi_immediate":
                return <span className={"titr-title"}> نیمه فوری</span>
            case"very_immediate":
                return <span className={"titr-title"}> فوق فوری</span>
            default:
                return <span>---</span>
        }
    }

    renderName = (name) => {
        switch (name) {
            case 'normal':
                return 'معمولی';
            case 'vip':
                return 'ویژه';
            case 'specialist':
                return 'تخصصی';
        }
    }

    _renderPriceFreeLancer = (item) => {
        if (item.discount) {
            return (<div className={"d-flex justify-content-center align-items-center"}>
                <span className={"mx-2 sub-title "}>از</span>
                <div className="d-flex flex-column">
                    <span
                        className={"off-text"}>{this.formatNumber(item.price_from * (100 - item.discount))} تومان </span>
                    <span className={"pink-title"}>{this.formatNumber(item.price_from)} تومان </span>
                </div>
                <span className={"mx-2 sub-title"}>تا</span>
                <div className="d-flex flex-column">
                    <span
                        className={"off-text"}>{this.formatNumber(item.price_to * (100 - item.discount))} تومان </span>
                    <span className={"pink-title"}>{this.formatNumber(item.price_to)} تومان </span>
                </div>
            </div>)
        } else {
            return (<div className={"d-flex justify-content-center align-items-center"}>
                <span className={"mx-2 sub-title "}>از</span>
                <span className={"sub-title"}>{this.formatNumber(item.price_from)} تومان </span>
                <span className={"mx-2 sub-title"}>تا</span>
                <span className={"sub-title"}>{this.formatNumber(item.price_to)} تومان </span>
            </div>)
        }
    }

    _renderPrice = (item) => {
        if (item.discount) {
            return <>
                <span className={"off-text"}>{this.formatNumber(item.price_from * (100 - item.discount))} تومان </span>
                <span className={"pink-title"}>{this.formatNumber(item.price_from)} تومان </span>
            </>
        } else {
            return <span className={"sub-title"}>{this.formatNumber(item.price_from)} تومان </span>
        }

    }


    calculatingBox = () => {


        return (<div className={"user-panel radius py-3 pr-md-5 "}>

            <Spin spinning={this.store.loading}>
                <div className="d-flex justify-content-end">
                    <div className="col">
                        <div className="custom-th d-flex mb-3 radius">
                            <div className="col-2">
                                <div className="d-flex align-items-center justify-content-center">
                                    <CalendarOutlined/>
                                    <span className={"titr-title mx-1 "}>زمان تحویل</span>
                                </div>
                            </div>
                            <div className="row col">
                                {this.store.priceList[0].data.map((item, index) => {
                                    return <div className="col" key={'rr'+index}>
                                        <div className="d-flex justify-content-center">
                                            {this.renderPriceType(item.type)}
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>


                {this.store.priceList.map((type, index) => {

                    return <div key={'rr1'+index} className="d-flex align-items-center  ">
                        <div className=" col-2 text-center ">
                            <span className={"sub-title"}>{this.renderName(type.type)}</span>
                        </div>
                        <div className="row col ">
                            {type.data.map((item, num) => {
                                return <div key={'rr3'+num} className="col px-2 text-center ">
                                    <div className="calculating-box">
                                        <div className="d-flex flex-column">
                                            <span className={""}>{item.date}</span>
                                            {item.price_to ? this._renderPriceFreeLancer(item) : this._renderPrice(item)}


                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                })}


                {/*<div className="row calculating-box ">
        <div className="px-3 col-4 text-center "><h6 className={"title-page mb-0"}>تحویل</h6></div>
        <div className="px-3 col-4 text-center"><h6 className={"title-page mb-0"}>قیمت</h6></div>
        <div className="px-3 col-4 text-center"><h6 className={"title-page mb-0"}>زمان تحویل</h6></div>
      </div>*/}

                {/*{this.store.priceList.map((item, index) => {

        return <div key={index} className="row calculating-box ">
          <div className="px-3 col-4 text-center">
            <span className={"sub-title"}>{this.renderPriceType(item.type)}</span>
          </div>
          <div className="px-3 col-4 text-center d-flex flex-column ">
            {item.price_discount ? <span className={"off-text"}>{this.formatNumber(item.old_price)} تومان</span> : null}
            <span className={"price-title"}>{this.formatNumber(item.price)} تومان</span>
          </div>
          <div className="px-3 col-4 text-center    ">
            <span className={"sub-title"}>{item.date === 0 ? "زمان مورد نظر" : item.date}</span>
          </div>
        </div>
      })}*/}


                {this.state.selectItem == null ? <Button disabled className={"login-btn w-100"}> خدمت را انتخاب نمایید</Button> :
                <Link href={`/order/${this.state.selectItem.alias}/${this.state.selectItem.id}`}>
                    <a>
                        <Button className={"login-btn w-100"}>ثبت سفارش</Button>
                    </a>
                </Link>}

                <div className="d-flex align-items-center mt-3">
                    <InfoCircleOutlined className={"text-warning"}/>
                    <span
                        className={"text-warning mx-2"}>بر قیمت های بالا مالیات بر ارزش افزوده نیز اضافه خواهد شد.</span>
                </div>
            </Spin>

        </div>)
    }

    countBase = () => {
        switch (this.state.type) {
            case "word":
                return "تعداد کلمه"
            case "hours":
                return "مدت زمان (ساعت)"
            case "minutes":
                return "مدت زمان (دقیقه)"
            default:
                return "تعداد کلمه"

        }
    }

    render() {


        const optionsService = this.store.ServiceList.map(i => {
            return {label: i.title, value: i.id, alias: i.alias, id: i.id, key: i.calculator_type}
        })
        const optionsField = this.store.FieldList.map(i => {
            return {label: i.title, value: i.id}
        })
        const optionsLanguages = this.store.languageList.map(i => {
            return {label: i.title, value: i.from_to}
        })
        const optionsLanguage = this.store.other_languages.map(i => {
            return {label: i.title, value: i.id}
        })


        const optionsType = [
            {label: "سیستمی", value: "system"},
            {label: "فریلنسری", value: "freelancer"},
        ]
        const optionsSubtitle = [
            {label: "ترجمه در صورت عدم وجود زیر نویس", value: "no_subtitle"},
            {label: "ترجمه در صورت وجود زیرنویس", value: "by_subtitle"},
            {label: "پیاده‌سازی بدون ترجمه", value: "implementation_without_translation"},
            {label: "ترجمه و پیاده سازی ", value: "implementation"},
        ]


        return (
            <section id={"hero"}>
                <div className="container  ">
                    <div className="py-0 py-md-5 ">
                        <div className="row m-0 py-4 align-items-center">

                            <div className="col-12 col-md-4">
                                <div className="d-flex px-4 mb-3 flex-column">
                                    <h1 className="welcome-title  mb-5">ترجمه حرفه ای <br/> با انتخاب حرفه ای ترین مترجم
                                    </h1>
                                    <span className=" ">میتونی سفارشتو محاسبه کنی واستعلام بگیری</span>
                                </div>

                                <StateView state={this.store.stateView}>
                                    <div className="d-flex flex-wrap align-items-center ">

                                        <div className="col-12 col-md-6 p-2 position-relative ">
                                            <div className="mx-auto">
                                                <span
                                                    className="title-inputMain justify-content-center">انتخاب خدمت</span>

                                                <Select className="inputMain" options={optionsService}
                                                        placeholder={optionsService[0] ? optionsService[0].label : ''}
                                                        onChange={(e, i) => this.changeField(e, "service", i)}/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 p-2 position-relative ">
                                            <div className="mx-auto">
                                                <span
                                                    className="title-inputMain justify-content-center">انتخاب تخصص</span>
                                                <Select className="inputMain" options={optionsField}
                                                        placeholder={"انتخاب تخصص"}
                                                        onChange={e => this.changeField(e, "field")}/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 p-2 position-relative ">
                                            <div className="mx-auto">
                                                <span
                                                    className="title-inputMain justify-content-center">انتخاب زبان</span>
                                                <Select className="inputMain" placeholder={"انتخاب زبان"}
                                                        options={this.state.type === "hours" ? optionsLanguage : optionsLanguages}
                                                        value={this.state.language ? this.state.language : null}
                                                        onChange={e => this.changeField(e, "language")}/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 p-2 position-relative ">
                                            <div className="mx-auto">
                                                <span
                                                    className="title-inputMain justify-content-center">{this.countBase()}</span>
                                                <Input className="inputMain"
                                                       onChange={e => this.changeField(e.target.value, "count")}
                                                       defaultValue={100} placeholder={this.countBase()}/>
                                            </div>
                                        </div>

                                        {this.state.type !== "hours" &&
                                        <div className="col-12 col-md-6 p-2 position-relative ">
                                            <div className="mx-auto">
                                                <span
                                                    className="title-inputMain justify-content-center">نوع ترجمه</span>
                                                <Select className="inputMain" options={optionsType}
                                                        placeholder={"سیستمی"}
                                                        onChange={e => this.changeField(e, "quality")}/>
                                            </div>
                                        </div>}
                                        {this.state.type === "minutes" &&
                                        <div className="col-12 col-md-6 p-2 position-relative ">
                                            <div className="mx-auto">
                                                <span
                                                    className="title-inputMain justify-content-center">مدل زیر نویس</span>
                                                <Select className="inputMain" options={optionsSubtitle}
                                                        defaultValue={"no_subtitle"}
                                                        onChange={e => this.changeField(e, "subtitle")}/>
                                            </div>
                                        </div>}

                                        <div className="col-12 p-2 mt-3 ">
                                            <Button className={"login-btn w-100 "} loading={this.store.loading}
                                                    onClick={this.calculateItems}> محاسبه قیمت </Button>
                                        </div>
                                        <div className="col-12 p-3">
                                            {this.store.errMsg &&
                                            <span
                                                className={"err-title"}>لطفا تمامی فیلد ها را به درستی وارد نمایید</span>}
                                        </div>

                                    </div>
                                </StateView>
                            </div>
                            <div className="col-12 col-md-8 my-auto ">

                                {this.store.priceList.length === 0 ?
                                    <div className={"text-center "}>
                                        <img src={"/static/images/hero-img.png"} className="img-fluid" width={500}/>
                                    </div> :
                                    this.calculatingBox()
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default OrderBox;
