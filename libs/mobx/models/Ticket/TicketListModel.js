import {override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";
import StepModel from "../Order/StepModel";


export default class TicketListModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable department = "";
  @observable subject = "";
  @observable message = "";
  @observable ticket_number = "";
  @observable status = "";
  @observable add_by = "";


}
