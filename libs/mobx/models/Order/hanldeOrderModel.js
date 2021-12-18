import {action,computed, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import FaceTranslationModel from "./FaceTranslationModel";



export default class handleOrderModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable current = 0;
  @observable fillForm = false;

  @observable category = "";
  @observable alias = "";
  @observable username = "";
  @observable service_id = "";
  @observable content_type = "file";
  @observable content = "";
  @observable language_from_id = "";
  @observable language_to_id = "";
  @observable language_from = "";
  @observable language_to = "";


  @observable id = "";
  @observable title = "";
  @observable field_id = "";
  @observable field_name = "";
  @observable file = "";
  @observable count = "";
  @observable reference_to_translator = "";
  @observable url = "";
  @observable confidential = "";
  @observable description = "";
  @observable freelancer_option = "";
  @observable project_type = "";
  @observable verbal = "";
  @observable quality = "normal";

  @observable additional_items = [];
  @observable verbal_dates = [];



  @observable uploadBox_text = "";
  @observable uploadBox_url= "";
  @observable feature= "";
  @observable text= {
    text:''
  };


  @observable options= "";
  @observable multimedia = "";


  @observable file_phase = "";
  @observable free_translate = "";


  @observable delivery_date = "";




}
