import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import FormBuilder from 'antd-form-builder';
import {Avatar, Card, Spin, Form, Button} from "antd";
import ProfilePres from "../../../mobx/presenters/ProfilePres";
import StateView from "../../UI/StateView/StateView";
import UploadBox from "../../UI/UploadBox/UploadBox";

@inject("CoreStore")
@observer
class TranslatorInfo extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.store = new ProfilePres()
  }


  componentDidMount() {
    this._getData()
  }


  _getData = () => {
    this.store.getTranslatorInfo()
    this.store.getProvinceList()
    this.store.getPreviewNationalCart()
  }


  submitEditProfile = (data) => {
    this.store.getTranslatorEdit(data, this.callBackSubmit)
  }


  callBackSubmit = (data) => {
    this.props.CoreStore.user.setVals(data)
  }


  _handleUpload = (e, status) => {
    this.store.uploadErrorMsg.setVal(status, "")
    this.store.loadingUpload.setVal(status, true)
    const formData = new FormData()
    formData.append('file', e.target.files[0]);


    if (status === "image") {
      return this.store.uploadProfileImage(formData, (url) => this.callBackUpload(e, status, url), (err) => this.callBackErr(err, status), "uploadProfilePicture")
    }
    if (status === "background_image") {
      return this.store.uploadProfileImage(formData, (url) => this.callBackUpload(e, status, url), (err) => this.callBackErr(err, status), "uploadProfileBg")
    }
    if (status === "national_card_image") {
      return this.store.uploadProfileImage(formData, (url) => this.callBackUpload(e, status, url), (err) => this.callBackErr(err, status), "uploadNationalCard")
    }

  }


  callBackUpload = (e, status, url) => {
    this.store.loadingUpload.setVal(status, false)
    if (url) {
      if (status === "background_image") {
        this.store.user.setVal("background_image", url)
      }
      if (status === "image") {
        localStorage.setItem("image",url)
        this.props.CoreStore.user.image=url
        this.store.user.setVal("image", url)
      }

    } else {
      this.store.getPreviewNationalCart()
    }
  }


  callBackErr = (err, status) => {
    this.store.loadingUpload.setVal(status, false)
    this.store.uploadErrorMsg.setVal(status, err)
  }



  render() {

    const provinceOptions = this.store.provinceList.map(i => {
      return {label: i.name, value: i.id}
    })
    const cityOptions = this.store.cityList.map(i => {
      return {label: i.name, value: i.id, key: i.id}
    })

    const meta = {
      initialValues: this.store.user,
      formItemLayout: null,
      columns: 2,
      fields: [
        {key: 'name', label: "نام", placeholder: "نام", colSpan: 1, required: true},
        {key: 'family', label: "نام خانوادگی", placeholder: "نام خانوادگی", colSpan: 1, required: true},
        {
          key: 'image', label: "عکس پروفایل", colSpan: 1,
          widget: () => <UploadBox loading={this.store.loadingProfile} store={this.store} status={"image"} handleUpload={(e) => this._handleUpload(e, "image")}/>
        },
        {
          key: 'background_image', label: "عکس پس زمینه", colSpan: 1,
          widget: () => <UploadBox loading={this.store.loadingBg} store={this.store} status={"background_image"}
                                   handleUpload={(e) => this._handleUpload(e, "background_image")}/>
        },
        {
          key: 'username', label: "نام کاربری", placeholder: "نام کاربری", colSpan: 1, required: true,
          help: this.store.errList.username ?
            <span className={'err-title'}>{this.store.errList.username[0]}</span> : null
        },
        {
          key: 'mobile', label: "شماره موبایل", placeholder: "شماره موبایل", colSpan: 1, required: true,
          help: this.store.errList.mobile ? <span className={'err-title'}>{this.store.errList.mobile[0]}</span> : null
        },
        {
          key: 'national_code', label: "شماره ملی", placeholder: "شماره ملی", colSpan: 1, required: true,
          help: this.store.errList.national_code ?
            <span className={'err-title'}>{this.store.errList.national_code[0]}</span> : null
        },
        {
          key: 'email', label: "ایمیل", placeholder: "ایمیل", colSpan: 1, required: true,
          help: this.store.errList.email ? <span className={'err-title'}>{this.store.errList.email[0]}</span> : null
        },
        {key: 'address', label: "آدرس", placeholder: "آدرس", colSpan: 1, required: true},
        {key: 'title', label: "عنوان تخصصی", placeholder: "عنوان تخصصی", colSpan: 1, required: true},
        {
          key: 'province_id',
          label: 'استان',
          placeholder: "استان",
          widget: "select",
          colSpan: 1,
          required: true,
          options: provinceOptions,
          widgetProps: {
            onChange: (e) => {
              this.store.getCityList({province_id: e})
            }
          }
        },
        {
          key: 'city_id',
          label: 'شهر',
          widget: "select",
          colSpan: 1,
          required: true,
          options: cityOptions,
          widgetProps: {
            loading: this.store.loading,
            // placeholder: this.store.cityList.length < 1 ? "لطفا استان مورد نظر خود را انتخاب کنید" : this.store.cityList[0].name
          }
        },
        {
          key: 'national_card_image', label: "عکس کارت ملی", colSpan: 2,
          widget: () => <UploadBox loading={this.store.loadingNational} store={this.store} name={"amir2"}
                                   status={"national_card_image"}
                                   handleUpload={(e) => this._handleUpload(e, "national_card_image")}/>
        },
        {
          key: 'about',
          label: "درباره من",
          placeholder: "درباره من",
          colSpan: 2,
          required: true,
          widget: 'textarea',
          widgetProps: {rows: 4}
        },
      ]
    }
    return (
      <Card title={"ویرایش اطلاعات کاربری"} className="radius my-3">
        <StateView errorButtonAction={this._getData} state={this.store.stateView}>
          <Form ref={this.formRef} layout="vertical" onFinish={this.submitEditProfile}>
            <FormBuilder meta={meta} form={this.formRef}/>
            <div className="d-flex align-items-center w-100  ">
              <Button onClick={() => this.formRef.current.submit()} loading={this.store.loading}
                      className={"login-btn  w-25"}>ویرایش اطلاعات</Button>
            </div>
          </Form>
        </StateView>
      </Card>
    );
  }
}

export default TranslatorInfo;