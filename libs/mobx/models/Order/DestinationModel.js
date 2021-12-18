import {computed, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "./LanguageModel";



export default class DestinationModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable service_id = "";
  @observable language_id_from = "";
  @observable language_id_to = "";
  @observable price = "";
  @observable language_to = new LanguageModel();



}
