import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Card,message, Input, Button, Rate} from "antd"
import {FrownOutlined, MehOutlined, SmileOutlined} from '@ant-design/icons';

const {TextArea} = Input

@observer
class EvaluationProjectUser extends Component {


  handleEvaluation = () => {
    const data = {}
    const {projectView} = this.props.store

    data.order_id = projectView.id
    data.title = projectView.review.title
    data.comment = projectView.review.comment
    data.rate = projectView.review.rate
    data.translate_quality = projectView.review.translate_quality * 2
    data.timely_delivery = projectView.review.timely_delivery * 2
    data.principles_write = projectView.review.principles_write * 2

    if (data.title && data.comment) {
      this.props.store.evaluationProjectUser(data, this.callBack)
    } else {
      message.error("لطفا تمام فیلد ها رو پر کنید")
    }
  }


  callBack = () => {
  }

  render() {

    const {review} = this.props.store.projectView


    let disabled = review.id ? true : false
    const style = {fontSize: "50px"}
    const customIcons = {
      1: <FrownOutlined style={style}/>,
      2: <FrownOutlined style={style}/>,
      3: <MehOutlined style={style}/>,
      4: <SmileOutlined style={style}/>,
      5: <SmileOutlined style={style}/>,
    };
    return (
      <div>
        <Card className="radius mb-3" title={"نظرسنجی"}>
          <div className="p-3">
            <span className={"gray-title"}>1. نظر کلی شما در مورد مترجم</span>
            <div className="d-flex justify-content-center p-2">
              <Rate disabled={disabled} value={review.rate} character={({index}) => customIcons[index + 1]} sie={50}
                    onChange={(e) => this.props.store.projectView.review.setVal("rate" ,e)}/>
            </div>
          </div>
          <div className="p-3">
            <span className={"gray-title"}>2. ارزیابی سطحی از مترجم</span>
            <div className="d-flex align-items-center p-2">
              <span className={"mx-4"}>کیفیت ترجمه</span>
              <Rate disabled={disabled} allowHalf onChange={(e) => review.translate_quality = e}
                    value={review.translate_quality}/>
            </div>
            <div className="d-flex align-items-center p-2">
              <span className={"mx-4"}>تحویل به موقع</span>
              <Rate disabled={disabled} allowHalf onChange={(e) => review.timely_delivery = e}
                    value={review.timely_delivery}/>
            </div>
            <div className="d-flex align-items-center p-2">
              <span className={"mx-4"}>رعایت اصول نگارش</span>
              <Rate disabled={disabled} allowHalf onChange={(e) => review.principles_write = e}
                    value={review.principles_write}/>
            </div>
          </div>
          <div className="p-3">
            <span className={"gray-title my-3"}>3. لطفا اگه تمام نقطه نظرات خود را که ممکن است که به ما کمک کند را برای ما بنویسید</span>
            <div className="p-3">
              {review.id?<div className={"d-flex flex-column"}><h6>عنوان ارزیابی</h6><span>{review.title}</span></div>:    <Input disabled={disabled} placeholder={"عنوان"} onChange={(e) => review.title = e.target.value}
                     value={review.title}/>}
            </div>
            <div className="p-3">
              {review.id?<div className={"d-flex flex-column"}><h6>متن ارزیابی</h6><span>{review.comment}</span></div>:<TextArea disabled={disabled} rows={5} placeholder={"توضیحات"} value={review.comment}
                        onChange={(e) => review.comment = e.target.value}/>}
            </div>
          </div>
          {!review.id && <div className="d-flex justify-content-center w-100">
            <Button loading={this.props.store.loading} onClick={this.handleEvaluation} className={"login-btn w-25"}>ارسال
              ارزیابی</Button>
          </div>}
        </Card>

      </div>
    );
  }
}

export default EvaluationProjectUser;