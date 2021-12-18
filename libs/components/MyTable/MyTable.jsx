import { observer } from 'mobx-react'
import { Select } from 'antd'

const { Option } = Select

const MyTable = observer(({ priceslanguageList }) => {
  function handleChange(value) {
    console.log(`selected ${value}`)
  }

  const { languages, services, fields, text_services } = priceslanguageList

  console.log(priceslanguageList)
  //   console.log(services)
  //   console.log(fields)
  //   console.log(text_services)
  return (
    <div className="my-table-sec">
      <div className="my-table-sidebar">
        <div className="side-header"> نوع خدمات</div>
        <div className="side-column">
          <div className="side-row">
            <span>طرح</span>
          </div>
          <div className="side-row">
            <span>هزینه هر کلمه</span>
          </div>
          <div className="side-row">
            <span>سطح مترجم</span>
          </div>
          <div className="side-row">
            <span>گارانتی کیفیت</span>
          </div>
          <div className="side-row">
            <span>امکان انتخاب از میان مترجمین</span>
          </div>
          <div className="side-row">
            <span>گارانتی زمان تحویل</span>
          </div>
          <div className="side-row">
            <span>ارتباط مستقیم مشتری با مترجم</span>
          </div>
          <div className="side-row">
            <span>دریافت مرحله‌ای پروژه</span>
          </div>
          <div className="side-row">
            <span>پرداخت مرحله‌ای پروژه</span>
          </div>
          <div className="side-row">
            <span>انتخاب سطح محرمانگی بالا</span>
          </div>
          <div className="side-row">
            <span>تخفیف حجمی</span>
          </div>
          <div className="side-row">
            <span>جایگزینی مترجم در صورت عدم رضایت مشتری</span>
          </div>
          <div className="side-row">
            <span>پشتیبانی شبانه روزی</span>
          </div>
          <div className="side-row">
            <span>کاربرد</span>
          </div>
        </div>
      </div>
      <div className="my-table-content">
        <div className="content-header">
          <Select
            defaultValue="lucy"
            // style={{ width: ' 25%' }}
            onChange={handleChange}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Select
            defaultValue="lucy"
            // style={{ width: '25%' }}
            onChange={handleChange}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Select
            defaultValue="lucy"
            // style={{ width: '22%' }}
            onChange={handleChange}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Select
            defaultValue="lucy"
            // style={{ width: '22%' }}
            onChange={handleChange}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </div>
        <div className="content-row">
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
        </div>
        <div className="content-row">
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
        </div>
        <div className="content-row">
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
        </div>
        <div className="content-row">
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
        </div>
        <div className="content-row">
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
        </div>
        <div className="content-row">
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
        </div>
        <div className="content-row">
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
          <div className="item">
            <span>title</span>
            <span>test</span>
          </div>
        </div>
      </div>
    </div>
  )
})

export default MyTable
