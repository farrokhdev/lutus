import BasePresenterClass from "./BasePresenterClass";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {action, makeObservable, observable, override, computed} from "mobx";
import handleOrderModel from "../models/Order/hanldeOrderModel";
import ServiceModel from "../models/Utility/ServiceModel";
import {DataService} from "../../api/data-service";
import DestinationModel from "../models/Order/DestinationModel";
import FieldModal from "../models/Order/FieldModal";
import{message} from "antd"
import LanguageModel from "../models/Order/LanguageModel";
import ProjectModel from "../models/Order/ProjectModel";
import ProfileViewModel from "../models/Profile/ProfileViewModel";

export default class OrderPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading
  @persist @observable stateViewOrigin = StateView.State.loading
  @persist @observable stateViewDestination = StateView.State.loading

  @observable handleOrder = new handleOrderModel()
  @observable ServiceList = []
  @observable FieldList = []
  @observable languageList = []
  @observable DestinationList = []
  @observable serviceSelect = new ServiceModel()
  @observable order_view = new ProjectModel()
  @observable profileView = new ProfileViewModel()


  @observable voice_file_option= "";
  @observable video_file_option= "";


  @action changeValue=(nameValue,data)=>{
    this.handleOrder.setVal(nameValue,data);
    this.stateView = StateView.State.content

    // console.log(nameValue,data)
    // console.log(this.handleOrder[nameValue])
  }

  @computed get organizational_chart_id() {
    return this.organizational_chart ? this.organizational_chart.key : ''
  }


  //get Service List//
  onErrorGetServiceList = (err) => {
    console.log(err)
    this.stateView = StateView.State.error
  }
  onSuccessGetServiceList = (res) => {
    res.data.items.map(item => {
      const model = new ServiceModel();
      model.setVals(item);
      this.ServiceList.push(model)
    })
    this.stateView = StateView.State.content
  }
  @action getServiceList = (data = {}, route = 'ServiceList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetServiceList, this.onErrorGetServiceList)
  }
  //get Service List//



  //get Origin Language//
  onErrorGetOriginLanguage = (err) => {
    console.log(err)
    this.stateViewOrigin = StateView.State.error
  }
  onSuccessGetOriginLanguage = (res) => {
    this.serviceSelect.setVals(res.data.item)
    this.stateViewOrigin = StateView.State.content
  }
  @action getOriginLanguage = (data = {}, route = 'ServiceDetail') => {
    this.stateViewOrigin = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetOriginLanguage, this.onErrorGetOriginLanguage)
  }
  //get Origin Language//




  //get Destination Language//
  onErrorGetDestinationLanguage = (err) => {
    console.log(err)
    this.stateViewDestination = StateView.State.error
  }
  onSuccessGetDestinationLanguage = (res) => {
    console.log(res)
    const arr = []
    res.data.items.map(i => {
      const language = new LanguageModel()
      language.setVals(i)
      arr.push(language)
    })
    this.DestinationList = arr
    this.stateViewDestination = StateView.State.content
  }
  @action getDestinationLanguage = (data = {}, route = 'ServiceDestinationLanguage') => {
    this.stateViewDestination = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetDestinationLanguage, this.onErrorGetDestinationLanguage)
  }
  //get Destination Language//





  // get Field List//
  onErrorGetFieldList = (err) => {
    console.log(err)
  }
  onSuccessGetFieldList = (res) => {
    const arr=[]
    res.data.items.map(i=>{
      const field=new FieldModal();
      field.setVals(i);
      arr.push(field)
    })
    this.FieldList=arr
  }
  @action getFieldList = (data = {}, route = 'FieldList') => {
    DataService.fetchData(data, route, this.onSuccessGetFieldList, this.onErrorGetFieldList)
  }
  // get Field List//




  // get Field List//
  onErrorGetUploadFile = (err) => {
    console.log(err)
  }
  onSuccessGetUploadFile = (res) => {
    console.log(res)
  }
  @action uploadFile = (data = {}, route = 'uploadFile') => {
    DataService.sendData(data, route, this.onSuccessGetUploadFile, this.onErrorGetUploadFile)
  }
  // get Field List//





  // send submitOrder//
  onErrorSubmitOrder = (err) => {
    console.log(err)
    message.error("سیستم با خطا روبرو شد!")
    this.loading=false
  }
  onSuccessSubmitOrder = (res,_callBack) => {
    message.success(res.data.message)
    this.loading=false
    console.log(res)
    _callBack(res.data.order_id)
  }
  @action submitOrder = (data = {},_callBack, route = 'submitOrder') => {
    this.loading=true
    DataService.sendData(data, route, (res)=>this.onSuccessSubmitOrder(res,_callBack), this.onErrorSubmitOrder)
  }
  // send submitOrder//





  // Order View //
  onErrorOrderView = (err) => {
    console.log(err)
    this.stateView=StateView.State.error
  }
  onSuccessOrderView = (res) => {
    this.stateView=StateView.State.error
    this.order_view.setVals(res.data.item)
  }
  @action orderView = (data = {}, route = 'orderView') => {
    this.stateView=StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessOrderView, this.onErrorOrderView)
  }
  // Order View //







  //get Language List//
  onErrorGetLanguageList = (err) => {
    console.log(err)
    this.stateView = StateView.State.error
  }
  onSuccessGetLanguageList = (res) => {
    res.data.items.map(item=>{
      const model=new LanguageModel();
      model.setVals(item);
      this.languageList.push(model)
    })
    this.stateView = StateView.State.content
  }
  @action getLanguageList = (data = {}, route = 'LanguageList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetLanguageList, this.onErrorGetLanguageList)
  }
  //get Language List//





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
