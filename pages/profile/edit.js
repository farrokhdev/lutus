import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import Layout from "../../libs/components/UI/Layout";
import PanelSideBar from "../../libs/components/PanelUser/PanelSideBar";
import EditProfileUser from "../../libs/components/Profile/EditProfileUser";
import EditProfileTranslator from "../../libs/components/Profile/EditProfileTranslator";
import Head from "next/head";


@inject("CoreStore")
@observer
class Edit extends Component {
  render() {

    return (
      <>
        <Head><title>اصلاح پروفایل</title></Head>
        <Layout>
          <div className="container">
            <div className="row">
              <div className="col-3"><PanelSideBar/></div>
              <div className="col-9 pr-0">

                  {this.props.CoreStore.user.role === "user" ? <EditProfileUser/> : <EditProfileTranslator/>}

              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

export default Edit;