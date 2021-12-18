import React, {Component} from 'react';
import {message, Modal, Table, Select, Input, Button, Form, Popconfirm} from 'antd';
import {observer} from "mobx-react";
import OrderPres from "../../mobx/presenters/OrderPres";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons"
import {withTranslation} from "react-i18next";
import FormBuilder from 'antd-form-builder'
import DictionaryPres from "../../mobx/presenters/DictionaryPres";
import StateView from "../UI/StateView/StateView";
import login from "../../../pages/login";
import Head from "next/head";

@observer
class MyWords extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef()
    this.store = new DictionaryPres()
  }

  state = {
    visible: false,
    field: "",
    search: "",
    field_id: "",
    language_id: "",
  }

  componentDidMount() {
    this._getFilterData()
    this._getData()
  }

  _getFilterData = () => {
    this.store.getFieldList()
    this.store.getLanguageList()
  }

  _getData = () => {
    this.store.getDictionaryList()
  }

  _handleSearch = () => {
    const data = {}
    data.search = this.state.search
    data.language_id = this.state.language_id
    data.field_id = this.state.field_id
    this.store.getDictionaryList(data)
  }

  _searchWordsBox = () => {
    const {t} = this.props
    const optionsLng = this.store.languageList.map(i => {
      return {label: i.title, value: i.id}
    })
    const optionsField = this.store.FieldList.map(i => {
      return {label: i.title, value: i.id}
    })
    return <div className="d-flex align-items-center py-2 ">
      <div className="col-4 p-0">
        <Input placeholder={"واژگان خود را جست و جو کنید"} onChange={e => this.setState({search: e.target.value})}
               value={this.state.search}/>
      </div>
      <div className="col-3 p-0">
        <Select placeholder={t("words.selectLng")} className={"w-100 px-1"} options={optionsLng}
                onChange={e => this.setState({language_id: e})}/>
      </div>
      <div className="col-3 p-0">
        <Select placeholder={t("words.selectField")} className={"w-100 px-1"} options={optionsField}
                onChange={e => this.setState({field_id: e})}/>
      </div>
      <div className="col-2 p-0">
        <div className="d-flex justify-content-end w-100">
          <Button onClick={this._handleSearch} className={"btn-check sample-btn  w-100 "}>جست جو</Button>

        </div>
      </div>
    </div>
  }

  _renderModal = () => {

    const optionsLng = this.store.languageList.map(i => {
      return {label: i.title, value: i.id}
    })
    const optionsField = this.store.FieldList.map(i => {
      return {label: i.title, value: i.id}
    })
    const {t} = this.props
    const meta = {
      columns: 4,
      initialValues: this.state.field,
      formItemLayout: null,
      fields: [
        {
          key: 'language',
          label: t("words.selectLng"),
          required: true,
          widget: 'select',
          options: optionsLng,
          initialValue: this.state.field.language && this.state.field.language.id,
          colSpan: 2
        },
        {
          key: 'field',
          label: t("words.selectField"),
          required: true,
          widget: 'select',
          options: optionsField,
          initialValue: this.state.field.field && this.state.field.field.id,
          colSpan: 2
        },
        {key: 'word', label: t("words.inputWord"), required: true, colSpan: 2},
        {key: 'translate', label: t("words.inputMeaning"), required: true, colSpan: 2},

      ]
    }
    return (<Modal title={t("words.addWord")} visible={this.state.visible} footer={false} width={750} onCancel={() => {
      this.setState({visible: false})
    }}>
      <div className="px-4 py-3">

        <Form
          ref={this.formRef}
          layout="vertical"
          onFinish={this.handleAddWord}
        >
          <FormBuilder meta={meta} form={this.formRef}/>
          <Button loading={this.store.loading} htmlType="submit"
                  className={"login-btn w-50 mx-auto"}>{t("form.submit")}</Button>
        </Form>
      </div>
    </Modal>)
  }

  handleAddWord = (e) => {
    const data = {}
    data.field_id = e.field
    data.language_id = e.language
    data.word = e.word
    data.translate = e.translate
    data.dictionary_id = this.state.field && this.state.field.id

    if (this.state.field) {
      this.store.updateDictionaryWord(data, this.callBackEdit)
    } else {
      this.store.addDictionaryWord(data, this.callBackAdd)
    }

  }

  _handleDeleteWord = (data) => {
    this.store.deleteDictionaryWord({dictionary_id: data.id}, () => this.callBackDelete(data))
  }

  _EditWord = (field) => {

    this.setState({field, visible: true})
  }


  render() {
    const {t} = this.props

    const dataSource = this.store.dictionaryList.map((item, index) => {
      return {
        key: index + 1,
        count: index + 1,
        id: item.id,
        field: item.field,
        language: item.language,
        word: item.word,
        translate: item.translate
      }
    })

    const columns = [
      {
        title: 'شماره',
        dataIndex: 'count',
        width: "10%",
        align: 'center'
      },
      {
        title: 'زبان',
        dataIndex: 'language',
        render: (language) => {
          return <span>{language.title}</span>
        }
      },
      {
        title: 'زمینه',
        dataIndex: 'field',
        render: (field) => {
          return <span>{field.title}</span>
        }
      },
      {
        title: 'واژه',
        dataIndex: 'word',
      },
      {
        title: 'معنی',
        dataIndex: 'translate',
      },
      {
        title: 'اصلاح',
        width: "10%",
        align: 'center',
        render: (e) => {
          return <EditOutlined className={"cursor"} onClick={() => this._EditWord(e)}/>

        }
      },
      {
        title: 'حذف',
        width: "10%",
        align: 'center',
        render: (data) => {
          return <Popconfirm
            title={t('words.deleteWord')}
            onConfirm={() => this._handleDeleteWord(data)}
            // onCancel={cancel}
          > <DeleteOutlined className={"cursor"}/>
          </Popconfirm>
        }
      },


    ];

    return (
      <>
        <Head>
          <title>کلمات من</title>
        </Head>
        <div className="user-panel radius">
          <div className="mb-3">
            <div className="d-flex align-items-center justify-content-between">
            <h3 className={"title-page"}>{t("words.MyWords")}</h3>
              <Button size={"meduim"} type={"primary"} className={"radius"} onClick={() => {
                this.setState({visible: true,field:''})
              }}>افزودن واژه +</Button>
            </div>
            <hr/>
          </div>

          <StateView state={this.store.stateView} errorButtonAction={this._getData}>

            {this._searchWordsBox()}
            <div className="user-workSpace  my-2">
              <Table dataSource={dataSource} columns={columns} pagination={false}/>
            </div>
          </StateView>
        </div>
        {this.state.visible && this._renderModal()}
      </>
    );
  }


  callBackAdd = (msg, data) => {
    this.store.dictionaryList.unshift(data)
    this.setState({visible: false})
  }

  callBackEdit = (msg, data) => {
    const index = this.store.dictionaryList.findIndex(item => item.id === this.state.field.id)
    this.store.dictionaryList[index].setVals(data)
    this.setState({visible: false})
  }

  callBackDelete = (data) => {
    this.store.dictionaryList = this.store.dictionaryList.filter(item => item.id !== data.id)

  }

}

export default withTranslation("common")(MyWords);