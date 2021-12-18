import BasePresenterClass from "./BasePresenterClass";
import StateView from "../../components/UI/StateView/StateView";
import {persist} from "mobx-persist";
import {action, makeObservable, observable, override, computed} from "mobx";
import {DataService} from "../../api/data-service";
import {message} from "antd"
import LanguageModel from "../models/Order/LanguageModel";
import QuizModel from "../models/Quiz/QuizModel";
import QuizMessageModel from "../models/Quiz/QuizMessageModel";
import FieldModal from "../models/Order/FieldModal";
import Router from 'next/router';
import ProQuizModel from "../models/Quiz/ProQuizModel";


export default class CooperationPres extends BasePresenterClass {

  constructor() {
    super();
    makeObservable(this)
  }

  @persist @observable stateView = StateView.State.loading

  @observable provinceList = []
  @observable languageList = []
  @observable subCategoryList = []
  @observable subCategoryFields = []
  @observable languagesSelected = []
  @observable languagesCheck = []
  @observable cityList = []
  @observable proExamQuestion = new ProQuizModel()
  @observable quizList = new QuizModel()
  @observable quizMessage = new QuizMessageModel()
  @observable loading = false
  @observable spinProfile = false
  @observable spinNational = false
  @observable endQuiz = false


  @action setAnswer = (index, answer) => {
    this.quizList.questions[index].setVal("answer", answer)
    this.quizList.questions[index].setVal("error", false)
  }


  // get province List  //
  onErrorGetProvinceList = (err) => {
    console.log(err)
  }
  onSuccessGetProvinceList = (res) => {
    this.provinceList = res.data.items
  }
  @action getProvinceList = (data = {}, route = 'provinceList') => {
    DataService.fetchData(data, route, this.onSuccessGetProvinceList, this.onErrorGetProvinceList)
  }
  // get questions home //


  // get city List  //
  onErrorGetCityList = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessGetCityList = (res) => {
    this.cityList = res.data.items
    this.loading = false
  }
  @action getCityList = (data = {}, route = 'cityList') => {
    this.loading = true
    DataService.fetchData(data, route, this.onSuccessGetCityList, this.onErrorGetCityList)
  }
  // get city home //


  // Add Role //
  onErrorGetRole = (err) => {
    console.log(err)

  }
  onSuccessGetRole = async (res, callBack) => {
    await localStorage.setItem('role', res.data.role);
    await localStorage.setItem('status', res.data.status);
    callBack(res.data)
  }
  @action getRoleForUser = (data = {}, callBack, route = 'addRole') => {
    DataService.sendData(data, route, (res) => this.onSuccessGetRole(res, callBack), this.onErrorGetRole)
  }
  // Add Role  //


  //get Language List//
  onErrorGetLanguageList = (err) => {
    console.log(err)
    this.stateView = StateView.State.error
  }
  onSuccessGetLanguageList = (res) => {
    const arr = []
    res.data.items.map(item => {
      const model = new LanguageModel();
      model.setVals(item);
      arr.push(model)
    })
    this.languageList = arr
    this.stateView = StateView.State.content
    console.log(this.stateView)
  }
  @action getLanguageList = (data = {}, route = 'availableLanguageList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetLanguageList, this.onErrorGetLanguageList)
  }
  //get Language List//


  //select Language Translator//
  onErrorGetTranslatorLanguages = (err) => {
    console.log(err)

    this.loading = false
  }
  onSuccessGetTranslatorLanguages = (res, callBack) => {
    console.log(res)
    callBack()
    this.loading = false
  }
  @action selectTranslatorLanguages = (data = {}, callBack, route = 'translatorLanguages') => {
    this.loading = true
    DataService.sendData(data, route, (res) => this.onSuccessGetTranslatorLanguages(res, callBack), this.onErrorGetTranslatorLanguages)
  }
  //select Language Translator//


  // select Language Translator List//
  onErrorGetTranslatorLanguagesList = (err) => {
    console.log(err)

    this.stateView = StateView.State.error
  }
  onSuccessGetTranslatorLanguagesList = (res) => {
    const arr = []
    res.data.items.map(item => {
      const lng = new LanguageModel()
      lng.setVals(item)
      arr.push(lng)
    })
    this.languagesSelected = arr
    this.stateView = StateView.State.content
  }
  @action getTranslatorLanguagesList = (data = {}, route = 'translatorLanguagesList') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetTranslatorLanguagesList, this.onErrorGetTranslatorLanguagesList)
  }
  //select Language Translator List//


 /* // delete Translator Language  //
  onErrorDeleteTranslatorLanguages = (err) => {
    console.log(err)
  }
  onSuccessDeleteTranslatorLanguages = (res, callBack) => {
    console.log(res)
    callBack()
  }
  @action DeleteTranslatorLanguages = (data = {}, callBack, route = 'deleteTranslatorLanguages') => {

    DataService.sendData(data, route, (res) => this.onSuccessDeleteTranslatorLanguages(res, callBack), this.onErrorDeleteTranslatorLanguages)
  }
  //delete Translator Language  //*/


// get Quiz Questions//
  onErrorGetQuizQuestions = (err, callBack) => {
    console.log(err)
    if (err.code === 403) {
      callBack()
      console.log(1)
    } else {
      this.loading = false
      this.stateView = StateView.State.error
    }
  }
  onSuccessGetQuizQuestions = (res) => {
    this.quizList.setVals(res.data)
    this.loading = false
    this.stateView = StateView.State.content
  }
  @action getQuizQuestions = (data = {}, callBack, route = 'getQuiz') => {
    this.loading = true
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetQuizQuestions, (err) => this.onErrorGetQuizQuestions(err, callBack))
  }
// get Quiz Questions//


  // send Answers Quiz//
  onErrorSendAnswersQuiz = (err) => {
    console.log(err)
    this.loading = false
  }
  onSuccessSendAnswersQuiz = (res) => {
    this.quizMessage.setVals(res.data)
    this.loading = false
    this.endQuiz=true
    this.quizList.time=false
  }
  @action sendAnswersQuiz = (data = {}, route = 'sendAnswerQuiz') => {
    this.loading = true
    DataService.sendData(data, route, this.onSuccessSendAnswersQuiz, this.onErrorSendAnswersQuiz)
  }
// send Answers Quiz//


  // get Subcategory//
  onErrorSubcategory = (err) => {
    this.stateView = StateView.State.error
    console.log(err)
  }
  onSuccessSubcategory = (res) => {
    this.subCategoryList = res.data
    this.stateView = StateView.State.content
  }
  @action getSubcategory = (data = {}, route = 'translatorSubCategory') => {
    this.stateView = StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessSubcategory, this.onErrorSubcategory)
  }
  // get Subcategory//


  // get Subcategory Fields//
  onErrorSubcategoryField = (err) => {
    this.stateView=StateView.State.error
    console.log(err)
  }
  onSuccessSubcategoryField = (res) => {
    const arr = []
    res.data && res.data.values.map(item => {
      const value = new FieldModal()
      value.setVals(item)
      arr.push(value)
    })
    this.subCategoryFields = arr
    this.stateView=StateView.State.content
  }
  @action getSubcategoryField = (data = {}, route = 'getSubCategoryTranslator') => {
    this.stateView=StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessSubcategoryField, this.onErrorSubcategoryField)
  }
  // get Subcategory Fields//




  // get Pro Exam//
  onErrorGetProExam = (err) => {
    this.stateView=StateView.State.error
    console.log(err)
  }
  onSuccessGetProExam = (res) => {
    this.proExamQuestion.setVals(res.data.item)
    this.stateView=StateView.State.content
  }
  @action getProExam = (data = {}, route = 'proExamQuestion') => {
    this.stateView=StateView.State.loading
    DataService.fetchData(data, route, this.onSuccessGetProExam, this.onErrorGetProExam)
  }
  // get Pro Exam//





  // get Pro Exam//
  onErrorSubmitProExam = (err) => {
    this.loading=false
    console.log(err)
  }
  onSuccessSubmitProExam = (res,callBack) => {
    console.log(res)
    this.loading=false
    callBack()
  }
  @action submitProExam = (data = {},callBack, route = 'proExamSubmit') => {
    this.loading=true
    DataService.sendData(data, route, (res)=>this.onSuccessSubmitProExam(res,callBack), this.onErrorSubmitProExam)
  }
  // get Pro Exam//




  // get Active Field//
  onErrorGetActiveField = (err) => {
    this.loading=false
    console.log(err)
  }
  onSuccessGetActiveField = (res,callBack) => {
    console.log(res)
    this.loading=false
    callBack(res.data.message)
  }
  @action getActiveField = (data = {},callBack, route = 'activeField') => {
    this.loading=true
    DataService.fetchData(data, route, (res)=>this.onSuccessGetActiveField(res,callBack), this.onErrorGetActiveField)
  }
  // get Active Field//




  // get Active Field//
  onErrorGetDeleteField = (err) => {
    this.loading=false
    console.log(err)
  }
  onSuccessGetDeleteField = (res,callBack) => {
    console.log(res)
    this.loading=false
    callBack()
  }
  @action getDeleteField = (data = {},callBack, route = 'deleteField') => {
    this.loading=true
    DataService.fetchData(data, route, (res)=>this.onSuccessGetDeleteField(res,callBack), this.onErrorGetDeleteField)
  }
  // get Active Field//



  // get Language Subcategory//
  onErrorSubmitLanguageSubCategory = (err) => {
    this.loading = false
    console.log(err)
  }
  onSuccessSubmitLanguageSubCategory = (res) => {
    this.loading = true
    Router.push("panel/translator")
  }
  @action submitLanguageSubCategory = (data = {}, route = 'submitSubCategory') => {
    this.loading = true
    DataService.sendData(data, route, this.onSuccessSubmitLanguageSubCategory, this.onErrorSubmitLanguageSubCategory)
  }
  // get Language Subcategory//




  // upload image Profile //
  onErrorUploadProfileImage = (err) => {
    console.log(err)
    this.spinProfile = false
  }
  onSuccessUploadProfileImage = (res) => {
    this.cityList = res.data.items
    this.spinProfile = false
  }
  @action uploadProfileImage = (data = {}, route = 'uploadFile') => {
    this.spinProfile = true
    DataService.fetchData(data, route, this.onSuccessUploadProfileImage, this.onErrorUploadProfileImage)
  }
  // upload image Profile //


  // upload image NationalCard //
  onErrorUploadNationalCardImage = (err) => {
    console.log(err)
    this.spinNational = false
  }
  onSuccessUploadNationalCardImage = (res) => {
    this.cityList = res.data.items
    this.spinNational = false
  }
  @action uploadNationalCardImage = (data = {}, route = 'uploadFile') => {
    this.spinNational = true
    DataService.fetchData(data, route, this.onSuccessUploadNationalCardImage, this.onErrorUploadNationalCardImage)
  }
  // upload image NationalCard //
}