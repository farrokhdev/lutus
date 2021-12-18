import {action,override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import UserModel from "../User/UserModel";
import TicketReplyModel from "./TicketReplyModel";
import {DataService} from "../../../api/data-service";
import Router from 'next/router';

export default class TicketViewModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable department = "";
  @observable add_by = "";
  @observable created_at = "";
  @observable file = "";
  @observable subject = "";
  @observable message = "";
  @observable order_id = "";
  @observable replies = "";
  @observable ticket_number = "";
  @observable status = "";
  @observable loading = "";
  @observable ticket_id = "";


  @observable user = new UserModel();






  @override setVals = (data) => {
    try {
      Object.keys(data).map(key => {
        switch (key) {
          case "replies":
            const replies = []
            data[key].map(arrObj => {
              const Model = new TicketReplyModel()
              Model.setVals(arrObj)
              replies.push(Model)
            })
            this.replies = replies
            break;
          default:
            if (this[key] !== undefined) {
              this[key] = data[key]
            }
        }
      })
    } catch (e) {
      console.log("ticket View error")
    }
  }


  ///getAddTicket///
  onErrorGetFileTicket = (e) => {
    console.log(e)
    this.loading=false
  }
  onSuccessGetFileTicket = (res) => {
    this.loading=false
    Router.push(res.data.link)
    console.log(res.data.link)
  }
  @action getFileTicket = (data = {}, route = 'getFileTicket') => {
    data.ticket_id=this.file.ticket_id
    data.id=this.file.id
    this.loading=true
    DataService.sendData(data, route, this.onSuccessGetFileTicket, this.onErrorGetFileTicket)
  }
  ///getAddTicket///

}