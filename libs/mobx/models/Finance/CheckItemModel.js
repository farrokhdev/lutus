import {override,computed, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";





export default class CheckItemModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable amount = "";
  @observable bank_account_owner = "";
  @observable bank_card_number = "";
  @observable bank_name = "";
  @observable bank_sheba = "";
  @observable created_at = "";
  @observable id = "";
  @observable status = "";
  @observable user_id = "";


}
