import React, {Component} from 'react';
import {observer} from "mobx-react";
import StateView from "../UI/StateView/StateView";
import {Modal, Button, Checkbox} from "antd"
import QuestionsList from "./QuestionsList";
import QuizMessage from "./QuizMessage";
import PanelSideBar from "../PanelUser/PanelSideBar";
import {withRouter} from "next/router"

@observer
class QuizPage extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    lng: '',
    visible: false
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    !this.props.store.quizList.time && this.props.store.getTranslatorLanguagesList()
  }

  _selectLanguage = () => {

    this.props.store.getQuizQuestions({language_id: this.props.router.query.id}, this.callBack)
  }

  callBack = () => {
    this.setState({visible: true})
  }

  _renderSelectLanguage = () => {
    const {languagesSelected} = this.props.store
    return <>
      <div className="">
        <h6 className={"title-page"}>آزمون اولیه مترجمی</h6>
        <hr/>
      </div>
      <div className="my-3 d-flex flex-column">

        <div className="my-3">
          <span className={"titr-title"}>لطفا قبل از شروع آزمون نکات زیر را به دقت مطالعه فرمایید:</span>
        </div>
        <span className={"text-muted px-3"}> - حداقل نمره لازم برای قبولی نمره 60 از 100 است. </span>
        <span
          className={"text-muted px-3"}>- سعی کنید تمرکز لازم را داشته باشید چرا که زمان آزمون متوقف نخواهد شد.</span>
        <span className={"text-muted px-3"}>- سؤالات نمره منفی دارند.</span>
        <span className={"text-muted px-3"}>- استفاده از دیکشنری آزاد است.</span>
      </div>

      <StateView state={this.props.store.stateView} errorButtonAction={this._getData}>


        {/*<div className="row">*/}
        {/*  {languagesSelected.map((language, index) => {*/}
        {/*    return <div className="col-3" key={index}>*/}

        {/*      <div onClick={() => this.setState({lng: language.id})}*/}
        {/*           className={`box-type my-5  ${this.state.lng === language.id && "box-typeActive"}`}>*/}
        {/*        <div className="mb-3">*/}
        {/*          <Checkbox checked={this.state.lng === language.id}*/}
        {/*                    onChange={() => this.setState({lng: language.id})}/>*/}
        {/*          <span className={"titr-title px-4"}>{language.title}</span>*/}
        {/*        </div>*/}
        {/*        <div className="mx-auto">*/}
        {/*          <img src={language.flag} width={80}/>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  })}*/}
        {/*</div>*/}


        <Button className={"login-btn"} onClick={this._selectLanguage}>ادامه</Button>
      </StateView>

    </>
  }

  _renderQuizShow = () => {
    const {quizList, endQuiz} = this.props.store

    if (endQuiz) {
      return <QuizMessage store={this.props.store}/>
    }
    if (quizList.time) {
      return <QuestionsList store={this.props.store}/>
    } else {
      return this._renderSelectLanguage()
    }
  }

  render() {
    return (
      <div>
        <StateView state={this.props.store.stateView} errorButtonAction={this._getData}>
          <div className="user-panel radius my-3">
            {this._renderQuizShow()}
          </div>
        </StateView>

      </div>
    );
  }

}

export default withRouter(QuizPage);