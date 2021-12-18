import React, {Component} from 'react';
import  {observer} from "mobx-react";
import {Card,Button,Modal,Result} from"antd";

@observer
class TranslatorSuggested extends Component {

  state={
    visible:false
  }

  handleSubmit = () => {
    const data = {}
    data.order_id = this.props.store.projectView.id
    data.free_translate_text = this.state.comment


      this.props.store.deleteProject(data, this.callBack)

  }

  callBack=()=>{
    this.setState({visible:false})
  }

  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  render() {
   const {suggestion}= this.props.store.projectView
    return (
      <>
       <Card title={"برای این پروژه پیشنهاد ارسال کردید"} className="radius mb-3 ">
         <div className="row py-4">

           <div className="col-12 col-md-4">
             <div className="d-flex  align-items-center">
               <span className={"gray-title mx-2"}> قیمت مورد نظر</span>
               {this.formatNumber(suggestion.amount)}
             </div>
           </div>

           <div className="col-12 col-md-4">
             <div className="d-flex  align-items-center">
               <span className={"gray-title mx-2"}>تعداد روز </span>
               {suggestion.duration}
             </div>

           </div>

           <div className="col-12 col-md-4">
             <div className="d-flex  align-items-center">
               <Button loading={this.props.store.loading} onClick={() => this.setState({visible: true})} className={"login-btn mx-2 w-100 "}>عدم آمادگی</Button>
             </div>

           </div>


         </div>
       </Card>
        <Modal visible={this.state.visible} footer={null} onCancel={() => this.setState({visible: false})}>
          <Result
            status={ "warning" }
            title={ "عدم آمادگی برای قبول پروژه"}
            extra={[
              <div className={"d-flex justify-content-center"}>
                <Button loading={this.props.store.endLoading} className={"ok-btn mx-2 w-50"}
                        onClick={this.handleSubmit}>تایید</Button>
                <Button className={"cancel-btn  mx-2 w-50"}
                        onClick={() => this.setState({visible: false, status: ''})}>لغو</Button>
              </div>
            ]}
          />
        </Modal>
      </>
    );
  }
}

export default TranslatorSuggested;