import BasePresenterClass from "./BasePresenterClass";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {action, makeObservable, observable, override, computed} from "mobx";
import {DataService} from "../../api/data-service";
import ServiceModel from "../models/Utility/ServiceModel";
import FaqModel from "../models/Utility/FaqModel";




export default class FaqPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading

  @observable questionList = []



  // faq questions home //
  onErrorGetFaqList = (err) => {
    console.log(err)
    this.stateView=StateView.State.error;
  }
  onSuccessGetFaqList = (res) => {
    const arr=[]
    res.data.items.map(item=>{
      const question =new FaqModel();
      question.setVals(item);
      arr.push(question)
    })
    this.questionList=arr
    this.stateView=StateView.State.content;
  }
  @action getFaqList = (data = {}, route = 'faqListHome') => {
    this.stateView=StateView.State.loading;
    DataService.fetchData(data, route, this.onSuccessGetFaqList, this.onErrorGetFaqList)
  }
  // faq questions home //






  // faq All Questions //
  onErrorGetFaqListPage = (err) => {
    console.log(err)
    this.stateView=StateView.State.error;
  }
  onSuccessGetFaqListPage = (res) => {
    const arr=[]
    res.data.items.map(item=>{
      const question =new FaqModel();
      question.setVals(item);
      arr.push(question)
    })
    this.questionList=arr
    this.stateView=StateView.State.content;
  }
  @action getFaqListPage = (data = {}, route = 'faqListPage') => {
    this.stateView=StateView.State.loading;
    DataService.fetchData(data, route, this.onSuccessGetFaqListPage, this.onErrorGetFaqListPage)
  }
  // faq All Questions //
}