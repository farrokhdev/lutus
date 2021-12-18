import React, {Component} from 'react';
import {observer} from "mobx-react";
import Layout from "../../libs/components/UI/Layout";
import PanelSideBar from "../../libs/components/PanelUser/PanelSideBar";
import Head from "next/head";
import {Card,Input, Form, Button} from "antd";
import FormBuilder from 'antd-form-builder';
import {withTranslation} from "react-i18next";
import ProfilePres from "../../libs/mobx/presenters/ProfilePres";


@observer
class ChangePassword extends Component {

  constructor(props) {
    super(props);
    this.store=new ProfilePres()
    this.formRef = React.createRef();
  }


  _handleChangePassword = (data) => {
    console.log(data)
    this.store.getChangePassword(data)
  }

  render() {
    const {t} = this.props
    const meta = {
      formItemLayout: null,
      columns:1,
      fields: [
        {
          key: 'old_password', placeholder: t("form.old_password"),label:t("form.old_password"), widget: 'password', required: true, message: t('form.required-password')
        },
        {
          key: 'password', placeholder: t("form.password"),label:t("form.password"), widget: 'password', onChange: () => {
            if (this.formRef.current.isFieldTouched('confirmPassword')) {
              this.formRef.current.validateFields(['confirmPassword'])
            }
          }, required: true, message: t('form.required-password')

        },
        {
          key: 'password_confirmation', placeholder: t("form.passwordVerify"),label:t("form.passwordVerify"), widget: 'password', required: true, rules: [
            {
              validator: (rule, value, callback) => {
                return new Promise((resolve, reject) => {
                  if (value !== this.formRef.current.getFieldValue('password')) {
                    reject(new Error(t('form.valid-password')))
                  } else {
                    resolve()
                  }
                })
              },
            },
          ], message: t('form.valid-password')
        },
      ]
    }
    return (
      <>
        <Head><title>تغیر رمز عبور</title></Head>
       <Layout>
         <div className="container">
           <div className="row">
             <div className="col-3"><PanelSideBar/></div>
             <div className="col-9">
               <div className="my-3">
                 <Card className="radius" title={'تعویض رمز عبور'}>

                   <Form ref={this.formRef} layout="vertical" className={"w-50"} onFinish={this._handleChangePassword}>
                     <FormBuilder meta={meta} form={this.formRef}/>
                     <div className="d-flex align-items-center w-100 mx-auto ">
                       <Button loading={this.store.loading} onClick={() => this.formRef.current.submit()}
                               className={"login-btn  w-25"}>{t("btn.changePassword")}</Button>
                     </div>
                   </Form>
                 </Card>
               </div>

             </div>
           </div>
         </div>
       </Layout>
      </>
    );
  }
}

export default withTranslation('common')(ChangePassword);