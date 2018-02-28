var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/showrumbackend');

var User = mongoose.model('User',
                          {
                              login: String,
                              password: String,
                              name: String,
                              email: String
                          });

router.post('/', function(req, res, next) {
    body = req.body;
    console.log(body);
    if (body.password == body.confirmation) {
        user = new User({
            login: body.login,
            password: body.password,
            name: body.name,
            email: body.email
        });

        user.save(function (err) {
            if (err) {
                console.log(err);
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
    body = req.body;
    console.log(body);
    var user = User.findOne({login: body.login, password: body.password},
                            "_id login",
                            function(err, user) {
                                if (err) {
                                    console.log(err);
                                    res.status(401);
                                    res.send();
                                } else {
                                    console.log(user)
                                    if (user == null)
                                    {
                                        console.log(err);
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
