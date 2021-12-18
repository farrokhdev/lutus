import {override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";
import FeatureModel from "../Order/FeatureModel";


export default class NotificationModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable title = "";
  @observable type = "";
  @observable description = "";
  @observable read_at = "";
  @observable created_at = "";


}
