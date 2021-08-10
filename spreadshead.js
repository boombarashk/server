const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./service-account.json')

async function accessSpreadsheet(name) {
    const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_KEY)

    await doc.useServiceAccountAuth({
        client_email: credentials.client_email,
        private_key: credentials.private_key,
    });
    await doc.loadInfo();
    //console.log(`Loaded doc: ` + doc.title)

    return await doc.sheetsByTitle[name]; // or use doc.sheetsByIndex[2]
}

module.exports = {
    accessSpreadsheet
}
