import BasePresenterClass from './BasePresenterClass'
import StateView from '../../components/UI/StateView/StateView'
import { persist } from 'mobx-persist'
import { action, makeObservable, observable, override, computed } from 'mobx'
import handleOrderModel from '../models/Order/hanldeOrderModel'
import { DataService } from '../../api/data-service'
import LanguageModel from '../models/Order/LanguageModel'

export default class LanguagePres extends BasePresenterClass {
  constructor() {
    super()
    makeObservable(this)
  }

  stateView = StateView.State.loading

  languageList = []
  priceslanguageList = []
  // @observable languageList = new handleOrderModel()

  //get Language List//
  onErrorGetLanguageList = (err) => {
    console.log(err)
    this.stateView = StateView.State.error
  }
  onSuccessGetLanguageList = (res) => {
    const list = []
    console.log(res)
    res.data.items.map((item) => {
      const model = new LanguageModel()
      model.setVals(item)
      list.push(model)
    })

    this.languageList = list
    this.stateView = StateView.State.content
  }
  getLanguageList = (data = {}, route = 'LanguageList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(
      data,
      route,
      this.onSuccessGetLanguageList,
      this.onErrorGetLanguageList,
    )
  }
  //get Language List//
  //get prices Language List//
  onErrorPricesLangList = (err) => {
    console.log(err)
    this.stateView = StateView.State.error
  }
  onSuccessPricesLangList = (res) => {
    const list = []
    res.data.items.map((item) => {
      const model = new LanguageModel()
      model.setVals(item)
      list.push(model)
    })

    this.priceslanguageList = list
    this.stateView = StateView.State.content
  }
  getPricesLanguageList = (data = {}, route = 'PricesLanguageList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(
      data,
      route,
      this.onSuccessPricesLangList,
      this.onErrorPricesLangList,
    )
  }
  //get Language List//
}
