/*
    driveGet nos vincula a la API de Google Drive, específicamente para recuperar info de un archivo en la nube.

    Requisitos:
        'fileId' recibe un JSON con el ID del archivo en Google Drive, con la siguiente estructura:
        fileId = {
				fileId: 'ID_del_archivo',
			};
    Retorno:
            
*/

import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

const CLIENT_ID = "167372284070-oh5osjpqppqd8muhdliu12g7g1jvv185.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/";

const REFRESH_TOKEN = "1//044c4hCTqSL8nCgYIARAAGAQSNwF-L9Irhz2CcKr_MCz97jygqMpTe7_JAKSryviM2TEcU_KTikK9Yvpy27q7pa83nbxehWt9S-4";
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

export async function getFile(fileId) {
    try {
        const response = await drive.files.get({
            'fileId': fileId
        });

        /************ probando cosas ************/
        
        console.log("Mi FileID: " + fileId);
        console.log("Mi Response: " + JSON.stringify(response));
        console.log('Título: ' + response.title);
        console.log('Descripción: ' + response.description);
        console.log('MIME type: ' + response.mimeType);
        console.log('Link para compartir: ' + response.webViewLink);

        /************ probando cosas ************/

        return (response.data);
    } catch (error) {
        console.log(error);
        return (error);
    }
}

// Recibiendo info
export const post = async (request) => {
    const fileId = JSON.parse(request.body);
    console.log(request.body);
    // console.log('Request Jasoneado: ' + fileData.fileName);
    return getFile(fileId);
}