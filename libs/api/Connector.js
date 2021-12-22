import React from 'react'
import { Router } from 'tg-resources'
import { SuperAgentResource as Resource } from '@tg-resources/superagent'
import Cookies from 'js-cookie'

export function routerList() {
  return new Router(
    {
      //Auth//
      registerUser: new Resource('auth/register'),
      validate: new Resource('auth/validate'),
      forgotPassword: new Resource('auth/forgot-password'),
      login: new Resource('auth/login'),
      logOut: new Resource('user/logout'),
      userInfo: new Resource('user/info'),
      resendCodeRegister: new Resource('auth/resend-register-code'),
      resendCodeForgot: new Resource('auth/resend-forgot-code'),
      verifyCodeForgot: new Resource('auth/verify-forgot-code'),
      changePasswordByMobile: new Resource('password/reset-password'),
      changePasswordByEmail: new Resource('password/change-password'),
      //Auth//

      contactByLotus: new Resource('index/contact'),

      //Language//
      LanguageList: new Resource('language/languages'),
      PricesLanguageList: new Resource('prices/languages'),
      PriceCalculator: new Resource('prices/calculator'),
      PriceVideo: new Resource('prices/calculator-video'),
      PriceOral: new Resource('prices/calculator-oral'),
      //Language//

      //Field//
      FieldList: new Resource('field/list'),
      //Field//

      //Service//
      ServiceList: new Resource('service/list'),
      ServiceDetail: new Resource('service/details'),
      ServiceDestinationLanguage: new Resource('service/language'),
      //Service//

      //Order//
      uploadFile: new Resource('upload/file-upload'),
      submitOrder: new Resource('order/create'),
      orderView: new Resource('order/view'),
      downloadOrderFile: new Resource('order/translate/download'),
      selectTranslator: new Resource('order/translate/select-suggestion'),

      //Order//

      //faq//
      faqListHome: new Resource('faq/list'),
      faqListPage: new Resource('faq/list'),
      //faq//

      //Blog//
      categoryBlogList: new Resource('blog/category/list'),
      blogPostsList: new Resource('blog/post/list'),
      blogViewPost: new Resource('blog/post/view'),
      getCommentsList: new Resource('blog/post/comments'),
      addCommentPost: new Resource('blog/post/comment/add'),
      getBlogIndex: new Resource('index/blog'),
      //Blog//

      //words//
      listDictionary: new Resource('dictionary/list'),
      deleteDictionary: new Resource('dictionary/delete'),
      addDictionary: new Resource('dictionary/add'),
      updateDictionary: new Resource('dictionary/update'),
      //words//

      //Panel user//
      getTranslateOrderList: new Resource('order/translate/list'),
      getOrderView: new Resource('order/translate/view'),
      getMissOrderView: new Resource('translator/project/missing'),
      paymentOrder: new Resource('order/payment'),
      orderAccept: new Resource('order/translate/accept'),
      orderPayment: new Resource('order/translate/payment'),
      getFileUser: new Resource('order/translate/download-file'),
      confirmProject: new Resource('order/translate/confirm-translated'),
      confirmStepProject: new Resource('order/translate/confirm'),
      protestProjectUser: new Resource('order/translate/protest'),
      evaluationProjectUser: new Resource('order/translate/rate-translated'),
      //Panel user//

      //Chat//
      userGetChatList: new Resource('order/translate/chats'),
      userSendChat: new Resource('order/translate/chat-add'),
      translateGetChatList: new Resource('translator/project/chats'),
      translateSendChat: new Resource('translator/project/chat-add'),
      //Chat//

      //Profile//
      getTranslatorList: new Resource('t/list'),
      getProfileView: new Resource('t/info'),
      getTranslatorInfo: new Resource('staff/profile/info'),
      getUserProfileEdit: new Resource('user/update'),
      getTranslatorEdit: new Resource('staff/profile/update'),
      getChangePassword: new Resource('user/password'),
      uploadProfilePicture: new Resource('staff/profile/upload-image'),
      uploadProfileBg: new Resource('staff/profile/upload-background-image'),
      uploadNationalCard: new Resource('staff/profile/upload-national-card'),
      previewNationalCard: new Resource('staff/profile/national-card'),
      //profile//

      //Finance//
      getFinanceList: new Resource('wallet/list'),
      getChargeCredit: new Resource('wallet/charge'),
      getPaymentList: new Resource('payment/list'),
      getPaymentResult: new Resource('wallet/charge-result'),
      getPaymentAgain: new Resource('wallet/try-again'),
      getBankInfo: new Resource('staff/bankcard/view'),
      getBankInfoCreate: new Resource('staff/bankcard/create'),
      getBankInfoUpdate: new Resource('staff/bankcard/update'),
      getCheckOutList: new Resource('staff/settlement/list'),
      getCheckOutOrder: new Resource('staff/settlement/add'),
      getIncomeList: new Resource('staff/financial/list'),
      getBalanceUser: new Resource('wallet/balance'),
      //Finance//

      //Favorite//
      getAddFavorite: new Resource('favorite/add'),
      getFavoriteList: new Resource('favorite/list'),
      //Favorite//

      //Jobs//
      getJobsList: new Resource('staff/profile/job/list'),
      getDeleteJob: new Resource('staff/profile/job/delete'),
      getAddJob: new Resource('staff/profile/job/add'),
      //Jobs//

      //Education//
      getEducationList: new Resource('staff/profile/education/list'),
      getEducationDelete: new Resource('staff/profile/education/delete'),
      getEducationAdd: new Resource('staff/profile/education/add'),
      getEducationUpload: new Resource('staff/profile/education/upload'),
      //education//

      //Article//
      getArticleList: new Resource('staff/profile/article/list'),
      getArticleDelete: new Resource('staff/profile/article/delete'),
      getArticleAdd: new Resource('staff/profile/article/add'),
      getArticleUpload: new Resource('staff/profile/article/upload'),
      //Article//

      //Certificate//
      getCertificateList: new Resource('staff/profile/certificate/list'),
      getCertificateDelete: new Resource('staff/profile/certificate/delete'),
      getCertificateAdd: new Resource('staff/profile/certificate/add'),
      getCertificateUpload: new Resource('staff/profile/certificate/upload'),
      //Certificate//

      //Notification//
      getNotificationList: new Resource('notification/list'),
      getNotificationCount: new Resource('notification/count'),
      //Notification//

      //Calculate//
      getFieldsItems: new Resource('calculator/languages'),
      getCalculatedItem: new Resource('calculator/calc'),
      //Calculate//

      //Setting//
      getSettingList: new Resource('notification-setting/list'),
      getSettingItem: new Resource('notification-setting/change'),
      getActiveSms: new Resource('subscribe/sms'),
      //Setting//

      // Cooperation //
      availableLanguageList: new Resource('translator/languages'),
      provinceList: new Resource('province/list'),
      cityList: new Resource('city/list'),
      addRole: new Resource('staff/add'),
      getQuiz: new Resource('translator/quiz'),
      deleteField: new Resource('translator/field-delete'),
      activeField: new Resource('translator/field-deactive'),
      sendAnswerQuiz: new Resource('translator/submit-quiz'),
      translatorSubCategory: new Resource('translator/language-fields'),
      submitSubCategory: new Resource('translator/submit-fields'),
      getSubCategoryTranslator: new Resource('translator/view-fields'),
      proExamQuestion: new Resource('translator/check-fields'),
      proExamSubmit: new Resource('translator/quiz-submit-fields'),
      translatorLanguages: new Resource('translator/language-select'),
      deleteTranslatorLanguages: new Resource('translator/language-delete'),
      ActiveTranslatorLanguages: new Resource('translator/language-deactive'),
      translatorLanguagesList: new Resource('translator/my-languages'),
      // Cooperation //

      // Translator Panel//
      translatorProjectsList: new Resource('translator/project/list'),
      translatorProjectView: new Resource('translator/project/view'),
      translatorProjectDownload: new Resource(
        'translator/project/download-file',
      ),
      translatorProjectSuggest: new Resource(
        'translator/project/send-suggestion',
      ),
      translatorProjectDelete: new Resource(
        'translator/project/delete-suggestion',
      ),
      translatorUploadFile: new Resource('translator/project/upload'),
      translatorSendFile: new Resource('translator/project/send-file'),
      getDownloadedFile: new Resource('translator/project/get-file'),
      acceptPaySteps: new Resource('translator/project/accept-steps'),
      editPaySteps: new Resource('order/translate/edit-step'),
      viewOrderContentUser: new Resource('order/translate/view-content'),
      viewOrderContentTranslator: new Resource(
        'translator/project/view-content',
      ),
      rejectTranslatorSteps: new Resource('order/translate/delete-suggestion'),
      endOfProjectTranslator: new Resource('translator/project/end-project'),
      cancelProjectTranslator: new Resource('translator/project/resignation'),
      translatorSelectProject: new Resource('translator/project/dedicated'),

      translatorDeCancel: new Resource('translator/project/resignation-cancel'),
      translatorTimeAdd: new Resource('translator/project/extend-time'),

      // Translator Panel//

      //Ticket//
      getTicketList: new Resource('ticket/list'),
      getTicketView: new Resource('ticket/view'),
      getAddTicket: new Resource('ticket/add'),
      getReplyTicket: new Resource('ticket/reply'),
      getUploadTicket: new Resource('ticket/upload'),
      getFileTicket: new Resource('ticket/download-attachment'),
      //Ticket//

      //DashBoard//
      getDashBoardInfo: new Resource('dashboard/index'),
      getDashBoardTranslator: new Resource('translator/dashboard'),
      //DashBoard//
    },
    {
      statusValidationError: 401,
      mutateError: (error, rawResponse, resource, requestConfig) => {
        let response = JSON.parse(error.responseText)
        if (error.statusCode === 401) _AuthenticationDo()
        return response
      },
      apiRoot: 'http://192.168.1.10/projects/lotus/public/api/',
      // apiRoot: 'http://94.139.165.200:8080/projects/lotus/public/api/',
      // apiRoot: 'http://demo.balvin.net/projects/lotus/public/api/',
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    },
  )
}

export const _AuthenticationDo = () => {
  localStorage.clear()
  Cookies.clear()
  location.replace('/login')
}
