const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const User = require('../models/user');
const Presentation = require('../models/presentation');

const sendError = (err) => {
  res.status(500);
  res.send();
};

router.post('/', function(req, res, next) {
  const token = req.headers.token;
  const body = req.body;

  User.findOne({_id: ObjectID(token)})
    .then((user) => {
      if (user != null) {
        const presentation = new Presentation({name: body.name,
                                               document: body.document,
                                               user_id: ObjectID(token)});
        presentation.save()
          .then((presentation) => {
            res.status(201);
            res.location("/presentations/" + presentation.id);
            res.send();
          })
          .catch((err) => {
            res.status(422);
            res.send();
          });

      } else {
        res.status(401);
        res.send();
      }
    }).catch(sendError);
});

router.get('/', function(req, res, next) {
  const token = req.headers.token;

  User.findOne({_id: ObjectID(token)})
    .then((user) => {
      if (user != null) {
        Presentation.find({user_id: ObjectID(token)})
          .then((presentations) => {
            res.status(200);
            res.send(presentations);
          }).catch(sendError);
      } else {
        res.status(401);
        res.send();
      }
    }).catch(sendError);
});


router.get('/:id', function(req, res, next) {
  const token = req.headers.token;
  const presentation_id = req.params.id;

  User.findOne({_id: ObjectID(token)})
    .then((user) => {
      if (user != null) {
        Presentation.findOne({user_id: ObjectID(token), _id: presentation_id})
          .then((presentation) => {
            res.status(200);
            res.send(presentation);
          }).catch(sendError);
      } else {
        res.status(401);
        res.send();
      }
    }).catch(sendError);
});

router.delete('/:id', function(req, res, next) {
  const token = req.headers.token;
  const presentation_id = req.params.id;
  User.findOne({_id: ObjectID(token)})
    .then((user) => {
      if (user != null) {
        Presentation.remove({user_id: ObjectID(token), _id: presentation_id})
          .then((presentation) => {
            res.status(200);
            res.send();
          }).catch(sendError);
      } else {
        res.status(401);
        res.send();
      }
    }).catch(sendError);
})

module.exports = router;
