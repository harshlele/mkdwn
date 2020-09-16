import React, {useState} from 'react'
import EditIcon from './assets/create-36dp.svg'
import ArticleIcon from './assets/article-36dp.svg'
import './index.scss'

export default function PanelSelector() {

    const [currentTab, setCurrTab] = useState(0);

    const onEditClick = function (event: Object) {
        setCurrTab(0);
    }

    const onArtClick = function (event: Object) {
        setCurrTab(1);
    }

    return (
        <div className="row">
            <div className={`col btn-edit ${currentTab === 0 ? 'selected' : '' }`} onClick={onEditClick}>
                <img src={EditIcon} alt="Edit"/>
            </div>
            <div className={`col btn-edit ${currentTab === 1 ? 'selected' : '' }`} onClick={onArtClick}>
                <img src={ArticleIcon} alt="Article"/>
            </div>
        </div>
    );
}

