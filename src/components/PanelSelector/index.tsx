import React from 'react'
import EditIcon from './assets/create-36dp.svg'
import ArticleIcon from './assets/article-36dp.svg'
import './index.scss'
import {Tab} from '../../App'

interface Props{
    currentTab: Tab
    tabChangeCallback: Function
}

export default function PanelSelector(props: Props) {

    const onEditClick = function () {
        props.tabChangeCallback(Tab.EDITOR);
    }

    const onArtClick = function () {
        props.tabChangeCallback(Tab.DOCUMENT);
    }

    return (
        <div className="row">
            <div className={`col btn-edit ${!props.currentTab ? 'selected' : '' }`} onClick={onEditClick}>
                <img src={EditIcon} alt="Edit"/>
            </div>
            <div className={`col btn-edit ${props.currentTab ? 'selected' : '' }`} onClick={onArtClick}>
                <img src={ArticleIcon} alt="Article"/>
            </div>
        </div>
    );
}

