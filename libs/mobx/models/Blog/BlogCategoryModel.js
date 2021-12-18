import {computed, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";



export default class BlogCategoryModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable title = "";
  @observable slug = "";
  @observable description = "";


}
