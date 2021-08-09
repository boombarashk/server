const cfg = require('./config.json')
const http = require('http');
const express = require('express');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./service-account.json')

require('dotenv').config()

const app = express()
const server = http.createServer(app);

server.listen(port = cfg.serverport, cfg.serverhost, () => {
    console.log(`server is listening port ${port}`)
})

async function accessSpreadsheet() {
    const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_KEY)

    await doc.useServiceAccountAuth({
        client_email: credentials.client_email,
        private_key: credentials.private_key,
    });
    await doc.loadInfo();

    console.log(`Loaded doc: ` + doc.title)
    const sheet = doc.sheetsByTitle['2021']; // or use doc.sheetsByIndex[2]
    console.log(sheet.columnCount);
}
accessSpreadsheet()
