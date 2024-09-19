const express = require("express");
const router = express.Router();

//import controller
const {SignUp} = require("../controllers/SignUp");
const {login} = require("../controllers/login");
const {Auth,Student,Admin} = require("../Middleware/Auth");
const { Getemployee } = require("../controllers/employee");

//routes
router.post("/signup",SignUp);
router.post("/login", login);
router.get("/employees",Getemployee)

router.get("/test",Auth,(req,res)=>{
    res.status(200).json({
        success: true,
        message:"Welcome to the protected route for auth"
    })
})



module.exports = router;