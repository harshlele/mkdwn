import React, {useState} from 'react'
import './index.scss'
import {Tab} from '../../App'
import showdown from 'showdown'

interface Props{
    currentTab: Tab
    rawText: string,
    rawTextCallback(s: string) : void,
    editorKeyDownCallback(e: any): void
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

    const onTextChange = function(e: React.SyntheticEvent){
        const target = (e.target as HTMLInputElement);
        props.rawTextCallback(target.value);
        setHtmlText(converter.makeHtml(props.rawText));
    }

    return (
        <div className="editor">
            {isEditor() && <textarea className="edit" onChange={onTextChange} value={props.rawText} onKeyDown={props.editorKeyDownCallback}></textarea>}
            {isDoc() && <div className="doc" dangerouslySetInnerHTML={{__html: htmlText}}></div>}
        </div>
    );
}