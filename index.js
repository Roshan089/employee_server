const express = require("express");
const cors = require("cors");  // Import the CORS package
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4002;

// Enable CORS for all origins
app.use(cors());  // You can also restrict this to specific origins if needed

app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const user = require("./routes/User");
app.use("/api/v1", user);




const dbConnect = require("./config/database");
dbConnect();

app.listen(PORT, () => {
    console.log(`App is started at ${PORT}`);
});

// Simple homepage route
app.get("/", (req, res) => {
    res.send("<h1>This is the homepage</h1>");
});
