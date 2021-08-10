const cfg = require('./config.json')
const http = require('http');
const express = require('express');
const {accessSpreadsheet} = require("./spreadshead");

require('dotenv').config()

const app = express()
const server = http.createServer(app);

server.listen(port = cfg.serverport, cfg.serverhost, () => {
    console.log(`server is listening port ${port}`)
})

const appData = {
    currentSheet: null,
    rangeTitle: [],
    categotiesTitle: []
}

accessSpreadsheet('2021').then(async sheet => {
    appData.currentSheet = sheet
    appData.rangeTitle = await sheet.getCellsInRange('B1:M1')
    //const dataRows = await sheet.getRows()
})

app.all('/ranges',( req,res, next ) => {
    res.send( appData.rangeTitle.length ? appData.rangeTitle : 'Loading..' );
    next()
})
