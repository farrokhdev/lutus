import {override,computed, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";





export default class IncomeModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable page = "";
  @observable pageSize = "";
  @observable sum = "";
  @observable items = [];


}
