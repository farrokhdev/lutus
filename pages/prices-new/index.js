import React, { useState, useEffect } from 'react'
import Layout from '../../libs/components/UI/Layout'
import { Table, Radio, Affix } from 'antd'
import { observer } from 'mobx-react'
import StateView from 'libs/components/UI/StateView/StateView'
import OrderBox from '../../libs/components/Home/OrderBox'
import Head from 'next/head'
import LanguagePres from '../../libs/mobx/presenters/LanguagePres'
import PriceTable from 'libs/components/Tables/PriceTable/PriceTable'

const controller = new LanguagePres()

const Index = observer(() => {
  const [value, setValue] = useState()

  useEffect(() => {
    controller.getPricesLanguageList()
  }, [])

  const _testTable = () => {
    return (
      <div className="d-flex flex-column justify-content-center h-100">
        <div className="">
          <h4>تعرفه ترجمه و متون</h4>
        </div>
        <div className="my-5">
          <h6>قیمت ترجمه در پروژه های مناقصه ای</h6>
          <span>
            چنانچه پروژه خود را به صورت مناقصه ای تعریف کرده باشید، تمام مترجمین
            واجد شرایط می توانند وارد منقاصه شده و هر کدام قیمت ترجمه را به صورت
            جداگانه اعلام می کنند. این نکته را مد نظر داشته باشید که قیمت
            پیشنهادی هر مترجم بین بازه ای خواهد بود که در زیر مشخص شده است. شما
            می توانید با توجه به رزومه مترجم، هزینه ترجمه اعلام شده و امتیاز وی
            در ترنسیس، یکی از مترجمان که از نظرتان بهترین و مناسب ترین مترجم است
            را انتخاب کنید. در این بین هزینه ترجمه که توسط مترجم اعلام می شود
            نقشی اساسی ایفا می کند.
          </span>
        </div>
        <div className="my-5">
          <h6>قیمت ترجمه در پروژه های غیر مناقصه ای</h6>
          <span>
            اگر شما پروژه خود را به صورت غیرمناقصه ای تعریف کنید تنها مترجم ویژه
            ترنسیس (که در واقع گلچینی از بهترین مترجم های ترنسیس هستند) امکان
            قیمت گذاری و اعلام هزینه ترجمه بر روی پروژه را خواهد داشت و قیمتی که
            مترجم ویژه ترنسیس اعلام خواهد کرد سقف بازه مشخص شده در باکس زیر
            خواهد بود. پروژه های غیر مناقصه ای گارانتی بالاتری نسبت به پروژه های
            مناقصه ای دارند چرا که مسئولیت کامل ترجمه برعهده ترنسیس خواهد بود.
          </span>
        </div>
        <StateView state={controller.stateView}>
          <PriceTable controller={controller} />
        </StateView>
      </div>
    )
  }

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
                          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                          چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                          بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و
                          برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع
                          با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
                          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه
                          و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری
                          را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و
                          فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می
                          توان امید داشت که تمام و دشواری موجود در ارائه
                          راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
                          نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                          پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار
                          گیرد.
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

              <Affix offsetTop={0}></Affix>

              <div className="user-panel radius mb-4">{_testTable()}</div>

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
})

export default Index
