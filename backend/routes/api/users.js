const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');

const User = require('../../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/register').post((req, res) => {
    const { name, email, mobile, password } = req.body;
    const newUser = new User({ name, email, mobile, password });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            newUser.save()
                .then(user => {
                    jwt.sign(user.toJSON(), keys.secret, { expiresIn: 3600 }, (err, token) => {
                        res.json({ success: true, token: 'Bearer' + token, user });
                    });
                })
                .catch(err => res.status(400).json(`Error: ${err}`));
        });
    });
});

router.route('/login').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                jwt.sign(user.toJSON(), keys.secret, { expiresIn: 3600 }, (err, token) => {
                    res.json({ success: true, token: "Bearer " + token, user });
                });
            }
        });
    });
});

module.exports = router;