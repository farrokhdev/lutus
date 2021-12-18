import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import TranslatorInfo from "./EditTranslator/TranslatorInfo";
import TranslatorJobs from "./EditTranslator/TranslatorJobs";
import TranslatorEducation from "./EditTranslator/TranslatorEducation";
import TranslatorArticle from "./EditTranslator/TranslatorArticle";
import TranslatorCertificate from "./EditTranslator/TranslatorCertificate";


@inject("CoreStore")
@observer
class EditProfileTranslate extends Component {



  render() {

    return (
      <>
        <TranslatorInfo/>
        <TranslatorJobs/>
        <TranslatorEducation/>
        <TranslatorArticle/>
        <TranslatorCertificate/>
      </>
    );
  }
}

export default EditProfileTranslate;