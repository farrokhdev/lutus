import {computed, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import ServiceModel from "../Utility/ServiceModel";
import FieldModal from "../Order/FieldModal";



export default class ProjectsListModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id= "";
  @observable project_type= "";
  @observable status= "";
  @observable title  = "";
  @observable suggestion  = 0;
  @observable created_at  = "";
  @observable service  = new ServiceModel()
  @observable field  = new FieldModal()


}
