import { Table } from 'antd'
import React, { Component } from 'react'

class Attendance extends Component {
  render() {
    const dataSource = [
      { key: '1', title: 'انگلیسی', off: ' 272/000 تومان' },
      { key: '2', title: 'فرانسوی', off: ' 350/000 تومان' },
      { key: '3', title: 'آلمانی', off: ' 350/000 تومان' },
      { key: '4', title: 'ایتالیایی', off: ' 402/000 تومان' },
      { key: '5', title: 'روسی', off: ' 350/000 تومان' },
      { key: '6', title: 'چینی', off: ' 408/000 تومان' },
    ]

    const columns = [
      {
        title: 'زبان ترجمه',
        dataIndex: 'title',
        align: 'center',
      },
      {
        title: 'قیمت بر اساس ساعت',
        dataIndex: 'off',
        align: 'center',
      },
    ]

    return (
      <div>
        <div id="attendance" className={'py-5'} />
        <div className={'user-workSpace '}>
          <div className="d-flex flex-column justify-content-center h-100">
            <div className="">
              <h4>تعرفه ترجمه حضوری</h4>
            </div>
            <div className="my-5">
              <span>
                در ترنسیس قیمت ترجمه فیلم، فایل صوتی و کلیپ های ویدئویی بر مبنای
                دقیقه محاسبه می شود. ترجمه ها نیز در چند قالب می توانند تحویل
                شوند: ترجمه به صورت فایل زیرنویس با فرمت srt، ترجمه در فایل ورد
                و یا فایل ویدئویی که زیرنویس به آن چسبیده باشد، امکان الصاق
                لوگوی کارفرما به ویدئو نیز وجود دارد. از طریق باکس زیر نیز می
                توانید قیمت ترجمه فیلم خود را تخمین بزنید
              </span>
            </div>
          </div>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
      </div>
    )
  }
}

export default Attendance
