import {override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import LanguageModel from "../Order/LanguageModel";
import FeatureModel from "../Order/FeatureModel";


export default class ServiceModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable title = "";
  @observable image = "";
  @observable alias = "";
  @observable description = "";
  @observable short_description = "";
  @observable calculator_type = "";
  @observable languages = [];
  @observable features = [];
  @observable confidential_price = "";

  @override setVals = (data) => {

    try {

      Object.keys(data).map((key, n) => {
        if (data[key] != null) {
          switch (key) {

            case "languages":
              const itemLanguage = []
              data[key].map(arrObj => {
                const model = new LanguageModel()
                model.setVals(arrObj)
                itemLanguage.push(model)
              })
              this.languages = itemLanguage
              break
            // case "features":
            //   const item = []
            //   data[key].map(arrObj => {
            //     const model = new FeatureModel()
            //     model.setVals(arrObj)
            //     item.push(model)
            //   })
            //   this.features = item
            //   break

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
