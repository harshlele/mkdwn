import React from 'react'
import './index.scss'
import CloudIcon from './assets/cloud-36dp.svg'
import DownloadIcon from './assets/dw-36dp.svg'
import LightModeIcon from './assets/light_mode_36dp.svg'
import DarkModeIcon from './assets/dark_mode_36dp.svg'



interface Props{
  download() : void,
  saveGDrive(): void,
  statusTxt: String,
}

export default function TopBar(props: Props) {

  const title:string = "Markdown Editor";

  const onCloudClick = function (event: React.SyntheticEvent) {
    props.saveGDrive();
  }

  const onDwClick = function (event: React.SyntheticEvent) {
    props.download();
  }

  const toggleTheme = (event: React.SyntheticEvent) => {
    let target = event.target;
    if(document.documentElement.classList.contains("dark")){
      document.documentElement.classList.remove("dark");
      (target as HTMLImageElement).src = DarkModeIcon; 
    }
    else{
      document.documentElement.classList.add("dark");
      (target as HTMLImageElement).src = LightModeIcon; 
    }
  };

  return (
    <div className="heading">
      <div className="heading-text">
        <span className="heading-span">
          {title}
          <small> {props.statusTxt}</small>
        </span>
        
      </div>
      <div className="btn-bar">
        <img src={DarkModeIcon} title="Dark Mode" alt="Dark Mode" onClick={toggleTheme}/>
        <img src={CloudIcon} title="Save to Google Drive" alt="Save to Google Drive" onClick={onCloudClick}/>
        <img src={DownloadIcon} title="Download" alt="Download" onClick={onDwClick}/>
      </div>
    </div>
  )
}