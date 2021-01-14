const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.post(`/${process.env.TELEGRAM_TOKEN}`, (req, res) => {

    console.log("Got update...");
    console.log(req.body);

    let body = req.body;
    if (!body.message || !body.message.text) {
        res.status(200).end();
        return;
    }

    if (req.body.message.text[0] === '/') {
        fetch(process.env.TELEGRAM_API_URL + 'sendMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: body.message.chat.id,
                text: 'Hi!',
                reply_to_message_id: body.message.id
            })
        });
    }

    res.status(200).end();

});

let PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

fetch(process.env.TELEGRAM_API_URL + 'setWebhook', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: 'https://marlize-bot.uc.r.appspot.com/' + process.env.TELEGRAM_TOKEN })
}).then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err));