const express = require('express');
const app = express();

app.disable('etag');
app.set("view engine","ejs");
app.set("views","./views");

const PORT = 5000;

let flag = "SEE{";

app.get('/flag', (req, res) => {
    flag = req.query.flag;
    console.log(flag);
    res.send('Request received');
});

app.get('/', (req, res) => {
    res.cookie('flag', flag);
    const CHALL = 'http://localhost:8000';
    const OUR_URL = 'https://xyz.ngrok-free.app/flag';
    res.render('index', { CHALL, OUR_URL });
});

app.get('/send_flag', (req, res) => {
    res.send(flag);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});