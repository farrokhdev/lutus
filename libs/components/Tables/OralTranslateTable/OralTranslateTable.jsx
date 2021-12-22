import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Input, Select, Form, Button, Slider } from 'antd'
import StateView from 'libs/components/UI/StateView/StateView'
import Router from 'next/router'
import CurrencyFormat from 'react-currency-format'

import style from '../../../../styles/table.css'
import { ShrinkOutlined } from '@ant-design/icons'

const { Option } = Select

const OralTranslateTable = observer(({ controller }) => {
  function handleChange(value) {
    console.log(`selected ${value}`)
  }

  useEffect(() => {
    controller.sendPriceOral({
      service_id: 3,
      from_to: '3-6',
      hours_count: '1',
      type: 'oral',
    })
  }, [])

  const handleRoute = () => {
    Router.push('./select')
  }

  // FORM FUNCTIONS
  const onFinish = (values) => {
    console.log(values)
    controller.sendPriceOral(values)
  }

  const onValuesChange = (value, val2) => {
    onFinish({
      from_to: val2.from_to || controller.languages[0].from_to,
      hours_count: val2.hours_count || '1',
      service_id: 3,
      type: val2.type || 'oral',
    })
  }

  const onChange = (values) => {
    onFinish()
  }

  return (
    <div className={style.table_sec}>
      <div className={style.table_sidebar}>
        <div className={style.sidebar_header}>فیلتر ها</div>
        <div className={style.sidebar_column}>
          <div className={style.side_item}>طرح</div>
          <div className={style.side_item}>هزینه هر ساعت</div>
          <div className={style.side_item}>سطح مترجم</div>
          <div className={style.side_item}>امکان انتخاب از میان مترجمین</div>
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
                placeholder={'ترجمه شفاهی'}
                defaultValue={'oral'}
                onChange={handleChange}
              >
                <Option value={'oral'}>ترجمه شفاهی</Option>

                <Option value={'live'}>ترجمه حضوری</Option>
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
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="hours_count"
              // label="تعداد"
              rules={[{ required: true }]}
            >
              <Input defaultValue={'1'} max={24} />
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
            <div className={style.content_dynamic2_row}>
              {controller.priceForOral.map((item) => {
                return (
                  <div className={style.content_dynamic2_item}>
                    <div className={style.item}>
                      <span>سیستمی</span>
                      <div className={style.price_range}>
                        <span>
                          <CurrencyFormat
                            value={item.data.system.price_from || '_'}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={' ' + 'تومان'}
                            renderText={(value) => <div>{value}</div>}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </StateView>
          <div className={style.content_row}>
            <div className={style.content_item}>
              ارزیابی شده جهت ترجمه شفاهی و همزمان
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>

          <div className={style.content_row}>
            <div className={style.content_item}>
              کاربرد کنفرانس‌ها، جلسات، همایش‌ها، نمایشگاه ها، تورها، و مواردی
              که نیاز به فرد مسلط به ترجمه شفاهی و همزمان وجود داشته باشد
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <Button
                onClick={handleRoute}
                loading={controller.loading}
                type="primary"
                block
              >
                ثبت سفارش
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default OralTranslateTable
