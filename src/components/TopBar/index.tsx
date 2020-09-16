import React from 'react'
import './index.scss'
import CloudIcon from './assets/cloud-36dp.svg'
import DownloadIcon from './assets/dw-36dp.svg'

export default function TopBar() {

  const title:string = "Markdown Editor";

  const onCloudClick = function (event: Object) {
    const e = {...event};
    console.log(e);
  }

  const onDwClick = function (event: Object) {
    const e = {...event};
    console.log(e);
  }

  return (
    <div className="heading">
      <div className="heading-text">
        <span>{title}</span>
      </div>
      <div className="btn-bar">
        <img src={CloudIcon} title="Save to Google Drive" alt="Save to Google Drive" onClick={onCloudClick}/>
        <img src={DownloadIcon} title="Download" alt="Download" onClick={onDwClick}/>
      </div>
    </div>
  )
}