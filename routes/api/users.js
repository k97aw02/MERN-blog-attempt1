const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// const passport = require("passport");

// input validation  Craft_Space\validation\register.js
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// user model
const User = require("../../models/User");

// route POST api to register
router.post("/register", (req, res) => {
    // form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User ({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            //hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }
    });
});

// route POST api login
router.post("/login", (req, res) => {
    // form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({ email }).then(user => {
        //check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        //check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                //user matched -- create JWT payload
                const payload = {
                    id: user.id,
                    name: user.name
                };

                //sign token
                jwt.sign(
                    payload,
                    keys.secretOrkey,
                    {
                        expiresIn: 31556926 // one year in seconds
                    },
                    (err, token) => {
                        res.json({
                            sucess: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;