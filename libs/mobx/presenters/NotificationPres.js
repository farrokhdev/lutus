import BasePresenterClass from "./BasePresenterClass";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {action, makeObservable, observable, override, computed} from "mobx";
import {DataService} from "../../api/data-service";
import ServiceModel from "../models/Utility/ServiceModel";
import BlogCategoryModel from "../models/Blog/BlogCategoryModel";
import BlogPostModel from "../models/Blog/BlogPostModel";
import BlogViewModel from "../models/Blog/BlogViewModel";
import CommentModel from "../models/Blog/commentModel";
import NotificationModel from "../models/Utility/NotificationModel";


export default class NotificationPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading

  @observable postsList = []
  @observable notifications = 0
  @observable notificationList = []
  @observable total = 0
  @observable page = 0
  @observable loading = false





  //get Category List//
  onErrorGetNotificationList = (err) => {
    console.log(err)
    this.stateView=StateView.State.error
  }
  onSuccessGetNotificationList = (res) => {
    let arr= []

    this.page=res.data.page
    this.total=res.data.total

    res.data.items.map(item=>{
      const notification =new NotificationModel()
      notification.setVals(item)
      arr.push(notification)
    })

    arr.push(...this.notificationList)
    console.log(arr)
    this.notificationList=arr

    this.stateView=StateView.State.content
  }
  @action getNotificationList = (data = {}, route = 'getNotificationList') => {
    this.stateView=StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetNotificationList, this.onErrorGetNotificationList)
  }
  //get Category List//





  //get Category List//
  onErrorGetMoreNotificationList = (err) => {
    console.log(err)
    this.loading=false
  }
  onSuccessGetMoreNotificationList = (res) => {
    let arr= []

    this.page=res.data.page
    this.total=res.data.total

    res.data.items.map(item=>{
      const notification =new NotificationModel()
      notification.setVals(item)
      arr.push(notification)
    })

    arr.push(...this.notificationList)
    this.notificationList=arr

    this.loading=false
  }
  @action getNotMoreificationList = (data = {}, route = 'getNotificationList') => {
    this.loading=true
    DataService.fetchData(data, route, this.onSuccessGetMoreNotificationList, this.onErrorGetMoreNotificationList)
  }
  //get Category List//



  //get Category List//
  onErrorGetNotificationCount = (err) => {
    console.log(err)
  }
  onSuccessGetNotificationCount = (res) => {
    this.notifications=res.data.notifications
  }
  @action getNotificationCount = (data = {}, route = 'getNotificationCount') => {

    DataService.fetchData(data, route, this.onSuccessGetNotificationCount, this.onErrorGetNotificationCount)
  }
  //get Category List//


}