import BasePresenterClass from "./BasePresenterClass";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {action, makeObservable, observable, override, computed} from "mobx";
import {DataService} from "../../api/data-service";
import ServiceModel from "../models/Utility/ServiceModel";




export default class ServicePres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading

  @observable ServiceList = []



  //get Service List//
  onErrorGetServiceList = (err) => {
    console.log(err)
    this.stateView = StateView.State.error
  }
  onSuccessGetServiceList = (res) => {
    res.data.items.map(item=>{
      const model=new ServiceModel();
      model.setVals(item);
      this.ServiceList.push(model)
    })
    this.stateView = StateView.State.content
  }
  @action getServiceList = (data = {}, route = 'ServiceList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetServiceList, this.onErrorGetServiceList)
  }
  //get Service List//

}