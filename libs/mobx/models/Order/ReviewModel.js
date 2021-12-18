import {computed, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";




export default class ReviewModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable order_id = "";
  @observable user_id = "";
  @observable title = "";
  @observable comment = "";
  @observable rate = 3;
  @observable translate_quality = 2.5;
  @observable principles_write = 2.5;
  @observable timely_delivery = 2.5;

}
