import React, {useState} from 'react'
import './index.scss'
import {Tab} from '../../App'
import showdown from 'showdown'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-solarized_dark";

interface Props{
    currentTab: Tab
    rawText: string,
    rawTextCallback(s: string) : void,
}

export default function Editor(props:Props){

    const [htmlText, setHtmlText] = useState("");

    const converter = new showdown.Converter();
    converter.setFlavor('github');

    const isEditor = function(){
        return (props.currentTab === Tab.EDITOR || props.currentTab === Tab.BOTH);
    }

    const isDoc = function(){
        return (props.currentTab === Tab.DOCUMENT || props.currentTab === Tab.BOTH);
    }

    const onTextChange = function(newVal: string){
        
        //const target = (e.target as HTMLInputElement);
        props.rawTextCallback(newVal);
        setHtmlText(converter.makeHtml(newVal));
    }

    return (
        <div className="editor">
            {/*isEditor() && <textarea className="edit" onChange={onTextChange} value={props.rawText}></textarea>*/}
            {isEditor() && 
                <div className="edit">
                    <AceEditor 
                        name="editor" 
                        mode="markdown" 
                        theme="solarized_light" 
                        onChange={onTextChange} 
                        editorProps={{}} 
                        width="100%" 
                        height="100%"
                        defaultValue={props.rawText}
                        fontSize={14.4}
                        
                    />
                </div>
            }
            {isDoc() && <div className="doc" dangerouslySetInnerHTML={{__html: htmlText}}></div>}
        </div>
    );
}