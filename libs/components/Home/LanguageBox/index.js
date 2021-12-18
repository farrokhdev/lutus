import React, {Component} from 'react';
import {observer} from "mobx-react";
import Language from "./Language";
import LanguagePres from "../../../mobx/presenters/LanguagePres";
import StateView from "../../UI/StateView/StateView";
import {Divider} from "antd"

@observer
class LanguageBox extends Component {

  constructor(props) {
    super(props);
    this.store = new LanguagePres()
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.store.getLanguageList()
  }

  render() {

    return (
      <>
        <div className="bg-white">
          <div className="container">
            <div className="d-flex flex-column py-5 pr-3">
              <div className="text-center mb-3">
                <Divider>
                  <span className="bold-title ">زبان های تحت پوشش</span>
                </Divider>
              </div>

              <StateView state={this.store.stateView} errorButtonAction={this._getData}>
                <div className="col-9 mx-auto">
                  <div className="py-3">
                    <div className="row  ">
                      {this.store.languageList.map((item, index) => {
                          return <div className=" col-6 col-md-3 " key={index}>
                            <Language item={item}/>
                          </div>
                        }
                      )}
                    </div>
                  </div>
                </div>
              </StateView>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LanguageBox;