import {override,computed, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";
import ServiceModel from "../Utility/ServiceModel";
import FieldModal from "../Order/FieldModal";
import ReviewModel from "../Order/ReviewModel";
import StepModel from "../Order/StepModel";




export default class ProjectViewModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable file = "";
  @observable title = "";
  @observable amount = "";
  @observable user_owner = "";
  @observable multimedia_option = "";
  @observable status = "";
  @observable options = "";
  @observable delivery_time_type = "";
  @observable quality = "";
  @observable suggestion = "";
  @observable delivery_date = "";
  @observable delivery_date_en = "";
  @observable payment_type = "";
  @observable details = [];
  @observable files = [];
  @observable steps = [];
  @observable onDates = [];
  @observable created_at = "";
  @observable project_type = "";
  @observable content = "";
  @observable review = new ReviewModel();
  @observable resignation = "";
  @observable content_type = "";
  @observable reject_comment = "";
  @observable order_number = "";
  @observable customer_name = "";
  @observable customer_family = "";
  @observable field = new FieldModal();
  @observable service = new ServiceModel();
  @observable language_to_id = new LanguageModel();
  @observable language_from_id = new LanguageModel();

  @computed get full_name (){
    return this.customer_name + "" + this.customer_family
  }



  @override setVals = (data) => {

    Object.keys(data).map(key=>{

      switch (key) {

        case "review":

          this.review.setVals(data[key])

          break
        case "steps":
          const step = []
          data[key].map(arrObj => {
            const model = new StepModel()
            model.setVals(arrObj)
            step.push(model)
          })
          this.steps = step
          break
        default :
          if (this[key] !== undefined) {
            this[key] = data[key]
          }
      }
    })
  }


}
