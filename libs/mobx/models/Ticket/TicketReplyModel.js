import {action, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";
import StepModel from "../Order/StepModel";
import UserModel from "../User/UserModel";
import {DataService} from "../../../api/data-service";
import Router from 'next/router';

export default class TicketReplyModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable ticket_id = "";
  @observable add_by = "";
  @observable created_at = "";
  @observable file = "";
  @observable user_id = "";
  @observable message = "";
  @observable user = new UserModel();
  @observable loading = false;




  ///getAddTicket///
  onErrorGetFileTicket = (e) => {
    console.log(e)
    this.loading=false
  }
  onSuccessGetFileTicket = (res) => {
    this.loading=false
    Router.push(res.data.link)

  }
  @action getFileTicket = (data = {}, route = 'getFileTicket') => {
    data.ticket_id=this.file.ticket_id
    data.id=this.file.id
    this.loading=true
    DataService.sendData(data, route, this.onSuccessGetFileTicket, this.onErrorGetFileTicket)
  }
  ///getAddTicket///
}




