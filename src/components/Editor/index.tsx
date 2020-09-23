import React, {useState} from 'react'
import './index.scss'
import {Tab} from '../../App'
import showdown from 'showdown'

interface Props{
    currentTab: Tab
}

export default function Editor(props:Props){

    const [rawText, setRawText] = useState("");
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
        setRawText(e.target.value);
        setHtmlText(converter.makeHtml(rawText));
    }

    return (
        <div className="editor">
            {isEditor() && <textarea className="edit" onChange={onTextChange} value={rawText}></textarea>}
            {isDoc() && <div className="doc" dangerouslySetInnerHTML={{__html: htmlText}}></div>}
        </div>
    );
}