const mongoose = require("mongoose");
const passportLocal = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    myList: [],
    image: String,
});

userSchema.plugin(passportLocal);
const User = mongoose.model("User", userSchema);
module.exports = User;




