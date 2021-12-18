import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Divider,Button, Collapse} from 'antd';
import FaqPres from "../../../mobx/presenters/faqPres";
import StateView from "../../UI/StateView/StateView";
import {DownOutlined} from '@ant-design/icons';
import Link from "next/link";

const {Panel} = Collapse;

@observer
class QuestionBox extends Component {

  constructor(props) {
    super(props);
    this.store = new FaqPres()
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.store.getFaqList()
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
        <div className="bg-white">
        <div className="container">
          <div className="py-5 px-2 ">
            <div className="text-center">
              <Divider>
                <span className="bold-title ">سوالات متداول</span>
              </Divider>
            </div>
            <div className="col-9 mx-auto">

              <div className="py-3  ">
                <StateView state={this.store.stateView} errorButtonAction={this._getData}>

                  <Collapse accordion expandIconPosition={"left"} className={"py-3  "}>
                    {this.store.questionList.map((item, index) => {
                      return <Panel key={index} header={item.title} key={item.id} showArrow={false}
                                    extra={this.genExtra()}
                                    className={"py-2 "}>
                        <p className={"text-muted"}>{item.description}</p>
                      </Panel>
                    })}
                  </Collapse>

                  <div className="d-flex justify-content-center ">
                    <Link href={"/questions"}><a>
                      <Button className={'login-btn '}>مشاهده بیشتر</Button>
                    </a></Link>
                  </div>

                </StateView>
              </div>
            </div>
          </div>
        </div>
        </div>
      </>
    );
  }
}

export default QuestionBox;