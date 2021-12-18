import React, {Component} from 'react';
import {observer} from "mobx-react";
import Link from "next/link";
import {Rate, Button, Avatar, Empty} from "antd"
import FavoritePres from "../../../mobx/presenters/FavoritePres";
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import Head from "next/head";

@observer
class Favourite extends Component {

  constructor(props) {
    super(props);
    this.store = new FavoritePres()
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.store.getFavoriteList()
  }

  render() {

    return (
      <>
        <Head>
          <title>لیست منتخب من</title>
        </Head>
        <div className="user-panel radius">
          <div className="mb-3">
            <div className="d-flex align-items-center justify-content-between">

                <h3 className="title-page mb-0" >لیست منتخب من</h3>

              <div className="">
                <Link href={"/panel/Tlist"}><a>
                  <Button size={"meduim"} type={"primary"} className={"radius"}>اضافه کردن مترجم جدید</Button>
                </a></Link>
              </div>

            </div>
            <hr/>
          </div>
          <div className="row">
            {this.store.favoriteList.length>0 ? this.store.favoriteList.map((item, index) => (
              <div className="col-4">
                <div className="calculating-box p-4 h-100">
                  <div className="d-flex flex-column justify-content-between w-100 h-100">
                    <div className="d-flex flex-column text-center ">
                      <div className="">
                        <Avatar src={item.image} size={55}/>
                      </div>
                      <div className="d-flex flex-column px-2">

                        <div className="mt-2">
                          <Link href={`/panel/Tview/${item.username}`}><a>
                            <span className="titr-title">{item.full_name()}</span>
                          </a></Link>
                        </div>
                        <Rate value={item.rate / 2} allowHalf={true} disabled/>
                        <div className="mt-2">
                          <span className="text-muted">{item.about}</span>
                        </div>
                      </div>

                    </div>


                    <div className="d-flex justify-content-center">

                      <Button className={'favorite-btn radius w-100 my-3'} loading={item.loading}
                              onClick={() => item.getAddFavorite()}>
                        <div className="d-flex align-items-center ">
                          {item.type ? <> حذف از منتخب ها<HeartFilled style={{color: "red"}}
                                                                      className={"mx-1"}/> </> : <> افزودن به منتخب
                            ها<HeartOutlined className={"mx-1"}/> </>}
                        </div>
                      </Button>

                    </div>

                  </div>
                </div>
              </div>
            )) :
            <div className={"mx-auto"}>
              <Empty/>
            </div>
            }
          </div>
        </div>
      </>
    );
  }
}

export default Favourite;
