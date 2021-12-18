import React, {Component} from 'react'
import {routerList} from "../../api/Connector";
import EditorJs from 'react-editor-js';
import Header from '@editorjs/header'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
// import Marker from '@editorjs/marker'


export default class EditorCore extends Component {


  constructor(props) {
    super(props);
  }

  state = {
    value: ""
  }

  async handleSave() {
    const savedData = await this.editorInstance.save();
  }

  componentDidMount() {
    this.editorInstance // access editor-js
  }

  render() {
    const ColorPlugin = require('editorjs-text-color-plugin');
    const EDITOR_JS_TOOLS = {
      table: Table,
      paragraph: Paragraph,
      list: List,
      header: {
        class: Header,
        config: {
          placeholder: 'Enter a header',
          levels: [2, 3, 4],
          defaultLevel: 3
        }
      },
      image: {
        class: Image,
        config: {
          additionalRequestHeaders: routerList().config().headers,
          captionPlaceholder: "متن زیر تصویر",
          buttonContent: "انتخاب فایل",
          field: "file",
          endpoints: {
            byFile: routerList().config().apiRoot + 'content/upload', // Your backend file uploader endpoint
            byUrl: routerList().config().apiRoot + 'content/imageUrl', // Your endpoint that provides uploading by Url

          }
        }
      },
      linkTool: {
        class: LinkTool,
        config: {
          additionalRequestHeaders: routerList().config().headers,
          endpoint: routerList().config().apiRoot + 'tools/fetchUrl', // Your backend endpoint for url data fetching
        }
      },
      Color: {
        class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
        config: {
          colorCollections: ['#FF1300','#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
          defaultColor: '#FF1300',
          type: 'text',
        }
      },
      // Marker: {
      //   class: Marker, // if load from CDN, please try: window.ColorPlugin
      //   config: {
      //     defaultColor: '#FFBF00',
      //     type: 'marker',
      //   }
      // },
    }

    return (
      <>
        <EditorJs holder="custom" tools={EDITOR_JS_TOOLS}
                  onChange={((e, x) => this.props.onChange(e, x))}
                  instanceRef={instance => this.editorInstance = instance}
                  data={this.props.value}
                  placeholder={this.props.placeholder}>
          <div id="custom"/>
        </EditorJs>
      </>
    )

  }


}
