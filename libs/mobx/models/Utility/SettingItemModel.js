import {action, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";
import FeatureModel from "../Order/FeatureModel";
import {DataService} from "../../../api/data-service";
import StateView from "../../../components/UI/StateView/StateView";


export default class SettingItemModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable key = "";
  @observable title = "";
  @observable sms = "";
  @observable loading = {sms:false,email:false};
  // @observable loading = false;
  @observable email = "";








}
