const { google } = require ('googleapis');
const path = require ('path');
const fs = require ('fs');

const CLIENT_ID = "167372284070-oh5osjpqppqd8muhdliu12g7g1jvv185.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/";

const REFRESH_TOKEN = "1//04QItah1Hr9-ECgYIARAAGAQSNwF-L9IrzOghnZIHksKhiMUDi9hMM0g2iVBdduF6JvGkrRZ0SG43aX1tNkjkig9MuTLGWGC8C0c";
const ACCESS_TOKEN = "ya29.a0ARrdaM9qu-O64M7BXkpKyng-LtpQwxcpTebcpGbfbXJT8aMeELCx5-Her2YSQ1iDZh59ulhFyNVHOCaQyrNeU4t6hI6U-yPXmsV50C84MSfoTe-9r5OKKrlyXAff6LCKfr0G42oKmOhrqV8f3r5OY_74vy0n"

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});

const filePath = path.join(__dirname, 'bg-hero.jpg');

async function uploadFile (fileName = 'testeoTUDW4.jpg', fileMimeType = 'image/jpg') {
    try {
        
        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                mimeType: fileMimeType
            },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(filePath)
            }            
        });
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

uploadFile("insertFunnyName.jpg");