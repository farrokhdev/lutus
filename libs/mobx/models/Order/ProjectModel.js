import {computed, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "./LanguageModel";
import FieldModal from "./FieldModal";
import ServiceModel from "../Utility/ServiceModel";



export default class ProjectModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable title = "";
  @observable order_number = "";
  @observable project_type = "";
  @observable customer_name = "";
  @observable customer_family = "";
  @observable status = "";
  @observable step = "";
  @observable created_at = "";
  @observable service = new ServiceModel();
  @observable field = new FieldModal();
  @observable options = "";
  @observable language_from_id = new LanguageModel();
  @observable language_to_id = new LanguageModel();








}
