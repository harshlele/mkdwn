import React, {useEffect, useState} from 'react'
import TopBar from './components/TopBar'
import PanelSelector from './components/PanelSelector'
import Editor from './components/Editor'
import './App.css';
import { loadGoogleScript } from './drive/GoogleScriptLoad';
import { DriveManager } from './drive/DriveManager';

export enum Tab {EDITOR , DOCUMENT, BOTH}; 

function App() {

  let tab: Tab;
  if(window.innerWidth >= 992){
    tab = Tab.BOTH;
  }
  else{
    tab = Tab.EDITOR;
  }

  const [currTab, setCurrTab] = useState(tab);
  const [rawText, setRawText] = useState("");
  const [driveMg, setDriveMg] = useState<DriveManager>(new DriveManager());

  const downloadFile = () => {
    let d = new Date();
    let fileName = `Markdown ${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}.md`;
    
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(rawText));    
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const saveToDrive = () => {
    console.log("cloud click"); // TODO: complete this
    if(!driveMg.isSignedIn()){
      console.log("signing in!");
      driveMg.signIn();
    }

  };

  useEffect(() => {
    
    function resize(){
      let timer: NodeJS.Timeout;
      return function(){
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
          if(window.innerWidth >= 992){
            setCurrTab(Tab.BOTH);
          }
          else{
            setCurrTab(Tab.EDITOR);
          }
        }, 200);
        
      }
    }

    window.addEventListener("resize",resize);

    if(!(window as any).OnGoogleScriptLoad){
      (window as any).OnGoogleScriptLoad = function(){
        console.log("SCRIPT LOADED");
        driveMg?.init();
      }  
    }

    loadGoogleScript();

    return () => {
      window.removeEventListener("resize",resize);
    }
  },[]);

  return (
    <div className="App">
      <TopBar download={downloadFile} saveGDrive={saveToDrive}/>
      <PanelSelector tabChangeCallback={setCurrTab} currentTab={currTab}/>
      <Editor currentTab={currTab} rawText={rawText} rawTextCallback={setRawText}/>
    </div>
  );
}

export default App;
