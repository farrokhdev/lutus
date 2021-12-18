import {action, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";
import FeatureModel from "../Order/FeatureModel";
import {DataService} from "../../../api/data-service";


export default class BankInfoModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable bank_name = "";
  @observable bank_account_owner = "";
  @observable bank_card_number = "";
  @observable bank_sheba = "";


}
