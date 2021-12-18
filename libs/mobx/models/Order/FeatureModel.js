import {computed, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";



export default class FeatureModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable title = "";
  @observable slug = "";
  @observable service_id = "";
  @observable input_type = "";
  @observable items = "";

}
