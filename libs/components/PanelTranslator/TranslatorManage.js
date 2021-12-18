import React, {Component} from 'react';
import {Empty,Result, message, Modal, Button, Card} from 'antd';
import {observer} from "mobx-react";
import CooperationPres from "../../mobx/presenters/CooperationPres";
import StateView from "../UI/StateView/StateView";
import Head from "next/head";
import SelectLanguageModal from "../TeamMeat/SelectLanguageModal";

@observer
class TranslatorManage extends Component {

  constructor(props) {
    super(props);
    this.store = new CooperationPres()
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.store.getTranslatorLanguagesList()
  }

  state = {
    visible: false,
    deleteModal: false,
    languageModel: "",
    language_id: 3
  }

  _addLanguage = () => {
    return (<Button className={"radius"} type={"primary"} onClick={() => this.setState({visible: true})}>انتخاب زبان</Button>
    )
  }

  goToQuiz = () => {
    this.store.getQuizQuestions({language_id: this.state.language_id}, this.callBack)
  }

  callBack = () => {

  }

  callBackSelectLanguage = () => {
    this.setState({visible: false})
    this._getData()
  }

  _handleDeleteLanguage = () => {
    this.state.languageModel.DeleteTranslatorLanguages({language_id: this.state.languageModel.id}, () => this.callBackDelete(this.state.languageModel.id))
  }

  _handleActiveLanguage = () => {
    this.state.languageModel.ActiveTranslatorLanguages({language_id: this.state.languageModel.id}, this.callBackActive)
  }

  _renderExamStatus = (language) => {
    switch (language.status) {
      case "pending":
        return <Button href={`/public-exam/?id=${language.id}`} className={""}>رفتن برای آزمون</Button>
      case "field_select":
        return <Button href={`/language-subcategory/?id=${language.id}`} className={"btn-success"}>انتخاب زمینه
          ها</Button>
      case "ok":
        return <Button href={`/pro-exam/?id=${language.id}`} className={"btn-success"}>آزمون تخصصی</Button>
    }
  }

  callBackDelete = (id) => {
    message.success("زبان شما با موفقیت حذف شد")
    this.setState({deleteModal: false})
    this.store.languagesSelected = this.store.languagesSelected.filter(item => item.id !== id)
  }

  callBackActive = (msg) => {
    message.success(msg)
    this.setState({activeModal: false})
  }

  render() {
    const {languagesSelected} = this.store

    return (
      <>
        <Head>
          <title>مدیریت زبان های من</title>
        </Head>
        <section>
            <Card title={"مدیریت زبان های من"} className={"radius"} extra={this._addLanguage()}>

              {/*<div className="d-flex justify-content-between align-items-center ">*/}
              {/*  <h3 className={"title-page mb-0"}>مدیریت زبان های من</h3>*/}
              {/*  {this._addLanguage()}*/}
              {/*</div>*/}

              <StateView state={this.store.stateView} errorButtonAction={this._getData}>
                {languagesSelected.length>0 ?languagesSelected.map((language, index) => {
                  return <div className="calculating-box p-3 " key={index}>
                    <div className="row align-items-center">
                      <div className="col-2">
                        <img src={language.flag} width={50}/>
                      </div>
                      <div className="col-2">
                        <span className={"titr-title"}>{language.title}</span>
                      </div>
                      <div className="col-2">
                        {this._renderExamStatus(language)}
                      </div>
                      <div className="col-2">
                        {language.status === "ok" ?
                          <Button href={`/language-subcategory/?id=${language.id}`} className={""}>انتخاب زمینه
                            ها</Button> : null}
                      </div>
                      <div className="col">
                        <div className="d-flex justify-content-end">

                          <div className={'cursor mx-3'} onClick={() => this.setState({activeModal: true, languageModel: language})}>
                            <img src={`/static/images/${language.status === "deactive" ? "deactive" : "active"}.svg`}
                                 height={16}/>
                          </div>
                          <div className={'cursor mx-3'} onClick={() => this.setState({deleteModal: true, languageModel: language})}>
                            <img src={"/static/images/x.svg"} height={16}/>
                          </div>

                        </div>
                      </div>
                    </div>

                    <Modal footer={null} visible={this.state.deleteModal} title={"حذف زبان"}
                           onCancel={() => this.setState({deleteModal: false})}>
                      <Result
                        status="warning"
                        title="آیا از حذف زبان مطمئن هستید؟"
                        extra={[
                          <Button loading={language.loading} className={"radius"} type="primary"
                                  onClick={this._handleDeleteLanguage}>
                            حذف زبان
                          </Button>,
                          <Button onClick={() => this.setState({deleteModal: false})} className={"radius"}>لغو</Button>,
                        ]}/>
                    </Modal>


                    <Modal footer={null} visible={this.state.activeModal}
                           title={`${language.status === "deactive" ? "فعال سازی" : "غیر فعال سازی"}`}
                           onCancel={() => this.setState({activeModal: false})}>
                      <Result
                        status="warning"
                        title={` ${language.status === "deactive" ? "فعال سازی" : "غیر فعال سازی"}`}
                        extra={[
                          <Button loading={language.loading} className={"radius"} type="primary"
                                  onClick={this._handleActiveLanguage}>
                            {`${language.status === "deactive" ? "فعال سازی" : "غیر فعال سازی"}`}
                          </Button>,
                          <Button onClick={() => this.setState({activeModal: false})} className={"radius"}> لغو</Button>,
                        ]}/>
                    </Modal>

                  </div>

                }) : <Empty><Button className={"radius"} type={"primary"} onClick={() => this.setState({visible: true})}>انتخاب زبان</Button></Empty>}
              </StateView>


            </Card>
        </section>

        <Modal footer={null} width={800} visible={this.state.visible} title={"انتخاب زبان"}
               onCancel={() => this.setState({visible: false})}>
          <SelectLanguageModal store={this.store} callBack={this.callBackSelectLanguage}/>
        </Modal>


      </>
    );
  }
}

export default TranslatorManage;