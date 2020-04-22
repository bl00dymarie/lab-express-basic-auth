const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../models/User");

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.post("/signup", (req, res, next) => {
    const { username, password } = req.body
    if (password == "") {
        res.render('signup', {message: "Field can't be empty"})
        return
    }
    if (username == "") {
        res.render('signup', {message: "Field can't be empty"})
        return
    }
    User.findOne({ username: username }).then(found => {
        if (found !== null) {
            res.render("signup", { message: "Username is already taken"})
        } else {
            const salt = bcrypt.genSaltSync()
            const hash = bcrypt.hashSync(password, salt)

            User.create( {username: username, password: hash})
                .then(dbUser => {
                    res.redirect("/")
                })
                .catch(err => {
                    next(err)
                })
        }
    })
})

module.exports = router