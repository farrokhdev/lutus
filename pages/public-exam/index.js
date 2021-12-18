import React, {Component} from 'react';
import {observer} from "mobx-react";
import {withRouter} from 'next/router';
import QuizPage from "../../libs/components/TeamMeat/QuizPage";
import CooperationPres from "../../libs/mobx/presenters/CooperationPres";
import Layout from "../../libs/components/UI/Layout";
import PanelSideBar from "../../libs/components/PanelUser/PanelSideBar";
import Head from "next/head";

@observer
class PublicExam extends Component {

  constructor(props) {
    super(props);
    this.store = new CooperationPres()
  }

  componentDidMount() {
    this._getData()
  }

  _getData=()=>{
    // this.store.getQuizQuestions({language_id: this.props.router.query.id}, () => {})
  }

  render() {
    return (
      <>
        <Head><title>آزمون</title></Head>
        <Layout>
          <section>
            <div className="container">
              <div className="row">
                <div className="col-3"><PanelSideBar/></div>
                <div className="col-9 pr-0">
                    <QuizPage store={this.store}/>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </>
    );
  }
}

export default withRouter(PublicExam);