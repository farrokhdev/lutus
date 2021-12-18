import App, { Container } from 'next/app'
import React, { Component } from 'react'
import Router from 'next/router'
import { ConfigProvider } from 'antd'
import { I18nextProvider } from 'react-i18next'
import i18next from '../i18next'
import fa_IR from 'antd/lib/locale-provider/fa_IR'
import Head from 'next/head'
import { Provider } from 'mobx-react'
import NProgress from '../libs/components/UI/ngprogress/nprogress'
import 'moment/locale/fa'
import moment from 'moment'

moment.locale('fa')

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import 'antd/dist/antd.css'
import '../public/static/css/bootstrap.min.css'
import '../public/static/css/nprogress.css'
import '../public/static/css/style.css'
import '../public/static/css/globals.css'
import initializeStore from '../libs/mobx/presenters/CoreStore'

// my styles
import '../styles/myTable.css'

Router.events.on('routeChangeStart', (url) => {
  // console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
  static async getInitialProps(appContext) {
    const { Component, router, ctx, req, props } = appContext
    let pageProps = {}
    const query = ctx.query
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    const mobxStore = initializeStore()
    appContext.ctx.mobxStore = mobxStore
    const appProps = await App.getInitialProps(appContext)
    return { ...appProps, pageProps, query, mobxStore: mobxStore } // ,
  }

  constructor(props) {
    super(props)
    const isServer = typeof window === 'undefined'
    this.mobxStore = isServer
      ? props.mobxStore
      : initializeStore(isServer, props.mobxStore)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Provider store={this.mobxStore} CoreStore={this.mobxStore}>
          <Head>
            <meta
              name="viewport"
              content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height"
            />
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <title>lotus</title>
          </Head>
          <ConfigProvider locale={fa_IR} direction={'rtl'}>
            <I18nextProvider i18n={i18next}>
              <Component {...pageProps} />
            </I18nextProvider>
          </ConfigProvider>
        </Provider>
      </>
    )
  }
}

export default MyApp
