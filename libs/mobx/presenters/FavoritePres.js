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
import FavoriteModel from "../models/Utility/FavoriteModel";
import FieldModal from "../models/Order/FieldModal";
import LanguageModel from "../models/Order/LanguageModel";
import ServiceModel from "../models/Utility/ServiceModel";


export default class FavoritePres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading


  @observable loading = false
  @observable favoriteList = []
  @observable translatorList = []
  @observable FieldList = []
  @observable languageList = []
  @observable total = ""
  @observable page = ""
  @observable pagesize = ""

  ///getFavoriteList///
  onErrorGetFavoriteList = (e) => {
    console.log(e)
    this.stateView = StateView.State.error
  }
  onSuccessGetFavoriteList = (res) => {
    const arr= []
    res.data.items.map(item=>{
      const job = new FavoriteModel()
      job.setVals(item)
      arr.push(job)
    })
    this.favoriteList=arr
    this.stateView = StateView.State.content
  }
  @action getFavoriteList = (data = {}, route = 'getFavoriteList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetFavoriteList, this.onErrorGetFavoriteList)
  }
  ///getFavoriteList///




  ///getFavoriteList///
  onErrorGetTranslatorList = (e) => {
    console.log(e)
    this.stateView = StateView.State.error
  }
  onSuccessGetTranslatorList = (res) => {
    console.log(res)
    this.page=res.data.page
    this.pagesize=res.data.pagesize
    this.total=res.data.total
    const arr= []
    res.data.items.map(item=>{
      const job = new FavoriteModel()
      job.setVals(item)
      arr.push(job)
    })
    this.translatorList=arr
    this.stateView = StateView.State.content
  }
  @action getTranslatorList = (data = {}, route = 'getTranslatorList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetTranslatorList, this.onErrorGetTranslatorList)
  }
  ///getFavoriteList///




  //get Fields Items//
  onErrorGetFieldsItem = (err) => {
    console.log(err)
  }
  onSuccessGetFieldsItem = (res) => {
    const filedArr = []
    const languageArr = []
    const serviceArr = []

    res.data.fields.map(item => {
      const field = new FieldModal()
      field.setVals(item)
      filedArr.push(field)
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


  }
  @action getFieldsItems = (data = {}, route = 'getFieldsItems') => {

    DataService.fetchData(data, route, this.onSuccessGetFieldsItem, this.onErrorGetFieldsItem)
  }
  //get Fields Items//

}