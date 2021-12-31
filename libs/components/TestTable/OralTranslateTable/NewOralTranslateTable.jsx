import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Input, Select, Form, Button } from "antd";
import StateView from "libs/components/UI/StateView/StateView";
import Router from "next/router";
import CurrencyFormat from "react-currency-format";

import style from "../../../../styles/newtable.css";

const { Option } = Select;

const NewOralTranslateTable = observer(({ controller }) => {
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  useEffect(() => {
    controller.sendPriceOral({
      service_id: 3,
      from_to: "3-6",
      hours_count: "1",
      type: "oral",
    });
  }, []);

  const handleRoute = () => {
    Router.push("./select");
  };

  // FORM FUNCTIONS
  const onFinish = (values) => {
    console.log(values);
    controller.sendPriceOral(values);
  };

  const onValuesChange = (value, val2) => {
    onFinish({
      from_to: val2.from_to || controller.languages[0].from_to,
      hours_count: val2.hours_count || "1",
      service_id: 3,
      type: val2.type || "oral",
    });
  };

  const onChange = (values) => {
    onFinish();
  };

  return (
    <div className={style.section}>
      <Form
        className={style.filterBox}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          name="service_id"
          //  label="خدمات"
        >
          <Select
            placeholder={"ترجمه شفاهی"}
            defaultValue={"oral"}
            onChange={handleChange}
          >
            <Option value={"oral"}>ترجمه شفاهی</Option>

            <Option value={"live"}>ترجمه حضوری</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="from_to"
          //  label="زبان"
        >
          <Select
            placeholder={controller.other_languages[0].title}
            defaultValue={controller.other_languages[0].from_to}
            // style={{ width: 120 }}
            onChange={handleChange}
          >
            {controller.other_languages.map((item, indx) => {
              return (
                <Option key={indx} value={item.from_to}>
                  {item.title}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="hours_count"
          // label="تعداد"
          rules={[{ required: true }]}
        >
          <Input defaultValue={"1"} max={24} />
        </Form.Item>
      </Form>

      <div className={style.table}>
        <div className={style.t_row}>
          <div className={style.t_title}>طرح</div>
          <div className={style.t_items}>
            <div className={style.t_item}>عمومی</div>
            <div className={style.t_item}>تخصصی</div>
            <div className={style.t_item}>تخصصی ویژه</div>
          </div>
        </div>
        <div className={style.t_row}>
          <div className={style.t_title}>هزینه هر ساعت</div>
          <StateView state={controller.priceStateView}>
            <div className={style.t_items}>
              {controller.priceForOral.length > 0 ? (
                controller.priceForOral.map((item, indx) => {
                  return (
                    <div key={indx} className={style.item_boxs}>
                      <div className={style.item_box}>
                        <span>سیستمی</span>
                        <div className={style.t_dyn_item}>
                          <span>
                            {item.data.system.price_from != 0 ? (
                              <CurrencyFormat
                                value={item.data.system.price_from}
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={" " + "تومان"}
                                renderText={(value) => <div>{value}</div>}
                              />
                            ) : (
                              <span>بازه قیمت تعریف نشده</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <span>بازه قیمت تعریف نشده</span>
              )}
            </div>
          </StateView>
        </div>
        <div className={style.t_row}>
          <div className={style.t_title}>سطح مترجم</div>
          <div className={style.t_items}>
            <div className={style.t_item}>
              ارزیابی شده جهت ترجمه شفاهی و همزمان
            </div>
          </div>
        </div>
        <div className={style.t_row}>
          <div className={style.t_title}>انتخاب از میان مترجمین</div>
          <div className={style.t_items}>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
        </div>

        <div className={style.t_row}>
          <div className={style.t_title}>کاربرد</div>
          <div className={style.t_items}>
            <div className={style.t_item}>
              کاربرد کنفرانس‌ها، جلسات، همایش‌ها، نمایشگاه ها، تورها، و مواردی
              که نیاز به فرد مسلط به ترجمه شفاهی و همزمان وجود داشته باشد
            </div>
          </div>
        </div>
        <div className={style.t_row}>
          <div className={style.t_title}>ثبت سفارش</div>
          <div className={style.t_items}>
            <div className={style.t_item}>
              <Button
                onClick={handleRoute}
                loading={controller.loading}
                type="primary"
              >
                ثبت سفارش
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default NewOralTranslateTable;
