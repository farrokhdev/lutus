import {override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import BlogCategoryModel from "./BlogCategoryModel";
import LanguageModel from "../Order/LanguageModel";


export default class CommentModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }


  @observable author_name = "";
  @observable comment = "";
  @observable parent_id = "";
  @observable id = "";
  @observable replies = "";
  @observable created_at_fa = "";


}
