import React, {Component} from 'react'
import {routerList} from "../../api/Connector";


export default class Editor extends Component {



    getVal = () =>{

    }
    initEditor = () => {
        const EditorJS = require("@editorjs/editorjs");
        const Header = require("@editorjs/header");
        const LinkTool = require("@editorjs/link");
        // const Embed = require("@editorjs/embed");
        // const Delimiter = require("@editorjs/delimiter");
        const List = require("@editorjs/list");
        // const InlineCode = require("@editorjs/inline-code");
        // const Table = require("@editorjs/table");
        // const Quote = require("@editorjs/quote");
        // const Code = require("@editorjs/code");
        // const Marker = require("@editorjs/marker");
        // const Checklist = require("@editorjs/checklist");
        const ImageTool = require("@editorjs/image");

        let content = null;
        if (this.props.data !== undefined) {
            content = this.props.data;
        }

        this.editor = new EditorJS({
            placeholder: "متن را بنویسید",
disabled:true,
            holder: "editorjs",
            logLevel: "ERROR",
            i18n: {
                tools: {
                    image: {
                        'image': 'تصویر',
                    }
                }
            },
            tools: {
                header: Header,
                list: List,
                linkTool: {
                    class: LinkTool,
                    additionalRequestHeaders: routerList().config().headers,
                    config: {
                        endpoint: routerList().config().apiRoot + 'tools/fetchUrl', // Your backend endpoint for url data fetching
                    }
                },
                // image:Image,
                image: {
                    class: ImageTool,
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
                }

                // inlineCode: InlineCode,
                // code: Code,
                // table: Table,
                // quote: Quote,
                // marker: Marker,
                // checkList: Checklist,
                // delimiter: Delimiter,
            },

            data: content,
        });



    };

    constructor(props) {
        super(props);
        this.editor = null;
    }

    async componentDidMount() {
        this.initEditor();
    }


    render() {
        return (
            <>
                <div id={"editorjs"} onChange={(e) => this.onChange(e)}></div>
            </>
        )

    }


}
