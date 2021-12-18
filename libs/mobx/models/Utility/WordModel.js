import {action, override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";
import FeatureModel from "../Order/FeatureModel";
import FieldModal from "../Order/FieldModal";


export default class WordModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";

  @observable language = new LanguageModel();
  @observable field = new FieldModal();

  @observable word = "";
  @observable translate = "";


  @action deleteDictionaryWord = () => {
  }

}
