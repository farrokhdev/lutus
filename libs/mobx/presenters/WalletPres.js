import BasePresenterClass from "./BasePresenterClass";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {action, makeObservable, observable, override, computed} from "mobx";
import {DataService} from "../../api/data-service";
import {message} from "antd";
import FinanceItemModel from "../models/Finance/FinanceItemModel";
import BankInfoModel from "../models/Utility/BankInfoModel";
import CheckOutModel from "../models/Finance/CheckOutModel";
import IncomeModel from "../models/Finance/IncomeModel";
import CheckItemModel from "../models/Finance/CheckItemModel";

export default class WalletPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading


  @observable loading = false
  @observable certificate = false
  @observable financeList = []
  @observable incomeList = new IncomeModel()
  @observable checkOutList = new CheckOutModel()
  @observable bankInfo = new BankInfoModel()
  @observable paymentList = []
  @observable paymentResult = []
  @observable page = 0
  @observable pagesize = 0
  @observable total = 0
  @observable balance = 0
  @observable amount = 0
  @observable errMsg = ""

  ///getFinanceList///
  onErrorGetFinanceList = (e) => {
    console.log(e)
    this.stateView = StateView.State.error
  }
  onSuccessGetFinanceList = (res) => {
    const arr = []
    res.data.items.map(item => {
      const job = new FinanceItemModel()
      job.setVals(item)
      arr.push(job)
    })
    this.financeList = arr
    this.page = res.data.page
    this.pagesize = res.data.pagesize
    this.total = res.data.total
    this.balance = res.data.balance
    this.stateView = StateView.State.content
  }
  @action getFinanceList = (data = {}, route = 'getFinanceList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetFinanceList, this.onErrorGetFinanceList)
  }
  ///getFinanceList///


  ///getChargeCredit///
  onErrorGetChargeCredit = (e) => {
    console.log(e)
    this.loading = false
  }
  onSuccessGetChargeCredit = (res) => {
    message.success("اطلاعات تایید شد، ارسال به صفحه پرداخت")
    location.replace(res.data.url)
    this.loading = false
  }
  @action getChargeCredit = (data = {}, callBack, route = 'getChargeCredit') => {
    this.loading = true
    DataService.sendData(data, route, this.onSuccessGetChargeCredit, this.onErrorGetChargeCredit)
  }
  ///getChargeCredit///


  ///getPaymentList///
  onErrorGetPaymentList = (e) => {
    console.log(e)
    this.loading = false
  }
  onSuccessGetPaymentList = (res) => {
    this.paymentList = res.data.values
  }
  @action getPaymentList = (data = {}, route = 'getPaymentList') => {
    DataService.fetchData(data, route, this.onSuccessGetPaymentList, this.onErrorGetPaymentList)
  }
  ///getPaymentList///


  ///getPaymentResult///
  onErrorGetPaymentResult = (e) => {
    console.log(e)
    this.stateView = StateView.State.error
  }
  onSuccessGetPaymentResult = (res) => {
    this.paymentResult = res.data.item
    this.stateView = StateView.State.content
  }
  @action getPaymentResult = (data = {}, route = 'getPaymentResult') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetPaymentResult, this.onErrorGetPaymentResult)
  }
  ///getPaymentResult///


  ///getPaymentAgain///
  onErrorGetPaymentAgain = (e) => {
    console.log(e)
    this.stateView = StateView.State.error
  }
  onSuccessGetPaymentAgain = (res) => {
    location.replace(res.data.url)
    this.loading = false
  }
  @action getPaymentAgain = (data = {}, route = 'getPaymentAgain') => {
    this.loading = true
    DataService.fetchData(data, route, this.onSuccessGetPaymentAgain, this.onErrorGetPaymentAgain)
  }
  ///getPaymentAgain///


  ///getBankInfo///
  onErrorGetBankInfo = (e) => {
    console.log(e)

    if (e.code===403){
      this.certificate=true
      this.stateView=StateView.State.content
    }else this.stateView = StateView.State.error
  }
  onSuccessGetBankInfo = (res) => {
    if (res.data.item) {
      this.bankInfo = res.data.item
    }
    this.stateView = StateView.State.content
  }
  @action getBankInfo = (data = {}, route = 'getBankInfo') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetBankInfo, this.onErrorGetBankInfo)
  }
  ///getBankInfo///


  ///getBankInfoCreate///
  onErrorGetBankInfoCreate = (e) => {
    console.log(e)
    this.loading = false
  }
  onSuccessGetBankInfoCreate = (res, callBack) => {
    this.bankInfo = res.data.item
    callBack()
    this.loading = false
  }
  @action getBankInfoCreate = (data = {}, callBack, route = 'getBankInfoCreate') => {
    this.loading = true
    DataService.sendData(data, route, res => this.onSuccessGetBankInfoCreate(res, callBack), this.onErrorGetBankInfoCreate)
  }
  ///getBankInfoCreate///


  ///getBankInfoUpdate///
  onErrorGetBankInfoUpdate = (e) => {
    console.log(e)
    this.loading = false
  }
  onSuccessGetBankInfoUpdate = (res, callBack) => {
    console.log(res)
    this.bankInfo = res.data.item
    callBack()
    this.loading = false
  }
  @action getBankInfoUpdate = (data = {}, callBack, route = 'getBankInfoUpdate') => {
    this.loading = true
    DataService.sendData(data, route, res => this.onSuccessGetBankInfoUpdate(res, callBack), this.onErrorGetBankInfoUpdate)
  }
  ///getBankInfoUpdate///




  ///getIncomeList///
  onErrorGetIncomeList = (e) => {
    console.log(e)
    if (e.code===403){
      this.certificate=true
      this.stateView=StateView.State.content
    }else this.stateView=StateView.State.error
  }
  onSuccessGetIncomeList = (res) => {
    this.incomeList.setVals(res.data)
    this.stateView=StateView.State.content
  }
  @action getIncomeList = (data = {}, route = 'getIncomeList') => {
    this.stateView=StateView.State.loading
    DataService.fetchData(data, route,  this.onSuccessGetIncomeList, this.onErrorGetIncomeList)
  }
  ///getIncomeList///





  ///getCheckOutList///
  onErrorGetCheckOutList = (e) => {
    console.log(e)
    if (e.code===403){
      this.certificate=true
      this.stateView=StateView.State.content
    }
    else this.stateView=StateView.State.error
  }
  onSuccessGetCheckOutList = (res) => {
    this.checkOutList.setVals(res.data)
    this.stateView=StateView.State.content
  }
  @action getCheckOutList = (data = {}, route = 'getCheckOutList') => {
    this.stateView=StateView.State.loading
    DataService.fetchData(data, route,  this.onSuccessGetCheckOutList, this.onErrorGetCheckOutList)
  }
  ///getCheckOutList///





  ///getBankInfoUpdate///
  onErrorGetCheckOutOrder = (e) => {
    console.log(e)
    this.loading = false
  }
  onSuccessGetCheckOutOrder = (res, callBack) => {

    const item=new CheckItemModel()
    item.setVals(res.data.item)

    this.loading = false
    callBack(item)
  }
  @action getCheckOutOrder = (data = {}, callBack, route = 'getCheckOutOrder') => {
    this.loading = true
    DataService.sendData(data, route, res => this.onSuccessGetCheckOutOrder(res, callBack), this.onErrorGetCheckOutOrder)
  }
  ///getCheckOutOrder///
}