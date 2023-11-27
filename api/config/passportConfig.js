const User = require("./user.js");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

    module.exports = function passportConfig(passport) {
        passport.use(
            new LocalStrategy({
                    usernameField: 'email',
                    passwordField: 'password',
                },
                (email, password, done) => {
                    User.findOne({email: email}).then((err, user) => {
                        if (err) throw err;
                        if (!user) {
                            return done(null, false);
                        }
                        bcrypt.compare(password, user.password, (err, result) => {
                            if (err) throw err;
                            if (result === true) {
                                return done(null, user);
                            } else {
                                return done(null, false);
                            }
                        });
                    }).catch((err) => {
                        console.log(err)
                        return done(err)
                    })
                })
        );
    }
