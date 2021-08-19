const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./service-account.json')

async function accessSpreadsheet(props = {}) {
    let {name, index = 0} = props
    const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_KEY)

    await doc.useServiceAccountAuth({
        client_email: credentials.client_email,
        private_key: credentials.private_key,
    });
    await doc.loadInfo();
    //console.log(`Loaded doc: ` + doc.title)

    if (!!name) {
        return doc.sheetsByTitle[name]
    } else {
        return doc.sheetsByIndex[index];
    }
}

module.exports = {
    accessSpreadsheet
}
