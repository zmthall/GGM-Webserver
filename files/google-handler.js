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
            keyFile: this.keyFile,
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

    async dataParse(data, files, fileNames) {
        let parsedData = {}
        for(const el in data) {
            parsedData.status = 'New'
            parsedData.submission_date = data.date
            parsedData.position = data['full-position-name']
            if(el !== 'date' && el !== 'captcha' && el !== 'full-position-name' && el !== 'position') {
                if(!parsedData.name && (el === 'first_name' || el === 'last_name')) {
                    parsedData.name = `${data.first_name} ${data.last_name}`
                    delete data.first_name
                    delete data.last_name
                } else {
                    if(el === 'mvr_radio') {
                        parsedData['mvr'] = ''
                        parsedData['drivers-license'] = ''
                        if(fileNames.includes('mvr') || fileNames.includes('drivers-license')) {
                            for(const value of files) {
                                if(value.fieldname !== 'resume')
                                    parsedData[value.fieldname] = await this.uploadDrive(value)
                            }
                        }
                    } else {
                        parsedData[el] = data[el]
                    }
                }

            }
        }
        parsedData['resume'] = ''
        if(fileNames.includes('resume')) {
            for(const value of files) {
                if(value.fieldname === 'resume') {
                    parsedData[value.fieldname] = await this.uploadDrive(value)
                }
            }
        } 
        return parsedData
    }

    getFileNames(files) {
        const fileNames = []
        if(files.length > 0) {
            for(const idx in files) {
                fileNames.push(files[idx].fieldname)
            }
        }

        return fileNames.join(', ')
    }

    fromObjtoArr(obj) {
        const newArr = []
        for(const value in obj) {
            newArr.push(obj[value])
        }

        return newArr
    }

    async pushSheetsData(data, sheet = 'Sheet1') {
        const googleSheets = google.sheets({version: 'v4', auth: await this.getSheetsAuth()});
        const resource = { values: [this.fromObjtoArr(data)] };

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