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
  const [rawText, setRawText] = useState("<!--Type something here. Markdown will be rendered to the right.-->");
  const [driveMg] = useState<DriveManager>(new DriveManager());

  const downloadFile = () => {
    let d = new Date();
    let fileName = `Markdown_${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}.md`;
    
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(rawText));    
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const saveToDrive = () => {
    if(!driveMg.isSignedIn()){
      console.log("signing in!");
      driveMg.onSignInChange((isSignedIn:any) => {
        if(isSignedIn){
          driveMg.listFiles();
        }
      });
      driveMg.signIn();
    }
    else{
      driveMg.listFiles();
    }

  };

  const onEditorKeyDown = (e: any) => {
    
    if (e.key == 'Tab') {
      e.preventDefault();
      let target = e.target;
      var start = target.selectionStart;
      var end = target.selectionEnd;
  
      // set textarea value to: text before caret + tab + text after caret
      let newText = rawText.substring(0, start) + "\t" + rawText.substring(end);
      setRawText(newText);
  
      // put caret at right position again
      target.selectionStart =  target.selectionEnd = start + 1;
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
      <Editor currentTab={currTab} rawText={rawText} rawTextCallback={setRawText} editorKeyDownCallback={onEditorKeyDown}/>
    </div>
  );
}

export default App;
