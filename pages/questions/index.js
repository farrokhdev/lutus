import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Button, Collapse} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import FaqPres from "../../libs/mobx/presenters/faqPres";
import StateView from "../../libs/components/UI/StateView/StateView";
import Layout from "../../libs/components/UI/Layout";
import Head from "next/head";

const {Panel} = Collapse;

@observer
class Questions extends Component {

  constructor(props) {
    super(props);
    this.store = new FaqPres()
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.store.getFaqListPage()
  }

  callback(key) {
    console.log(key);
  }

  genExtra = () => (
    <div className={"px-3"}>
      <DownOutlined/>
    </div>
  );

  render() {
    return (
      <>
        <Head><title>سوالات متداول</title></Head>
        <Layout>
        <div className="container">
          <div className="user-panel radius d-flex flex-column mt-3 mb-4 ">
            <h1 className="h5">سوالات متداول</h1>
            <span className="sub-title ">موسسه لوتوس با خدمات و تعرفه های عالی در خدمت شما</span>
            <div className="py-3  ">
              <StateView state={this.store.stateView} errorButtonAction={this._getData}>

                <Collapse accordion expandIconPosition={"left"}>
                  {this.store.questionList.map((item, index) => {
                    return <Panel header={item.title} key={item.id} showArrow={false} extra={this.genExtra()}>
                      <p className={"text-muted"}>{item.description}</p>
                    </Panel>
                  })}
                </Collapse>


              </StateView>
            </div>

          </div>
        </div>
      </Layout>
      </>
    );
  }
}

export default Questions;