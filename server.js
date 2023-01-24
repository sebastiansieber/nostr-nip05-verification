'use strict';
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const Ajv = require('ajv');

const db = require('./services/db');

const PORT = process.env.APP_PORT;

const app = express();
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(helmet());
app.use(cors({
    origin: '*'
}));

app.get("/.well-known/nostr.json", async (req, res) => {
    const schema = {
        type: 'object',
        properties: {
            name: { type: 'string' }
        },
        required: ['name']
    }

    try {
        const ajv = new Ajv();
        const valid = ajv.validate(schema, req.query);
        if (!valid) res.status(400).send(ajv.errors);

        if (req.query.name) {
            const sql = `SELECT name, pubkey FROM name WHERE name="${req.query.name}"`;

            const [result] = await db.execute(sql);

            if (result && result.length == 1) {
                var resp = JSON.parse(`{
                    "names": {
                        "${result[0].name}": "${result[0].pubkey}"
                    }
                }`);

                res.json(resp);
            } else {
                res.json({});
            }
        } else {
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

            res.json(resp);
        }
    } catch (err) {
        console.error(`Error while getting names `, err.message);
        next(err);
    }
});

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});
