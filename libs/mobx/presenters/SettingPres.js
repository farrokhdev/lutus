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
import CompanyModel from "../models/Profile/CompanyModel";
import SettingItemModel from "../models/Utility/SettingItemModel";


export default class SettingPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading


  @observable loading = false
  @observable settingList = []
  @observable wallet = ""
  @observable sms_subscribe_amount = []

  ///getSettingList///
  onErrorGetSettingList = (e) => {
    console.log(e)
    this.stateView = StateView.State.error
  }
  onSuccessGetSettingList = (res) => {
    const arr= []
    res.data.values.map(item=>{
      const set = new SettingItemModel()
      set.setVals(item)
      arr.push(set)
    })
    this.settingList=arr
    this.sms_subscribe_amount=res.data.sms_subscribe_amount
    this.stateView = StateView.State.content
  }
  @action getSettingList = (data = {}, route = 'getSettingList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetSettingList, this.onErrorGetSettingList)
  }
  ///getSettingList///




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



  ///getSettingItem///
  onErrorGetSettingItem = (e) => {
    console.log(e)
    this.settingList.map(i=>(i.loading.sms=false,i.loading.email=false))
  }
  onSuccessGetSettingItem = (res,callBack) => {
    callBack(res)
  }
  @action getSettingItem = (data = {},callBack, route = 'getSettingItem') => {
    // this.loading[data.type]=true
    DataService.sendData(data, route, res=>this.onSuccessGetSettingItem(res,callBack), this.onErrorGetSettingItem)
  }
  ///getSettingItem///




  ///getSettingItem///
  onErrorGetActiveSms = (e) => {
    console.log(e)
    this.loading=false
  }
  onSuccessGetActiveSms = (res,callBack) => {
    console.log(res)
    callBack(res)
    this.loading=false
  }
  @action getActiveSms = (data = {},callBack, route = 'getActiveSms') => {
    this.loading=true
    DataService.sendData(data, route, res=>this.onSuccessGetActiveSms(res,callBack), this.onErrorGetActiveSms)
  }
  ///getSettingItem///

}