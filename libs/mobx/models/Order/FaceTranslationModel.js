import {computed, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";




export default class FaceTranslationModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable day = "";
  @observable hour = "";



}
