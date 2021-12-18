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


export default class JobsPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading


  @observable loading = false
  @observable jobsList = []

  ///getJobsList///
  onErrorGetJobsList = (e) => {
    console.log(e)
    this.stateView = StateView.State.error
  }
  onSuccessGetJobsList = (res) => {
    const arr= []
    res.data.items.map(item=>{
      const job = new CompanyModel()
      job.setVals(item)
      arr.push(job)
    })
    this.jobsList=arr
    this.stateView = StateView.State.content
  }
  @action getJobsList = (data = {}, route = 'getJobsList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetJobsList, this.onErrorGetJobsList)
  }
  ///getJobsList///





  ///getDeleteJob///
  onErrorGetDeleteJob = (e) => {
    console.log(e)
    this.loading=false
  }
  onSuccessGetDeleteJob = (res,callBack) => {
    message.success(res.data.message)
    this.loading=false
    callBack()
  }
  @action getDeleteJob = (data = {},callBack, route = 'getDeleteJob') => {
    this.loading=true
    DataService.sendData(data, route, (res)=>this.onSuccessGetDeleteJob(res,callBack), this.onErrorGetDeleteJob)
  }
  ///getDeleteJob///




  ///getAddJob///
  onErrorGetAddJob = (e) => {
    console.log(e)
    this.loading=false
  }
  onSuccessGetAddJob = (res,callBack) => {
const job=new CompanyModel()
    job.setVals(res.data.item)
    this.jobsList=[job,...this.jobsList]
    message.success("سابقه شغلی با موفقیت ثبت شد")
    this.loading=false
    callBack()
  }
  @action getAddJob = (data = {},callBack, route = 'getAddJob') => {
    this.loading=true
    DataService.sendData(data, route, (res)=>this.onSuccessGetAddJob(res,callBack), this.onErrorGetAddJob)
  }
  ///getAddJob///
}