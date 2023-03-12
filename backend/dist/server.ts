const mongoose = require("mongoose");
const express= require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const User = require("../config/user.js");
const app = express();


mongoose.connect("mongodb+srv://mikolaj892:fLGvfjPDPOWYRYtF@cluster0.rtrbxtk.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}),
    () => {
    console.log('Mongoose is connected')
};

app.use(express.static('movie-app/src'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(
    session({
        secret: "secretCode",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(cookieParser("secretCode"));
app.use(passport.initialize());
app.use(passport.session());
require("../config/passportConfig")(passport);

app.post("/login", (req: { logIn: (arg0: any, arg1: (err: any) => void) => void; user: any; }, res: { send: (arg0: string) => void; }, next: any) => {
    passport.authenticate("local", (err: Error | null, user: typeof User, info: any) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send("Successfully Authenticated");
                console.log(req.user);
            });
        }
    })(req, res, next);
});

app.post("/register", (req: { body: { email: any; firstName: any; lastName: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { msg: string; }): void; new(): any; }; }; sendStatus: (arg0: number) => void; }) => {
    User.findOne({email: req.body.email}).then((doc: object) => {
        if (doc) {
            res.status(409).send({msg: 'User already exists'})
            // res.json(JSON.stringify({msg: "User already exists"}))
        } else {
            // const hashedPassword = bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                email: req.body.email
            });
            newUser.save().then((obj: any) => console.log("User saved"))
            res.sendStatus(200);
        }
    }).catch((err: Error | null) => {
        throw err
    })

    // User.findOne({
    //     email: req.body.email,
    // }, async (err: Error, doc: object) => {
    //     try {
    //         if (err) throw err;
    //         if (doc) res.send("User Already Exists");
    //         if (!doc) {
    //             const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //             const newUser = new User({
    //                 firstName: req.body.firstName,
    //                 lastName: req.body.lastName,
    //                 password: hashedPassword,
    //                 email: req.body.email
    //             });
    //             await newUser.save();
    //             res.render('SignIn');
    //         }
    //     } catch (err) {
    //         throw err
    //     }
    // })
});

app.delete('/logout', (req: { logOut: (arg0: (err: Error) => any) => void; }, res: { render: (arg0: string) => void; }, next: (arg0: Error) => any) => {
    req.logOut((err: Error | null) => {
        if (err) {
            return next(err)
        }
        res.render('SignIn');
    })
})

app.listen(8000, () => {
    console.log('Server has started')
});
