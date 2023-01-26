const db = require('./db');

async function getByName(name) {
    const sql = `SELECT name, pubkey FROM names WHERE name = ?`;

    const [result] = await db.query(sql, [name]);

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
    const sql = `SELECT name, pubkey FROM names`;

    const [result] = await db.query(sql);

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
    getByName,
    getAll
}
