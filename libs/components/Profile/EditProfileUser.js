import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import FormBuilder from 'antd-form-builder';
import {message, Input, Form, Button} from "antd";
import ProfilePres from "../../mobx/presenters/ProfilePres";
import StateView from "../UI/StateView/StateView";

@inject("CoreStore")
@observer
class EditProfileUser extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.store = new ProfilePres()
  }


  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.store.getUserInfo()
  }

  submitEditProfile = (data) => {
    this.store.getUserProfileEdit(data, this.callBack)
  }

  callBack = (data) => {
    this.props.CoreStore.user.setVals(data)
  }


  render() {

    const meta = {
      initialValues: this.store.user,
      formItemLayout: null,
      columns: 2,
      fields: [
        {key: 'name', label: "نام", placeholder: "نام", colSpan: 1, required: true},
        {key: 'family', label: "نام خانوادگی", placeholder: "نام خانوادگی", colSpan: 1, required: true},
        {key: 'mobile', label: "شماره موبایل", placeholder: "شماره موبایل", colSpan: 1, required: true},
        {key: 'email', label: "ایمیل", placeholder: "ایمیل", colSpan: 1, required: true},
      ]
    }

    return (
      <div className="user-panel radius my-3">

          <h6 className={"title-page"}>ویرایش اطلاعات کاربری</h6>
          <hr/>

        <StateView errorButtonAction={this._getData} state={this.store.stateView}>
          <div className={" "}>

            <Form ref={this.formRef} layout="vertical" onFinish={this.submitEditProfile}>
              <FormBuilder meta={meta} form={this.formRef}/>
              <div className="d-flex align-items-center w-100  ">
                <Button onClick={() => this.formRef.current.submit()} loading={this.store.loading}
                        className={"login-btn  w-25"}>ویرایش اطلاعات</Button>
              </div>
            </Form>
          </div>
        </StateView>
      </div>
    );
  }
}

export default EditProfileUser;