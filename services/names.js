//const { query } = require('./db');
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const sql = `SELECT name, pubkey FROM name LIMIT ${offset},${config.listPerPage}`;

    const [result] = await db.execute(sql);
    const meta = { page };

    return {
        result,
        meta
    }
}

async function getByName(name) {
    const sql = `SELECT name, pubkey FROM name WHERE name="${name}"`;

    const [result] = await db.execute(sql);

    if (result && result.length == 1) {
        var resp = JSON.parse(`{
            "names": {
                "${result[0].name}": "${result[0].pubkey}"
            }
        }`);

        return resp;
    } else {
        return {};
    }
}

async function getAll() {
    const sql = `SELECT name, pubkey FROM name`;

    const [result] = await db.execute(sql);

    let data = result.map(row => {
        return ('\"' + row.name + '\": \"' + row.pubkey + '\"');
    });

    var resp = JSON.parse(`{
        "names": {
            ${data}
        }
    }`);

    return resp;
}

module.exports = {
    getMultiple,
    getByName,
    getAll
}
