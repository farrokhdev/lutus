import {action, override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";
import FeatureModel from "../Order/FeatureModel";
import FieldModal from "../Order/FieldModal";
import UserModel from "../User/UserModel";


export default class MessageModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable order_id = "";
  @observable user_id = "";
  @observable comment = "";
  @observable by_user = "";
  @observable seen = "";
  @observable created_at = "";
  @observable user = new UserModel();

  @override setVals = (data) => {

    Object.keys(data).map(key=>{

      switch (key) {

        case "user":

          this.user.setVals(data[key])

          break
        default :
          if (this[key] !== undefined) {
            this[key] = data[key]
          }
      }
    })
  }





}
