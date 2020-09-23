import React, {useState} from 'react'
import './index.scss'
import {Tab} from '../../App'
import showdown from 'showdown'

interface Props{
    currentTab: Tab
    rawText: string,
    rawTextCallback: Function
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

    const onTextChange = function(e:any){
        props.rawTextCallback(e.target.value);
        setHtmlText(converter.makeHtml(props.rawText));
    }

    return (
        <div className="editor">
            {isEditor() && <textarea className="edit" onChange={onTextChange} value={props.rawText}></textarea>}
            {isDoc() && <div className="doc" dangerouslySetInnerHTML={{__html: htmlText}}></div>}
        </div>
    );
}