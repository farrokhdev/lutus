import React, {Component} from 'react';
import {Observer} from "mobx-react";
import {Typography} from "antd";
import Link from "next/link";

const {Paragraph, Text} = Typography;

@Observer
class Service extends Component {
  render() {
    const {item} = this.props;
    return (
      <>
        <div className="service-box p-3 m-1  shadow-sm">
          <div className="">

            <img className="mx-auto " src={item.image} width="44"/>
            <h3 className="mt-4 titr-title  ">{item.title}</h3>
            <Paragraph className="text-muted pt-2"
                       ellipsis={{rows: 3, expandable: false}}>{item.short_description}</Paragraph>
          </div>
          <div className="">
            <Link href={`/service/${item.id}`}>
              <a className="readMore "><span className="pink-title">بیشتر بخوانید</span></a>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default Service;