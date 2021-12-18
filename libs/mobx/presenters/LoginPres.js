import BasePresenterClass from "./BasePresenterClass";
import {action, makeObservable, observable, override, computed,} from "mobx";
import {inject, observer} from 'mobx-react';
import {DataService} from "../../api/data-service";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {message} from "antd"
import THelper from "../../functions/THelper";
import Cookies from 'js-cookie';
import Router from 'next/router';
import ServiceModel from "../models/Utility/ServiceModel";

export default class LoginPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading;
  @persist @observable loading = false;
  @persist @observable forgotLoading = false;
  @persist @observable ServiceList = [];
  @persist @observable errors = [];
  @persist @observable username = "";
  @persist @observable password = "";
  @persist @observable token = "";
  @persist @observable wallet = "";


  //visibility Form//
  @persist @observable WelcomeVisibility = true;
  @persist @observable LoginVisibility = false;
  @persist @observable RegisterVisibility = false;
  @persist @observable forgotVisibility = false;
  //visibility Form//



  ////Login////
  onSuccessLogin = (res,callback) => {
    console.log(res)

    this.loadingVisibility = true;
    this.WelcomeVisibility = false;
    this.LoginVisibility = false;
    this.RegisterVisibility = false;
    this.forgotVisibility = false;
    this.loading = false;
    Cookies.set('token', res.data.access_token, {expires: 30});
    this.getUserInfo()
    callback()
  }
  onErrorLogin = (e) => {
    console.log(e)
    this.loading = false
    if(e.data){  this.errors=e.data.message}
  }
  @action Login = (data = {},callback, route = 'login') => {
    this.loading = true
    DataService.sendData(data, route,(res)=> this.onSuccessLogin(res,callback), this.onErrorLogin)
  }
  ////Login////




  ///getUserInfo///
  onErrorGetUser = (e) => {
    console.log(e)
  }
  getUserInfoSuccess = async (res) => {

    message.success(THelper.t("message.logged_in"));
    await localStorage.clear()
    await localStorage.setItem('user_id', res.data.user_id);
    await localStorage.setItem('name', res.data.name);
    await localStorage.setItem('balance', res.data.balance);
    await localStorage.setItem('family', res.data.family);
    await localStorage.setItem('mobile', res.data.mobile);
    await localStorage.setItem('email', res.data.email);
    await localStorage.setItem('role', res.data.role);
    await localStorage.setItem('status', res.data.status);
    await localStorage.setItem('code', res.data.code);
    await localStorage.setItem('degree', res.data.degree);
    await localStorage.setItem('address', res.data.address);
    await localStorage.setItem('image', res.data.image);
    await localStorage.setItem('background_image', res.data.background_image);
    await localStorage.setItem('created_at', res.data.created_at);

    console.log(localStorage)
    Cookies.set("isAuth",1)
    location.replace("/panel");
  }
  @action getUserInfo = (data = {}, route = 'userInfo') => {
    DataService.fetchData(data, route, this.getUserInfoSuccess, this.onErrorGetUser)
  }
  ///getUserInfo///





///getRegisterInfo///
  onErrorRegisterUser = (e) => {
    if(e.data) {
      if (e.data.item) {
        Object.keys(e.data.item.item).map(i => {
          this.errors = {email: e.data.item.item[i][0]}
        })
      }
      if (e.data.error) {
        this.errors = {code: e.data.error}
      }
    }
  }
  onSuccessRegisterUser = (res, _callBack) => {
    Cookies.set("token",res.data.access_token, {expires: 30})
    this.getUserInfo()
    _callBack()
  }
  @action registerUser = (data = {}, _callBack, route = 'registerUser') => {
    this.stateView = StateView.State.loading
    DataService.sendData(data, route, (res) => this.onSuccessRegisterUser(res, _callBack), this.onErrorRegisterUser)
  }
  ///getRegisterInfo///





  ///get Validate User ///
  onErrorValidate = (e) => {
    console.log(e)
    if(e.data.message){
    this.errors = "کاربری با این ایمیل یافت نشد، برای ثبت نام از شماره موبایل استفاده کنید"}
    this.loading = false
  }
  onSuccessValidate = (res, _callBackValidate) => {
    if (res.code === 200) {
      _callBackValidate(res.data.message, "login")
    } else {
      _callBackValidate(res.data.message, "signup")
    }

    this.loading = false
  }
  @action validate = (data = {}, _callBackValidate, route = 'validate') => {
    this.loading = true
    DataService.sendData(data, route, (res) => this.onSuccessValidate(res, _callBackValidate), this.onErrorValidate)
  }
  ///get Validate User ///





  ///get Forgot Password ///
  onErrorForgotPassword = (e) => {
    console.log(e)
    this.forgotLoading = false
  }
  onSuccessForgotPassword = (res, _callBackForgot) => {
    _callBackForgot(res.data.message)
    this.forgotLoading = false
  }
  @action forgotPassword = (data = {}, _callBackForgot, route = 'forgotPassword') => {
    this.forgotLoading = true
    DataService.sendData(data, route, (res) => this.onSuccessForgotPassword(res, _callBackForgot), this.onErrorForgotPassword)
  }
  ///get  Forgot Password ///




  ///get Resend Code Register///
  onErrorResendCodeRegister = (e) => {
    console.log(e)
    this.loading = false
  }
  onSuccessResendCodeRegister = (res,callBack) => {
    message.success(res.data.message)
    console.log(res)
    callBack()
  }
  @action resendCodeRegister = (data = {},callBack, route = 'resendCodeRegister') => {
    DataService.sendData(data, route, (res)=>this.onSuccessResendCodeRegister(res,callBack), this.onErrorResendCodeRegister)
  }
  ///get  Resend Code Register///




  ///resendCodeForgot ///
  onErrorResendCodeForgot = (e) => {
    console.log(e)
    this.loading = false
  }
  onSuccessResendCodeForgot = (res,callBack) => {
    this.loading=false
    message.success(res.data.message)
    console.log(res)
    callBack()
  }
  @action resendCodeForgot = (data = {},callBack, route = 'resendCodeForgot') => {
    this.loading=true
    DataService.sendData(data, route, (res)=>this.onSuccessResendCodeForgot(res,callBack), this.onErrorResendCodeForgot)
  }
  ///resendCodeForgot ///







  ///verifyCodeForgot ///
  onErrorVerifyCodeForgot = (e) => {
    console.log(e)
    this.loading = false
    this.errors=e.data.errors
  }
  onSuccessVerifyCodeForgot = (res,callBack) => {
    this.loading=false
    this.token=res.data.token
    callBack()
  }
  @action verifyCodeForgot = (data = {},callBack, route = 'verifyCodeForgot') => {
    this.loading=true
    DataService.sendData(data, route, (res)=>this.onSuccessVerifyCodeForgot(res,callBack), this.onErrorVerifyCodeForgot)
  }
  ///verifyCodeForgot ///






  ///Change Password Mobile///
  onErrorChangePasswordByMobile = (e) => {
    console.log(e)
    this.loading = false
  }
  onSuccessChangePasswordByMobile = (res,callBack) => {
    this.loading=false
    Cookies.set("token",res.data.access_token, {expires: 30})
    message.success("رمز عبور به درستی تعویض شد")
    callBack()
  }
  @action changePasswordByMobile = (data = {},callBack, route = 'changePasswordByMobile') => {
    this.loading=true
    DataService.sendData(data, route,(res)=> this.onSuccessChangePasswordByMobile(res,callBack), this.onErrorChangePasswordByMobile)
  }
  ///Change Password Mobile///







   ///Change Password Email///
  onErrorChangePasswordByEmail = (e) => {
    console.log(e)
    this.loading = false
  }
  onSuccessChangePasswordByEmail = (res) => {
    this.loading=false
    console.log(res);
    message.success(res.data.message)
  }
  @action changePasswordByEmail = (data = {}, route = 'changePasswordByEmail') => {
    this.loading=true
    DataService.sendData(data, route, this.onSuccessChangePasswordByEmail, this.onErrorChangePasswordByEmail)
  }
  ///Change Password Email///







  ///Log Out User///
  onErrorLogOut = (e) => {
    console.log(e)
    this.loading = false
  }
  onSuccessLogOut = (res) => {
    message.success("شما از سایت خارج شدید")
    this.loading=false
    localStorage.clear()
    Cookies.remove('token')
    Cookies.remove('expires_at')
    Cookies.remove('token_type')
    Cookies.remove('isAuth')
    location.replace('/home')
  }
  @action logOut = (data = {}, route = 'logOut') => {
    this.loading=true
    DataService.sendData(data, route, this.onSuccessLogOut, this.onErrorLogOut)
  }
  ///Log Out User///







  //get Service List//
  onErrorGetServiceList = (err) => {
    console.log(err)
  }
  onSuccessGetServiceList = (res) => {
    const arr=[]
    res.data.items.map(item=>{
      const model=new ServiceModel();
      model.setVals(item);
      arr.push(model)
    })
      this.ServiceList=arr;
  }
  @action getServiceList = (data = {}, route = 'ServiceList') => {
    DataService.fetchData(data, route, this.onSuccessGetServiceList, this.onErrorGetServiceList)
  }
  //get Service List//




  ///getBalanceUser///
  onErrorGetBalanceUser = (e) => {
    console.log(e)
  }
  onSuccessGetBalanceUser = (res) => {
    this.wallet=res.data.value
  }
  @action getBalanceUser = (data = {}, route = 'getBalanceUser') => {
    DataService.fetchData(data, route, this.onSuccessGetBalanceUser, this.onErrorGetBalanceUser)
  }
  ///getBalanceUser///
}