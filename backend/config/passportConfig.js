const {User} = require("./user.js");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function passportConfig(passport) {
    passport.use(
        new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
            },
            (email, password, done) => {
                User.findOne({email: email}, (err, user) => {
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
                            }
                        )
                    }
                )
            }));
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser(async (id, cb) => {
            User.findOne({_id: id}, (err, user) => {
                cb(err, user);
            });

    });
}
