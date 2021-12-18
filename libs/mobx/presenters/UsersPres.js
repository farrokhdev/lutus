import BasePresenterClass from "./BasePresenterClass";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {action, makeObservable, observable, override, computed} from "mobx";
import {DataService} from "../../api/data-service";



export default class UsersPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading
  @persist @observable loadingSearch = false
  @persist @observable users_stateView = StateView.State.loading
  @persist @observable tree_stateView = StateView.State.loading
  @persist @observable stateView_suggestion = StateView.State.loading
  @persist('list', UsersModel) @observable users = []
  @persist @observable total = 0
  @persist @observable pagesize = 28;
  @persist @observable page = 1;
  @persist @observable search = "";
  @persist @observable organizational_chart = "";
  @persist @observable compass_id = "";
  @persist @observable sortBy = "";
  @persist('list', OrganizationTreeModel) @observable organizationTree = [];


  @computed get organizational_chart_id() {
    return this.organizational_chart ? this.organizational_chart.key : ''
  }

  onSuccessSearchUsers = (res, route, callback, infinite) => {
    const items = []
    res.data.users.map(i => {
      const userModel = new UsersModel()
      userModel.setVals(i)
      items.push(userModel)
    })

    if (infinite) {
      this.users.push(...items)
    } else {
      this.users = items
    }
    this.total = res.data.total
    this.page = res.data.page
    this.users_stateView = StateView.State.content
    this.loadingSearch = false
    callback()
  }


  onSuccessGetOrganizationTree = (res) => {
    const items = []
    res.data.values.map(i => {
      const model = new OrganizationTreeModel()
      model.setVals(i)
      items.push(model)
    })
    this.organizationTree = items
    this.tree_stateView = StateView.State.content
  }


  onErrorSearchUsers = (res) => {
    this.users_stateView = StateView.State.error
    this.loadingSearch = false
  }


  onErrorGetOrganizationTree = (res) => {
    this.tree_stateView = StateView.State.error
  }


  @action searchUsers = (data = {}, route, callback, infinite) => {
    if (!infinite) {
      this.users_stateView = StateView.State.loading
    }
    DataService.fetchData(data, route, (res, route) => this.onSuccessSearchUsers(res, route, callback, infinite), this.onErrorSearchUsers)
  }


  @action getOrganizationTree = (data = {}, route = 'getOrganizationTree') => {
    DataService.fetchData(data, route, this.onSuccessGetOrganizationTree, this.onErrorGetOrganizationTree)
  }


  // @action setVals = (data) => {
  //   try {
  //     Object.keys(data).map(key => {
  //       switch (key) {
  //         case "users":
  //           const users = []
  //           data[key].map(arrObj => {
  //             const userModel = new UsersModel()
  //             userModel.setVals(arrObj)
  //             users.push(userModel)
  //           })
  //           this.users = users
  //           break;
  //         default:
  //           if (this[key] !== undefined) {
  //             this[key] = data[key]
  //           }
  //       }
  //     })
  //   } catch (e) {
  //     console.log("userpres setval error")
  //   }
  // }


}