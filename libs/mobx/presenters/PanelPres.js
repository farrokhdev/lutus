import BasePresenterClass from "./BasePresenterClass";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {action, makeObservable, observable, override, computed} from "mobx";
import {DataService} from "../../api/data-service";
import ProjectsListModel from "../models/Panel/ProjectsListModel";



export default class PanelPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }


  @persist @observable stateView = StateView.State.loading

  @observable projectsList = []
  @observable page = ""
  @observable pagesize = ""
  @observable total = ""




  //get Category List//
  onErrorGetOrderList = (err) => {
    console.log(err)
    this.stateView=StateView.State.error
  }
  onSuccessGetOrderList = (res) => {
    let arr=[]
    res.data.items.map((item,index)=>{
      const project =new ProjectsListModel()
      project.setVals(item)
      arr.push(project)
    })
    this.projectsList=arr
    this.page=res.data.page
    this.pagesize=res.data.pagesize
    this.total=res.data.total
    this.stateView=StateView.State.content
  }
  @action getOrderList = (data = {}, route = 'getTranslateOrderList') => {
    this.stateView=StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetOrderList, this.onErrorGetOrderList)
  }
  //get Category List//




}