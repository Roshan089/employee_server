const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
       // Simple regex for email validation
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
});

module.exports = mongoose.model("Users", authSchema);

