

const Users = require("../models/Users");
const bcryptjs = require("bcryptjs");


const jwt = require("jsonwebtoken");


require("dotenv").config();

exports.login = async(req,res) => {
    try{

        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                success:false,
                message: "Please enter all data carefully"
            })
        }

        let user = await Users.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Please sign in"
            })
        }

        const payload = {
            email:user.email,
            id:user._id,
            
        }

        const secret = process.env.JWT_SECRET;

        if(await bcryptjs.compare(password,user.password)){
            const token = jwt.sign(
                payload,
                secret,
                {
                    expiresIn:"2h"
                }
            );

            user = user.toObject();
            user.token = token;
            user.password = undefined;
            

            if(!token){
                return res.status(400).json({
                    success:false,
                    message:"Token is not generated"
                })
            }

            
           

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
            }

            return res.cookie("babbar",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User Logged in successfully"
            });


        }
        else{
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
            })
        }



    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message:"There is a error in server side"
        })
    }
}