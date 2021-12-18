import {override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";


export default class CertificateModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable title = "";
  @observable name_issuing_entity = "";
  @observable year_acquisition = "";
  @observable description = "";
  @observable file = "";

  @observable id = "";
  @observable user_id = "";
  @observable status = "";


}
