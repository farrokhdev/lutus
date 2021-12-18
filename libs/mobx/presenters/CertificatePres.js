import BasePresenterClass from "./BasePresenterClass";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {action, makeObservable, observable, override, computed} from "mobx";
import {DataService} from "../../api/data-service";
import {message} from "antd";

import ArticleModel from "../models/Profile/ArticleModel";
import CertificateModel from "../models/Profile/CertificateModel";


export default class CertificatePres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading


  @observable loading = false
  @observable certificateList = []
  @observable file = ""
  @observable error = ""



  ///getArticleList///
  onErrorGetArticleList = (e) => {
    console.log(e)
    this.stateView = StateView.State.error
  }
  onSuccessGetArticleList = (res) => {
    const arr= []
    console.log(res)
    res.data.items.map(item=>{
      const education = new CertificateModel()
      education.setVals(item)
      arr.push(education)
    })
    this.certificateList=arr
    this.stateView = StateView.State.content
  }
  @action getCertificateList = (data = {}, route = 'getCertificateList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetArticleList, this.onErrorGetArticleList)
  }
  ///getArticleList///





  ///getDeleteJob///
  onErrorGetDeleteCertificate = (e) => {
    console.log(e)
    this.loading=false
  }
  onSuccessGetDeleteCertificate = (res,callBack) => {
    message.success(res.data.message)
    this.loading=false
    callBack()
  }
  @action getCertificateDelete = (data = {},callBack, route = 'getCertificateDelete') => {
    this.loading=true
    DataService.sendData(data, route, (res)=>this.onSuccessGetDeleteCertificate(res,callBack), this.onErrorGetDeleteCertificate)
  }
  ///getDeleteJob///




  ///getAddJob///
  onErrorGetCertificateAdd = (e) => {
    console.log(e)
    this.loading=false
  }
  onSuccessGetCertificateAdd = (res,callBack) => {
    const job=new CertificateModel()
    job.setVals(res.data.item)
    this.certificateList=[job,...this.certificateList]
    message.success("مدرک تحصیلی با موفقیت ثبت شد")
    this.loading=false
    callBack()
  }
  @action getCertificateAdd = (data = {},callBack, route = 'getCertificateAdd') => {
    this.loading=true
    DataService.sendData(data, route, (res)=>this.onSuccessGetCertificateAdd(res,callBack), this.onErrorGetCertificateAdd)
  }
  ///getAddJob///







  ///getEducationUpload///
  onErrorGetCertificateUpload = (e) => {
    console.log(e)
    if(e.data.errors){this.error=e.data.errors[0]}
    this.loading=false
  }
  onSuccessGetCertificateUpload = (res) => {
    this.file=res.data.item
    this.loading=false
  }
  @action getCertificateUpload = (data = {}, route = 'getCertificateUpload') => {
    this.loading=true
    DataService.sendData(data, route, this.onSuccessGetCertificateUpload, this.onErrorGetCertificateUpload)
  }
  ///getEducationUpload///

}