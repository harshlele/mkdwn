import dotenv from "dotenv";

export class DriveManager{
    gapi:any;
    static discoveryDocs:Array<String> = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
    static scopes:String = "https://www.googleapis.com/auth/drive";
    sync:boolean = false;
    fileId:String = "";
    lastSyncTime:String = "";
    onFileSync:Function = () => {};

    init(){
        dotenv.config();
        this.gapi = (window as any).gapi;
        this.gapi.load('client:auth2', () => {

            this.gapi.client.init({
                clientId: process.env.REACT_APP_CID,
                discoveryDocs: DriveManager.discoveryDocs,
                scope: DriveManager.scopes
            }).then(() => {
                console.log("client init!");
            }, (error:any) => {
                console.log("client init: ",error);
            });

        });
    }

    isSignedIn(){
        return this.gapi.auth2.getAuthInstance().isSignedIn.get();
    }

    signIn(){
        this.gapi.auth2.getAuthInstance().signIn();
    }

    signOut(){
        this.gapi.auth2.getAuthInstance().signOut();
    }

    listFiles(){
        if(!this.isSignedIn()) return;

        this.gapi.client.drive.files.list({
            'pageSize': 10,
            'fields': "nextPageToken, files(id, name)"
          }).then((response:any) => {
            console.log(response);
            console.log('Files:');
            var files = response.result.files;
            if (files && files.length > 0) {
              for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log(file.name + ' (' + file.id + ')');
              }
            } else {
              console.log('No files found.');
            }
          });
        
    }

    uploadFile(fileName: String,fileContent: String){
        if(!fileName) return;
        let metadata = {
            "name": fileName,
            "mimeType": "text/plain",
        };
        
        const boundaryStr = "drive_upload";
        const delimiter = `\n--${boundaryStr}\n`;
        const end_delim = `\n--${boundaryStr}--`; 

        let body = delimiter 
                + 'Content-Type: application/json; charset=UTF-8\n\n'
                + JSON.stringify(metadata)
                + delimiter
                + `Content-Type: text/plain\n\n`
                + `${fileContent}\n`
                + end_delim;

        let method = "POST";

        if(this.sync){
            method = "PATCH";
            (metadata as any).id = this.fileId;
        }

        let request = this.gapi.client.request({
            path: `https://www.googleapis.com/upload/drive/v3/files/${this.fileId}?uploadType=multipart`,
            method: method,
            headers:{
                "Content-Type": `multipart/related; boundary=${boundaryStr}`,
            },
            body: body
        });

        request.execute((response:any) => {
            if(response.id){
                this.fileId = response.id;
                this.sync = true;
            }
            let d = new Date;
            this.lastSyncTime = new Intl.DateTimeFormat('default',{
                                    hour12: true,
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })
                                .format(d);
            this.onFileSync();
        });
        
    }
    
    //runs callback when sign in status changes
    onSignInChange(callback: Function){
        this.gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
    }

}

