import React, {useState} from 'react';
import './index.scss'

export default function TopBar() {

  const title:string = "Markdown Editor";

  return (
    <div className="heading">
      <div className="heading-text">
        <span>{title}</span>
      </div>
      <div className="btn-bar">
        buttons
      </div>
    </div>
  )
}