import BasePresenterClass from "./BasePresenterClass";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {action, makeObservable, observable, override, computed} from "mobx";
import {DataService} from "../../api/data-service";
import ProjectViewModel from "../models/Panel/ProjectViewModel";
import {message} from 'antd'
import SuggestUserModel from "../models/Panel/SuggestUserModel";
import Router from 'next/router';
import StepModel from "../models/Order/StepModel";

export default class ProjectPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading

  @observable projectView = new ProjectViewModel()
  @observable page = ""
  @observable total = ""
  @observable prices = "";
  @observable loading = false;
  @observable editLoading = false;
  @observable paymentMethods = "";
  @observable suggestionsList = "";
  @observable translator = "";
  @observable wallet = "";
  @observable content = "";
  @observable title= "";
  @observable handlePayment = [new StepModel()];




  @action setAcountHandler(price,index){
    // handlePayment
    this.handlePayment[index].setVal('amount', price)
  }
  //get Projects View//
  onErrorGetProjectView = (err) => {
    console.log(err)
    this.stateView = StateView.State.error
  }
  onSuccessGetProjectView = (res) => {


    this.projectView.setVals(res.data.item)
    if (res.data.wallet) {
      this.wallet = res.data.wallet
    }
    if (res.data.prices) {
      this.prices = res.data.prices
    }
    if (res.data.translator) {
      this.translator = res.data.translator
    }
    if (res.data.paymentMethods) {
      this.paymentMethods = res.data.paymentMethods
    }
    if (res.data.suggestions) {
      const arr = []
      res.data.suggestions.data.map(item => {
        const suggest = new SuggestUserModel()
        suggest.setVals(item)
        arr.push(suggest)
      })
      this.suggestionsList = arr
    }
    this.stateView = StateView.State.content


  }
  @action getProjectView = (data = {}, route = 'getOrderView') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetProjectView, this.onErrorGetProjectView)
  }
  //get Projects View//





  //Payment Order//
  onErrorPaymentOrder = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessPaymentOrder = (res) => {
    console.log(res)
    if(res.data.url){
    message.success("اطلاعات تایید شد، ارسال به صفحه پرداخت")
    location.replace(res.data.url)
    }else {
    message.success("پرداخت با موفقیت انجام شد،هزینه از کیف پول شما کم شد.")
    this.projectView.status=res.data.status
    }
    this.loading = false
  }
  @action sendPaymentOrder = (data = {}, route = 'paymentOrder') => {
    this.loading = true
    DataService.sendData(data, route, this.onSuccessPaymentOrder, this.onErrorPaymentOrder)
  }
  //Payment Order//




  // Download Order file //
  onErrorDownloadOrderFile = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessDownloadOrderFile = (res) => {
    Router.push(res.data.link)
    this.loading = false
  }
  @action downloadOrderFile = (data = {}, route = 'downloadOrderFile') => {
    this.loading = true
    DataService.fetchData(data, route, this.onSuccessDownloadOrderFile, this.onErrorDownloadOrderFile)
  }
  // Download Order file //





  // getFileUser //
  onErrorDownloadOrderFileUser = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessDownloadOrderFileUser = (res) => {
    Router.push(res.data.link)
    this.loading = false
  }
  @action downloadOrderFileUser = (data = {}, route = 'getFileUser') => {
    this.loading = true
    DataService.fetchData(data, route, this.onSuccessDownloadOrderFileUser, this.onErrorDownloadOrderFileUser)
  }
  // getFileUser //




  // confirmProject //
  onErrorConfirmProjectUser = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessConfirmProjectUser = (res) => {

    message.success(res.data.message)
    this.projectView.status="confirm"
    this.loading = false
  }
  @action confirmProjectUser = (data = {}, route = 'confirmProject') => {
    this.loading = true
    DataService.sendData(data, route, this.onSuccessConfirmProjectUser, this.onErrorConfirmProjectUser)
  }
  // confirmProject //





  // confirmProject //
  onErrorConfirmStepProject = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessConfirmStepProject = (res,callBack) => {
    this.loading = false
    callBack()
  }
  @action confirmStepProject = (data = {},callBack, route = 'confirmStepProject') => {
    this.loading = true
    DataService.sendData(data, route,res=> this.onSuccessConfirmStepProject(res,callBack), this.onErrorConfirmStepProject)
  }
  // confirmProject //



  // protestProjectUser //
  onErrorProtestProjectUser = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessProtestProjectUser = (res,callBack) => {
    message.success(res.data.message)
    callBack()
    this.loading = false
  }
  @action protestProjectUser = (data = {},callBack, route = 'protestProjectUser') => {
    this.loading = true
    DataService.sendData(data, route, (res)=>this.onSuccessProtestProjectUser(res,callBack), this.onErrorProtestProjectUser)
  }
  // protestProjectUser //






  // evaluationProjectUser //
  onErrorEvaluationProjectUser = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessEvaluationProjectUser = (res,callBack) => {
    message.success(res.data.message)
    Router.push("/panel")
    callBack()
    this.loading = false
  }
  @action evaluationProjectUser = (data = {},callBack, route = 'evaluationProjectUser') => {
    this.loading = true
    DataService.sendData(data, route, (res)=>this.onSuccessEvaluationProjectUser(res,callBack), this.onErrorEvaluationProjectUser)
  }
  // evaluationProjectUser //




  // Payment Order//
  onErrorSelectTranslator = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessSelectTranslator = (res, callBack) => {
    message.success(res.data.message)
    this.loading = false
    callBack()
  }
  @action selectTranslator = (data = {}, callBack, route = 'selectTranslator') => {
    this.loading = true
    DataService.sendData(data, route, (res) => this.onSuccessSelectTranslator(res, callBack), this.onErrorSelectTranslator)
  }
  //Payment Order//




  // getOrderAccept//
  onErrorGetOrderAccept = (err) => {
    console.log(err)
    console.log(err.data);
    // message.error(err.data.error.steps[0])
    this.loading = false
  }
  onSuccessGetOrderAccept = (res, callBack) => {
    console.log(res)
    message.success('جزئیات سفارش با موفقیت ثبت شد')
    this.loading = false
    callBack()
  }
  @action getOrderAccept = (data = {}, callBack, route = 'orderAccept') => {
    this.loading = true
    DataService.sendData(data, route, (res) => this.onSuccessGetOrderAccept(res, callBack), this.onErrorGetOrderAccept)
  }
  //getOrderAccept//










  // OrderPayment//
  onErrorGetOrderPayment = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessGetOrderPayment = (res, callBack) => {
    console.log(res)
    this.loading = false
    if(res.data.payment === "url"){
      location.replace(res.data.url)
    }else{

    callBack()
    }
  }
  @action orderPayment = (data = {}, callBack, route = 'orderPayment') => {
    this.loading = true
    DataService.sendData(data, route, (res) => this.onSuccessGetOrderPayment(res, callBack), this.onErrorGetOrderPayment)
  }
  //OrderPayment//





  // rejectTranslatorSteps//
  onErrorRejectTranslatorSteps = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessRejectTranslatorSteps = (res, callBack) => {
    console.log(res)
    this.loading = false
    callBack()
  }
  @action rejectTranslatorSteps = (data = {}, callBack, route = 'rejectTranslatorSteps') => {
    this.loading = true
    DataService.sendData(data, route, (res) => this.onSuccessRejectTranslatorSteps(res, callBack), this.onErrorRejectTranslatorSteps)
  }
  //rejectTranslatorSteps//





  // editPaySteps//
  onErrorEditPaySteps = (err) => {
    console.log(err)
    this.editLoading = false
  }
  onSuccessEditPaySteps = (res, callBack) => {
    console.log(res)
    this.editLoading = false
    callBack()
  }
  @action editPaySteps = (data = {}, callBack, route = 'editPaySteps') => {
    this.editLoading = true
    DataService.sendData(data, route, (res) => this.onSuccessEditPaySteps(res, callBack), this.onErrorEditPaySteps)
  }
  //editPaySteps//









  // getOrderContent//
  onErrorGetOrderContent = (err) => {
    console.log(err)
    this.stateView=StateView.State.error
  }
  onSuccessGetOrderContent = (res) => {
    console.log(res)
    this.content=res.data.content
    this.title=res.data.title
    this.stateView=StateView.State.content
  }
  @action getOrderContent = (data = {}, route = '') => {
    this.stateView=StateView.State.loading;
    DataService.fetchData(data, route,  this.onSuccessGetOrderContent, this.onErrorGetOrderContent)
  }
  //getOrderContent//
}
