import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Button, Collapse} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import FaqPres from "../../../mobx/presenters/faqPres";
import Head from "next/head";
import StateView from "../../UI/StateView/StateView";


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
        <Head>
          <title>سوالات متداول</title>
        </Head>
        <div className="d-flex flex-column user-panel radius ">
          <div className="mb-3">
            <h3 className={"title-page"}>سوالات متداول</h3>
            <hr/>
          </div>
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
      </>
    );
  }
}

export default Questions;