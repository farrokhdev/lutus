import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { Table } from 'antd'

@observer
class Translate extends Component {
  render() {
    const columns = [
      {
        title: 'عنوان',
        dataIndex: 'title',
        align: 'center',
      },
      {
        title: 'تخفیف',
        dataIndex: 'off',
        align: 'center',
      },
    ]

    const dataSource = [
      { key: '1', title: '1 تا 10 صفحه', off: '0 %' },
      { key: '2', title: '11 تا 25 صفحه', off: '4 %' },
      { key: '3', title: '26 تا 50 صفحه', off: '8 %' },
      { key: '4', title: '51 تا 100 صفحه', off: '12 %' },
      { key: '5', title: '101 تا 200 صفحه', off: '16 %' },
      { key: '6', title: '201 تا 500 صفحه', off: '20 %' },
      { key: '7', title: '501 تا 2000 صفحه و بالاتر', off: '24 %' },
    ]
    return (
      <>
        <div>
          <div id="text" className={'py-5'} />
          <div className={'user-workSpace  '}>
            <div className="d-flex flex-column justify-content-center h-100">
              <div className="">
                <h4>تعرفه ترجمه و متون</h4>
              </div>
              <div className="my-5">
                <h6>قیمت ترجمه در پروژه های مناقصه ای</h6>
                <span>
                  چنانچه پروژه خود را به صورت مناقصه ای تعریف کرده باشید، تمام
                  مترجمین واجد شرایط می توانند وارد منقاصه شده و هر کدام قیمت
                  ترجمه را به صورت جداگانه اعلام می کنند. این نکته را مد نظر
                  داشته باشید که قیمت پیشنهادی هر مترجم بین بازه ای خواهد بود که
                  در زیر مشخص شده است. شما می توانید با توجه به رزومه مترجم،
                  هزینه ترجمه اعلام شده و امتیاز وی در ترنسیس، یکی از مترجمان که
                  از نظرتان بهترین و مناسب ترین مترجم است را انتخاب کنید. در این
                  بین هزینه ترجمه که توسط مترجم اعلام می شود نقشی اساسی ایفا می
                  کند.
                </span>
              </div>
              <div className="my-5">
                <h6>قیمت ترجمه در پروژه های غیر مناقصه ای</h6>
                <span>
                  اگر شما پروژه خود را به صورت غیرمناقصه ای تعریف کنید تنها
                  مترجم ویژه ترنسیس (که در واقع گلچینی از بهترین مترجم های
                  ترنسیس هستند) امکان قیمت گذاری و اعلام هزینه ترجمه بر روی
                  پروژه را خواهد داشت و قیمتی که مترجم ویژه ترنسیس اعلام خواهد
                  کرد سقف بازه مشخص شده در باکس زیر خواهد بود. پروژه های غیر
                  مناقصه ای گارانتی بالاتری نسبت به پروژه های مناقصه ای دارند
                  چرا که مسئولیت کامل ترجمه برعهده ترنسیس خواهد بود.
                </span>
              </div>
            </div>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
          </div>
        </div>
      </>
    )
  }
}

export default Translate
