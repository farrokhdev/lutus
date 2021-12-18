import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Modal, message, Button, Radio} from "antd";
import Countdown from "react-countdown";

@observer
class QuestionsList extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    answers: [],
    visible: false
  }

  componentDidMount() {

  }


  selectAnswer = (answer, index) => {
    this.props.store.setAnswer(index, answer)
  }

  _checkQuiz = () => {

    const questions = this.props.store.quizList.questions.map(i => {
      return {[i.answer.question_id]: i.answer.id}
    })

    const index = this.props.store.quizList.questions.map((i,index) => i.error)

    if (index.includes(true)) {
      message.error("لطفا تمام سوالات را پاسخ دهید")
    } else {
      console.log(1)
      this.props.store.sendAnswersQuiz({questions:questions})
    }


  }


  render() {
    const {quizList} = this.props.store

    return (
      <>
        <div className={""}>
          <div className="">
            <div className="d-flex justify-content-between border-bottom">

              <h6 className={"title-page"}> آزمون زبان {quizList.language.title}</h6>
              <Countdown date={Date.now() + quizList.time * 1000}
                         onComplete={() => this.setState({visible: true})}
                         renderer={(props) => (
                           <h4>{props.formatted.seconds} : {props.formatted.minutes}</h4>
                         )}/>
            </div>

          </div>

          <div className="Questions">
            {quizList.questions.map((question, index) => {

              return <div key={index}>
                <div className="d-flex my-2 p-3">
                  <ul>
                    <h6>{index + 1}- {question.title}</h6>
                    <Radio.Group>
                      {question.answers.map((answer, indexAnswer) => {
                        return <div key={indexAnswer} className={"p-2"}>
                          <li>
                            <Radio
                              onChange={() => this.selectAnswer(answer, index)}
                              value={answer.id}
                            >
                              {answer.title}
                            </Radio>
                          </li>
                        </div>
                      })}
                    </Radio.Group>
                  </ul>
                </div>
              </div>
            })}
          </div>

          <Button loading={this.props.store.loading} className={"login-btn w-25"} onClick={this._checkQuiz}>ثبت آزمون</Button>
        </div>

        <Modal title={<h4>وقت شما به اتمام رسید</h4>} visible={this.state.visible} footer={null}>

          <div className="d-flex justify-content-center flex-column">
            <div className={"py-4 mx-auto"}>

              <h5>وقت شما تمام شد لطفا یک بار دیگر مراجع نمایید</h5>
            </div>
            <div className=" mx-auto">
              <Button type={"primary"} onClick={() => this.props.store.quizList.time = false}>برگشت به صفحه اول</Button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default QuestionsList;