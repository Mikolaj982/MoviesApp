const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const User = require("../config/user.js");
const {v4: uuidv4} = require("uuid");
const jwt = require("jsonwebtoken");
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
const app = express();

mongoose.connect("mongodb+srv://random-user:5HU2WxkWHMam2NcH@cluster0.21d6ogu.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongoose is connected')
});

app.use(bodyParser.urlencoded({
    extended: false,
    limit: '25mb',
}));
app.use(bodyParser.json({limit: '25mb'}));
app.use(cors({
    origin: "https://main--coruscating-dusk-0c8d64.netlify.app",
    credentials: true,
}));
app.use(passport.initialize());

passport.use(
    'login',
    new localStrategy(
        {usernameField: 'email'},
        async (email, password, done) => {
            console.log('user named');
            try {
                if (email === 'apperror') {
                    throw new Error(
                        'Oh no! The application crashed! We have reported issue. You can change next(error) to next(error.message) to hide the stack trace'
                    );
                }
                User.findOne({email: email}).then((user) => {
                    if (!user) {
                        return done(null, false, {message: 'User not found!'});
                    }
                    // const passwordMatches = bcrypt.compare(password, user.password);
                    if (!user.password) {
                        return done(null, false, {message: 'Invalid credentials!'})
                    }

                    return done(null, user, {message: 'You are logged in!'})
                })
            } catch (err) {
                return done(err)
            }
        }
    )
)

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
        },
        async (email, password, done) => {
            console.log('passport working')
            try {
                if (password.length <= 4 || !email) {
                    done(null, false, {message: 'email is required and password has to be more than 4 signs'})
                } else {
                    User.findOne({email: email}).then((user) => {
                        if (!user) {
                            // const hashedPass = bcrypt.hash(password, 10);
                            const newUser = new User({
                                id: uuidv4(),
                                email: email,
                                password: password,
                                image: null,
                            })
                            return done(null, newUser, {message: 'Signed up successfully'})
                        } else {
                            return done(null, false, {message: 'User already exist'})
                        }
                    })
                }
            } catch (err) {
                return done(err)
            }
        }
    )
)

app.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (error, user, info) => {
        console.log('err', error);
        console.log('user', user);
        console.log('info', info);
        if (error) return next(error.message);
        if (!user) return res.status(401).send(info);
        if (user) {
            const token = jwt.sign({user: user}, 'TOP_SECRET');
            console.log('token', token);
            return res.status(200).send({token, info, user});
        }
    })(req, res, next)
});

app.post('/signup', async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://coruscating-dusk-0c8d64.netlify.app');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    passport.authenticate('signup', async (error, user, info) => {
        if (error) return next(error.message);
        if (!user) return res.status(401).send(info);
        if (user) {
            user.save();
            return res.status(200).send(info);
        }
    })(req, res, next)
})

app.post('/my-list', async (req, res) => {
    const auth = req.headers.authorization;
    const token = auth.substring(7);
    jwt.verify(token, 'TOP_SECRET', {}, (error, decoded) => {
        if (error) {
            res.status(404).json({message: error});
        } else {
            User.findById(decoded.user._id)
                .then(user => {
                    user.myList = [...user.myList, req.body.myMovieId]
                    user.save();
                })
        }
    })
    res.sendStatus(200)
})

app.delete('/my-list', async (req, res) => {
    const auth = req.headers.authorization;
    const token = auth.substring(7);
    jwt.verify(token, 'TOP_SECRET', {}, (error, decoded) => {
        if (error) {
            console.log(error)
        } else {
            User.findById(decoded.user._id)
                .then(user => {
                    user.myList = [...user.myList].filter(item => item !== req.body.myMovieId);
                    user.save();
                })
        }
    })
    res.sendStatus(200)
})

app.get('/my-list', (req, res) => {
    const auth = req.headers.authorization;
    const token = auth.substring(7);
    jwt.verify(token, 'TOP_SECRET', {}, (error, decoded) => {
        if (error) {
            res.status(401).send({message: 'Cannot upload your list. Try again later.'})
            console.log(error)
        } else {
            User.findById(decoded.user._id)
                .then(user => {
                    res.status(200).send(user.myList);
                    console.log('lista filmów:', user.myList);
                })
        }
    })
})
app.options('/signup', cors());
app.options('/login', cors());
app.options('/my-list', cors());

app.listen(port, () => {
    console.log('Server has started')
});

module.exports = app;