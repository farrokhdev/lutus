import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Card,Button, Modal, Empty, Result} from "antd";
import SystemSuggest from "../../Suggest/SystemSuggest";
import {withRouter} from 'next/router';

@observer
class UserProjectEnded extends Component {

  state = {visible: false}

  _handleSelectTranslator = () => {
    const data = {}
    data.order_id = this.props.router.query.status
    data.user_id = this.state.translatorID
    this.props.store.selectTranslator(data, this.callBakSelect)
  }

  callBakSelect = () => {
    this.setState({visible: false})
    this.props.getData()
    // this.props.store.setVal("suggestionsList",false)
  }

  handleBtn = (translatorID) => {
    this.setState({visible: true, translatorID})
  }


  render() {
    const {suggestionsList} = this.props.store

    return (<div className={"mb-3"}>

      <Card title={"انتخاب مترجم"} className={"radius"}>
        <div className="mb-4">
        <span className={" gray-title"}>مترجم مورد نظر خود را انتخاب کنید</span>
        </div>
        <div className="row ">
          {suggestionsList.length > 0 ? suggestionsList.map((suggest, index) => {
            return <SystemSuggest suggest={suggest} key={index} handleBtn={this.handleBtn} store={this.props.store}/>
          }) : <div className={"w-100 mx-auto my-2"}><Empty/></div>}
        </div>
      </Card>

      <Modal visible={this.state.visible} footer={null} onCancel={() => this.setState({visible: false})}>
        <Result
          title="آیا از انتخاب مترجم خود مطمئن هستید؟"
          extra={[
            <div className={"d-flex justify-content-center"}>
              <Button loading={this.props.store.loading} onClick={() => this._handleSelectTranslator()}
                      className="ok-btn mx-2 w-50"
                      type={"primary"}>تایید</Button>
              <Button onClick={() => this.setState({visible: false})} className="cancel-btn  mx-2 w-50">لغو</Button>
            </div>
          ]}
        />
      </Modal>
    </div>)
  }
}

export default withRouter(UserProjectEnded);