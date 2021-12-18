import BasePresenterClass from "./BasePresenterClass";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {action, makeObservable, observable, override, computed} from "mobx";
import {DataService} from "../../api/data-service";
import ServiceModel from "../models/Utility/ServiceModel";
import MessageModel from "../models/Utility/MessageModel";


export default class chatPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading

  @observable page = ""
  @observable pagesize = ""
  @observable hasMore = ""
  @observable total = ""
  @observable loading = false
  @observable loadingMore = false
  @observable messageList = []


  //get User Chat List//
  onErrorGetUserChatList = (err) => {
    console.log(err)
    this.stateView = StateView.State.error
  }
  onSuccessGetUserChatList = (res) => {
    this.page = res.data.page
    this.pagesize = res.data.pagesize
    this.total = res.data.total
    this.hasMore = res.data.hasMore
    const arr = []

    res.data.items.map(item => {
      const message = new MessageModel()
      message.setVals(item)
      arr.push(message)
    })
    this.messageList = arr
    this.stateView = StateView.State.content
  }
  @action getUserChatList = (data = {}, route = 'userGetChatList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetUserChatList, this.onErrorGetUserChatList)
  }
  //get User Chat List//


  //sendUserChat//
  onErrorUserSendChat = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessUserSendChat = (res, callBack) => {
    this.messageList.push(res.data.item)
    this.loading = false
    callBack()
  }
  @action sendUserChat = (data = {}, callBack, route = 'userSendChat') => {
    this.loading = true
    DataService.sendData(data, route, (res) => this.onSuccessUserSendChat(res, callBack), this.onErrorUserSendChat)
  }
  //sendUserChat//


  //sendUserChat//
  onErrorTranslateSendChat = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessTranslateSendChat = (res, callBack) => {
    this.messageList.push(res.data.item)
    callBack()
    this.loading = false
  }
  @action sendTranslateChat = (data = {}, callBack, route = 'translateSendChat') => {
    this.loading = true
    DataService.sendData(data, route, (res) => this.onSuccessTranslateSendChat(res, callBack), this.onErrorTranslateSendChat)
  }
  //sendUserChat//


  //get Translate Chat List//
  onErrorGetTranslateChatList = (err) => {
    console.log(err)
    this.stateView = StateView.State.error
  }
  onSuccessGetTranslateChatList = (res) => {
    this.page = res.data.page
    this.pagesize = res.data.pagesize
    this.total = res.data.total
    this.hasMore = res.data.hasMore
    const arr = []
    res.data.items.map(item => {
      const message = new MessageModel()
      message.setVals(item)
      arr.push(message)
    })
    this.messageList = arr

    this.stateView = StateView.State.content
  }
  @action getTranslateChatList = (data = {}, route = 'translateGetChatList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetTranslateChatList, this.onErrorGetTranslateChatList)
  }
  //get Translate Chat List//


//get Translate Chat List More//
  onErrorGetTranslateChatListMore = (err) => {
    console.log(err)
    this.loadingMore=false
  }
  onSuccessGetTranslateChatListMore = (res) => {
    this.page = res.data.page
    this.pagesize = res.data.pagesize
    this.total = res.data.total
    this.hasMore = res.data.hasMore

    res.data.items.map(item => {
      const message = new MessageModel()
      message.setVals(item)
      this.messageList.push(message)
    })

    this.loadingMore=false
  }
  @action getTranslateChatListMore = (data = {}, route = 'translateGetChatList') => {
    this.loadingMore=true
    DataService.fetchData(data, route, this.onSuccessGetTranslateChatListMore, this.onErrorGetTranslateChatListMore)
  }
  //get Translate Chat List More//


  //get User Chat ListMore//
  onErrorGetUserChatListMore = (err) => {
    console.log(err)
    this.loadingMore = false
  }
  onSuccessGetUserChatListMore = (res) => {

    this.page = res.data.page
    this.pagesize = res.data.pagesize
    this.total = res.data.total
    this.hasMore = res.data.hasMore


    res.data.items.map(item => {
      const message = new MessageModel()
      message.setVals(item)
      this.messageList.push(message)
    })

    this.loadingMore = false
  }
  @action getUserChatListMore = (data = {}, route = 'userGetChatList') => {
    this.loadingMore = true
    DataService.fetchData(data, route, this.onSuccessGetUserChatListMore, this.onErrorGetUserChatListMore)
  }
  //get User Chat ListMore//

}