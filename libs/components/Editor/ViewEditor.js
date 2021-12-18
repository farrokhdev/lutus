import React, {Component} from 'react';
import {convertFromRaw, convertToRaw, EditorState} from "draft-js";
import dynamic from 'next/dynamic'
import "../../../public/static/css/react-draft-wysiwyg.css"
import {Button, message} from 'antd'

// import {convertToHTML} from 'draft-convert';
// import draftToHtml from 'draftjs-to-html';


const Editor = dynamic(() => {
    return import('react-draft-wysiwyg').then(mod => mod.Editor)
  }, {ssr: false}
)

let initialValue = {
  "blocks": [{
    "key": "7fcf5",
    "text": "fsdfsdfsdf",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": []
  }, {
    "key": "9uhd9",
    "text": 'null',
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": []
  }, {
    "key": "24m6u",
    "text": 'null',
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": []
  }, {
    "key": "ebopa",
    "text": "dsffsdf",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": []
  }, {
    "key": "55bpg",
    "text": 'null',
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": []
  }, {
    "key": "6nce0",
    "text": 'null',
    "type": "atomic",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [{"offset": 0, "length": 1, "key": 0}],
    "data": []
  }, {
    "key": "e6u5b",
    "text": 'null',
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": []
  }],
  "entityMap": [{
    "type": "IMAGE",
    "mutability": "MUTABLE",
    "data": {
      "src": "http:\/\/192.168.1.10\/projects\/dana\/public\/storage\/content\/6171441331621511030763207134.jpg",
      "height": "auto",
      "width": "auto"
    }
  }]
}

class ViewEditor extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.value)
    return
    console.log(JSON.parse(this.props.value))
    console.log(initialValue)
    initialValue = JSON.parse(JSON.stringify(JSON.parse(this.props.value)).replace(/\:null/gi, "\:\"\""));
    const contentState = convertFromRaw(initialValue);
    let editorStatewithContent = EditorState.createWithContent(contentState);


    this.state = {
      editorState: editorStatewithContent,
      contentState,
      responseContent: EditorState.createEmpty(),
    };
  }


  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };


  uploadImageCallBack = (file) => {
    const {apiRoot} = routerList()._customConfig
    const {_apiEndpoint} = routerList().jsonImageUpload
    const {Authorization} = routerList()._customConfig.headers

    return new Promise(
      (resolve, reject) => {
        try {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', apiRoot + _apiEndpoint);
          xhr.setRequestHeader('Authorization', Authorization);
          const data = new FormData();
          data.append('file', file);
          xhr.send(data);
          xhr.addEventListener('load', () => {

            if (xhr.responseText) {
              if (xhr.responseText && JSON.parse(xhr.responseText).code == 422) {
                message.error(JSON.parse(xhr.responseText).data.errors[0])
                throw JSON.parse(xhr.responseText)
              } else if (!JSON.parse(xhr.responseText).file) {
                message.error('متاسفانه خطایی رخ داده است')
                throw xhr.responseText
              }
            }

            const response = JSON.parse(xhr.responseText);
            resolve({data: {link: response.file.url}});
          });
          xhr.addEventListener('error', () => {
            const error = JSON.parse(xhr.responseText);
            reject(error);
          });
        } catch (e) {
          console.log(e)
        }
      }
    );
  }


  submitToServer = () => {
    const data = {}
    data.content = convertToRaw(this.state.editorState.getCurrentContent())
    DataService.sendData(data, 'jsonSave', (res) => {
      const translateToEditor = EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.item.content)))
      this.setState({
        responseContent: res.data.item.content,
        editorState: translateToEditor,
      })
    }, (err) => {
    })
  }

  render() {
    const {editorState} = this.state;
    return <div className='editor' style={{direction: "ltr"}}>

      <Editor
        editorState={editorState}
        toolbarHidden={true}
        readOnly
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'textAlign', 'colorPicker', 'link', 'emoji', 'history'],
          //
          // image: {
          //   uploadCallback: this.uploadImageCallBack, urlEnabled: true,
          //   uploadEnabled: true,
          // },
        }}
      />
    </div>
  }
}


export default ViewEditor