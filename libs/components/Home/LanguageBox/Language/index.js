import React, {Component} from 'react';
import {Observer} from "mobx-react"

@Observer
class Language extends Component {
  render() {
    const {item}=this.props;
    return (
      <div className={"language-box shadow-sm "}>
        <img src={item.flag} width="44"/>
        <span className={"sub-title px-3 "}>{item.title}</span>
      </div>
    );
  }
}

export default Language;