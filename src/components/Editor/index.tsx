import React from 'react'
import './index.scss'
import {Tab} from '../../App'

interface Props{
    currentTab: Tab
}

export default function Editor(props:Props){

    const isEditor = function(){
        return (props.currentTab === Tab.EDITOR || props.currentTab === Tab.BOTH);
    }

    const isDoc = function(){
        return (props.currentTab === Tab.DOCUMENT || props.currentTab === Tab.BOTH);
    }

    return (
        <div className="editor">
            {isEditor() && <div className="edit" contentEditable></div>}
            {isDoc() && <div className="doc"></div>}
        </div>
    );
}