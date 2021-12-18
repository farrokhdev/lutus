import {override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";
import QuestionModel from "./QuestionModel";


export default class QuizModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable time = "";
  @observable questions = [];
  @observable language = new LanguageModel();



  @override setVals = (data) => {

    try {

      Object.keys(data).map((key, n) => {
        if (data[key] != null) {
          switch (key) {

            case "questions":
              const item = []
              data[key].map(arrObj => {
                const model = new QuestionModel()
                model.setVals(arrObj)
                item.push(model)
              })
              this.questions = item
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
