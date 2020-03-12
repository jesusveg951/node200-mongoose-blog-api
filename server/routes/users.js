const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});

router.get('/:id', (req, res) => {
    User
     .findById(req.params.id)
     .then(user => {
       if (user) {
         res.status(200).json(user)
        }else {
          res.status(404).send('error user not found')
        }
     })
 })

router.post('/', (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      })
      newUser.save((err, user) => {
        if (user) {
          res.status(201).send(user);
        } else handleError(err);
      });
});

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
            })
        .then(users => {
            res.status(204).send("item updated");
        })
        .catch(err => {
            res.status(400).send("cant update");
        });
});

router.delete('/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(users => {
            if (users) {
                res.status(200).json(users);
            } else {
                res.status(500)
            }
        });
});

module.exports = router;