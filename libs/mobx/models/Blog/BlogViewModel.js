import {override, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import BlogCategoryModel from "./BlogCategoryModel";
import LanguageModel from "../Order/LanguageModel";


export default class BlogViewModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }


  @observable id = "";
  @observable slug = "";
  @observable title = "";
  @observable image = "";
  @observable categories = []
  @observable author = "";
  @observable created_at_fa = "";
  @observable content = "";
  @observable meta_description = "";
  @observable meta_keywords = "";
  @observable meta_title = "";
  @observable short_description = "";






  @override setVals = (data) => {

    Object.keys(data).map(key=>{
      switch (key) {
        case "categories":
          const category = []
          data[key].map(arrObj => {
            const model = new BlogCategoryModel();
            model.setVals(arrObj)
            category.push(model)
          })
          this.categories = category
          break
        default :
          if (this[key] !== undefined) {
            this[key] = data[key]
          }
      }
    })
  }

}
