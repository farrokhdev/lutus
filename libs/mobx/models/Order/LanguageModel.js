import {action, makeObservable, observable} from "mobx";
import BaseModel from "../BaseModel";
import {DataService} from "../../../api/data-service";



export default class LanguageModel extends BaseModel {

  constructor() {
    super();
    makeObservable(this)
  }

  @observable id = "";
  @observable title = "";
  @observable slug = "";
  @observable flag = "";
  @observable qcount = 0;
  @observable status = "";
  @observable type = 0;
  @observable from_to = 0;
  @observable loading = false;


  @action DeleteTranslatorLanguages = (data = {},callBack, route = 'deleteTranslatorLanguages') => {
    this.loading=true
    DataService.sendData(data, route,
      (res)=>{callBack(res)
      this.loading=false},
      (err)=>{console.log(err)
      this.loading=false})
  }



  @action ActiveTranslatorLanguages = (data = {},callBack, route = 'ActiveTranslatorLanguages') => {
    this.loading=true
    data.type=this.status==="deactive"?1:0
    data.language_id=this.id
    DataService.fetchData(data, route,
      (res)=>{callBack(res.data.message)
        this.loading=false
        this.status=res.data.status
      },

      (err)=>{console.log(err)
        this.loading=false})
  }

}
