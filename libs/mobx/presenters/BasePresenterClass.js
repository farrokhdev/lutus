import {action} from "mobx";

export default class BasePresenterClass {

  @action setData = (key, val) => {
    if (this[key] != undefined) {
      this[key] = val;
    }
  }
}
