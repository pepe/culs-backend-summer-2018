const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.post('/', function(req, res, next) {
  const body = req.body;
  if (body.password == body.confirmation) {
    const user = new User({
      login: body.login,
      password: body.password,
      name: body.name,
      email: body.email
    });

    user.save()
      .then((user) => {
        res.status(201);
        res.location("/users/" + user.id);
        res.send();
      })
      .catch((err) => {
        console.error(err);
        res.status(422);
        res.send();
      });
  } else {
    console.error("Password and confirmation does not match");
    res.status(422);
    res.send();
  }
});

router.post('/authenticate', function(req, res, next) {
  const body = req.body;
  User.findOne({login: body.login, password: body.password}, "_id login")
      .then((user) => {
        if (user == null)
        {
          console.error("User does not exist or password does not match");
          res.status(401);
          res.send();
        } else {
          res.status(200);
          res.send({login: user.login,
                    token: user.id});
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(401);
        res.send();
      });
});

module.exports = router;
