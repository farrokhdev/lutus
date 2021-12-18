import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import Layout from "../../libs/components/UI/Layout";
import PanelSideBar from "../../libs/components/PanelUser/PanelSideBar";
import Dashboard from "../../libs/components/PanelUser/Dashboard/Dashboard";
import Setting from "../../libs/components/PanelUser/Setting/Setting";
import Support from "../../libs/components/PanelUser/Support/Support";
import Router, {withRouter} from 'next/router'
import Questions from "../../libs/components/PanelUser/Questions";
import Favourite from "../../libs/components/PanelUser/Favourite/Favourite";
import MyWords from "../../libs/components/MyWords/MyWords";
import TranslatorManage from "../../libs/components/PanelTranslator/TranslatorManage";
import ProjectTranslate from "../../libs/components/PanelUser/Projects/Projecttranslate";
import ProjectType from "../../libs/components/PanelUser/Projects/Projecttype";
import Finance from "../../libs/components/PanelUser/Finance";

import UserTranslate from "../../libs/components/PanelUser/project/UserTranslate";
import TranslatorTranslate from "../../libs/components/PanelUser/translator-project/TranslatorTranslate";
import ProjectViewUser from "../../libs/components/PanelUser/project/view/ProjectViewUser";
import Missing from "../../libs/components/PanelUser/translator-project/missing";
import ProjectViewTranslator from "../../libs/components/PanelUser/translator-project/view/ProjectViewTranslator";
import Tlist from "../../libs/components/PanelUser/t/Tlist";
import Tview from "../../libs/components/PanelUser/t/Tview";
import ViewContent from "../../libs/components/PanelUser/Projects/ViewContent";
import TicketView from "../../libs/components/Ticket/TicketView";
import TicketAdd from "../../libs/components/Ticket/TicketAdd";
import IncomeTranslator from "../../libs/components/PanelTranslator/IncomeTranslator";

import CheckOut from "../../libs/components/PanelTranslator/CheckOut";
import BankInfo from "../../libs/components/PanelTranslator/BankInfo";


@observer
class Panel extends Component {


  _renderComponent = () => {

    switch (this.props.router.query.tab) {

      case "dashboard":
        return <Dashboard/>
      case "viewContent":
        return <ViewContent/>
      case "project":
        return <UserTranslate/>
      case "translator-project":
        return <TranslatorTranslate/>
      case "translator-miss":
        return <Missing/>
      case "projectViewUser":
        return <ProjectViewUser/>
      case "income":
        return <IncomeTranslator/>
      case "bankInfo":
        return <BankInfo/>
      case "checkout":
        return <CheckOut/>
      case "finance":
        return <Finance/>
      case "projectViewTranslator":
        return <ProjectViewTranslator/>
      case "support":
        return <Support/>
      case "setting":
        return <Setting/>
      case "Tlist":
        return <Tlist/>
      case "addTicket":
        return <TicketAdd/>
      case "supportView":
        return <TicketView/>
      case "Tview":
        return <Tview/>
      case "questions":
        return <Questions/>
      case "favourite":
        return <Favourite/>
      case "words":
        return <MyWords/>
      case "translator":
        return <TranslatorManage/>

      default:
        return <Dashboard/>
    }
  }

  render() {

    return (
      <>

        <Layout>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-3  ">
                <PanelSideBar/>
              </div>
              <div className="col-12 col-md pr-2  ">
                <div className="mt-3 mb-5">

                    {this._renderComponent()}

                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

export default withRouter(Panel);