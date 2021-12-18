import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Empty} from "antd";

@observer
class ArticleTranslatorView extends Component {

  render() {
    const {articles} = this.props
    return (
      <>
        <div className="calculating-box my-5 p-3">
          <div className="p-3">
            <h5>کتاب های و مقالات چاپ شده</h5>
          </div>
          {articles ? articles.map((item, index) => {
            return <div className={"d-flex align-items-center m-3"}>
              <div className="mx-2">
                <img src={"/static/images/articles.svg"} width={60}/>
              </div>
              <div className="d-flex flex-column">
                <span className="titr-title">{item.title}</span>
                <span className="subtitle">{item.publisher_name}</span>
                <span className="subtitle">{item.year_publication}</span>
              </div>
            </div>
          }) : <Empty/>}

        </div>
      </>
    );
  }
}

export default ArticleTranslatorView;