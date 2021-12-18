import BasePresenterClass from "./BasePresenterClass";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {action, makeObservable, observable, override, computed} from "mobx";
import {DataService} from "../../api/data-service";
import ProjectsListModel from "../models/Panel/ProjectsListModel";
import Router from 'next/router';
import ProjectViewModel from "../models/Panel/ProjectViewModel";
import {message} from "antd";


export default class TranslatorPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }


  @persist @observable stateView = StateView.State.loading
  @observable projectView = new ProjectViewModel()
  @observable projectsList = []
  @observable page = ""
  @observable pagesize = ""
  @observable total = ""
  @observable errMsg = ""
  @observable fileId = ""
  @observable fileName = ""
  @observable loading = false;
  @observable endLoading = false;
  @observable certificate = false;
  @observable loadingEnseraf = false;
  @observable TimeModal = false;
  @observable loadingTime = false;


  //get Category List//
  onErrorGetProjectList = (err) => {
    console.log(err)
    if (err.code===403){
      this.certificate=true
      this.stateView = StateView.State.content
    }else this.stateView = StateView.State.error
  }
  onSuccessGetProjectList = (res) => {

    let arr = []
    res.data.items.map((item, index) => {
      const project = new ProjectsListModel()
      project.setVals(item)
      arr.push(project)
    })
    this.projectsList = arr
    this.page = res.data.page
    this.pagesize = res.data.pagesize
    this.total = res.data.total
    this.stateView = StateView.State.content
  }
  @action getProjectList = (data = {}, route = 'translatorProjectsList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetProjectList, this.onErrorGetProjectList)
  }
  //get Category List//






  // getFileUser //
  onErrorDownloadOrderFileUser = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessDownloadOrderFileUser = (res) => {
    Router.push(res.data.link)
    this.loading = false
  }
  @action downloadOrderFileUser = (data = {}, route = 'getDownloadedFile') => {
    this.loading = true
    DataService.sendData(data, route, this.onSuccessDownloadOrderFileUser, this.onErrorDownloadOrderFileUser)
  }
  // getFileUser //





  //get Category List//
  onErrorGetMissProjectList = (err) => {
    console.log(err)
    if (err.code===403){
      this.certificate=true
      this.stateView = StateView.State.content
    }else this.stateView = StateView.State.error
  }
  onSuccessGetMissProjectList = (res) => {
    let arr = []
    res.data.items.map((item, index) => {
      const project = new ProjectsListModel()
      project.setVals(item)
      arr.push(project)
    })
    this.projectsList = arr
    this.page = res.data.page
    this.total = res.data.total
    this.stateView = StateView.State.content
  }
  @action getMissProjectList = (data = {}, route = 'getMissOrderView') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetMissProjectList, this.onErrorGetMissProjectList)
  }
  //get Category List//




  //get Projects View//
  onErrorGetProjectView = (err) => {
    console.log(err)
    this.stateView = StateView.State.error
  }
  onSuccessGetProjectView = (res) => {
    this.projectView.setVals(res.data.item)
    this.stateView = StateView.State.content
  }
  @action getProjectView = (data = {}, route = 'translatorProjectView') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetProjectView, this.onErrorGetProjectView)
  }
  //get Projects View//



  // Download Order file //
  onErrorDownloadOrderFile = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessDownloadOrderFile = (res) => {
    Router.push(res.data.link)
    this.loading = false
  }
  @action downloadOrderFile = (data = {}, route = 'translatorProjectDownload') => {
    this.loading = true
    DataService.fetchData(data, route, this.onSuccessDownloadOrderFile, this.onErrorDownloadOrderFile)
  }
  // Download Order file //


  //ِSuggest Project //
  onErrorSuggestProject = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessSuggestProject = (res,callBack) => {
    message.success(res.data.message)
    this.loading = false
    this.projectView.suggestion=1
    console.log("//////")
    console.log(this.projectView)
    console.log("//////")
    callBack()
  }
  @action suggestProject = (data = {},callBack, route = 'translatorProjectSuggest') => {
    this.loading = true
    DataService.sendData(data, route, (res)=>this.onSuccessSuggestProject(res,callBack), this.onErrorSuggestProject)
  }
  //ِSuggest Project//




  //ِSuggest Project //
  onErrorSuggestFreeLancerProject = (err,callBackError) => {
    console.log(err)
    this.loading = false
    callBackError(err.data.amount[0])
  }
  onSuccessSuggestFreeLancerProject = (res,callBack) => {
    message.success(res.data.message)
    this.loading = false
    callBack()
  }
  @action suggestFreeLancerProject = (data = {},callBack,callBackError, route = 'translatorProjectSuggest') => {
    this.loading = true
    DataService.sendData(data, route, (res)=>this.onSuccessSuggestFreeLancerProject(res,callBack), err=>this.onErrorSuggestFreeLancerProject(err,callBackError))
  }
  //ِSuggest Project//




  // Delete Project //
  onErrorDeleteProject = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessDeleteProject = (res,callBack) => {
    message.success(res.data.message)
    this.loading = false
    this.projectView.setVal('suggestion', 0)
    callBack()
  }
  @action deleteProject = (data = {},callBack, route = 'translatorProjectDelete') => {
    this.loading = true
    DataService.sendData(data, route, (res)=>this.onSuccessDeleteProject(res,callBack), this.onErrorDeleteProject)
  }
  // Delete Project //



  // Upload File//
  onErrorUploadFileTranslator = (err) => {
    console.log(err)
    if (err.data) {
      this.errMsg = err.data.file
    }
    this.loading = false
  }
  onSuccessUploadFileTranslator = (res) => {
    this.fileId = res.data.item.id
    this.loading = false
  }
  @action uploadFileTranslator = (data = {}, route = 'translatorUploadFile') => {
    this.loading = true
    this.errMsg = ""
    DataService.sendData(data, route, this.onSuccessUploadFileTranslator, this.onErrorUploadFileTranslator)
  }
  // Upload File //



  // send File//
  onErrorSendFileTranslator = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessSendFileTranslator = (res) => {
    const index =this.projectView.steps.findIndex(i=>i.id===res.data.item.step_id);
    this.projectView.steps[index].setVal("file",res.data.item);
    message.success("فایل با موفقیت ارسال شد")
    this.fileId = ""
    this.loading = false
  }
  @action sendFileTranslator = (data = {}, route = 'translatorSendFile') => {
    data.file = this.fileId
    data.order_id = this.projectView.id
    this.loading = true
    DataService.sendData(data, route, this.onSuccessSendFileTranslator, this.onErrorSendFileTranslator)
  }
  // send File //






  // GetDownloadedFile //
  onErrorGetDownloadedFile = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessGetDownloadedFile = (res) => {
    console.log(res)
    window.open(res.data.link, "_blank")
  }
  @action getDownloadedFile = (data = {}, route = 'getDownloadedFile') => {

    DataService.sendData(data, route, this.onSuccessGetDownloadedFile, this.onErrorGetDownloadedFile)
  }
  // GetDownloadedFile  //







  // Get End Of Project //
  onErrorGetEndOfProject = (err) => {
    console.log(err)
    this.endLoading = false
  }
  onSuccessGetEndOfProject = (res) => {
    this.endLoading = false
    message.success(res.data.message)
    Router.push("/panel/translator-project")
  }
  @action getEndOfProject = (data = {}, route = 'endOfProjectTranslator') => {
    this.endLoading = true
    DataService.fetchData(data, route, this.onSuccessGetEndOfProject, this.onErrorGetEndOfProject)
  }
  // Get End Of Project  //











  // Cancel End Of Project //
  onErrorGetCancelProject = (err) => {
    console.log(err)
    this.endLoading = false
  }
  onSuccessGetCancelProject = (res) => {
    this.endLoading = false
    message.success(res.data.message)
    Router.push("/panel/translator-project")
  }
  @action getCancelProject = (data = {}, route = 'cancelProjectTranslator') => {
    this.endLoading = true
    DataService.sendData(data, route, this.onSuccessGetCancelProject, this.onErrorGetCancelProject)
  }
  // Cancel End Of Project  //






  // Cancel End Of Project //
  onErrorTranslatorSelectProject = (err) => {
    console.log(err)
    this.endLoading = false
  }
  onSuccessTranslatorSelectProject = (res) => {
    this.endLoading = false
    message.success(res.data.message)
    Router.push("/panel/translator-project")

  }
  @action translatorSelectProject = (data = {}, route = 'translatorSelectProject') => {
    this.endLoading = true
    DataService.sendData(data, route,res=> this.onSuccessTranslatorSelectProject, this.onErrorTranslatorSelectProject)
  }
  // Cancel End Of Project  //






  // Cancel End Of Project //
  onErrorAcceptPaySteps = (err) => {
    console.log(err)

  }
  onSuccessAcceptPaySteps = (res,callback) => {
    console.log(res)

    callback()
  }
  @action acceptPaySteps = (data = {},callback, route = 'acceptPaySteps') => {

    DataService.sendData(data, route,res=> this.onSuccessAcceptPaySteps(res,callback), this.onErrorAcceptPaySteps)
  }
  // Cancel End Of Project  //


  // cancel cancel project

  // Cancel End Of Project //
  onErrorGetDeCancelProject = (err) => {
    this.loadingEnseraf = false
    message.error('خطا در بر قراری ارتباط')

  }
  onSuccessGetDeCancelProject = (res) => {
    this.loadingEnseraf = false
    this.projectView.resignation = false;
    message.success(res.data.message)
    // Router.push("/panel/translator-project")
  }
  @action getDeCancelProject = (data = {}, route = 'translatorDeCancel') => {
    this.loadingEnseraf = true
    data.order_id= this.projectView.id;
    DataService.sendData(data, route, this.onSuccessGetDeCancelProject, this.onErrorGetDeCancelProject)
  }


  // Add Time to Project
  onErrorGetDeCancelProject = (err) => {
    this.loadingTime = false;
    if(err.data.error != undefined){
      message.error(err.data.error);
    }else {
      message.error('خطا در بر قراری ارتباط')
    }

  }
  onSuccessGetDeCancelProject = (res) => {
    this.loadingTime = false
    // message.success('درخواست شما با موفقیت ارسال شد و بعد از بررسی کاربر درخواست تایید می شود.');
    message.success(res.data.message);
    this.TimeModal= false;
    // Router.push("/panel/translator-project")
  }
  @action sendAddTime = (data = {}, route = 'translatorTimeAdd') => {
    this.loadingTime = true
    data.order_id= this.projectView.id;
    DataService.sendData(data, route, this.onSuccessGetDeCancelProject, this.onErrorGetDeCancelProject)
  }

}
