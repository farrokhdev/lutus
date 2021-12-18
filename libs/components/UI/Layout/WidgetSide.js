import React, {Component} from 'react';
import {observer} from "mobx-react";
import Link from "next/link";

@observer
class WidgetSide extends Component {

  state = {
    title: ""
  }


  showSubMenu = (title) => {
    const {item, handleActive} = this.props
    if (item.subMenu) {
      document.getElementById(item.title).style.display === "block" ? document.getElementById(item.title).style.display = "none" : document.getElementById(item.title).style.display = "block"

    }
    handleActive(item.title, item.icon)
  }


  render() {
    const {item, query, active, handleActive} = this.props
    return (
      <>
        {item.link ? <Link href={item.link}><a>
            <div id={item.icon}
                 className={`cursor ${query.tab === item.link || active === item.title ? 'widget-selected' : "widget"}`}
                 onClick={this.showSubMenu}>
              <div className="icon-widget ">
                <div
                  className={`d-flex align-items-center justify-content-center ${query.tab === item.link ? 'icon-box-selected' : ' icon-box'} `}>
                  <img src={`/static/images/${item.icon}.svg`} width={18}/>
                </div>
              </div>
              <div className="">
                <span className={`${query.tab === item.link ? "pink-title" : "sub-title"}`}>{item.title}</span>
              </div>
              <div className="icon-widget">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path id={`${query.tab === item.link ? 'arrow-selected' : 'arrow'}`}
                        d="M6.59448 11.405L1.83008 6.64062L6.59448 1.87622" stroke="#C4C4C4"
                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div id={item.title} style={{display: "none"}}>
              {item.subMenu && item.subMenu.map((sub, index) => {
                return <Link href={sub.link} key={index}><a>
                  <div className="subMenu " onClick={() => handleActive(item.title, item.icon)}>
                    <div className="">
                      <span className={`${query.tab === item.link ? "pink-title" : "sub-title"}`}>{sub.title}</span>
                    </div>
                  </div>
                </a></Link>
              })}
            </div>
          </a></Link> :
          <>
            <div id={item.icon}
                 className={`cursor ${query.tab === item.link || active === item.title ? 'widget-selected' : "widget"}`}
                 onClick={this.showSubMenu}>
              <div className="icon-widget ">
                <div
                  className={`d-flex align-items-center justify-content-center ${query.tab === item.link ? 'icon-box-selected' : ' icon-box'} `}>
                  <img src={`/static/images/${item.icon}.svg`} width={18}/>
                </div>
              </div>
              <div className="">
                <span className={`${query.tab === item.link ? "pink-title" : "sub-title"}`}>{item.title}</span>
              </div>
              <div className="icon-widget">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path id={`${query.tab === item.link ? 'arrow-selected' : 'arrow'}`}
                        d="M6.59448 11.405L1.83008 6.64062L6.59448 1.87622" stroke="#C4C4C4"
                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div id={item.title} style={{display: "none"}}>
              {item.subMenu && item.subMenu.map((sub, index) => {
                return <Link href={sub.link} key={index}><a>
                  <div className="subMenu " onClick={() => handleActive(item.title, item.icon)}>
                    <div className="">
                      <span className={`${query.tab === item.link ? "pink-title" : "sub-title"}`}>{sub.title}</span>
                    </div>
                  </div>
                </a></Link>
              })}
            </div>
          </>}
      </>
    );
  }

}

export default WidgetSide;