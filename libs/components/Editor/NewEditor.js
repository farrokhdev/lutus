import React, {Component} from 'react';
import {convertFromRaw, convertToRaw, EditorState} from "draft-js";
import dynamic from 'next/dynamic'
import "../../../public/static/css/react-draft-wysiwyg.css"
import {Button, message} from 'antd'

import {observer} from "mobx-react";
import draftToHtml from 'draftjs-to-html';
// import * as ContentState from "draft-js";
// import {convertFromHTML} from "czi-prosemirror/src";
import {ContentState, convertFromHTML} from 'draft-js'
import {routerList} from "../../api/Connector";
// import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';

const Editor = dynamic(() => {
        return import('react-draft-wysiwyg').then(mod => mod.Editor)
    }, {ssr: false}
)

@observer
class NewEditor extends Component {

    constructor(props) {
        super(props);
        // this.props.temptPointt

        this.props.content_text.text = EditorState.createEmpty()

        let defaultText = EditorState.createEmpty();
        if (typeof this.props.content_text.text == "string") {
            // const processedHTML = convertFromHTML(<div>{this.props.store.callBackVars[this.props.temptPointt]}</div>);
             defaultText =EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML(this.props.store.content_text.text)
                )
            );
        }

        // const processedHTML = DraftPasteProcessor.processHTML(<div>{this.props.store.callBackVars[this.props.temptPointt]}</div>);

        this.state = {
            responseContent: EditorState.createEmpty(),
            editorState: defaultText,
        };

    }

    static defaultProps = {
        onChange: () => {
        }
    }


    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
        const Edited = draftToHtml(convertToRaw(editorState.getCurrentContent()))

        this.props.content_text.text= editorState;
        const item = convertToRaw(editorState.getCurrentContent());
        // this.props.store.callBackVars[this.props.temptPointt] = item;
        this.props.content_text.text = Edited;
        this.props.onChange();
    };


    uploadImageCallBack = (file) => {
        const {apiRoot} = routerList()._customConfig
        const {_apiEndpoint} = routerList().contentUpload
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
        // console.log(this.state.editorState)
        // const data = {}
        // data.content = convertToRaw(this.state.editorState.getCurrentContent())
        // DataService.sendData(data, 'jsonSave', (res) => {
        //   const translateToEditor = EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.item.content)))
        //   // this.setState({
        //   //   responseContent: res.data.item.content,
        //   //   editorState: translateToEditor,
        //   //
        //   // })
        // }, (err) => {
        // })
    }


    render() {
        const {editorState} = this.state;

        return <div className='editor' style={{direction: "ltr"}}>

            <Editor
                editorState={editorState}

                // editorState={this.props.store.callBackVars[this.props.temptPointt]}
                // editorState={EditorState.createWithContent(this.props.store.callBackVars[this.props.temptPointt])}
                // toolbarHidden={true}
                // readOnly
                // editorState={EditorState.createWithContent(
                //     ContentState.createFromBlockArray(
                //         convertFromHTML(this.props.store.callBackVars[this.props.endPoint])
                //     )
                // )}
                handlePastedText={() => false}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                    // options: ['inline', 'blockType', 'fontSize', 'textAlign', 'colorPicker','list', 'link', 'emoji', 'image', 'history'],
                    options: ['inline', 'textAlign', 'history','list'],
                    // image: {
                    //     uploadCallback: this.uploadImageCallBack, urlEnabled: true,
                    //     uploadEnabled: true,
                    // },
                }}
            />

            {/*<Button className={'my-4'} type={'primary'} block onClick={() => this.submitToServer()}>SENT TO BACKEND</Button>*/}
        </div>
    }
}


export default NewEditor
