import React, { useState, useEffect } from 'react'
import Layout from '../../libs/components/UI/Layout'
import { Table, Radio, Affix } from 'antd'
import { observer } from 'mobx-react'
import StateView from 'libs/components/UI/StateView/StateView'
import OrderBox from '../../libs/components/Home/OrderBox'
import Head from 'next/head'
import LanguagePres from '../../libs/mobx/presenters/LanguagePres'
import Translator from 'libs/components/Prices/Translator'
import OralTranslate from 'libs/components/Prices/OralTranslator'
import VideoTranslate from 'libs/components/Prices/VideoTranslate'

const controller = new LanguagePres()

const Index = observer(() => {
  const [value, setValue] = useState()

  useEffect(() => {
    controller.getPricesLanguageList()
  }, [])

  const _translateTable = () => {
    return <Translator controller={controller} />
  }
  const _oralTranslateTable = () => {
    return <OralTranslate controller={controller} />
  }
  const _videoTranslateTable = () => {
    return <VideoTranslate controller={controller} />
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
              <div className="user-panel radius mb-4">{_translateTable()}</div>
              <div className="user-panel radius mb-4">
                {_oralTranslateTable()}
              </div>
              <div className="user-panel radius mb-4">
                {_videoTranslateTable()}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
})

export default Index
