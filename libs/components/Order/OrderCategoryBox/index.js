import React, {Component} from 'react';
import {Observer} from "mobx-react";
import {Typography} from "antd";

const {Paragraph, Text} = Typography;

@Observer
class OrderCategoryBox extends Component {
  render() {
    const {handleSelectCategory, item} = this.props
    return (
      <>
        <div className="category-box  p-3 m-1" onClick={() => handleSelectCategory(item)}>
          <img className="mx-auto " src={item.image} width="44"/>
          <span className="mt-4 titr-title  ">{item.title}</span>
          {/*<Paragraph className="sub-title pt-2" ellipsis={{rows: 4, expandable: false}}>{item.description}</Paragraph>*/}
          </div>
      </>
    );
  }
}

export default OrderCategoryBox;




