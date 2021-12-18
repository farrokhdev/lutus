import {action, override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";
import FeatureModel from "../Order/FeatureModel";
import FieldModal from "../Order/FieldModal";
import TicketReplyModel from "../Ticket/TicketReplyModel";
import ProjectModel from "../Order/ProjectModel";


export default class DashBoardModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable translate_projects = "";
  @observable type_projects = "";
  @observable unread_messages = "";
  @observable translate_items = [];
  @observable type_items = "";


  @override setVals = (data) => {
    try {
      Object.keys(data).map(key => {
        switch (key) {
          case "translate_items":
            const item = []
            data[key].map(arrObj => {
              const Model = new ProjectModel()
              Model.setVals(arrObj)
              item.push(Model)
            })
            this.translate_items = item
            break;
          default:
            if (this[key] !== undefined) {
              this[key] = data[key]
            }
        }
      })
    } catch (e) {
      console.log("ticket View error")
    }
  }

}
