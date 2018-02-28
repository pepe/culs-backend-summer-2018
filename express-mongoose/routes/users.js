const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/showrumbackend');

const User = mongoose.model('User',
                          {
                            login: String,
                            password: String,
                            name: String,
                            email: String
                          });

router.post('/', function(req, res, next) {
  const body = req.body;
  if (body.password == body.confirmation) {
    const user = new User({
      login: body.login,
      password: body.password,
      name: body.name,
      email: body.email
    });

    user.save(function (err) {
      if (err) {
        console.error(err);
        res.status(422);
        res.send();
      } else {
        res.status(201);
        res.location("/users/" + user.id);
        res.send();
      }
    });
  } else {

    res.status(422);
    res.send();
  }
});

router.post('/authenticate', function(req, res, next) {
  const body = req.body;
  const user = User.findOne({login: body.login, password: body.password},
                            "_id login",
                            function(err, user) {
                              if (err) {
                                console.error(err);
                                res.status(401);
                                res.send();
                              } else {
                                if (user == null)
                                {
                                  console.error(err);
                                  res.status(401);
                                  res.send();
                                } else {
                                  res.status(200);
                                  res.send({login: user.login,
                                            token: user.id});
                                }
                              }
                            });
});

module.exports = router;
