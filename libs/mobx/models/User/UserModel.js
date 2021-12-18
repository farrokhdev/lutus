import {computed, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import FieldModal from "../Order/FieldModal";
import LanguageModel from "../Order/LanguageModel";
import ServiceModel from "../Utility/ServiceModel";


export default class UserModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable user_id = "";
  @observable name = "";
  @observable family = "";
  @observable mobile = "";
  @observable email = "";
  @observable role = "";
  @observable degree = "";
  @observable address = "";
  @observable balance = "";
  @observable image = "";
  @observable national_code = "";
  @observable national_card_image = "";
  @observable about = "";
  @observable title = "";
  @observable city_id = "";
  @observable province_id = "";
  @observable username = "";
  @observable background_image = "";
  @observable created_at = "";
  @observable code = "";
  @observable status = "";


  @computed get full_name (){
    return this.name + " " + this.family
  }
}
