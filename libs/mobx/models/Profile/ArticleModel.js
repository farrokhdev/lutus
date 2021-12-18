import {override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";


export default class ArticleModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable title = "";
  @observable publisher_name = "";
  @observable year_publication = "";
  @observable description = "";
  @observable file = "";

  @observable id = "";
  @observable user_id = "";
  @observable status = "";



}
