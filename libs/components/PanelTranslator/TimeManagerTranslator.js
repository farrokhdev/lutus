import React, {Component} from 'react';
import {observer} from "mobx-react";
import StateView from "../UI/StateView/StateView";
import {Card, Spin, Button, Divider, Alert, Modal, Form} from "antd";
import TransferBox from "../../mobx/models/Order/TransferBox";
import TranslatorPres from "../../mobx/presenters/TranslatorPres";
import Countdown from "react-countdown";
import moment from "moment-jalaali";
import FormBuilder from "antd-form-builder";

@observer
class TimeManagerTranslator extends Component {


    static defaultProps = {
        store: new TranslatorPres()
    }

    constructor(props) {
        super(props);
        this.formRef = React.createRef();

    }
    SendFile = () => {
        // this.props.store.sendFileTranslator()
    }

    _renderTime = ({hours, minutes, days, seconds, completed}) => {
        if (completed) {
            return <div className={'text-danger'}>مهلت ترجمه پایان یافته است. </div>
        } else {
            return <div>

                {days > 0 && <span>{days}  روز و     </span>}
                <span>{hours}  ساعت و   </span>
                <span>{minutes} دقیقه </span>
                {/*<span>{seconds} ثانیه </span>*/}

            </div>;
        }
    }
    _sendTime = (data)=>{
        data.order_id = this.props.store.projectView.id;

        this.props.store.sendAddTime(data);


    }

    render() {
        const {store} = this.props;
        const {TimeModal} = store;
        const delivery_day = moment(store.projectView.delivery_date_en);
        // const delivery_day = moment('2021-12-02');
        const now_date = moment();
        const diff_day = delivery_day.diff(now_date, 'days');
        const meta = {
            columns: 4,
            // initialValues: this.state.field,
            formItemLayout: null,
            fields: [
                {
                    key: 'hours',
                    label: 'ساعت',
                    required: true,
                    widget: 'select',
                    options: Array.from({length: 24}, (_, i) =>   {return {value:i + 1,label:(i+1)+ "  ساعت" }} ),
                    colSpan: 2
                },
                {
                    key: 'day',
                    label: 'روز',
                    required: true,
                    widget: 'select',
                    options: Array.from({length: 10}, (_, i) =>   {return {value:i + 1,label:(i+1)+ "  روز " }} ),

                    colSpan: 2
                },
                {key: 'Description', widget:"textarea", label:'توضیحات', colSpan: 4},

            ]
        }
        // delivery_day.toISOString()
        return (
            <div>
                <Card title={"مدیریت زمان"} className="radius mb-3" extra={<div className={'d-flex'}>

                    <Countdown
                        // date={Date.now() + 5000}
                        date={delivery_day.toISOString()}
                        renderer={this._renderTime}
                    />
                </div>}>

                    <div className={"d-flex flex-row justify-content-start"}>
                       <span>
                           زمان تحویل پروژه :
                       </span>
                        <span> {delivery_day.locale("fa").format('jDD jMMMM jYYYY  ساعت HH:mm')}</span>
                    </div>

                    {diff_day <= 3 && diff_day >= 0 &&<div className={'mt-3'}>
                        <Alert showIcon  message={`
                         زمان تحویل پروژه شما رو به پایان میباشد. فقط 
                        ${diff_day}
                        روز دیگر مهلت دارید .                         
                         
                         `} type="error" />

                    </div>}
                    {(diff_day <= 0) &&<div className={'mt-3'}>
                        <Alert showIcon  message={`توجه : 
                          
                        ${Math.abs(diff_day)}
                        روز از مدت تحویل پروژه گذشته است.`} type="error" />

                    </div>}
                    <Divider />
                    <div>
                        در صورتی که در زمان تعیین شده نمی توانید پروژه را تحویل دهید می توانید با کلیک برروی دکمه درخواست زمان ، زمان تحویل را افزایش دهید.
                    </div>

                    <div className={' mt-4'}>
                        <Button type={"primary"} className={'px-4'}  onClick={() => this.props.store.setData("TimeModal",true)}>
                            درخواست زمان بیشتر
                        </Button>
                    </div>

                    <Modal
                        closable={false}
                        maskClosable={false}
                        destroyOnClose
                        okButtonProps={{ loading: this.props.store.loadingTime, disabled: this.props.store.loadingTime }}
                        onOk={() => {
                            this.formRef.current.submit()
                        }
                        }
                        title={'درخواست زمان'} visible={TimeModal} onCancel={() => this.props.store.setData("TimeModal",false)}
                           // footer={null}
                    >
                        <p>در صورتی که نیاز به زمان بیشتر برای انجام این پروژه دارید لطفاً  در فرم زیر زمان خود را انتخاب کنید.</p>

                        <div>
                            <Form
                                ref={this.formRef}
                                layout="vertical"
                                onFinish={this._sendTime}
                            >
                                <FormBuilder meta={meta} form={this.formRef}/>
                                {/*<Button loading={this.props.store.loadingTime} htmlType="submit"*/}
                                {/*        className={"login-btn w-50 mx-auto"}></Button>*/}
                            </Form>
                        </div>
                    </Modal>

                </Card>
            </div>
        );
    }
}

export default TimeManagerTranslator;
