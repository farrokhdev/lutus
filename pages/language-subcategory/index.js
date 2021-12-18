import React, {Component} from 'react';
import {observer} from "mobx-react";
import Layout from "../../libs/components/UI/Layout";
import PanelSideBar from "../../libs/components/PanelUser/PanelSideBar";
import SelectSubCategoryLanguage from "../../libs/components/PanelTranslator/SelectSubCategoryLanguage";
import CooperationPres from "../../libs/mobx/presenters/CooperationPres";
import {withRouter} from 'next/router'
import Head from "next/head";

@observer
class Index extends Component {

  constructor(props) {
    super(props);
    this.store = new CooperationPres()
  }



  render() {
    return (
      <>
        <Head><title>زمینه تخصصی</title></Head>
        <Layout>
          <section>
            <div className="container">
              <div className="row">
                <div className="col-3"><PanelSideBar/></div>
                <div className="col-9 pr-0">
                  <div className="user-panel radius my-3">
                      <SelectSubCategoryLanguage store={this.store}/>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </>
    );
  }
}

export default withRouter(Index);