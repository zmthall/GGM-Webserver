const { google } = require('googleapis');

class GoogleAPIHandler {
    constructor(spreadsheetId, folderId) {
        this.spreedsheetId = spreadsheetId;
        this.folderId = folderId;
        this.keyFile = 'google-cred.json'
    }


    async getSheetsAuth() {
        const auth = new google.auth.GoogleAuth({
            keyFile: this.keyFile,
            scopes: 'https://www.googleapis.com/auth/spreadsheets'
        });

        return await auth.getClient();
    }

    async getDriveAuth() {
        const auth = new google.auth.GoogleAuth({
            keyFile: 'credentials.json',
            scopes: 'https://www.googleapis.com/auth/drive'
        });

        return await auth.getClient();
    }

    async getSheetMetaData() {
        const googleSheets = google.sheets({version: 'v4', auth: await this.getSheetsAuth()});
        return await googleSheets.spreadsheets.get({
            auth: this.auth,
            spreadsheetId: this.spreedsheetId
        });
    }

    async getSheetsRows(sheet = 'Sheet1') {
        const googleSheets = google.sheets({version: 'v4', auth: await this.getSheetsAuth()});
        return (await googleSheets.spreadsheets.values.get({
            auth: this.auth,
            spreadsheetId: this.spreedsheetId,
            range: sheet
        })).data;
    }

    async pushSheetsData(name, address, dob, fileLink, sheet = 'Sheet1') {
        const googleSheets = google.sheets({version: 'v4', auth: await this.getSheetsAuth()});
        const resource = { values: [[name, address, dob, fileLink]] };

        googleSheets.spreadsheets.values.append({
            auth: this.auth,
            spreadsheetId: this.spreedsheetId,
            range: sheet,

            valueInputOption: 'USER_ENTERED',
            resource
        });
    }

    async uploadDrive(file) {
        const googleDrive = google.drive({version: 'v3', auth: await this.getDriveAuth()});
        let stream = require('stream');
        let bufferStream = new stream.PassThrough();
        
        const fileMetaData = {
            name: file.originalname,
            parents: [this.folderId]
        }

        const media = {
            mimeType: file.mimetype,
            body: bufferStream.end(file.buffer)
        }

        const response = await googleDrive.files.create({
            resource: fileMetaData,
            media,
            fields: 'id'
        });

        const metaData = await googleDrive.files.get({
            fileId: response.data.id,
            fields: 'webViewLink'
        });

        return metaData.data.webViewLink;
    }
}

module.exports = {
    GoogleAPIHandler
};