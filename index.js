// ヒノマル帳簿：デプロイ用テストコメント
const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',
  channelSecret: 'YOUR_CHANNEL_SECRET'
};

const app = express();
const port = process.env.PORT || 3000;

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(result => res.json(result))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const reply = { type: 'text', text: `「${event.message.text}」と受け取りました！` };

  const client = new line.Client(config);
  return client.replyMessage(event.replyToken, [reply]);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
