const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const filepath = path.join(__dirname, '../data/users.json');

const sendUsersData = (req, res) => {
  const reader = fs.createReadStream(filepath, { encoding: 'utf8' });
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  reader.pipe(res);
};

const checkUser = (data, id) => JSON.parse(data).find((item) => item._id === id);
const sendUser = (req, res) => {
  const { id } = req.params;
  fsPromises.readFile(filepath, { encoding: 'utf8' })
    .then((result) => {
      const user = checkUser(result, id);
      if (user) {
        res.send(user);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

router.get('/', sendUsersData);
router.get('/:id', sendUser);

module.exports = router;
