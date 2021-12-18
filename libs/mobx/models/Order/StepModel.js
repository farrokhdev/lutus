import {action, computed, makeObservable, observable, override} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "./LanguageModel";
import FieldModal from "./FieldModal";
import ServiceModel from "../Utility/ServiceModel";



export default class StepModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable amount = 0;
  @observable status = "";
  @observable description = "";
  @observable step_number = "";
  @observable pay = "";
  @observable file = "";
  @observable payment_at = "";
  @observable payment_by = "";

  @override  setVal = (key, val) => {
    console.log(key, val);
    if (this[key] != undefined) {
      console.log("Set")
      this[key] = val;
    }

  }


}
