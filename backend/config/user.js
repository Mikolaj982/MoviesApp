const mongoose = require("mongoose");
const passportLocal = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
});

userSchema.plugin(passportLocal);

module.exports = mongoose.model("User", userSchema);




