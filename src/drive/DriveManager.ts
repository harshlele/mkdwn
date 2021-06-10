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
            "name": fileName
        };
        let media = {
            "mimeType": "text/plain",
            "body": fileContent
        }

        this.gapi.client.drive.files.create({
            resource: metadata,
            media: media,
            fields: 'id'
        }).then((response:any) => {
            console.log(response);
        });

    }
    
    //runs callback when sign in status changes
    onSignInChange(callback: Function){
        this.gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
    }

}

