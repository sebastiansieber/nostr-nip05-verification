const express = require('express');
const router = express.Router();
const names = require('../services/names');

/* GET NIP-05 names from database */
router.get('/paginate', async function (req, res, next) {
    try {
        res.json(await names.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting names `, err.message);
        next(err);
    }
});

router.get('/nostr.json', async function (req, res, next) {
    try {
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
