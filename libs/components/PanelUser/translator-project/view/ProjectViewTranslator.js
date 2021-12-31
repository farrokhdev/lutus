import React, { Component } from "react";
import { observer } from "mobx-react";
import { withRouter } from "next/router";
import StateView from "../../../../../libs/components/UI/StateView/StateView";
import TranslatorPres from "../../../../../libs/mobx/presenters/TranslatorPres";
import UploadBoxTranslator from "../../../../../libs/components/PanelTranslator/UploadBoxTranslator";
import ProjectEndAction from "../../../../../libs/components/PanelTranslator/ProjectEndAction";
import OrderDetail from "../../../../../libs/mobx/models/Order/OrderDetail";
import ConversationBox from "../../../../../libs/components/Order/ConversationBox/converestionBox";
import FreeLancerSuggest from "../../../../../libs/components/PanelTranslator/FreeLancerSuggest";
import TranslatorSuggested from "../../../../../libs/components/PanelTranslator/TranslatorSuggested";
import SelectProject from "../../../../../libs/components/PanelTranslator/SelectProject";
import DedicateProject from "../../../../../libs/components/PanelTranslator/DedicateProject";

import StepPaymentTranslator from "../../Projects/StepPaymentTranslator";
import TranslatorAcceptedStep from "../../../PanelTranslator/TranslatorAcceptedStep";
import { Button, Card, Popconfirm } from "antd";
import TimeManagerTranslator from "../../../PanelTranslator/TimeManagerTranslator";

@observer
class ProjectViewTranslator extends Component {
  constructor(props) {
    super(props);
    this.store = new TranslatorPres();
  }

  state = {
    priceType: "",
    payment: "",
    price: "",
    translatorID: "",
    visible: "",
  };

  componentDidMount() {
    this._getData();
  }

  _getData = () => {
    this.store.getProjectView({ order_id: this.props.router.query.status });
  };

  getFile = ({ id }, order_id) => {
    const data = {};
    data.id = id;
    data.order_id = order_id;
    this.store.downloadOrderFileUser(data);
  };

  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  fileDownload = ({ id, content_type, content }) => {
    if (content_type === "link") {
      window.open(content, "_blank");
    } else {
      this.store.downloadOrderFile({ order_id: id });
    }
  };

  _deCandel = () => {
    this.store.getDeCancelProject();
  };

  render() {
    const { projectView, loadingEnseraf } = this.store;

    return (
      <>
        <div className="">
          <StateView
            state={this.store.stateView}
            errorButtonAction={this._getData}
          >
            {projectView.resignation ? (
              <Card title={"اعلام انصراف"} className="radius mb-3 ">
                <div className={"gray-title"}>انصراف شما ثبت شده</div>
                <div>
                  انصراف شما ثبت شده و در صورت تائید ناظر سایت پروژه از لیست
                  پرژه های شما حذف می شود.
                </div>

                <div className={"tex-right mt-2"}>
                  <Popconfirm
                    title="آیا تایید میکنید که این پروژه را صرف نظر از انصراف کنید ؟"
                    onConfirm={this._deCandel}
                    onCancel={() => {}}
                    okText="تایید"
                    cancelText="لغو"
                  >
                    <Button loading={loadingEnseraf} type={"primary"}>
                      صرف نظر از انصراف
                    </Button>
                  </Popconfirm>
                </div>
              </Card>
            ) : null}

            {projectView.status !== "pending" && (
              <StepPaymentTranslator
                store={this.store}
                getData={this._getData}
                getFile={this.getFile}
              />
            )}

            {projectView.status === "readiness" && (
              <SelectProject store={this.store} />
            )}

            {projectView.status === "in_progress" && !projectView.resignation && (
              <>
                <TimeManagerTranslator store={this.store} />

                <UploadBoxTranslator
                  store={this.store}
                  getData={this._getData}
                />
                <ProjectEndAction store={this.store} />
              </>
            )}

            {projectView.status === "awaiting_translator_accept" && (
              <DedicateProject store={this.store} />
            )}

            <Card
              className="radius mb-3"
              title={"شماره سفارش:" + " " + projectView.order_number}
              extra={"روزمهلت تحویل:" + " " + projectView.details.deliver_date}
            >
              <div className="d-flex flex-column ">
                <span className={"gray-title"}>توضیحات ناظر:</span>
                <span>{projectView.details.description}</span>
              </div>
            </Card>

            <OrderDetail store={this.store} />

            {projectView.status === "awaiting_translator_accept_steps" && (
              <TranslatorAcceptedStep
                store={this.store}
                getData={this._getData}
              />
            )}

            {projectView.status === "freelancer_readiness" &&
              (projectView.suggestion ? (
                <TranslatorSuggested store={this.store} />
              ) : (
                <FreeLancerSuggest store={this.store} getData={this._getData} />
              ))}
          </StateView>

          {projectView.status === "in_progress" && (
            <ConversationBox owner={projectView.user_owner} />
          )}
        </div>
      </>
    );
  }
}

export default withRouter(ProjectViewTranslator);
