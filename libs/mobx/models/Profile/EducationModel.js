import {override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";


export default class EducationModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable user_id = "";
  @observable name_university = "";
  @observable title_field_study = "";
  @observable year_from = "";
  @observable year_to = "";
  @observable file = "";
  @observable status = "";



}
