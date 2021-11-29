import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

const CLIENT_ID = "167372284070-oh5osjpqppqd8muhdliu12g7g1jvv185.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/";

const REFRESH_TOKEN = "1//04W5HNJR-YgDECgYIARAAGAQSNwF-L9IrFtQKXxRQttynaeoOc_kfOKt8fNYnI9hxx02KwUGx1-iWs1pcOrA1akiTFxcrbsqfeMc";
// const ACCESS_TOKEN = "ya29.a0ARrdaM9qu-O64M7BXkpKyng-LtpQwxcpTebcpGbfbXJT8aMeELCx5-Her2YSQ1iDZh59ulhFyNVHOCaQyrNeU4t6hI6U-yPXmsV50C84MSfoTe-9r5OKKrlyXAff6LCKfr0G42oKmOhrqV8f3r5OY_74vy0n"

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});

// const {pathname: root} = new URL('../src', import.meta.url)

export async function uploadFile(fileData, folderId = '1yOmEFValOaKQz6BoMjSvmhk7dE8qnTBx') {
    let fileName = fileData.fileName + '.' + fileData.fileExtension;
    let filePath = path.join('static/img/temp-pics/', fileName);
    try {
        let fileMetadata = {
            'name': fileName,
            parents: [folderId]
        }
        // @ts-ignore
        const response = await drive.files.create({
            media: {
                mimeType: 'image/' + fileData.fileExtension,
                body: fs.createReadStream(filePath)
            },
            resource: fileMetadata
        });
        return (response.data);
    } catch (error) {
        console.log(error);
        return (error);
    }
}

// Recibiendo info
export const post = async (request)=> {
    const fileData = JSON.parse(request.body);
    // console.log(request.body);
    // console.log('Request Jasoneado: ' + fileData.fileName);
    return uploadFile(fileData);
}