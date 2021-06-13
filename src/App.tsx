import React, {useEffect, useState} from 'react'
import TopBar from './components/TopBar'
import PanelSelector from './components/PanelSelector'
import Editor from './components/Editor'
import './App.css';
import { loadGoogleScript } from './util/GoogleScriptLoad';
import { DriveManager } from './util/DriveManager';
import useDebounce from './util/DebounceHook';

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
  const [rawText, setRawText] = useState("<!--Type something here. Markdown will be rendered to the right.-->");
  const [driveMg] = useState<DriveManager>(new DriveManager());
  const [currName, setCurrName] = useState("");
  const [fileStatus,setFileStatus] = useState("");

  const debouncedText = useDebounce(rawText,5000);

  driveMg.onFileSync = () => {
    if(driveMg.sync){
      setFileStatus(`(Syncing to ${getFileName()}. Last saved at ${driveMg.lastSyncTime})`);
    }
  };

  const downloadFile = () => {
    let fileName = getFileName();
    
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(rawText));    
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const getFileName = () => {
    if(currName == ""){
      let d = new Date();
      let fileName = `Markdown_${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}_${Math.floor(Math.random()*10000)}.md`;
      setCurrName(fileName);
      return fileName;
    }
    else return currName;
  };

  const saveToDrive = () => {
    if(!driveMg.isSignedIn()){
      console.log("signing in!");
      driveMg.onSignInChange((isSignedIn:any) => {
        if(isSignedIn){
          driveMg.uploadFile(getFileName(),rawText);
        }
      });
      driveMg.signIn();
    }
    else{
      driveMg.uploadFile(getFileName(),rawText);
    }

  };

  useEffect(() => {
    if(driveMg.sync && driveMg.fileId != ""){
      driveMg.uploadFile(getFileName(),debouncedText);
    }
  },[debouncedText]);

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

  useEffect(() => {
    
  },[rawText])

  return (
    <div className="App">
      <TopBar download={downloadFile} saveGDrive={saveToDrive} statusTxt={fileStatus}/>
      <PanelSelector tabChangeCallback={setCurrTab} currentTab={currTab}/>
      <Editor currentTab={currTab} rawText={rawText} rawTextCallback={setRawText} />
    </div>
  );
}

export default App;
