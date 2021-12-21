import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Input, Select, Form, Button, Slider } from 'antd'
import StateView from 'libs/components/UI/StateView/StateView'

import style from '../../../../styles/table.css'
import { ShrinkOutlined } from '@ant-design/icons'

const { Option } = Select

const PriceTable = observer(({ controller }) => {
  function handleChange(value) {
    console.log(`selected ${value}`)
  }

  useEffect(() => {
    controller.getPriceCalculatort({
      service_id: 1,
      field_id: 2,
      from_to: '3-6',
      number_count: '9000',
    })
  }, [])
  const [formVals, setFormVals] = useState([])
  // FORM FUNCTIONS
  const onFinish = (values) => {
    console.log(values)
    controller.getPriceCalculatort(values)
  }

  const onReset = () => {
    form.resetFields()
  }

  const onValuesChange = (value) => {
    setFormVals([...formVals, value])
    onFinish(formVals)
    // form.setFieldsValue({
    //   note: 'Hello world!',
    //   gender: 'male',
    // });
  }

  const onChange = (values) => {
    onFinish()
  }

  console.log(formVals)

  return (
    <div className={style.table_sec}>
      <div className={style.table_sidebar}>
        <div className={style.sidebar_header}>فیلتر ها</div>
        <div className={style.sidebar_column}>
          <div className={style.side_item}>طرح</div>
          <div className={style.side_dynamic_item}>هزینه هر کلمه</div>
          <div className={style.side_item}>سطح مترجم</div>
          <div className={style.side_item}>گارانتی کیفیت</div>
          <div className={style.side_item}>امکان انتخاب از میان مترجمین</div>
          <div className={style.side_item}>گارانتی زمان تحویل</div>
          <div className={style.side_item}>ارتباط مستقیم مشتری با مترجم</div>
          <div className={style.side_item}>دریافت مرحله‌ای پروژه</div>
          <div className={style.side_item}>پرداخت مرحله‌ای پروژه</div>
          <div className={style.side_item}>انتخاب سطح محرمانگی بالا</div>
          <div className={style.side_item}>تخفیف حجمی</div>
          <div className={style.side_item}>
            جایگزینی مترجم در صورت عدم رضایت مشتری
          </div>
          <div className={style.side_item}>پشتیبانی شبانه روزی</div>
          <div className={style.side_item}>کاربرد</div>
        </div>
      </div>
      <div className={style.table_content}>
        <div className={style.content_header}>
          <Form
            onFinish={onFinish}
            onValuesChange={onValuesChange}
            // onChange={onChange}
          >
            <Form.Item
              name="service_id"
              //  label="خدمات"
            >
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
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="from_to"
              //  label="زبان"
            >
              <Select
                placeholder={controller.languages[0].title}
                defaultValue={controller.languages[0].from_to}
                // style={{ width: 120 }}
                onChange={handleChange}
              >
                {controller.languages.map((item, indx) => {
                  return (
                    <Option key={indx} value={item.from_to}>
                      {item.title}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="field_id"
              // label="زمینه"
            >
              <Select
                defaultValue="زمینه"
                // style={{ width: 120 }}
                onChange={handleChange}
                placeholder={controller.fields[0].title}
                defaultValue={controller.fields[0].id}
              >
                {controller.fields.map((item, indx) => {
                  return (
                    <Option key={indx} value={item.id}>
                      {item.title}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="number_count"
              // label="تعداد"
              rules={[{ required: true }]}
            >
              <Input defaultValue={'9000'} />
            </Form.Item>
            <Form.Item>
              <Button
                className={style.filter_btn}
                loading={controller.loading}
                type="primary"
                htmlType="submit"
                block
                icon={<ShrinkOutlined />}
              >
                اعمال فیلتر
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={style.content_column}>
          <div className={style.content_row}>
            <div className={style.content_item}>عمومی</div>
            <div className={style.content_item}>تخصصی</div>
            <div className={style.content_item}>تخصصی ویژه</div>
          </div>
          <StateView state={controller.priceStateView}>
            <div className={style.content_dynamic_row}>
              {controller.priceForWord.length > 0 ? (
                controller.priceForWord.map((item, indx) => {
                  return (
                    <div key={indx} className={style.content_dynamic_item}>
                      <div className={style.item}>
                        <span>سیستمی</span>
                        <div className={style.price_range}>
                          <span>
                            {item.data.system.price_from
                              ? item.data.system.price_from
                              : '_'}
                          </span>
                          <span>تا</span>
                          <span>
                            {item.data.system.price_to
                              ? item.data.system.price_to
                              : '_'}
                          </span>
                        </div>
                      </div>
                      <div className={style.item}>
                        <span>فریلنسری</span>
                        <div className={style.price_range}>
                          <span>
                            {item.data.freelancer.price_from
                              ? item.data.freelancer.price_from
                              : '_'}
                          </span>
                          <span>تا</span>
                          <span>
                            {item.data.freelancer.price_to
                              ? item.data.freelancer.price_to
                              : '_'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className={style.nodata}>هیچ دیتایی یافت نشد</div>
              )}
            </div>
          </StateView>
          <div className={style.content_row}>
            <div className={style.content_item}>
              حداقل 5 سفارش ارزیابی شده با لوتوس نویسه
            </div>
            <div className={style.content_item}>
              با حداقل 10 سفارش ارزیابی شده با لوتوس نویسه
            </div>
            <div className={style.content_item}>
              با حداقل 20 سفارش ارزیابی شده با لوتوس نویسه
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./remove.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              متون عمومی و سایت‌های غیرتخصصی و وبلاگ‌ها و متون غیرتخصصی
            </div>
            <div className={style.content_item}>
              تولید محتوای سایت‌های تخصصی، پروژه‌های دانشگاهی، تمرین‌های
              دانشگاهی، متون تخصصی، ترجمه کتاب عمومی
            </div>
            <div className={style.content_item}>
              مقالات علمی و تخصصی، چاپ در ژورنال، پایان نامه، ترجمه‌های شرکتی و
              سازمانی، کنفرانس‌ها و ترجمه‌ کتاب‌های تخصصی
            </div>
          </div>
          <div className={style.content_row}>
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
            <div className={style.content_item}>
              <Button loading={controller.loading} type="primary">
                ثبت سفارش
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default PriceTable
