import { useEffect } from "react";
import { observer } from "mobx-react";
import { Input, Select, Form, Button } from "antd";
import StateView from "libs/components/UI/StateView/StateView";
import Router from "next/router";
import CurrencyFormat from "react-currency-format";
import style from "../../../../styles/newtable.css";

const { Option } = Select;

const NewTranslateTable = observer(({ controller }) => {
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  useEffect(() => {
    controller.sendPriceCalculatort({
      service_id: 1,
      field_id: 2,
      from_to: "3-6",
      number_count: "9000",
    });
  }, []);

  const handleRoute = () => {
    Router.push("./select");
  };

  // FORM FUNCTIONS
  const onFinish = (values) => {
    console.log(values);
    controller.sendPriceCalculatort(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const values = controller.priceForWord;

  const onValuesChange = (value, val2) => {
    onFinish({
      field_id: val2.field_id || controller.fields[0].id,
      from_to: val2.from_to || controller.languages[0].from_to,
      number_count: val2.number_count || "9000",
      service_id: val2.service_id || controller.services[0].id,
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
        <Form.Item name="service_id">
          {/* <div className={style.item_label}>خدمات</div> */}
          <Select
            placeholder={controller.services[0].title}
            defaultValue={controller.services[0].id}
            onChange={handleChange}
          >
            {controller.services.map((item, indx) => {
              return (
                <Option key={indx} value={item.id}>
                  {item.title}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="from_to">
          {/* <div className={style.item_label}>زبان</div> */}
          <Select
            placeholder={controller.languages[0].title}
            defaultValue={controller.languages[0].from_to}
            onChange={handleChange}
          >
            {controller.languages.map((item, indx) => {
              return (
                <Option key={indx} value={item.from_to}>
                  {item.title}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="field_id">
          {/* <div className={style.item_label}>زمینه</div> */}

          <Select
            defaultValue="زمینه"
            onChange={handleChange}
            placeholder={controller.fields[0].title}
            defaultValue={controller.fields[0].id}
          >
            {controller.fields.map((item, indx) => {
              return (
                <Option key={indx} value={item.id}>
                  {item.title}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="number_count" rules={[{ required: true }]}>
          {/* <div className={style.item_label}>تعداد</div> */}
          <Input defaultValue={"9000"} />
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
          <div className={style.t_title}>هزینه هر کلمه</div>
          <StateView state={controller.priceStateView}>
            <div className={style.t_items}>
              {controller.priceForWord.length > 0 ? (
                controller.priceForWord.map((item, indx) => {
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
                      <div className={style.item_box}>
                        <span>فریلنسری</span>
                        <div className={style.t_dyn_item}>
                          {item.data.system.price_from != 0 ? (
                            <>
                              <span>
                                <CurrencyFormat
                                  value={item.data.freelancer.price_from}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  renderText={(value) => <div>{value}</div>}
                                />
                              </span>
                              <span>_</span>
                              <span>
                                <CurrencyFormat
                                  value={item.data.freelancer.price_to || "_"}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  renderText={(value) => <div>{value}</div>}
                                />
                              </span>
                              <span>تومان</span>
                            </>
                          ) : (
                            <span>بازه قیمت تعریف نشده</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={style.item_null}>محتوایی وجود ندارد</div>
              )}
            </div>
          </StateView>
        </div>
        <div className={style.t_row}>
          <div className={style.t_title}>سطح مترجم</div>
          <div className={style.t_items}>
            <div className={style.t_item}>
              حداقل 5 سفارش ارزیابی شده با لوتوس نویسه
            </div>
            <div className={style.t_item}>
              با حداقل 10 سفارش ارزیابی شده با لوتوس نویسه
            </div>
            <div className={style.t_item}>
              با حداقل 20 سفارش ارزیابی شده با لوتوس نویسه
            </div>
          </div>
        </div>
        <div className={style.t_row}>
          <div className={style.t_title}>گارانتی کیفیت</div>
          <div className={style.t_items}>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
        </div>
        <div className={style.t_row}>
          <div className={style.t_title}>امکان انتخاب از میان مترجمین</div>
          <div className={style.t_items}>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
        </div>
        <div className={style.t_row}>
          <div className={style.t_title}>گارانتی زمان تحویل</div>
          <div className={style.t_items}>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
        </div>
        <div className={style.t_row}>
          <div className={style.t_title}>ارتباط مستقیم مشتری با مترجم</div>
          <div className={style.t_items}>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
        </div>
        <div className={style.t_row}>
          <div className={style.t_title}>دریافت مرحله‌ای پروژه</div>
          <div className={style.t_items}>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
        </div>
        <div className={style.t_row}>
          <div className={style.t_title}>پرداخت مرحله‌ای پروژه</div>
          <div className={style.t_items}>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
        </div>
        <div className={style.t_row}>
          <div className={style.t_title}>انتخاب سطح محرمانگی بالا</div>
          <div className={style.t_items}>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
        </div>
        <div className={style.t_row}>
          <div className={style.t_title}>تخفیف حجمی</div>
          <div className={style.t_items}>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
        </div>
        <div className={style.t_row}>
          <div className={style.t_title}>
            جایگزینی مترجم در صورت عدم رضایت مشتری
          </div>
          <div className={style.t_items}>
            <div className={style.t_item}>
              <img src="./close.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
        </div>
        <div className={style.t_row}>
          <div className={style.t_title}>پشتیبانی شبانه روزی</div>
          <div className={style.t_items}>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.t_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
        </div>
        <div className={style.t_row}>
          <div className={style.t_title}>کاربرد</div>
          <div className={style.t_items}>
            <div className={style.t_item}>
              متون عمومی و سایت‌های غیرتخصصی و وبلاگ‌ها و متون غیرتخصصی
            </div>
            <div className={style.t_item}>
              ولید محتوای سایت‌های تخصصی، پروژه‌های دانشگاهی، تمرین‌های
              دانشگاهی، متون تخصصی، ترجمه کتاب عمومی
            </div>
            <div className={style.t_item}>
              قالات علمی و تخصصی، چاپ در ژورنال، پایان نامه، ترجمه‌های شرکتی و
              سازمانی، کنفرانس‌ها و ترجمه‌ کتاب‌های تخصصی
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
            <div className={style.t_item}>
              <Button
                onClick={handleRoute}
                loading={controller.loading}
                type="primary"
              >
                ثبت سفارش
              </Button>
            </div>
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
      {/* 
    
 
          <div className={style.side_item}>کاربرد</div> */}

      {/* 
         
         
        
      
         
          <div className={style.content_row}>
            <div className={style.content_item}>
              <Button
                onClick={handleRoute}
                loading={controller.loading}
                type="primary"
              >
                ثبت سفارش
              </Button>
            </div>
            <div className={style.content_item}>
              <Button loading={controller.loading} type="primary">
                ثبت سفارش
              </Button>
            </div>
            <div className={style.content_item}>
              <Button loading={controller.loading} type="primary">
                ثبت سفارش
              </Button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
});

export default NewTranslateTable;
