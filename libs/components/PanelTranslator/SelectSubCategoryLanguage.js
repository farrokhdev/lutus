import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Checkbox, Result, Button, Typography} from 'antd';
import {withRouter} from 'next/router'
import StateView from "../UI/StateView/StateView";

@observer
class SelectSubCategoryLanguage extends Component {


  state = {
    from_to: [],
    fields: [],
    language_id: "",
  }

  componentDidMount() {
    this.setState({language_id: this.props.router.query.id})
    this._getData()
  }

  _getData = () => {
    this.props.store.getSubcategory({language_id: this.props.router.query.id})
  }

  selectFiled = (e) => {
    this.setState({fields: e})
  }

  selectLanguage = (e) => {
    this.setState({from_to: e})
  }

  submitSubcategory = () => {
    this.props.store.submitLanguageSubCategory(this.state)
  }

  render() {
    const {fields, languages} = this.props.store.subCategoryList

    return (
      <>
        <StateView state={this.props.store.stateView} errorButtonAction={this._getData}>
          <h3 className={""}>انتخاب شاخه</h3>

          <div className="selectField  ">
            <Checkbox.Group onChange={this.selectLanguage}>
              {languages && languages.map((item, index) => {
                return <Checkbox className={"col-3 p-3"} value={item.from_to}>{item.title}</Checkbox>
              })}


            </Checkbox.Group>
          </div>

          <h3 className={"py-3 my-3 "}>انتخاب زمینه</h3>

          <div className="selectField  ">
            <Checkbox.Group onChange={this.selectFiled}>
              {fields && fields.map((item, index) => {
                return <Checkbox className={"col-3 p-3"} value={item.id}>{item.title}</Checkbox>
              })}
            </Checkbox.Group>
          </div>

          <div className="w-50  mt-5">
            <Button loading={this.props.store.loading} onClick={this.submitSubcategory}
                    className={"login-btn w-50"}>ثبت</Button>
          </div>
        </StateView>
      </>
    );
  }
}

export default withRouter(SelectSubCategoryLanguage);