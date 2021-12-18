import {override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";
import FeatureModel from "../Order/FeatureModel";


export default class UploadErrorMsgModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }


  @observable photo = "";
  @observable Bg = "";
  @observable national = "";



}
