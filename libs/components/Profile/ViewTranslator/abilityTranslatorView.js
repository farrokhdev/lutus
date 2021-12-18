import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Empty,Tag} from 'antd'
@observer
class AbilityTranslatorView extends Component {
  render() {
    const {languages} = this.props

    return (
      <div>
        <div className="calculating-box my-5 p-3">
          <div className="p-3">
            <h6>مهارت های ترجمه</h6>
          </div>
          {languages ? languages.map(i => {
            return <div className="p-3">
              <div className={"d-flex  align-items-center"}>
                <h5 className={"m-0"}>{i.title}</h5>

                <div className="mx-2">
                     {i.fields.map((field,indexx) => <Tag color="default" className={" sub-title p-2 "}>{indexx+1} - {field.title}</Tag>)}
                </div>

              </div>
            </div>
          }) : <Empty/>}


        </div>
      </div>
    );
  }
}

export default AbilityTranslatorView;