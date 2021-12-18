import React, {Component} from 'react';
import {observer} from "mobx-react";
import Layout from "../../../../libs/components/UI/Layout";
import PanelSideBar from "../../../../libs/components/PanelUser/PanelSideBar";
import {Empty, Button, Affix, Avatar, Rate} from "antd";
import {HeartOutlined} from '@ant-design/icons';

import {withRouter} from 'next/router'
import InfoTranslatorView from "../../../../libs/components/Profile/ViewTranslator/InfoTranslatorView";

import StateView from "../../../../libs/components/UI/StateView/StateView";
import EducationTranslatorView from "../../../../libs/components/Profile/ViewTranslator/EducationTranslatorView";
import ArticleTranslatorView from "../../../../libs/components/Profile/ViewTranslator/ArticleTranslatorView";
import JobTranslatorView from "../../../../libs/components/Profile/ViewTranslator/JobTranslatorView";

import RateTranslatorView from "../../../../libs/components/Profile/ViewTranslator/RateTranslatorView";
import ProfilePres from "../../../../libs/mobx/presenters/ProfilePres";
import AbilityTranslatorView from "../../../../libs/components/Profile/ViewTranslator/abilityTranslatorView";
import CertificateTranslatorView from "../../../../libs/components/Profile/ViewTranslator/CertificateTranslatorView";
import Head from "next/head";

@observer
class Tview extends Component {
  constructor(props) {
    super(props);
    this.store = new ProfilePres()
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.store.getProfileView({username: this.props.router.query.status})
  }


  render() {
    const {info, articles, certificates, education, languages, jobs, rates, reviews} = this.store.profileView

    return (
      <>
        <div className="user-panel radius">

          <StateView state={this.store.stateView} errorButtonAction={this._getData}>


            <InfoTranslatorView  profileView={this.store.profileView}/>


            <RateTranslatorView rate={rates}/>


            <AbilityTranslatorView languages={languages}/>


            <EducationTranslatorView education={education}/>


            <ArticleTranslatorView articles={articles}/>


            <JobTranslatorView jobs={jobs}/>


            <CertificateTranslatorView certificates={certificates}/>


          </StateView>
        </div>
      </>
    );
  }
}

export default withRouter(Tview);