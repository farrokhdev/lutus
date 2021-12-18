import React, {Component} from 'react';
import {observer} from "mobx-react";
import Service from "./Service";
import ServicePres from "../../../mobx/presenters/ServicePres";
import StateView from "../../UI/StateView/StateView";


@observer
class ServicesBox extends Component {
  constructor(props) {
    super(props);
    this.store = new ServicePres()
  }

  state={
    type:0
  }

  componentDidMount() {
    this._getData()
  }
  _getData=()=>{
    this.store.getServiceList()
  }


_renderTypeService=()=>{
    return(<div className=" scroll-x row justify-content-center flex-nowrap flex-md-wrap ">
      <div className="d-flex">
        <h4 className={"text-gray"}>به زودی ...   :)</h4>
      </div>

    </div>)
}

  _renderTranslateService=()=>{
    return(<div className=" scroll-x row justify-content-center flex-nowrap flex-md-wrap ">
      {this.store.ServiceList.map((item, index) => {
        return <div className="col-5 col-md-3 p-2 " key={index}>
          <Service item={item}/>
        </div>
      })}

    </div>)
  }

  render() {

    return (
      <section id={"service"}>
        <div className="bg-gray  ">
          <div className="container ">
            <div className="d-flex flex-column text-center padding80  ">
              <div className="position-relative text-center pb-3 ">
                <span className="logo-bg"/>
                <span className=" bold-title logo-title ">خدمات لوتوس</span>
              </div>

              <div className="switch-btn radius  mt-2  mb-5 bg-white  ">
                <div className={`switch-label ${this.state.type === 0 && "switch-active"}`}
                     onClick={() => this.setState({type:0})}>ترجمه</div>
                <div className={`switch-label ${this.state.type === 1 && "switch-active"}`}
                     onClick={() => this.setState({type:1})}>تایپ
                </div>
              </div>


            <StateView state={this.store.stateView} errorButtonAction={this._getData}>
              {this.state.type ? this._renderTypeService() : this._renderTranslateService()}
            </StateView>

            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ServicesBox;