import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Input, Select, Form, Button, Slider } from 'antd'
import StateView from 'libs/components/UI/StateView/StateView'
import Router from 'next/router'
import CurrencyFormat from 'react-currency-format'

import style from '../../../../styles/table.css'
import { ShrinkOutlined } from '@ant-design/icons'

const { Option } = Select

const VideoTranslateTable = observer(({ controller }) => {
  function handleChange(value) {
    console.log(`selected ${value}`)
  }

  useEffect(() => {
    controller.sendPriceVideo({
      service_id: 4,
      field_id: 2,
      from_to: '3-6',
      minutes_count: '10',
      subtitle: 'implementation_translation',
    })
  }, [])

  const handleRoute = () => {
    Router.push('./select')
  }

  // FORM FUNCTIONS
  const onFinish = (values) => {
    console.log(values)
    controller.sendPriceVideo(values)
  }

  const onValuesChange = (value, val2) => {
    onFinish({
      service_id: 4,
      field_id: val2.field_id || controller.fields[0].id,
      from_to: val2.from_to || controller.languages[0].from_to,
      minutes_count: val2.minutes_count || '10',
      subtitle: val2.subtitle || 'implementation_translation',
    })
  }

  return (
    <div className={style.table_sec}>
      <div className={style.table_sidebar}>
        <div className={style.sidebar_header}>فیلتر ها</div>
        <div className={style.sidebar_column}>
          <div className={style.side_item}>طرح</div>
          <div className={style.side_dynamic_item}>هزینه هر دقیقه</div>
          <div className={style.side_item}>سطح مترجم</div>
          <div className={style.side_item}>گارانتی کیفیت</div>
          <div className={style.side_item}>امکان انتخاب از میان مترجمین</div>
          <div className={style.side_item}>گارانتی زمان تحویل</div>
          <div className={style.side_item}>ارتباط مستقیم مشتری با مترجم</div>
          <div className={style.side_item}>دریافت مرحله‌ای پروژه</div>
          <div className={style.side_item}>پرداخت مرحله‌ای پروژه</div>
          <div className={style.side_item}>انتخاب سطح محرمانگی بالا</div>
          <div className={style.side_item}>
            جایگزینی مترجم در صورت عدم رضایت کارفرما
          </div>
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
              name="subtitle"
              //  label="زبان"
            >
              <Select
                placeholder={controller.subtitle[0].title}
                defaultValue={controller.subtitle[0].id}
                // style={{ width: 120 }}
                onChange={handleChange}
              >
                {controller.subtitle.map((item, indx) => {
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
              name="field_id"
              //  label="زمینه"
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
              name="minutes_count"
              // label="تعداد"
              rules={[{ required: true }]}
            >
              <Input defaultValue={'10'} max={60} />
            </Form.Item>
          </Form>
        </div>
        <div className={style.content_column}>
          <div className={style.content_row}>
            <div className={style.content_item}>تخصصی ویژه</div>
          </div>
          <StateView state={controller.priceStateView}>
            <div className={style.content_dynamic_row}>
              {controller.priceForVideo.map((item) => {
                return (
                  <>
                    <div className={style.content_dynamic_item}>
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
                      <div className={style.item}>
                        <span>فریلنسری</span>
                        <div className={style.price_range}>
                          <span>
                            <CurrencyFormat
                              value={item.data.freelancer.price_from || '_'}
                              displayType={'text'}
                              thousandSeparator={true}
                              renderText={(value) => <div>{value}</div>}
                            />
                          </span>
                          <span>_</span>
                          <span>
                            <CurrencyFormat
                              value={item.data.freelancer.price_to || '_'}
                              displayType={'text'}
                              thousandSeparator={true}
                              renderText={(value) => <div>{value}</div>}
                            />
                          </span>
                          <span>تومان</span>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
          </StateView>
          <div className={style.content_row}>
            <div className={style.content_item}>
              با حداقل 15 سفارش ارزیابی شده با لوتوس نویسه
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
            </div>
          </div>
          <div className={style.content_row}>
            <div className={style.content_item}>
              <img src="./check.png" alt="" />
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

export default VideoTranslateTable
