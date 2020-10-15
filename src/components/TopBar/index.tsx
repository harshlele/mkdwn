import React from 'react'
import './index.scss'
import CloudIcon from './assets/cloud-36dp.svg'
import DownloadIcon from './assets/dw-36dp.svg'

interface Props{
  download() : void,
  saveGDrive(): void
}

export default function TopBar(props: Props) {

  const title:string = "Markdown Editor";

  const onCloudClick = function (event: React.SyntheticEvent) {
    props.saveGDrive();
  }

  const onDwClick = function (event: React.SyntheticEvent) {
    props.download();
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