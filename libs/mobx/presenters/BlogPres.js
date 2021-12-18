import BasePresenterClass from "./BasePresenterClass";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {action, makeObservable, observable, override, computed} from "mobx";
import {DataService} from "../../api/data-service";
import ServiceModel from "../models/Utility/ServiceModel";
import BlogCategoryModel from "../models/Blog/BlogCategoryModel";
import BlogPostModel from "../models/Blog/BlogPostModel";
import BlogViewModel from "../models/Blog/BlogViewModel";
import CommentModel from "../models/Blog/commentModel";


export default class BlogPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading

  @observable postsList = []
  @observable categoryList = []
  @observable commentList = []
  @observable blogIndexList = []
  @observable rowData = ""
  @observable commentData = ""
  @observable loading = ""
  @observable page = ""
  @observable pageSize = ""
  @observable total = ""
  @observable postView = new BlogViewModel()


  //get Category List//
  onErrorGetCategoryList = (err) => {
    console.log(err)
  }
  onSuccessGetCategoryList = (res) => {
    const arr = []
    res.data.items.map(item => {
      const category = new BlogCategoryModel()
      category.setVals(item);
      arr.push(category)
    })
    this.categoryList = arr
  }
  @action getCategoryList = (data = {}, route = 'categoryBlogList') => {
    DataService.fetchData(data, route, this.onSuccessGetCategoryList, this.onErrorGetCategoryList)
  }
  //get Category List//


  //get  Posts List //
  @action setPostList = (res) => {


    const arr = []
    res.data.items.map(item => {
      const category = new BlogPostModel()
      category.setVals(item);
      arr.push(category)
    })
    this.page = res.data.page
    this.pageSize = res.data.pageSize
    this.total = res.data.total

    this.postsList = arr
    this.stateView = StateView.State.content
  }
  onErrorGetPostsList = (err) => {
    console.log(err)
    this.stateView = StateView.State.error
  }
  onSuccessGetPostsList = (res) => {
    this.rowData = res
    this.setPostList(res)
  }
  @action getPostsList = (data = {}, route = 'blogPostsList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetPostsList, this.onErrorGetPostsList)
  }
  //get  Posts List //


  //get Category Posts//
  @action setPost = (res) => {
    console.log(res)
    this.postView.setVals(res.data.item)
    this.stateView = StateView.State.content
  }
  onErrorGetPostView = (err) => {
    console.log(err)
    this.stateView = StateView.State.error
  }
  onSuccessGetPostView = (res) => {

    this.rowData = res
    this.setPost(res)
  }
  @action getPostView = async (data = {}, route = 'blogViewPost') => {
    this.stateView = StateView.State.loading
    await DataService.fetchData(data, route, this.onSuccessGetPostView, this.onErrorGetPostView)
  }
  //get Category Posts//


  //Search In Blog//
  onErrorSearchBlog = (err) => {
    console.log(err)
  }
  onSuccessSearchBlog = (res) => {
    const arr = []
    res.data.items.map(item => {
      const category = new BlogCategoryModel()
      category.setVals(item);
      arr.push(category)
    })
    this.categoryList = arr
  }
  @action getSearchBlog = (data = {}, route = 'categoryBlogList') => {
    DataService.sendData(data, route, this.onSuccessSearchBlog, this.onErrorSearchBlog)
  }
  //Search In Blog//


  //Send Comment//
  onErrorAddComment = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessAddComment = (res, callBackAdd) => {
    console.log(res)
    this.loading = false
    callBackAdd()
  }
  @action addCommentBlog = (data = {}, callBackAdd, route = 'addCommentPost') => {
    this.loading = true
    DataService.sendData(data, route, (res) => this.onSuccessAddComment(res, callBackAdd), this.onErrorAddComment)
  }
  //Send Comment//


  //get List Comment//
  @action setCommentList = (res) => {
    const arr = []
    res.data.items.map(item => {
      const comment = new CommentModel()
      comment.setVals(item)
      arr.push(comment)
    })
    this.commentList = arr
    this.stateViewComments = StateView.State.content
  }
  onErrorGetCommentList = (err) => {
    console.log(err)
    this.stateViewComments = StateView.State.error
  }
  onSuccessGetCommentList = (res) => {
    this.commentData = res
    this.setCommentList(res)
  }
  @action getCommentList = (data = {}, route = 'getCommentsList') => {
    this.stateViewComments = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetCommentList, this.onErrorGetCommentList)
  }
  //Send List Comment//


  //getBlogIndex //

  onErrorGetBlogIndex = (err) => {
    console.log(err)
    this.stateView = StateView.State.error
  }
  onSuccessGetBlogIndex = (res) => {
    const arr = []
    console.log(res)
    res.data.blog.map(item => {
      const blog = new BlogPostModel()
      blog.setVals(item)
      arr.push(blog)
    })
    this.blogIndexList = arr
    this.stateView = StateView.State.content
  }
  @action getBlogIndex = (data = {}, route = 'getBlogIndex') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetBlogIndex, this.onErrorGetBlogIndex)
  }
  //getBlogIndex //

}