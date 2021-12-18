import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Button, Tooltip} from "antd";
import {withTranslation} from "react-i18next";

@observer
class FinanceBox extends Component {
  render() {
    const {t} = this.props
    return (
      <>
        <div className="row border shadow justify-content-between align-items-center px-2 m-2 radius bg-white ">
          <Tooltip
            title={"                                                                                کیفیت عالی مناسب برای ترجمه های سازمانی و شرکتی، تولید محتوای ویژه برای سایت ها، چاپ در ژورنال ها یا ارائه به کنفرانس ها، ترجمه کتاب، متون کاملا تخصصی"}>
            <span className={"titr-title"}>طلایی</span>
          </Tooltip>
          <div className="row align-items-end">
            <span className={"pink-title px-2"}>20%</span>
            <div className="d-flex flex-column">
              <span className={"sub-title-gray off"}>22/000</span>
              <span className={"sub-title"}>20/000</span>
            </div>
          </div>
          <Button className={"doing-orderBtn"}>{t("btn.deal")}</Button>
        </div>
      </>
    );
  }
}

export default withTranslation("common")(FinanceBox);