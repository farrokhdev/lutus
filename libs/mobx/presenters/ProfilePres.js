import BasePresenterClass from "./BasePresenterClass";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {action, makeObservable, observable, override, computed} from "mobx";
import {DataService} from "../../api/data-service";
import {message} from "antd";
import UserModel from "../models/User/UserModel";
import fileNameModel from "../models/Utility/FileNameModel";
import UploadErrorMsgModel from "../models/Utility/uploadErrorMsgModel";
import LoadingUploadModel from "../models/Utility/loadingUploadModel";
import ProfileViewModel from "../models/Profile/ProfileViewModel";
import login from "../../../pages/login";


export default class ProfilePres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading

  @observable loadingProfile = false
  @observable loadingBg = false
  @observable loadingNational = false


  @observable loading = false
  @observable loadingMore = false
  @observable errList = []
  @observable provinceList = []
  @observable fileName = new fileNameModel()
  @observable profileView = new ProfileViewModel()
  @observable uploadErrorMsg = new UploadErrorMsgModel()
  @observable loadingUpload = new LoadingUploadModel()
  @observable cityList = []
  @observable user = new UserModel()


  ///getUserInfo///
  onErrorGetUser = (e) => {
    console.log(e)
    this.stateView = StateView.State.error
  }
  getUserInfoSuccess = (res) => {
    console.log(res)
    this.user.setVals(res.data)
    this.stateView = StateView.State.content
  }
  @action getUserInfo = (data = {}, route = 'userInfo') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.getUserInfoSuccess, this.onErrorGetUser)
  }
  ///getUserInfo///



  ///getTranslatorInfo///
  onErrorGetTranslatorInfo = (e) => {
    console.log(e)
    this.stateView = StateView.State.error
  }
  onSuccessGetTranslatorInfo = (res) => {
    this.user.setVals(res.data)
    if(res.data.province_id){this.getCityList({province_id: res.data.province_id})}
    this.stateView = StateView.State.content
  }
  @action getTranslatorInfo = (data = {}, route = 'getTranslatorInfo') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetTranslatorInfo, this.onErrorGetTranslatorInfo)
  }
  ///getTranslatorInfo///




  //getUserProfileEdit//
  onErrorGetUserProfileEdit = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessGetUserProfileEdit = (res,callBack) => {
    this.loading = false
    console.log(res)
    localStorage.setItem('name', res.data.name);
    localStorage.setItem('family', res.data.family);
    localStorage.setItem('mobile', res.data.mobile);
    localStorage.setItem('email', res.data.email);
    callBack(res.data)
  }
  @action getUserProfileEdit = (data = {},callBack, route = 'getUserProfileEdit') => {
    this.loading = true
    DataService.sendData(data, route, (res)=>this.onSuccessGetUserProfileEdit(res,callBack), this.onErrorGetUserProfileEdit)
  }
  //getUserProfileEdit//







  //getTranslatorEdit//
  onErrorGetTranslatorEdit = (err) => {
    this.errList=err.data
    this.loading = false
  }
  onSuccessGetTranslatorEdit = (res,callBack) => {
    this.loading = false
    console.log(res)
    message.success("اطلاعات با موفقیت بروز رسانی شد")
     localStorage.setItem('user_id', res.data.user_id);
     localStorage.setItem('name', res.data.name);
    localStorage.setItem('family', res.data.family);
     localStorage.setItem('mobile', res.data.mobile);
     localStorage.setItem('email', res.data.email);
     localStorage.setItem('role', res.data.role);
    localStorage.setItem('status', res.data.status);
     localStorage.setItem('code', res.data.code);
     localStorage.setItem('degree', res.data.degree);
    localStorage.setItem('address', res.data.address);
     localStorage.setItem('image', res.data.image);
    localStorage.setItem('background_image', res.data.background_image);
     localStorage.setItem('created_at', res.data.created_at);
    callBack(res.data)
  }
  @action getTranslatorEdit = (data = {},callBack, route = 'getTranslatorEdit') => {
    this.loading = true
    DataService.sendData(data, route, (res)=>this.onSuccessGetTranslatorEdit(res,callBack), this.onErrorGetTranslatorEdit)
  }
  //getTranslatorEdit//






  // get province List  //
  onErrorGetProvinceList = (err) => {
    console.log(err)
  }
  onSuccessGetProvinceList = (res) => {
    this.provinceList = res.data.items
  }
  @action getProvinceList = (data = {}, route = 'provinceList') => {
    DataService.fetchData(data, route, this.onSuccessGetProvinceList, this.onErrorGetProvinceList)
  }
  // get questions home //





  // get city List  //
  onErrorGetCityList = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessGetCityList = (res) => {
    this.cityList = res.data.items
    this.loading = false
  }
  @action getCityList = (data = {}, route = 'cityList') => {
    this.loading = true
    DataService.fetchData(data, route, this.onSuccessGetCityList, this.onErrorGetCityList)
  }
  // get city home //





  //getChangePassword//
  onErrorGetChangePassword = (err) => {
    console.log(err)
    message.error(err.data.errors)
    this.loading = false
  }
  onSuccessGetChangePassword = (res) => {
    message.success("رمز عبور شما با موفقیت تغییر کرد")
    this.loading = false
    console.log(res)
  }
  @action getChangePassword = (data = {}, route = 'getChangePassword') => {
    this.loading = true
    DataService.sendData(data, route, this.onSuccessGetChangePassword, this.onErrorGetChangePassword)
  }
  //getChangePassword//





  //uploadProfile Image//
  onErrorUploadProfileBg = (err,callBackErr) => {
    console.log(err)
    callBackErr(err.data.errors)
  }
  onSuccessUploadProfileBg = (res,callBack) => {

    console.log(res)
    message.success(res.data.message)
    callBack(res.data.url)
  }
  @action uploadProfileImage = (data = {},callBack,callBackErr, route = '') => {
    DataService.sendData(data, route, (res)=>this.onSuccessUploadProfileBg(res,callBack), (err)=>this.onErrorUploadProfileBg(err,callBackErr))
  }
  //uploadProfile Image//





  //getPreviewNationalCart//
  onErrorPreviewNationalCart = (err) => {
    console.log(err)
  }
  onSuccessPreviewNationalCart = (res) => {
    this.user.national_card_image=res
  }
  @action getPreviewNationalCart = (data = {}, route = 'previewNationalCard') => {
    DataService.fetchData(data, route, this.onSuccessPreviewNationalCart, this.onErrorPreviewNationalCart)
  }
  //getPreviewNationalCart//





  //GetProfileView//
  onErrorGetProfileView = (err) => {
    console.log(err)
    this.stateView=StateView.State.error
  }
  onSuccessGetProfileView = (res) => {
    this.profileView.setVals(res.data)
    this.stateView=StateView.State.content
  }
  @action getProfileView = (data = {}, route = 'getProfileView') => {
    this.stateView=StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetProfileView, this.onErrorGetProfileView)
  }
  //GetProfileView//

}