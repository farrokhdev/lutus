import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import Router, {withRouter} from 'next/router'
import {Button, Badge, Menu, Drawer, Divider, Collapse} from 'antd';
import LoginPres from "../../../mobx/presenters/LoginPres";
import NotificationPres from "../../../mobx/presenters/NotificationPres";
import MediaQuery from 'react-responsive'
import Link from "next/link"


const {SubMenu} = Menu;
import {UserOutlined} from '@ant-design/icons';

const {Panel} = Collapse;

@inject("CoreStore")
@observer
class PanelSideBar extends Component {

    constructor(props) {
        super(props);
        this.store = new LoginPres()
        this.notiStore = new NotificationPres()
    }

    componentDidMount() {
        this._getData()

    }

    _getData = () => {
        this.store.getBalanceUser()
        this._getNewNotification()
        setInterval(() => this._getNewNotification(), 1000000);
    }

    _getNewNotification = () => {
        this.notiStore.getNotificationCount()
    }

    state = {
        active: ""
    }

    handleWidgetActive = (title) => {
        if (this.state.active !== title) {
            this.setState({active: title})
        }
    }


    handleClick = ({key}) => {
        if (key === "#logout") {
            return this.store.logOut()
        }
        // Router.push(key)
    }


    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    render() {
        const {query} = this.props.router;
        const {user} = this.props.CoreStore;

        const userMenu = [
            {title: "پیشخوان", icon: 'dashboard', link: "/panel/dashboard"},
            {
                title: "پروفایل", icon: 'profile',
                subMenu: [
                    {title: "ویرایش پروفایل", icon: 'dashboard', link: "/profile/edit"},
                    {title: "تغییر رمز عبور", icon: 'dashboard', link: "/profile/changePassword"},
                ]
            },
            {
                title: "سفارشات ترجمه", icon: 'project', link: "",
                subMenu: [
                    {title: "پروژه های فعال", icon: 'dashboard', link: "/panel/project/"},
                    {title: "پروژه ها در حال انجام", icon: 'dashboard', link: "/panel/project/in_progress"},
                    {title: "پروژه ها انجام شده", icon: 'dashboard', link: "/panel/project/complete"},
                ]
            },
            {title: "واژگان تخصصی", icon: 'dictionary', link: "/panel/words"},
            {title: "لیست مترجمین", icon: 'tlist', link: "/panel/Tlist"},
            {title: "کیف پول", icon: 'wallet', link: "/panel/finance"},
            {title: "اعلانات", icon: 'bell', link: "/notification"},
            {title: "پشتیبانی", icon: 'contactMenu', link: "/panel/support"},
            {title: "مورد علاقه های من", icon: 'heart', link: "/panel/favourite"},
            {title: "تنظیمات اطلاع رسانی", icon: 'setting', link: "/panel/setting"},
            {title: "راهنما", icon: 'guide', link: "/guide"},
            {title: "پرسش های متوالی", icon: 'information', link: "/panel/questions"},
            {
                title: "سفارشات تایپ", icon: 'project', link: "",
                subMenu: [
                    {title: "پروژه های فعال", icon: 'dashboard', link: "/panel/tproject/pending"},
                    {title: "پروژه ها در حال انجام", icon: 'dashboard', link: "/tpanel/project/in_progress"},
                    {title: "پروژه ها انجام شده", icon: 'dashboard', link: "/panel/tproject/complete"},
                ]
            },
            {title: "خروج", icon: 'logout', link: "#logout"},

        ];


        const employMenu = [
            {
                title: "پروژه ها ", icon: 'project', link: "",
                subMenu: [
                    // {title: "پروژه های فعال", icon: 'dashboard', link: {pathname:"/translator-project/translate",query:{status:"pending"}}},
                    {title: "پروژه های فعال", icon: 'dashboard', link: "/panel/translator-project/"},
                    {title: "پروژه ها در حال انجام", icon: 'dashboard', link: "/panel/translator-project/in_progress"},
                    {title: "پروژه ها انجام شده", icon: 'dashboard', link: "/panel/translator-project/complete"},
                    {title: "پروژه های از دست رفته", icon: 'dashboard', link: "/panel/translator-miss"},
                ]
            },
            {
                title: "مالی", icon: 'wallet', link: "",
                subMenu: [
                    {title: "کیف پول", icon: 'wallet', link: "/panel/finance"},
                    {title: "درآمد ها", icon: 'wallet', link: "/panel/income"},
                    {title: "اطلاعات حساب", icon: 'wallet', link: "/panel/bankInfo"},
                    {title: "تسویه حساب", icon: 'wallet', link: "/panel/checkout"},
                ]
            },

            // {title: "اعلانات", icon: 'bell', link: "/notification"},
            // {title: "مورد علاقه های من", icon: 'heart', link: "/panel/favourite"},

            {title: "مدیریت زبان ها", icon: 'lng', link: "/panel/translator"},
            // {
            //   title: "سفارشات ترجمه", icon: 'project', link: "",
            //   subMenu: [
            //     {title: "پروژه های فعال", icon: 'dashboard', link: "/panel/project/"},
            //     {title: "پروژه ها در حال انجام", icon: 'dashboard', link: "/panel/project/in_progress"},
            //     {title: "پروژه ها انجام شده", icon: 'dashboard', link: "/panel/project/complete"},
            //   ]
            // },
            // {title: "واژگان تخصصی", icon: 'dictionary', link: "/panel/words"},
            // {title: "لیست مترجمین", icon: 'tlist', link: "/panel/Tlist"},


            // {title: "پشتیبانی", icon: 'contactMenu', link: "/panel/support"},
            // {title: "تنظیمات اطلاع رسانی", icon: 'setting', link: "/panel/setting"},
            // {title: "راهنما", icon: 'guide', link: "/guide"},
            // {title: "پرسش های متوالی", icon: 'information', link: "/panel/questions"},
            // {title: "خروج", icon: 'logout', link:'#logout', action:"click"},
            // {
            //   title: "سفارشات تایپ", icon: 'project', link: "",
            //   subMenu: [
            //     {title: "پروژه های فعال", icon: 'dashboard', link: "/panel/project/pending"},
            //     {title: "پروژه ها در حال انجام", icon: 'dashboard', link: "/panel/project/in_progress"},
            //     {title: "پروژه ها انجام شده", icon: 'dashboard', link: "/panel/project/complete"},
            //   ]
            // },
        ];


        let myMenu = userMenu
        let otherMenu = []
        switch (user.role) {
            case "translator":
                otherMenu = employMenu
                break;
            case "typist":
                otherMenu = employMenu
                break;

        }
        const pathname = "/panel/" + this.props.router.query.tab

        return (
            <>
                <MediaQuery minWidth={960}>
                    <div className="user-sidebar radius mt-3 mb-5">
                        <div
                            className="profile-pic d-flex flex-column mx-3 mb-3 text-center pm-3 border-bottom position-relative ">
                            <img src={user.image ? user.image : "/static/images/user.svg"} width="77"
                                 className={"img-fluid radius mx-auto"}/>
                            <span className="sub-title py-2 text-center">{user.full_name}</span>
                            <div className=" d-flex  justify-content-center p-2 radius">
                                <img src={"/static/images/wallet.svg"} width={20}/>
                                <span className={" ml-2 mr-1"}>موجودی:</span>
                                <span className={" "}>{this.formatNumber(this.store.wallet)} تومان</span>
                            </div>
                            <span className="muted-title py-1 mb-2 text-center">{user.mobile}</span>
                        </div>

                        <Menu
                            defaultSelectedKeys={['/panel/dashboard']}
                            selectedKeys={[pathname]}
                            onClick={this.handleClick}
                            mode="inline"
                        >

                            <Collapse ghost bordered={false} defaultActiveKey={['side-sb-4']} onChange={() => {
                            }} className={"side-menu-section"} expandIconPosition={'right'}>
                                <Panel  showArrow={false} header="بخش کاربری" key="side-sb-4">
                                    {myMenu.map((item, index) => (item.subMenu ?
                                        <SubMenu key={'m1'+index}
                                                 icon={<img src={`/static/images/${item.icon}.svg`} width={18}/>}
                                                 title={item.title}>
                                            {item.subMenu && item.subMenu.map(sub => (<Menu.Item key={sub.link}>
                                                <Link href={sub.link}>
                                                    <a href={sub.link}>
                                                        {sub.title}
                                                    </a></Link>
                                            </Menu.Item>))}
                                        </SubMenu> :
                                        <Menu.Item key={item.link}
                                                   icon={<img src={`/static/images/${item.icon}.svg`} width={18}/>}>

                                            <Link href={item.link}>
                                                <a href={item.link}>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        {item.title}
                                                        {item.icon === "bell" &&
                                                        <Badge count={this.notiStore.notifications}
                                                               overflowCount={10}/>}
                                                        {/*{item.icon === "contactMenu" && <Badge count={2} overflowCount={10}/>}*/}
                                                    </div>
                                                </a>
                                            </Link>
                                        </Menu.Item>))}
                                </Panel>
                            </Collapse>


                            {(user.role == "translator" || user.role == "typist") && <>
                                <Collapse  ghost bordered={false} defaultActiveKey={['side-sb']} onChange={() => {
                                }} className={"side-menu-section"} expandIconPosition={'right'}>
                                    <Panel  showArrow={false} header="بخش مترجمین" key="side-sb">
                                        {employMenu.map((item, index) => (item.subMenu ?
                                            <SubMenu key={'m2'+index}
                                                     icon={<img src={`/static/images/${item.icon}.svg`} width={18}/>}
                                                     title={item.title}>
                                                {item.subMenu && item.subMenu.map(sub => (<Menu.Item key={sub.link}>
                                                    <Link href={sub.link}>
                                                        <a href={sub.link}>
                                                            {sub.title}
                                                        </a></Link>
                                                </Menu.Item>))}
                                            </SubMenu> :
                                            <Menu.Item key={item.link}
                                                       icon={<img src={`/static/images/${item.icon}.svg`} width={18}/>}>

                                                <Link href={item.link}>
                                                    <a href={item.link}>
                                                        <div
                                                            className="d-flex align-items-center justify-content-between">
                                                            {item.title}
                                                            {item.icon === "bell" &&
                                                            <Badge count={this.notiStore.notifications}
                                                                   overflowCount={10}/>}
                                                            {/*{item.icon === "contactMenu" && <Badge count={2} overflowCount={10}/>}*/}
                                                        </div>
                                                    </a>
                                                </Link>
                                            </Menu.Item>))}
                                    </Panel>
                                </Collapse>
                            </>}

                        </Menu>


                        {/*{Menu.map((item, index) => {
            return <WidgetSide item={item} query={query} handleActive={this.handleWidgetActive}
                               active={this.state.active} key={index}/>
          })}*/}


                    </div>
                </MediaQuery>

                <MediaQuery maxWidth={960}>
                    {/*<div className="user-controller">*/}
                    {/*  <Button onClick={e => this.props.CoreStore.setVal("panel_open",true)} icon={<UserOutlined/>}/>*/}
                    {/*</div>*/}
                    <Drawer
                        className={'head-dr'}
                        // title="Basic Drawer"
                        placement={"left"}
                        closable={false}
                        onClose={() => {
                            this.props.CoreStore.setVal("panel_open", false)
                            // this.setState({visible: false})
                        }
                        }
                        visible={this.props.CoreStore.panel_open}
                        // key={placement}
                    >
                        <div className="user-sidebar radius ">
                            <div
                                className="profile-pic d-flex flex-column mx-3 mb-3 text-center pm-3 border-bottom position-relative ">
                                <img src={user.image ? user.image : "/static/images/user.svg"} width="77"
                                     className={"img-fluid radius mx-auto"}/>
                                <span className="sub-title py-2 text-center">{user.full_name}</span>
                                <div className=" d-flex  justify-content-center p-2 radius">
                                    <img src={"/static/images/wallet.svg"} width={20}/>
                                    <span className={" ml-2 mr-1"}>موجودی:</span>
                                    <span className={" "}>{this.formatNumber(this.store.wallet)} تومان</span>
                                </div>
                                <span className="muted-title py-1 mb-2 text-center">{user.mobile}</span>
                            </div>

                            <Menu
                                defaultSelectedKeys={['/panel/dashboard']}
                                selectedKeys={[pathname]}
                                onClick={this.handleClick}
                                mode="inline"
                            >
                                {myMenu.map(item => (item.subMenu ?
                                    <SubMenu key={item.title}
                                             icon={<img src={`/static/images/${item.icon}.svg`} width={18}/>}
                                             title={item.title}>
                                        {item.subMenu && item.subMenu.map(sub => (<Menu.Item key={sub.link}>
                                            <Link href={sub.link}>
                                                <a href={sub.link}>{sub.title}
                                                </a>
                                            </Link>
                                        </Menu.Item>))}
                                    </SubMenu> :
                                    <Menu.Item key={item.link}
                                               icon={<img src={`/static/images/${item.icon}.svg`} width={18}/>}>
                                        <div className="d-flex align-items-center justify-content-between">

                                            <Link href={item.link}>
                                                <a href={item.link}>
                                                    {item.title}
                                                    {item.icon === "bell" &&
                                                    <Badge count={this.notiStore.notifications} overflowCount={10}/>}
                                                    {/*{item.icon === "contactMenu" && <Badge count={2} overflowCount={10}/>}*/}
                                                </a>
                                            </Link>
                                        </div>
                                    </Menu.Item>))}
                            </Menu>


                            {/*{Menu.map((item, index) => {
            return <WidgetSide item={item} query={query} handleActive={this.handleWidgetActive}
                               active={this.state.active} key={index}/>
          })}*/}


                        </div>
                    </Drawer>
                </MediaQuery>
            </>
        );
    }
}

export default withRouter(PanelSideBar);
