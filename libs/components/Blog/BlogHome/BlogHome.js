import React, {Component} from 'react';
import {observer} from "mobx-react";
import Link from "next/link"


@observer
class BlogHome extends Component {


  render() {
    const {item} = this.props

    return (

      <div className="blog-home radius ">
        <div className="clearFix">
          <div className={"clearFix"}>
            <Link href={`blog/${item.slug}/${item.id}`}>
              <a className=" " href="#">
                <img src={item.image} width={"100%"} height={200}/>
              </a></Link>
          </div>
          <div className="blog-content p-2">
            <Link href={`blog/${item.slug}/${item.id}`}>
              <a className=" " href="#">
                <span className="titr-title d-block mt-2">{item.title}</span>
              </a></Link>
            <div className=" d-flex mt-3">
              <span className="sub-title-gray">{item.short_description}</span>

            </div>
          </div>
        </div>
        <Link href={`blog/${item.slug}/${item.id}`}>
          <a className=" " href="#">
            <div className="blog-link text-center py-2 ">
              <span className="">بیشتر بخوانید</span>
            </div>
          </a>
        </Link>
      </div>

    );
  }
}

export default BlogHome;