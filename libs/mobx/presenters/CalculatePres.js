import BasePresenterClass from "./BasePresenterClass";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {action, makeObservable, observable, override, computed} from "mobx";
import handleOrderModel from "../models/Order/hanldeOrderModel";
import ServiceModel from "../models/Utility/ServiceModel";
import {DataService} from "../../api/data-service";
import DestinationModel from "../models/Order/DestinationModel";
import FieldModal from "../models/Order/FieldModal";
import {message} from "antd"
import LanguageModel from "../models/Order/LanguageModel";
import ProjectModel from "../models/Order/ProjectModel";
import PricePaymentUser from "../../components/PanelUser/Projects/PricePaymentUser";

export default class CalculatePres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading
  @observable loading = false


  @observable ServiceList = []
  @observable FieldList = []
  @observable languageList = []
  @observable other_languages = []
  @observable priceList = []
  @observable errMsg = false

  @observable serviceSelect = new ServiceModel()


  //get Fields Items//
  onErrorGetFieldsItem = (err) => {
    console.log(err)
    this.stateView = StateView.State.error
  }
  onSuccessGetFieldsItem = (res) => {
    const filedArr = []
    const languageArr = []
    const serviceArr = []
    const other_languages = []

    res.data.fields.map(item => {
      const field = new FieldModal()
      field.setVals(item)
      filedArr.push(field)
    })
    res.data.other_languages.map(item => {
      const field = new LanguageModel()
      field.setVals(item)
      other_languages.push(field)
    })
    res.data.languages.map(item => {
      const language = new LanguageModel()
      language.setVals(item)
      languageArr.push(language)
    })
    res.data.service.map(item => {
      const service = new ServiceModel()
      service.setVals(item)
      serviceArr.push(service)
    })

    this.ServiceList = serviceArr
    this.FieldList = filedArr
    this.languageList = languageArr
    this.other_languages = other_languages

    this.stateView = StateView.State.content
  }
  @action getFieldsItems = (data = {}, route = 'getFieldsItems') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetFieldsItem, this.onErrorGetFieldsItem)
  }
  //get Fields Items//


  //get Calculate Items//
  onErrorGetCalculatedItem = (err) => {
    console.log(err)
this.errMsg=true
    this.loading = false
  }
  onSuccessGetCalculatedItem = (res) => {
    console.log(res)
    this.priceList=res.data.values
    this.loading = false
  }
  @action getCalculatedItem = (data = {}, route = 'getCalculatedItem') => {
    this.loading = true
    DataService.sendData(data, route, this.onSuccessGetCalculatedItem, this.onErrorGetCalculatedItem)
  }
  //get Calculate Items//


}