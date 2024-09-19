const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    const URL = process.env.DATABASE_URL;

    if (!URL) {
        console.log("Please enter the URL of the database");
        return;
    }

    mongoose.connect(URL)
        .then(() => {
            console.log("Database Connected Successfully");
        })
        .catch((err) => {
            console.log("Error in Database Connection:", err);
            process.exit(1);
        });
};

module.exports = dbConnect;
