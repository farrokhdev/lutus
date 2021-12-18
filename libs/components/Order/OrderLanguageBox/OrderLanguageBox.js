import React, {Component} from 'react';
import {observer} from "mobx-react";

@observer
class OrderLanguageBox extends Component {
  render() {
    const {handleSelectLanguage,item,id} = this.props

    return (
      <>
        <div className={`language-box p-3 shadow ${id === item.id && "language-active"}`} onClick={()=>handleSelectLanguage(item.title,item.id)}>
          <img src={item.flag} width="45"/>
          <span className="mt-2 sub-title-gray ">{item.title}</span>
        </div>
      </>
    );
  }
}

export default OrderLanguageBox;