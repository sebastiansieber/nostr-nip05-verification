'use strict';

const CF_API_TOKEN = 'fYWO-fG_OAA-K9hO27QAO1IywNNtDCv8pbn1_yAS';
const CF_ZONE_ID = '78eb9827fedb905aaf58d6ee89c0721b';
const PORT = 86;
const SERVER_IP = "138.2.91.189";

const express = require('express');
//const cors = require('cors');

var cf = require('cloudflare')({
    token: CF_API_TOKEN
});

async function browseDnsRecords(zone_id) {
    var resp = await cf.dnsRecords.browse(zone_id);
    return resp;
}

async function addDnsRecord(zone_id, dns_record) {
    var resp = await cf.dnsRecords.add(zone_id, dns_record);
    return resp;
}

async function delDnsRecord(zone_id, dns_id) {
    var resp = await cf.dnsRecords.del(zone_id, dns_id);
    return resp;
}

const app = express();
//app.use(cors());
//app.options('*', cors());

app.get('/', (req, res) => {
    //var v = process.env.CF_API_TOKEN + " : " + process.env.CF_API_TOKEN;
    res.send("Hello world!");
});

app.get('/.well-known/nostr.json', async (req, res) => {
    var resp = JSON.parse(`
    {
        "names": {
        "sebastian": "c61ca1ee4f85a8d0733a07434fd460602da9345abf9a0592a0a5948f16dd3c5e",
        "marcelo": "339db62c91c8cfa8f085f89f115f1ad95df10ce749730239b6054d2453332908"
    }
    }`);
    res.send(resp);
});

app.get('/dns', async (req, res) => {
    var dns = await browseDnsRecords(CF_ZONE_ID);
    res.send(dns);
});

app.get('/add-dns-record', async (req, res) => {
    var dns_record = Object();
    dns_record.type = "A";
    dns_record.name = "test.relay.red";
    dns_record.content = SERVER_IP;
    dns_record.proxied = true;
    dns_record.ttl = 1;

    var dns = await addDnsRecord(CF_ZONE_ID, dns_record);

    res.send(dns);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});
