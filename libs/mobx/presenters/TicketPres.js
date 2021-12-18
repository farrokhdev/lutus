import BasePresenterClass from "./BasePresenterClass";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {action, makeObservable, observable, override, computed} from "mobx";
import {DataService} from "../../api/data-service";
import {message} from "antd";
import TicketListModel from "../models/Ticket/TicketListModel";
import TicketViewModel from "../models/Ticket/TicketViewModel";
import Router, {withRouter} from 'next/router'
import TicketReplyModel from "../models/Ticket/TicketReplyModel";

export default class TicketPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading


  @observable loading = false
  @observable uploadLoad = false
  @observable page = ""
  @observable pagesize = ""
  @observable total = ""
  @observable file = ""
  @observable ticketList = []
  @observable errMsg = []
  @observable content = {
    text:''
  }
  @observable ticketView = new TicketViewModel()


  ///getTicketList///
  onErrorGetTicketList = (e) => {
    console.log(e)
    this.stateView = StateView.State.error
  }
  onSuccessGetTicketList = (res) => {
    this.page=res.data.page
    this.total=res.data.total
    this.pagesize=res.data.pagesize
    const arr=[]
    res.data.items.map(item=>{
      const list=new TicketListModel()
      list.setVals(item)
      arr.push(item)
    })
    this.ticketList=arr
    this.stateView = StateView.State.content
  }
  @action getTicketList = (data = {}, route = 'getTicketList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetTicketList, this.onErrorGetTicketList)
  }
  ///getTicketList///







  ///getTicketView///
  onErrorGetTicketView = (e) => {
    console.log(e)
    this.stateView = StateView.State.error
  }
  onSuccessGetTicketView = (res) => {
    this.ticketView.setVals(res.data.item)
    this.stateView = StateView.State.content
  }
  @action getTicketView = (data = {}, route = 'getTicketView') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetTicketView, this.onErrorGetTicketView)
  }
  ///getTicketView///






  ///getAddTicket///
  onErrorGetAddTicket = (e) => {
    console.log(e)
    this.loading=false
  }
  onSuccessGetAddTicket = (res) => {
    this.loading=false
    message.success("تیک شما با موفقیت ثبت شد")
    Router.push(`/panel/supportView/${res.data.item.id}`)
  }
  @action getAddTicket = (data = {}, route = 'getAddTicket') => {
    this.loading=true
    DataService.sendData(data, route, this.onSuccessGetAddTicket, this.onErrorGetAddTicket)
  }
  ///getAddTicket///







  ///getAddTicket///
  onErrorGetReplyTicket = (e) => {
    console.log(e)
    this.loading=false
  }
  onSuccessGetReplyTicket = (res,callBack) => {
    const model =new TicketReplyModel()
    model.setVals(res.data.item)
    this.ticketView.replies.unshift(model)
    this.loading=false
    callBack()
  }
  @action getReplyTicket = (data = {},callBack, route = 'getReplyTicket') => {
    this.loading=true
    DataService.sendData(data, route, res=>this.onSuccessGetReplyTicket(res,callBack), this.onErrorGetReplyTicket)
  }
  ///getAddTicket///






  ///getAddTicket///
  onErrorGetUploadTicket = (e) => {
    console.log(e)
    if(e.data) this.errMsg=e.data.file[0]
    this.uploadLoad=false
  }
  onSuccessGetUploadTicket = (res,callBack) => {
    console.log(res)
    this.uploadLoad=false
    this.file=res.data.value
    callBack()
  }
  @action getUploadTicket = (data = {},callBack, route = 'getUploadTicket') => {
    this.uploadLoad=true
    DataService.sendData(data, route, res=>this.onSuccessGetUploadTicket(res,callBack), this.onErrorGetUploadTicket)
  }
  ///getAddTicket///






}