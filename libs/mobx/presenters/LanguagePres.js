import BasePresenterClass from './BasePresenterClass'
import StateView from 'libs/components/UI/StateView/StateView'
import { persist } from 'mobx-persist'
import {
  action,
  makeObservable,
  observable,
  override,
  computed,
  makeAutoObservable,
} from 'mobx'
import handleOrderModel from '../models/Order/hanldeOrderModel'
import { DataService } from '../../api/data-service'
import LanguageModel from '../models/Order/LanguageModel'

export default class LanguagePres {
  constructor() {
    makeAutoObservable(this)
  }

  stateView = StateView.State.loading
  priceStateView = StateView.State.loading

  languageList = []
  loading = false

  /////////////////////////
  fields = []
  languages = []
  other_languages = []
  services = []
  text_services = []

  priceForWord = []

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
    this.fields = res.data.fields
    this.languages = res.data.languages
    this.other_languages = res.data.other_languages
    this.services = res.data.services
    this.text_services = res.data.text_services

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
  //get prices Language List//
  onErrorPriceCalculator = (err) => {
    this.loading = false
    console.log(err)
    this.priceStateView = StateView.State.error
  }
  onSuccessPriceCalculator = (res) => {
    this.loading = false
    const list = []
    res.data.values.map((item) => {
      list.push(item)
    })
    this.priceForWord = list
    this.priceStateView = StateView.State.content
  }
  getPriceCalculatort = (data = {}, route = 'PriceCalculator') => {
    this.loading = true
    this.priceStateView = StateView.State.loading
    DataService.sendData(
      data,
      route,
      this.onSuccessPriceCalculator,
      this.onErrorPriceCalculator,
    )
  }
  //get Language List//
}
