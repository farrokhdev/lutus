import React, {Component} from 'react';
import {observer} from 'mobx-react'
import Layout from "../../libs/components/UI/Layout";
import StoreBox from "../../libs/components/Home/StoreBox/Store";
import {Input, Checkbox} from 'antd';
import {AudioOutlined} from '@ant-design/icons';
import Head from "next/head";

const {Search} = Input;

@observer
class Shop extends Component {


  onSearch = (e) => {
    console.log(e.target.value)
  }

  render() {
    const languageOptions = [
      {label: "انگلیسی", value: 1},
      {label: "فرانسه", value: 2},
      {label: "عربی", value: 3},
      {label: "روسی", value: 4},
      {label: "تایلندی", value: 5},
    ]

    const fieldsOptions = [
      {label: "پزشکی", value: 1},
      {label: "مدیریت", value: 2},
      {label: "مهندسی", value: 3},
      {label: "مالی", value: 4},
      {label: "ادبیات", value: 5},
    ]
    return (
      <>
        <Head><title>فروشگاه</title></Head>
        <Layout>
        <section>
          <div className="container">
            <div className="my-3 mb-4">
              <div className="row ">
                <div className="col-12 col-md-3">
                  <div className="user-sidebar radius">
                    <div className="m-2">
                      <div className="m-3">
                        <h6>فیلتر کردن</h6>
                      </div>
                      <Input placeholder="جستجو" onChange={this.onSearch} enterButton
                             onPressEnter={() => console.log("Press Entered")}/>
                    </div>
                    <div className="mt-3 mx-2">
                      <div className="m-3">
                        <h6>فیلتر بر اساس زبان</h6>
                      </div>
                      <div className="checkBox">
                        <Checkbox.Group options={languageOptions}/>
                      </div>
                    </div>
                    <div className="mt-3 mx-2">
                      <div className="m-3">
                        <h6>فیلتر بر اساس زمینه</h6>
                      </div>
                      <div className="checkBox">
                        <Checkbox.Group options={fieldsOptions}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-9 ">
                  <div className="row user-panel radius mb-5">
                    {Array(12).fill("Amir").map((item, index) => {
                      return <div className={"col-6"}><StoreBox/>
                      </div>
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout></>
    );
  }
}

export default Shop;