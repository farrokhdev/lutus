import BasePresenterClass from "./BasePresenterClass";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {action, makeObservable, observable, override, computed} from "mobx";
import {DataService} from "../../api/data-service";
import {message} from "antd";
import UserModel from "../models/User/UserModel";
import fileNameModel from "../models/Utility/FileNameModel";
import UploadErrorMsgModel from "../models/Utility/uploadErrorMsgModel";
import LoadingUploadModel from "../models/Utility/loadingUploadModel";
import CompanyModel from "../models/Profile/CompanyModel";
import DashBoardModel from "../models/Utility/DashBoardModel";


export default class DashBoardPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading
  @persist @observable stateViewTranslator = StateView.State.loading


  @observable loading = false
  @observable view = new DashBoardModel()
  @observable translatorOrder= []



  ///getJobsList///
  onErrorGetDashBoardInfo = (e) => {
    console.log(e)
    this.stateView = StateView.State.error
  }
  onSuccessGetDashBoardInfo = (res) => {
    this.view.setVals(res.data)
    this.stateView = StateView.State.content
  }
  @action getDashBoardInfo = (data = {}, route = 'getDashBoardInfo') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetDashBoardInfo, this.onErrorGetDashBoardInfo)
  }
  ///getJobsList///




  // /getJobsList///
  onErrorGetDashBoardTranslator = (e) => {
    console.log(e)
    this.stateViewTranslator = StateView.State.error
  }
  onSuccessGetDashBoarTranslator = (res) => {
    this.translatorOrder=res.data.items
    this.stateViewTranslator = StateView.State.content
  }
  @action getDashBoardTranslator = (data = {}, route = 'getDashBoardTranslator') => {
    this.stateViewTranslator = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetDashBoarTranslator, this.onErrorGetDashBoardTranslator)
  }
  ///getJobsList///


}