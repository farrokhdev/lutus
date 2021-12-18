import {override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";



export default class QuizMessageModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable message = "";
  @observable score = 0;
  @observable status = "";


}
