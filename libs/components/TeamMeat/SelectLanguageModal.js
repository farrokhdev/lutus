import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import {Checkbox, message, Button} from "antd"
import StateView from "../UI/StateView/StateView";

@inject("CoreStore")
@observer
class SelectLanguageModal extends Component {

  state = {
    lng: [],
    lngID: [],
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.props.store.getLanguageList()
    this.setState({lng:''})
  }

  _selectLng = (item, id) => {
    let {lng, lngID} = this.state
    if (lng.includes(item)) {
      const newlng = lng.filter(i => i !== item)
      this.setState({lng: newlng})

    } else {

        this.setState({lng: [item, ...lng]})
        this.setState({lngID: [id, ...lngID]})

    }
  }


  handleSelectLng = () => {
    const data = {}
    data.all_languages = this.state.lngID
    this.props.store.selectTranslatorLanguages(data, this.callBack)
  }

  callBack = () => {
    localStorage.setItem('status', "quiz");
    this.props.CoreStore.user.setVal("status", "quiz")
    this.props.callBack && this.props.callBack()
  }

  render() {
    const {languageList, stateView} = this.props.store
    return (
      <div>
        <h6 className="mb-3 title-page">لطفا زبان های مورد نظر خود را انتخاب کنید.</h6>
        <StateView state={this.props.store.stateView} errorButtonAction={this._getData}>
          <div className="row">
            {languageList.map((language, index) => {
              return <div className="col-6 col-md-3" key={index}>
                <div onClick={() => this._selectLng(language.slug, language.id)} className={`box-type ${this.state.lng.includes(language.slug) && "box-typeActive"}`}>
                  <div className="mb-3">
                    <Checkbox checked={this.state.lng.includes(language.slug)} onChange={() => this._selectLng(language.slug, language.id)}/>
                    <span className={"titr-title px-4"}>{language.title}</span>
                  </div>
                  <div className="mx-auto">
                    <img src={language.flag} width={60}/>
                  </div>
                </div>
              </div>
            })}

          </div>
          {this.state.lng && <div className="d-flex align-items-center justify-content-between py-2">
            <Button htmlType="submit" className="login-btn w-25 " onClick={this.handleSelectLng}
                    loading={this.props.store.loading}>
ادامه
            </Button>
          </div>}
        </StateView>
      </div>
    );
  }
}

export default SelectLanguageModal;