import {routerList} from "./Connector";

export class DataService {

  static fetchData = async (data, route, onSuccess, onError) => {

    try {
      await routerList()[route].fetch(null, data)
        .then(res => {
          onSuccess(res, route);
        })
        .catch(error => {
          onError(error)
        })
    } catch (e) {
      onError(e)
    }
  }


  static sendData = async (data, route, onSuccess, onError) => {
    try {
      routerList()[route].post(null, data)
        .then(res => {
          onSuccess(res, route);
        })
        .catch(error => onError(error))
    } catch (e) {
      onError(e)
    }
  }

}



