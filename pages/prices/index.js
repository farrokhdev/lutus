import React, { Component } from 'react'
import Layout from '../../libs/components/UI/Layout'
import { Table, Radio, Affix } from 'antd'
import { observer } from 'mobx-react'
import StateView from '../../libs/components/UI/StateView/StateView'
import OrderBox from '../../libs/components/Home/OrderBox'
import Head from 'next/head'
import MyTable from '../../libs/components/Tables/PriceTable/PriceTable'
import Translate from '../../libs/components/Prices/Translate'
import Video from '../../libs/components/Prices/Video'
import Attendance from '../../libs/components/Prices/Attendance'

@observer
class Index extends Component {
  state = {
    value: '',
  }

  _testTable = () => {
    return <MyTable />

    return <Translate />
  }
  _renderText = () => {
    return <Translate />
  }

  _renderVideo = () => {
    return <Video />
  }

  _renderAttendance = () => {
    return <Attendance />
  }

  handleSizeChange = (e) => {
    const value = e.target.value
    this.setState({ value })
    document.getElementById(value).scrollIntoView()
  }

  render() {
    return (
      <>
        <Head>
          <title>تعرفه ها</title>
        </Head>
        <Layout>
          <section>
            <div className=" my-3 mb-4">
              <div className="container ">
                <div className="user-panel radius introduction ">
                  <div className="row ">
                    <div className="col-6">
                      <div className="d-flex flex-column justify-content-center h-100">
                        <div className="">
                          <h1 className={'h4'}>تعرفه ها و لیست قیمت ها</h1>
                        </div>
                        <div className="my-4">
                          <span>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها
                            و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
                            لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
                            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
                            باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                            آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا
                            با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای
                            علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی
                            ایجاد کرد، در این صورت می توان امید داشت که تمام و
                            دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به
                            پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای
                            اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                            اساسا مورد استفاده قرار گیرد.
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <img
                        src={'/static/images/prices.png'}
                        className={'img-fluid'}
                      />
                    </div>
                  </div>
                </div>

                <Affix offsetTop={0}>
                  <div className="fixMenu ">
                    <Radio.Group
                      size={'large'}
                      value={this.state.value}
                      onChange={this.handleSizeChange}
                    >
                      <Radio.Button className={'mx-3 radius'} value="text">
                        لیست تستی
                      </Radio.Button>
                      <Radio.Button className={'mx-3 radius'} value="text">
                        تعرفه ترجمه متون
                      </Radio.Button>
                      <Radio.Button className={'mx-3 radius'} value="video">
                        تعرفه ترجمه صوت و تصویر
                      </Radio.Button>
                      <Radio.Button
                        className={'mx-3 radius'}
                        value="attendance"
                      >
                        تعرفه ترجمه حضوری
                      </Radio.Button>
                      <Radio.Button className={'mx-3 radius'} value="calculate">
                        محاسبه تعرفه ها
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                </Affix>

                <div className="user-panel radius mb-4">
                  {this._testTable()}
                  {this._renderText()}

                  {this._renderVideo()}

                  {this._renderAttendance()}
                </div>

                <div id="calculate" className={'py-3'} />
                <div className="p-3 ">
                  <OrderBox />
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </>
    )
  }
}

export default Index
