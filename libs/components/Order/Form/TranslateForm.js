import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import {observer} from "mobx-react";
import {
  message,
  Select,
  Input,
  Checkbox,
  Modal,
  Radio,
  Steps,
  Tooltip,
  Button,
  Rate,
  Avatar,
  Spin,
  Form,
  Upload
} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {DatePicker as DatePickerJalali} from "antd-jalali";
import {LikIcon, TextIcon, UploadIcon} from "../../../../public/static/images/Images";
import Cookies from 'js-cookie';
import moment from "moment";
import StateView from "../../UI/StateView/StateView";
import FormBuilder from 'antd-form-builder';
import {DataService} from "../../../api/data-service";
import WelcomeForm from "../../Login/WelcomeForm";
import LoginForm from "../../Login/LoginForm";
import RegisterForm from "../../Login/RegisterForm";
import ForgotForm from "../../Login/ForgotForm";
import LoginPres from "../../../mobx/presenters/LoginPres";
import validator from 'validator';
import {withRouter} from 'next/router';
import Link from "next/link";
import ProfilePres from "../../../mobx/presenters/ProfilePres";
import VerbalTranslate from "../VerbalTranslate";
import NewEditor from "../../Editor/NewEditor";

const {Dragger} = Upload;
const {Step} = Steps;
const {TextArea} = Input;

@observer
class TranslateForm extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.loginStore = new LoginPres();
    this.store = new ProfilePres();
    try {
      FormBuilder.defineWidget('date-picker-jalali', DatePickerJalali);
    } catch {
    }

  }


  state = {
    form: false,
    visible: false,
    spin: false,
    help: false,
    showUploadError: false,
    fileList: [],
    typeProject: "",
    face_translate: "",
    uploadBox: "upload",
    link: "",
    text: '',
    required: '',
    error: '',
    countNum: '',
    face_translation_day: "",
    face_translation_hour: "",
    uploadErrorMsg: "",
    simultaneous_translation_day: "",
    simultaneous_translation_hour: ""
  }

  afterUpload = (res) => {
    this.setState({showUploadError: false, spin: false})
    this.props.store.handleOrder.file = res.data.item.id
  }

  errorUpload = (res) => {
    this.setState({
      showUploadError: true,
      spin: false,
      uploadErrorMsg: res.data ? res.data.file[0] : ''
    })
  }

  handleUpload = async ({file, onError, onSuccess}) => {
    this.setState({spin: true})
    const formData = new FormData();
    formData.append('file', file);
    await DataService.sendData(formData, 'uploadFile', (res) => {
      onSuccess(res, file);
      this.setState({fileList: [file]})
      this.afterUpload(res);
    }, (error) => {
      console.log(error);
      this.errorUpload(error)
      onError();
    })

  }

  _renderTextContent = () => {
    return (<>
      <TextArea className={"mb-2"} placeholder={"متن مورد نظر خود را وارد کنید"} rows={5} value={this.state.text}
                onChange={(e) => this.setState({text: e.target.value})}/>
      <span className={"text-muted  "}>تعداد کلمه: {this.state.text.split(/\b\S+\b/).length - 1}</span>
    </>)
  }

  _renderContentBox = () => {
    const {content_type, file,text} = this.props.store.handleOrder;
    const {showUploadError, uploadErrorMsg} = this.state;

    const validate = (value) => {
      if (validator.isURL(value)) {
        this.setState({link: value, error: ''})
      } else {
        console.log("no")
        this.setState({link: value, error: "لینک مورد نظر خود را صحیح وارد کنید"})
      }
    }

    const changeType = (type) => {
      this.setState({error: ""})
      this.props.onChange("content_type", type)
    }

    const deleteFile = (i) => {
      this.props.store.handleOrder.file = "";
      this.setState({fileList: this.state.fileList.filter(item => item.uid !== i.uid)});
    }

    return <div className={"col mx-auto"} id={"linkInput"}>
      <div className={"col mx-auto d-flex justify-content-around bg-gray radius p-2"}>
        <div onClick={() => changeType("link")}
             className={`box-upload ${content_type === "link" && "box-uploadActive"} `}>
          <LikIcon/>
          <span className="sub-title text-center px-1 my-2">لینک</span>
        </div>
        <div onClick={() => changeType("file")}
             className={`box-upload ${content_type === "file" && "box-uploadActive"}`}>
          <UploadIcon/>
          <span className="sub-title text-center px-1 my-2">آپلود</span>
        </div>
        <div onClick={() => changeType("text")}
             className={`box-upload ${content_type === "text" && "box-uploadActive"}`}>
          <TextIcon/>
          <span className="sub-title text-center px-1 my-2">متن</span>
        </div>
      </div>

      <div className="mt-4  content-type mb-3 ">

        {content_type === "link" && <div className={"mt-5"}>
          <span className={"sub-title "}>لینکی که حاوی متن یا فایل مورد نظر برای ترجمه است را وارد کنید</span>
          <Input className={"link-input mt-3 "} placeholder={"مثال:‌  http://exmaple.com/file/translate "}
                 value={this.state.link} onChange={(e) => validate(e.target.value)}/></div>}
        {this.state.error && <span className="text-danger">{this.state.error}</span>}
        {/*{content_type === "text" && this._renderTextContent()}*/}
        {content_type === "text" && <NewEditor content_text={text}/>}
        {content_type === "file" ? file ? <>
            <span className={"text-success my-2 d-flex justify-content-center"}>فایل شما با موفقیت ارسال شد</span>
            <span className={"text-muted my-2 d-flex justify-content-center"}>اکنون میتوانید به مرحله بعد بروید، اگر میخواهید فایل دیگری را جایگزین این فایل کنید روی دکمه ضربدر کلیک کنید</span>
            <div className="uploaded-item">
              <div className={"d-flex align-items-center"}>
                <img src={"/static/images/document.svg"} width={25}/>
                {this.state.fileList[0] && <span className="px-1">{this.state.fileList[0].name}</span>}
              </div>
              <img className={"cursor m-2 "} onClick={() => deleteFile(this.state.fileList[0])}
                   src={"/static/images/x.svg"}
                   width={12}/>
            </div>
          </> :
          <Dragger listType={"picture-card"} maxCount={1} fileList={this.state.fileList}
                   type={"jpeg, jpg, png, webp, gif, pdf, zip, doc, docx, rar, csv, ptt, pttx, xlsx, xls, ppt, pptx"}
                   onRemove={(i) => deleteFile(i)} customRequest={(res) => this.handleUpload(res)}
          >
            <Spin size="large" spinning={this.state.spin} tip={"در حال آپلود"}/>
            <div className={"d-flex flex-column"}>
              <PlusOutlined/>
              <span className={"sub-title-gray my-2 "}>فایل مورد نظر خود را آپلود کنید</span>
            </div>
            {showUploadError && <p className={'text-danger mt-2'}>
              {uploadErrorMsg}
            </p>}

          </Dragger> : null}
      </div>

    </div>
  }

  _renderTypeOfProject = () => {
    const {t} = this.props;
    return <div className={"mb-4"} id={"projectType"}>
      {this.state.required && <span className={"text-danger"}>{this.state.required}</span>}
      <div onClick={() => {
        this.setState({typeProject: "system"})
        this.props.store.changeValue("project_type", "system")
      }} className={`box-type ${this.state.typeProject === "system" && "box-typeActive"}`}>
        <div className="">
          <Radio checked={this.state.typeProject === "system"}/>
          <span className={"titr-title mb-3"}>ترجمه سیستمی </span>
        </div>
        <span className="text-muted">سفارش شما پس از ثبت توسط تیم پشتیبانی بررسی شده و سپس به مناسب ترین مترجم جهت ترجمه ارسال می شود.</span>
      </div>
      <div onClick={() => {
        this.setState({typeProject: "freelancer"})
        this.props.store.changeValue("project_type", "freelancer")
      }} className={`box-type ${this.state.typeProject === "freelancer" && "box-typeActive"}`}>
        <div className="">
          <Radio checked={this.state.typeProject === "freelancer"}/>
          <span className={"titr-title mb-3 "}>ترجمه فریلنسر</span>
        </div>
        <span className="text-muted mb-3 ">سفارش شما به همه مترجمین فریلنسر جهت تعیین قیمت و زمان ارسال می شود و شما می توانید از بین آنها انتخاب نمایید.</span>
        <div className="d-flex flex-column ">
          <Checkbox.Group disabled={this.state.typeProject !== "freelancer"}
                          value={this.props.store.handleOrder.freelancer_option}
                          onChange={(e) => this.props.store.changeValue("freelancer_option", e)}>
            <Checkbox className={"pl-1 ml-2 "} value="AllTranslator">{t("form.AllTranslator")}</Checkbox>
            <Checkbox className={"pl-1 ml-2 "} value="MeTranslator">{t("form.MeTranslator")}</Checkbox>
            <Checkbox className={"pl-1 ml-2 "} value="SiteTranslator">{t("form.SiteTranslator")}</Checkbox>
          </Checkbox.Group>
        </div>
      </div>
    </div>
  }

  handleSelectOriginLanguage = (id, item) => {
    this.props.store.handleOrder.language_from_id = id
    this.props.store.handleOrder.language_from = item.label
    this.props.store.changeValue("language_to_id", "")
    const data = {};
    data.service_id = this.props.store.handleOrder.categoryId
    data.language_id = id
    this.props.store.getDestinationLanguage(data)
    // document.getElementById('destination').scrollIntoView({behavior: 'smooth'});
  }

  handleSelectDestinationLanguage = (id, item) => {
    this.props.store.handleOrder.language_to_id = id
    this.props.store.handleOrder.language_to = item.label
    this.setState({form: true})
    // setTimeout(() => document.getElementById('form').scrollIntoView({behavior: 'smooth'}), 10)
  }

  handleInput = (item, key, value) => {

    if (item.slug === "simultaneous_translation") {
      switch (key.slug) {
        case "day":
          this.props.store.handleOrder.simultaneous_translation.day = value;
          this.setState({simultaneous_translation_day: value})
          break;
        case "hour":
          this.props.store.handleOrder.simultaneous_translation.hour = value;
          this.setState({simultaneous_translation_hour: value})
          break;

      }
    } else {
      switch (key.slug) {
        case "day":
          this.props.store.handleOrder.face_translation.day = value;
          this.setState({face_translation_day: value})
          break;
        case "hour":
          this.props.store.handleOrder.face_translation.hour = value;
          this.setState({face_translation_hour: value})
          break;
      }
    }


  }

  _BackBtn = () => {
    window.scrollTo({top: 0, behavior: "auto"});
    window.scroll({top: 0, behavior: "auto"});
    this.props.store.serviceSelect.description = "";
    this.props.store.handleOrder.current = this.props.store.handleOrder.current - 1;
  }

  _renderTranslatorInvite = () => {
    const {profileView} = this.props
    return (<>
      <div className="projectView m-3 w-50 ">
        <div className="d-flex align-items-start">
          <div className="mt-3 ">
            <Radio checked={true}/>
            <Avatar src={profileView.info.image} size={55}/>
          </div>
          <div className="d-flex flex-column px-2">
            <div className="mt-2">
              <Link href={`/t/${profileView.info.username}`}><a>
                <span className="titr-title">{profileView.info.name + " " + profileView.info.family}</span>
              </a></Link>
            </div>
            <Rate value={profileView.rate / 2} allowHalf={true} disabled/>
            <div className="d-flex flex-column mt-2">
              <span className="">{profileView.info.title}</span>
              <span className="text-muted">{profileView.info.about}</span>
            </div>
          </div>
        </div>
      </div>
    </>)
  }


  _renderFieldsItem = () => {

    const {features} = this.props.store.serviceSelect;
    const {t, store: {handleOrder: {content_type, confidential, language_to_id, file}}} = this.props;
    const options = this.props.store.FieldList.map(i => {
      return {value: i.id, key: i.id, label: i.title}
    });
    const originLng = this.props.store.serviceSelect.languages.map(i => {
      return {value: i.id, key: i.id, label: i.title,}
    });
    const destinationLng = this.props.store.DestinationList.map(i => {
      return {value: i.id, key: i.id, label: i.title}
    });
    const options2 = [
      {label: t("form.footnote"), value: 'footnote'},
      {label: t("form.word-list"), value: 'word-list'},
      {label: t("form.table"), value: 'table'},
      {label: t("form.shape"), value: 'shape'},
      {label: t("form.chart"), value: 'chart'},
      {label: t("form.source"), value: 'source'},
      {label: t("form.content"), value: 'content'},
      {label: t("form.subtitle"), value: 'subtitle'},
      {label: t("form.formula"), value: 'formula'},
    ];


    const optionDay = [
      {label: "1", value: "1"},
      {label: "2", value: "2"},
      {label: "3", value: "3"},
      {label: "4", value: "4"},
      {label: "5", value: "5"},
      {label: "6", value: "6"},
      {label: "7", value: "7"},
      {label: "8", value: "8"},
      {label: "9", value: "9"},
      {label: "10", value: "10"},
      {label: "11", value: "11"},
      {label: "12", value: "12"},
      {label: "13", value: "13"},
      {label: "14", value: "14"},
      {label: "15", value: "15"},

    ]
    const optionHour = [
      {label: "1", value: "1"},
      {label: "2", value: "2"},
      {label: "3", value: "3"},
      {label: "4", value: "4"},
      {label: "5", value: "5"},
      {label: "6", value: "6"},
      {label: "7", value: "7"},
      {label: "8", value: "8"},

    ]
    const title = this.props.store.handleOrder.category;

    let Fields = []
    switch (this.props.store.handleOrder.alias) {
      case "translate-verbal":
        Fields = [
          {
            key: 'space0',
            colSpan: 10,
            render() {
              return (
                <>
                  <div className="d-flex align-items-center">
                    <img src={"/static/images/Translate.svg"}/>
                    <span className={"pink-title mx-2"}> ثبت سفارش {title}</span>
                  </div>
                  <br/>
                </>
              )
            },
          },
          {
            key: 'language_from_id',
            label: t("form.origin"),
            required: true,
            colSpan: 5,
            widget: 'select',
            options: originLng,
            onChange: (id, item) => this.handleSelectOriginLanguage(id, item)
          },
          {
            key: 'language_to_id',
            label: t("form.destination"),
            required: true,
            colSpan: 5,
            widget: 'select',
            options: destinationLng,
            onChange: (id, item) => this.handleSelectDestinationLanguage(id, item)
          },
          {
            key: 'field_id',
            label: t("form.fields"),
            required: true,
            widget: 'select',
            options,
            colSpan: 5,
            widgetProps: {
              onChange: (id, item) => {
                this.props.store.handleOrder.field_name = item.label
              }
            }
          },
          {key: 'title', label: t("form.title"), required: true, colSpan: 5},
          {
            key: 'space0',
            colSpan: 10,
            render() {
              return (
                <>
                  <hr/>
                </>
              )
            },
          },
          {
            key: 'space0',
            label: <span className={"titr-title"}>تاریخ اعزام مترجم و ساعت شروع و خاتمه کار را مشخص نمایید.</span>,
            colSpan: 10,
            widget: () => {
              return (
                <div className={"py-3"}>
                  <VerbalTranslate store={this.props.store}
                  />
                </div>
              )
            },
            rules: [
              {
                required: true,
                validator: (rule, value, callback) => {
                  return new Promise((resolve, reject) => {

                    if (this.props.store.handleOrder.verbal_dates) {
                      resolve()
                    } else {
                      reject(new Error(`لطفا زمان مورد نظر خود را وارد کنید`))
                    }


                  })
                },
              },
            ],

          },
          {
            key: 'space0',
            colSpan: 10,
            render() {
              return (
                <>
                  <hr/>
                  <span className={"titr-title"}>موارد بیشتر</span>
                  <br/>
                  <br/>
                </>
              )
            },
          },
          {
            key: 'reference_to_translator',
            label: t("form.specific-Translator"),
            widget: 'number',
            help: <div className={"pb-4"}>{t("help.specific")}</div>,
            colSpan: 5
          },
          {
            key: 'confident', label: t("form.confidentiality"), colSpan: 10,
            render: () => {
              return <div className={"pb-4 w-100 "}>
                <Checkbox
                  onChange={(e) => this.props.store.changeValue("confidential", e.target.checked)}>{t("form.confidentiality")}</Checkbox>
                {this.props.store.handleOrder.confidential &&
                <div className={"pb-4 warning-label "}>{t("help.confident")}</div>}
              </div>
            }
          },
          {key: 'description', label: t("form.description"), widget: "textarea", colSpan: 10, widgetProps: {rows: 5}},

        ];
        break;
      case "translate-subtitle":
        Fields = [
          {
            key: 'space0',
            colSpan: 10,
            render() {
              return (
                <>
                  <div className="d-flex align-items-center">
                    <img src={"/static/images/Translate.svg"}/>
                    <span className={"pink-title mx-2"}> ثبت سفارش {title}</span>
                  </div>
                  <br/>
                </>
              )
            },
          },

          {
            key: 'field_id',
            label: t("form.fields"),
            required: true,
            widget: 'select',
            options,
            colSpan: 10,
            widgetProps: {
              onChange: (id, item) => {
                this.props.store.handleOrder.field_name = item.label
              }
            }
          },
          {key: 'title', label: t("form.title"), required: true, colSpan: 10},

          {
            key: 'language_from_id',
            label: t("form.origin"),
            required: true,
            colSpan: 5,
            widget: 'select',
            options: originLng,
            onChange: (id, item) => this.handleSelectOriginLanguage(id, item)
          },
          {
            key: 'language_to_id',
            label: t("form.destination"),
            required: true,
            colSpan: 5,
            widget: 'select',
            options: destinationLng,
            onChange: (id, item) => this.handleSelectDestinationLanguage(id, item)
          },

          {
            key: 'space0',
            colSpan: 10,
            render() {
              return (
                <div className={'mb-3'}>
                  <hr/>
                  <span className={"titr-title"}>نوع محتوی</span>
                  <br/>
                </div>
              )
            },
          },
          {
            key: 'upload', label: '', colSpan: 10,
            render: () => {
              return <div className={'mb-3'}>
                {this._renderContentBox()}
              </div>
            }
          },
          {
            key: 'space0',
            colSpan: 10,
            render() {
              return (
                <>
                  <hr/>
                  <span className={"titr-title"}>موارد بیشتر</span>
                  <br/>
                  <br/>
                </>
              )
            },
          },
          {
            key: 'delivery_date',
            label: t("form.yourDate"),
            widget: 'date-picker-jalali',
            colSpan: 5,
            widgetProps: {
              disabledDate: (current) => {
                return current && current < moment().endOf('day');
              }
            }
          },
          {
            key: 'reference_to_translator',
            label: t("form.specific-Translator"),
            widget: 'number',
            help: <div className={"pb-4"}>{t("help.specific")}</div>,
            colSpan: 5
          },
          {
            key: 'confident', label: t("form.confidentiality"), colSpan: 10,
            render: () => {
              return <div className={"pb-4 w-100 "}>
                <Checkbox
                  onChange={(e) => this.props.store.changeValue("confidential", e.target.checked)}>{t("form.confidentiality")}</Checkbox>
                {this.props.store.handleOrder.confidential &&
                <div className={"pb-4 warning-label "}>{t("help.confident")}</div>}
              </div>
            }
          },
          /*{
            key: 'quality', widget: 'checkbox', colSpan: 10,
            render: () => {
              return <Radio.Group

                defaultValue={this.props.store.handleOrder.quality}
                onChange={(e) => this.props.store.handleOrder.quality = e.target.value}>
                <div className="row">
                  <div className="">
                    <div className="d-flex align-items-center">
                      <Radio value={"normal"}>{t("form.normal")}
                      </Radio>
                      <Tooltip title={"مترجم عمومی و تازه کار"}>
                        <img src={"/static/images/question.svg"} width={20} className={"cursor"}/>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="">
                    <div className="d-flex align-items-center">
                      <Radio value={"vip"}>{t("form.vip")}
                      </Radio>
                      <Tooltip title={"مترجم تخصصی و مرتبط"}>
                        <img src={"/static/images/question.svg"} width={20} className={"cursor"}/>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="">
                    <div className="d-flex align-items-center">
                      <Radio value={"specialist"}>{t("form.specialist")}
                      </Radio>
                      <Tooltip title={"مترجم برگزیده و حرفه ای"}>
                        <img src={"/static/images/question.svg"} width={20} className={" cursor"}/>
                      </Tooltip>
                    </div>
                  </div>
                </div>

              </Radio.Group>
            }
          },*/
          {
            key: 'space0',
            colSpan: 10,
            render: () => {
              return (
                <>
                  <br/>
                  <hr/>
                  {this.props.router.query.username ? <span className={"titr-title"}>مترجم منتخب</span> :
                    <span className={"titr-title"}>{t("form.type")}</span>}
                  <br/>
                </>
              )
            },
          },
          {
            key: "project_type",
            colSpan: 10,
            render: () => {
              return this.props.router.query.username ? this._renderTranslatorInvite() : this._renderTypeOfProject()
            },
          },
          {key: 'description', label: t("form.description"), widget: "textarea", colSpan: 10, widgetProps: {rows: 5}},
        ];
        break;
      default:
        Fields = [
          {
            key: 'space0',
            colSpan: 10,
            render() {
              return (
                <>
                  <div className="d-flex align-items-center">
                    <img src={"/static/images/Translate.svg"}/>
                    <span className={"pink-title mx-2"}> ثبت سفارش {title}</span>
                  </div>
                  <br/>
                </>
              )
            },
          },
          {
            key: 'field_id',
            label: t("form.fields"),
            required: true,
            widget: 'select',
            options,
            colSpan: 10,
            widgetProps: {
              onChange: (id, item) => {
                this.props.store.handleOrder.field_name = item.label
              }
            }
          },
          {key: 'title', label: t("form.title"), required: true, colSpan: 10},
          {
            key: 'language_from_id',
            label: t("form.origin"),
            required: true,
            colSpan: 5,
            widget: 'select',
            options: originLng,
            onChange: (id, item) => this.handleSelectOriginLanguage(id, item)
          },
          {
            key: 'language_to_id',
            label: t("form.destination"),
            required: true,
            colSpan: 5,
            widget: 'select',
            options: destinationLng,
            onChange: (id, item) => this.handleSelectDestinationLanguage(id, item)
          },

          {
            key: 'space0',
            colSpan: 10,
            render() {
              return (
                <>
                  <hr/>
                  <span className={"titr-title"}>نوع محتوی</span>
                  <br/>
                  <br/>
                </>
              )
            },
          },
          {
            key: 'upload', label: '', colSpan: 10,
            render: () => {
              return this._renderContentBox()
            }
          },
          {
            key: 'space0',
            colSpan: 10,
            render() {
              return (
                <>
                  <hr/>
                  <span className={"titr-title"}>موارد بیشتر</span>
                  <br/>
                  <br/>
                </>
              )
            },
          },
          {
            key: 'delivery_date',
            label: t("form.yourDate"),
            widget: 'date-picker-jalali',
            colSpan: 5,
            widgetProps: {
              disabledDate: (current) => {
                return current && current < moment().endOf('day');
              }
            }
          },
          {
            key: 'reference_to_translator',
            label: t("form.specific-Translator"),
            widget: 'number',
            help: <div className={"pb-4"}>{t("help.specific")}</div>,
            colSpan: 5
          },
          {
            key: 'confident', label: t("form.confidentiality"), colSpan: 10,
            render: () => {
              return <div className={"pb-4 w-100 "}>
                <Checkbox
                  onChange={(e) => this.props.store.changeValue("confidential", e.target.checked)}>{t("form.confidentiality")}</Checkbox>
                {this.props.store.handleOrder.confidential &&
                <div className={"pb-4 warning-label "}>{t("help.confident")}</div>}
              </div>
            }
          },
          {
            key: 'space0',
            colSpan: 10,
            render() {
              return (
                <>
                  <hr/>
                  <span className={"titr-title"}>موارد تکمیلی</span>
                  <br/>
                  <br/>

                </>
              )
            },
          },
          {
            key: 'Additional_items', widget: 'checkbox', colSpan: 10,
            render: () => {
              return <Checkbox.Group defaultValue={this.props.store.handleOrder.Additional_items}
                // options={options2}
                                     className={'row'}
                                     onChange={(e) => this.props.store.handleOrder.additional_items = e}>

                {options2.map((option, index) => {
                  return <div className="col-4" key={index}>
                    <Checkbox className={'py-2'} value={option.value}> {option.label}</Checkbox>
                  </div>
                })}
              </Checkbox.Group>
            }
          },
          /*{
            key: 'quality', widget: 'checkbox', colSpan: 10,
            render: () => {
              return <Radio.Group
                defaultValue={this.props.store.handleOrder.quality}
                onChange={(e) => this.props.store.handleOrder.quality = e.target.value}>
                  <div className="row radio-pointer">
                    <div className="px-3">
                      <div className="d-flex align-items-center">
                        <Radio value={"normal"}>{t("form.normal")}
                        </Radio>
                        <Tooltip title={"مترجم عمومی و تازه کار"}>
                          <img src={"/static/images/question.svg"} width={20} className={"cursor"}/>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="px-3">
                      <div className="d-flex align-items-center">
                        <Radio value={"vip"}>{t("form.vip")}
                        </Radio>
                        <Tooltip title={"مترجم تخصصی و مرتبط"}>
                          <img src={"/static/images/question.svg"} width={20} className={"cursor"}/>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="px-3">
                      <div className="d-flex align-items-center">
                        <Radio value={"specialist"}>{t("form.specialist")}
                        </Radio>
                        <Tooltip title={"مترجم برگزیده و حرفه ای"}>
                          <img src={"/static/images/question.svg"} width={20} className={" cursor"}/>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
              </Radio.Group>
            }
          },*/
          {
            key: 'space0',
            colSpan: 10,
            render: () => {
              return (
                <>
                  <br/>
                  <hr/>
                  {this.props.router.query.username ? <span className={"titr-title"}>مترجم منتخب</span> :
                    <span className={"titr-title"}>{t("form.type")}</span>}
                  <br/>
                </>
              )
            },
          },
          {
            key: "project_type",

            colSpan: 10,
            render: () => {
              return this.props.router.query.username ? this._renderTranslatorInvite() : this._renderTypeOfProject()
            }
          },
          {key: 'description', label: t("form.description"), widget: "textarea", colSpan: 10, widgetProps: {rows: 5}},
        ];
    }


    features && features.map((item) => {
      switch (item.input_type) {
        case"checkbox" :
          Fields.splice(11, 0, {
            key: item.slug, label: item.title, colSpan: 10,
            render: () => {
              return (<>
                <div className={"pb-4"}>
                <div>
                <Checkbox
                          onChange={(e) => this.props.store.changeValue(item.slug, e.target.checked)}>{item.title}</Checkbox>
                </div>
                <div className={'pr-4'}>
                  <small className={' text-muted'}>{item.description}</small>
                </div>
              </div>
              </>)
            }
          })
          break;
        case"number" :
          Fields.splice(6, 0, {
            key: item.slug,
            label: item.title,
            colSpan: 5, render: () => {
              return <div id={'face_translate'}>
                <Radio value={item.title}
                       onChange={e => this.props.store.handleOrder.setVal("verbal", item.title)}>
                  <span className={"titr-title"}>{item.title}</span>
                </Radio>
                {/*<Radio.Group>
                  {features.map((feature,index)=>{
                    return <Radio value={feature.title}
                      onChange={e=>this.props.store.handleOrder.setVal("verbal",feature.title)}>
                      <span className={"titr-title"}>{feature.title}</span>
                    </Radio>
                  })}
                </Radio.Group>*/}
              </div>
            },
          })
          break;
        case"radio" :
          const options = item.items.map(i => {
            return {label: i.title, value: i.id}
          })
          // console.log(this.props.store.handleOrder[item.slug])
          Fields.splice(11, 0, {
            key: item.slug, label: item.title, colSpan: 10, render: () => {
              return <>
                <Checkbox onChange={(e) => this.props.store.changeValue(item.slug, e.target.checked)}>
                  <span className={"titr-title"}>{item.title}</span>
                </Checkbox>
                <Radio.Group onChange={(e) => {
                  this.props.store.changeValue(item.slug + "s", e.target.value)
                }} options={options} className={'py-2'} disabled={!this.props.store.handleOrder[item.slug]}/>
              </>
            }
          })
          break
        case"select" :
          const options2 = item.items.map(i => {
            return {label: i.title, value: i.id}
          })

          Fields.splice(7, 0, {
            key: item.slug,
            label: <span className={"titr-title"}>{item.title}</span>,
            colSpan: 10,
            widget: () => {
              return <div className={"d-flex "}>
                <Radio.Group
                  value={this.props.store.handleOrder[item.slug]}
                  onChange={e => this.formRef.current.validateFields([item.slug])}
                  className={'pt-2'}>
                  {item.items.map((feature, index) => {
                    return <div className={"d-flex "}  key={'b2'+index}>
                      <Radio value={feature.slug}
                             onChange={e => {
                               this.props.store.handleOrder.setVal(item.slug, feature.slug)
                             }}>{feature.title}</Radio>
                      {(feature.options && this.props.store.handleOrder.multimedia === feature.slug) &&
                      <Radio.Group value={this.props.store.handleOrder.options}>
                        {feature.options.map((option, counter) => {
                          return <div className={" mx-5 "} key={'h'+counter}><Radio
                                                                  onChange={e => this.props.store.handleOrder.setVal("options", option.slug)}
                                                                  value={option.slug}>{option.title}</Radio></div>
                        })}
                      </Radio.Group>}
                    </div>
                  })}
                </Radio.Group>
              </div>
            },
            rules: [
              {
                required: true,
                validator: (rule, value, callback) => {
                  return new Promise((resolve, reject) => {

                    if (this.props.store.handleOrder[item.slug]) {
                      resolve()
                    } else {
                      reject(new Error(`لطفا یکی از گزینه های زیر را انتخاب کنید`))
                    }


                  })
                },
              },
            ],
          })
          break
        default:
          return null
      }
    })
    return Fields
  }


  render() {
    const {
      t,
      store: {handleOrder: {multimedia, options, content_type, verbal, confidential, language_to_id, file}}
    } = this.props;
    const meta = {
      columns: 10,
      formItemLayout: null,
      initialValues: this.props.store.handleOrder,
      responsive: {xs: 24, sm: 24, md: 12, lg: 12, xl: 12},
      fields: this._renderFieldsItem()
    }
    const _callBackLogin = () => {
      this.setState({visible: false})
      this.formRef.current.submit()
    }
    const {forgotVisibility, RegisterVisibility, LoginVisibility, WelcomeVisibility} = this.loginStore;


    return <div className={"py-4 boxShadow-form mt-3"}>
      <StateView state={this.props.store.stateViewOrigin} errorButtonAction={this.props.getData}>
        <Form
          ref={this.formRef}
          layout="vertical"
          onFinish={this._sendForm}
          onValuesChange={() => this.forceUpdate()}
        >
          <FormBuilder meta={meta} form={this.formRef}/>
          <div className="row form-btn mb-2">
            <div className="col-4">
              <Button onClick={() => this._BackBtn()} className={"backBTN"}>قبلی</Button>
            </div>
            <div className="col-8">
              <Button loading={this.props.store.loading} onClick={() => this.formRef.current.submit()}
                      className={"sendBTN"}>{t("btn.send")}</Button>
            </div>
          </div>
        </Form>
      </StateView>
      <Modal width={350} title={""} footer={null} onCancel={this._cancelModal}
             visible={this.state.visible}>
        <div className="d-flex justify-content-center flex-column text-center mx-auto">
          <div className="mb-4">
            <img src={"/static/images/logo.svg"} width={60}/>
          </div>
          {WelcomeVisibility && <WelcomeForm store={this.loginStore}/>}
          {LoginVisibility && <LoginForm store={this.loginStore} _callBackLogin={_callBackLogin}/>}
          {RegisterVisibility && <RegisterForm store={this.loginStore} _callBackLogin={_callBackLogin}/>}
          {forgotVisibility && <ForgotForm store={this.loginStore} _callBackLogin={_callBackLogin}/>}
        </div>
      </Modal>
    </div>
  }


  _sendForm = (e) => {

    this.props.store.handleOrder.setVals(e);
    this.props.router.query.username ? this.props.store.handleOrder.project_type = "dedicated" : null
    this.props.router.query.username ? this.props.store.handleOrder.username = this.props.router.query.username : null


    if (this.props.store.handleOrder.delivery_date) {
      this.props.store.handleOrder.delivery_date = moment(this.props.store.handleOrder.delivery_date).format("YYYY/DD/MM")

    }


    switch (this.props.store.handleOrder.content_type) {
      case "file":
        this.props.store.handleOrder.content = this.props.store.handleOrder.file
        break;
      case "text":
        this.props.store.handleOrder.content = this.props.store.handleOrder.text.text
        break;
      case "link":
        this.props.store.handleOrder.content = this.state.link
        break;
      default:
        this.props.store.handleOrder.content = this.props.store.handleOrder.file
    }


    switch (this.props.store.handleOrder.alias) {
      case "translate-verbal":
        this.props.store.handleOrder.content_type = "presence";
        if (this.props.store.handleOrder.verbal_dates.length <= 0) {
          return message.error('لطفا زمان مورد نظر خود را وارد کنید!')
        }

        break;
      case "translate-subtitle":
        break;
      default:

        if (this.props.store.handleOrder.project_type === "") {
          this.setState({required: "لطفا نوع پروژه خود را انتخاب کنید"})
          document.getElementById('projectType').scrollIntoView({behavior: 'smooth'});
        } else {
          this.setState({required: ""})
        }
        break
    }


    if (this.state.error) {
      console.log(this.state.error)
      console.log("this.state.error")
      document.getElementById('linkInput').scrollIntoView({behavior: 'smooth'});
    } else {
      if (Cookies.get("token")) {
        this.props.store.submitOrder(this.props.store.handleOrder, this._callBackSuccess)
      } else {
        this.setState({visible: true})
      }
    }

    this.props.store.handleOrder.fillForm = true
  }

  _cancelModal = () => {

    this.setState({visible: false});
    this.loginStore.forgotVisibility = false;
    this.loginStore.RegisterVisibility = false;
    this.loginStore.LoginVisibility = false;
    this.loginStore.WelcomeVisibility = true;
  }

  _callBackSuccess = (e) => {
    console.log(e)
    window.scroll({top: 0, behavior: "smooth"})
    this.props.store.handleOrder.id = e
    this.props.store.handleOrder.setVal("current", this.props.store.handleOrder.current + 1)
  }

}

export default withTranslation('common')(withRouter(TranslateForm));
