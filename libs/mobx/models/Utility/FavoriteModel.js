import {action, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";
import FeatureModel from "../Order/FeatureModel";
import {DataService} from "../../../api/data-service";


export default class FavoriteModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable name = "";
  @observable family = "";
  @observable username = "";
  @observable image = "";
  @observable about = "";
  @observable title = "";
  @observable languages = [];
  @observable rate = "";
  @observable type = "";
  @observable loading = false;


  @action full_name=()=>{return this.name + " " +this.family}

  onErrorFavorite=(er)=>{
    console.log(er)
    this.loading=false
  }
  onSuccessFavorite=(res)=>{
    this.type=!this.type
    this.loading=false
  }
  @action getAddFavorite=(data={},route="getAddFavorite")=>{
    data.type=!this.type
    data.username=this.username
    this.loading=true
    DataService.sendData(data, route, this.onSuccessFavorite, this.onErrorFavorite)
  }

}
