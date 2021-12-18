import {computed, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import BlogCategoryModel from "./BlogCategoryModel";



export default class BlogPostModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable slug = "";
  @observable title = "";
  @observable image = "";
  @observable short_description = "";
  @observable categories = new BlogCategoryModel();
  @observable author = "";
  @observable created_at = "";



}
