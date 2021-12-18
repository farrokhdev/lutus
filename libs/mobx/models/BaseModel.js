import {action} from "mobx";

export default class BaseModel {


  @action  setVal = (key, val) => {
    if (this[key] != undefined) {
      this[key] = val;
    }

  }


  @action setVals = (data) => {
    try {
      Object.keys(data).map((e, d) => {
        if (this[e] !== undefined) {
          if(data[e]) {
            this[e] = data[e];
          }
        }
      });
    } catch (e) {
    }
  }


  @action getCustomVals = (data) => {
    const result = {};
    try {
      data.map(e => {
        if (this[e] !== undefined) {
          result[e] = this[e];
        }
      });
      return result;
    } catch (e) {
    }
  }
}

