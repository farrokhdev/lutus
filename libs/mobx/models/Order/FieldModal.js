import {computed, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "./LanguageModel";



export default class FieldModal extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable field_id = "";
  @observable title = "";
  @observable type = "";
  @observable ordered = "";
  @observable items = "";
  @observable status = "";

}
