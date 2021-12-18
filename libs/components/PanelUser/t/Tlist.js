import React, {Component} from 'react';
import {observer} from "mobx-react";
import FavoritePres from "../../../../libs/mobx/presenters/FavoritePres";
import StateView from "../../../../libs/components/UI/StateView/StateView";
import Link from "next/link";
import {Empty,Rate, Tag, Button, Avatar, Pagination,Select,Input} from "antd"
import Head from "next/head";
import {HeartOutlined, HeartFilled} from '@ant-design/icons';

@observer
class Tlist extends Component {
  constructor(props) {
    super(props);
    this.store = new FavoritePres()
  }

  componentDidMount() {
    this._getData()
  }

  state = {
    search: "",
    field_id: "",
    language_id: "",
  }

  _getData = () => {
    this.store.getTranslatorList()
    this.store.getFieldsItems()

  }

  handleNextPage = (page) => {
    this.store.getTranslatorList({page})
  }

  _renderSearchBox = () => {

    let optionsLng = this.store.languageList.map(i => {
      return {label: i.title, value: i.from_to}
    })
    let optionsField = this.store.FieldList.map(i => {
      return {label: i.title, value: i.id}
    })

    optionsLng.unshift({label:'همه',value:''})
    optionsField.unshift({label:'همه',value:''})

    return <div className="row pb-3">
      <div className="col-4 ">
        <Input placeholder={"واژگان خود را جست و جو کنید"} onChange={e=>this.setState({search:e.target.value})} value={this.state.search}/>
      </div>
      <div className="col-3 ">
        <Select placeholder={"زبان خود را انتخاب کنید"} className={"w-100 px-1"} options={optionsLng} onChange={e=>this.setState({language_id:e})}/>
      </div>
      <div className="col-3 ">
        <Select placeholder={"زمینه خود را انتخاب کنید"} className={"w-100 px-1"} options={optionsField} onChange={e=>this.setState({field_id:e})} />
      </div>
      <div className="col-2 ">
          <Button onClick={this._handleSearch} className={"login-btn w-100 "}>جست جو</Button>
      </div>
    </div>
  }

  _handleSearch=()=>{
    const data={}
    data.field=this.state.field_id;
    data.language=this.state.language_id;
    data.search=this.state.search;
    this.store.getTranslatorList(data)
  }

  render() {
    return (
      <>
        <Head>
          <title>لیست مترجمین</title>
        </Head>
        <div className="user-panel radius">
          <div className="mb-3">
            <h3 className={"title-page"}>لیست تمام مترجمین</h3>
            <hr/>
          </div>
          <StateView state={this.store.stateView} errorButtonAction={this._getData}>
          {this._renderSearchBox()}
            <div className="d-flex flex-column">
              {this.store.translatorList.length>0 ? this.store.translatorList.map((item, index) => {

                return <div className="calculating-box p-2 h-100">
                  <div className="d-flex justify-content-between">
                    <div className="col-9">
                      <div className="d-flex align-items-start">
                        <div className="mt-3">
                          <Avatar src={item.image} size={55}/>
                        </div>
                        <div className="d-flex flex-column px-2">

                          <div className="mt-2">
                            <Link href={`/panel/Tview/${item.username}`}><a>
                              <span className="titr-title">{item.full_name()}</span>
                            </a></Link>
                          </div>
                          <Rate value={item.rate / 2} allowHalf={true} disabled/>
                          <div className="d-flex flex-column mt-2">
                            <span className="">{item.title}</span>
                            <span className="text-muted">{item.about}</span>
                          </div>
                          <div className="d-flex flex-column px-2">

                            {item.languages && item.languages.map(item => {
                              return <div className={"p-2"}>
                                <Tag className={"p-2"} color={"default"}>{item.title}</Tag>
                                {item.fields.map((field, index) => {
                                  return <span className={"sub-title-gray mx-2"}>{field.title}</span>
                                })}
                              </div>
                            })}


                          </div>
                        </div>


                      </div>
                    </div>
                    <div className="col-3">
                      <div className="d-flex flex-column">

                        <Button className={'favorite-btn radius w-100 my-3'} loading={item.loading}
                                onClick={() => item.getAddFavorite()}>
                          <div className="d-flex align-items-center ">
                            {item.type ? <> حذف از منتخب ها<HeartFilled style={{color: "red"}}
                                                                        className={"mx-1"}/> </> : <> افزودن به
                              منتخب ها<HeartOutlined className={"mx-1"}/> </>}
                          </div>
                        </Button>
                        <Link href={`/order/${item.username}`}><a>
                          <Button className={'login-btn w-100'}>دعوت به پروژه</Button>
                        </a></Link>
                      </div>
                    </div>
                  </div>

                </div>
              }) : <div className={"p-2"}> <Empty/></div>}

            </div>

            <Pagination current={this.store.page} total={this.store.total} pageSize={this.store.pagesize}
                        hideOnSinglePage={true} onChange={this.handleNextPage}/>

          </StateView>
        </div>

      </>
    );
  }
}

export default Tlist;