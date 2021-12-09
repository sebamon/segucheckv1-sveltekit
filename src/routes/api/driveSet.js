/*
    driveSet nos vincula a la API de Google Drive, específicamente para almacenar un archivo en la nube.

    Requisitos:
        'fileData' recibe un JSON con la siguiente estructura:
        fileData = {
				fileName: 'nombre_del_archivo',
				fileExtension: 'extensión_del_archivo'
			};

    Opciones:
            'folderId' recibe un ID de directorio de Google Drive. Si no se envía un id, la carpeta por defecto será 'segucheck/profile-pics'.
                        Si se envía un ID erróneo, el archivo se almacenará en el directorio raíz.

    Retorno:
            Se devuelve la información de la carga en 'response.data', que contiene los atributos para la identificación del archivo.
            Ejemplo:
                "data":{
                    "kind":"drive#file",
                    "id":"1Zc8sDbwpDbEIpv0s4wV_Cp4mlaxrDF8V", // identificador del archivo en GDrive
                    "name":"2d8fac05-6d5f-4a60-b58a-dbcf2da3aacf.jpeg",
                    "mimeType":"image/jpeg"
                }
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

export async function uploadFile(fileData,folderId = '1yOmEFValOaKQz6BoMjSvmhk7dE8qnTBx') {
    console.log('entrando a uploadFile endpoint ')
    console.log('con fileData', fileData)
    console.log('con folderId', folderId)
    let fileName = fileData.fileName + '.' + fileData.fileExtension;
    console.log('--->fileName', fileName)

    console.log('filesPath',fileData.filesPath)
    const staticFolder = fileData.filesPath.replace('.','static')
    console.log('staticFolder',staticFolder)
    let filePath = path.join(`${staticFolder}/`, fileName);
    console.log('filePaths',filePath)
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
        console.log('----response.data ----',response.data)
        return (response.data);
    } catch (error) {
        console.log(error);
        return (error);
    }
}

// Recibiendo info
export const post = async (request) => {
    console.log('**** driveset request',request)
    console.log('request',request.body);
    const fileData = JSON.parse(request.body);
    console.log('fileData',fileData);
    // const fileData = request.body;
    console.log('Request Jasoneado: ' + fileData.fileName);
    const upload=  uploadFile(fileData)


    console.log('upload',upload)
    return {
        body: {
            upload
        }
    }
}