'use strict';

const CF_API_TOKEN = 'fYWO-fG_OAA-K9hO27QAO1IywNNtDCv8pbn1_yAS';
const CF_ZONE_ID = '78eb9827fedb905aaf58d6ee89c0721b';
const PORT = 86;

const express = require('express');
var cf = require('cloudflare')({
    token: CF_API_TOKEN
});

async function browseDnsRecords(id) {
    var resp = await cf.dnsRecords.browse(CF_ZONE_ID);
    return resp;
}

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/dns', async (req, res) => {
    var dns = await browseDnsRecords(CF_ZONE_ID);
    res.send(dns);
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});
