import dotenv from "dotenv";

export class DriveManager{
    gapi:any;
    discoveryDocs:Array<String> = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
    scopes:String = "https://www.googleapis.com/auth/drive"

    init(){
        dotenv.config();
        this.gapi = (window as any).gapi;
        this.gapi.load('client:auth2', () => {

            this.gapi.client.init({
                clientId: process.env.REACT_APP_CID,
                discoveryDocs: this.discoveryDocs,
                scope: this.scopes
            }).then(() => {
                console.log("client init uwu!");
            }, (error:any) => {
                console.log(error);
            });

        });
    }

}

