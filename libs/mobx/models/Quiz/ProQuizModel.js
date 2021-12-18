import {override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";
import FieldModal from "../Order/FieldModal";


export default class ProQuizModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable language_from_id= 0;
  @observable language_to_id= 0;
  @observable field_id = "";
  @observable content = "";
  @observable time = "";
  @observable add_by = "";
  @observable answer = "";
  @observable field = new FieldModal();
  @observable language_to = new LanguageModel();
  @observable language_from = new LanguageModel();



}
