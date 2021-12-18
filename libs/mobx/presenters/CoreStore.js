import {enableStaticRendering} from 'mobx-react';
import {action, makeObservable, observable} from "mobx";
import Cookies from 'js-cookie'
import UserModel from "../models/User/UserModel";



const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

export class CoreStore {

  @observable token = "";
  @observable panel_open = false;
  @observable isAuth = 0;
  @observable user = new UserModel();

  constructor(isServer, initialData) {

    makeObservable(this);
    initialData = undefined;
    if (initialData != undefined) {
      if (isServer) {
        if (initialData.user != undefined) {
          this.user = initialData.user;
        }
      } else {
        this.setData(initialData);
      }
      this.token = cookie.get('token');
      this.isAuth = cookie.get('isAuth');

    } else {
      this.setDatafromLocal();
    }

  }


  @action setDatafromLocal = async () => {
    try {
      let isAuth = Cookies.get('isAuth', 0);
      const token = Cookies.get('token')
      const  user =  {
        user_id: await localStorage.getItem('user_id'),
        name: await localStorage.getItem('name'),
        balance: await localStorage.getItem('balance'),
        family: await localStorage.getItem('family'),
        status: await localStorage.getItem('status'),
        mobile: await localStorage.getItem('mobile'),
        email: await localStorage.getItem('email'),
        role: await localStorage.getItem('role'),
        code: await localStorage.getItem('code'),
        image: await localStorage.getItem('image') !== "undefined" ? localStorage.getItem('image') :"/static/images/user.svg",
        background_image: await localStorage.getItem('background_image'),
        address: await localStorage.getItem('address'),
        degree: await localStorage.getItem('degree'),
        created_at: await localStorage.getItem('created_at'),
      }
      if (isAuth == null || isAuth == undefined || isAuth === false || isAuth == 0) {
        return;
      }
      if (isAuth) {
        isAuth = 1;
      }

      this.isAuth = isAuth;
      this.token = token;
      this.user.setVals(user)
    } catch (e) {
      console.log('CoreStore Error', e)
    }
  }

  @action  setData = (data) => {
    try {
      Object.keys(data).map((e, d) => {
        if (e == "store") {
          this.store.setData(data[e])
        } else if (this[e] !== undefined) {
          this[e] = data[e];
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  @action  setVal = (key, val) => {
    if (this[key] != undefined) {
      this[key] = val;
    }
  }

}


let store = null;

export default function initializeStore(isServer, initialData) {
  if (isServer) {
    return new CoreStore(isServer, initialData)
  }
  if (store === null) {
    store = new CoreStore(isServer, initialData)
  }
  return store;
}
