import BasePresenterClass from "./BasePresenterClass";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {action, makeObservable, observable, override, computed} from "mobx";
import {DataService} from "../../api/data-service";
import {message} from "antd";

import ArticleModel from "../models/Profile/ArticleModel";


export default class ArticlePres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading


  @observable loading = false
  @observable articleList = []
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
      const education = new ArticleModel()
      education.setVals(item)
      arr.push(education)
    })
    this.articleList=arr
    this.stateView = StateView.State.content
  }
  @action getArticleList = (data = {}, route = 'getArticleList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetArticleList, this.onErrorGetArticleList)
  }
  ///getArticleList///





  ///getDeleteJob///
  onErrorGetDeleteArticle = (e) => {
    console.log(e)
    this.loading=false
  }
  onSuccessGetDeleteArticle = (res,callBack) => {
    message.success(res.data.message)
    this.loading=false
    callBack()
  }
  @action getDeleteArticle = (data = {},callBack, route = 'getArticleDelete') => {
    this.loading=true
    DataService.sendData(data, route, (res)=>this.onSuccessGetDeleteArticle(res,callBack), this.onErrorGetDeleteArticle)
  }
  ///getDeleteJob///




  ///getAddJob///
  onErrorGetArticleAdd = (e) => {
    console.log(e)
    this.loading=false
  }
  onSuccessGetArticleAdd = (res,callBack) => {
    const job=new ArticleModel()
    job.setVals(res.data.item)
    this.articleList=[job,...this.articleList]
    message.success("سابقه تحصیلی با موفقیت ثبت شد")
    this.loading=false
    callBack()
  }
  @action getArticleAdd = (data = {},callBack, route = 'getArticleAdd') => {
    this.loading=true
    DataService.sendData(data, route, (res)=>this.onSuccessGetArticleAdd(res,callBack), this.onErrorGetArticleAdd)
  }
  ///getAddJob///







  ///getEducationUpload///
  onErrorGetArticleUpload = (e) => {
    console.log(e)
    if(e.data.errors){this.error=e.data.errors[0]}
    this.loading=false
  }
  onSuccessGetArticleUpload = (res) => {
    this.file=res.data.item
    this.loading=false
  }
  @action getArticleUpload = (data = {}, route = 'getArticleUpload') => {
    this.loading=true
    DataService.sendData(data, route, this.onSuccessGetArticleUpload, this.onErrorGetArticleUpload)
  }
  ///getEducationUpload///

}