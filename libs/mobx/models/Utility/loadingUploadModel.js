import {override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";
import FeatureModel from "../Order/FeatureModel";


export default class LoadingUploadModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }


  @observable image = false;
  @observable background_image = false;
  @observable national_card_image = false;



}
