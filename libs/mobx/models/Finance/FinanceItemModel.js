import {override,computed, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";
import ServiceModel from "../Utility/ServiceModel";
import FieldModal from "../Order/FieldModal";
import ReviewModel from "../Order/ReviewModel";




export default class FinanceItemModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable payable_id = "";
  @observable wallet_id = "";
  @observable type = "";
  @observable amount = "";
  @observable confirmed = "";
  @observable created_at = "";

}
