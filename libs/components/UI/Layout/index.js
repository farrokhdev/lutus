import React, {Component} from 'react';
import {observer} from "mobx-react";
import Header from "../../Header";
import Footer from "../../Footer";
import {BackTop, Button} from 'antd';
import CaretUpOutlined from '@ant-design/icons';
import Toolbar from "../../ToolBar/toolbar";
import ContactPres from "../../../mobx/presenters/ContactPres";

@observer
class Layout extends Component {


  state = {
    visibility: false
  }

  onClickToll = () => {

    if (!this.state.visibility) {
      this.setState({visibility: true})
      document.getElementById("lotus").style.opacity = "0.5"
      document.getElementById("black-bg").style.display = "block"
    } else {
      this.setState({visibility: false})
      document.getElementById("lotus").style.opacity = "1"
      document.getElementById("black-bg").style.display = "none"
    }

  }

  onClickTheme = () => {

    if (this.state.visibility) {
      this.setState({visibility: false})
      document.getElementById("lotus").style.opacity = "1"
      document.getElementById("black-bg").style.display = "none"
    }

  }

  render() {


    return (
      <>
        <div id="lotus" >
          <Header/>
          {this.props.children}
          <Footer/>
          <BackTop visibilityHeight={500}>
            <Button type="primary" className={"goTop"}>برو بالا</Button>
          </BackTop>
        </div>
        <div id="black-bg" onClick={this.onClickTheme}/>
          <Toolbar onClickToll={this.onClickToll} visibility={this.state.visibility}/>

      </>
    );
  }
}

export default Layout;