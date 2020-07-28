const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const filepath = path.join(__dirname, '../data/cards.json');

const sendUsersCards = (req, res) => {
  const reader = fs.createReadStream(filepath, { encoding: 'utf8' });
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  reader.pipe(res);
};

router.get('/', sendUsersCards);

module.exports = router;
