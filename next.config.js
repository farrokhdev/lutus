const withCSS = require('@zeit/next-css')
const isProd = process.env.NODE_ENV === 'production'

module.exports = withCSS({
  // module: {
  //   rules: [
  //     {
  //       test: /\.s[ac]ss$/i,
  //       use: [
  //         // Creates `style` nodes from JS strings
  //         'style-loader',
  //         // Translates CSS into CommonJS
  //         'css-loader',
  //         // Compiles Sass to CSS
  //         'sass-loader',
  //       ],
  //     },
  //   ],
  // },

  async rewrites() {
    return [
      {
        source: '/panel/:tab?',
        destination: '/panel',
      },
      {
        source: '/panel/:tab?/:status?',
        destination: '/panel',
      },
      {
        source: '/panel/:tab?/:status?/:id?',
        destination: '/panel',
      },
      {
        source: '/t/:username?',
        destination: '/t',
      },
      // {
      //   source: '/panel/project/type/:status?',
      //   destination: '/panel/project/Projecttype'
      // },
      // {
      //   source: '/panel/translator-project/translate/:status?',
      //     destination: '/panel/translator-project/translate'
      // },
      {
        source: '/project/view/:id?',
        destination: '/project/view',
      },
      {
        source: '/service/:id?',
        destination: '/service',
      },

      {
        source: '/order/select/:cat?',
        destination: '/order',
      },
      {
        source: '/order/:service?/:id?',
        // source: '/order/:username?',
        destination: '/order',
      },
      // {
      //   source: '/order/:service?',
      //   destination: '/order'
      // },
      {
        source: '/translator-project/view/:id?',
        destination: '/translator-project/view',
      },
      {
        source: '/shop/view/:id?',
        destination: '/shop/view',
      },
      {
        source: '/payment/back/:id?',
        destination: '/payment/back',
      },

      {
        source: '/blog/:slug/:id',
        destination: '/blog/[id]',
      },
      {
        source: '/password/:rest?',
        destination: '/password',
      },
      {
        source: '/profile/:id',
        destination: '/profile',
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  cssModules: true,

  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]',
  },

  webpack: function (config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    })
    config.module.rules.push({
      test: /\.(less)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    })
    return config
  },
})
