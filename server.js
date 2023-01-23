'use strict';
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const PORT = process.env.APP_PORT;

const app = express();
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(helmet());
app.use(cors())

const namesRouter = require("./routes/names");
app.use("/.well-known", namesRouter);

/*app.get('/', (req, res) => {
    res.status(200).json({ message: "ok" });
});*/

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
