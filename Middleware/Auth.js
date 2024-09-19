const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.Auth = async (req, res, next) => {
    try {
        // Extract token from the request
        const token = req.body.token || req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }

        // Verify the token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload; // Attach the payload to the request
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }

        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server down"
        });
    }
};

exports.Student = (req,res,next) => {
    try{
        if(req.user.role != "Student"){
            return res.status(400).json({
                success:false,
                message:"This is a protected route for Student"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        })
    }
}

exports.Admin = (req,res,next) => {
    try{
        if(req.user.role != "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for admin"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        })
    }
}