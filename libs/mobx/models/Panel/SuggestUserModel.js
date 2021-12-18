import {computed, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";



export default class SuggestUserModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id= "";
  @observable name= "";
  @observable family= "";
  @observable rate  = "";
  @observable about  = "";
  @observable image  = "";
  @observable amount  = "";
  @observable username  = "";
  @observable delivery_date  = "";
  @observable background_image  = "";
  @observable free_translate_text  = "";

  @computed get full_name (){
    return this.name + " " + this.family
  }
}
