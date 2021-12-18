import React, {Component} from 'react';
import {Button} from "antd";
import Link from "next/link"
import {observer} from "mobx-react"


@observer
class TollBarBtn extends Component {

  constructor(props) {
    super(props);
  }

  state = {show: false}

  componentDidMount() {
    if (!this.state.show) {
      setTimeout(() => this.setState({show: true}), this.props.waiting)
    }
  }

  render() {
    const {icon, title, flag} = this.props.btn
    const href = this.props.contact[flag]
    return (
        this.state.show && <div className={"col"}>
        <div className="toolbar-btn py-2">
          <Link href={href ? href : ''}><a>
            <div className={"d-flex align-items-center bg-white radius p-2"}>
              <Button type={"primary"} className={"support-btn"} icon={icon}/>
              <div className="d-flex mx-2 ">
                <span>{title}</span>
              </div>
            </div>
          </a></Link>
        </div>
      </div>

    );
  }
}

export default TollBarBtn;