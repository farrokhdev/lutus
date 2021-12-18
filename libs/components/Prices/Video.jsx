import { Table } from 'antd'
import React, { Component } from 'react'

class Video extends Component {
  render() {
    const dataSource = [
      {
        key: '1',
        title: 'انگلیسی به فارسی',
        by: '13/000',
        Without: '11/500',
        Implementation: '11/500',
      },
      {
        key: '1',
        title: 'فرانسه به فارسی',
        by: '31/000',
        Without: '28/000',
        Implementation: '28/000',
      },
      {
        key: '1',
        title: 'عربی به فارسی',
        by: '15/500',
        Without: '13/500',
        Implementation: '13/500',
      },
      {
        key: '1',
        title: 'آلمانی به فارسی',
        by: '41/000 ',
        Without: '38/000',
        Implementation: '36/000',
      },
    ]

    const columns = [
      {
        title: 'زبان ها',
        dataIndex: 'title',
        align: 'center',
      },
      {
        title: 'ترجمه بدون زیر نویس',
        dataIndex: 'Without',
        align: 'center',
      },
      {
        title: 'ترجمه با زیر نویس',
        dataIndex: 'by',
        align: 'center',
      },
      {
        title: 'پیاده سازی',
        dataIndex: 'Implementation',
        align: 'center',
      },
    ]

    return (
      <div>
        <div id="video" className={'py-5'} />
        <div className={'user-workSpace  '}>
          <div className="d-flex flex-column justify-content-center h-100">
            <div className="">
              <h4>تعرفه ترجمه فایلهای ویدئویی و صوتی</h4>
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

export default Video
