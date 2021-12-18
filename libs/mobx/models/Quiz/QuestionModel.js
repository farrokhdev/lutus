import {override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";
import AnswerModel from "./AnswerModel";


export default class QuestionModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable language_id = "";
  @observable title = "";
  @observable answers = [];
  @observable answer = "";
  @observable error = true;


  @override setVals = (data) => {

    try {

      Object.keys(data).map((key, n) => {
        if (data[key] != null) {
          switch (key) {

            case "answers":
              const item = []
              data[key].map(arrObj => {
                const model = new AnswerModel()
                model.setVals(arrObj)
                item.push(model)
              })
              this.answers = item
              break

            default:
              if (this[key] !== undefined) {
                this[key] = data[key]
              }

          }
        }
      })
    } catch (err) {
      console.log("ServiceModel SetValues Error", err)
    }
  }

}
