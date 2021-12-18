import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Card,Button,Input} from "antd";

const {TextArea} = Input

@observer
class TranslatorAcceptedStep extends Component {

  state={
    value:'',
    error:false
  }

  stepAction=(status)=>{
    const data={}
    data.order_id=this.props.store.projectView.id

    if(status==="accept"){
      data.accept=1
      this.props.store.acceptPaySteps(data,this.props.getData) }
    if(status==="reject"){
      if(!this.state.value){
        this.setState({error:true})
      }else{
        data.accept=0
        data.comment=this.state.value
        this.props.store.acceptPaySteps(data,this.props.getData)
      }
    }
  }

  render() {
    return (
      <>
        <Card title={"تایید پرداخت مرحله ای"} className="radius mb-3">

          <span>پرداخت پروژه شما به صورت مرحله شده است، اگه مایل به ادامه همکاری هستید، دکمه قبول پروژه را بزنید و گرنه میتوانید پروژه را رد کنید.</span>
          <div className="my-3">
            <TextArea onChange={e=>this.setState({value:e.target.value,error:false})} placeholder={"دلیل رد یا اعتراض خود را بنویسد"}/>
            {this.state.error && <span className={"err-title"}>برای رد کردن پروژه، دلیل رد پروژه الزامی است.</span>}
          </div>

          <div className="d-flex align-items-center my-2 ">
            <Button className={"ok-btn mx-2"} onClick={()=>this.stepAction('accept')}>قبول پروژه</Button>
            <Button className={"cancel-btn mx-2"} onClick={()=>this.stepAction('reject')}>رد پروژه</Button>
          </div>
        </Card>
      </>
    );
  }
}

export default TranslatorAcceptedStep;