import {action, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";
import {DataService} from "../../../api/data-service";


export default class ProfileViewModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable articles = [];
  @observable certificates = [];
  @observable education = [];
  @observable info = []
  @observable languages = [];
  @observable rates = [];
  @observable reviews = [];
  @observable jobs = [];
  @observable favorite = 0;

  @observable loading = false;
  @observable username = "";

  onErrorFavorite=(er)=>{
    console.log(er)
    this.loading=false
  }
  onSuccessFavorite=(res)=>{
    this.favorite=!this.favorite
    this.loading=false
  }
  @action getAddFavorite=(data={},route="getAddFavorite")=>{
     data.type=!this.favorite
     data.username=this.username
    this.loading=true
    DataService.sendData(data, route, this.onSuccessFavorite, this.onErrorFavorite)
  }

}
