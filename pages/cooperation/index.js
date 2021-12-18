import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import Layout from "../../libs/components/UI/Layout";
import SelectRole from "../../libs/components/TeamMeat/SelectRole";
import CooperationPres from "../../libs/mobx/presenters/CooperationPres";
import SelectLanguage from "../../libs/components/TeamMeat/SelectLanguage";
import QuizPage from "../../libs/components/TeamMeat/QuizPage";
import PanelSideBar from "../../libs/components/PanelUser/PanelSideBar";
import Link from "next/link";
import Head from "next/head";

@inject("CoreStore")
@observer
class Index extends Component {

  constructor(props) {
    super(props);
    this.store = new CooperationPres()
  }


  _renderCheckingStatus = () => {
    return (<>
      <div className="projectView my-5 p-3">
        <h6>در حال بررسی</h6>
        <span>وضیعیت شما به عنوان مترجم در حال بررسی است،برای بررسی بیشتر به <Link href={"/panel/translator"}><a
          className={"text-primary"}>پنل کاربری</a></Link> خود بروید</span>
      </div>

    </>)
  }


  _renderTestingStatus = () => {
    return (<>
      <div className="projectView my-5 p-3">
        <h6>در انتظار آزمون</h6>
        <span>وضیعیت شما به عنوان مترجم در انتظار آزمون است،برای بررسی بیشتر به <Link href={"/panel/translator"}><a
          className={"text-primary"}>پنل کاربری</a></Link> خود بروید</span>
      </div>

    </>)
  }


  _renderShowComponent = () => {
    const {status} = this.props.CoreStore.user;
    switch (status) {
      case'user':
        return <SelectRole store={this.store}/>
      // case'select_language':
      //   return <SelectLanguage store={this.store}/>
      case'quiz':
        return <QuizPage store={this.store}/>
      case'checking':
        return this._renderCheckingStatus()
      case'test_translate':
        return this._renderTestingStatus()
      case'busy':
        return <SelectRole/>
      case'active':
        return <SelectRole/>

    }
  }

  render() {
    return (
      <>
        <Head><title>همکاری با ما</title></Head>
        <Layout>
          <section>
            <div className="container">
              <div className="row">
                <div className="col-3"><PanelSideBar/></div>
                <div className="col-9 pr-0">
                  <div className="user-panel radius">
                    {this._renderShowComponent()}
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

export default Index;