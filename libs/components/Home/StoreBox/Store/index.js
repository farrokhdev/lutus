import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Button} from "antd";
import Link from 'next/link';

@observer
class StoreBox extends Component {
  render() {
    return (
      <>
        <div className="product-box p-3  ">
          <img src="/static/images/product.svg" width="100"/>
          <div className="d-flex flex-column px-3 w-100">
            <Link href={`/shop/view/${"id"}`}><a>
              <span className={"titr-title"}>کتاب فرانسه وفنون ترجمه</span>
            </a></Link>
            <div className="d-flex justify-content-between align-items-center py-2">
              <div className="d-flex flex-column">
                <span className="off-text  ">230/000 تومان</span>
                <span>220/000 تومان</span>
              </div>

              <Button href={"/cart"} className={"buy-btn"} icon={<img src="/static/images/buy-btn.svg" width="24"/>}/>

            </div>
          </div>
        </div>
      </>
    );
  }
}

export default StoreBox;