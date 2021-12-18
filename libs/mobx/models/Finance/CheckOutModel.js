import {override,computed, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import BlogCategoryModel from "../Blog/BlogCategoryModel";
import CheckItemModel from "./CheckItemModel";





export default class CheckOutModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable page = "";
  @observable pagesize = "";
  @observable total = "";
  @observable wallet = "";
  @observable items = [];


  @override setVals = (data) => {

    Object.keys(data).map(key=>{
      switch (key) {
        case "items":
          const category = []
          data[key].map(arrObj => {
            const model = new CheckItemModel();
            model.setVals(arrObj)
            category.push(model)
          })
          this.items = category
          break
        default :
          if (this[key] !== undefined) {
            this[key] = data[key]
          }
      }
    })
  }

}
