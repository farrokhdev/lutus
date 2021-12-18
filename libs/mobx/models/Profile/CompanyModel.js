import {override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";


export default class CompanyModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable company = "";
  @observable title = "";
  @observable year_from = "";
  @observable year_to = "";
  @observable description = "";
  @observable file = "";
  @observable status = "";


}
