
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/send.php', async (req, res) => {
  const msg = req.body.message;
  const token = process.env.TELEGRAM_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;

  if (!msg || !token || !chat) {
    return res.status(400).send('Missing data');
  }

  const resp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ chat_id: chat, text: msg })
  });

  return resp.ok ? res.send('Sent') : res.status(500).send('Error');
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor escuchando en puerto ${listener.address().port}`);
});
