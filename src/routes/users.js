const express = require('express');
const router = express.Router();
const db = require('../models/index');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function (req, res, next) {
  db.sequelize.sync()
    .then(() => db.User.create({
      name: req.body.name,
      point: req.body.point
    })).then(usr => {
      res.redirect('/');
    })
});

module.exports = router;
