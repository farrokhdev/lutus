import React, {Component} from 'react';
import Link from 'next/link';
import {Divider, InputNumber, Table, Tabs, Button, Form} from "antd";
import {observer, inject} from "mobx-react";

@observer
class Forbidden extends Component {
  render() {
    return (
      <div>
        <div className={"d-flex flex-column my-4"}>
          <p className={"mb-3 text-muted mx-auto"}>دسترسی شما به این بخش امکان پذیر نمی باشد!</p>
          <Link href={"/panel/translator"}><a>
            <Button className={"login-btn p-3 mx-auto "}>تکمیل روند مترجمی</Button>
          </a></Link></div>
      </div>
    );
  }
}

export default Forbidden;