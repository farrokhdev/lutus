import React, {Component} from 'react';
import {observer} from "mobx-react";
import {withRouter} from 'next/router';
import ProjectPres from "../../../../../libs/mobx/presenters/ProjectPres";
import {Card, Result, Modal, Avatar, Rate, Radio, Button} from "antd"
import StateView from "../../../../../libs/components/UI/StateView/StateView";
import UserProjectEnded from "../../../../../libs/components/PanelUser/Projects/UserProjectEnded";
import TranslatorSelect from "../../../../../libs/components/PanelUser/Projects/TranslatorSelect";
import EvaluationProjectUser from "../../../../../libs/components/PanelUser/Projects/EvaluationProjectUser";
import OrderDetail from "../../../../../libs/mobx/models/Order/OrderDetail";
import TransferBox from "../../../../../libs/mobx/models/Order/TransferBox";
import ConversationBox from "../../../../../libs/components/Order/ConversationBox/converestionBox";
import StepSelect from "../../Projects/StepSelect";
import StepPaymentUser from "../../Projects/StepPaymentUser";
import TranslatorRejectSteps from "../../Projects/TranslatorRejectSteps";


@observer
class ProjectViewUser extends Component {

  constructor(props) {
    super(props);
    this.store = new ProjectPres()
  }

  state = {
    priceType: '',
    payment: '',
    price: '',
    translatorID: '',
    visible: ''
  }

  componentDidMount() {
    this._getData()
  }


  _getData = () => {
    this.store.getProjectView({order_id: this.props.router.query.status})
  }


  _MyTranslator = () =>   {
    const {translator, projectView} = this.store
    return <div className={" mb-3"}>
      <Card className={"radius"} title={"مترجم انتخابی"}>

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="">
              <Avatar src={translator.image ? translator.image : "/static/images/user.svg"} size={55}/>
            </div>
            <div className="d-flex flex-column px-2">
              <span className="titr-title">{translator.name} {translator.family}</span>
              <Rate value={translator.rate} disabled/>
            </div>
          </div>
        </div>


        {/*{projectView.payment_type ==="one" && <TransferBox store={this.store} getFile={this.getFile}/>}*/}
      </Card>
    </div>
  }


  getFile = ({id}, order_id) => {
    const data = {}
    data.id = id
    data.order_id = order_id
    this.store.downloadOrderFileUser(data)
  }


  render() {

    const {projectView, translator} = this.store

    return (
      <div className={""}>
        <StateView state={this.store.stateView} errorButtonAction={this._getData}>
          {(projectView.status !== "pending" && projectView.status !== "accept_detail") &&
          <StepPaymentUser store={this.store} getData={this._getData} getFile={this.getFile}/>}


          {projectView.status === "readiness" && <TranslatorSelect store={this.store} getData={this._getData}/>}


          {projectView.status === "accept_detail" && <StepSelect store={this.store} getData={this._getData}/>}




          {(projectView.status === "confirm" || projectView.status === "complete") &&
          <EvaluationProjectUser store={this.store}/>}


          {translator && this._MyTranslator()}


          <OrderDetail store={this.store}/>


          {projectView.status === "translator_reject_steps" &&
          <TranslatorRejectSteps store={this.store} getData={this._getData}/>}


          {projectView.status === "freelancer_readiness" &&
          <TranslatorSelect store={this.store} getData={this._getData}/>}


          {projectView.status === "protest" && <Card className={"mb-3 radius"} title={"اعتراض شما ثبت شد"}>
            <span>اعتراض شما ثبت شده است و پس از بررسی توسط ناظر ،تعیین وضعیت پروژه به اطلاع شما خواهد رسید.</span>
          </Card>}



          {projectView.status === "ended" && <UserProjectEnded store={this.store} getData={this._getData}/>}


        </StateView>


        {(translator && projectView.status !== "complete") ? <ConversationBox owner={projectView.user_owner}/> : null}

      </div>
    )
      ;
  }
}

export default withRouter(ProjectViewUser);
