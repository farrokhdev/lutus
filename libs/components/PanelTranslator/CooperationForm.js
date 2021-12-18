import React, {Component} from 'react';
import {Spin,Form, Button,Modal, Upload} from 'antd';
import FormBuilder from 'antd-form-builder';
import {withTranslation} from "react-i18next";
import WelcomeForm from "../Login/WelcomeForm";
import LoginForm from "../Login/LoginForm";
import RegisterForm from "../Login/RegisterForm";
import ForgotForm from "../Login/ForgotForm";
import {observer} from "mobx-react";
import LoginPres from "../../mobx/presenters/LoginPres";
import CooperationPres from "../../mobx/presenters/CooperationPres";
import {PlusOutlined} from "@ant-design/icons";
import UploadBox from "../UI/UploadBox/UploadBox";

const {Dragger} = Upload;

@observer
class CooperationForm extends Component {

  constructor(props) {
   super(props);
    this.loginStore=new LoginPres();
    this.store= new CooperationPres()
  }

  state={visible:false}

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.store.getProvinceList()
  }

  isValidIranianNationalCode(input) {
    if (!/^\d{10}$/.test(input)) return false;
    const check = +input[9];
    const sum = input.split('').slice(0, 9).reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
    return sum < 2 ? check === sum : check + sum === 11;
  }


  render() {

    const {t} = this.props
    const DegreeOption=[
    {value:"Diploma",label:"دیپلم"},
    {value:"Bachelor",label:"لیسانس"},
    {value:"Master",label:"فوق لیسانس"},
    {value:"Phd",label:"دکتری"}
    ]
    const ProvinceOptions=this.store.provinceList.map(i=> {return {label:i.name,value:i.id}})
    const CityOptions=this.store.cityList.map(i=> {return {label:i.name,value:i.id}})
    const {forgotVisibility, RegisterVisibility, LoginVisibility, WelcomeVisibility} = this.loginStore;
    const meta = {
      formItemLayout: null,
      columns: 4,
      fields: [
        {
          key: 'national_code', label: 'کد ملی', colSpan: 2,required:true,
          rules: [
            {

              validator: (rule, value, callback) => {
                return new Promise((resolve, reject) => {

                  if (!this.isValidIranianNationalCode(value)) {
                    reject(new Error('لطفا کد ملی خود را صحیح وارد کنید'))
                  } else {
                    resolve()
                  }
                })
              },

            },
          ],
        },
        {key: 'degree', label: 'مدرک تحصیلی', widget: "select", colSpan: 2,options:DegreeOption,required:true},
        {key: 'province_id', label: 'استان', widget: "select", colSpan: 2,required:true,options:ProvinceOptions,widgetProps: {
            onChange: (e) => {
              this.store.getCityList({province_id:e})
            }
          }},
        {key: 'city_id', label: 'شهر', widget: "select", colSpan: 2,required:true,options:CityOptions,widgetProps: {
          loading:this.store.loading,placeholder:this.store.cityList.length<1 ? "لطفا استان مورد نظر خود را انتخاب کنید":this.store.cityList[0].name
        }},

        {key: 'image', label: 'عکس پروفایل', colSpan: 2,
          widget: ()=>{
            return<div style={{height:"150px"}}>
            <Dragger listType={"picture-card"} maxCount={1} fileList={this.state.fileList}
                          type={"jpeg, jpg, png, webp, gif, pdf, zip, doc, docx, rar, csv, ptt, pttx, xlsx, xls, ppt, pptx"}
                          onRemove={(i) => deleteFile(i)} customRequest={(res) => this.handleUpload(res)}
          >
            <Spin size="large" spinning={this.state.spin} tip={"در حال آپلود"}/>
            <div className={"d-flex flex-column"}>
              <PlusOutlined/>
              <span className={"sub-title-gray my-2 "}>فایل مورد نظر خود را آپلود کنید</span>
            </div>
            {/*{showUploadError && <p className={'text-danger mt-2'}>*/}
            {/*  {uploadErrorMsg}*/}
            {/*</p>}*/}

          </Dragger>
            </div>
          }},
        {key: 'image', label: 'عکس کارت ملی', colSpan: 2,
          widget: ()=>{
            return<div style={{height:"150px"}}>
           <UploadBox/>
            </div>
          }},

        {key: 'address', label: 'ادرس',  widget: "textarea", colSpan: 2, widgetProps: {rows: 3},required:true},
        {key: 'about', label: 'درباره من', widget: "textarea", colSpan: 2, widgetProps: {rows: 3}},
      ]
    }
    return (
      <div className={"boxShadow-form p-5"}>
        <Form
          ref={this.formRef}
          layout="vertical"
          onFinish={this.handleFinish}
          onValuesChange={() => this.forceUpdate()}
        >
          <FormBuilder meta={meta} form={this.formRef}/>
          <div className="d-flex align-items-center justify-content-between">
            <div><span> با کلیک بر روی ثبت نام <a className={"text-primary"}>قوانین و مقررات</a> لوتوس نویسه را می پذیرم. </span>
            </div>
            <Button htmlType="submit" className="login-btn w-25 ">
              ثبت نام
            </Button>
          </div>

        </Form>


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
    );
  }
}

export default withTranslation("common")(CooperationForm);