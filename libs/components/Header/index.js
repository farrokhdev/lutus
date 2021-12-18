import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Drawer, Badge, Button, Affix, Menu, Dropdown} from "antd";
import {withTranslation} from "react-i18next";
import Link from "next/link";
import {MenuOutlined} from '@ant-design/icons';
import {CaretDownOutlined} from '@ant-design/icons';
import {withRouter} from 'next/router'
import LoginPres from "../../mobx/presenters/LoginPres";
import NotificationPres from "../../mobx/presenters/NotificationPres";
import {DownOutlined, UserOutlined} from '@ant-design/icons';
import MediaQuery from "react-responsive";

@inject("CoreStore")
@observer
class Header extends Component {

    constructor(props) {
        super(props);
        this.store = new LoginPres()
        this.notiStore = new NotificationPres()
    }

    componentDidMount() {
        this._getData()

    }

    _getData = () => {
        this.store.getServiceList()
        this.props.CoreStore.isAuth && this._getNewNotification()
        this.props.CoreStore.isAuth && setInterval(() => this._getNewNotification(), 1000000);
    }

    _getNewNotification = () => {
        this.notiStore.getNotificationCount()
    }


    state = {
        visible: false
    }

    clickButton = () => {
        this.setState({visible: !this.state.visible})
        if (document.getElementById("navbarNav").style.display === "none" || document.getElementById("navbarNav").style.display === "") {
            document.getElementById("navbarNav").style.display = "inline"
        } else {
            document.getElementById("navbarNav").style.display = "none"
        }
    }

    logOut_btn = (e) => {
        if (e.key === "4") {
            this.store.logOut()
        }

    }

    serviceList = () => {
        return (<Menu>
            {this.store.ServiceList.map((item, index) => {
                return <Menu.Item className={"p-2"} key={index}>
                    <Link href={`/service/${item.id}`}><a>
                        {item.title}
                    </a></Link>
                </Menu.Item>
            })}
        </Menu>)
    }

    guideList = () => {
        return (<Menu>

            <Menu.Item className={"p-2"}>
                <Link href={`/questions`}><a>سوالات متداول</a></Link>
            </Menu.Item>
            <Menu.Item className={"p-2"}>
                <Link href={`/guide`}><a>مرکز راهنما</a></Link>
            </Menu.Item>

        </Menu>)
    }

    contactList = () => {
        return (<Menu>

            <Menu.Item className={"p-2"}>
                <Link href={`/about`}><a>درباره ما</a></Link>
            </Menu.Item>
            <Menu.Item className={"p-2"}>
                <Link href={`/contact`}><a> ارتباط با ما </a></Link>
            </Menu.Item>

        </Menu>)
    }

    cooperationBt = () => {
        const {t, CoreStore, router: {pathname}} = this.props;
        let status = "/panel/translator"

        if (CoreStore.isAuth !== 1) {
            status = "/login"
        }
        if (CoreStore.user.status === "active") {
            status = "/panel/translator"
        }
        if (CoreStore.user.status === "select_language") {
            status = "/panel/translator"
        }
        if (CoreStore.user.status === "user") {
            status = "/cooperation"
        }
        if (CoreStore.user.status === "busy") {
            status = "/panel/translator"
        }
        return status
    }

    menu = () => (<Menu onClick={this.logOut_btn} className={"py-3 "}>
        <Menu.Item key="0">
            <Link href={"/panel"}>
                <a>
                    <img src={"/static/images/dashboard.svg"} width={16}/>
                    <span className={"mx-2 menu-item"}>مشاهده حساب کاربری</span>
                </a></Link>
        </Menu.Item>
        <Menu.Item key="2">
            <Link href={"/panel/project"}>
                <a>
                    <img src={"/static/images/project.svg"} width={16}/>
                    <span className={"mx-2 menu-item"}>پروژه های فعال</span>
                </a></Link>
        </Menu.Item>
        <Menu.Item key="3">
            <Link href={"/notification"}>
                <a>

                    <img src={"/static/images/bell.svg"} width={16}/>
                    <span className={"mx-2 menu-item"}>اعلانات</span>
                    <Badge count={this.notiStore.notifications} overflowCount={10}/>

                </a></Link>
        </Menu.Item>
        <Menu.Item key="1">
            <Link href={"/cart"}>
                <a>
                    <img src={"/static/images/cart.svg"} width={16}/>
                    <span className={"mx-2 menu-item"}>سبد خرید</span>
                </a></Link>
        </Menu.Item>
        <Menu.Item key="4">
            <img src={"/static/images/logout.svg"} width={16}/>
            <span className={"mx-2 menu-item"}>خروج</span>
        </Menu.Item>
    </Menu>);

    render() {
        const {t, CoreStore, router: {pathname}} = this.props;


        return (
            <>
                <Affix offsetTop={0}>
                    <header>
                        <div className=" ">
                            <div className="pt-3 px-4">
                                <div className="row align-items-center py-2 ">
                                    <div className="col-8 p-0 ">
                                        <div className="d-flex align-items-center">
                                            <div className="mx-2">
                                                <Link href={"/"}><a>
                                                    <div className="d-flex align-items-center ">
                                                        <div className={"d-flex align-items-center logo-box"}>
                                                            <img src="/static/images/logo.svg" width="55" alt={"logo"}/>
                                                        </div>
                                                    </div>
                                                </a></Link>
                                            </div>
                                            <nav className="d-none d-md-flex navbar navbar-expand-lg ">
                                                <div className="collapse navbar-collapse" id="navbarNav">
                                                    <ul className="navbar-nav">
                                                        <li className="nav-item ">
                                                            <Link href={"/home"}>
                                                                <a className={`nav-link ${pathname === "/home" && "nav-link-active"}`}>صفحه
                                                                    اصلی </a>
                                                            </Link>
                                                        </li>
                                                        <li className="nav-item dropdown">
                                                            <Dropdown overlay={this.serviceList()} trigger={['click']}>
                                                                <a
                                                                    className={`ant-dropdown-link nav-link  nav-link ${pathname === "/service" && "nav-link-active"}`}
                                                                    onClick={e => e.preventDefault()}> خدمات <DownOutlined
                                                                    className={"menu-arrow"}/>
                                                                </a>
                                                            </Dropdown>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link href={"/prices"}>
                                                                <a className={`nav-link ${pathname === "/prices" && "nav-link-active"}`}>تعرفه
                                                                    ها</a>
                                                            </Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link href={"/blog"}>
                                                                <a className={`nav-link ${pathname === "/blog" && "nav-link-active"}`}>وبلاگ</a>
                                                            </Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link href={"/shop"}>
                                                                <a className={`nav-link ${pathname === "/shop" && "nav-link-active"}`}>فروشگاه</a>
                                                            </Link>
                                                        </li>
                                                        <li className="nav-item dropdown">
                                                            <Dropdown overlay={this.guideList()} trigger={['click']}>
                                                                <a
                                                                    className={`ant-dropdown-link nav-link  nav-link ${(pathname === "/guide" || pathname === "/questions") && "nav-link-active"}`}
                                                                    onClick={e => e.preventDefault()}> راهنما <DownOutlined
                                                                    className={"menu-arrow"}/>
                                                                </a>
                                                            </Dropdown>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link href={"/hired"}>
                                                                <a className={`nav-link ${pathname === "/hired" && "nav-link-active"}`}>همکاری
                                                                    با ما</a>
                                                            </Link>
                                                        </li>
                                                        <li className="nav-item dropdown ">
                                                            <Dropdown overlay={this.contactList()} trigger={['click']}>
                                                                <a
                                                                    className={`ant-dropdown-link nav-link  nav-link ${(pathname === "/contact" || pathname === "/about") && "nav-link-active"}`}
                                                                    onClick={e => e.preventDefault()}> ارتباط با
                                                                    ما <DownOutlined
                                                                        className={"menu-arrow"}/>
                                                                </a>
                                                            </Dropdown>

                                                        </li>

                                                    </ul>
                                                </div>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="col-4 p-0 ">


                                        <div className="d-flex align-items-center justify-content-end">
                                            <MediaQuery minWidth={488}>
                                                <Link href={"/select"}><a>
                                                    <Button className={"OrderBtn"}>{t("btn.deal")}</Button>
                                                </a></Link>
                                            </MediaQuery>


                                            {CoreStore.isAuth === 1 ? <>


                                            <MediaQuery maxWidth={960}>
                                                <div className=" username-btn d-flex align-items-center px-3 pointer" onClick={()=> this.props.CoreStore.setVal("panel_open",true)}>
                                                    <UserOutlined style={{fontSize: '20px'}}/>
                                                    <span className={"username px-1"}>
                    <Badge count={this.notiStore.notifications} overflowCount={10}>
                        {CoreStore.user.full_name}
                    </Badge>
                    </span>
                                                    <CaretDownOutlined/>
                                                </div>

                                            </MediaQuery>
                                            <MediaQuery minWidth={960}>
                                                <Dropdown overlay={this.menu} trigger={['click']} className={"cursor"}>
                                                    <div className=" username-btn d-flex align-items-center px-3">
                                                        <UserOutlined style={{fontSize: '20px'}}/>
                                                        <span className={"username px-1"}>
                    <Badge count={this.notiStore.notifications} overflowCount={10}>
                        {CoreStore.user.full_name}
                    </Badge>
                    </span>
                                                        <CaretDownOutlined/>
                                                    </div>
                                                </Dropdown>
                                            </MediaQuery>
                                            </>: <div className={'px-3'}>
                                                    <Link href={"/login"}><a>
                                                        <Button icon={<UserOutlined className={"mb-1"}/>}
                                                                className={"d-flex align-items-center sample-btn radius"}>{t("btn.login")}</Button>
                                                    </a></Link>
                                                </div>}

                                            <MediaQuery minWidth={488}>
                                                <div className="d-flex flex-column pr-3 border-right  ">
                                                    <span className="muted-title ">شماره تماس </span>
                                                    <span className="sub-title">021-32589887</span>
                                                </div>

                                                <div className="px-2">
                                                    <img src="/static/images/contact.svg" width="36" alt={"contact"}/>
                                                </div>
                                            </MediaQuery>
                                            <MediaQuery maxWidth={488}>
                                                <div className="px-2">
                                                    <a href={"tel:02132589887"}>
                                                        <img src="/static/images/contact.svg" width="36"
                                                             alt={"contact"}/>
                                                    </a>
                                                </div>
                                            </MediaQuery>

                                        </div>
                                    </div>
                                </div>

                                {/*   <div className="row align-items-center py-2 ">
              <div className="col-12 col-md-6 ">
                <div className="d-flex justify-content-center justify-content-md-start align-items-center">
                  <div className="">
                    <Link href={"/"}><a>
                      <div className={"d-flex align-items-center"}>
                        <img src="/static/images/logo.svg" width="55" alt={"logo"}/>

                        <div className=" d-flex flex-column px-2 ">
                          <span className="logo-title2">لوتوس نویسه</span>
                        </div>
                      </div>
                    </a></Link>
                  </div>


                </div>

              </div>

              <div className="col-12 col-md-6 d-none d-md-flex justify-content-end align-items-center">


                {CoreStore.isAuth === 1 ? <Dropdown overlay={this.menu} trigger={['click']} className={"cursor"}>
                  <div className=" username-btn d-flex align-items-center px-3">
                    <UserOutlined style={{ fontSize: '20px'}}/>
                    <span className={"username px-1"}>
                    <Badge count={this.notiStore.notifications} overflowCount={10}>
                        {CoreStore.user.full_name}
                    </Badge>
                    </span>
                    <CaretDownOutlined/>
                  </div>
                </Dropdown> : <div className={'px-3'}>
                  <Link href={"/login"}><a>
                    <Button icon={<UserOutlined className={"mb-1"}/>}
                            className={"d-flex align-items-center sample-btn radius"}>{t("btn.login")}</Button>
                  </a></Link>
                </div>}


                <div className="d-flex flex-column pr-3 border-right  ">
                  <span className="muted-title ">شماره تماس </span>
                  <span className="sub-title">021-32589887</span>
                </div>
                <div className="px-2">
                  <img src="/static/images/contact.svg" width="36" alt={"contact"}/>
                </div>
              </div>
            </div>


            <nav className="d-none d-md-flex navbar navbar-expand-lg ">
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item ">
                    <Link href={"/home"}>
                      <a className={`nav-link ${pathname === "/home" && "nav-link-active"}`}>صفحه اصلی </a>
                    </Link>
                  </li>


                  <li className="nav-item dropdown">
                    <Dropdown overlay={this.serviceList()} trigger={['click']}>
                      <a className={`ant-dropdown-link nav-link  nav-link ${pathname === "/service" && "nav-link-active"}`}  onClick={e => e.preventDefault()}> خدمات <DownOutlined
                        className={"menu-arrow"}/>
                      </a>
                    </Dropdown>
                  </li>


                  <li className="nav-item">
                    <Link href={"/prices"}>
                      <a className={`nav-link ${pathname === "/prices" && "nav-link-active"}`}>تعرفه ها</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={"/blog"}>
                      <a className={`nav-link ${pathname === "/blog" && "nav-link-active"}`}>وبلاگ</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={"/shop"}>
                      <a className={`nav-link ${pathname === "/shop" && "nav-link-active"}`}>فروشگاه</a>
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <Dropdown overlay={this.guideList()} trigger={['click']}>
                      <a className={`ant-dropdown-link nav-link  nav-link ${(pathname === "/guide" || pathname === "/questions") && "nav-link-active"}`}  onClick={e => e.preventDefault()}> راهنما <DownOutlined
                        className={"menu-arrow"}/>
                      </a>
                    </Dropdown>
                  </li>



                  <li className="nav-item">
                    <Link href={"/about"}>
                      <a className={`nav-link ${pathname === "/about" && "nav-link-active"}`} >درباره ما</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={"/hired"}>
                      <a className={`nav-link ${pathname === "/hired" && "nav-link-active"}`}>همکاری با ما</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={"/contact"}>
                      <a className={`nav-link ${pathname === "/contact" && "nav-link-active"}`} >ارتباط با ما</a>
                    </Link>
                  </li>

                </ul>
              </div>
              <div className="">
                <Link href={"/order"}><a>
                  <Button className={"OrderBtn"}>{t("btn.deal")}</Button>
                </a></Link>
              </div>
            </nav>*/}
                            </div>
                        </div>


                        <button className="navbar-toggler menu-btn d-block d-md-none" onClick={this.clickButton}
                                type="button"
                                data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
                                aria-expanded="false"
                                aria-label="Toggle navigation">
                            <MenuOutlined/>
                        </button>

                        <Drawer visible={this.state.visible} onClose={() => this.setState({visible: false})}>
                            <ul className="navbar-nav">
                                <li className="nav-item ">
                                    <a className="nav-link" href="#">صفحه اصلی <span
                                        className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">خدمات</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">تعرفه ها</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">وبلاگ</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">فروشگاه</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/guide">راهنما</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">ارتباط با ما</a>
                                </li>
                                <li className="nav-item p-1 d-block d-md-none">
                                    <div className="">
                                        <Link href={"/select"}><a>
                                            <Button className={"addOrder-btn"}>{t("btn.deal")}</Button>
                                        </a></Link>
                                    </div>
                                </li>
                                <li className="nav-item p-1 d-block d-md-none">
                                    <div className="">
                                        {CoreStore.isAuth === 1 ?
                                            <Link href={"/panel"}>
                                                <a>
                                                    <Button className={"sample-btn radius"}>{"صفحه کاربری"}</Button>
                                                </a>
                                            </Link>
                                            :
                                            <Link href={"/login"}><a>
                                                <Button className={"sample-btn radius"}>{t("btn.login")}</Button>
                                            </a></Link>
                                        }
                                    </div>
                                </li>
                                <li className="nav-item p-1 d-block d-md-none">
                                    <Button className={"pink-btn"}>{t("btn.teamMeat")}</Button>
                                </li>

                            </ul>
                        </Drawer>

                    </header>
                </Affix>
            </>
        );
    }
}

export default withTranslation("common")(withRouter(Header));
