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

export default class ContactPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading


  @observable loading = false

  @observable contactList = {
    telegram:'',
    whatsapp:'',
    phone:'',
    mobile:'',
  }



  ///getTicketList///
  onErrorGetContactList = (e) => {
    console.log(e)

  }
  onSuccessGetContactList = (res) => {
    this.contactList=res.data
  }
  @action getContactList = (data = {}, route = 'contactByLotus') => {
    DataService.fetchData(data, route, this.onSuccessGetContactList, this.onErrorGetContactList)
  }
  ///getTicketList///





}