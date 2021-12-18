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
import EducationModel from "../models/Profile/EducationModel";


export default class EducationPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading


  @observable loading = false
  @observable educationList = []
  @observable file = ""
  @observable error = ""



  ///getEducationList///
  onErrorGetEducationList = (e) => {
    console.log(e)
    this.stateView = StateView.State.error
  }
  onSuccessGetEducationList = (res) => {
    const arr= []
    console.log(res)
    res.data.items.map(item=>{
      const education = new EducationModel()
      education.setVals(item)
      arr.push(education)
    })
    this.educationList=arr
    this.stateView = StateView.State.content
  }
  @action getEducationList = (data = {}, route = 'getEducationList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetEducationList, this.onErrorGetEducationList)
  }
  ///getEducationList///





  ///getDeleteJob///
  onErrorGetDeleteEdu = (e) => {
    console.log(e)
    this.loading=false
  }
  onSuccessGetDeleteEdu = (res,callBack) => {
    message.success(res.data.message)
    this.loading=false
    callBack()
  }
  @action getDeleteEdu = (data = {},callBack, route = 'getEducationDelete') => {
    this.loading=true
    DataService.sendData(data, route, (res)=>this.onSuccessGetDeleteEdu(res,callBack), this.onErrorGetDeleteEdu)
  }
  ///getDeleteJob///




  ///getAddJob///
  onErrorGetEducationAdd = (e) => {
    console.log(e)
    this.loading=false
  }
  onSuccessGetEducationAdd = (res,callBack) => {
    const job=new EducationModel()
    job.setVals(res.data.item)
    this.educationList=[job,...this.educationList]
    message.success("سابقه تحصیلی با موفقیت ثبت شد")
    this.loading=false
    callBack()
  }
  @action getEducationAdd = (data = {},callBack, route = 'getEducationAdd') => {
    this.loading=true
    DataService.sendData(data, route, (res)=>this.onSuccessGetEducationAdd(res,callBack), this.onErrorGetEducationAdd)
  }
  ///getAddJob///







  ///getEducationUpload///
  onErrorGetEducationUpload = (e) => {
    console.log(e)
    if(e.data.errors){this.error=e.data.errors[0]}
    this.loading=false
  }
  onSuccessGetEducationUpload = (res) => {
    this.file=res.data.item
    this.loading=false
  }
  @action getEducationUpload = (data = {}, route = 'getEducationUpload') => {
    this.loading=true
    DataService.sendData(data, route, this.onSuccessGetEducationUpload, this.onErrorGetEducationUpload)
  }
  ///getEducationUpload///

}