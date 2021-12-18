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
import WordModel from "../models/Utility/WordModel";

export default class DictionaryPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }


  @observable FieldList = []
  @observable languageList = []
  @observable dictionaryList = []
  @observable page = ''
  @observable total = ""
  @observable loading = false
  @observable stateView = StateView.State.loading


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






  //get Language List//
  onErrorGetLanguageList = (err) => {
    console.log(err)

  }
  onSuccessGetLanguageList = (res) => {
    res.data.items.map(item=>{
      const model=new LanguageModel();
      model.setVals(item);
      this.languageList.push(model)
    })

  }
  @action getLanguageList = (data = {}, route = 'LanguageList') => {

    DataService.fetchData(data, route, this.onSuccessGetLanguageList, this.onErrorGetLanguageList)
  }
  //get Language List//






  //get Dictionary List//
  onErrorGetDictionaryList = (err) => {
    console.log(err)
    this.stateView = StateView.State.error
  }
  onSuccessGetDictionaryList = (res) => {
    console.log(res)
    this.page=res.data.page
    this.total=res.data.total
    const arr=[]
    res.data.items.map(item=>{
      const word = new WordModel()
      word.setVals(item)
      arr.push(word)
    })
    this.dictionaryList=arr
    this.stateView = StateView.State.content
  }
  @action getDictionaryList = (data = {}, route = 'listDictionary') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetDictionaryList, this.onErrorGetDictionaryList)
  }
  //get Dictionary List//






  //Add New Word Dictionary//
  onErrorAddDictionaryWord = (err) => {
    console.log(err)
    this.loadding=false
  }
  onSuccessAddDictionaryWord = (res,callBack) => {
    console.log(res)
    this.loadding=false
    callBack(res.data.message,res.data.item)
  }
  @action addDictionaryWord = (data = {},callBack, route = 'addDictionary') => {
    this.loadding=true
    DataService.sendData(data, route,(res)=> this.onSuccessAddDictionaryWord(res,callBack), this.onErrorAddDictionaryWord)
  }
  //Add New Word Dictionary//





  //Delete Word Dictionary//
  onErrorDeleteDictionaryWord = (err) => {
    console.log(err)
    this.loadding=false
  }
  onSuccessDeleteDictionaryWord = (res,callBack) => {
    console.log(res)
    message.success(res.data.message)
    callBack()
    this.loadding=false
  }
  @action deleteDictionaryWord = (data = {},callBack, route = 'deleteDictionary') => {
    this.loadding=true
    DataService.fetchData(data, route,(res)=> this.onSuccessDeleteDictionaryWord(res,callBack), this.onErrorDeleteDictionaryWord)
  }
  //Delete Word Dictionary//






  //Update Word Dictionary//
  onErrorUpdateDictionaryWord = (err) => {
    console.log(err)
    this.loadding=false
  }
  onSuccessUpdateDictionaryWord = (res,callBack) => {
    console.log(res)
    this.loadding=false
    callBack(res.data.message,res.data.item)
  }
  @action updateDictionaryWord = (data = {},callBack, route = 'updateDictionary') => {
    this.loadding=true
    DataService.sendData(data, route,(res)=> this.onSuccessUpdateDictionaryWord(res,callBack), this.onErrorUpdateDictionaryWord)
  }
  //Update Word Dictionary//
}