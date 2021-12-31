import { Table } from "antd";
import React, { Component } from "react";

import StateView from "../UI/StateView/StateView";
import { observer } from "mobx-react";
import VideoTranslateTable from "../Tables/VideoTranslateTable/VideoTranslateTable";
import NewVideoTranslateTable from "../TestTable/VideoTranslateTable/NewVideoTranslateTable";

const VideoTranslate = observer(({ controller }) => {
  return (
    <div className="d-flex flex-column justify-content-center h-100">
      <div className="">
        <h4>تعرفه ترجمه محتوای ویدیویی و رسانه</h4>
      </div>
      <div className="my-5">
        <h6>قیمت ترجمه ویدیو و رسانه</h6>
        <span>
          چنانچه پروژه خود را به صورت مناقصه ای تعریف کرده باشید، تمام مترجمین
          واجد شرایط می توانند وارد منقاصه شده و هر کدام قیمت ترجمه را به صورت
          جداگانه اعلام می کنند. این نکته را مد نظر داشته باشید که قیمت پیشنهادی
          هر مترجم بین بازه ای خواهد بود که در زیر مشخص شده است. شما می توانید
          با توجه به رزومه مترجم، هزینه ترجمه اعلام شده و امتیاز وی در ترنسیس،
          یکی از مترجمان که از نظرتان بهترین و مناسب ترین مترجم است را انتخاب
          کنید. در این بین هزینه ترجمه که توسط مترجم اعلام می شود نقشی اساسی
          ایفا می کند.
        </span>
      </div>
      <div className="my-5">
        <h6>قیمت ترجمه ویدیو و رسانه در پروژه های غیر مناقصه ای</h6>
        <span>
          اگر شما پروژه خود را به صورت غیرمناقصه ای تعریف کنید تنها مترجم ویژه
          ترنسیس (که در واقع گلچینی از بهترین مترجم های ترنسیس هستند) امکان قیمت
          گذاری و اعلام هزینه ترجمه بر روی پروژه را خواهد داشت و قیمتی که مترجم
          ویژه ترنسیس اعلام خواهد کرد سقف بازه مشخص شده در باکس زیر خواهد بود.
          پروژه های غیر مناقصه ای گارانتی بالاتری نسبت به پروژه های مناقصه ای
          دارند چرا که مسئولیت کامل ترجمه برعهده ترنسیس خواهد بود.
        </span>
      </div>
      <StateView state={controller.stateView}>
        <NewVideoTranslateTable controller={controller} />
      </StateView>
    </div>
  );
});

export default VideoTranslate;
