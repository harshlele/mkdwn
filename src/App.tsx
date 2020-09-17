import React, {useEffect, useState} from 'react'
import TopBar from './components/TopBar'
import PanelSelector from './components/PanelSelector'
import Editor from './components/Editor'
import './App.css';

export enum Tab {EDITOR , DOCUMENT, BOTH}; 

function App() {

  const [currTab, setCurrTab] = useState(Tab.EDITOR);

  useEffect(() => {
    function resize(){
      if(window.innerWidth >= 992){
        setCurrTab(Tab.BOTH);
      }
      else{
        setCurrTab(Tab.EDITOR);
      }
    }
    
    window.addEventListener("resize",resize);

    return () => {
      window.removeEventListener("resize",resize);
    }
  });

  return (
    <div className="App">
      <TopBar />
      <PanelSelector tabChangeCallback={setCurrTab} currentTab={currTab}/>
      <Editor currentTab={currTab}/>
    </div>
  );
}

export default App;
