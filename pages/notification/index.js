import React, {Component} from 'react';
import {observer} from "mobx-react";
import NotificationPres from "../../libs/mobx/presenters/NotificationPres";
import PanelSideBar from "../../libs/components/PanelUser/PanelSideBar";
import StateView from "../../libs/components/UI/StateView/StateView";
import Layout from "../../libs/components/UI/Layout";
import Head from "next/head";
import {Empty, Button} from "antd";
import moment from "moment";


@observer
class Index extends Component {

  constructor(props) {
    super(props);
    this.store = new NotificationPres()
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.store.getNotificationList()
  }

  loadMore = () => {
    this.store.getNotMoreificationList({page: this.store.page + 1})
  }


  _renderIcon = (type) => {

    let icon = "/static/images/wallet.svg";

    switch (type) {
      case"wallet":
        icon = "/static/images/wallet.svg"
        break
      case"order":
        icon = "/static/images/project.svg"
        break
    }

    return <img className={"mx-2"} src={icon} width={20}/>
  }

  render() {
    const {notificationList, stateView, page, total, loading} = this.store

    return (
      <>
        <Head><title>اعلان ها</title></Head>
        <Layout>
          <div className="container">
            <div className="row">
              <div className="col-3"><PanelSideBar/></div>
              <div className="col-9">
                <div className="my-3">
                  <div className="user-panel radius">
                    <div className="mb-3">
                      <h3 className="title-page">اعلان ها</h3>
                      <hr/>
                    </div>
                    <StateView state={stateView} errorButtonAction={this._getData}>

                      <div className="notificationList">

                        {notificationList.length > 0 ? notificationList.map((item, index) => {

                            return <div key={index} className={"calculating-box p-4"}>
                              <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center ">
                                  {this._renderIcon(item.type)}
                                  <h6 className={"mb-0"}>{item.title}</h6>
                                </div>

                                <div className="d-flex align-items-center ">
                                  <span className={""}>{moment(item.created_at).locale('fa').fromNow()}</span>
                                </div>
                              </div>
                              <div className="mx-3 pt-3">
                                <span className={"gray-title fw300"}>{item.description}</span>
                              </div>
                            </div>
                          })
                          : <Empty/>}


                        {total > notificationList.length && <div className="d-flex justify-content-center p-4">
                          <Button className={"btn-primary radius  w-25"} type={"primary"} onClick={this.loadMore}
                                  loading={loading}>بیشتر</Button>
                        </div>}

                      </div>

                    </StateView>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Layout>
      </>
    );
  }
}

export default Index;