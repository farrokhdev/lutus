import React, {Component} from 'react';
import {observer} from "mobx-react";
import Layout from "../../libs/components/UI/Layout";
import OrderBox from "../../libs/components/Home/OrderBox";
import ProsessBox from "../../libs/components/Home/ProsessBox";
import ServicesBox from "../../libs/components/Home/ServicesBox";
import WhyLotus from "../../libs/components/Home/WhyLotus";
import StoreSection from "../../libs/components/Home/StoreBox";
import NewsBox from "../../libs/components/Home/NewsBox";
import QuestionBox from "../../libs/components/Home/QuestionBox";
import LanguageBox from "../../libs/components/Home/LanguageBox";
import Head from "next/head"

@observer
class Index extends Component {
  render() {
    return (
      <>
        <Head>
          <title>لوتوس نویسه</title>
        </Head>
        <Layout>
          <main>
            <OrderBox/>
            <ProsessBox/>
            <WhyLotus/>
            <LanguageBox/>
            <ServicesBox/>
            <StoreSection/>
            <NewsBox/>
            <QuestionBox/>
          </main>
        </Layout>
      </>
    );
  }
}

export default Index;