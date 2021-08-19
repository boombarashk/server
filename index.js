const cfg = require('./config.json')
const http = require('http');
const express = require('express');
const {appData, initializeSheets} = require("./utils");

require('dotenv').config()

const app = express()
const server = http.createServer(app);

server.listen(port = cfg.serverport, cfg.serverhost, () => {
    console.log(`server is listening port ${port}`)
})

initializeSheets()

app.all('/ranges',( req,res, next ) => {
    res.send( appData.rangeTitle.length ? appData.rangeTitle : 'Loading..' );
    next()
})

app.all('/categories',( req,res, next ) => {
    res.send( appData.categotiesTitle.length ? appData.categotiesTitle : [] );
    next()
})
