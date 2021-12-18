import React, {Component} from 'react';
import {observer} from "mobx-react";
import Layout from "../../libs/components/UI/Layout";
import {Button,Table} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import Head from "next/head";
@observer
class Index extends Component {
  render() {
    const dataSource = [
      {
        key: '1',
        count: '1',
        name: 'کتاب ترجمه فرانسه',
        price: "32/000",
        image: "/static/images/product.svg",
      },

    ];

    const columns = [
      {
        title: 'شماره',
        dataIndex: 'count',
        width:"10%"
      },
      {
        title: '',
        dataIndex: 'image',
        render:(image)=>{return <img src={image} width={70}/>}
      },
      {
        title: 'اسم',
        dataIndex: 'name',
      },
      {
        title: 'قیمت',
        dataIndex: 'price',
        render:(price)=>{return <span className={"pink-title"}>{price}</span> }

      },
      {
        title: 'حذف',
        dataIndex: 'delete',
          render:()=>{return <DeleteOutlined style={{fontSize:"18px"}} className={"cursor"} onClick={()=>{}}/>}

      },
    ];
    return (
      <>
        <Head><title>سبد خرید</title></Head>
       <Layout>
         <div className="container">
           <div className="user-panel my-3 mb-4 user-workSpace">
             <Table dataSource={dataSource} columns={columns} pagination={false}/>
             <div className="d-flex m-5 justify-content-center align-items-center">
               <div className="px-3">

               <span className={"px-2 titr-title"}>قیمت قابل پرداخت</span>
               <span className={"px-2 titr-title"}>230/000</span>

               </div>
               <Button className={"login-btn w-25 "}>تسویه حساب</Button>
             </div>
           </div>
         </div>
       </Layout>
      </>
    );
  }
}

export default Index;