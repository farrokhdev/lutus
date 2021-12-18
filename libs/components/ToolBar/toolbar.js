import React, {Component} from 'react';
import {Button} from "antd";
import {YahooOutlined, MobileOutlined, MessageOutlined,WhatsAppOutlined,PhoneOutlined} from "@ant-design/icons"
import TollBarBtn from "../ToolBarBtn/TollBarBtn";
import ContactPres from "../../mobx/presenters/ContactPres";
import {observer} from "mobx-react";

@observer
class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.store=new ContactPres()
  }
  componentDidMount() {
    this._getData()
  }

  _getData=()=>{
    this.store.getContactList()
  }

  render() {
    const {visibility, onClickToll} = this.props;
    const list = [
      {icon: <MessageOutlined style={{fontSize:20}}/>, flag: "telegram",title:"تلگرام"},
      {icon: <WhatsAppOutlined style={{fontSize:20}} />, flag: "whatsapp",title:"واتس آپ"},
      {icon: <PhoneOutlined style={{fontSize:20}} />, flag: "phone",title:"تماس تلفنی"},
      {icon: <MobileOutlined  style={{fontSize:20}}/>, flag: "mobile",title:"تماس با موبایل"},
    ]

    return (
      <div>
        {visibility &&
          <div className={"support-toolbar flex-column"}>
            {list.map((btn, index) => {
              return <TollBarBtn contact={this.store.contactList} btn={btn} waiting={(index ) * 200}/>
            })}
          </div>}
        <div onClick={onClickToll} className={`custom-th cursor toolbar  ${visibility ? "circle" : 'radius'}` }>{visibility ?"X" : "ارتباط با ما"}</div>
      </div>
    );
  }

}

export default Toolbar;