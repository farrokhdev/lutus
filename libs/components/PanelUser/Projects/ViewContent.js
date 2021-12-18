import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import {withRouter} from 'next/router'
import ProjectPres from "../../../mobx/presenters/ProjectPres";
import Head from "next/head";
import StateView from "../../UI/StateView/StateView";
import ViewEditor from "../../Editor/ViewEditor";

@inject("CoreStore")
@observer
class ViewContent extends Component {

  constructor(props) {
    super(props);
    this.store = new ProjectPres()
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    const role = this.props.router.query.id

    const route = role == 1 ? "viewOrderContentUser" : "viewOrderContentTranslator"

    this.store.getOrderContent({order_id: this.props.router.query.status}, route)
  }

  render() {

    return (
      <>
        <Head>
          <title>محتوی متنی</title>
        </Head>
        <div className="user-panel radius">
          <StateView state={this.store.stateView} errorButtonAction={this._getData}>

            <div className="d-flex align-items-center mb-3">
              <h5 className={"mb-0 mx-2"}>عنوان پروژه:</h5>
              <span>{this.store.title}</span>
            </div>
            <hr/>
            <div className=" my-3">
              <h5 className={"mb-0"}>محتوی متنی پروژه: </h5>
              <div className="m-5">
                <div dangerouslySetInnerHTML={{__html:this.store.content}}/>
                {/*<ViewEditor value={this.store.content}/>*/}
                {/*<span>{this.store.content}</span>*/}
              </div>
            </div>

          </StateView>
        </div>
      </>
    );
  }
}

export default withRouter(ViewContent);