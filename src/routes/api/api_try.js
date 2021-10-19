const { google } = require('googleapis');
const credentials = require('../../../credentials.json');
const scopes = ['https://www.googleapis.com/auth/drive'];
const auth = new google.auth.JWT(credentials.client_email, null, credentials.private_key, scopes);
const drive = google.drive({ version: 'v3', auth });

export function list_drive_files() {
    console.log("got in!");
    drive.files.list({}, (err, res) => {
        if (err) throw err;
        const files = res.data.files;
        if (files.length) {
            files.map((file) => {
                console.log(file);
            });
        } else {
            console.log('No files found');
        }
    });
}
export const get = async () =>{

    console.log('entro a api_try GET')
    return {
        body : 
        {
            mensaje: 'hola get',
        }
    }
}
export const post = async (request)=> {

    
    console.log('entro a api_try POST: request',request)
    return {
        body :'hola post'
    }
}
