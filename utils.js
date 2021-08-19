const {accessSpreadsheet} = require("./spreadshead");

let countCategories = 20
const RANGES = {
    CATEGORIES: `A2:A${countCategories + 1}`,
    MONTHS: 'B1:M1',
}

const CACHE = new Map()

const appData = {
    currentSheet: null,
    rangeTitle: [],
    categotiesTitle: []
}

function addCategory() {}

function addExpance() {}

function addReceipt() {}

async function getCategories(sheet) {
    return sheet.getCellsInRange(RANGES.CATEGORIES)    // sheet.getRows()
}

async function getTitlesMonths(sheet){
    return sheet.getCellsInRange(RANGES.MONTHS)
}

function initializeSheets() {
    accessSpreadsheet().then(async sheet => {
        if (sheet) {
            appData.currentSheet = sheet

            getTitlesMonths(sheet).then(result => {
                appData.rangeTitle = result
            }).catch(err => console.log(err))

            getCategories(sheet).then(result => {
                appData.categotiesTitle = result.reduce((value, names) => names.concat(value), [])
            }).catch(err => console.log(err))
        } else {
            console.error(`Sheet undefined`)
        }
    })
}

module.exports = {
    appData,
    initializeSheets,
}
