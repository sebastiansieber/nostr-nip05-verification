const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT name, pubkey FROM name LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getByName(name) {
    const row = await db.query(
        `SELECT name, pubkey FROM name WHERE name="${name}"`
    );

    if (row && row.length == 1) {
        var resp = JSON.parse(`{
            "names": {
                "${row[0].name}": "${row[0].pubkey}"
            }
        }`);

        return resp;
    } else {
        return {};
    }
}

async function getAll() {
    const rows = await db.query(
        `SELECT name, pubkey FROM name`
    );
    const data = helper.emptyOrRows(rows);

    let result = data.map(row => {
        return('\"' + row.name + '\": \"' + row.pubkey + '\"');
    });

    var resp = JSON.parse(`{
        "names": {
            ${result}
        }
    }`);

    return resp;
}

module.exports = {
    getMultiple,
    getByName,
    getAll
}
