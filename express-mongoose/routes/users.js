const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/showrumbackend');

const userSchema =
      new Schema({
        login: {type: String, required: true, minlength: 4},
        password: {type: String, required: true},
        name: {type: String, required: true},
        email: {type: String, required: true}
      });
const User = mongoose.model('User', userSchema);

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
      .catch((err) =>  {
        console.error(err);
        res.status(422);
        res.send();
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
