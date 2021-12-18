import React, {Component} from 'react';
import {Checkbox, Result, Button, Typography} from 'antd';
import {observer} from "mobx-react"
import SelectSubCategoryLanguage from "../PanelTranslator/SelectSubCategoryLanguage";
import StateView from "../UI/StateView/StateView";
import Link from "next/link"

@observer
class QuizMessage extends Component {


  componentDidMount() {
    if (window) {
      window.scroll({top: 0, behavior: "auto"})
    }
  }


  resetQuiz = () => {
    this.props.store.quizMessage.setVal("message", false)
    this.props.store.endQuiz = false
    this.props.store.quizList.setVal("time", false)
  }


  render() {
    const {quizMessage} = this.props.store
    return (
      <>


        <div className="">
          {quizMessage.status === "failed" ?
            <Result
              status="error"
              title={<h3>{quizMessage.message}</h3>}
              subTitle={<span className={"titr-title py-3 text-muted"}>متاسفانه شما در آزمون قبول نشدید لطفا دوباره امتحان کنید</span>}
              extra={[
                <Button type="primary" key="console" onClick={this.resetQuiz}>امتحان مجدد
                </Button>,
              ]}
            >
              <div className="d-flex justify-content-center">
                <h4> امتیاز شما:{quizMessage.score} </h4>
              </div>
            </Result>
            :
            <>

              <Result
                status="success"
                title={<h3>{quizMessage.message}</h3>}
                subTitle={<span className={"titr-title py-3 text-muted"}>تبریک شماامتحان را قبول شدید، بعد از چک نهایی کارشناسان
                  خبر نهایی را به شما اطلاع میدهند</span>}>
                <div className="d-flex flex-column justify-content-center ">
                  <h4 className={"mx-auto"}> امتیاز شما:{quizMessage.score} </h4>
                  <Link href="/panel/translator"><a className={"mx-auto"}>
                    <Button type="primary my-2" className={"d-flex justify-content-center"} >برگشت به مدیریت زبان ها</Button>
                  </a></Link>
                </div>
              </Result>


            </>
          }
        </div>


      </>
    );
  }

}

export default QuizMessage;