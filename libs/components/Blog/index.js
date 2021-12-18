import React, {Component} from 'react';
import {observer} from "mobx-react";
import Link from "next/link"


@observer
class BlogItem extends Component {


  render() {
    const {item} = this.props

    return (
      < >
        <Link href={`blog/${item.slug}/${item.id}`}>
          <a>
            <div className="blog-item position-relative my-4 radius ">
              <div className={" "}>
                <img src={item.image} width={"100%"} height={350} className={"blog-image radius "}/>
              </div>
              <div className="title-image">
                <h5 className="text-white ">{item.title}</h5>
                <div className="d-flex mt-3">
                  <span className="text-white ">{item.created_at}</span>
                  <sapn className="text-white px-2">{item.categories.length > 0 && item.categories[0].title}</sapn>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </>
    );
  }
}

export default BlogItem;