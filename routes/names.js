const express = require('express');
const Ajv = require('ajv');

const router = express.Router();
const names = require('../services/names');

router.get('/nostr.json', async function (req, res, next) {
    const schema = {
        type: 'object',
        properties: {
            name: { type: 'string' }
        },
        required: []
    }

    try {
        const ajv = new Ajv();
        const valid = ajv.validate(schema, req.query);
        if (!valid) res.status(400).send(ajv.errors);

        if (req.query.name) {
            res.json(await names.getByName(req.query.name));
        } else {
            res.json(await names.getAll());
        }
    } catch (err) {
        console.error(`Error while getting names `, err.message);
        next(err);
    }
});

module.exports = router;
